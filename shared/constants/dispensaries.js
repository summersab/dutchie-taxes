export const DispensaryOrderTypes = [
  {
    key: 'All',
    label: 'All Types',
    value: 'All',
  },
  {
    key: 'PickupOnly',
    label: 'Pickup Only',
    value: 'PickupOnly',
  },
  {
    key: 'DeliveryOnly',
    label: 'Delivery Only',
    value: 'DeliveryOnly',
  },
  {
    key: 'PickupAndDelivery',
    label: 'Pickup + Delivery',
    value: 'PickupAndDelivery',
  },
  {
    key: 'Kiosk',
    label: 'Kiosk',
    value: 'Kiosk',
  },
];

export const dispensaryPosValues = [
  'Adilas',
  'Alcanna',
  'Anthea',
  'BioTrackTHC',
  'Blaze',
  'Cova',
  'FlowHub',
  'Global Till',
  'Green Bits',
  'GrowFlow',
  'Indica Online',
  'KlickTrack',
  'Korona/Dauntless',
  'LeafLogix',
  'MJ Freeway',
  'OMMPOS',
  'Portal 42',
  'Proteus 420',
  'QuickBooks',
  'ShopKeep',
  'THSuite',
  'Treez',
  'Weave',
  'WebJoint',
  'D365',
  'Meadow',
  'Greenline',
  'Vend',
  'Other',
];

export const DispensaryStatusOptions = [
  {
    key: 'all',
    label: 'All',
    value: 'all',
  },
  {
    key: 'active',
    label: 'Active',
    value: 'active',
  },
  {
    key: 'inactive',
    label: 'Inactive',
    value: 'inactive',
  },
];

export const DispensaryMenuBannerColors = {
  green: { background: '#EBF6EC', border: '#B8C3B9', color: '#3B573F' },
  blue: { background: '#E4F3FC', border: '#B1C0C9', color: '#3B4857' },
  red: { background: '#FCE0E0', border: '#C9ADAD', color: '#573B3B' },
  yellow: { background: '#FCFAE0', border: '#C9C7AD', color: '#57563B' },
  orange: { background: '#FAE9DA', border: '#C7B6A7', color: '#57483B' },
  purple: { background: '#E7DDF4', border: '#B4AAC1', color: '#473B57' },
  black: { background: '#000000', border: '#000000', color: '#FFFFFF' },
  grey: { background: '#ECECEC', border: '#B9B9B9', color: '#333333' },
};

export const DispensaryAdminRoles = {
  unknown: 'Unknown', // This is the default value
  complianceAndLegal: 'Compliance/Legal',
  customerSales: 'Customer Sales',
  customerSupport: 'Customer Support',
  financeAndAccounting: 'Finance/Accounting',
  fulfillmentAndDelivery: 'Fulfillment/Delivery',
  informationTechnology: 'Information Technology',
  inventoryManagement: 'Inventory Management',
  marketingAndPromotions: 'Marketing/Promotions',
  storeOperations: 'Store Operations',
};

export const DefaultArrivalInformationInstructions =
  'Please enter your vehicle make, model, and color. Ex: Black Toyota Camry.';

export const MenuSortOptions = [
  {
    key: 'popular',
    label: 'Popular',
  },
  {
    key: 'brand',
    label: 'Brand',
  },
  {
    key: 'pricelowtohigh',
    label: 'Price: Low to High',
    value: 'pricelowtohigh',
  },
  {
    key: 'pricehightolow',
    label: 'Price: High to Low',
    value: 'pricehightolow',
  },
  {
    key: 'potencylowtohigh',
    label: 'Potency: Low to High',
    value: 'potencylowtohigh',
  },
  {
    key: 'potencyhightolow',
    label: 'Potency: High to Low',
    value: 'potencyhightolow',
  },
];

export const MenuLayoutOptions = [
  {
    key: 'list',
    label: `List`,
    value: 'list',
  },
  {
    key: 'cards',
    label: `Card`,
    value: 'cards',
  },
];

export const mutuallyInclusiveFeatures = {
  enableDriveThruPickup: {
    path: 'featureFlags.enableDriveThruPickup',
    dependentSettingPaths: ['orderTypesConfig.driveThruPickup.enabled'],
  },
  enableMixAndMatch: {
    path: 'featureFlags.enableMixAndMatch',
    dependentSettingPaths: [
      'storeSettings.enableMixAndMatchPricingForPickup',
      'storeSettings.enableMixAndMatchPricingForDelivery',
    ],
  },
};
