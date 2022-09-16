import React, { SVGAttributes } from 'react';

// rationale: SVG paths are looooong
/* eslint-disable max-len */

export function PhoneWrapper(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg width='370' height='802' viewBox='0 0 370 802' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M316.216 0H53.7845C24.0802 0 0 24.9011 0 55.618V746.049C0 776.766 24.0802 801.667 53.7845 801.667H316.216C345.92 801.667 370 776.766 370 746.049V55.618C370 24.9011 345.92 0 316.216 0ZM11.1278 55.618C11.1278 31.2563 30.2258 11.5072 53.7845 11.5072H80.7545C83.95 12.67 86.2406 15.8191 86.2406 19.5211C86.2406 31.2482 95.4338 40.7546 106.774 40.7546H262.299C273.639 40.7546 282.832 31.2482 282.832 19.5211C282.832 15.8191 285.123 12.67 288.318 11.5072H316.216C339.774 11.5072 358.872 31.2563 358.872 55.618V746.049C358.872 770.41 339.774 790.16 316.216 790.16H53.7845C30.2258 790.16 11.1278 770.41 11.1278 746.049V55.618Z'
        fill='url(#paint0_linear_2_2)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_2_2'
          x1='370'
          y1='617.552'
          x2='-288.734'
          y2='748.372'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#323232' />
          <stop offset='0.79852' />
        </linearGradient>
      </defs>
    </svg>
  );
}
