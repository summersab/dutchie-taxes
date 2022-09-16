import _invert from 'lodash/invert';

export const countryMap = {
  US: 'United States',
  CA: 'Canada',
  JM: 'Jamaica',
  VC: 'Saint Vincent and the Grenadines',
  PR: 'Puerto Rico',
};

export const JamaicanParishesMap = {
  '01': 'Kingston Parish',
  '02': 'St. Andrew Parish',
  '03': 'St. Thomas Parish',
  '04': 'Portland Parish',
  '05': 'St. Mary Parish',
  '06': 'St. Ann Parish',
  '07': 'Trelawny Parish',
  '08': 'St. James Parish',
  '09': 'Hanover Parish',
  10: 'Westmoreland Parish',
  11: 'St. Elizabeth Parish',
  12: 'Manchester Parish',
  13: 'Clarendon',
  14: 'St. Catherine Parish',
};

export const saintVincentAndTheGrenadinesParishesMap = {
  VC: 'St. Vincent and the Grenadines', // VC is a single compliance area.  Using the ISO country code for 'state'.
};

export const countryMapToShortened = _invert(countryMap);

export const canadianProvincesMap = {
  AB: 'Alberta',
  BC: 'British Columbia',
  MB: 'Manitoba',
  NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador',
  NS: 'Nova Scotia',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
  ON: 'Ontario',
  PE: 'Prince Edward Island',
  QC: 'Québec',
  SK: 'Saskatchewan',
  YT: 'Yukon',
};

export const puertoRicoMap = {
  Humacao: 'Humacao',
  Naguabo: 'Naguabo',
};

export const canadianProvincesMapToShortened = { ..._invert(canadianProvincesMap), Quebec: 'QC' };

export const USStatesMap = {
  AL: 'Alabama',
  AK: 'Alaska',
  AR: 'Arkansas',
  AS: 'American Samoa',
  AZ: 'Arizona',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DC: 'District of Columbia',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  IA: 'Iowa',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  MA: 'Massachusetts',
  MD: 'Maryland',
  ME: 'Maine',
  MI: 'Michigan',
  MN: 'Minnesota',
  MO: 'Missouri',
  MS: 'Mississippi',
  MT: 'Montana',
  NC: 'North Carolina',
  ND: 'North Dakota',
  NE: 'Nebraska',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NV: 'Nevada',
  NY: 'New York',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  'San Juan': 'San Juan',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VA: 'Virginia',
  VI: 'Virgin Islands',
  VT: 'Vermont',
  WA: 'Washington',
  WI: 'Wisconsin',
  WV: 'West Virginia',
  WY: 'Wyoming',
};

export const USStatesMapToShortened = { ..._invert(USStatesMap), DC: 'DC' };

export const statesMap = {
  ...USStatesMap,
  ...canadianProvincesMap, // TODO: Shouldn't need to spread this with the US...
  ...saintVincentAndTheGrenadinesParishesMap,
  ...puertoRicoMap,
};

export const supportedCountries = ['US', 'PR', 'CA', 'JM', 'VC'];
