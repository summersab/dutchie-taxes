import Big from 'big.js';

// Big's constructor really hates malformed numbers.
export const safeToBig = (num) => {
  try {
    return Big(num);
  } catch (e) {
    console.log('Error parsing num:', num);
    // console.trace()
    return Big(0);
  }
};
