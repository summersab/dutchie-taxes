import React, { useEffect } from 'react';
import { ApolloError } from 'apollo-client';
import { useStores } from 'src/hooks/use-stores';
import { useParams } from 'react-router-dom';

import { isNotNullish } from 'shared/utils/type-utils';
import { useFilteredSpecialsQuery, GqlMenuSection, GqlSpecials } from 'types/graphql';

import { OfferCarousel } from './offer-carousel';

type UseProductCarouselControllerReturn = {
  data?: GqlSpecials[];
  error?: ApolloError;
  loading: boolean;
};

function useOfferCarouselController(): UseProductCarouselControllerReturn {
  const { apolloClient } = useStores();
  const { id: dispensaryId } = useParams<{ id: string }>();

  const { data, loading, error } = useFilteredSpecialsQuery({
    client: apolloClient,
    variables: {
      specialsFilter: {
        dispensaryId,
        current: true,
      },
    },
  });

  const offers = data?.filteredSpecials?.specials ?? [];

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return {
    data: offers.filter((o) => o?.specialType === 'bogo').filter(isNotNullish),
    loading,
  };
}

export function OfferCarouselController({ menuSection }: { menuSection: GqlMenuSection }): JSX.Element {
  const { data, loading } = useOfferCarouselController();

  return <OfferCarousel label={menuSection.label} offers={data} loading={loading} />;
}
