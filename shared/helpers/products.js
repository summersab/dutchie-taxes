/* eslint-disable max-len */
import _ from 'lodash';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import uniqBy from 'lodash/fp/uniqBy';
import { isBlank } from 'underscore.string';

// eslint-disable-next-line import/no-extraneous-dependencies
import Big from 'big.js';
import { safeToBig } from 'shared/helpers/utils_math';
import { taxes } from 'shared/order/taxes';
import { isRecOnly, isMedOnly } from 'shared/core/helpers/dispensaries';
import { getComplianceConfig } from 'shared/core/helpers/compliance';
import {
  DefaultImages,
  DefaultImagesList,
  POTENCY_TYPES,
  POTENCY_UNITS,
  POTENCY_UNITS_DISPLAY,
  productEffects,
  StrainTypeOrder,
  MILLIGRAMS,
  MG_TO_G,
  MILLILITERS,
  LEGACY_AWS_SOURCE,
  IMGIX_SOURCE,
  WeightedSubcategories,
} from 'shared/constants';
import {
  GRAM_TO_OZ,
  GRAM_WEIGHT_REGEX,
  OZ_WEIGHT_REGEX,
  MG_WEIGHT_REGEX,
  CONC_WEIGHT_REGEX,
  PARTIAL_OZ_REGEX,
  MILLILITERS_PER_OZ,
  MULTIPLIER_REGEX,
  CategoryOptions,
  CategoriesForMenu,
  SubcategoryOptions,
  FloridaOralSubcategories,
  CategoryDisplayNames,
} from 'shared/constants/products';
import { CannabinoidAbbrev } from 'shared/constants/cannabinoids';
import { parseNoidAbbreviation } from 'shared/utils/misc-utils';

// https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md#usage-with-indirection-like-workers-and-js-templates
/* eslint-disable no-unused-vars */
const $RefreshReg$ = _.noop;
const $RefreshSig$ = () => _.noop;
/* eslint-enable no-unused-vars */

/**
 * @param {Pick<import('types/graphql').GqlProducts, 'type' | 'Options'>} product
 * @returns {boolean}
 */
export const isWeightedProduct = ({ type, Options = [] }) => {
  if (_.includes(['Flower', 'Vaporizers', 'Concentrate'], type) && !_.includes(Options, 'N/A')) {
    return true;
  }
  if (
    type === 'Pre-Rolls' &&
    Options.length &&
    parseFloat(Options[0].replace(/\D/g, '')) &&
    !_.includes(Options, 'N/A')
  ) {
    return true;
  }
  return false;
};

export const isWeightedCategory = (category) =>
  _.includes(['Flower', 'Pre-Rolls', 'Vaporizers', 'Concentrates', 'Concentrate'], category);

export const isWeightedSubcategory = (subcategory) => _.includes(WeightedSubcategories, subcategory);

export const isSubjectToExciseTax = ({ type }) => !_.includes(['Accessories'], type);

export const getTaxInclusionNote = ({ product, dispensary, medical, printedMenu = false }) => {
  /**
   * We use the tax calculator to get values for a single-product cart.
   * Then work backwards to determine if taxes are included or added at checkout, without having to know
   * anything about how the computation works with a dispensary's tax config.
   */
  const option = product.Options[0];
  const price = product.Prices[0];

  const computedTaxes = taxes(
    {
      productKey: {
        quantity: 1,
        option,
        price,
        product,
      },
    },
    dispensary,
    medical
  );
  const details = _.get(computedTaxes, `details.0`);
  const { cannabisTax: cannabisTaxFunc, salesTax: salesTaxFunc, menuCannabisTax, menuSalesTax } = details;
  const hasCannabisCheckoutTax = cannabisTaxFunc(1) > 0;
  const hasSalesCheckoutTax = salesTaxFunc(1) > 0;
  const hasMenuCannabisTax = menuCannabisTax > 0;
  const hasMenuSalesTax = menuSalesTax > 0;
  const salesTaxExists = !_.isEmpty(computedTaxes?.salesTaxExistence?.[medical ? `med` : `rec`]);
  const cannabisTaxExists = !_.isEmpty(computedTaxes?.cannabisTaxExistence?.[medical ? `med` : `rec`]);
  const addedAtText = printedMenu ? `not included` : `will be added at checkout`;
  const taxInclusionSentences = [];

  if (hasCannabisCheckoutTax && hasSalesCheckoutTax && !hasMenuCannabisTax && !hasMenuSalesTax) {
    taxInclusionSentences.push(`Cannabis and Sales tax ${addedAtText}.`);
  } else if (hasCannabisCheckoutTax && hasSalesCheckoutTax && hasMenuCannabisTax && hasMenuSalesTax) {
    taxInclusionSentences.push(`All taxes included in price.`);
  } else if (salesTaxExists && cannabisTaxExists && !hasCannabisCheckoutTax && !hasSalesCheckoutTax) {
    taxInclusionSentences.push(`Cannabis and Sales tax not included.`);
  } else {
    if (hasSalesCheckoutTax && !hasMenuSalesTax) {
      taxInclusionSentences.push(`Sales tax ${addedAtText}.`);
    } else if (hasSalesCheckoutTax) {
      taxInclusionSentences.push(`Sales tax included.`);
    } else if (salesTaxExists && !hasSalesCheckoutTax) {
      taxInclusionSentences.push(`Sales tax not included.`);
    }

    if (hasCannabisCheckoutTax && !hasMenuCannabisTax) {
      taxInclusionSentences.push(`Cannabis tax ${addedAtText}.`);
    } else if (hasCannabisCheckoutTax) {
      taxInclusionSentences.push(`Cannabis tax included.`);
    } else if (cannabisTaxExists && !hasCannabisCheckoutTax) {
      taxInclusionSentences.push(`Cannabis tax not included.`);
    }
  }
  const taxInclusionNote = taxInclusionSentences.length > 0 ? `*${taxInclusionSentences.join(' ')}` : '';
  return taxInclusionNote;
};

export const categoryPluralize = (category) =>
  _.includes(['Edible', 'Concentrate', 'Tincture', 'Oral'], category) ? `${category}s` : category;
export const categorySingularize = (category) =>
  // eslint-disable-next-line lodash/prefer-lodash-method
  [`Edibles`, `Concentrates`, `Tinctures`, `Topicals`, `Clones`, `Seeds`, `Vaporizers`, `Pre-Rolls`]
    .map((v) => _.toLower(v))
    .includes(_.toLower(category))
    ? category.replace(/s([^s]*)$/, '')
    : category;

export const discountAmount = (price, specialPrice) => {
  if (specialPrice <= 0) {
    return 0;
  }
  return (parseFloat(1 - specialPrice / price) * 100.0).toFixed(0);
};

export const availablePricingTypes = (dispensary) => {
  if (isMedOnly(dispensary)) {
    return [`med`];
  }
  if (isRecOnly(dispensary)) {
    return [`rec`];
  }
  return [`rec`, `med`];
};

export const filterPricesBelowThreshold = (product, prices) => {
  const { Options = [], optionsBelowThreshold = [] } = product;

  if (!(Options.length > 1)) {
    return prices;
  }

  if (!_.isEmpty(prices) && !_.isEmpty(optionsBelowThreshold)) {
    // find index of of each item in [options]
    // that does not match an item in [optionsBelowThreshold]
    const indices = _.map(Options, (option, index) => (_.includes(optionsBelowThreshold, option) ? null : index));
    const indicesToKeep = _.filter(indices, (index) => index !== null);
    return _.map(indicesToKeep, (index) => prices[index]);
  }
  return prices;
};

export function isPotencyProduct(product) {
  return product.cbdContent || product.thcContent || !_.includes(['Accessories', 'Apparel', 'Clones'], product.type);
}

function getKeyFromTAC(cannabinoids, key, fallback) {
  return _.get(
    _.find(cannabinoids, (noid) => parseNoidAbbreviation(noid?.cannabinoid?.name) === CannabinoidAbbrev.TAC),
    key,
    fallback
  );
}

export const getPotencyRanges = (product) => {
  if (!product) {
    return {};
  }

  const cannabinoids = _.get(product, 'cannabinoidsV2', []);
  const tacPotencyValue = getKeyFromTAC(cannabinoids, `value`, 0);
  const tacPotencyRangeV2 = [tacPotencyValue, tacPotencyValue];

  let thcPotencyRange;
  thcPotencyRange = _.isArray(product?.THCContent?.range) ? [...product.THCContent.range] : [0];

  let cbdPotencyRange;
  cbdPotencyRange = _.isArray(product?.CBDContent?.range) ? [...product.CBDContent.range] : [0];

  // for each cannabinoid, if range does not have two values, give it two values
  if (cbdPotencyRange.length !== 2) {
    cbdPotencyRange = [0, ...cbdPotencyRange];
  }

  if (thcPotencyRange.length !== 2) {
    thcPotencyRange = [0, ...thcPotencyRange];
  }

  return {
    [POTENCY_TYPES.CBD]: cbdPotencyRange,
    [POTENCY_TYPES.THC]: thcPotencyRange,
    [POTENCY_TYPES.TAC]: tacPotencyRangeV2,
  };
};

export const getPotencyValues = (product) => {
  if (!product) {
    return {};
  }
  const ranges = getPotencyRanges(product);

  return {
    [POTENCY_TYPES.CBD]: _.max(ranges[POTENCY_TYPES.CBD]),
    [POTENCY_TYPES.THC]: _.max(ranges[POTENCY_TYPES.THC]),
    [POTENCY_TYPES.TAC]: _.max(ranges[POTENCY_TYPES.TAC]),
  };
};

// should return an object with the accurate CBD and THC potency values
// if either CBD or THC is a range, the corresponding value will be an array with those potency values
// if either CBD or THC is NOT a range, the corresponding value will be an array with a single potency value
export const getAccuratePotencyValues = (product) => {
  if (!product) {
    return {};
  }

  const { CBDContent, THCContent } = product;
  const tacPotencyValue = getKeyFromTAC(product.cannabinoidsV2, 'value', 0);

  const safeTacValue = tacPotencyValue ? [tacPotencyValue] : undefined;

  return {
    [POTENCY_TYPES.CBD]: CBDContent ? getAccuratePotency(CBDContent.range) : undefined,
    [POTENCY_TYPES.THC]: THCContent ? getAccuratePotency(THCContent.range) : undefined,
    [POTENCY_TYPES.TAC]: safeTacValue,
  };
};

export const getAccuratePotency = (potencyRange) => {
  const isRange = isPotencyRange(potencyRange);

  if (isRange) {
    // get the lower and upper bound of the potency range
    const [lowerBound, upperBound] = potencyRange;

    // if the range has two indexes but the first one is 0 or null or undefined, then only return the upperBound
    // because we only want to use a range if it is between two values > 0
    if (lowerBound === 0 || _.isNil(lowerBound)) {
      return [upperBound];
    }
    // if the range has two indexes but the upperBound is null or undefined, and the lowerBound is valid, return it
    if (_.isNil(upperBound) && !_.isNil(lowerBound)) {
      return [lowerBound];
    }
    return potencyRange;
  }

  // the only case where the potency is a range and the only value is 0
  // set to null so the value can be overridden if the item is connected to a library product
  if (
    potencyRange?.length === 1 &&
    (potencyRange[0] === null || potencyRange[0] === 0 || potencyRange[0] === undefined)
  ) {
    return null;
  }

  // if the potency range is an empty array return null
  if (potencyRange?.length === 0) {
    return null;
  }

  // the only cases where potency range would be defined but isRange would be false
  // is if both values in the range are equal or the range has one value. return the first value
  if (potencyRange && !!potencyRange[0]) {
    return [potencyRange[0]];
  }

  return null;
};

export const isPotencyRange = (range) => {
  if (!_.isArray(range)) {
    return false;
  }
  if (range.length !== 2) {
    return false;
  }
  if (!_.isFinite(_.toNumber(range[0])) || !_.isFinite(_.toNumber(range[1]))) {
    return false;
  }

  return range[0] !== range[1];
};

export const regulateRangeValue = (range) => {
  if ((!isPotencyRange(range) && range[0] !== range[1]) || !_.isArray(range)) {
    return [0, 0];
  }
  range = _.map(range, Number);
  return range[0] > range[1] ? [range[0], range[0]] : range;
};

export const getPotencyUnits = (product) => {
  if (!product) {
    return {};
  }

  const fallbackUnit = _.includes([`Edible`, `Topicals`, `Tincture`, `CBD`], product.type)
    ? POTENCY_UNITS.MILLIGRAMS
    : POTENCY_UNITS.PERCENTAGE;

  const cbdUnit = _.get(product, `CBDContent.unit`, fallbackUnit) ?? fallbackUnit;
  const thcUnit = _.get(product, `THCContent.unit`, fallbackUnit) ?? fallbackUnit;
  const cannabinoids = _.get(product, 'cannabinoidsV2', []);
  const tacUnit = getKeyFromTAC(cannabinoids, 'unit', fallbackUnit) ?? fallbackUnit;

  return {
    [POTENCY_TYPES.CBD]: cbdUnit || fallbackUnit,
    [POTENCY_TYPES.THC]: thcUnit || fallbackUnit,
    [POTENCY_TYPES.TAC]: tacUnit,
  };
};

function fractionToDecimal(fraction) {
  // handles non fraction inputs also like integers
  const split = _.split(fraction, '/');
  let result = split[0];
  if (split.length > 1 && parseInt(split[1], 10) !== 0) {
    result = split[0] / split[1];
  }
  return result;
}

export const getWeightAndUnits = (weightString) => {
  if (isConcentrate(weightString)) {
    return { amount: parseFloat(parseGramWeight(weightString)), unit: 'gC' };
  }
  if (isGram(weightString)) {
    return { amount: parseFloat(parseGramWeight(weightString)), unit: 'g' };
  }
  if (isOz(weightString) || isPartialOz(weightString)) {
    const weight = parseOzWeightNoConversion(weightString);
    return { amount: parseFloat(fractionToDecimal(weight)), unit: 'oz' };
  }
  if (isMg(weightString)) {
    return { amount: parseFloat(parseMgWeightNoConversion(weightString)), unit: 'mg' };
  }
  // if our weight string is 'Any Weight'
  return null;
};

export const getPotency = (product) => {
  const { CBD: CBDRange, THC: THCRange, TAC: TACRange } = getPotencyRanges(product);
  const { CBD: CBDUnit, THC: THCUnit, TAC: TACUnit } = getPotencyUnits(product);

  const TACValue = _.max(TACRange) || ''; // TAC doesn't allow ranges

  return {
    [POTENCY_TYPES.CBD]: { unit: CBDUnit, range: CBDRange },
    [POTENCY_TYPES.THC]: { unit: THCUnit, range: THCRange },
    [POTENCY_TYPES.TAC]: { unit: TACUnit, value: TACValue },
  };
};

export function getPotencyString(potency, unit) {
  const space = (u) => (u === POTENCY_UNITS.MILLIGRAMS ? ' ' : '');

  return Number(potency) > 0 ? `${potency}${space(unit)}${POTENCY_UNITS_DISPLAY[unit]}` : '--';
}

export const getFormattedPotency = (product) => {
  if (!product) {
    return {};
  }
  const ranges = getPotencyRanges(product);
  const units = getPotencyUnits(product);

  let CBDString = getPotencyString(_.last(ranges.CBD), units.CBD);
  let THCString = getPotencyString(_.last(ranges.THC), units.THC);
  const TACString = getPotencyString(_.last(ranges[POTENCY_TYPES.TAC]), units[POTENCY_TYPES.TAC]);

  if (ranges.THC[0] > 0 && ranges.THC[0] !== ranges.THC[1]) {
    THCString = `${getPotencyString(ranges.THC[0], units.THC)} - ${THCString}`;
  }
  if (ranges.CBD[0] > 0 && ranges.CBD[0] !== ranges.CBD[1]) {
    CBDString = `${getPotencyString(ranges.CBD[0], units.CBD)} - ${CBDString}`;
  }

  return {
    [POTENCY_TYPES.CBD]: CBDString,
    [POTENCY_TYPES.THC]: THCString,
    [POTENCY_TYPES.TAC]: TACString,
  };
};

export const checkForPotencyValue = (potencyData) =>
  (!isBlank(potencyData) && _.isFinite(_.toNumber(potencyData))) || isPotencyRange(potencyData);

export const getQuantityRemaining = (
  product,
  option,
  { isKiosk = false, ignoreThreshold = false, defaultLimit = 10 } = {}
) => {
  if (!product || (!product.POSMetaData?.children && !product.manualInventory)) {
    return defaultLimit;
  }

  let quantityRemaining = defaultLimit;
  if (product.POSMetaData?.children && !product.manualInventory) {
    const { children = [] } = product.POSMetaData;

    const POSOption = _.find(children, { option });
    // if none of the pos meta children match the selected option, return default limit.
    if (!POSOption) {
      return defaultLimit;
    }

    quantityRemaining = POSOption.quantity;
    const quantityAvailable = isKiosk ? POSOption.kioskQuantityAvailable : POSOption.quantityAvailable;
    if (quantityAvailable && !ignoreThreshold) {
      quantityRemaining = quantityAvailable;
    }

    quantityRemaining = parseInt(quantityRemaining, 10);
    return quantityRemaining < 1 ? 1 : quantityRemaining;
  }

  const inventoryOption = _.find(product.manualInventory, { option });

  if (inventoryOption) {
    quantityRemaining = inventoryOption.inventory;
  }

  return quantityRemaining < 0 ? 0 : quantityRemaining;
};

export function getRangeForQuantityDropdown({ product, option, quantityInCart, isKiosk }) {
  const quantityRemaining = getQuantityRemaining(product, option, { isKiosk });
  const maxQuantityForSelection = _.clamp(quantityRemaining, 1, quantityInCart > 10 ? quantityInCart : 10);
  return _.range(1, maxQuantityForSelection + 1);
}

export const getLimitPerCustomer = (product, option) => {
  const defaultLimit = null;
  if (!product || !product.limitsPerCustomer) {
    return defaultLimit;
  }
  const filtered = _.filter(product.limitsPerCustomer, [`key`, option]);
  if (filtered.length > 0) {
    const { value } = filtered[0];
    return value === 'Unlimited' ? defaultLimit : parseInt(value, 10);
  }

  return defaultLimit;
};

export const optionValMap = {
  '0.02g': 0.02,
  '0.05g': 0.05,
  '0.15g': 0.15,
  '.3g': 0.3,
  '0.3g': 0.3,
  '.5g': 0.5,
  '0.5g': 0.5,
  '0.7g': 0.7,
  '.7g': 0.7,
  '1g': 1.0,
  '1.0g': 1.0,
  '1.2g': 1.2,
  '1.25g': 1.25,
  '1.5g': 1.5,
  '1.75g': 1.75,
  '2g': 2.0,
  '2.5g': 2.5,
  '2.6g': 2.6,
  '2.0g': 2.0,
  '1/8oz': 3.5,
  '3g': 3.0,
  '3.0g': 3.0,
  '3.5g': 3.5,
  '3.6g': 3.6,
  '3.7g': 3.7,
  '3.75g': 3.75,
  '4.0g': 4.0,
  '4g': 4.0,
  '5g': 5.0,
  '5.0g': 5.0,
  '7g': 7.0,
  '1/4oz': 7.0,
  '14g': 14.0,
  '1/2oz': 14.0,
  '28g': 28.0,
  '1oz': 28.0,
  '57g': 57.0,
  '2oz': 57.0,
  '85g': 85.0,
  '3oz': 85.0,
  '113g': 113.0,
  '4oz': 113.0,
  '142g': 142.0,
  '5oz': 142.0,
  '170g': 170.0,
  '6oz': 170.0,
  '198g': 198.0,
  '7oz': 198.0,
  '227g': 227.0,
  '8oz': 227.0,
  'Pre-Rolls': 1.0,
  '.25gC': 0.25,
  '.3gC': 0.3,
  '.4gC': 0.4,
  '.5gC': 0.5,
  '.75gC': 0.75,
  '1gC': 1.0,
  '1.25gC': 1.25,
  '1.5gC': 1.5,
  '1.75gC': 1.75,
  '2gC': 2.0,
  '2.5gC': 2.5,
};

export const isMg = (weight) => weight && MG_WEIGHT_REGEX.test(weight);

export const isGram = (weight) => weight && GRAM_WEIGHT_REGEX.test(weight);

export const isConcentrate = (weight) => weight && CONC_WEIGHT_REGEX.test(weight);

export const isOz = (weight) => weight && OZ_WEIGHT_REGEX.test(weight);

export const isPartialOz = (weight) => weight && PARTIAL_OZ_REGEX.test(weight);

export const parseMgWeight = (weight) => {
  const weightOnly = parseMgWeightNoConversion(weight);
  return weightOnly / MG_TO_G;
};

export const parseMgWeightNoConversion = (weight) => {
  const isMgWeight = isMg(weight);
  if (!isMgWeight) {
    return false;
  }
  return MG_WEIGHT_REGEX.exec(weight)[0].slice(0, -2);
};

export const parseGramWeight = (weight) => {
  const isGramWeight = isGram(weight);
  const isConcentrateWeight = isConcentrate(weight);
  if (isGramWeight) {
    const weightOnly = GRAM_WEIGHT_REGEX.exec(weight)[0].slice(0, -1);
    return Number(weightOnly);
  }
  if (isConcentrateWeight) {
    const weightOnly = GRAM_WEIGHT_REGEX.exec(weight)[0].slice(0, -2);
    return Number(weightOnly);
  }
  return false;
};

export const parseOzWeightNoConversion = (weight) => {
  const isPartialOzWeight = isPartialOz(weight);
  if (isPartialOzWeight) {
    return PARTIAL_OZ_REGEX.exec(weight)[0].slice(0, -2);
  }
  const isOzWeight = isOz(weight);
  if (isOzWeight) {
    return OZ_WEIGHT_REGEX.exec(weight)[0].slice(0, -2);
  }
  return -1;
};

export const parseOzWeight = (weight, defaultWeight) => {
  const partials = { '1/8': 3.5, '1/4': 7.0, '1/2': 14.0 };
  const isPartialOzWeight = isPartialOz(weight);
  if (isPartialOzWeight) {
    const weightOnly = PARTIAL_OZ_REGEX.exec(weight)[0].slice(0, -2);
    return partials[weightOnly] || defaultWeight;
  }
  const isOzWeight = isOz(weight);
  if (isOzWeight) {
    const weightOnly = OZ_WEIGHT_REGEX.exec(weight)[0].slice(0, -2);
    return weightOnly * GRAM_TO_OZ;
  }
  if (!isOzWeight && !isPartialOzWeight) {
    return false;
  }
  return false;
};

const parseMultiplier = (option) => {
  let optionParsed = option;
  let multiplier = 1;
  const match = String(optionParsed || '').match(MULTIPLIER_REGEX);

  if (match) {
    multiplier = parseInt(match[1], 10);
    if (Number.isNaN(multiplier)) {
      multiplier = 1;
    }
    // eslint-disable-next-line prefer-destructuring
    optionParsed = match[2];
  }

  return { multiplier, optionParsed };
};

export const getProductWeight = (option, defaultWeight = 0.0, quantity = 1) => {
  const { multiplier, optionParsed } = parseMultiplier(option);
  const NO_LETTERS_REGEX = /[a-z]/i;
  let optionValue = defaultWeight;

  // check our option hash first as an optimization then
  // revert to our parsing
  if (optionParsed === 'N/A' || _.isNil(optionParsed)) {
    optionValue = defaultWeight;
  } else if (optionValMap[optionParsed] !== undefined) {
    optionValue = optionValMap[optionParsed];
  } else if (isGram(optionParsed) || isConcentrate(optionParsed)) {
    optionValue = parseGramWeight(optionParsed);
  } else if (isOz(optionParsed) || isPartialOz(optionParsed)) {
    optionValue = parseOzWeight(optionParsed, defaultWeight);
  } else if (isMg(optionParsed)) {
    optionValue = parseMgWeight(optionParsed);
  } else if (parseFloat(optionParsed) && !NO_LETTERS_REGEX.test(optionParsed)) {
    // if we didn't pass a weight unit, we can still use the weight value
    optionValue = parseFloat(optionParsed);
  } else if (!_.isFinite(optionValue)) {
    optionValue = 0;
  }

  return parseFloat(Big(optionValue).times(multiplier).times(parseFloat(quantity)).toFixed(2));
};

export const getProductNetWeightInGrams = (product) => {
  const value = product.measurements?.netWeight?.values?.[0];
  const unit = product.measurements?.netWeight?.unit;
  if (unit !== MILLIGRAMS || !value) {
    return 0;
  }
  return Number(safeToBig(value).div(MG_TO_G));
};

export const getProductVolumeInGrams = (product) => {
  const value = product.measurements?.volume?.values?.[0];
  const unit = product.measurements?.volume?.unit;
  if (unit !== MILLILITERS || !value) {
    return 0;
  }
  return Number(safeToBig(value)); // 1ml === 1g
};

export const getProductVolumeInOunces = (product) => {
  const value = product.measurements?.volume?.values?.[0];
  const unit = product.measurements?.volume?.unit;
  if (unit !== MILLILITERS || !value) {
    return 0;
  }
  return Number(safeToBig(value).div(MILLILITERS_PER_OZ).round(5));
};

export const getEquivalent = (product, option, quantity, field = `standardEquivalent`) => {
  const childProduct = _.find(product.POSMetaData?.children, { option });
  const equivalentUnit = _.get(childProduct, `${field}.unit`);
  const equivalentValue = equivalentUnit === 'g' && _.get(childProduct, `${field}.value`);

  return equivalentValue ? equivalentValue * quantity : null;
};

export function formatWeightOptions({
  options = [],
  prices = [],
  limitsPerCustomer = [],
  optionsBelowThreshold = [],
  optionsBelowKioskThreshold = [],
  weightOnlyLabel = false,
  manualInventory = [],
  isKiosk = false,
  showQualifyingOptions = false,
  qualifyingOptions = [],
}) {
  const chain = flow(
    map.convert({ cap: false })((opt, i) => {
      const price = parseFloat(prices[i]).toFixed(2);
      let label;
      if (weightOnlyLabel) {
        label = opt.weight
          ? opt.weight.replace(`oz`, ` oz`).replace(`gC`, `g`)
          : opt.replace(`oz`, ` oz`).replace(`gC`, `g`);
      } else {
        label = `${
          opt.weight ? opt.weight.replace(`oz`, ` oz`).replace(`gC`, `g`) : opt.replace(`oz`, ` oz`).replace(`gC`, `g`)
        } - $${price}`;
      }

      return { value: opt, price, label };
    }),
    filter(({ value }) => {
      const limit = getLimitPerCustomer({ limitsPerCustomer }, value);

      if (limit === 0) {
        return false;
      }

      if (!isKiosk && optionsBelowThreshold?.length && _.includes(optionsBelowThreshold, value)) {
        return false;
      }

      if (isKiosk && optionsBelowKioskThreshold?.length && _.includes(optionsBelowKioskThreshold, value)) {
        return false;
      }

      if (manualInventory?.length) {
        const inventoryOption = _.find(manualInventory, [`option`, value]);

        if (inventoryOption) {
          return inventoryOption.inventory > 0;
        }

        return true;
      }

      if (showQualifyingOptions && !_.includes(qualifyingOptions, value)) {
        return false;
      }

      return true;
    }),
    uniqBy(({ value }) => _.replace(value, 'C', ''))
  );

  return chain(options);
}

export const getThreshold = (product, integration) => (integration?.thresholds || {})[product.type] || 5;

export const imgixProductImageURL = (imagePath) => _.replace(imagePath, LEGACY_AWS_SOURCE, IMGIX_SOURCE);

export const imageToUse = (product = {}) => {
  const activeImages = _.filter(product.images ?? [], [`active`, true]);
  const productImage = _.isEmpty(_.head(activeImages)?.url) ? null : _.head(activeImages)?.url;
  const brandImage = _.isEmpty(product.brand?.imageUrl) ? null : product.brand?.imageUrl;
  const productStockImage = _.isEmpty(product.stockImage) ? null : product.stockImage;
  const legacyBrandImage = _.isEmpty(product.brandLogo) ? null : product.brandLogo;
  const legacyProductImage = _.isEmpty(product.Image) ? null : product.Image;

  const legacyDefaultImageLookupType =
    product.type === 'Flower' && product.strainType ? product.strainType : product.type;
  const legacyDefaultImage = DefaultImages[legacyDefaultImageLookupType];

  return (
    productImage ?? brandImage ?? productStockImage ?? legacyProductImage ?? legacyBrandImage ?? legacyDefaultImage
  );
};

export const getCanonicalIDForOption = (product, option) => {
  if (product.POSMetaData.children.length) {
    return _.find(product.POSMetaData.children, { option })?.canonicalID;
  }

  return product.POSMetaData.canonicalID;
};

export const formatWeight = (valProp) => {
  /*
   * format a weight for comparison
   * acceptable units of mass from js-quantities
   * ["AMU", "carat", "dalton", "dram", "grain", "gram", "kilogram",
   * "metric-ton", "ounce", "pound", "short-ton", "slug", "stone"]
   */
  const possibleWeights = [
    { str: ` oz`, repl: ` ounce` },
    { str: `oz`, repl: ` ounce` },
    { str: ` g`, repl: ` gram` },
    { str: `g`, repl: ` gram` },
    { str: ` gC`, repl: ` gram` },
    { str: `gC`, repl: ` gram` },
  ];
  const val = valProp.replace(`[dot]`, `.`);
  let matchedStringIndex = ``;
  _.forEach(possibleWeights, (w, i) => (_.includes(val, w.str) ? (matchedStringIndex = i) : null));
  if (_.isString(matchedStringIndex)) {
    console.error(`Unable to parse `, val);
    return new Error();
  }
  const unitTypedVal = val
    .replace(possibleWeights[matchedStringIndex].str, possibleWeights[matchedStringIndex].repl)
    .replace('  ', ' ');
  // convert to decimal if needed
  let decimalVal = unitTypedVal;
  if (_.includes(unitTypedVal, '/')) {
    const valUnitSplit = _.split(unitTypedVal, ' ');
    const fractionSplit = _.split(valUnitSplit[0], '/');
    const decimal = parseInt(fractionSplit[0], 10) / parseInt(fractionSplit[1], 10);
    decimalVal = `${decimal} ${valUnitSplit[1]}`;
  }

  return decimalVal;
};

// Temporarily check the Title Cased effects and camelCased effects
export const filterLegacyEffects = (effects) =>
  _.filter(
    effects,
    (effect) => _.includes(productEffects, effect) || _.includes(normalizeProductEffects(productEffects), effect)
  );

export const normalizeProductEffects = (effects) => _.map(effects, (effect) => _.camelCase(effect));

export const applicableEffectsList = ({ state }) => {
  let effectList = productEffects;

  if (state && state.length) {
    const restrictedEffects = getComplianceConfig(state, `restrictions.effects`);
    if (restrictedEffects?.length) {
      effectList = _.without(effectList, ...restrictedEffects);
    }
  }

  return effectList;
};

export const applicableEffects = ({ effects, state }) => {
  const effectList = applicableEffectsList({ state });

  return _.pickBy(
    effects,
    (value, key) => _.isFinite(parseInt(value, 10)) && parseInt(value, 10) > 0 && _.includes(effectList, key)
  );
};

export function highestMatchingPrices(menuType, p1, p2) {
  const p1Price = p1[`${menuType}Prices`];
  const p2Price = p2[`${menuType}Prices`];
  if (p1Price.length === 1 && p2Price.length === 1) {
    return [p1Price[0], p2Price[0]];
  }

  for (let p1Index = p1Price.length - 1; p1Index >= 0; --p1Index) {
    for (let p2Index = p2Price.length - 1; p2Index >= 0; --p2Index) {
      if (p1.Options[p1Index] === p2.Options[p2Index]) {
        return [p1Price[p1Index], p2Price[p2Index]];
      }
    }
  }

  // worst comes to worst just return the cheapest prices...
  // (previous behavior)
  return [p1Price[0], p2Price[0]];
}

export function getSortingFunctions(menuType) {
  return {
    custom: (p1, p2) => p1.weight - p2.weight,
    brand: (p1, p2) => {
      if (p1.brandName === null) {
        return 1;
      }
      if (p2.brandName === null) {
        return -1;
      }
      if (p1.brandName > p2.brandName) {
        return 1;
      }
      if (p1.brandName < p2.brandName) {
        return -1;
      }
      if (p1.Name > p2.Name) {
        return 1;
      }
      if (p1.Name < p2.Name) {
        return -1;
      }
      return 0;
    },
    alpha: (p1, p2) => {
      if (p1.Name > p2.Name) {
        return 1;
      }
      if (p1.Name < p2.Name) {
        return -1;
      }
      return 0;
    },
    priceLowToHigh: (p1, p2) => {
      const [p1Price, p2Price] = highestMatchingPrices(menuType, p1, p2);
      return p1Price - p2Price;
    },
    priceHighToLow: (p1, p2) => {
      const [p1Price, p2Price] = highestMatchingPrices(menuType, p1, p2);
      return p2Price - p1Price;
    },
    potency: (p1, p2) => {
      const p1Potency = getPotencyValues(p1);
      const p2Potency = getPotencyValues(p2);

      if (!p2Potency.THC && !p1Potency.THC) {
        return Number(p2Potency.CBD || 0) - Number(p1Potency.CBD || 0);
      }

      return Number(p2Potency.THC || 0) - Number(p1Potency.THC || 0);
    },
    strain: (p1, p2) => StrainTypeOrder[p1.strainType] - StrainTypeOrder[p2.strainType],
  };
}

export const getProductBasePrice = (medicalOrder, item) => {
  const priceIndex = _.indexOf(item.product.Options, item.option);
  if (medicalOrder) {
    return item.product.preTaxMedPrices?.[priceIndex] || item.price;
  }
  return item.product.preTaxRecPrices?.[priceIndex] || item.price;
};

export const validateNumber = (value) => {
  if (value === '' || _.isFinite(value)) {
    return value;
  }
  return null;
};

// TODO should we also be considering units here?
export const saleSatisfiesWeightCondition = (inputWeight, operator, operatorWeights, appliesToAnyWeight = false) => {
  if (appliesToAnyWeight) {
    return true;
  }

  if (!operatorWeights || operatorWeights.length < 1) {
    return false;
  }

  /*
     here if operator weights exists we know there is some restriction
     and if that restriction doesn't include n/a we can return false
     this will prevent n/a from getting accepted as part of a weighted sale
     and will also allow us in the future to potentially include n/a as an option
     for a weighted sale (not that we would?)
  */
  if (_.toLower(inputWeight) === 'n/a') {
    return _.some(operatorWeights, (opWeight) => _.toLower(opWeight) === _.toLower(inputWeight));
  }

  // If equalTo or an array of weights (v1 discount sync only)
  if (operator === 'equalTo' || operatorWeights.length > 1) {
    return _.some(operatorWeights, (opWeight) => parseFloat(inputWeight) === parseFloat(opWeight.toString()));
  }

  if (operator === 'greaterThan') {
    return parseFloat(inputWeight) > parseFloat(operatorWeights?.[0]);
  }

  if (operator === 'greaterThanEqualTo') {
    return parseFloat(inputWeight) >= parseFloat(operatorWeights?.[0]);
  }

  return true;
};

export const productSatisfiesSaleWeight = (
  salesType = [],
  saleSpecials = [],
  formattedWeight = `N/A`,
  withSpecialData = false
) => {
  // If there are no sale specials, return early
  if (saleSpecials === null || saleSpecials?.length < 1) {
    return withSpecialData ? { appliedSpecials: [], result: false } : false;
  }
  const { salesWithRestrictions, salesWithoutRestrictions } = _.reduce(
    saleSpecials,
    (result, special) => {
      if (_.values(special?.specialRestrictions).length > 0) {
        result.salesWithRestrictions.push(special);
      } else {
        result.salesWithoutRestrictions.push(special);
      }
      return result;
    },
    { salesWithRestrictions: [], salesWithoutRestrictions: [] }
  );
  // If we have a sale without specialRestrictions, then the sale can apply as normal
  if (salesWithoutRestrictions.length > 0) {
    return withSpecialData ? { appliedSpecials: [...saleSpecials], result: true } : true;
  }

  const appliedSpecials = [];
  const specialRestrictions = _.map(salesWithRestrictions, (s, i) => ({
    [s._id || s.specialId || i]: s.specialRestrictions,
  }));
  const weight = getProductWeight(formattedWeight);
  let hasApplicableSpecial = false;
  let hasMatchingRestriction = false;

  _.forEach(specialRestrictions, (special) => {
    const specialId = _.keys(special)[0];
    const restrictions = Object.entries(_.values(special)[0] || {});

    _.forEach(restrictions, ([key, condition]) => {
      // if we found a matching restriction, see if this product weight applies
      if (_.includes(salesType, key)) {
        hasMatchingRestriction = true;
        const weights = _.map(condition.weights || [condition.weight], (conditionWeight) =>
          getProductWeight(conditionWeight)
        );
        if (saleSatisfiesWeightCondition(weight, condition.weightOperator, weights)) {
          hasApplicableSpecial = true;
          if (withSpecialData && !_.includes(appliedSpecials, specialId)) {
            appliedSpecials.push({ specialId, weight: condition.weight });
          }
        }
      }
    });
  });

  // if none of the salesType items are in the specialRestrictions then we can return true (i.e. Any Weight)
  hasApplicableSpecial = hasApplicableSpecial || !hasMatchingRestriction;
  return withSpecialData ? { appliedSpecials, result: hasApplicableSpecial } : hasApplicableSpecial;
};

export const getSpecialBadgeType = (salesType = [], saleSpecials = [], weights = []) => {
  const satisfies = [];
  const appliedSpecials = [];

  _.forEach(weights, (weight) => {
    const data = productSatisfiesSaleWeight(salesType, saleSpecials, weight, true);
    if (data.result) {
      satisfies.push(true);
      _.forEach(data.appliedSpecials, (special) => {
        if (special?.specialId && !_.find(appliedSpecials, [`specialId`, special.specialId])) {
          appliedSpecials.push({ ...special });
        }
      });
    } else {
      satisfies.push(false);
    }
  });

  const uniqueWeights = _.map(appliedSpecials, `weight`);
  if (_.every(satisfies, Boolean) && (uniqueWeights.length === 0 || satisfies.length === uniqueWeights.length)) {
    return `pill`;
  }

  if (_.some(satisfies, Boolean)) {
    return `label`;
  }
  return `none`;
};

export const getSalesType = (product) => [
  product.brandId || product?.brand?.id || product.brandName || product?.brand?.name,
  product.type,
  product.subcategory,
  product._id || product.id,
  !product.subcategory ? `uncategorized_${product.type}` : null,
];

/** @return {CategoriesForMenu} */
export const getCategoriesForMenuForState = (state) => {
  if (_.includes(['FL', 'NY'], state)) {
    const categories = _.clone(CategoriesForMenu);

    categories.splice(5, 0, {
      key: 'orals',
      label: 'Orals',
      value: 'Oral',
    });

    return categories;
  }

  if (state === 'PA') {
    return _.map(CategoriesForMenu, (category) => {
      if (category.key === 'edibles') {
        return {
          key: 'ingestibles',
          label: 'Ingestibles',
          value: 'Edible',
        };
      }

      return category;
    });
  }

  return CategoriesForMenu;
};

export const getSubcategoryOptionsForState = (state) => {
  const options = _.clone(SubcategoryOptions);
  if (state === 'FL') {
    const [oralOptions, edibleOptions] = _.partition(options.Edible, ({ key }) =>
      _.includes(FloridaOralSubcategories, key)
    );

    _.set(
      options,
      'Edible',
      _.filter(edibleOptions, ({ key }) => key !== 'drinks')
    );
    _.set(options, 'Oral', oralOptions);
  }

  if (state === 'NY') {
    const [oralOptions, edibleOptions] = _.partition(options.Edible, ({ key }) =>
      _.includes(FloridaOralSubcategories, key)
    );

    _.set(options, 'Edible', edibleOptions);
    _.set(options, 'Oral', oralOptions);
  }

  return options;
};

// eslint-disable-next-line lodash/prefer-lodash-method
export const getCategoryForProduct = (product) => CategoryOptions.find(({ value }) => value === product?.type);

export const getCategoryOptionsForRetailer = (dispensary) => {
  const { state } = dispensary?.location ?? {};

  if (state === 'FL') {
    const options = _.map(CategoryOptions, (category) => {
      if (category.key === 'edibles') {
        return {
          key: 'edibles',
          label: 'Edibles',
          value: 'Edible',
          subcategories: _.filter(
            SubcategoryOptions.Edible,
            ({ key }) => !_.includes(FloridaOralSubcategories.concat('drinks'), key)
          ),
        };
      }

      return category;
    });
    options.splice(6, 0, {
      key: 'orals',
      label: 'Orals',
      value: 'Oral',
      subcategories: _.filter(SubcategoryOptions.Edible, ({ key }) => _.includes(FloridaOralSubcategories, key)),
    });

    return options;
  }

  if (state === 'NY') {
    const options = _.clone(CategoryOptions);
    options.splice(6, 0, {
      key: 'orals',
      label: 'Orals',
      value: 'Oral',
      subcategories: _.filter(SubcategoryOptions.Edible, ({ key }) => _.includes(FloridaOralSubcategories, key)),
    });

    return options;
  }

  if (state === 'PA') {
    return _.map(CategoryOptions, (category) => {
      if (category.key === 'edibles') {
        return {
          key: 'ingestibles',
          label: 'Ingestibles',
          value: 'Edible',
          subcategories: SubcategoryOptions.Edible,
        };
      }

      return category;
    });
  }

  return CategoryOptions;
};

export const getSubcategoryOptionsForRetailer = (dispensary) => {
  const { state } = dispensary?.location ?? {};
  const options = _.clone(SubcategoryOptions);

  if (state === 'FL') {
    const [oralOptions, edibleOptions] = _.partition(options.Edible, ({ key }) =>
      _.includes(FloridaOralSubcategories, key)
    );

    _.set(
      options,
      'Edible',
      _.filter(edibleOptions, ({ key }) => key !== 'drinks')
    );
    _.set(options, 'Oral', oralOptions);
  }

  if (state === 'NY') {
    const [oralOptions, edibleOptions] = _.partition(options.Edible, ({ key }) =>
      _.includes(FloridaOralSubcategories, key)
    );

    _.set(options, 'Edible', edibleOptions);
    _.set(options, 'Oral', oralOptions);
  }

  return options;
};

export const getCategoryDisplayOptionsForState = (state) => {
  const options = _.clone(CategoryDisplayNames);
  if (_.includes(['FL', 'NY'], state)) {
    options.Oral = 'Orals';
  }

  return options;
};

export const getProductImage = (product = {}) => {
  const productImage = {
    _id: product._id,
    url: product.url,
    userId: product.userId,
    active: product.active ?? true,
    origin: product.origin ?? 'admin',
    description: '',
    label: '',
  };

  return productImage;
};

export const getFirstActiveImage = (images) => {
  // eslint-disable-next-line lodash/prefer-lodash-method
  const firstActiveImage = images.find((img) => img.active === true);
  return firstActiveImage;
};

export const strainEffects = {
  Indica: {
    Relaxed: 9,
    Sleepy: 8,
    Happy: 8,
  },
  Sativa: {
    Energetic: 9,
    Happy: 9,
    Creative: 8,
    Focused: 8,
    Inspired: 8,
  },
  Hybrid: {
    Calm: 9,
    Happy: 8,
    Relaxed: 6,
    Energetic: 5,
  },
  'High CBD': {
    'Clear Mind': 9,
    Calm: 8,
    Relaxed: 5,
    Happy: 5,
  },
};
