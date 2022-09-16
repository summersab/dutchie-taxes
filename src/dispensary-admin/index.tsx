import loadable from '@loadable/component';
import React from 'react';

import HolidayHoursModal from 'src/dispensary-admin/holiday-hours-modal';
import { AccessModal as YearInReviewModal } from 'src/dispensary-admin/year-in-review/access-modal';
import OpenOrdersNotification from 'src/dispensary-admin/components/open-orders-notification';
import OrderConfirmedNotification from 'src/modals/orders/confirmed';
import { useUser } from 'src/hooks/use-user';
import { useUI } from 'src/hooks/use-ui';
import useLoadDispensary from 'src/hooks/use-load-dispensary';
import { StoreWrapper } from 'src/hooks/use-create-stores';
import { useDispensaryAdminLinks } from 'src/dispensary-admin/hooks/use-dispensary-admin-links';
import { AdminLayout } from 'src/components/admin-layout';
import { TermsOfServiceUpdated } from './common/tos-updated';

const LoadableRoute = loadable((props: { filePath: string }) => import(`${props.filePath}`));

function DispensaryAdminIndex(): JSX.Element {
  const { links, redirectPath } = useDispensaryAdminLinks();
  const User = useUser();
  const UI = useUI();
  const hasAcceptedTos = !User.isSuperAdmin && !User.profile.acceptedTOS;
  const [showTOSBanner, setShowTOSBanner] = React.useState(hasAcceptedTos);
  const { networkStatus } = useLoadDispensary();

  const loading = networkStatus === 1 || !UI.dispensary.id;

  return (
    <React.Fragment>
      <AdminLayout
        imageSrc={UI.dispensary.logoImage ?? ''}
        links={links}
        loading={loading}
        loadableRoute={LoadableRoute}
        redirectPath={redirectPath}
        title={UI.dispensary.name ?? ''}
      />

      {showTOSBanner && <TermsOfServiceUpdated hideTOSBanner={() => setShowTOSBanner(false)} />}
      <OpenOrdersNotification />
      <OrderConfirmedNotification />
      <HolidayHoursModal />
      <YearInReviewModal />
    </React.Fragment>
  );
}

// putting this inside a wrapper with the stores initialized so that
// the index above can access the orders store context.
export default function Wrapper(props: any): JSX.Element {
  return (
    <StoreWrapper {...props}>
      <DispensaryAdminIndex {...props} />
    </StoreWrapper>
  );
}
