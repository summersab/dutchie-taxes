import _ from 'lodash';

import { productEffects } from './products';

/**
 * @type {Object.<string: string>}
 */
export const DefaultImages = {
  Indica: 'https://s3-us-west-2.amazonaws.com/dutchie-images/Flower-Indica-stock.jpg',
  Hybrid: 'https://s3-us-west-2.amazonaws.com/dutchie-images/Flower-Hybrid-stock.jpg',
  Sativa: 'https://s3-us-west-2.amazonaws.com/dutchie-images/Flower-Sativa-stock.jpg',
  'High CBD': 'https://s3-us-west-2.amazonaws.com/dutchie-images/Flower-CBD-stock.jpg',
  Flower: 'https://s3-us-west-2.amazonaws.com/dutchie-images/Flower-NoType-stock.jpg',
  'Pre-Rolls': 'https://s3-us-west-2.amazonaws.com/dutchie-images/pre-roll.jpg',
  Vaporizers: 'https://s3-us-west-2.amazonaws.com/dutchie-images/vaporizer.jpg',
  Concentrate: 'https://s3-us-west-2.amazonaws.com/dutchie-images/concentrate.jpg',
  Edible: 'https://s3-us-west-2.amazonaws.com/dutchie-images/Edibles.jpg',
  Oral: 'https://s3-us-west-2.amazonaws.com/dutchie-images/Orals.png',
  Topicals: 'https://s3-us-west-2.amazonaws.com/dutchie-images/topical.jpg',
  Tincture: 'https://s3-us-west-2.amazonaws.com/dutchie-images/tincture.jpg',
  CBD: 'https://s3-us-west-2.amazonaws.com/dutchie-images/dutchie-stock-CBD-v1.jpg',
  Seeds: 'https://s3-us-west-2.amazonaws.com/dutchie-images/dutchie-stock-seeds-v1.jpg',
  Clones: 'https://s3-us-west-2.amazonaws.com/dutchie-images/dutchie-stock-clones-v1.jpg',
  Accessories: 'https://s3-us-west-2.amazonaws.com/dutchie-images/accessories.jpg',
  Apparel: 'https://s3-us-west-2.amazonaws.com/dutchie-images/apparel.jpg',
  'Indica-old': 'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-indica.jpg',
  'Hybrid-old': 'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-hybrid.jpg',
  'Sativa-old': 'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-sativa.jpg',
  'High CBD-old': 'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-high-cbd.jpg',
  'Flower-old': 'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-notype.jpg',
};

export const DefaultImagesList = [
  ..._.values(DefaultImages),

  'https://s3-us-west-2.amazonaws.com/dutchie-images/vaporizer-stock-1-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/concentrates-stock-diamonds-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/concentrates-stock-distillate-applicator-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/concentrates-stock-liveresin-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/concentrates-stock-rosin-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/concentrates-stock-rso-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/concentrates-stock-shatter-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/edibles-stock-brownies-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/edibles-stock-chocolate-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/edibles-stock-cookies-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/edibles-stock-drink-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/edibles-stock-gummies-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-1-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-2-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-3-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-4-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-5-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-6-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-7-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-8-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-9-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-10-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-11-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-12-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-13-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-14-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/flower-stock-15-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/preroll-stock-1-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/preroll-stock-2-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/preroll-stock-3-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/tincture-stock-1-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/tincture-stock-2-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/tincture-stock-3-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/topicals-stock-balm-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/topicals-stock-lotion-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/topicals-stock-patch-v1.jpg',
  'https://s3-us-west-2.amazonaws.com/dutchie-images/vaporizer-dispos-stock-v1.jpg',
];

export const isDefaultImage = (image) => _.includes(DefaultImagesList, image);

export const strainsAndTerpenes = {
  ratios: [
    'All THC',
    '20:1',
    '16:1',
    '12:1',
    '8:1',
    '4:1',
    '3:1',
    '2:1',
    '1:1',
    '1:2',
    '1:3',
    '1:4',
    '1:8',
    '1:12',
    '1:16',
    '1:20',
    'All CBD',
  ],
  aromas: [
    'Citrus',
    'Cloves',
    'Earthy',
    'Floral',
    'Garlic',
    'Hash',
    'Herbal',
    'Lavender',
    'Lemon',
    'Mango',
    'Mint',
    'Musk',
    'Orange',
    'Pepper',
    'Pine',
    'Pineapple',
    'Rose',
    'Sharp',
    'Skunk',
    'Spice',
    'Sweet',
    'Woody',
  ],
  effects: productEffects,
  potentialHealthBenefits: [
    'Appetite Suppressant',
    'Anti-anxiety',
    'Anti-bacterial',
    'Anti-depression',
    'Anti-diabetic',
    'Anti-fungal',
    'Anti-inflammatory',
    'Anti-oxidant',
    'Brain Function',
    'Cancer Fighting',
    'Gastrointestinal',
    'Nausea Relief',
    'Pain Relief',
    'Respiratory Function',
    'Sedative',
    'Sleep aid',
    'Stress Relief',
  ],
};

export const businessTypes = [
  'Other',
  'Dispensary',
  'Brand',
  'Marketing and Consulting',
  'Partner Company',
  'Delivery',
];

/**
 * Changing the keys on existing cities is problematic for SEO.
 * If adding more, make sure to follow the url format
 * [countryCode]/dispensaries/[st-city-name]
 */
export const topCitiesList = [
  [
    {
      key: 'us/dispensaries/wa-tacoma',
      label: `Tacoma`,
      column: 1,
    },
    {
      key: 'us/dispensaries/wa-seattle',
      label: `Seattle`,
      column: 1,
    },
    {
      key: 'us/dispensaries/or-portland',
      label: `Portland`,
      column: 1,
    },
    {
      key: 'us/dispensaries/or-bend',
      label: `Bend`,
      column: 1,
    },
    {
      key: 'us/dispensaries/or-eugene',
      label: `Eugene`,
      column: 1,
    },
    {
      key: 'us/dispensaries/or-beaverton',
      label: `Beaverton`,
      column: 1,
    },
  ],
  [
    {
      key: 'us/dispensaries/ca-los-angeles',
      label: `Los Angeles`,
      column: 2,
    },
    {
      // When ENG-27599 is complete, this should change to san-francisco
      key: 'us/dispensaries/ca-sf',
      label: `San Francisco`,
      column: 2,
    },
    {
      key: 'us/dispensaries/mi-ann-arbor',
      label: `Ann Arbor`,
      column: 2,
    },
    {
      key: 'us/dispensaries/mi-detroit',
      label: `Detroit`,
      column: 2,
    },
    {
      key: 'us/dispensaries/mi-hazel-park',
      label: `Hazel Park`,
      column: 2,
    },
    {
      key: 'us/dispensaries/ma-boston',
      label: `Boston`,
      column: 2,
    },
  ],
  [
    {
      key: 'us/dispensaries/ma-great-barrington',
      label: `Great Barrington`,
      column: 3,
    },
    {
      key: 'us/dispensaries/co-denver',
      label: `Denver`,
      column: 3,
    },
    {
      key: 'us/dispensaries/co-boulder',
      label: `Boulder`,
      column: 3,
    },
    {
      key: 'us/dispensaries/nv-las-vegas',
      label: `Las Vegas`,
      column: 3,
    },
    {
      key: 'us/dispensaries/nv-reno',
      label: `Reno`,
      column: 3,
    },
    {
      key: 'us/dispensaries/az-phoenix',
      label: `Phoenix`,
      column: 3,
    },
  ],
  [
    {
      key: 'ca/dispensaries/on-toronto',
      label: `Toronto`,
      column: 4,
    },
    {
      key: 'ca/dispensaries/on-ottawa',
      label: `Ottawa`,
      column: 4,
    },
    {
      key: 'ca/dispensaries/on-kitchener',
      label: `Kitchener`,
      column: 4,
    },
    {
      key: 'ca/dispensaries/bc-vancouver',
      label: `Vancouver`,
      column: 4,
    },
  ],
];
