import React, { SVGAttributes } from 'react';

// rationale: SVG paths are looooong
/* eslint-disable max-len */

export function ChevronIcon(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg viewBox='0 0 30 18' {...props}>
      <path
        clipRule='evenodd'
        d='M26.137.702a2.175 2.175 0 013.2 0c.873.91.886 2.4.027 3.327l-.027.029-12.74 13.25a2.18 2.18 0 01-3.187 0L.663 4.058C-.21 3.147-.222 1.658.635.73L.663.7a2.175 2.175 0 013.186 0L15 11.573z'
        fillRule='evenodd'
      />
    </svg>
  );
}
