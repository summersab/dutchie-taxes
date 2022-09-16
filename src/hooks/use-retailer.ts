import { useGetRetailerByDispensaryIdQuery } from 'types/graphql';

import useStores from 'shared/hooks/use-stores';

type UseRetailerResult = {
  id: string;
};

// Eventually this hook could also be made to accept retailerId[] and enterpriseId[]
// as the dataloader on the BE supports these params
const useRetailer = (dispensaryIds: string[] = []): UseRetailerResult => {
  const { apolloClient } = useStores();
  const variables = { dispensaryIds };
  const skip = dispensaryIds.length === 0;

  const retailerByDispensaryIdResult = useGetRetailerByDispensaryIdQuery({
    client: apolloClient,
    skip,
    variables,
  });

  const byDispensaryIdResult = retailerByDispensaryIdResult.data?.getRetailerByDispensaryId?.[0];

  return {
    id: byDispensaryIdResult?.id ?? '',
  };
};

export default useRetailer;
