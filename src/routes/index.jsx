import loadable from '@loadable/component';
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import App from 'src/App';
import IntegrationCredentials from 'src/integrations/credentials';
import PrivateRoute from 'src/routes/private';
import PrivateYIRRoute from 'src/dispensary-admin/year-in-review/private-yir';
import { useFeatureFlagsController } from 'src/hooks/use-feature-flags-controller';

import LoginRoute from 'src/routes/login';
import TransferRoute from 'src/routes/transfer';
import ForgotPasswordRoute from 'src/routes/forgot-password';
import SetPasswordRoute from 'src/routes/set-password';
import ResetPasswordRoute from 'src/routes/reset-password';
import DispensariesMenuPreview from 'src/dispensary-admin/preview';
import { YearInReview } from '../dispensary-admin/year-in-review/page-container';

const DeliveryPage = loadable(() => import('src/delivery'));
const ExternalReceipt = loadable(() => import('src/external-receipt'));

export default function DutchieRouter() {
  useFeatureFlagsController();

  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <Route path='/delivery/:id/:token' component={DeliveryPage} />
          <Route path='/receipt/:id/:token' component={ExternalReceipt} />
          <Route path='/integrations/:adapter' component={IntegrationCredentials} />
          <PrivateRoute path='/dispensaries/:id/preview' component={DispensariesMenuPreview} />
          <PrivateYIRRoute path='/dispensaries/:id/year-in-review' component={YearInReview} />

          <Route path='/login' component={LoginRoute} />
          <Route path='/transfer' component={TransferRoute} />
          <Route path='/forgot-password' component={ForgotPasswordRoute} />
          <Route path='/set-password/:token' component={SetPasswordRoute} />
          <Route path='/reset/:token' component={ResetPasswordRoute} />

          <PrivateRoute path='/*' component={App} />
        </Switch>
      </QueryParamProvider>
    </BrowserRouter>
  );
}
