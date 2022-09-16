import { useState, useCallback } from 'react';
import _ from 'lodash';
import update from 'immutability-helper';
import useErnie from 'shared/hooks/use-ernie';
import { useStores } from 'src/hooks/use-stores';

import { AmplitudeCategory, useAmplitude } from 'src/utils/amplitude';
import { allMenuSectionTypes, PRODUCT_LIMIT } from '../../constants';
import createMenuSection from '../../graphql/create-menu-section.gql';
import updateMenuSection from '../../graphql/update-menu-section.gql';

export function useCustomModal({ menuSection, onToggle, products, sectionTypeKey }) {
  const showErnie = useErnie();
  const { apolloClient, UI } = useStores();
  const amplitude = useAmplitude();

  const [loading, setLoading] = useState(false);
  const [sectionName, setSectionName] = useState(menuSection?.sectionName || '');
  // map product list to active products while retaining order, remove unmapped values
  const [selectedProducts, setSelectedProducts] = useState(
    _.compact(_.map(menuSection?.products, (productId) => _.find(products, ({ id }) => id === productId)))
  );

  const handleSectionNameChange = (e) => {
    const truncated = _.truncate(e.target.value, { length: 25, omission: '' });
    setSectionName(truncated);
  };

  const handleProductSelectChange = (event, newValue) => {
    if (newValue.length > PRODUCT_LIMIT) {
      showErnie(`Sorry, you can select a maximum of ${PRODUCT_LIMIT} products`, 'danger');
      return;
    }

    setSelectedProducts(newValue);
  };

  const handleRemoveProduct = (id) => {
    setSelectedProducts((previousState) => _.reject(previousState, [`id`, id]));
  };

  const handleMoveOption = useCallback(
    (dragIndex, hoverIndex) => {
      const draggedProduct = selectedProducts[dragIndex];
      setSelectedProducts(
        update(selectedProducts, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, draggedProduct],
          ],
        })
      );
    },
    [selectedProducts]
  );

  const validate = () => {
    if (!_.trim(sectionName)) {
      showErnie(`Please enter a name for the section`, 'danger');
      return false;
    }

    if (selectedProducts.length < 1) {
      showErnie(`Please select at least one product`, 'danger');
      return false;
    }

    return true;
  };

  const createSection = async () => {
    setLoading(true);

    try {
      await apolloClient.mutate({
        mutation: createMenuSection,
        refetchQueries: ['GetMenuSections'],
        variables: {
          menuSection: {
            sectionName,
            dispensaryId: UI.dispensary.id,
            sectionType: 'CUSTOM',
            products: _.map(selectedProducts, ({ id }) => id) || [],
          },
        },
      });

      amplitude.log('Add Homepage Section', {
        description: 'User adds a homepage section on the Customize page',
        category: AmplitudeCategory.customize,
        value: _.find(allMenuSectionTypes, ['key', sectionTypeKey])?.title,
        sectionName,
      });

      showErnie(`Menu section added`, 'success');
      onToggle();
    } catch (err) {
      showErnie(`There was an issue saving your menu section. Please contact support`, 'danger');
    }

    setLoading(false);
  };

  const updateSection = async () => {
    setLoading(true);

    try {
      await apolloClient.mutate({
        mutation: updateMenuSection,
        refetchQueries: ['GetMenuSections'],
        variables: {
          id: menuSection.id,
          menuSection: {
            sectionName,
            dispensaryId: UI.dispensary.id,
            products: _.map(selectedProducts, ({ id }) => id),
          },
        },
      });

      showErnie(`Menu section updated`, 'success');
      onToggle();
    } catch (err) {
      showErnie(`There was an issue saving your menu section. Please contact support`, 'danger');
    }

    setLoading(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const isValid = validate();
    const isEditing = menuSection?.id;

    if (isValid) {
      if (isEditing) {
        updateSection();
      } else {
        createSection();
      }
    }
  };

  const showProductList = !!selectedProducts.length;

  return {
    handleMoveOption,
    handleProductSelectChange,
    handleRemoveProduct,
    handleSave,
    handleSectionNameChange,
    loading,
    sectionName,
    selectedProducts,
    showProductList,
  };
}
