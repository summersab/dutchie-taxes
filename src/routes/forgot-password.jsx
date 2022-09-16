import React from 'react';
import { useHistory } from 'react-router-dom';

import ForgotPassword from 'src/components/user-flow/forgot-password';

export default function ForgotPasswordRoute() {
  const history = useHistory();

  function handleRedirectToLogin() {
    history.push('/login');
  }

  return <ForgotPassword onSuccess={handleRedirectToLogin} onClose={handleRedirectToLogin} />;
}
