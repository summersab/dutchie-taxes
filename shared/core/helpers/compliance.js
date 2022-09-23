import _ from 'lodash';

import {
  canadianProvincesMap,
  JamaicanParishesMap,
  saintVincentAndTheGrenadinesParishesMap,
} from '../constants/geography.js';
import {
  stateComplianceRules,
  canadaDefaults,
  jamaicanDefaults,
  saintVincentAndTheGrenadinesDefaults,
} from '../constants/compliance.js';

export const getComplianceConfig = (state, key) => {
  // all of canada has the same compliance info except for Alberta and Ontario
  const stateHasConfig = _.includes(_.keys(stateComplianceRules), state);
  if (!stateHasConfig && canadianProvincesMap[state]) {
    return _.get(canadaDefaults, key, _.get(stateComplianceRules.DEFAULT, key));
  }

  // Jamaica
  // we only have one jamaican dispo currently!
  if (!stateHasConfig && _.includes(_.values(JamaicanParishesMap), state)) {
    return _.get(jamaicanDefaults, key, _.get(stateComplianceRules.DEFAULT, key));
  }

  // Saint Vincent and the Grenadines
  if (!stateHasConfig && _.includes(_.keys(saintVincentAndTheGrenadinesParishesMap), state)) {
    return _.get(saintVincentAndTheGrenadinesDefaults, key, _.get(stateComplianceRules.DEFAULT, key));
  }
  return _.get(stateComplianceRules, `${state}.${key}`, _.get(stateComplianceRules.DEFAULT, key));
};
