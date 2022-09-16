import React, { SVGAttributes } from 'react';

// rationale: SVG paths are looooong
/* eslint-disable max-len */

export function Add(props: SVGAttributes<unknown>): JSX.Element {
  const { height: heightFromProps, width: widthFromProps, ...otherProps } = props;

  const height = heightFromProps ?? '12';
  const width = widthFromProps ?? '12';

  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' height={height} width={width} {...otherProps}>
      <path
        d='M5 1C5 0.447715 5.44772 0 6 0C6.55229 0 7 0.447715 7 1V11C7 11.5523 6.55229 12 6 12C5.44772 12 5 11.5523 5 11V1Z'
        fill='#A3AFBA'
      />
      <path
        d='M11 5C11.5523 5 12 5.44772 12 6C12 6.55229 11.5523 7 11 7H1C0.447715 7 0 6.55229 0 6C0 5.44772 0.447715 5 1 5H11Z'
        fill='#A3AFBA'
      />
    </svg>
  );
}
