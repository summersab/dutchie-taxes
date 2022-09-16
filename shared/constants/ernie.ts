/* eslint-disable @typescript-eslint/naming-convention */

export const ERNIE_TIMEOUTS = Object.freeze({
  LONG: 30000,
  MED: 10000,
  SHORT: 5000,
});

type ErnieTypes = 'danger' | 'error' | 'info' | 'success';

type ErnieTypesConstant = {
  DANGER: ErnieTypes;
  ERROR: ErnieTypes;
  INFO: ErnieTypes;
  SUCCESS: ErnieTypes;
};
export const ERNIE_TYPES: ErnieTypesConstant = Object.freeze({
  DANGER: `danger`,
  ERROR: `error`,
  INFO: `info`,
  SUCCESS: `success`,
});

export const ERNIE_DEFAULT_MESSAGES = Object.freeze({
  ERROR: `Something went wrong, please try again.`,
  LOGIN: `You've entered an incorrect email or password. Please try again.`,
});
