import {canadianProvincesMap} from '../../shared/core/constants/geography.js';

// country -> state
export const ageRestrictions = {
    default: 21,
    US: {
        default: 21,
    },
    CA: {
        default: 21,
        [canadianProvincesMap.AB]: 18,
        [canadianProvincesMap.BC]: 19,
        [canadianProvincesMap.MB]: 19,
        [canadianProvincesMap.NB]: 19,
        [canadianProvincesMap.NL]: 19,
        [canadianProvincesMap.NT]: 19,
        [canadianProvincesMap.NS]: 19,
        [canadianProvincesMap.NU]: 19,
        [canadianProvincesMap.ON]: 19,
        [canadianProvincesMap.PE]: 19,
        [canadianProvincesMap.QC]: 21,
        [canadianProvincesMap.SK]: 19,
        [canadianProvincesMap.YT]: 19,
    },
};
