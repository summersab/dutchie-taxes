import React, { SVGAttributes } from 'react';

// rationale: SVG paths are looooong
/* eslint-disable max-len */

export function BackArrow(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='14.688' height='21.312' viewBox='0 0 14.688 21.312' {...props}>
      <path
        d='M7.116.406C6.501.97.49 6.895.49 6.895c-.327.3-.493.694-.493 1.089 0 .394.166.788.493 1.088 0 0 6.011 5.926 6.626 6.489.615.563 1.722.601 2.378 0 .656-.601.708-1.44-.001-2.177l-5.514-5.4 5.514-5.4c.709-.738.657-1.577.001-2.178s-1.763-.563-2.378 0z'
        fillRule='evenodd'
      />
    </svg>
  );
}
