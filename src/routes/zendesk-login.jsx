import React, { useEffect } from 'react';
import { useStores } from 'src/hooks/use-stores';
import { FullPageLoader } from 'shared/components';
import PublicEnv from 'shared/utils/public-env';

export default function ZendeskLogin() {
  const { User } = useStores();
  const subdomain = PublicEnv.appEnv === 'production' ? 'dutchie' : 'dutchie1601064859';

  useEffect(() => {
    const { zendeskSingleSignOnToken } = User._user;
    window.location = `https://${subdomain}.zendesk.com/access/jwt?jwt=${zendeskSingleSignOnToken}`;
  }, [User._user, subdomain]);

  return <FullPageLoader />;
}
