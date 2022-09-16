import React, { SVGAttributes } from 'react';

// rationale: SVG paths are looooong
/* eslint-disable max-len */

export function Checkmark(props: SVGAttributes<unknown>): JSX.Element {
  const { color: colorFromProps, height: heightFromProps, width: widthFromProps, viewBox: viewBoxFromProps } = props;

  const color = colorFromProps ?? '#ffffff';
  const height = heightFromProps ?? '8';
  const width = widthFromProps ?? '9';
  const viewBox = viewBoxFromProps ?? `0 0 ${width} ${height}`;

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={viewBox}>
      <defs>
        <filter id='a' x='0' y='0' filterUnits='userSpaceOnUse'>
          <feOffset dy='1' in='SourceAlpha' />
          <feGaussianBlur result='blurOut' />
          <feFlood floodColor='#000' result='floodOut' />
          <feComposite in='floodOut' in2='blurOut' operator='atop' />
          <feComponentTransfer>
            <feFuncA slope='.21' type='linear' />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      <path
        d='M1.771 1.855L0 3.642l3.345 3.361L9 1.323 7.706.001 3.383 3.61 1.771 1.855z'
        fill={color}
        fillRule='evenodd'
        filter='url(#a)'
      />
    </svg>
  );
}

// rationale: this file is depended on by a file in /shared (shared/components/dropdown/label.jsx). Keeping for
// backwards-compatibility.
// eslint-disable-next-line import/no-default-export
export default Checkmark;
