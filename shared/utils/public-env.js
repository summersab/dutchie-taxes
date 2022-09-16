import { isBrowser } from 'browser-or-node';
import { whitelistedEnvVars } from 'shared/whitelisted-env-vars';

/**
 * @param {string} key
 * @param {string|undefined} value
 * @returns {string}
 */
function getRequired(key, value) {
  if (!value) {
    // TODO: make an Error when test envs set these vars
    console.warn(`Required PublicEnv var ${key} is not set`);
  }
  return value;
}

// If we're in the browser, these values will come from /api/config.js and be attached to the window.
// Otherwise, we're doing server rendering, so we have direct access to the environment variables.
// Note: When setting up a new application you will need to have a script tag that loads these in,
// e.g <script src='/api/config.js' />
const values = isBrowser ? window.reactEnv : whitelistedEnvVars;

const PublicEnv = {
  // mandatory
  adminUrl: getRequired('ADMIN_URL', values.adminUrl),
  amplitudeApiKey: getRequired('AMPLITUDE_API_KEY', values.amplitudeApiKey),
  apiUrl: getRequired('API_URL', values.apiUrl),
  appEnv: getRequired('APP_ENV', values.appEnv),
  consumerUrl: getRequired('CONSUMER_URL', values.consumerUrl),
  googleAnalyticsID: 'UA-101536475-1',
  herokuSlugCommit: getRequired('HEROKU_SLUG_COMMIT', values.herokuSlugCommit),
  launchDarklyClientId: getRequired('LAUNCH_DARKLY_CLIENT_ID', values.launchDarklyClientId),
  paysafeEnvironment: getRequired('PAYSAFE_ENVIRONMENT', values.paysafeEnvironment),
  plaidEnv: getRequired('PLAID_ENV', values.plaidEnv),
  plaidKey: getRequired('PLAID_KEY', values.plaidKey),
  pusherKey: getRequired('PUSHER_KEY', values.pusherKey),
  sardineClientKey: getRequired('SARDINE_CLIENT_KEY', values.sardineClientKey),
  segmentAnalyticsKey: getRequired('SEGMENT_ANALYTICS_KEY', values.segmentAnalyticsKey),
  siftBeaconKey: getRequired('SIFT_BEACON_KEY', values.siftBeaconKey),
  streamKey: getRequired('STREAM_MESSAGING_KEY_ID', values.streamKey),
  stripeKey: getRequired('STRIPE_PKEY', values.stripeKey),

  // optional
  dutchiePlusPlaygroundKey: values.dutchiePlusPlaygroundKey,
  dutchiePlusPlaygroundUrl: values.dutchiePlusPlaygroundUrl,
  gtmContainerKey: values.gtmContainerKey,
  ghostClientKey: values.ghostClientKey,
  ghostApiUrl: values.ghostApiUrl,
  logrocketIdAdmin: values.logrocketIdAdmin,
  logrocketIdCheckout: values.logrocketIdCheckout,
  logrocketIdMarketplace: values.logrocketIdMarketplace,
};

export default PublicEnv;
