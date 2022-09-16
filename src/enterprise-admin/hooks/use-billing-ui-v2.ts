import useEnterprise from 'src/hooks/use-enterprise';
import { FF_BILLING_MANAGEMENT_V2 } from 'src/lib/constants';
import useEnterpriseFlag from 'shared/hooks/use-enterprise-flag';

type UseBillingUiV2Result = {
  loading: boolean;
  useV2UI: boolean;
};

const useBillingUIV2 = (): UseBillingUiV2Result => {
  const enterprise = useEnterprise();
  const enterpriseId = enterprise.id;
  const enterpriseBillingVersion = enterprise.billingVersion ?? 1;
  const billingManagementV2Flag = useEnterpriseFlag(FF_BILLING_MANAGEMENT_V2, enterpriseId);
  const useV2UI = billingManagementV2Flag && enterpriseBillingVersion > 1;

  return {
    loading: enterprise.loading,
    useV2UI,
  };
};

export default useBillingUIV2;
