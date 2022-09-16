import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApolloError } from 'apollo-client';
import { useStores } from 'src/hooks/use-stores';

import { isNotNullish } from 'shared/utils/type-utils';

import {
  GqlMenuSection,
  useGetCarouselProductsQuery,
  GqlGetCarouselProductsQuery,
  GqlProductsFilterInput,
} from 'types/graphql';

import { ProductCarouselData } from './product-carousel.types';
import { ProductCarousel } from './product-carousel';

type ProductCarouselControllerProps = {
  menuSection: GqlMenuSection;
  productsFilter: GqlProductsFilterInput;
};

type UseProductCarouselControllerReturn = {
  data?: ProductCarouselData[];
  error?: ApolloError;
  loading: boolean;
};

function transformData(data: GqlGetCarouselProductsQuery | undefined): ProductCarouselData[] | undefined {
  if (!data?.filteredProducts) {
    return undefined;
  }

  const products = data.filteredProducts.products.map((product): ProductCarouselData | null => {
    const { id, Name: name, Image: imageUrl, brand, strainType: strainData, type } = product ?? {};

    if (!id || !name || !imageUrl || !product?.Prices || !type) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const brandName = brand?.name ?? product?.brandName ?? undefined;
    const strainType = strainData ?? undefined;

    const prices = product.Prices.filter(isNotNullish);

    return {
      id,
      name,
      imageUrl,
      prices,
      brandName,
      strainType,
      type,
    };
  });

  return products.filter(isNotNullish);
}

function useProductCarouselController({
  productsFilter,
}: ProductCarouselControllerProps): UseProductCarouselControllerReturn {
  const { apolloClient } = useStores();
  const { id: dispensaryId } = useParams<{ id: string }>();

  const defaultFilter = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Status: `Active`,
    sortBy: `popularSortIdx`,
    sortDirection: 1,
    dispensaryId,
  };

  const { data, loading, error } = useGetCarouselProductsQuery({
    client: apolloClient,
    variables: {
      productsFilter: {
        ...defaultFilter,
        ...productsFilter,
      },
    },
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return {
    data: transformData(data),
    loading,
    error,
  };
}

export function ProductCarouselController({
  menuSection,
  productsFilter,
}: ProductCarouselControllerProps): JSX.Element {
  const { data, loading } = useProductCarouselController({ menuSection, productsFilter });

  return <ProductCarousel label={menuSection.label} products={data} loading={loading} />;
}
