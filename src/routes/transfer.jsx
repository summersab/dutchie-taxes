import { when } from 'mobx';
import React from 'react';
import { useHistory } from 'react-router-dom';

import useErnie from 'shared/hooks/use-ernie';
import { useStores } from 'src/hooks/use-stores';
import { isAdminAccessible } from 'shared/helpers/users';
import PublicEnv from 'shared/utils/public-env';

export default function TransferRoute() {
  const history = useHistory();
  const { User } = useStores();
  const showErnie = useErnie();

  const urlParams = new URLSearchParams(window.location.search);
  const transferToken = urlParams.get('transferToken');

  React.useEffect(() => {
    async function handleLogin() {
      const response = await User.loginViaToken(transferToken);

      if (response.success) {
        when(
          () => User.exists === true,
          () => {
            const adminUser = isAdminAccessible(User.user);

            if (adminUser) {
              history.push('/redirect');
            } else {
              window.location.href = `${PublicEnv.consumerUrl}/login`;
            }
          }
        );
      } else {
        const message = response.message || 'That transfer token is expired. Please login via your email/password.';

        showErnie(message, 'danger');
        history.push('/login');
      }
    }

    if (!transferToken) {
      history.push('/login');
    } else {
      handleLogin();
    }
  }, []);

  return null;
}
