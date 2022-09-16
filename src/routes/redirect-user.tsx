import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useQueryParams, StringParam, withDefault } from 'use-query-params';

import { useUser } from 'src/hooks/use-user';
import PublicEnv from 'shared/utils/public-env';

const queryParamsConfig = { deepLinkSegment: withDefault(StringParam, '') };
const consumerRedirectUrl = `${PublicEnv.consumerUrl}/dispensaries`;

function useConsumerAppSwitchEffect(): void {
  const User = useUser();

  useEffect(() => {
    async function handleAppSwitch(): Promise<void> {
      if (User.isConsumerUser) {
        await User.logout();
        window.location.href = consumerRedirectUrl;
      }
    }

    void handleAppSwitch();
  }, [User, User.logout, User.isConsumerUser]);
}

export default function RedirectUser(): JSX.Element | null {
  const User = useUser();
  const [query] = useQueryParams(queryParamsConfig);
  const deepLinkSegment = query.deepLinkSegment.startsWith('/') ? query.deepLinkSegment : `/${query.deepLinkSegment}`;

  useConsumerAppSwitchEffect();

  if (User.isSuperAdmin) {
    return <Redirect to='/super' />;
  }

  if (User.isChainAdmin && User.profile.chainID) {
    const to = `/chains/${User.profile.chainID}${deepLinkSegment}`;
    return <Redirect to={to} />;
  }

  if (User.isDispensaryUser && User.profile.dispensaryId) {
    const to = `/dispensaries/${User.profile.dispensaryId}${deepLinkSegment}`;
    return <Redirect to={to} />;
  }

  return null;
}
