import { useFlags } from 'launchdarkly-react-client-sdk';

import { EnterpriseJSONFeatureFlag } from 'shared/helpers/types';
import evaluateEnterpriseFeatureFlag from 'shared/utils/evaluate-enterprise-feature-flag';

const useEnterpriseFlag = (key: string, enterpriseId?: string): boolean => {
  const flags = useFlags();
  const featureFlagValue = flags[key] as EnterpriseJSONFeatureFlag;

  if (!enterpriseId) {
    return false;
  }

  return evaluateEnterpriseFeatureFlag(key, featureFlagValue, enterpriseId);
};

export default useEnterpriseFlag;
