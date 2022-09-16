import { useLazyQuery } from '@apollo/react-hooks';
import update from 'immutability-helper';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import filteredSpecials from 'shared/graphql/special/queries/filtered-specials.gql';
import useDispensaryFlag from 'shared/hooks/use-dispensary-flag';
import useMediaQuery from 'shared/hooks/use-media-query';
import { useStores } from 'src/hooks/use-stores';
import useErnie from 'shared/hooks/use-ernie';
import { mediaQueries } from 'shared/styles';
import { AmplitudeCategory, useAmplitude } from 'src/utils/amplitude';
import createMenuSection from './graphql/create-menu-section.gql';
import destroyMenuSection from './graphql/destroy-menu-section.gql';
import sortMenuSections from './graphql/sort-menu-sections.gql';
import getMenuSections from './graphql/get-menu-sections.gql';
import getMenuSectionProductsAdmin from './graphql/get-menu-section-products-admin.gql';
// import { getAvailableMenuSectionTypes, filterMapping } from './constants';
import { getAvailableMenuSectionTypes, getMenuSectionProductFilter } from './homepage.utils';

function filterMenuSections(menuSections, type, showOffersCarousel) {
  let postLDMenuSections = [...menuSections];
  if (!showOffersCarousel) {
    postLDMenuSections = _.reject(menuSections, [`sectionType`, `OFFERS`]);
  }

  return _.map(postLDMenuSections, (menuSection) => {
    const filterMethod = getMenuSectionProductFilter(menuSection.sectionType);
    const items = filterMethod(type, menuSection);
    let { label } = menuSection;
    if (!showOffersCarousel && menuSection.sectionType === `SPECIALS`) {
      label = `Specials`;
    }

    return {
      id: menuSection.id,
      label,
      position: menuSection.position,
      sectionType: menuSection.sectionType,
      count: items.length,
      sectionName: menuSection.sectionName,
      products: menuSection.products,
    };
  });
}

export function useHomepage() {
  const { apolloClient, UI } = useStores();
  const amplitude = useAmplitude();
  const showErnie = useErnie();
  const mobile = useMediaQuery(mediaQueries.tablet);
  const showOffersCarousel = useDispensaryFlag(`rollout.offers-carousel-on-homepage`, UI.dispensary?.id);

  const [currentSection, setCurrentSection] = useState(null);
  const [menuSectionIdToRemove, setMenuSectionIdToRemove] = useState(null);
  const [showModalType, setShowModalType] = useState(false);
  const [localMenuSections, setLocalMenuSections] = useState([]);

  const [fetchMenuSections, { data, loading }] = useLazyQuery(getMenuSections, {
    client: apolloClient,
    fetchPolicy: 'network-only',
  });

  const [fetchProducts, { data: productsData }] = useLazyQuery(getMenuSectionProductsAdmin, {
    client: apolloClient,
    fetchPolicy: 'network-only',
  });

  const [fetchSpecials, { data: specialsData }] = useLazyQuery(filteredSpecials, {
    client: apolloClient,
    fetchPolicy: 'network-only',
  });

  const products = useMemo(() => productsData?.filteredProducts?.products || [], [productsData]);
  const allSpecials = useMemo(() => specialsData?.filteredSpecials?.specials || [], [specialsData]);
  const specials = useMemo(
    () => _.filter(allSpecials, (special) => _.isNil(special.specialType) || special.specialType === 'sale'),
    [allSpecials]
  );
  const offers = useMemo(() => _.filter(allSpecials, [`specialType`, `bogo`]), [allSpecials]);
  const menuSections = useMemo(() => data?.getMenuSections || [], [data]);

  useEffect(() => {
    async function fetchData() {
      await fetchMenuSections({
        variables: {
          dispensaryId: UI.dispensary.id,
        },
      });

      await fetchProducts({
        variables: {
          filter: {
            dispensaryId: UI.dispensary.id,
            sortBy: 'popularSortIdx',
            Status: 'Active',
          },
        },
      });

      await fetchSpecials({
        variables: {
          specialsFilter: {
            dispensaryId: UI.dispensary?.id,
            current: true,
          },
        },
      });
    }

    fetchData();
  }, [UI.dispensary.id, fetchMenuSections, fetchProducts, fetchSpecials]);

  useEffect(() => {
    const newLocalMenuSections = filterMenuSections(menuSections, { products, offers }, showOffersCarousel);
    setLocalMenuSections(newLocalMenuSections);
  }, [data, menuSections, offers, products, productsData, showOffersCarousel, specials, specialsData]);

  const handleAddSection = async (sectionTypeKey, sectionTitle) => {
    if (_.includes(['BRAND', 'CATEGORY', 'SUBCATEGORY', 'CUSTOM'], sectionTypeKey)) {
      setShowModalType(sectionTypeKey);
    } else {
      await apolloClient.mutate({
        mutation: createMenuSection,
        refetchQueries: ['GetMenuSections'],
        variables: {
          menuSection: {
            dispensaryId: UI.dispensary.id,
            sectionType: sectionTypeKey,
          },
        },
      });

      amplitude.log('Add Homepage Section', {
        description: 'User adds a homepage section on the Customize page',
        category: AmplitudeCategory.customize,
        value: sectionTitle,
      });

      showErnie(`Menu section added`, 'success');
    }
  };

  const handleDrop = async () => {
    const ids = _.map(localMenuSections, 'id');

    await apolloClient.mutate({
      mutation: sortMenuSections,
      variables: {
        dispensaryId: UI.dispensary.id,
        ids,
      },
    });

    showErnie(`Menu section positions updated`, 'success');
  };

  const handleRemoveMenuSection = async (menuSectionId) => {
    await apolloClient.mutate({
      mutation: destroyMenuSection,
      refetchQueries: ['GetMenuSections'],
      variables: {
        id: menuSectionId,
        dispensaryId: UI.dispensary.id,
      },
    });

    const sectionDetails = _.find(menuSections, ['id', menuSectionId]) ?? {};
    amplitude.log('Delete Homepage Section', {
      description: 'User removes a homepage section on the Customize page',
      category: AmplitudeCategory.customize,
      sectionName: sectionDetails.sectionName,
      sectionType: sectionDetails.sectionType,
      label: sectionDetails.label,
      sectionCategory: sectionDetails.category,
      sectionSubcategory: sectionDetails.subcategory,
    });

    showErnie(`Menu section removed`, 'success');

    // eslint-disable-next-line no-use-before-define
    handleCloseRemoveModal();
  };

  const handleOpenRemoveModal = (menuSectionId) => {
    setMenuSectionIdToRemove(menuSectionId);
  };

  const handleCloseRemoveModal = () => {
    setMenuSectionIdToRemove(null);
  };

  const handleMoveOption = useCallback(
    (dragIndex, hoverIndex) => {
      const draggedMenuSection = localMenuSections[dragIndex];

      const newSectionOrder = update(localMenuSections, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedMenuSection],
        ],
      });

      setLocalMenuSections(newSectionOrder);

      amplitude.log('Reorder Homepage Section', {
        description: 'User reorders the homepage sections on the Customize page',
        category: AmplitudeCategory.customize,
        newSectionOrder: _.map(newSectionOrder, (s) => _.pick(s, ['label', 'position', 'sectionName'])),
      });
    },
    [amplitude, localMenuSections]
  );

  const handleCloseModal = () => {
    setShowModalType(false);
    setCurrentSection(null);
  };

  const handleEditSection = (id, type) => {
    const sectionToEdit = _.find(localMenuSections, ['id', id]);
    setShowModalType(type);
    setCurrentSection(sectionToEdit);
  };

  let availableMenuSectionTypes = getAvailableMenuSectionTypes(menuSections);
  if (!showOffersCarousel) {
    availableMenuSectionTypes = _.reject(availableMenuSectionTypes, [`key`, `OFFERS`]);
  }
  const showCategoryModal = _.includes(['CATEGORY', 'SUBCATEGORY'], showModalType);
  const showBrandModal = _.includes(['BRAND'], showModalType);
  const showCustomModal = _.includes(['CUSTOM'], showModalType);

  return {
    loading,
    mobile,
    localMenuSections,
    handleDrop,
    handleMoveOption,
    handleOpenRemoveModal,
    handleEditSection,
    showOffersCarousel,
    availableMenuSectionTypes,
    handleAddSection,
    showCategoryModal,
    menuSections,
    handleCloseModal,
    showModalType,
    showBrandModal,
    showCustomModal,
    currentSection,
    products,
    menuSectionIdToRemove,
    handleCloseRemoveModal,
    handleRemoveMenuSection,
  };
}
