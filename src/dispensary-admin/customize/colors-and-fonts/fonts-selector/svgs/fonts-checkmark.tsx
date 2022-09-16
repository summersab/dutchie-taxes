import React, { SVGAttributes } from 'react';

export function FontsCheckmark(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg width='10' height='9' viewBox='0 0 10 9' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.565 0.5L3.76065 4.61258L1.97826 2.61236L0 4.6573L3.71739 8.5L10 2.00584L8.565 0.5Z'
        fill='#969EA5'
      />
    </svg>
  );
}
