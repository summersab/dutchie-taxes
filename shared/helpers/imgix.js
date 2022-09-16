import _ from 'lodash';

const LEGACY_STRING = 'https://s3-us-west-2.amazonaws.com/dutchie-images/';
const IMGIX_SOURCE = 'https://images.dutchie.com/';

export const ensureSecureUrlProtocol = (src) => {
  if (_.includes(src, 'http://')) {
    src = _.replace(src, 'http://', 'https://');
  }
  return src;
};

export const replaceAWSSourceWithImgix = (src) => {
  src = _.trim(src || '');
  // Replace S3 with imgix.
  if (_.includes(src, LEGACY_STRING)) {
    src = _.replace(src, LEGACY_STRING, IMGIX_SOURCE);
  }
  return ensureSecureUrlProtocol(src);
};
