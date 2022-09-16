import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { usePusherAppReload } from 'src/hooks/use-pusher-app-reload';
import useFixLogRocket from 'shared/hooks/use-fix-log-rocket';
import RedirectUser from 'src/routes/redirect-user';
import { SuperAdminIndex } from 'src/super-admin';
import ChainAdmin from 'src/chain-admin';
import DispensaryAdmin from 'src/dispensary-admin';
import EnterpriseAdmin from 'src/enterprise-admin';
import ExportRedirect from 'src/routes/export-redirect/index';
import ZendeskLogin from 'src/routes/zendesk-login';
import useAdminZendeskWidget from './hooks/use-admin-zendesk-widget';

// https://github.com/airbnb/react-with-styles/issues/137
import 'react-dates/initialize';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-dates/lib/css/_datepicker.css';

export default function App(): JSX.Element {
  useAdminZendeskWidget();
  usePusherAppReload();
  useFixLogRocket();

  return (
    <Switch>
      <Route path='/exports/:exportId' component={ExportRedirect} />
      <Route path='/zendesk' component={ZendeskLogin} />

      <Route path='/super' component={SuperAdminIndex} />
      <Route path='/chains/:chainId' component={ChainAdmin} />
      <Route path='/dispensaries/:id' component={DispensaryAdmin} />
      <Route path='/enterprise/:enterpriseId' component={EnterpriseAdmin} />

      <Route path='/*' component={RedirectUser} />
    </Switch>
  );
}
