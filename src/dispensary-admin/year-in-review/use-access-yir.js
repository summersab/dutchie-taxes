import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import statsQuery from 'src/dispensary-admin/year-in-review/access-modal/stats-query.gql';
import useApolloClient from 'shared/hooks/use-apollo-client';
import { useRouteMatch } from 'react-router-dom';
import useDispensaryFlag from 'shared/hooks/use-dispensary-flag';
import { useUser } from 'src/hooks/use-user';

export function useAccessYir() {
  const User = useUser();
  const apolloClient = useApolloClient();
  const routeMatch = useRouteMatch('/dispensaries/:dispensaryId');
  const yearInReviewEnabled = useDispensaryFlag('year-in-review', routeMatch?.params?.dispensaryId);

  const { loading, data, error } = useQuery(statsQuery, {
    skip: !routeMatch?.params?.dispensaryId || !yearInReviewEnabled,
    client: apolloClient,
    variables: { dispensaryId: routeMatch?.params?.dispensaryId },
    fetchPolicy: 'cache-and-network',
  });

  const authorized = User.isSuperAdmin || User.profile?.permissions?.analytics;

  if (!authorized || !yearInReviewEnabled || loading || error) {
    return false;
  }

  const dispensaryTotalSales = _.get(data, 'yearInReviewQuery.totalSales.salesTotal', 0);
  return dispensaryTotalSales > 5000;
}
