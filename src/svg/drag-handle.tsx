import React, { SVGAttributes } from 'react';

// rationale: SVG paths are looooong
/* eslint-disable max-len */

export function DragHandle(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect y='0.5' width='16' height='2.2' rx='1.1' fill='#45505C' />
      <rect y='4.89999' width='16' height='2.2' rx='1.1' fill='#45505C' />
      <rect y='9.29999' width='16' height='2.2' rx='1.1' fill='#45505C' />
    </svg>
  );
}
