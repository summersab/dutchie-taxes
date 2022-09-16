import useStores from './use-stores';

export default function useApolloClient() {
  const { apolloClient } = useStores();
  return apolloClient;
}
