import _ from 'lodash';
import deepFreeze from 'deep-freeze';

// https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md#usage-with-indirection-like-workers-and-js-templates
/* eslint-disable no-unused-vars */
const $RefreshReg$ = _.noop;
const $RefreshSig$ = () => _.noop;
/* eslint-enable no-unused-vars */

// We've built database indexes around this list.  If it is expanded please consider
// the search consequences.
export const productEffects = [
  'Calm',
  'Clear Mind',
  'Creative',
  'Energetic',
  'Focused',
  'Happy',
  'Inspired',
  'Relaxed',
  'Sleepy',
  'Uplifted',
];

// old product effects
// 'Body',
// 'Comfort',
// 'Joints',
// 'Mind',
// 'Muscles',
// 'Pain-Relief',
// 'Skin Health',

export function normalizeEffectName(name) {
  return _.toLower(name).replace(/[-\s]/g, '');
}

export const allFlowerOptions = ['1g', '1.5g', '2g', '1/8oz', '4.5g', '1/4oz', '1/2oz', '1oz'];
export const allVapeOptions = ['.25g', '.3g', '.4g', '.5g', '.6g', '.7g', '.75g', '.8g', '.9g', '1g', '1.25g'];
export const allDabOptions = [
  '.25gC',
  '.5gC',
  '.75gC',
  '1gC',
  '1.25gC',
  '1.5gC',
  '2gC',
  '2.25gC',
  '2.5gC',
  '2.75gC',
  '3gC',
  '3.25gC',
  '3.5gC',
];
export const allPrerollOptions = [
  '.2g',
  '.5g',
  '.6g',
  '.7g',
  '.75g',
  '1g',
  '1.2g',
  '1.4g',
  '1.5g',
  '2g',
  '2.25g',
  '2.5g',
  '3g',
  '3.5g',
  '3.75g',
  '4.5g',
];

export const getAllOptions = (type) => {
  let options;
  switch (type) {
    case 'Flower':
      options = allFlowerOptions;
      break;
    case 'Pre-Rolls':
      options = allPrerollOptions;
      break;
    case 'Vaporizers':
      options = [...allVapeOptions, ...allDabOptions];
      break;
    case 'Concentrate':
      options = allDabOptions;
      break;
    default:
      options = ['N/A'];
  }
  return options;
};

export const standardVaporizerWeights = {
  pax: 0.5,
  quill: 0.75,
  orchid: 1,
};

export const thresholdDefaults = {
  Flower: '5',
  'Pre-Rolls': '5',
  Vaporizers: '5',
  Concentrate: '5',
  Edible: '5',
  Topicals: '5',
  Tincture: '5',
  Accessories: '5',
  Apparel: '5',
};

export const ouncesWeightNames = {
  Flower: {
    '1g': 'Grams',
    1.5: '1.5 Grams',
    '2g': '2 Grams',
    '1/8oz': 'Eighths',
    '1/4oz': 'Quarters',
    '1/2oz': 'Half Ounces',
    '1oz': 'Ounces',
  },
};

export const gramsWeightNames = {
  Flower: {
    '1g': 'Grams',
    1.5: '1.5 Grams',
    '2g': '2 Grams',
    '1/8oz': '3.5 Grams',
    '1/4oz': '7 Grams',
    '1/2oz': '14 Grams',
    '1oz': '28 Grams',
  },
};

export const POTENCY_UNITS = {
  PERCENTAGE: 'PERCENTAGE',
  MILLIGRAMS: 'MILLIGRAMS',
  MILLIGRAMS_PER_GRAM: 'MILLIGRAMS_PER_GRAM',
  MILLIGRAMS_PER_ML: 'MILLIGRAMS_PER_ML',
};

export const POTENCY_UNITS_DISPLAY = {
  [POTENCY_UNITS.PERCENTAGE]: '%',
  [POTENCY_UNITS.MILLIGRAMS]: 'mg',
  [POTENCY_UNITS.MILLIGRAMS_PER_GRAM]: 'mg/g',
  [POTENCY_UNITS.MILLIGRAMS_PER_ML]: 'mg/mL',
};

export const POTENCY_TYPES = {
  CBD: 'CBD',
  THC: 'THC',
  TAC: 'TAC',
};

export const POTENCY_UNIT_OPTIONS = [
  {
    key: POTENCY_UNITS.PERCENTAGE,
    label: POTENCY_UNITS_DISPLAY.PERCENTAGE,
    value: POTENCY_UNITS.PERCENTAGE,
  },
  {
    key: POTENCY_UNITS.MILLIGRAMS,
    label: POTENCY_UNITS_DISPLAY.MILLIGRAMS,
    value: POTENCY_UNITS.MILLIGRAMS,
  },
  {
    key: POTENCY_UNITS.MILLIGRAMS_PER_GRAM,
    label: POTENCY_UNITS_DISPLAY.MILLIGRAMS_PER_GRAM,
    value: POTENCY_UNITS.MILLIGRAMS_PER_GRAM,
  },
  {
    key: POTENCY_UNITS.MILLIGRAMS_PER_ML,
    label: POTENCY_UNITS_DISPLAY.MILLIGRAMS_PER_ML,
    value: POTENCY_UNITS.MILLIGRAMS_PER_ML,
  },
];

export const inhalableCategories = ['Flower', 'Pre-Rolls', 'Concentrate', 'Vaporizers'];

export const carouselProductLimit = 15;

export const SubcategoryOptions = deepFreeze({
  'Pre-Rolls': [
    {
      key: 'singles',
      label: 'Singles',
      value: 'singles',
    },
    {
      key: 'packs',
      label: 'Pre-Roll Packs',
      value: 'packs',
    },
    {
      key: 'infused',
      label: 'Infused Pre-Rolls',
      value: 'infused',
    },
    {
      key: 'blunts',
      label: 'Blunts',
      value: 'blunts',
    },
  ],
  Vaporizers: [
    {
      key: 'cartridges',
      label: 'Cartridges',
      value: 'cartridges',
    },
    {
      key: 'pods',
      label: 'Pods',
      value: 'pods',
    },
    {
      key: 'disposables',
      label: 'Disposables',
      value: 'disposables',
    },
    {
      key: 'live-resin',
      label: 'Live Resin',
      value: 'live-resin',
    },
    {
      key: 'vaporizer-bundles',
      label: 'Bundles',
      value: 'vaporizer-bundles',
    },
  ],
  Concentrate: [
    {
      key: 'shatter',
      label: 'Shatter',
      value: 'shatter',
    },
    {
      key: 'live-resin',
      label: 'Live Resin',
      value: 'live-resin',
    },
    {
      key: 'wax',
      label: 'Wax',
      value: 'wax',
    },
    {
      key: 'rosin',
      label: 'Rosin',
      value: 'rosin',
    },
    {
      key: 'kief',
      label: 'Kief',
      value: 'kief',
    },
    {
      key: 'budder',
      label: 'Budder',
      value: 'budder',
    },
    {
      key: 'crumble',
      label: 'Crumble',
      value: 'crumble',
    },
    {
      key: 'rso',
      label: 'RSO',
      value: 'rso',
    },
    {
      key: 'applicators',
      label: 'Applicators',
      value: 'applicators',
    },
    {
      key: 'sugar',
      label: 'Sugar',
      value: 'sugar',
    },
    {
      key: 'sauce',
      label: 'Sauce',
      value: 'sauce',
    },
    {
      key: 'diamonds',
      label: 'Diamonds',
      value: 'diamonds',
    },
    {
      key: 'isolate',
      label: 'Isolate',
      value: 'isolate',
    },
    {
      key: 'infused-flower',
      label: 'Infused Flower',
      value: 'infused-flower',
    },
    {
      key: 'hash',
      label: 'Hash',
      value: 'hash',
    },
    {
      key: 'badder',
      label: 'Badder',
      value: 'badder',
    },
    {
      key: 'concentrates-oil',
      label: 'Oil',
      value: 'concentrates-oil',
    },
  ],
  Edible: [
    {
      key: 'chocolates',
      label: 'Chocolates',
      value: 'chocolates',
    },
    {
      key: 'gummies',
      label: 'Gummies',
      value: 'gummies',
    },
    {
      key: 'baked-goods',
      label: 'Baked Goods',
      value: 'baked-goods',
    },
    {
      key: 'drinks',
      label: 'Drinks',
      value: 'drinks',
    },
    {
      key: 'capsules-tablets',
      label: 'Capsules / Tablets',
      value: 'capsules-tablets',
    },
    {
      key: 'chews',
      label: 'Chews',
      value: 'chews',
    },
    {
      key: 'hard-candy',
      label: 'Hard Candy',
      value: 'hard-candy',
    },
    {
      key: 'sublingual',
      label: 'Sublingual Products',
      value: 'sublingual',
    },
    {
      key: 'frozen-treats',
      label: 'Frozen Treats',
      value: 'frozen-treats',
    },
    {
      key: 'savory-snacks',
      label: 'Savory Snacks',
      value: 'savory-snacks',
    },
    {
      key: 'cooking-baking',
      label: 'Cooking / Baking',
      value: 'cooking-baking',
    },
    {
      key: 'dissolvables',
      label: 'Dissolvables',
      value: 'dissolvables',
    },
    {
      key: 'lozenges',
      label: 'Lozenges',
      value: 'lozenges',
    },
    {
      key: 'suckers',
      label: 'Suckers',
      value: 'suckers',
    },
  ],
  Topicals: [
    {
      key: 'balms',
      label: 'Balms',
      value: 'balms',
    },
    {
      key: 'oils',
      label: 'Topical Oils',
      value: 'oils',
    },
    {
      key: 'lotions',
      label: 'Lotions',
      value: 'lotions',
    },
    {
      key: 'sticks-roll-ons',
      label: 'Sticks / Roll-ons',
      value: 'sticks-roll-ons',
    },
    {
      key: 'transdermal-patches',
      label: 'Transdermals',
      value: 'transdermal-patches',
    },
    {
      key: 'bath-products',
      label: 'Bath Products',
      value: 'bath-products',
    },
    {
      key: 'lip-balms',
      label: 'Lip Balms',
      value: 'lip-balms',
    },
    {
      key: 'soaps',
      label: 'Soaps',
      value: 'soaps',
    },
    {
      key: 'lubricants',
      label: 'Lubricants',
      value: 'lubricants',
    },
    {
      key: 'suppositories',
      label: 'Suppositories',
      value: 'suppositories',
    },
  ],
  Tincture: [
    {
      key: 'unflavored',
      label: 'Unflavored Tinctures',
      value: 'unflavored',
    },
    {
      key: 'flavored',
      label: 'Flavored Tinctures',
      value: 'flavored',
    },
    {
      key: 'herbal',
      label: 'Herbal Tinctures',
      value: 'herbal',
    },
    {
      key: 'pet',
      label: 'Pet Tinctures',
      value: 'pet',
    },
    {
      key: 'sprays',
      label: 'Sprays',
      value: 'sprays',
    },
  ],
  Flower: [
    {
      key: 'shake-trim',
      label: 'Shake / Trim',
      value: 'shake-trim',
    },
    {
      key: 'pre-ground',
      label: 'Pre-Ground',
      value: 'pre-ground',
    },
    {
      key: 'small-buds',
      label: 'Small Buds',
      value: 'small-buds',
    },
    {
      key: 'infused-bud',
      label: 'Infused Bud',
      value: 'infused-bud',
    },
  ],
  Accessories: [
    {
      key: 'batteries',
      label: 'Batteries',
      value: 'batteries',
    },
    {
      key: 'lighters',
      label: 'Lighters',
      value: 'lighters',
    },
    {
      key: 'devices',
      label: 'Devices',
      value: 'devices',
    },
    {
      key: 'papers-rolling-supplies',
      label: 'Papers / Rolling Supplies',
      value: 'papers-rolling-supplies',
    },
    {
      key: 'gift-cards',
      label: 'Gift Cards',
      value: 'gift-cards',
    },
    {
      key: 'grinders',
      label: 'Grinders',
      value: 'grinders',
    },
    {
      key: 'glassware',
      label: 'Glassware',
      value: 'glassware',
    },
    {
      key: 'trays',
      label: 'Trays',
      value: 'trays',
    },
    {
      key: 'dab-tools',
      label: 'Dab Tools',
      value: 'dab-tools',
    },
    {
      key: 'cleaning-solutions',
      label: 'Cleaning Solutions',
      value: 'cleaning-solutions',
    },
    {
      key: 'storage-containers',
      label: 'Storage / Containers',
      value: 'storage-containers',
    },
  ],
  CBD: [],
  Seeds: [],
  Clones: [],
  Apparel: [],
  'N/A': [],
});

export const WeightedSubcategories = deepFreeze(
  _.flatMap(
    [
      ...SubcategoryOptions.Flower,
      ...SubcategoryOptions['Pre-Rolls'],
      ...SubcategoryOptions.Vaporizers,
      ...SubcategoryOptions.Concentrate,
    ],
    ({ value }) => value
  )
);

export const SubcategoryOptionsHash = () => {
  const hash = {};
  _.forEach(_.keys(SubcategoryOptions), (key) => {
    const subcategoriesForKey = SubcategoryOptions[key];
    _.forEach(subcategoriesForKey, (subcategory) => {
      hash[subcategory.key] = {
        category: key,
        ...subcategory,
      };
    });
  });
  return hash;
};

export const AllSubcategories = _.flatten(_.concat(_.values(SubcategoryOptions)));

export const CategoryPotencyRanges = deepFreeze({
  flower: [0, 50],
  'pre-rolls': [0, 50],
  vaporizers: [0, 100],
  concentrates: [0, 100],
  edibles: [0, 1000],
  topicals: [0, 1000],
  tinctures: [0, 2000],
  cbd: [0, 1000],
});

export const CategoryPotencyUnits = deepFreeze({
  flower: POTENCY_UNITS_DISPLAY[POTENCY_UNITS.PERCENTAGE],
  'pre-rolls': POTENCY_UNITS_DISPLAY[POTENCY_UNITS.PERCENTAGE],
  vaporizers: POTENCY_UNITS_DISPLAY[POTENCY_UNITS.PERCENTAGE],
  concentrates: POTENCY_UNITS_DISPLAY[POTENCY_UNITS.PERCENTAGE],
  edibles: POTENCY_UNITS_DISPLAY[POTENCY_UNITS.MILLIGRAMS],
  topicals: POTENCY_UNITS_DISPLAY[POTENCY_UNITS.MILLIGRAMS],
  tinctures: POTENCY_UNITS_DISPLAY[POTENCY_UNITS.MILLIGRAMS],
  cbd: POTENCY_UNITS_DISPLAY[POTENCY_UNITS.MILLIGRAMS],
});

export const CategoriesWithPotencies = [
  'flower',
  'pre-rolls',
  'vaporizers',
  'concentrates',
  'edibles',
  'topicals',
  'tinctures',
  'cbd',
];

/**
 * @type {Array<{
 *   key: string,
 *   label: string,
 *   value: string}
 * >}
 */
export const CategoriesForMenu = [
  {
    key: 'flower',
    label: 'Flower',
    value: 'Flower',
  },
  {
    key: 'pre-rolls',
    label: 'Pre-Rolls',
    value: 'Pre-Rolls',
  },
  {
    key: 'vaporizers',
    label: 'Vaporizers',
    value: 'Vaporizers',
  },
  {
    key: 'concentrates',
    label: 'Concentrates',
    value: 'Concentrate',
  },
  {
    key: 'edibles',
    label: 'Edibles',
    value: 'Edible',
  },
  {
    key: 'tinctures',
    label: 'Tinctures',
    value: 'Tincture',
  },
  {
    key: 'topicals',
    label: 'Topicals',
    value: 'Topicals',
  },
  {
    key: 'cbd',
    label: 'CBD',
    value: 'CBD',
  },
  {
    key: 'seeds',
    label: 'Seeds',
    value: 'Seeds',
  },
  {
    key: 'clones',
    label: 'Clones',
    value: 'Clones',
  },
  {
    key: 'accessories',
    label: 'Accessories',
    value: 'Accessories',
  },
  {
    key: 'apparel',
    label: 'Apparel',
    value: 'Apparel',
  },
];

export const CategoriesForFilter = [
  {
    key: 'all',
    label: 'All Categories',
    value: null,
  },
  {
    key: 'flower',
    label: 'Flower',
    value: 'Flower',
  },
  {
    key: 'pre-rolls',
    label: 'Pre-Rolls',
    value: 'Pre-Rolls',
  },
  {
    key: 'vaporizers',
    label: 'Vaporizers',
    value: 'Vaporizers',
  },
  {
    key: 'concentrates',
    label: 'Concentrates',
    value: 'Concentrate',
  },
  {
    key: 'edibles',
    label: 'Edibles',
    value: 'Edible',
  },
  {
    key: 'topicals',
    label: 'Topicals',
    value: 'Topicals',
  },
  {
    key: 'tinctures',
    label: 'Tinctures',
    value: 'Tincture',
  },
  {
    key: 'cbd',
    label: 'CBD',
    value: 'CBD',
  },
  {
    key: 'seeds',
    label: 'Seeds',
    value: 'Seeds',
  },
  {
    key: 'clones',
    label: 'Clones',
    value: 'Clones',
  },
  {
    key: 'accessories',
    label: 'Accessories',
    value: 'Accessories',
  },
  {
    key: 'apparel',
    label: 'Apparel',
    value: 'Apparel',
  },
  {
    key: 'n/a',
    label: 'N/A',
    value: 'N/A',
  },
];

/**
 * @type {Array<{
 *   key: string,
 *   label: string,
 *   value: string | null,
 *   subcategories: Array<{key: string, label: string, value: string}>}
 * >}
 */
export const CategoryOptions = deepFreeze([
  {
    key: 'all',
    label: 'All Products',
    value: null,
    subcategories: [],
  },
  {
    key: 'flower',
    label: 'Flower',
    value: 'Flower',
    subcategories: SubcategoryOptions.Flower,
  },
  {
    key: 'pre-rolls',
    label: 'Pre-Rolls',
    value: 'Pre-Rolls',
    subcategories: SubcategoryOptions['Pre-Rolls'],
  },
  {
    key: 'vaporizers',
    label: 'Vaporizers',
    value: 'Vaporizers',
    subcategories: SubcategoryOptions.Vaporizers,
  },
  {
    key: 'concentrates',
    label: 'Concentrates',
    value: 'Concentrate',
    subcategories: SubcategoryOptions.Concentrate,
  },
  {
    key: 'edibles',
    label: 'Edibles',
    value: 'Edible',
    subcategories: SubcategoryOptions.Edible,
  },
  {
    key: 'topicals',
    label: 'Topicals',
    value: 'Topicals',
    subcategories: SubcategoryOptions.Topicals,
  },
  {
    key: 'tinctures',
    label: 'Tinctures',
    value: 'Tincture',
    subcategories: SubcategoryOptions.Tincture,
  },
  {
    key: 'cbd',
    label: 'CBD',
    value: 'CBD',
    subcategories: [],
  },
  { key: 'seeds', label: 'Seeds', value: 'Seeds', subcategories: [] },
  {
    key: 'clones',
    label: 'Clones',
    value: 'Clones',
    subcategories: [],
  },
  {
    key: 'accessories',
    label: 'Accessories',
    value: 'Accessories',
    subcategories: SubcategoryOptions.Accessories,
  },
  {
    key: 'apparel',
    label: 'Apparel',
    value: 'Apparel',
    subcategories: SubcategoryOptions.Apparel,
  },
  {
    key: 'n/a',
    label: 'N/A',
    value: 'N/A',
    subcategories: [],
  },
]);

export const IngestibleCategoryOption = {
  key: 'ingestibles',
  label: 'Ingestibles',
  value: 'Edible',
  subcategories: SubcategoryOptions.Edible,
};

// We are using this for both FL and NY as a quick fix. - Juliana L 8/25/21
export const FloridaOralSubcategories = ['capsules-tablets', 'sublingual'];

export const CategoryDisplayNames = {};
_.forEach(CategoryOptions, (entry) => {
  CategoryDisplayNames[entry.value] = entry.label;
});

export const choiceToDisplay = {
  all: 'All Products',
  flower: 'Flower',
  'pre-rolls': 'Pre-Rolls',
  vaporizers: 'Vaporizers',
  concentrates: 'Concentrate',
  edibles: 'Edible',
  orals: 'Oral',
  topicals: 'Topicals',
  tinctures: 'Tincture',
  cbd: 'CBD',
  clones: 'Clones',
  seeds: 'Seeds',
  accessories: 'Accessories',
  apparel: 'Apparel',
};

export const MenuHeaderDisplayCategories = {
  all: 'All Products',
  flower: 'Flower',
  'pre-rolls': 'Pre-Rolls',
  vaporizers: 'Vaporizers',
  concentrates: 'Concentrates',
  edibles: 'Edibles',
  orals: 'Oral',
  topicals: 'Topicals',
  tinctures: 'Tinctures',
  cbd: 'CBD',
  clones: 'Clones',
  seeds: 'Seeds',
  accessories: 'Accessories',
  apparel: 'Apparel',
};

export const categories = _.values(choiceToDisplay);

export const ProductCategoryOptions = [
  {
    label: 'Flower',
    value: 'Flower',
  },
  {
    label: 'Pre-Rolls',
    value: 'Pre-Rolls',
  },
  {
    label: 'Vaporizers',
    value: 'Vaporizers',
  },
  {
    label: 'Concentrate',
    value: 'Concentrate',
  },
  {
    label: 'Edible',
    value: 'Edible',
  },
  {
    label: 'Topicals',
    value: 'Topicals',
  },
  {
    label: 'Tincture',
    value: 'Tincture',
  },
  {
    label: 'CBD',
    value: 'CBD',
  },
  {
    label: 'Clones',
    value: 'Clones',
  },
  {
    label: 'Seeds',
    value: 'Seeds',
  },
  {
    label: 'Accessories',
    value: 'Accessories',
  },
  {
    label: 'Apparel',
    value: 'Apparel',
  },
];

export const StrainTypeFilterOptions = [
  {
    key: 'indica',
    label: 'Indica',
    queryValue: 'indica',
    value: 'Indica',
  },
  {
    key: 'sativa',
    label: 'Sativa',
    queryValue: 'sativa',
    value: 'Sativa',
  },
  {
    key: 'hybrid',
    label: 'Hybrid',
    queryValue: 'hybrid',
    value: 'Hybrid',
  },
  {
    key: 'high-cbd',
    label: 'High CBD',
    queryValue: 'high-cbd',
    value: 'High CBD',
  },
];

export const StrainTypeOptions = [
  {
    key: 'null',
    label: 'Select Type',
    value: '',
  },
  {
    key: 'indica',
    label: 'Indica',
    value: 'Indica',
  },
  {
    key: 'sativa',
    label: 'Sativa',
    value: 'Sativa',
  },
  {
    key: 'hybrid',
    label: 'Hybrid',
    value: 'Hybrid',
  },
  {
    key: 'high-cbd',
    label: 'High CBD',
    value: 'High CBD',
  },
  {
    key: 'n/a',
    label: 'N/A',
    value: 'N/A',
  },
];

export const StrainTypeOrder = {
  Indica: 0,
  Sativa: 1,
  Hybrid: 2,
  'High CBD': 3,
  'N/A': 4,
  '': 5,
};

export const AdminMenuOrderOptions = [
  {
    key: 'alpha',
    label: 'Product Name',
    value: 'alpha',
  },
  {
    key: 'custom',
    label: 'Custom',
    value: 'custom',
  },
  {
    key: 'brand',
    label: 'Brand',
    value: 'brand',
  },
  {
    key: 'priceLowToHigh',
    label: 'Price - Low to High',
    value: 'priceLowToHigh',
  },
  {
    key: 'priceHighToLow',
    label: 'Price - High to Low',
    value: 'priceHighToLow',
  },
];

export const EmptyPotencies = ['', ' ', null];

export const libraryOverrideKeys = [
  'brandId',
  'CBD',
  'CBDContent',
  'Image',
  'THC',
  'THCContent',
  'type',
  'subcategory',
  'Name',
];

export const MILLIGRAMS = 'MILLIGRAMS';
export const MILLILITERS = 'MILLILITERS';
export const GRAMS = 'GRAMS';
export const MILLILITERS_PER_OZ = 29.5735;
export const GRAM_TO_OZ = 28;
export const MG_TO_G = 1000;
export const MG_WEIGHT_REGEX = /\d*\.?\d+\s{0,1}(mg)/i;
export const GRAM_WEIGHT_REGEX = /\d*\.?\d+\s{0,1}[g]/i;
export const CONC_WEIGHT_REGEX = /\d*\.?\d+\s{0,1}(gC)/i;
export const PARTIAL_OZ_REGEX = /\d{1}\/\d{1,2}(oz)/i;
export const OZ_WEIGHT_REGEX = /\d*\.?\d+\s{0,1}(oz)/i;
export const MULTIPLIER_REGEX = /^(\d+)\s*x\s*(.+)$/;

export const integrationProductFields = [
  'Product Name',
  'Product Description',
  'Product Category',
  'Brand',
  'Image',
  'Size / Purchase Option',
  'Weight',
  'Unit of Measure',
  'Price',
  'Quantity',
  'Strain Type',
  'THC Potency',
  'THC Potency Unit (% or mg)',
  'CBD Potency',
  'CBD Potency Unit (% or mg)',
  'Standard Equivalent Weight',
  'Standard Equivalent Unit',
  'Terpenes',
];

/**
 * @type {Object.<string, string>}
 */
export const defaultCategoryPhotos = {
  Flower: 'https://images.dutchie.com/category-stock-photos/flower/flower-1.png',
  'Pre-Rolls': 'https://images.dutchie.com/category-stock-photos/pre-rolls/pre-rolls-1.png',
  Vaporizers: 'https://images.dutchie.com/category-stock-photos/vaporizers/vaporizers-1.png',
  Concentrate: 'https://images.dutchie.com/category-stock-photos/concentrates/concentrates-1.png',
  Edible: 'https://images.dutchie.com/category-stock-photos/edibles/edibles-1.png',
  Oral: 'http://images.dutchie.com/category-stock-photos/orals/orals-1.png',
  Tincture: 'https://images.dutchie.com/category-stock-photos/tinctures/tinctures-1.png',
  Topicals: 'https://images.dutchie.com/category-stock-photos/topicals/topicals-1.png',
  CBD: 'https://images.dutchie.com/category-stock-photos/cbd/cbd.png',
  Seeds: 'https://images.dutchie.com/category-stock-photos/seeds/seeds.png',
  Clones: 'https://images.dutchie.com/category-stock-photos/clones/clones.png',
  Accessories: 'https://images.dutchie.com/category-stock-photos/accessories/accessories.png',
  Apparel: 'https://images.dutchie.com/category-stock-photos/apparel/apparel.png',
};

export const MAX_OPTION_TEXT_LENGTH = 5;

export const SCORE_DESCRIPTION_LENGTH_MINIMUM = 95;

/* eslint-disable max-len */
export const thcDescription = {
  head: `THC`,
  body: `is the primary cannabinoid responsible for the psychoactive effects associated with cannabis. The amount of THC in a product can vary widely based on the method of consumption and the strain at the source of that product. The high that is produced is often enhanced by the “entourage effect”  which is a combination of multiple cannabinoids in conjunction with various terpenes and individual body chemistry.`,
};
export const cbdDescription = {
  head: `CBD`,
  body: `is the second most prevalent cannabinoid and is primarily produced by hemp plants and at lower amounts in cannabis. CBD has soared in popularity due to its non-psychoactive effects. Most users seek CBD for its medicinal properties since it was the first cannabinoid to be approved by the FDA. Its healing properties include an ability to help you relax, reduce irritability and ease restlessness.`,
};
export const tacDescription = {
  head: `TAC or Total active cannabinoids`,
  body: `represents the total amount of active cannabinoids at the time of lab testing. This figure includes all of the active compounds that the product holds.`,
};
export const cannabinoidSectionCopy = `Cannabinoids are naturally occurring chemical compounds that are found in cannabis and provide consumers with a wide range of effects. THC and CBD are examples of some of the most commonly known cannabinoids.`;
/* eslint-enable max-len */

// to be used for clearing out conditions/rewards
export const UNUSED_BOGO_FIELDS = [
  '__discountType',
  'brands',
  'brandDescription',
  'description',
  'dispensaryProducts',
  'categories',
  'DispensaryID',
  'id',
  'Image',
  'label',
  'medicalOnly',
  'medicalPrices',
  'Name',
  'name',
  'Options',
  'options',
  'products',
  'productDiscounts',
  'Prices',
  'recOnly',
  'recPrices',
  'rowType',
  'specialRestrictions',
  'Status',
  'subcategories',
  'subcategory',
  'type',
  'updatedAt',
];

// used for clearing out anything on the special itself
export const UNUSED_BOGO_SPECIAL_FIELDS = [
  '__discountType',
  'brands',
  'brandDescription',
  'description',
  'dispensaryProducts',
  'categories',
  'DispensaryID',
  'id',
  'Image',
  'label',
  'medicalOnly',
  'medicalPrices',
  'Name',
  'Options',
  'options',
  'products',
  'productDiscounts',
  'Prices',
  'recOnly',
  'recPrices',
  'rowType',
  'specialRestrictions',
  'Status',
  'subcategories',
  'subcategory',
  'type',
  'updatedAt',
];
