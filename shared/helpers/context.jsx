import { useContext } from 'react';
import { withContext } from 'with-context';

export default function createContextHelpers(Context, name) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const { Provider } = Context;

  function useMethod() {
    return useContext(Context);
  }

  return {
    [`${name}Context`]: Context,
    [`${capitalizedName}Provider`]: Provider,
    [`use${capitalizedName}`]: useMethod,
    [`with${capitalizedName}`]: withContext(Context, name),
  };
}
