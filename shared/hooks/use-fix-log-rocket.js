import { useEffect } from 'react';

// log rocket needs to extend event handlers and does so in strict mode
// that means if they're not extendable (ebmla carousels) then it'll throw
// and exceptions are bad!
export default function useFixLogRocket() {
  useEffect(() => {
    const oldAddListener = HTMLDivElement.prototype.addEventListener;
    HTMLDivElement.prototype.addEventListener = function addEventListener(name, fn, ...options) {
      if (Object.isExtensible(fn)) {
        return oldAddListener.apply(this, [name, fn, ...options]);
      }

      function wrappedFn(...args) {
        return fn.call(this, ...args);
      }
      Object.keys(fn).forEach((key) => {
        wrappedFn[key] = fn[key];
      });

      return oldAddListener.apply(this, [name, wrappedFn, ...options]);
    };

    return () => {
      HTMLDivElement.prototype.addEventListener = oldAddListener;
    };
  }, []);
}
