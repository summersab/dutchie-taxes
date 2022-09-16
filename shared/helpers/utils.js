import _ from 'lodash';
import moment from 'moment';

import { daysOfWeek } from 'shared/constants/time';

/**
 * Checks if the window has an orientation property, which
 * should be a more robust way to tell if a device is mobile
 * than using screen size. This should be used in situations
 * where an element's visibility and/or position property (i.e. sticky,
 * relative, absolute) is dependent on whether it is mobile
 * (but not necessarily dependent on screen size).
 * Responsive spacing should still be done with @media since it
 * is screen size dependent rather than mobile vs. desktop dependent.
 */
export const isMobile = () =>
  typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;

export const pluralize = (stem, count, postfix = 's') => (count > 1 ? stem + postfix : stem);

export const isValidEmail = (email) => {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isSEOBot = () => window.navigator.userAgent.match(/prerender/i);

export const randomFunCannabisFacts = () =>
  _.sample([
    'Both Thomas Jefferson and George Washington grew hemp on their plantations.',
    'Cannabis and Beer are genetic cousins.',
    'According to several researchers, the first e-commerce transaction in history was for cannabis. ',
    'Many historians trace the earliest recorded use of cannabis back to China in 10,000 B.C.',
    'There exists over 200 slang, or "Street names", for cannabis.',
    'In 2009, a man set the world record for smoking joints – 115,000.',
    'The shortest jury deliberation in history was about marijuana usage.',
    'Scientists have confirmed that shakespeare used Marijuana.',
    'Mexico grows the most cannabis in the world.',
    'Marijuana milkshakes, called Bhang, are very popular in India.',
    'Americans grow 22 million pounds of marijuana each year.',
  ]);

export const randomOrderConfirmationMessages = () => _.sample(["We've got good news"]);

export const randomOrderConfirmedMessages = () => _.sample(["Now that's how it's done"]);

export const removeTypename = (value) => {
  if (value === null || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((v) => removeTypename(v));
  }
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === 'object') {
    const newObj = {};
    Object.entries(value).forEach(([key, v]) => {
      if (key !== '__typename') {
        newObj[key] = removeTypename(v);
      }
    });
    return newObj;
  }
  return value;
};

export const convertObjectIDtoString = (value) => {
  if (value === null || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((v) => convertObjectIDtoString(v));
  }
  if (_.isPlainObject(value)) {
    const newObj = {};
    Object.entries(value).forEach(([key, v]) => {
      if (v && v.constructor?.name === 'ObjectID') {
        v = v.toString();
      }
      newObj[key] = convertObjectIDtoString(v);
    });
    return newObj;
  }
  return value;
};

export const recursiveKeyWalker = (value, op) => {
  if (value === null || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((v) => recursiveKeyWalker(v, op));
  }
  if (_.isPlainObject(value)) {
    const newObj = {};
    Object.entries(value).forEach(([key, v]) => {
      key = op(key);
      newObj[key] = recursiveKeyWalker(v, op);
    });
    return newObj;
  }
  return value;
};

// convert moment objects to strings
export const formatMoments = (value) => {
  if (value === null || value === undefined) {
    return value;
  }

  if (moment.isMoment(value)) {
    return value.format();
  }

  if (Array.isArray(value)) {
    return value.map((v) => formatMoments(v));
  }

  if (_.isPlainObject(value)) {
    const newObj = {};
    Object.entries(value).forEach(([key, v]) => {
      newObj[key] = formatMoments(v);
    });
    return newObj;
  }
  return value;
};

export const findAndReplaceWith = (collection, predicate, replacement) => {
  const index = _.findIndex(collection, predicate);
  const newCollection = index >= 0 ? _.assign([], collection, { [index]: replacement }) : [...collection, replacement];

  return newCollection;
};

export const isValidZipCode = (zipcode) => {
  // US
  // Supports common 5 digits (0-9) zip codes as well as less common
  // two part zip codes like 94105-0011 which corisponds to a specific
  // area or neighborhood within a zip code area
  const UsZipRegex = /^\d{5}(-\d{4})?$/;

  // CA
  // The format of a Canadian postal code is LDL DLD where L are alpha characters
  // and D are numeric digits. But there are some exceptions.
  // The letters D, F, I, O, Q and U never appear in a postal code because of their
  // visual similarity to 0, E, 1, 0, 0, and V respectively. In addition to avoiding
  // the six "forbidden" letters W and Z also do not appear as the first
  // letter of a postal code (at least not at present).
  const CaZipRegex = /^([ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ])\ ?([0-9][ABCEGHJKLMNPRSTVWXYZ][0-9])$/;

  return UsZipRegex.test(zipcode) || CaZipRegex.test(zipcode);
};

export const nameToParts = (name = '', chopLength) => {
  let name1;
  let name2 = '';
  if (name.length > chopLength) {
    let split = chopLength;
    while (name[split] !== ' ' && split > 0) {
      split -= 1;
    }
    if (split === 0) {
      split = chopLength;
    }
    name1 = name.slice(0, split);
    name2 = name.slice(split);
  } else {
    name1 = name;
  }

  return [name1, name2];
};

export async function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = resolve;
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const dollarsToCents = (amountInDollars, roundAmount = false) =>
  roundAmount ? Math.round(Number(amountInDollars) * 100) : Math.trunc(Number(amountInDollars) * 100);

export const centsToDollars = (amountInCents) => (Number(amountInCents) / 100).toFixed(2);

export const formatAmount = (amountInCents) => {
  if (_.isNil(amountInCents)) {
    return '--';
  }

  const amountInDollars = (Number(amountInCents) / 100).toFixed(2);
  return `$${amountInDollars}`;
};

export const formatCurrency = (value, options) => {
  const parsedValue = parseFloat(value);

  const locale = _.get(options, 'locale', 'en-US');
  const currency = _.get(options, 'currency', 'USD');
  const trimCents = _.get(options, 'trimCents', false);
  const trimZeroCents = _.get(options, 'trimZeroCents', false);

  const style = 'currency';
  const maximumFractionDigits = trimCents ? 0 : 2;
  const minimumFractionDigits = trimCents ? 0 : 2;

  let formattedValue = new Intl.NumberFormat(locale, {
    style,
    currency,
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(parsedValue);

  if (trimZeroCents) {
    formattedValue = formattedValue.replace(/\.00/g, '');
  }

  return formattedValue;
};

export const getDaysOfWeekFromToday = (timezone) => {
  const today = moment().tz(timezone).startOf('day');
  const todayDayOfWeek = today.day();
  const adjustedDaysOfWeek = [...daysOfWeek.slice(todayDayOfWeek), ...daysOfWeek.slice(0, todayDayOfWeek)];

  return adjustedDaysOfWeek.map((dayOfWeek, index) => ({
    ...dayOfWeek,
    date: moment(today).add(index, 'days').format('YYYY-MM-DD'),
  }));
};

export const getCurrentTab = (location, pages, defaultPageKey) => {
  const currentPageKey = _.last(_.split(location.pathname, '/'));
  if (_.find(pages, ['key', currentPageKey])) {
    return currentPageKey;
  }
  if (defaultPageKey) {
    return defaultPageKey;
  }
  return pages[0].key;
};

export const getTranslationForOrderType = (t, orderType, useShortNames = false) => {
  if (!t || !orderType) {
    return '';
  }

  if (orderType === 'kiosk') {
    return t('common.kiosk', 'Kiosk');
  }
  if (orderType === 'delivery') {
    return t('common.delivery', 'Delivery');
  }
  if (orderType === 'inStorePickup') {
    return useShortNames ? t('common.inStore', 'In-Store') : t('common.inStorePickup', 'In-Store Pickup');
  }
  if (orderType === 'curbsidePickup') {
    return useShortNames ? t('common.curbside', 'Curbside') : t('common.curbsidePickup', 'Curbside Pickup');
  }
  if (orderType === 'driveThruPickup') {
    return useShortNames ? t('common.driveThru', 'Drive-Thru') : t('common.driveThruPickup', 'Drive-Thru Pickup');
  }

  return '';
};

export const generateHexId = (size = 24) => _.times(size, () => Math.floor(Math.random() * 16).toString(16)).join('');

export const serializeUtmData = (utmData) => {
  let serializedUtmData = utmData;
  // checks if utm data is an object, if not throw an error, then set the data to an empty object to not
  // interfere with checkout
  if (!_.isPlainObject(utmData)) {
    console.error('Bad UTM data shape:', utmData);
    serializedUtmData = {};
  }
  _.forEach(utmData, (data, param) => {
    if (!_.isString(data)) {
      const [newData] = data;
      serializedUtmData[param] = newData;
    }
  });
  return serializedUtmData;
};

export const isLowerCase = (str) => str === _.toLower(str);

export const removeAllSpecialCharactersWithoutDash = (str) => str.replace(/[^a-zA-Z0-9 -]/g, '');

export const removeDiacritics = (str) => str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
