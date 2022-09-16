import _find from 'lodash/find';
import _isNil from 'lodash/isNil';
import _sortBy from 'lodash/sortBy';
import _values from 'lodash/values';
import gql from 'graphql-tag';

import { AllSubcategories, categories as categoriesConstant } from 'shared/constants';
import { categoryPluralize } from 'shared/helpers/products';
import useApolloQuery from 'shared/hooks/use-apollo-query';

const dispensaryCategoriesSubcategories = gql`
  query DispensaryCategoriesSubcategoriesQuery($productsFilter: productsFilterInput!) {
    filteredProducts(filter: $productsFilter) {
      products {
        type
        subcategory
      }
    }
  }
`;

const useDispensaryCategoriesSubcategories = ({ dispensaryId }) => {
  const { data, loading } = useApolloQuery(
    dispensaryCategoriesSubcategories,
    { productsFilter: { dispensaryId, Status: 'Active' } },
    { skip: !dispensaryId }
  );

  const categoryHash = {};
  const subcategoryHash = {};

  (data?.filteredProducts?.products || []).forEach((product) => {
    if (!categoryHash[product.type]) {
      categoryHash[product.type] = { key: product.type, label: categoryPluralize(product.type), subcategories: [] };
    }

    if (!subcategoryHash[product.subcategory] && !_isNil(product.subcategory)) {
      const subcategoryMatch = _find(AllSubcategories, ['value', product.subcategory]);
      if (subcategoryMatch) {
        const categoryHashObj = categoryHash[product.type];
        const subcategory = { ...subcategoryMatch };
        if (categoryHashObj) {
          subcategory.category = { key: categoryHashObj.key, label: categoryHashObj.label };
          categoryHashObj.subcategories = _sortBy([...(categoryHashObj?.subcategories || []), subcategory], 'label');
        }
        subcategoryHash[product.subcategory] = subcategory;
      }
    }
  });

  return {
    loading,
    categories: categoriesConstant.reduce((sortedCategories, categoryKey) => {
      if (categoryHash[categoryKey]) {
        return [...sortedCategories, categoryHash[categoryKey]];
      }
      return sortedCategories;
    }, []),
    subcategories: _sortBy(_values(subcategoryHash), 'label'),
  };
};

export default useDispensaryCategoriesSubcategories;
