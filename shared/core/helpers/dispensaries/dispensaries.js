import _ from 'lodash';
import moment from 'moment';
import { removeTypename } from 'shared/helpers/utils';
import { findNextOpenDay, guessTimezone } from 'shared/helpers/date-time';
import { CanadianDefaultRewardProgramName, DefaultRewardProgramName } from '../../constants/dispensaries';
import { getComplianceConfig } from '../compliance';

const getOpenInfo = ({
  serviceType,
  timezone,
  standardHours,
  specialHours,
  isServiceOffered,
  useOrderTypesConfigV2 = false,
}) => {
  const defaultOpenInfo = {
    isOpen: false,
    isClosed: true,
    nextService: {
      openMoment: null,
      openString: `Time unknown`,
      closeMoment: null,
    },
  };

  if (!isServiceOffered) {
    return defaultOpenInfo;
  }
  timezone = timezone || guessTimezone();
  const now = moment().tz(timezone);
  const nextOpenDay = findNextOpenDay({
    serviceType,
    standardHours,
    specialHours,
    timezone,
    now,
    useOrderTypesConfigV2,
  });
  if (!nextOpenDay || _.keys(nextOpenDay).length === 0) {
    return defaultOpenInfo;
  }

  const { date, openMoment, closeMoment } = nextOpenDay;
  let nextDayString = `on ${date.format('dddd')}`;
  if (date.isSame(now, 'day')) {
    nextDayString = 'today';
  }
  const openString = `${openMoment.format('h:mmA')} ${nextDayString}`;
  const isOpen = now.isBetween(openMoment, closeMoment);
  return {
    isOpen,
    isClosed: !isOpen,
    nextService: {
      openMoment,
      closeMoment,
      openString,
    },
  };
};

/**
 * @param {Dispensary} dispensary
 * @returns {boolean}
 */
export const isRecMed = ({ medicalDispensary, recDispensary }) => !!medicalDispensary && !!recDispensary;

export const hasIsolatedMenus = (dispensary = {}) => {
  const { location, storeSettings } = dispensary;

  return (
    storeSettings?.isolatedMenus || (isRecMed(dispensary) && getComplianceConfig(location?.state, 'isolatedMenus'))
  );
};

/**
 * @typedef {{recDispensary?: boolean | null, medicalDispensary?: boolean | null}} Dispensary
 */
/**
 * @param {Dispensary} dispensary
 * @returns {boolean}
 */
export const isMedOnly = ({ medicalDispensary, recDispensary }) => !!medicalDispensary && !recDispensary;

/**
 * @param {Dispensary} dispensary
 * @returns {boolean}
 */
export const isRecOnly = ({ medicalDispensary, recDispensary }) => !medicalDispensary && !!recDispensary;

export const getDefaultRewardProgramDisplayName = ({ location = {} }) =>
  location?.country === 'Canada' ? CanadianDefaultRewardProgramName : DefaultRewardProgramName;

export function requiresCustomerState(dispensary) {
  return !!getComplianceConfig(dispensary?.location?.state, 'outOfStateLimits');
}

/*
 * Javascript date has no internal knowledge about
 * timezone whereas moment does.  We are only going
 * to use moment in these calculations for that reason.
 */
export function openInfoForDispensary(dispensary, { previewMode = false } = {}) {
  if (previewMode || !dispensary) {
    return {
      pickup: {
        isOpen: true,
        isClosed: false,
        nextService: {
          openMoment: null,
          openString: 'Next pickup opportunity unknown',
          closeMoment: null,
        },
      },
      delivery: {
        isOpen: true,
        isClosed: false,
        nextService: {
          openMoment: null,
          openString: 'Next delivery opportunity unknown',
          closeMoment: null,
        },
      },
    };
  }
  const {
    timezone,
    deliveryHours = {},
    pickupHours = {},
    specialHours = {},
    effectiveHours = {},
    orderTypesConfig,
    offerAnyPickupService = true,
  } = dispensary;
  return {
    pickup: getOpenInfo({
      serviceType: 'pickup',
      timezone,
      effectiveHours: effectiveHours.pickupHours,
      standardHours: pickupHours,
      specialHours,
      isServiceOffered: offerAnyPickupService,
    }),
    delivery: getOpenInfo({
      serviceType: 'delivery',
      timezone,
      effectiveHours: effectiveHours.deliveryHours,
      standardHours: deliveryHours,
      specialHours,
      isServiceOffered: orderTypesConfig?.delivery.enabled ?? true,
    }),
  };
}

export function openInfoForDispensaryV2(dispensary, { _previewMode = false } = {}) {
  const orderTypes = ['inStorePickup', 'curbsidePickup', 'driveThruPickup', 'delivery'];
  const openInfo = {};

  _.forEach(orderTypes, (orderType) => {
    const defaultOpenInfo = {
      isOpen: true,
      isClosed: false,
      nextService: {
        openMoment: null,
        openString: `Time unknown`,
        closeMoment: null,
      },
    };
    _.set(openInfo, orderType, defaultOpenInfo);
  });

  if (!dispensary) {
    return openInfo;
  }

  const { timezone, hoursSettings } = dispensary;
  const enabledOrderTypes = getEnabledV2OrderTypes(dispensary);

  _.forEach(orderTypes, (orderType) => {
    const hoursSettingsForOrderType = hoursSettings?.[orderType] ?? {};
    _.set(
      openInfo,
      orderType,
      getOpenInfo({
        serviceType: orderType,
        timezone,
        standardHours: hoursSettingsForOrderType.hours,
        specialHours: hoursSettingsForOrderType.specialHours,
        isServiceOffered: _.includes(enabledOrderTypes, orderType),
        useOrderTypesConfigV2: true,
      })
    );
  });

  return openInfo;
}

/**
 * @param {Dispensary} dispensary
 * @returns {Array<string>}
 */
export function getEnabledV2OrderTypes(dispensary) {
  if (!dispensary || (!dispensary.enabledOrderTypes && !dispensary.orderTypesConfig)) {
    return [];
  }

  const { enabledOrderTypes, orderTypesConfig } = dispensary;

  // Helper is being called from the API and doesn't have
  // access to the serialized enabledOrderTypes field, use
  // the orderTypesConfig Mongo data instead
  if (!enabledOrderTypes) {
    const orderTypes = {
      ...(_.omit(removeTypename(orderTypesConfig), ['pickup', 'kiosk', '_id']) || {}),
      inStorePickup: orderTypesConfig.pickup,
    };

    return _.filter(_.keys(orderTypes), (orderType) => {
      const { enabled, enableASAPOrdering, enableScheduledOrdering } = orderTypes[orderType];
      return enabled && (enableASAPOrdering || enableScheduledOrdering);
    });
  }

  // Helper is being called from the client and can use the
  // serialized enabledOrderTypes field on the dispensary
  const orderTypes = _.omit(removeTypename(enabledOrderTypes), ['pickup', 'kiosk']) || {};
  return _.filter(_.keys(orderTypes), (orderType) => orderTypes[orderType]);
}

export function areSpecialHoursToday(dispensary) {
  const { hoursSettings, specialHours = {} } = dispensary;
  const today = moment().format('YYYY-MM-DD');

  if (!hoursSettings || !specialHours) {
    return false;
  }

  const checkSpecialHours = (specialHourArr) => {
    if (specialHourArr?.length) {
      const isDuringSpecialHours = _.some(specialHourArr, (specialHour) => {
        const { startDate, endDate } = specialHour;
        const startMoment = moment(startDate);
        const endMoment = moment(endDate);

        return startMoment.isSameOrBefore(today, 'day') && endMoment.isSameOrAfter(today, 'day');
      });

      return isDuringSpecialHours;
    }
    return false;
  };

  if (hoursSettings) {
    const {
      inStorePickup: { specialHours: inStoreSpecialHours = {} },
      curbsidePickup: { specialHours: curbsideSpecialHours = {} },
      driveThruPickup: { specialHours: driveThruSpecialHours = {} },
      delivery: { specialHours: deliverySpecialHours = {} },
    } = hoursSettings;

    const allSpecialHours = _.concat(
      inStoreSpecialHours,
      curbsideSpecialHours,
      driveThruSpecialHours,
      deliverySpecialHours
    );

    return checkSpecialHours(allSpecialHours);
  }

  return checkSpecialHours(specialHours);
}

export function collectScheduledData(dispensary, orderType, schedulingOption, reservationSlots) {
  const openInfoV2 = openInfoForDispensaryV2(dispensary);
  const currentOrderType = orderType ?? _.findKey(openInfoV2, `isOpen`);
  const nextService = openInfoV2[currentOrderType]?.nextService;
  const scheduledOrderingEnabled = dispensary?.orderTypesConfigV2[currentOrderType]?.enableScheduledOrdering;
  let afterHoursEnabled = dispensary?.orderTypesConfigV2[currentOrderType]?.enableAfterHoursOrdering;
  const afterHoursInEffect = openInfoV2[currentOrderType]?.isClosed && afterHoursEnabled;

  if (currentOrderType === 'delivery') {
    afterHoursEnabled = afterHoursEnabled && scheduledOrderingEnabled;
  }

  return {
    dispensaryId: dispensary?.id,
    orderType: currentOrderType,
    orderTypeHours: removeTypename(dispensary?.hoursSettings[currentOrderType]),
    orderTypeOpenInfo: {
      ...openInfoV2[currentOrderType],
      nextService: {
        ...nextService,
        openMoment: nextService.openMoment?.format(),
        closeMoment: nextService.closeMoment?.format(),
      },
    },
    scheduledOrderingEnabled,
    afterHoursEnabled,
    afterHoursInEffect,
    schedulingOption,
    reservationSlots,
  };
}
