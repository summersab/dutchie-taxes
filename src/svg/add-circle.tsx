import React, { SVGAttributes } from 'react';

// rationale: SVG paths are looooong
/* eslint-disable max-len */

export function AddCircle(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg' height='30' width='30' {...props}>
      <circle cx='15' cy='15' r='14' strokeWidth='2' stroke='#BCCAD2' />
      <path
        d='M13.8333 9.16667C13.8333 8.52233 14.3557 8 15 8C15.6443 8 16.1667 8.52233 16.1667 9.16667V20.8333C16.1667 21.4777 15.6443 22 15 22C14.3557 22 13.8333 21.4777 13.8333 20.8333V9.16667Z'
        fill='#A3AFBA'
      />
      <path
        d='M20.8333 13.8333C21.4777 13.8333 22 14.3557 22 15C22 15.6443 21.4777 16.1667 20.8333 16.1667H9.16667C8.52233 16.1667 8 15.6443 8 15C8 14.3557 8.52233 13.8333 9.16667 13.8333H20.8333Z'
        fill='#A3AFBA'
      />
    </svg>
  );
}
