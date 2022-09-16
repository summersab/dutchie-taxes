import React from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

import Login from 'src/components/user-flow/login';

export default function LoginRoute() {
  const history = useHistory();
  const [redirectAfterLoginPath, setRedirectAfterLogin] = useLocalStorage('redirectAfterLogin', '');
  const [token] = useLocalStorage('access-token');

  React.useEffect(() => {
    // access-token is removed from localstorage via onSessionExpired
    // but if we get here and have a token, lets redirect
    if (token) {
      history.replace('/redirect');
    }
  }, [token]);

  function handleOpenForgotPassword() {
    history.push('/forgot-password');
  }

  function onLoginSuccess() {
    const path = redirectAfterLoginPath?.length ? redirectAfterLoginPath : '/redirect';
    try {
      history.replace(path);
    } catch (e) {
      console.error(e);
      history.replace('/redirect');
    } finally {
      setRedirectAfterLogin('');
    }
  }

  return <Login onOpenForgotPassword={handleOpenForgotPassword} showSignUp={false} onSuccess={onLoginSuccess} />;
}
