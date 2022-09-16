import { useQuery } from '@apollo/react-hooks';

import useStores from 'shared/hooks/use-stores';

export default function useApolloQuery(query, variables, options = {}) {
  const { apolloClient } = useStores();
  return useQuery(query, {
    fetchPolicy: 'cache-and-network',
    client: apolloClient,
    ...options,
    variables,
  });
}
