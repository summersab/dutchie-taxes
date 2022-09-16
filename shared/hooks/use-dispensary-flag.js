import { useFlags } from 'launchdarkly-react-client-sdk';

import evaluateDispensaryFeatureFlag from 'shared/utils/evaluate-dispensary-feature-flag';

export default function useDispensaryFlag(key, dispensaryId, defaultValue = false) {
  const flags = useFlags();
  const featureFlagValue = flags[key];
  return evaluateDispensaryFeatureFlag(key, featureFlagValue, dispensaryId, defaultValue);
}
