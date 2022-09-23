import { parseNoidAbbreviation } from '../utils/misc-utils.js';

export const CannabinoidAbbrev = {
  TAC: 'TAC',
  CBD: 'CBD',
  CBN: 'CBN',
  THCA: 'THCA',
  CBDA: 'CBDA',
  THCV: 'THCV',
  CBG: 'CBG',
  CBC: 'CBC',
  CBGA: 'CBGA',
  CBCA: 'CBCA',
  CBDV: 'CBDV',
  CBCV: 'CBCV',
  CBGVA: 'CBGVA',
  THCVA: 'THCVA',
  CBGV: 'CBGV',
  CBDVA: 'CBDVA',
  CBCVA: 'CBCVA',
  CBNA: 'CBNA',
  CBL: 'CBL',
  CBT: 'CBT',
  CBLA: 'CBLA',
  'D8-THC': 'D8-THC',
  'D9-THC': 'D9-THC',
  'THC-D8': 'D8-THC',
  'THC-D9': 'D9-THC',
};

const cannabinoidsHandledApart = new Set([CannabinoidAbbrev.TAC, CannabinoidAbbrev.CBD]);
export const isExcludedCannabinoid = (fullName) => cannabinoidsHandledApart.has(parseNoidAbbreviation(fullName));
