import _ from 'lodash';

/**
 * Launch Darkly is user-centric, so we're using JSON feature flags to enable flagging features by dispensary.
 * This helper checks if a dispensary has a feature enabled, or warns if the value is not an object.
 *
 * type DispensaryFeatureFlagValue {
 *   enabledForAll: Boolean
 *   enabledForDispensaries?: string[]
 *   variant: string
 * }
 *
 * @param {string} key
 * @param {(Object|boolean)} featureFlagValue
 * @param {string} dispensaryId
 * @param {boolean} defaultValue
 */
export default function evaluateDispensaryFeatureFlag(key, featureFlagValue, dispensaryId, defaultValue = false) {
  if (!_.isUndefined(featureFlagValue)) {
    if (_.isObject(featureFlagValue)) {
      if (
        featureFlagValue?.disabledForDispensaries &&
        _.includes(featureFlagValue.disabledForDispensaries, dispensaryId)
      ) {
        return false;
      }

      if (featureFlagValue?.enabledForAll) {
        return true;
      }

      if (!dispensaryId) {
        // console.warn(
        //   // eslint-disable-next-line max-len
        //   `Warning - evaluateDispensaryFeatureFlag called on ${key}, but no dispensaryId was provided. Default value (${defaultValue}) returned.`
        // );
        return defaultValue;
      }

      return _.includes(featureFlagValue?.enabledForDispensaries, dispensaryId);
    }

    if (_.isBoolean(featureFlagValue)) {
      // console.warn(
      //   // eslint-disable-next-line max-len
      //   `Warning - evaluateDispensaryFeatureFlag called on ${key}, but received boolean featureFlagValue instead of an object; please configure flag to use dispensary pattern. featureFlagValue (${featureFlagValue}) returned.`
      // );
      return featureFlagValue;
    }

    // console.warn(
    //   // eslint-disable-next-line max-len
    //   `Warning - evaluateDispensaryFeatureFlag called on ${key}, but featureFlagValue received was not an object; please configure flag to use dispensary pattern. Default value (${defaultValue}) returned.`
    // );
  }

  return defaultValue;
}

/**
 * Helper for checking flags in a class component
 *
 * @param {string} key: launch darkly key for feature flag
 * @param {Object} flags: launch darkly flags use withLDConsumer to access this via props (props.flags)
 * @param {string} dispensaryId
 * @param {boolean} defaultValue default returned if dispensaryId is not provided or proper LD response is not received
 */
export function flagIsEnabledForDispensary(key, flags, dispensaryId, defaultValue = false) {
  const featureFlagValue = flags[key];
  return evaluateDispensaryFeatureFlag(key, featureFlagValue, dispensaryId, defaultValue);
}
