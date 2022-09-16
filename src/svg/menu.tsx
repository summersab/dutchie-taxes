import React, { SVGAttributes } from 'react';

export function Menu(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg width='19' height='13' viewBox='0 0 19 13' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect x='0.934326' y='0.513565' width='17.9215' height='2.15403' rx='1.07701' fill='#B2B8C3' />
      <rect x='0.934326' y='5.53993' width='13.4411' height='2.15403' rx='1.07701' fill='#B2B8C3' />
      <rect x='0.934326' y='10.5653' width='17.9215' height='2.15403' rx='1.07701' fill='#B2B8C3' />
    </svg>
  );
}
