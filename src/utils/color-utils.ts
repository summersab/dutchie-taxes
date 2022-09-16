import { isNotNullish } from 'shared/utils/type-utils';

function getScoreColor(score?: number | null): string {
  let color = '#61a58b';

  if (isNotNullish(score)) {
    const roundedValue = Math.round(score * 100) / 100;

    if (roundedValue <= 3) {
      color = '#e25858';
    } else if (roundedValue < 4.25) {
      color = '#edc02b';
    }
  }

  return color;
}

export default {
  getScoreColor,
};
