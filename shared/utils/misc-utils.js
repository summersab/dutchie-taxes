import _ from 'lodash';
import numeral from 'numeral';
import { CannabinoidAbbrev } from '../../shared/constants/cannabinoids.js';
import { NUMERALS_DOLLAR_FORMAT } from '../../shared/constants/index.js';

function extractValidationErrors(graphQLErrors) {
  const errors = _.filter(graphQLErrors, ['extensions.code', 'UNPROCESSABLE_ENTITY']);
  return _.flatMap(errors, (error) => _.map(error.extensions.errors, 'detail'));
}

const formatPrice = (price) => numeral(parseFloat(price).toFixed(2)).format(NUMERALS_DOLLAR_FORMAT);

const formatFromCents = (priceInCents) => formatPrice(priceInCents / 100);

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function getBufferFromBase64Image(image = '') {
  return Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

// Check if an elem is visible on screen, and whether its above or below a certain offset
function isScrolledIntoView(elem, threshold = 0, mode = 'visible') {
  const rect = elem.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  const above = rect.bottom - threshold < 0;
  const below = rect.top - viewHeight + threshold >= 0;

  return mode === 'above' ? above : mode === 'below' ? below : !above && !below;
}

export function getHtmlPlainText(html, Parser) {
  if (!Parser) {
    console.log('DOMParser not available in this context. Is this a browser?');
    return '';
  }
  try {
    const parserInst = new Parser();
    return parserInst.parseFromString(html, 'text/html').documentElement.textContent;
  } catch (e) {
    console.log('Error found with dom parser.', e);
    return '';
  }
}

// normalizes noid abbrev, like THC-D9 -> D9-THC
const mapToStandardAbbreviation = (abbrev) => CannabinoidAbbrev[abbrev];

// Extracts noid abbrev from full text
// ex. '(CBDA) Cannablahblah' to 'CBDA' or '"TAC" - Total Noids' to 'TAC'
export const parseNoidAbbreviation = (noidName) => mapToStandardAbbreviation(/[\w-]+/.exec(noidName)?.[0]) ?? noidName;

// Extracts noid long name from full text
// ex. '(CBDA) Cannablahblah' to 'Cannablahblah' or '"TAC" - Total Noids' to 'Total Noids'
export const parseNoidLongName = (noidName) => /(?:\(|\W\s)+(.+\b)(?:\)|$)/.exec(noidName)?.[1] ?? noidName;

export default {
  extractValidationErrors,
  formatFromCents,
  formatPrice,
  getBufferFromBase64Image,
  getDisplayName,
  isBrowser,
  isScrolledIntoView,
};
