import _ from 'lodash';
import { weightToName } from '../constants/product';
import { defaultFlowerThresholds, integrationsByCategory } from '../constants/integrations';

export const getIntegrationCategory = (adapter) => {
  const category = _.map(integrationsByCategory, (value, key) => {
    if (_.has(value, adapter)) {
      return key;
    }
  });

  return _.find(category, (i) => !!i);
};

export const getIntegrationThreshold = (thresholds = null, category, weight, defaultZero = false) => {
  /*
   * data structure looks like:
   * thresholds = {
   *    category: string | { weight: string, ... }
   * }
   */
  let defaultThreshold = 5;
  // use flower specific defaults
  if (category === 'Flower') {
    defaultThreshold = defaultFlowerThresholds[weight] || 1;
  }

  // use 0 for kiosk defaults
  if (defaultZero) {
    defaultThreshold = 0;
  }

  // if we dont have thresholds, use defaults
  if (!thresholds || !thresholds[category]) {
    return defaultThreshold;
  }

  // this should never be flower. return the threshold value for a given category
  if (_.isString(thresholds[category])) {
    if (category === 'Flower') {
      return defaultThreshold;
    }
    return parseInt(thresholds[category], 10);
  }

  // this should always be flower. weight may need to be translated first. e.g. 3.5g -> 1/8oz
  let weightName = weight.replace('.', '[dot]');
  if (weightToName[weight]) {
    weightName = weightToName[weight];
  }
  return parseInt(thresholds[category][weightName] || defaultThreshold, 10);
};
