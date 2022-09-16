import { EnterpriseJSONFeatureFlag } from '../helpers/types';
import { isNotNullish } from './type-utils';

/**
 * Launch Darkly is user-centric, so we're using JSON feature flags to enable flagging features by enterprise.
 * This helper checks if an enterprise has a feature enabled, or warns if the value is not an object.
 */
const evaluateEnterpriseFeatureFlag = (
  key: string,
  featureFlagValue: EnterpriseJSONFeatureFlag,
  enterpriseId: string
): boolean => {
  if (isNotNullish(featureFlagValue)) {
    if (typeof featureFlagValue === 'object') {
      if (featureFlagValue.enabledForAll) {
        return true;
      }

      return !enterpriseId ? false : !!featureFlagValue.enabledForEnterprises?.includes(enterpriseId);
    }

    console.warn(`Warning - evaluateEnterpriseFeatureFlag called on ${key}, which did not return an object value.`);
  }

  return false;
};

export default evaluateEnterpriseFeatureFlag;
