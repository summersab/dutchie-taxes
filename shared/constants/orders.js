/* eslint-disable max-len */
import _ from 'lodash';

export const OrderFlows = {
    pickup: ['open', 'confirmed', 'closed'],
    delivery: ['open', 'confirmed', 'inTransit', 'closed'],
};

export const MARKETING_CAMPAIGN_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export const CURBSIDE_PICKUP_SPECIAL_INSTRUCTIONS = 'This order is for Curbside Pickup.\n';
export const DRIVE_THRU_PICKUP_SPECIAL_INSTRUCTIONS = 'This is a drive thru order.\n';
export const DELIVERY_CUSTOMER_ERROR = 'cannot submit multiple orders from same customer to this dispensary on same day';
export const DELIVERY_ADDRESS_ERROR = 'cannot submit multiple orders from same address to this dispensary on same day';
export const PAUSED_ORDERS_CLOSED_ERROR = "We're closed at the moment due to extremely high demand. Stay tuned though, we'll reopen soon!";
export const DELIVERY_ERRORS = {
    CUSTOMER: 'CUSTOMER',
    ADDRESS: 'ADDRESS',
};

export const POSTAL_CODE_ERROR = 'We were unable to verify your card information. Please ensure the postal code entered matches what is on file at your bank for this card.';

export const OrderFilterOptions = [{
    name: 'delivery-available',
    key: 'deliveryAvailable',
    label: 'Delivery Available',
}, {
    name: 'free-delivery',
    key: 'freeDelivery',
    label: 'Free Delivery',
}, {
    name: 'no-delivery-minimum',
    key: 'noDeliveryMinimum',
    label: 'No Delivery Minimum',
}, {
    name: 'accepts-credit-cards',
    key: 'acceptsCreditCards',
    label: 'Accepts Credit Cards',
}, ];

export const PAYMENT_CASH = 'cash';
export const PAYMENT_DUTCHIEPAY = 'dutchiePay';
export const PAYMENT_CREDIT_CARD = 'creditCard';

// Order of these keys is important for
// firstValidPaymentOption to work correctly.
// We want to start with in store, then cash
export const paymentMethodsToDisplayNames = {
    payInStore: 'In Store',
    inStore: 'In Store',

    [PAYMENT_CASH]: 'Cash',
    check: 'Check',

    [PAYMENT_CREDIT_CARD]: 'Credit Card',
    creditCardAtDoor: 'Credit Card',
    payOnlineHypur: 'Hypur',
    payOnlineMerrco: 'Credit Card',
    payOnlineMoneris: 'Credit Card',
    payOnlineChase: 'Credit Card',
    creditCardByPhone: 'Pay by Phone',
    inStoreCreditCard: 'Credit Card',
    credit: 'Credit Card',

    debitCard: 'Debit Card',
    debitOnly: 'Debit Card',
    debit: 'Debit Card',

    dutchiePay: 'dutchiePay',

    linx: 'Linx',
    alt36: 'Alt Thirty Six',
    canPay: 'CanPay',
    paytender: 'Paytender',
    aeropay: 'Aeropay',
};

export const orderTypesToDisplayNames = {
    pickup: 'Pickup',
    curbsidePickup: 'Curbside Pickup',
    driveThruPickup: 'Drive Thru Pickup',
    delivery: 'Delivery',
    kiosk: 'Kiosk',
};

export const orderTypesToDisplayNamesV2 = {
    inStorePickup: 'In-Store Pickup',
    curbsidePickup: 'Curbside Pickup',
    driveThruPickup: 'Drive-Thru Pickup',
    delivery: 'Delivery',
    kiosk: 'Kiosk',
};

export const orderTypesToShortNamesV2 = {
    inStorePickup: 'In-Store',
    curbsidePickup: 'Curbside',
    driveThruPickup: 'Drive-Thru',
    delivery: 'Delivery',
};

export const paysafeCardTypes = {
    VI: 'Visa',
    MC: 'Mastercard',
    // mastercard credit
    MD: 'Mastercard',
    // mastercard debit
    AM: 'Amex',
    DI: 'Discover',
};

export const paymentMethodsToDisplayNamesAdmin = {
    ...paymentMethodsToDisplayNames,
    payOnlineMerrco: 'Credit Card (Merrco)',
    payOnlineMoneris: 'Credit Card (Moneris)',
    payOnlineChase: 'Credit Card (Chase)',
};

export const validOrderTypes = Object.keys(orderTypesToDisplayNames);

export const firstValidPaymentOption = (dispensary={})=>{
    if (!dispensary.cashless) {
        return 'cash';
    }
    if (dispensary.payOnlineMerrco) {
        return 'creditCard';
    }
    const foundMethod = _.find(_.keys(paymentMethodsToDisplayNames), (key)=>dispensary[key]) || _.keys(paymentMethodsToDisplayNames)[0];

    return foundMethod;
}
;

export const defaultDurationEstimates = {
    delivery: {
        lowInMinutes: 35,
        highInMinutes: 45,
    },
    pickup: {
        lowInMinutes: 15,
        highInMinutes: 25,
    },
    curbsidePickup: {
        lowInMinutes: 15,
        highInMinutes: 25,
    },
};

export const defaultActionEstimates = {
    pickup: {
        readyInMinutes: 20,
        rangeInMinutes: 5,
    },
    delivery: {
        readyInMinutes: 25,
        rangeInMinutes: 10,
        deliveryTimeInMinutes: 20,
    },
};

// valid id's enum - graphql/order/type.js
export const archiveReasons = ({phone='', orderId=''}={})=>[{
    id: 'NOPICKUP',
    reason: 'Customer never picked up the order',
    customerMessage: `Your order #${orderId} was cancelled because it wasn’t picked up. Please contact ${phone} if you have any questions or believe this was a mistake.`,
}, {
    id: 'SOLDOUT',
    reason: 'Items on the order were sold out',
    customerMessage: `Your order #${orderId} contained a sold out item and therefore the order has been cancelled. Please contact ${phone} if you have any questions or believe this was a mistake.`,
}, {
    id: 'CANCELLED',
    reason: 'Customer asked to cancel the order',
    customerMessage: `Your order #${orderId} has been cancelled. Please contact ${phone} if you have any questions or believe this was a mistake.`,
}, {
    id: 'NOPAYMENT',
    reason: 'Customer didn’t have proper payment',
    customerMessage: `Your order #${orderId} has been cancelled. Please contact ${phone} if you have any questions or believe this was a mistake.`,
}, {
    id: 'NOIDENTIFICATION',
    reason: 'Customer didn’t have proper identification',
    customerMessage: `Your order #${orderId} has been cancelled. Please contact ${phone} if you have any questions or believe this was a mistake.`,
}, {
    id: 'BADINFO',
    reason: 'Customer entered their information incorrectly',
    customerMessage: `Your order #${orderId} has been cancelled. Please contact ${phone} if you have any questions or believe this was a mistake.`,
}, {
    id: 'COMPLIANCEVIOLATION',
    reason: 'The order violated compliance',
    customerMessage: `Your order #${orderId} has been cancelled due to compliance concerns. If you have any questions or believe this was a mistake, please contact ${phone}.`,
}, {
    id: 'OTHER',
    reason: 'Other',
    customerMessage: `Your order #${orderId} has been cancelled. Please contact ${phone} if you have any questions or believe this was a mistake.`,
}, ];

export const orderTypeToIndex = {
    pickup: 0,
    delivery: 1,
};

export const ORDER_TYPE_DELIVERY = 'delivery';
export const ORDER_TYPE_PICKUP = 'pickup';

export const indexToOrderType = [ORDER_TYPE_PICKUP, ORDER_TYPE_DELIVERY];

export const RewardsConnectionStatuses = {
    ready: 'ready',
    processing: 'processing',
    failed: 'failed',
    succeeded: 'succeeded',
};

export const RewardsBrands = {
    alpineiq: 'alpineiq',
};
