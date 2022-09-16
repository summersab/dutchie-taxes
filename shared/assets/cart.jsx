/* eslint-disable max-len */
import React from 'react';

function SvgCart({ pathStyles = {}, ...props }) {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.38362 21.152C7.38362 20.541 7.87822 20.0755 8.46011 20.0755C9.04199 20.0755 9.5366 20.5701 9.5366 21.152C9.5366 21.763 9.04199 22.2285 8.46011 22.2285C7.84913 22.2285 7.38362 21.7339 7.38362 21.152ZM11.2822 21.152C11.2822 19.5809 10.0021 18.3298 8.46009 18.3298C6.91809 18.3298 5.63794 19.61 5.63794 21.152C5.63794 22.694 6.91809 23.9741 8.46009 23.9741C10.0312 23.9741 11.2822 22.694 11.2822 21.152Z'
        fill='white'
        {...pathStyles}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.0303 21.152C17.0303 20.541 17.5249 20.0755 18.1068 20.0755C18.7181 20.0755 19.1834 20.5701 19.1834 21.152C19.1834 21.763 18.6887 22.2285 18.1068 22.2285C17.5249 22.2285 17.0303 21.7339 17.0303 21.152ZM20.9582 21.152C20.9582 19.5809 19.6783 18.3298 18.1362 18.3298C16.5938 18.3298 15.3139 19.61 15.3139 21.152C15.3139 22.7231 16.5938 23.9741 18.1362 23.9741C19.6783 23.9741 20.9582 22.694 20.9582 21.152Z'
        fill='white'
        {...pathStyles}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M21.2102 6.68597L19.5097 11.9523H7.38516L6.5211 6.68597H21.2102ZM4.93235 0.560395L1.75482 0.00604456C1.28098 -0.0493905 0.86288 0.28322 0.807134 0.7267C0.751388 1.14246 1.03012 1.55823 1.44822 1.64138L4.04041 2.08486L6.4375 16.692C6.49324 17.1078 6.85559 17.3849 7.27369 17.3849H20.1789C20.6528 17.3849 21.0151 17.0246 21.0151 16.5534C21.0151 16.0822 20.6528 15.7219 20.1789 15.7219H7.99839L7.63604 13.5876H20.1232C20.4852 13.5876 20.82 13.3659 20.9315 13.0056L23.1613 6.07618C23.3007 5.6327 23.0499 5.16151 22.6318 5.02292C22.5481 4.9952 22.4645 4.9952 22.3809 4.9952H6.24238L5.62918 1.25333C5.54556 0.893006 5.2947 0.61583 4.93235 0.560395Z'
        fill='white'
        {...pathStyles}
      />
    </svg>
  );
}

export default SvgCart;
