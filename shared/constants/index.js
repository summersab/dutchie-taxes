export * from './age-restrictions.js';
export * from './aria.js';
export * from './content.js';
export * from './dispensaries.js';
//export * from './ernie.ts';
export * from './forms.js';
export * from './orders.js';
export * from './products.js';
export * from './pusher.js';
export * from './specials.js';
export * from './taxes.js';
export * from './time.js';

export const DELIVERY = 'Delivery';
export const PICKUP = 'Pickup';

export const ORDER_TYPE_CURBSIDE_PICKUP = 'curbsidePickup';
export const ORDER_TYPE_DRIVE_THRU_PICKUP = 'driveThruPickup';
export const MENU_TYPE_REC = 'rec';
export const MENU_TYPE_MED = 'med';

export const expectedTerminalVersionNumber = '1.22.0';

export const recOnlyStates = []; // TODO: Remove Me

export const logoPlaceholder = 'https://s3-us-west-2.amazonaws.com/dutchie-images/logo-placeholder.png';

export const LEGACY_AWS_SOURCE = 'https://s3-us-west-2.amazonaws.com/dutchie-images/';
export const IMGIX_SOURCE = 'https://images.dutchie.com/';

export const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZHV0Y2hpZS1lbmciLCJhIjoiY2tkNjlxaGNlMG51ajJ4bzhjbTk5cG5zNyJ9.FEj8yCJEq36aac-v-N227w';

export const DUTCHIE_IFRAME_ID = 'dutchie--embed__iframe';

export const DUTCHIE_MAIN_STORED_CART_KEY = 'dutchieMain';
export const LOCAL_STORAGE_STORED_CART_KEY = 'stored-cart';
export const MOST_RECENT_DISPO_KEY = 'mostRecentDispo';

export const NUMERALS_DOLLAR_FORMAT = '$0,0.00';
