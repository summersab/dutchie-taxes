import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApolloError } from 'apollo-client';

import {
  useGetMenuCustomizationQuery,
  GqlGetMenuCustomizationQuery,
  NavBarColor,
  LinkColor,
  CustomFont,
  useGetMenuSectionsQuery,
  GqlGetMenuSectionsQuery,
  GqlMenuSection,
  GqlCategoryPhoto,
  GqlImageBanner,
} from 'types/graphql';

import useErnie from 'shared/hooks/use-ernie';
import useDispensaryCategoriesSubcategories from 'src/hooks/use-dispensary-categories-subcategories';
import { getCategoriesForMenuForState } from 'shared/helpers/products';
import { useStores } from 'src/hooks/use-stores';
import { defaultCategoryPhotos } from 'shared/constants';
import { isNotNullish } from 'shared/utils/type-utils';
import type { Category as TransformedCategory } from '../components/preview/home-page/categories/categories.types';
import { MenuBannerColor, isValidMenuBannerColor } from '../helpers';

export type MenuCustomizationData = {
  colorSettings: {
    navBarColor: NavBarColor;
    linkColor: LinkColor;
  };
  fontSettings: {
    family: CustomFont;
  };
  menuBannerColor: MenuBannerColor;
  menuBannerHtml: string | null;
  ageVerificationBannerColor: MenuBannerColor;
  ageVerificationBannerHtml: string | null;
  disclaimerTextHtml: string | null;
  menuSections: GqlMenuSection[];
  categories: TransformedCategory[];
  imageBanners: GqlImageBanner[] | null;
};

type UseMenuCustomizationDataReturn = {
  data?: MenuCustomizationData;
  error?: ApolloError;
  loading: boolean;
};

type TransformCategoriesProps = {
  categories: Array<Category>;
  categoryPhotos: Array<GqlCategoryPhoto>;
  state: string | null;
};

type SubCategory = {
  category: {
    key: string;
    label: string;
  };
  key: string;
  label: string;
  value: string;
};

type Category = {
  key: string;
  label: string;
  subcategories: Array<SubCategory>;
};

function transformCategories({
  categories,
  categoryPhotos,
  state,
}: TransformCategoriesProps): Array<TransformedCategory> {
  const categoriesForMenu = getCategoriesForMenuForState(state);

  return categories
    .map((category) => {
      const matchedCategory = categoriesForMenu.find((categoryForMenu) => categoryForMenu.value === category.key);

      if (!matchedCategory) {
        return null;
      }

      const photoFromDispensaryProfile = categoryPhotos.find((categoryPhoto) => categoryPhoto.category === category.key)
        ?.src;

      const defaultPhoto =
        state === 'UT' && category.key === 'Edible'
          ? 'https://images.dutchie.com/category-stock-photos/edibles/edibles-gummies.png'
          : defaultCategoryPhotos[category.key];

      return {
        label: matchedCategory.label,
        imgSrc: photoFromDispensaryProfile ?? defaultPhoto,
      };
    })
    .filter(isNotNullish);
}

function transformData(
  getMenuCustomizationData: GqlGetMenuCustomizationQuery | undefined,
  getMenuSectionsData: GqlGetMenuSectionsQuery | undefined,
  categories: Array<Category>
): MenuCustomizationData | undefined {
  if (!getMenuCustomizationData?.filteredDispensaries || !getMenuSectionsData?.getMenuSections) {
    return undefined;
  }
  const item = getMenuCustomizationData.filteredDispensaries[0];

  const { navBarColor, linkColor } = item?.webCustomizationSettings?.colorSettings ?? {};

  const { family } = item?.webCustomizationSettings?.fontSettings ?? {};

  const { menuBannerHtml = null, ageVerificationBannerHtml = null } = item ?? {};

  const { disclaimerTextHtml = null } = item?.embedSettings ?? {};

  const { state = null } = item?.location ?? {};

  const menuBannerColor =
    item?.menuBannerColor && isValidMenuBannerColor(item.menuBannerColor)
      ? item.menuBannerColor
      : MenuBannerColor.green;

  const ageVerificationBannerColor =
    item?.ageVerificationBannerColor && isValidMenuBannerColor(item.ageVerificationBannerColor)
      ? item.ageVerificationBannerColor
      : MenuBannerColor.green;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const menuSections = getMenuSectionsData.getMenuSections.filter((item: any): item is GqlMenuSection => item !== null);

  const categoryPhotos = item?.categoryPhotos?.filter(isNotNullish) ?? [];
  const imageBanners = item?.imageBanners?.filter(isNotNullish) ?? [];

  const transformedCategories = transformCategories({
    categories,
    categoryPhotos,
    state,
  });

  return {
    colorSettings: {
      navBarColor: navBarColor ?? NavBarColor.aliceBlue,
      linkColor: linkColor ?? LinkColor.blue_4,
    },
    fontSettings: {
      family: family ?? CustomFont.proximaNova,
    },
    menuBannerHtml,
    menuBannerColor,
    ageVerificationBannerHtml,
    ageVerificationBannerColor,
    disclaimerTextHtml,
    menuSections,
    categories: transformedCategories,
    imageBanners,
  };
}

export function useGetMenuCustomization(): UseMenuCustomizationDataReturn {
  const { id: dispensaryId } = useParams<{ id: string }>();
  const { apolloClient } = useStores();
  const showErnie = useErnie();

  const getMenuCustomizationQuery = useGetMenuCustomizationQuery({
    variables: {
      dispensaryId,
    },
    client: apolloClient,
    fetchPolicy: 'no-cache',
  });

  const getMenuSectionsQuery = useGetMenuSectionsQuery({
    variables: {
      dispensaryId,
    },
    client: apolloClient,
    fetchPolicy: 'no-cache',
  });

  const { categories, loading: categoriesLoading } = useDispensaryCategoriesSubcategories({
    dispensaryId,
  });

  const error = getMenuCustomizationQuery.error ?? getMenuSectionsQuery.error;
  const loading = getMenuCustomizationQuery.loading || getMenuSectionsQuery.loading || categoriesLoading;

  useEffect(() => {
    if (error) {
      showErnie('Something went wrong, please try again.', 'danger');
      console.error(error);
    }
  }, [showErnie, error]);

  return {
    data: transformData(getMenuCustomizationQuery.data, getMenuSectionsQuery.data, categories),
    loading,
    error,
  };
}
