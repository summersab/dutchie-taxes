import _ from 'lodash';

import {AdvancedConditionType, AdvancedRewardType, BasicConditionOrRewardType} from '../types/specials.enums.js';

// https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md#usage-with-indirection-like-workers-and-js-templates
/* eslint-disable no-unused-vars */
const $RefreshReg$ = _.noop;
const $RefreshSig$ = ()=>_.noop;
/* eslint-enable no-unused-vars */

export const bogoLogicOperators = [{
    key: 'and',
    label: 'AND',
    value: 'and'
}, {
    key: 'or',
    label: 'OR',
    value: 'or'
}, ];

export const comparisonOperators = [{
    key: 'equalTo',
    label: 'Equal to'
}, {
    key: 'greaterThan',
    label: 'Greater than'
}, ];

export const saleComparisonOperators = [{
    key: 'equalTo',
    label: 'Equal to'
}, {
    key: 'greaterThan',
    label: 'Greater than'
}, {
    key: 'greaterThanEqualTo',
    label: 'Greater than or equal to'
}, ];

export const totalSpendComparisonOperators = [{
    key: 'equalTo',
    label: 'Equal to'
}, {
    key: 'greaterThan',
    label: 'Greater than'
}, {
    key: 'greaterThanEqualTo',
    label: 'Greater than or equal to'
}, ];

export const advancedTotalSpendComparisonOperators = [{
    key: 'equalTo',
    label: 'Equal to'
}, {
    key: 'greaterThan',
    label: 'Greater than'
}, {
    key: 'greaterThanEqualTo',
    label: 'Greater than or equal to'
}, {
    key: 'between',
    label: 'Between'
}, ];

export const discountTypes = [{
    key: 'dollarDiscount',
    label: 'Dollar',
    labelShort: '$'
}, {
    key: 'percentDiscount',
    label: 'Percent',
    labelShort: '%'
}, ];

export const productGroupBogoKeys = {
    brands: 'brandName',
    categories: 'categoryName',
    individual: 'productId',
};

export const productGroupLabels = {
    brands: 'Brand',
    categories: 'Category',
    individual: 'Item',
};

export const specialsMenuTypes = [{
    key: 'medical',
    label: 'Medical'
}, {
    key: 'recreational',
    label: 'Recreational'
}, {
    key: 'both',
    label: 'Both'
}, ];

export const specialsBogoProductGroups = [{
    key: 'individual',
    label: 'Specific items'
}, {
    key: 'categories',
    label: 'Items in a category'
}, {
    key: 'brands',
    label: 'Items from a brand'
}, ];

export const specialsBogoProductGroupRewards = [...specialsBogoProductGroups, {
    key: AdvancedRewardType.itemsForADiscount,
    label: 'Bundled discount'
}, {
    key: AdvancedRewardType.itemsForAPrice,
    label: 'Bundled price'
}, ];

export const specialsBogoCustomerReceives = [...specialsBogoProductGroupRewards, {
    key: AdvancedRewardType.discountToCart,
    label: 'Discount to cart'
}, ];

export const specialsSaleProductGroups = [{
    key: 'individual',
    label: 'Individual Items'
}, {
    key: 'categories',
    label: 'Categories'
}, {
    key: 'brands',
    label: 'Brands'
}, ];

export const specialsTypes = [{
    description: 'Place certain menu items on sale.',
    key: 'sale',
    title: 'Sale',
}, {
    description: "Customer buys X and gets Y (ex: BOGO's)",
    key: 'bogo',
    title: 'Offer',
}, // Note: to add a "Coming Soon" badge to a type tile, add `comingSoon: true` to the type definition object
];

export const DEFAULT_SPECIALS_CARD_IMG = '/images/default-special-card.jpg';

export const totalWeightOptions = ['.5g', '.75g', '1g', '1.25g', '1.5g', '1.75g', '2g', '2.25g', '2.5g', '2.75g', '3g', '3.25g', '3.5g', '3.75g', '4g', '1/8oz', '1/4oz', '1/2oz', '1oz', '1 1/8oz', '1 1/4oz', '1 1/2oz', '2oz', ];

export const OFFERS_DATA = {
    conditions: `bogoConditions`,
    rewards: `bogoRewards`,
    sale: `products`,
};

export const OFFERS_DATA_SELECTED = {
    conditions: `selectedConditionsProducts`,
    rewards: `selectedRewardsProducts`,
    sale: `selectedSaleProducts`,
};

// TODO rename these to something more informative
export const pluralToSingular = {
    conditions: 'condition',
    rewards: 'reward',
    sale: 'item',
    brands: 'brand',
    categories: 'category',
    individual: 'individual',
};

export const plural = {
    brand: 'brands',
    category: 'categories',
    individual: 'individual',
    sale: 'items',
};

export const STEP_RULES = {
    conditions: 'conditionRules',
    sale: 'saleSpecialRules',
    rewards: 'rewardRules',
};

export const priorConditions = {
    individual: 'Individual Items',
    brands: 'Items from a Brand',
    categories: 'Items from a Category',
};

export const conditionToolTipCopy = {
    totalQuantity: `Total Quantity has already been applied to this offer.`,
    totalWeight: `Total Spend or Total Weight has already been applied to this offer.`,
    totalSpend: `Total Spend or Total Weight has already been applied to this offer.`,
};

export const CONDITION_TYPES = (disabledStates={})=>[{
    disabled: !!disabledStates?.individual,
    label: 'Individual Items',
    rowType: BasicConditionOrRewardType.individual,
    uniqueStep: null,
}, {
    disabled: !!disabledStates?.brand,
    label: 'Items from a Brand',
    rowType: BasicConditionOrRewardType.brand,
    uniqueStep: null,
}, {
    disabled: !!disabledStates?.category,
    label: 'Items from a Category',
    rowType: BasicConditionOrRewardType.category,
    uniqueStep: null,
}, {
    disabled: !!disabledStates?.totalWeight,
    label: 'Total Weight',
    rowType: AdvancedConditionType.totalWeight,
    uniqueStep: 'conditions',
}, {
    disabled: !!disabledStates?.totalQuantity,
    label: 'Total Quantity',
    rowType: AdvancedConditionType.totalQuantity,
    uniqueStep: 'conditions',
}, {
    disabled: !!disabledStates?.totalSpend,
    label: 'Total Spend',
    rowType: AdvancedConditionType.totalSpend,
    uniqueStep: 'conditions',
}, {
    disabled: !!disabledStates?.itemsForADiscount,
    label: 'Bundled Discount',
    rowType: AdvancedRewardType.itemsForADiscount,
    uniqueStep: 'rewards',
}, {
    disabled: !!disabledStates?.itemsForAPrice,
    label: 'Bundled Price',
    rowType: AdvancedRewardType.itemsForAPrice,
    uniqueStep: 'rewards',
}, {
    disabled: !!disabledStates?.discountToCart,
    label: 'Discount to Cart',
    rowType: AdvancedRewardType.discountToCart,
    uniqueStep: 'rewards',
}, ];
export const DISCOUNTS_SYNC_HOVER_TEXT = 'This special was created in LeafLogix.';

export const DISCOUNTS_SYNC_INFO_TEXT = // eslint-disable-next-line max-len
'This setting will ingest any Sale discount that is marked as available for online use. You will no longer have to build Sale discounts in Dutchie for your menu and pricing to display as expected.';

export const defaultConditionStates = {
    conditions: {
        individual: false,
        brand: false,
        category: false,
        totalWeight: false,
        totalQuantity: false,
        totalSpend: false,
    },
    rewards: {
        individual: false,
        brand: false,
        category: false,
        discountToCart: false,
        itemsForADiscount: false,
        itemsForAPrice: false,
    },
    sale: {
        individual: false,
        brand: false,
        category: false,
    },
};

export const advancedConditionsArray = _.keys(AdvancedConditionType);

export const defaultErrorMessage = (isCreate)=>`Unable to ${isCreate ? 'create' : 'update'} special. Please contact support.`;
