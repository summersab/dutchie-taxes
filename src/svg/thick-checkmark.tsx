import React, { SVGAttributes } from 'react';

export function ThickCheckmark(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7 16.7947L10.9573 12.9616L14.5215 16.7116L24.1296 9L27 11.8232L14.4342 24L7 16.7947Z'
        fill='#4CA667'
      />
    </svg>
  );
}
