import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import { useStores } from 'src/hooks/use-stores';

function PrivateRoute({ component: Component, ...rest }) {
  const { User } = useStores();
  const location = useLocation();
  const loggedIn = useObserver(() => User.loggedIn);
  const initialUserFetchFinished = useObserver(() => User.initialUserFetchFinished);
  const authed = loggedIn && (User.isSuperAdmin || User.profile?.permissions?.analytics);

  if (!initialUserFetchFinished) {
    return null;
  }

  return (
    <Route {...rest}>
      {authed && <Component {...rest} />}
      {!authed && <Redirect to={{ pathname: '/login', state: { from: location } }} />}
    </Route>
  );
}

export default PrivateRoute;
