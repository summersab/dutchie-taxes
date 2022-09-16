import _ from 'lodash';
import moment from 'moment-timezone';
import { formatCurrency, removeTypename } from 'shared/helpers/utils';
import {
  getSpecialHoursDays,
  getEnabledV2OrderTypes,
  openInfoForDispensaryV2,
  openInfoForDispensary,
} from 'shared/core/helpers/dispensaries';
import { mutuallyInclusiveFeatures, defaultCategoryPhotos } from 'shared/constants';

export const getOpenNowStatus = (openInfo) =>
  openInfo.pickup?.isOpen ||
  openInfo.delivery?.isOpen ||
  openInfo.inStorePickup?.isOpen ||
  openInfo.driveThruPickup?.isOpen ||
  openInfo.curbsidePickup?.isOpen;

export const getNextServiceOpenString = (openInfo) => {
  const { pickup, delivery } = openInfo;

  if (pickup.nextService.openMoment && delivery.nextService.openMoment) {
    return pickup.nextService.openMoment.isBefore(delivery.nextService.openMoment)
      ? pickup.nextService.openString
      : delivery.nextService.openString;
  }
  if (!pickup.nextService.openMoment && delivery.nextService.openMoment) {
    return delivery.nextService.openString;
  }
  return pickup.nextService.openString;
};

export const getNextOpenV2Service = (dispensary, openInfoV2, includeDelivery = true) => {
  const enabledServices = getEnabledV2OrderTypes(dispensary);
  const filteredEnabledServices = includeDelivery ? enabledServices : _.without(enabledServices, 'delivery');
  let nextOpenService = 'inStorePickup';

  if (filteredEnabledServices.length === 0) {
    return nextOpenService;
  }

  [nextOpenService] = filteredEnabledServices; // assign the nextOpenService as the first enabled type
  const enabledOrderTypeOpenMoments = _.compact(
    _.map(filteredEnabledServices, (service) => openInfoV2[service].nextService.openMoment)
  );

  if (enabledOrderTypeOpenMoments.length === 0) {
    return nextOpenService;
  }

  const nextOpenServiceMoment = moment.min(enabledOrderTypeOpenMoments);
  nextOpenService = _.find(filteredEnabledServices, (service) =>
    nextOpenServiceMoment.isSame(openInfoV2[service].nextService.openMoment)
  );

  return nextOpenService;
};

export const getDispensaryHomePageUrl = (dispensary, isEmbedded, isMobileEcommApp = false) => {
  if (isEmbedded) {
    return dispensary?.embeddedMenuUrl;
  }
  if (isMobileEcommApp) {
    return `/mobile-ecomm/${dispensary?.cName}`;
  }
  return `/dispensary/${dispensary?.cName}`;
};
/**
 * @param {Dispensary} dispensary
 * @returns {boolean}
 */
export const isMed = ({ medicalDispensary }) => medicalDispensary;

/**
 * @param {Dispensary} dispensary
 * @returns {boolean}
 */
export const isRec = ({ recDispensary }) => !!recDispensary;

/**
 * @param {Dispensary} dispensary
 * @param {{isClosed: boolean}} openInfoForPickup
 * @param {{isClosed: boolean}} openInfoForDelivery
 * @returns {boolean}
 */
export const isAfterHoursCurrentlyAvailable = (dispensary, openInfoForPickup, openInfoForDelivery) =>
  openInfoForPickup.isClosed &&
  openInfoForDelivery.isClosed &&
  ((dispensary.offerAnyPickupService && dispensary.storeSettings?.enableAfterHoursOrderingForPickup) ||
    (dispensary.orderTypesConfig?.delivery.enabled &&
      dispensary.storeSettings?.enableAfterHoursOrderingForDelivery &&
      dispensary.storeSettings?.enableScheduledOrderingForDelivery));
/**
 * @param {Dispensary} dispensary
 * @returns {boolean}
 */
export const isAfterHoursCurrentlyAvailableV2 = (dispensary) =>
  acceptingAfterHoursForDeliveryV2(dispensary) || acceptingAfterHoursForPickupV2(dispensary);

export const shouldHideOrderEstimates = (dispensary, checkHideDeliveryEstimate = false) =>
  !!(
    dispensary?.featureFlags?.hideStoreHours ||
    dispensary?.storeSettings?.enableScheduledOrderingForPickup ||
    dispensary?.storeSettings?.enableScheduledOrderingForDelivery ||
    (checkHideDeliveryEstimate && dispensary?.featureFlags?.hideDeliveryEstimate)
  );
/**
 * @param {Dispensary} dispensary
 * @param {boolean} checkHideDeliveryEstimate
 * @returns {boolean}
 */
export const shouldHideOrderEstimatesV2 = (dispensary, Cart, checkHideDeliveryEstimate = false) => {
  const { orderTypesConfigV2 } = dispensary;
  const { isInStorePickup, isCurbsidePickup, isDriveThruPickup, isDelivery } = Cart;

  const scheduledOrderingForPickup =
    (isInStorePickup && orderTypesConfigV2?.inStorePickup.enableScheduledOrdering) ||
    (isCurbsidePickup && orderTypesConfigV2?.curbsidePickup.enableScheduledOrdering) ||
    (isDriveThruPickup && orderTypesConfigV2?.driveThruPickup.enableScheduledOrdering);
  const scheduledOrderingForDelivery = isDelivery && orderTypesConfigV2?.delivery.enableScheduledOrdering;

  return !!(
    dispensary?.featureFlags?.hideStoreHours ||
    ((scheduledOrderingForPickup || scheduledOrderingForDelivery) && Cart.reservation) ||
    (checkHideDeliveryEstimate && dispensary?.featureFlags?.hideDeliveryEstimate)
  );
};

// If we are not given a max delivery distance then any is good.
// [maxDeliveryDistance] Float in Miles
// [distanceFromDispensary] Float in Meters
export const closeEnoughForDelivery = (maxDeliveryDistance, distanceFromDispensary) =>
  !maxDeliveryDistance || parseFloat(maxDeliveryDistance) / 0.00062137 >= distanceFromDispensary;

/**
 * @param {Object}
 * @param {boolean} hasDeliveryAddress
 * @returns {string | false}
 */
export const getDeliveryFee = (
  { deliveryInfo, feeTiers, enabledOrderTypes, orderTypesConfig },
  hasDeliveryAddress = false
) => {
  let deliveryEnabled;

  // this field might not exist since this function needs to accept both a
  // dispensary as it exists in Mongo (the profile)
  // as well as the serialized Dispensary of type GqlDispensary (T_T)
  if (enabledOrderTypes) {
    deliveryEnabled = enabledOrderTypes.delivery;
  } else {
    deliveryEnabled = orderTypesConfig?.delivery?.enabled;
  }

  if (!deliveryEnabled) {
    return false;
  }

  if (!hasDeliveryAddress && deliveryInfo?.feeVaries) {
    return 'varies';
  }

  const feeType = deliveryInfo?.feeType ?? 'flat';
  if (feeType === 'flat' && _.isFinite(deliveryInfo?.fee) && !(deliveryInfo?.fee <= 0)) {
    return `${formatCurrency(deliveryInfo.fee / 100, { trimZeroCents: true })}`;
  }

  if (feeType === 'percent' && _.isFinite(deliveryInfo?.percentFee) && !(deliveryInfo?.percentFee <= 0)) {
    return `${String(deliveryInfo.percentFee)}%`;
  }

  if (!feeTiers?.length) {
    return false;
  }

  const firstFeeType = _.get(feeTiers, '0.feeType', 'flat');
  const firstFee = _.get(feeTiers, `0.${firstFeeType === 'percent' ? 'percentFee' : 'fee'}`, '') || '';
  // This logic is due to percent fees being stored as float values meaning they don't need
  // to be divided by 100 to be correctly formatted
  const parsedFee =
    firstFeeType !== 'percent' ? Number(firstFee) : parseFloat(firstFee.toString().replace(/[^\d.]/, ''));
  const hasDeliveryFee = _.isFinite(parsedFee) && parsedFee !== 0;
  const formattedFee = parsedFee % 1 === 0 ? parsedFee : parsedFee.toFixed(2);

  if (!hasDeliveryFee) {
    return false;
  }

  return firstFeeType === 'percent' ? `${parsedFee}%` : `${formatCurrency(formattedFee, { trimZeroCents: true })}`;
};

/**
 * @param {Object}
 * @param {boolean} hasDeliveryAddress
 * @returns {string | false}
 */
export const getDeliveryFeeV2 = (
  { deliveryInfo, feeTiers, enabledOrderTypes, orderTypesConfig, orderTypesConfigV2 },
  hasDeliveryAddress = false
) => {
  let deliveryEnabled;
  if (enabledOrderTypes) {
    deliveryEnabled = enabledOrderTypes.delivery;
  } else if (orderTypesConfigV2) {
    deliveryEnabled =
      orderTypesConfigV2?.delivery?.enableASAPOrdering || orderTypesConfigV2?.delivery?.enableScheduledOrdering;
  } else {
    deliveryEnabled = orderTypesConfig.delivery?.enabled;
  }

  if (!deliveryEnabled) {
    return false;
  }

  if (!hasDeliveryAddress && deliveryInfo?.feeVaries) {
    return 'varies';
  }

  const feeType = deliveryInfo?.feeType ?? 'flat';

  if (feeType === 'flat' && _.isFinite(deliveryInfo?.fee) && !(deliveryInfo?.fee <= 0)) {
    return `${formatCurrency(deliveryInfo.fee / 100, { trimZeroCents: true })}`;
  }

  if (feeType === 'percent' && _.isFinite(deliveryInfo?.percentFee) && !(deliveryInfo?.percentFee <= 0)) {
    return `${String(deliveryInfo.percentFee)}%`;
  }

  if (!feeTiers?.length) {
    return false;
  }

  const firstFeeType = _.get(feeTiers, '0.feeType', 'flat');
  const firstFee = _.get(feeTiers, `0.${firstFeeType === 'percent' ? 'percentFee' : 'fee'}`, '') || '';
  const parsedFee =
    firstFeeType !== 'percent' ? Number(firstFee) : parseFloat(firstFee.toString().replace(/[^\d.]/, ''));
  const hasDeliveryFee = _.isFinite(parsedFee) && parsedFee !== 0;
  const formattedFee = parsedFee % 1 === 0 ? parsedFee : parsedFee.toFixed(2);

  if (!hasDeliveryFee) {
    return false;
  }

  return firstFeeType === 'percent' ? `${parsedFee}%` : `${formatCurrency(formattedFee, { trimZeroCents: true })}`;
};

/**
 * @typedef {import('types/graphql').GqlWeeklyHours} GqlWeeklyHours
 * @typedef {import('types/graphql').GqlSpecialHours} GqlSpecialHours
 *
 * @param {GqlWeeklyHours} hours
 * @param {DaysOfWeek} day
 * @param {boolean} lowercaseSuffix
 * @returns {string}
 */
export const getFormattedHoursForDay = (hours, day, lowercaseSuffix = false) => {
  const { active, start, end } = hours[day] ?? {};
  const amSuffix = lowercaseSuffix ? 'am' : 'AM';
  const pmSuffix = lowercaseSuffix ? 'pm' : 'PM';

  if (!active) {
    return `${day} (Closed)`;
  }
  if (start === 'open') {
    return `${day} (24 Hours)`;
  }

  return `${day} (${start
    ?.replace(/^00/, '12')
    .replace(/:00 /i, '')
    .replace(/ AM/i, amSuffix)
    .replace(/ PM/i, pmSuffix)} -
    ${end?.replace(/:00 /i, '').replace(/ AM/i, amSuffix).replace(/ PM/i, pmSuffix)})`;
};

export const getDeliveryMinimum = (
  { deliveryInfo, orderTypesConfig, enabledOrderTypes },
  hasDeliveryAddress = false
) => {
  let deliveryEnabled;

  if (enabledOrderTypes) {
    deliveryEnabled = enabledOrderTypes.delivery;
  } else {
    deliveryEnabled = orderTypesConfig.delivery?.enabled;
  }

  if (!deliveryEnabled) {
    return false;
  }

  if (!hasDeliveryAddress && deliveryInfo?.minimumVaries) {
    return 'varies';
  }

  return _.isFinite(deliveryInfo?.minimum) && deliveryInfo?.minimum > 0 && deliveryInfo?.minimum / 100;
};

export const getPickupMinimum = ({ pickupMinimum: { enabled, minimumInCents }, offerAnyPickupService }) => {
  if (!offerAnyPickupService || !enabled || minimumInCents < 1) {
    return null;
  }

  const minimum = _.isFinite(minimumInCents) && minimumInCents > 0 && minimumInCents / 100;
  return minimum;
};

export const getDeliveryMinimumV2 = (
  { deliveryInfo, enabledOrderTypes, orderTypesConfig, orderTypesConfigV2 },
  hasDeliveryAddress = false
) => {
  let deliveryEnabled;
  if (enabledOrderTypes) {
    deliveryEnabled = enabledOrderTypes.delivery;
  } else if (orderTypesConfigV2) {
    deliveryEnabled =
      orderTypesConfigV2.delivery?.enableASAPOrdering || orderTypesConfigV2.delivery?.enableScheduledOrdering;
  } else {
    deliveryEnabled = orderTypesConfig.delivery?.enabled;
  }

  if (!deliveryEnabled) {
    return false;
  }

  if (!hasDeliveryAddress && deliveryInfo?.minimumVaries) {
    return 'varies';
  }

  return _.isFinite(deliveryInfo?.minimum) && deliveryInfo?.minimum > 0 && deliveryInfo?.minimum / 100;
};

/*
 * This return the whole orderMinimum object that includes the minimumInCents and enabled fields
 */
export const getPickupMinimumV2 = (dispensary, pickupOrderType) => {
  const { orderTypesConfigV2 } = dispensary;
  const orderTypeKey = pickupOrderType === 'pickup' ? 'inStorePickup' : pickupOrderType;
  if (!orderTypesConfigV2) {
    return null;
  }
  const minimum = orderTypesConfigV2[orderTypeKey]?.orderMinimum;
  return minimum;
};

export const getMinimumInDollars = (dispensary, isDelivery) =>
  isDelivery ? getDeliveryMinimum(dispensary, true) : getPickupMinimum(dispensary);

export const getMinimumInDollarsV2 = (dispensary, isDelivery) => {
  if (isDelivery) {
    return getDeliveryMinimumV2(dispensary, true);
  }
  const pickupMinimumV2 = getPickupMinimumV2(dispensary, 'inStorePickup');
  const pickupMinimumV2InCents = pickupMinimumV2?.minimumInCents;

  if (!pickupMinimumV2.enabled) {
    return 0;
  }

  return _.isFinite(pickupMinimumV2InCents) && pickupMinimumV2InCents > 0 && pickupMinimumV2InCents / 100;
};

export const getFirstAvailablePickupOption = ({ orderTypesConfig }) => {
  const { pickup, curbsidePickup, driveThruPickup } = orderTypesConfig;
  if (pickup.enabled) {
    return 'pickup';
  }
  if (curbsidePickup.enabled) {
    return 'curbsidePickup';
  }
  if (driveThruPickup.enabled) {
    return 'driveThruPickup';
  }
  return 'pickup';
};

export const getFirstAvailablePickupOptionV2 = (dispensary) => {
  const enabledOrderTypes = getEnabledV2OrderTypes(dispensary);
  if (_.includes(enabledOrderTypes, 'inStorePickup')) {
    return 'pickup';
  }
  if (_.includes(enabledOrderTypes, 'curbsidePickup')) {
    return 'curbsidePickup';
  }
  if (_.includes(enabledOrderTypes, 'driveThruPickup')) {
    return 'driveThruPickup';
  }
  return 'pickup';
};

export const formatDeliveryZoneInfo = (dispensary, hasDeliveryAddress, fieldsHaveLabel = true) => {
  const fee = getDeliveryFeeV2(dispensary, hasDeliveryAddress);
  const minimum = getDeliveryMinimumV2(dispensary, hasDeliveryAddress);

  let feeDisplay = fee ? `${fee} delivery fee` : `Free delivery`;
  let minimumDisplay = minimum ? `${formatCurrency(minimum, { trimZeroCents: true })} delivery min.` : `No minimum`;

  if (fee === 'varies') {
    feeDisplay = fieldsHaveLabel ? `Varies by location` : `Fee varies by location`;
  }
  if (minimum === 'varies') {
    minimumDisplay = fieldsHaveLabel ? `Varies by location` : `Minimum varies by location`;
  }

  const info = { feeDisplay, minimumDisplay, fee, minimum };

  if (fee === 'varies' && minimum === 'varies') {
    _.set(info, 'bothVary', 'Fees and minimums vary by location');
  }

  return info;
};

// Condensed version of the above delivery info formatting function
export const formatAmountMessage = (amount, label) => {
  let amtMessage;
  const formattedAmount = label === 'Minimum' ? `$${amount}` : amount;

  if (amount && amount !== '0') {
    amtMessage = `${formattedAmount} ${label}`;
  }
  if (amount && amount === 'varies') {
    amtMessage = `${label} Varies`;
  }
  if (!amount) {
    amtMessage = `No ${label}`;
  }
  return amtMessage;
};

export const formatPickupInfo = (dispensary, pickupOrderType) => {
  const minimum = getPickupMinimumV2(dispensary, pickupOrderType);
  const pickupMinimum =
    minimum.minimumInCents > 0 && minimum.enabled
      ? `${formatCurrency(minimum.minimumInCents / 100, { trimZeroCents: true })} pickup min.`
      : 'No minimum';
  const info = { pickupMinimum };
  return info;
};

export const hasNonCashPaymentOptions = (dispensaryProfile, ignoreDebit = false) => {
  const debitCard = ignoreDebit ? false : _.get(dispensaryProfile?.paymentTypesAccepted, 'debit', false);
  const linx = _.get(dispensaryProfile?.paymentTypesAccepted, 'linx', false);
  const creditCardNoInfo = _.get(dispensaryProfile?.paymentTypesAccepted, 'creditCardAtDoor', false);
  const creditCardByPhone = _.get(dispensaryProfile?.paymentTypesAccepted, 'creditCardByPhone', false);
  const alt36 = _.get(dispensaryProfile?.paymentTypesAccepted, 'alt36', false);
  const chaseOnline = _.get(dispensaryProfile?.paymentTypesAccepted, 'payOnlineChase', false);
  const hypurOnline = _.get(dispensaryProfile?.paymentTypesAccepted, 'payOnlineHypur', false);
  const merrcoOnline = _.get(dispensaryProfile?.paymentTypesAccepted, 'payOnlineMerrco', false);
  const monerisOnline = _.get(dispensaryProfile?.paymentTypesAccepted, 'payOnlineMoneris', false);
  const canPay = _.get(dispensaryProfile?.paymentTypesAccepted, 'canPay', false);
  const paytender = _.get(dispensaryProfile?.paymentTypesAccepted, 'paytender', false);
  const aeropay = _.get(dispensaryProfile?.paymentTypesAccepted, 'aeropay', false);
  const check = _.get(dispensaryProfile?.paymentTypesAccepted, 'check', false);
  const dutchiePay = _.get(dispensaryProfile?.paymentTypesAccepted, 'dutchiePay', true);

  return (
    linx ||
    creditCardNoInfo ||
    creditCardByPhone ||
    debitCard ||
    alt36 ||
    chaseOnline ||
    hypurOnline ||
    canPay ||
    merrcoOnline ||
    monerisOnline ||
    paytender ||
    aeropay ||
    check ||
    dutchiePay
  );
};

export const getAcceptedPaymentOptions = (dispensary) => {
  if (!dispensary) {
    return {
      cash: true,
      debit: false,
      credit: false,
    };
  }

  // get a list of all payment types enabled for any enabled order type, excluding kiosk
  const { orderTypesConfig } = dispensary;
  const cleanConfigs = removeTypename(orderTypesConfig);
  const nonKioskConfigs = _.filter(_.omit(cleanConfigs, 'kiosk'), { enabled: true });
  const nonKioskPaymentTypes = _.map(nonKioskConfigs, `paymentTypes`);
  const acceptedPaymentTypes = _.pickBy(_.assignInWith({}, ...nonKioskPaymentTypes, (a, b) => a || b));

  return acceptedPaymentTypes;
};

export const getAcceptedPaymentOptionsV2 = (dispensary) => {
  if (!dispensary) {
    return {
      cash: true,
      debit: false,
      credit: false,
    };
  }

  // get a list of all payment types enabled for any enabled order type, excluding kiosk
  const { orderTypesConfigV2 } = dispensary;
  const cleanConfigs = removeTypename(orderTypesConfigV2);
  const nonKioskConfigs = _.filter(
    _.omit(cleanConfigs, 'kiosk'),
    (config) => config.enableASAPOrdering || config.enableScheduledOrdering
  );
  const nonKioskPaymentTypes = _.map(nonKioskConfigs, `paymentTypes`);
  const acceptedPaymentTypes = _.pickBy(_.assignInWith({}, ...nonKioskPaymentTypes, (a, b) => a || b));

  return acceptedPaymentTypes;
};

export const getPaymentFeeForMethod = (paymentMethod, paymentFees = []) =>
  _.find(
    paymentFees,
    (feeEntry) =>
      feeEntry.paymentType === paymentMethod ||
      (feeEntry.paymentType === 'creditCardAtDoor' && paymentMethod === 'creditCard') ||
      (feeEntry.paymentType === 'debit' && paymentMethod === 'debitCard') ||
      (feeEntry.paymentType === 'debitOnly' && paymentMethod === 'debit')
  );

export const dispensaryOpenStatus = (dispensary, openInfo) => {
  const { pickup, delivery } = openInfo;
  if (pickup.isOpen || delivery.isOpen) {
    return 'open';
  }
  if (
    pickup.isClosed &&
    dispensary.offerAnyPickupService &&
    dispensary.storeSettings.enableAfterHoursOrderingForPickup
  ) {
    return 'closedButAfterHours';
  }

  return 'closed';
};

export const dispensaryStatusForUser = (dispensary, openInfo, inDeliveryRange = true, displayAvailString = true) => {
  const { offerAnyPickupService, orderTypesConfig, storeSettings } = dispensary;
  const { pickup, delivery } = openInfo;
  const afterHoursForPickupAllowed = offerAnyPickupService && storeSettings?.enableAfterHoursOrderingForPickup;
  const afterHoursForDeliveryAllowed =
    orderTypesConfig?.delivery.enabled &&
    storeSettings?.enableAfterHoursOrderingForDelivery &&
    storeSettings?.enableScheduledOrderingForDelivery;

  if (!orderTypesConfig?.offerAnyPickupService && !offerAnyPickupService && !orderTypesConfig?.delivery.enabled) {
    return `This dispensary is currently closed.`;
  }

  if (delivery.isOpen && orderTypesConfig?.delivery.enabled && pickup.isClosed && afterHoursForPickupAllowed) {
    return `Delivery${displayAvailString ? ` available` : ''}, Pickup available for pre-order`;
  }

  if (pickup.isOpen && offerAnyPickupService && delivery.isClosed && afterHoursForDeliveryAllowed) {
    return `Pickup${displayAvailString ? ` available` : ''}, Delivery available for pre-order`;
  }

  if (pickup.isClosed && delivery.isClosed && (afterHoursForPickupAllowed || afterHoursForDeliveryAllowed)) {
    const afterHourOrderTypesAvailable = (() => {
      if (afterHoursForPickupAllowed && afterHoursForDeliveryAllowed) {
        return '';
      }
      if (afterHoursForDeliveryAllowed) {
        return ' Delivery';
      }
      return ' Pickup';
    })();
    return `Closed,${afterHourOrderTypesAvailable} available for pre-order`;
  }

  if (pickup.isClosed && (delivery.isClosed || !orderTypesConfig?.delivery.enabled)) {
    const nextServiceOpen = getNextServiceOpenString(openInfo) || 'Next service opportunity unknown';
    const useOpensAt = nextServiceOpen.search('unknown') === -1;

    return `Closed.${useOpensAt ? ' Opens at' : ''} ${nextServiceOpen}`;
  }

  if (orderTypesConfig?.delivery.enabled && inDeliveryRange) {
    if (delivery.isOpen && orderTypesConfig?.delivery.enabled && !offerAnyPickupService) {
      return `Delivery${displayAvailString ? ` available` : ''}`;
    }

    if (delivery.isOpen && pickup.isOpen) {
      return `Delivery + Pickup${displayAvailString ? ` available` : ''}`;
    }

    if (delivery.isClosed && pickup.isOpen && orderTypesConfig?.delivery.enabled) {
      return `Delivery closed, Pickup${displayAvailString ? ` available` : ''}`;
    }

    if (delivery.isOpen && pickup.isClosed && offerAnyPickupService) {
      return `Delivery${displayAvailString ? ` available` : ''}, Pickup closed`;
    }
  }

  if (pickup.isOpen) {
    return `Pickup${displayAvailString ? ` available` : ''}`;
  }

  if (orderTypesConfig?.delivery.enabled && !inDeliveryRange) {
    return 'Delivery unavailable';
  }

  const nextServiceOpen = getNextServiceOpenString(openInfo) || 'Next service opportunity unknown';
  const useOpensAt = nextServiceOpen.search('unknown') === -1;
  return `${useOpensAt ? 'Opens at' : ''} ${nextServiceOpen}`;
};

export const dispensaryStatusForUserV2 = (dispensary, openInfoV2, inDeliveryRange = true) => {
  const { orderTypesConfigV2 } = dispensary;
  const { offerAnyPickupService, offerDeliveryService } = orderTypesConfigV2;
  const { inStorePickup, curbsidePickup, driveThruPickup, delivery } = openInfoV2;
  const pickupIsOpen = inStorePickup.isOpen || curbsidePickup.isOpen || driveThruPickup.isOpen;

  const afterHoursForPickup = acceptingAfterHoursForPickupV2(dispensary);
  const afterHoursForDelivery = acceptingAfterHoursForDeliveryV2(dispensary);

  const nextOpenService = getNextOpenV2Service(dispensary, openInfoV2);
  const nextOpenServiceString =
    openInfoV2[nextOpenService].nextService.openString ?? 'Next service opportunity unknown';
  const useOpensAt = nextOpenServiceString.search('unknown') === -1;

  if (!offerAnyPickupService && !offerDeliveryService) {
    return 'This dispensary is currently closed.';
  }

  if (offerDeliveryService && delivery.isOpen && !pickupIsOpen && afterHoursForPickup) {
    return 'Delivery available, Pickup available for pre-order';
  }

  if (offerAnyPickupService && pickupIsOpen && delivery.isClosed && afterHoursForDelivery) {
    return 'Pickup available, Delivery available for pre-order';
  }

  if (!pickupIsOpen && delivery.isClosed && (afterHoursForPickup || afterHoursForDelivery)) {
    const afterHourOrderTypesAvailable = (() => {
      if (afterHoursForPickup && afterHoursForDelivery) {
        return '';
      }
      if (afterHoursForDelivery) {
        return ' Delivery';
      }
      return ' Pickup';
    })();
    return `Closed,${afterHourOrderTypesAvailable} available for pre-order`;
  }

  if (!pickupIsOpen && (!offerDeliveryService || delivery.isClosed)) {
    return `Closed.${useOpensAt ? ' Opens at' : ''} ${nextOpenServiceString}`;
  }

  if (offerDeliveryService && inDeliveryRange) {
    if (delivery.isOpen && pickupIsOpen) {
      return 'Delivery + Pickup available';
    }

    if (delivery.isOpen && !offerAnyPickupService) {
      return 'Delivery available';
    }

    if (delivery.isClosed && pickupIsOpen) {
      return 'Delivery closed, Pickup available';
    }

    if (offerAnyPickupService && !pickupIsOpen && delivery.isOpen) {
      return 'Delivery available, Pickup closed';
    }
  }

  if (pickupIsOpen) {
    return 'Pickup available';
  }

  if (offerDeliveryService && !inDeliveryRange) {
    return 'Delivery unavailable';
  }

  return `${useOpensAt ? 'Opens at' : ''} ${nextOpenServiceString}`;
};

// this is just used to return the first available open pickup type
export const openInfoForPickupV2 = (openInfo) => {
  let pickupInfo = openInfo.inStorePickup;
  const otherPickupTypesInfo = _.pick(openInfo, ['curbsidePickup', 'driveThruPickup']);
  if (pickupInfo?.isClosed) {
    pickupInfo = _.head(_.toPairs(_.pickBy(otherPickupTypesInfo, ['isOpen', true])));
  }

  return _.isEmpty(pickupInfo) || !pickupInfo[0]
    ? { type: 'inStorePickup', info: openInfo.inStorePickup }
    : { type: pickupInfo[0], info: pickupInfo[1] };
};

// The next set of helpers is used to determine if after-hours
// or scheduled ordering is enabled for a dispensary.
export const scheduledOrderingEnabledForDelivery = (dispensary) => {
  if (!dispensary) {
    return false;
  }

  return dispensary.storeSettings?.enableScheduledOrderingForDelivery;
};

export const scheduledOrderingEnabledForDeliveryV2 = (dispensary) => {
  if (!dispensary) {
    return false;
  }

  return dispensary.orderTypesConfigV2?.delivery.enableScheduledOrdering;
};

export const scheduledOrderingEnabledForPickup = (dispensary) => {
  if (!dispensary) {
    return false;
  }

  return dispensary.storeSettings?.enableScheduledOrderingForPickup;
};

export const scheduledOrderingEnabledForPickupV2 = (dispensary) => {
  if (!dispensary) {
    return false;
  }

  return (
    dispensary.orderTypesConfigV2?.inStorePickup.enableScheduledOrdering ||
    dispensary.orderTypesConfigV2?.curbsidePickup.enableScheduledOrdering ||
    dispensary.orderTypesConfigV2?.driveThruPickup.enableScheduledOrdering
  );
};

export const afterHoursEnabledForDelivery = (dispensary) => {
  if (!dispensary) {
    return false;
  }

  return dispensary.storeSettings?.enableAfterHoursOrderingForDelivery;
};

export const afterHoursEnabledForDeliveryV2 = (dispensary) => {
  if (!dispensary) {
    return false;
  }
  return dispensary.orderTypesConfigV2?.delivery.enableAfterHoursOrdering;
};

export const afterHoursEnabledForPickup = (dispensary) => {
  if (!dispensary) {
    return false;
  }

  return dispensary.storeSettings?.enableAfterHoursOrderingForPickup;
};

export const afterHoursEnabledForPickupV2 = (dispensary) => {
  if (!dispensary) {
    return false;
  }
  return (
    dispensary.orderTypesConfigV2?.inStorePickup.enableAfterHoursOrdering ||
    dispensary.orderTypesConfigV2?.curbsidePickup.enableAfterHoursOrdering ||
    dispensary.orderTypesConfigV2?.driveThruPickup.enableAfterHoursOrdering
  );
};

// The next set of helpers is used to determine if a dispensary should currently be taking after hours
// orders, based on the current hours settings and whether after-hours or scheduled ordering are enabled.
export const acceptingAfterHoursForDelivery = (dispensary) => {
  if (!dispensary) {
    return false;
  }
  const { orderTypesConfig, status } = dispensary;
  const afterHoursDeliveryEnabled = afterHoursEnabledForDelivery(dispensary);
  const scheduledDeliveryEnabled = scheduledOrderingEnabledForDelivery(dispensary);

  const { delivery: deliveryOpenInfo } = openInfoForDispensary(dispensary, {});
  return (
    status === 'open' &&
    orderTypesConfig?.delivery.enabled &&
    deliveryOpenInfo.isClosed &&
    afterHoursDeliveryEnabled &&
    scheduledDeliveryEnabled
  );
};

export const acceptingAfterHoursForDeliveryV2 = (dispensary) => {
  if (!dispensary) {
    return false;
  }
  const { orderTypesConfigV2, status } = dispensary;
  const afterHoursDeliveryEnabled = afterHoursEnabledForDeliveryV2(dispensary);
  const scheduledDeliveryEnabled = scheduledOrderingEnabledForDeliveryV2(dispensary);
  const { delivery: deliveryOpenInfoV2 } = openInfoForDispensaryV2(dispensary, {});

  return (
    status === 'open' &&
    orderTypesConfigV2.offerDeliveryService &&
    deliveryOpenInfoV2.isClosed &&
    deliveryOpenInfoV2.nextService.openMoment &&
    afterHoursDeliveryEnabled &&
    scheduledDeliveryEnabled
  );
};

export const acceptingAfterHoursForPickup = (dispensary) => {
  if (!dispensary) {
    return false;
  }
  const { offerAnyPickupService, status } = dispensary;
  const afterHoursPickupEnabled = afterHoursEnabledForPickup(dispensary);

  const { pickup } = openInfoForDispensary(dispensary, {});
  return status === 'open' && offerAnyPickupService && pickup.isClosed && afterHoursPickupEnabled;
};

export const acceptingAfterHoursForPickupV2 = (dispensary) => {
  if (!dispensary) {
    return false;
  }
  const { orderTypesConfigV2, status } = dispensary;
  const { offerAnyPickupService } = orderTypesConfigV2;
  const { inStorePickup, curbsidePickup, driveThruPickup } = openInfoForDispensaryV2(dispensary, {});

  const inStoreOpenForPreOrder =
    inStorePickup.isClosed &&
    orderTypesConfigV2?.inStorePickup.enableAfterHoursOrdering &&
    inStorePickup.nextService.openMoment;
  const curbsideOpenForPreOrder =
    curbsidePickup.isClosed &&
    orderTypesConfigV2?.curbsidePickup.enableAfterHoursOrdering &&
    curbsidePickup.nextService.openMoment;
  const driveThruOpenForPreOrder =
    driveThruPickup.isClosed &&
    orderTypesConfigV2?.driveThruPickup.enableAfterHoursOrdering &&
    driveThruPickup.nextService.openMoment;

  const afterHoursPickupEnabled = inStoreOpenForPreOrder || curbsideOpenForPreOrder || driveThruOpenForPreOrder;

  return status === 'open' && offerAnyPickupService && afterHoursPickupEnabled;
};

const formatTime = (timeStr) =>
  (timeStr || '').replace(/^00/, '12').replace(' ', '').replace(':00', '').replace('AM', 'am').replace('PM', 'pm');

export const dispensaryHoursForDay = (day) => {
  if (_.isUndefined(day)) {
    return 'Closed';
  }

  const { active, start, end } = day;
  if (!active) {
    return 'Closed';
  }
  if (start === 'open' && end === 'open') {
    return 'Open 24 Hours';
  }
  if (start === end) {
    return 'Closed';
  }
  return `${formatTime(day.start)} - ${formatTime(day.end)}`;
};

export const getEffectiveHoursV2ForOrderType = (operatingHoursForType, specialHoursForType, timezone) => {
  const effectiveHours = {};
  const specialHoursDays = getSpecialHoursDays(specialHoursForType, timezone);

  const specialHoursThisWeek = _.filter(specialHoursDays, ({ date }) =>
    moment.tz(date, timezone).isSame(moment().tz(timezone), 'week')
  );

  if (specialHoursThisWeek) {
    _.forEach(specialHoursThisWeek, (day) => {
      _.set(effectiveHours, moment.tz(day.date, timezone).format('dddd'), day.hours);
    });
  }

  return {
    ...operatingHoursForType,
    ...effectiveHours,
  };
};

export function clearDependentSettingsIfFeatureDisabled({ profile }) {
  _.forEach(_.keys(mutuallyInclusiveFeatures), (key) => {
    const feature = mutuallyInclusiveFeatures[key];
    const featureEnabled = _.get(profile, feature.path, false);
    if (!featureEnabled) {
      _.forEach(feature.dependentSettingPaths, (path) => {
        _.set(profile, path, false);
      });
    }
  });
}

export function generateAcceptedPaymentsString(dispensary) {
  const { credit, debit, cash, check, linx, canPay, paytender, aeropay, dutchiePay } = dispensary.paymentTypesAccepted;
  const paymentOpts = [];
  if (cash) {
    paymentOpts.push('Cash');
  }
  if (credit) {
    paymentOpts.push('Credit');
  }
  if (debit) {
    paymentOpts.push('Debit');
  }
  if (check) {
    paymentOpts.push('Check');
  }
  if (linx) {
    paymentOpts.push('Linx');
  }
  if (canPay) {
    paymentOpts.push('CanPay');
  }
  if (paytender) {
    paymentOpts.push('Paytender');
  }
  if (aeropay) {
    paymentOpts.push('Aeropay');
  }
  if (dutchiePay) {
    paymentOpts.push('dutchiePay');
  }
  return paymentOpts.length >= 1 ? paymentOpts.join(', ') : 'Cash';
}

export function getDispensaryFeesAndOptionsInfo(UI, dispensary, useUpdatedOrderingConfig = false) {
  // TO DO: update the delivery fee, deliver min and pickup min values
  // below to use V2 settings if the V2 ordering config flag is enabled
  let fee = getDeliveryFee(dispensary, UI.hasDeliveryAddress());
  let deliveryMinimum = getDeliveryMinimum(dispensary, UI.hasDeliveryAddress());
  let pickupMinimum = _.get(dispensary, 'pickupMinimum.minimumInCents', 0);

  const enabledV2OrderTypes = getEnabledV2OrderTypes(dispensary);

  const pickupMinimumEnabled = useUpdatedOrderingConfig
    ? dispensary.orderTypesConfigV2.offerAnyPickupService &&
      _.some(
        _.map(enabledV2OrderTypes, (orderType) => dispensary.orderTypesConfigV2[orderType]),
        'orderMinimum.enabled'
      )
    : dispensary.offerAnyPickupService && dispensary.pickupMinimum?.enabled;

  const deliveryEnabled = useUpdatedOrderingConfig
    ? _.includes(enabledV2OrderTypes, 'delivery')
    : dispensary.orderTypesConfig?.delivery.enabled;

  const variesString = 'Varies by location';
  const emptyString = 'None';

  if (fee === 'varies') {
    fee = variesString;
  } else if (!parseInt(_.replace(fee, /\D/g, ''), 10)) {
    fee = emptyString;
  }

  if (deliveryMinimum === 'varies') {
    deliveryMinimum = variesString;
  } else if (parseInt(deliveryMinimum, 10)) {
    deliveryMinimum = formatCurrency(deliveryMinimum, { trimZeroCents: true });
  } else {
    deliveryMinimum = emptyString;
  }

  if (pickupMinimum === 0) {
    pickupMinimum = emptyString;
  } else {
    pickupMinimum = formatCurrency(pickupMinimum / 100, { trimZeroCents: true });
  }

  const info = [
    { label: 'Delivery Fee', value: fee, isVisible: deliveryEnabled },
    { label: 'Delivery Minimum', value: deliveryMinimum, isVisible: deliveryEnabled },
    {
      label: 'Pickup Minimum',
      value: pickupMinimum,
      isVisible: pickupMinimumEnabled,
    },
    {
      label: 'Payment Options',
      value: generateAcceptedPaymentsString(dispensary, useUpdatedOrderingConfig),
      isVisible: true,
    },
  ];
  return info;
}

export const getCategoryPhoto = (dispensaryProfile, category = {}) => {
  const photoFromDispensaryProfile = _.find(dispensaryProfile?.categoryPhotos, { category: category.value })?.src;
  const defaultPhoto =
    dispensaryProfile?.location?.state === 'UT' && category.value === 'Edible'
      ? 'https://images.dutchie.com/category-stock-photos/edibles/edibles-gummies.png'
      : defaultCategoryPhotos[category.value];
  return photoFromDispensaryProfile || defaultPhoto;
};
