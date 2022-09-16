import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import useApolloClient from 'shared/hooks/use-apollo-client';
import { StatsModal } from './stats-modal';
import statsQuery from './stats-query.gql';

export function YearInReview() {
  const routeMatch = useRouteMatch('/dispensaries/:dispensaryId');
  const apolloClient = useApolloClient();

  const { loading, data, error } = useQuery(statsQuery, {
    client: apolloClient,
    variables: { dispensaryId: routeMatch.params.dispensaryId },
    fetchPolicy: 'cache-and-network',
  });

  if (!loading && !error && data.yearInReviewQuery) {
    return <StatsModal {...data.yearInReviewQuery} />;
  }

  return <div />;
}
