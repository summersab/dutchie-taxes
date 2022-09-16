import { useParams } from 'react-router-dom';
import { useGetEnterpriseQuery, useGetEnterpriseByNameQuery } from 'types/graphql';

import useStores from 'shared/hooks/use-stores';

type PossibleParams = {
  chainId?: string;
  dispensaryId?: string;
  enterpriseId?: string;
};

type UseEnterpriseResult = {
  billingVersion?: number;
  id: string;
  loading: boolean;
  uniqueName?: string;
};

const useEnterprise = (): UseEnterpriseResult => {
  const { apolloClient, UI, User } = useStores();
  const { chainId, enterpriseId: enterpriseIdParam } = useParams<PossibleParams>();
  const defaultResult = { billingVersion: undefined, id: User.enterpriseId, loading: true, uniqueName: undefined };
  const enterpriseId = enterpriseIdParam ?? User.enterpriseId ?? UI.dispensary.retailer?.enterprise?.id;

  const skipGetEnterpriseByIdQuery = !enterpriseId;
  const skipGetEnterpriseByNameQuery = !chainId || !User.isSuperAdmin;

  const enterpriseByIdResult = useGetEnterpriseQuery({
    client: apolloClient,
    skip: skipGetEnterpriseByIdQuery,
    variables: { enterpriseId },
  });

  const enterpriseByNameResult = useGetEnterpriseByNameQuery({
    client: apolloClient,
    skip: skipGetEnterpriseByNameQuery,
    variables: { uniqueName: chainId ?? '' },
  });

  const byIdResult = enterpriseByIdResult.data?.getEnterprise;
  const byNameResult = enterpriseByNameResult.data?.getEnterpriseByName?.[0];
  const loading = [enterpriseByIdResult.loading, enterpriseByNameResult.loading].some((val) => !!val);

  return {
    billingVersion: byIdResult?.billingVersion ?? byNameResult?.billingVersion ?? defaultResult.billingVersion,
    id: byIdResult?.id ?? byNameResult?.id ?? enterpriseId ?? defaultResult.id,
    loading,
    uniqueName: byIdResult?.uniqueName ?? byNameResult?.uniqueName ?? defaultResult.uniqueName,
  };
};

export default useEnterprise;
