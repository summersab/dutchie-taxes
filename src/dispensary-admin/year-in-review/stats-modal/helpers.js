import _ from 'lodash';

export { formatCurrency } from 'shared/helpers/utils';

export function formatMoneyAbbr(number) {
  if (!number) {
    return '';
  }

  const n = Math.trunc(number).toString();

  if (n.length === 9) {
    return `$${n[0]}${n[1]}${n[3]}.${n[4]}${n[5]}M`;
  }

  if (n.length === 8) {
    return `$${n[0]}${n[1]}.${n[2]}${n[3]}M`;
  }

  if (n.length === 7) {
    return `$${n[0]}.${n[1]}${n[2]}M`;
  }

  if (n.length === 6) {
    return `$${n[0]}${n[1]}${n[2]}K`;
  }

  if (n.length === 5) {
    return `$${n[0]}${n[1]}K`;
  }

  if (n.length === 4) {
    return `$${n[0]}K`;
  }

  if (n.length === 3) {
    return `$${Math.round(_.parseInt(n) / 100) * 100}`;
  }

  if (n.length === 2) {
    return `$${Math.round(_.parseInt(n) / 10) * 10}`;
  }

  return `$${Math.round(number)}`;
}

export function formatMoneyAbbr100k(number) {
  if (!number) {
    return '';
  }
  const roundedTo100k = number > 100000 ? Math.round(number / 100000) * 100000 : number;
  const n = Math.trunc(roundedTo100k).toString();

  if (n.length === 9) {
    return `$${n[0]}${n[1]}${n[3]}.${n[4]}M`;
  }

  if (n.length === 8) {
    return `$${n[0]}${n[1]}.${n[2]}M`;
  }

  if (n.length === 7) {
    return `$${n[0]}.${n[1]}M`;
  }

  if (n.length === 6) {
    return `$${n[0]}${n[1]}${n[2]}K`;
  }

  if (n.length === 5) {
    return `$${n[0]}${n[1]}K`;
  }

  if (n.length === 4) {
    return `$${n[0]}K`;
  }

  if (n.length === 3) {
    return `$${Math.round(_.parseInt(n) / 100) * 100}`;
  }

  if (n.length === 2) {
    return `$${Math.round(_.parseInt(n) / 10) * 10}`;
  }

  return `$${Math.round(number)}`;
}

export function formatMoneyAbbrDontRound(number) {
  if (!number) {
    return '';
  }

  const n = Math.trunc(number).toString();

  if (n.length === 9) {
    return `$${n[0]}${n[1]}${n[3]}.${n[4]}${n[5]}M`;
  }

  if (n.length === 8) {
    return `$${n[0]}${n[1]}.${n[2]}${n[3]}M`;
  }

  if (n.length === 7) {
    return `$${n[0]}.${n[1]}${n[2]}M`;
  }

  if (n.length === 6) {
    return `$${n[0]}${n[1]}${n[2]}K`;
  }

  if (n.length === 5) {
    return `$${n[0]}${n[1]}K`;
  }

  if (n.length === 4) {
    return `$${n[0]}K`;
  }

  return `$${n}`;
}

export function formatNumber(value) {
  const parsedValue = parseFloat(value);

  const locale = 'en-US';
  const maximumFractionDigits = 0;
  const minimumFractionDigits = 0;

  const formattedValue = new Intl.NumberFormat(locale, {
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(parsedValue);

  return formattedValue.replace(/\.00/g, '');
}
