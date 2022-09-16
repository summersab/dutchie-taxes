import gql from 'graphql-tag';

import baseDispensaryFragment from '../fragments/base-dispensary.gql';
import taxProperties from '../fragments/tax-properties-fragment.gql';
import weeklyHoursFragment from '../fragments/weekly-hours-fragment.gql';
import hoursSettingsForOrderTypeFragment from '../fragments/hours-settings-for-order-type-fragment.gql';
import inStorePickupOrderingSettingsFragment from '../fragments/in-store-pickup-ordering-settings-fragment.gql';
import curbsidePickupOrderingSettingsFragment from '../fragments/curbside-pickup-ordering-settings-fragment.gql';
import driveThruPickupOrderingSettingsFragment from '../fragments/drive-thru-pickup-ordering-settings-fragment.gql';
import deliveryOrderingSettingsFragment from '../fragments/delivery-ordering-settings-fragment.gql';
import deliveryZonesFragment from '../fragments/delivery-zones-fragment.gql';
import kioskOrderingSettingsFragment from '../fragments/kiosk-ordering-settings-fragment.gql';

export const chainDispensaryIds = gql`
  query ChainDispensaryIds($chainId: String, $status: String) {
    chainDispensaryIds(chainId: $chainId, status: $status)
  }
`;

export const chainDispensariesByStatus = gql`
  query ChainDispensariesByStatus($chainId: String, $status: String) {
    chainDispensariesByStatus(chainId: $chainId, status: $status) {
      id
      retailer {
        id
        assignedToBillingGroup
      }
    }
  }
`;

export const dispensaryAvailableReservations = gql`
  query DispensaryAvailableReservations($dispensaryFilter: dispensariesFilterInput!) {
    filteredDispensaries(filter: $dispensaryFilter) {
      reservationsAvailableByOrderType {
        inStorePickup {
          slotId
          startTimeISO
          endTimeISO
          quantityRemaining
        }
        curbsidePickup {
          slotId
          startTimeISO
          endTimeISO
          quantityRemaining
        }
        driveThruPickup {
          slotId
          startTimeISO
          endTimeISO
          quantityRemaining
        }
        delivery {
          slotId
          startTimeISO
          endTimeISO
          quantityRemaining
        }
        pickup {
          slotId
          startTimeISO
          endTimeISO
          quantityRemaining
        }
      }
    }
  }
`;

export const consumerDispensaries = gql`
  ${baseDispensaryFragment}
  ${taxProperties}
  ${weeklyHoursFragment}
  ${hoursSettingsForOrderTypeFragment}
  ${inStorePickupOrderingSettingsFragment}
  ${curbsidePickupOrderingSettingsFragment}
  ${driveThruPickupOrderingSettingsFragment}
  ${deliveryOrderingSettingsFragment}
  ${kioskOrderingSettingsFragment}
  query ConsumerDispensaries($dispensaryFilter: dispensariesFilterInput!) {
    filteredDispensaries(filter: $dispensaryFilter) {
      ...baseDispensaryFragment
      hasMenuIntegration
      activeCategories
      consumerDispensaryIntegrations {
        alpineiq {
          enabled
          flags {
            combineDiscounts
          }
        }
        fyllo {
          enabled
          flags {
            combineDiscounts
          }
        }
        springbig {
          enabled
          flags {
            combineDiscounts
          }
        }
        sprout {
          enabled
          flags {
            combineDiscounts
          }
        }
      }
      deliveryInfo {
        withinBounds
        fee
        minimum
        feeVaries
        minimumVaries
        feeType
        percentFee
      }
      googleAnalyticsID
      googleTagManager {
        gtmID
        flags
      }
      hoursSettings {
        inStorePickup {
          ...hoursSettingsForOrderTypeFragment
          effectiveHours {
            ...weeklyHoursFragment
          }
        }
        curbsidePickup {
          ...hoursSettingsForOrderTypeFragment
          effectiveHours {
            ...weeklyHoursFragment
          }
        }
        driveThruPickup {
          ...hoursSettingsForOrderTypeFragment
          effectiveHours {
            ...weeklyHoursFragment
          }
        }
        delivery {
          ...hoursSettingsForOrderTypeFragment
          effectiveHours {
            ...weeklyHoursFragment
          }
        }
      }
      orderTypesConfigV2 {
        inStorePickup {
          ...inStorePickupOrderingSettingsFragment
        }
        curbsidePickup {
          ...curbsidePickupOrderingSettingsFragment
        }
        driveThruPickup {
          ...driveThruPickupOrderingSettingsFragment
        }
        delivery {
          ...deliveryOrderingSettingsFragment
        }
        kiosk {
          ...kioskOrderingSettingsFragment
        }
        offerAnyPickupService
        offerDeliveryService
      }
      retailer {
        enterpriseId
      }
      enabledOrderTypes {
        curbsidePickup
        delivery
        driveThruPickup
        inStorePickup
        kiosk
        pickup
      }
      merrcoPublicToken
      springbigEnabled # deprecated in favor of consumerDispensaryIntegrations.springbig.enabled
      sproutEnabled # deprecated in favor of consumerDispensaryIntegrations.sprout.enabled
      taxConfig {
        calculationMethod
        discountTaxOrder
        taxes {
          ...taxProperties
          destinationRate
        }
        version
      }
      webCustomizationSettings {
        colorSettings {
          navBarColor
          linkColor
        }
        fontSettings {
          family
        }
      }
      imageBanners {
        _id
        image
        mobileImage
        link
        alt
        position
      }
    }
  }
`;

export const adminDispensaries = gql`
  ${baseDispensaryFragment}
  ${taxProperties}
  ${hoursSettingsForOrderTypeFragment}
  ${inStorePickupOrderingSettingsFragment}
  ${curbsidePickupOrderingSettingsFragment}
  ${driveThruPickupOrderingSettingsFragment}
  ${deliveryOrderingSettingsFragment}
  ${deliveryZonesFragment}
  ${kioskOrderingSettingsFragment}
  query AdminDispensaries($dispensaryFilter: dispensariesFilterInput!) {
    filteredDispensaries(filter: $dispensaryFilter) {
      ...baseDispensaryFragment
      hoursSettings {
        inStorePickup {
          ...hoursSettingsForOrderTypeFragment
        }
        curbsidePickup {
          ...hoursSettingsForOrderTypeFragment
        }
        driveThruPickup {
          ...hoursSettingsForOrderTypeFragment
        }
        delivery {
          ...hoursSettingsForOrderTypeFragment
        }
      }
      orderTypesConfigV2 {
        inStorePickup {
          ...inStorePickupOrderingSettingsFragment
        }
        curbsidePickup {
          ...curbsidePickupOrderingSettingsFragment
        }
        driveThruPickup {
          ...driveThruPickupOrderingSettingsFragment
        }
        delivery {
          ...deliveryOrderingSettingsFragment
          ...deliveryZonesFragment
        }
        kiosk {
          ...kioskOrderingSettingsFragment
        }
        offerAnyPickupService
        offerDeliveryService
      }
      enabledOrderTypes {
        curbsidePickup
        delivery
        driveThruPickup
        inStorePickup
        kiosk
        pickup
      }
      tier
      timezone
      embeddedMenuUrl
      menuIntegration {
        live
        adapter
        lastSyncAt
        lastSyncAtISO
      }
      fleetManagementIntegration {
        live
        adapter
        flags {
          fleetManagementStatus
          onfleetStatus
        }
      }
      superAdmins {
        name
        role
        userId
      }
      dangerIntervals {
        confirmedInMinutes
        readyForPickupInMinutes
        inTransitInMinutes
        inTransitClosedInMinutes
      }
      menuWeights
      isLibrary
      hideFromCCT
      firstActiveAt
      firstActiveAtISO
      embedSettings {
        iframeCSS
        pageCSS
        autoGTM
        autoScroll
        autoScrollOffset
        disclaimerTextHtml
        disableRouting
        disablePageLoadsAtTop
        applyToAllLocations
      }
      customDomainSettings {
        domain
      }
      plusSettings {
        checkoutUrl
        defaultReturnUrl
      }
      printedMenuSettings {
        Categories {
          category
          enabled
        }
        StrainTypes {
          strainType
          backgroundColor
          borderColor
        }
        Photos {
          enabled
        }
        HeaderText {
          text
        }
        FooterText {
          text
        }
        PageBreaks {
          enabled
        }
        MenuType {
          type
        }
      }
      retailer {
        id
        assignedToBillingGroup
        enterpriseId
        enterprise {
          id
          billingVersion
        }
      }
      taxConfig {
        version
        calculationMethod
        discountTaxOrder
        taxes {
          ...taxProperties
        }
      }
      messagingSettings {
        disableConfirmation
        disableReadyForPickup
        disableStartDelivery
        notifySid
      }
      orderStatusEmailSettings {
        disableSubmitted
        disableConfirmed
        disableReadyForPickup
        disableOutForDelivery
      }
      storeSettings {
        rewardsIntegrationConfiguration {
          rewardsProgramDisplayName
        }
      }
      webCustomizationSettings {
        colorSettings {
          navBarColor
          linkColor
        }
        fontSettings {
          family
        }
      }
    }
  }
`;

export const dispensaryNamesAndIds = gql`
  query DispensaryNamesAndIds {
    dispensaryNamesAndIds {
      id
      name
    }
  }
`;

export const chainDispensaryNamesAndIds = gql`
  query ChainDispensaryNamesAndIds($chainId: String) {
    chainDispensaryNamesAndIds(chainId: $chainId) {
      id
      name
      address
      retailer {
        id
        assignedToBillingGroup
      }
    }
  }
`;

export const getDeliveryInfo = gql`
  query GetDeliveryInfo($input: getDeliveryInfoInput!) {
    getDeliveryInfo(input: $input) {
      withinBounds
      fee
      minimum
      feeVaries
      minimumVaries
    }
  }
`;

export const pendingDispensaries = gql`
  query PendingDispensaries($searchStr: String, $sort: sortInput, $page: Int, $perPage: Int) {
    pendingDispensaries(searchStr: $searchStr, sort: $sort, page: $page, perPage: $perPage) {
      meta {
        totalCount
      }
      dispensaries {
        id
        name
        createdAt
        createdAtISO
        phone
      }
    }
  }
`;

export const activeDispensaries = gql`
  query ActiveDispensaries($params: activeDispensariesInput) {
    activeDispensaries(params: $params) {
      meta {
        allStates
        accountExecutives {
          name
          role
          userId
        }
        customerSuccessManagers {
          name
          role
          userId
        }
      }
      dispensaries {
        _id
        devices {
          lastSeenAt
          versionNumber
        }
        integration {
          lastSyncAt
          lastSyncAtISO
          adapter
        }
        profile {
          status
          name
          chain
          lastThirtyDaysSales
          menuScore
          connectedProductPercentage
          embeddedPageViews
          hideFromCCT
          cName
        }
      }
    }
  }
`;

export const getTimezone = gql`
  query GetTimezone($lat: Float, $lng: Float, $timeStamp: Int!) {
    getTimezone(lat: $lat, lng: $lng, timeStamp: $timeStamp) {
      timezone
    }
  }
`;
