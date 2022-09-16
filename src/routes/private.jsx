import React, { useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { useStores } from 'src/hooks/use-stores';
import { useObserver } from 'mobx-react-lite';
import useLocalStorage from 'react-use-localstorage';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ component: Component, ...rest }) {
  const { User } = useStores();
  const location = useLocation();
  const { pathname: locationPathname, search: locationSearch } = location;
  const [, setRedirectAfterLogin] = useLocalStorage('redirectAfterLogin', '');
  const initialUserFetchFinished = useObserver(() => User.initialUserFetchFinished);
  const loggedIn = useObserver(() => User.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      setRedirectAfterLogin(locationPathname + locationSearch);
    }
  }, [locationPathname, locationSearch]);

  if (!initialUserFetchFinished) {
    return null;
  }

  return (
    <Route {...rest}>
      {loggedIn && <Component {...rest} />}
      {!loggedIn && <Redirect to={{ pathname: '/login', state: { from: location } }} />}
    </Route>
  );
}

export default PrivateRoute;
