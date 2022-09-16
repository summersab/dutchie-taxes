import React, { SVGAttributes } from 'react';

// rationale: SVG paths are looooong
/* eslint-disable max-len */

export function Remove(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <circle cx='10' cy='10' r='10' fill='#E1E6EB' />
      <path
        d='M12.4625 6.53553C12.7879 6.21009 13.3156 6.21009 13.641 6.53553C13.9664 6.86097 13.9664 7.38861 13.641 7.71405L7.74846 13.6066C7.42302 13.9321 6.89538 13.9321 6.56995 13.6066C6.24451 13.2812 6.24451 12.7536 6.56995 12.4281L12.4625 6.53553Z'
        fill='#6D747B'
      />
      <path
        d='M13.641 12.4281C13.9664 12.7536 13.9664 13.2812 13.641 13.6066C13.3156 13.9321 12.7879 13.9321 12.4625 13.6066L6.56995 7.71405C6.24451 7.38861 6.24451 6.86097 6.56995 6.53553C6.89538 6.21009 7.42302 6.21009 7.74845 6.53553L13.641 12.4281Z'
        fill='#6D747B'
      />
    </svg>
  );
}
