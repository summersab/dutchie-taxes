import React from 'react';
import { useParams } from 'react-router-dom';
import { useLDClient } from 'launchdarkly-react-client-sdk';

import { isSEOBot } from 'shared/helpers/utils';
import usePusher from 'src/hooks/use-pusher';
import { segmentIdentifyAndGroup } from 'shared/helpers/tools';
import { useStores } from 'src/hooks/use-stores';
import { useUser } from 'src/hooks/use-user';
import OrdersStore, { OrdersStoreProvider } from 'src/stores/orders';
import IntegrationsStore, { IntegrationsStoreContext } from 'src/stores/integrations';

function createStores(Pusher, params, ldClient, FeatureFlags) {
  return {
    activeOrdersStore: new OrdersStore({
      dispensaryId: params.id,
      FeatureFlags,
      pusher: Pusher,
      params: {
        status: 'active',
        perPage: 1500,
      },
    }),
    integrationsStore: new IntegrationsStore({ dispensaryId: params.id, ldClient }),
  };
}

export default function useCreateStores() {
  const stores = React.useRef();
  const Pusher = usePusher();
  const User = useUser();
  const { FeatureFlags, UI } = useStores();
  const params = useParams();
  const ldClient = useLDClient();

  if (!stores.current) {
    stores.current = createStores(Pusher, params, ldClient, FeatureFlags);
  }

  async function startStores() {
    if (User.isSuperAdmin || User.user.profile?.permissions?.orders) {
      stores.current.activeOrdersStore.start();
    }

    // dont attempt to configure segment until after integrations store has started
    await stores.current.integrationsStore.start();
    if (!isSEOBot()) {
      segmentIdentifyAndGroup(User._user, UI.dispensary, stores.current.integrationsStore.integrations);
    }
  }

  React.useEffect(() => {
    startStores();

    return () => {
      stores.current.activeOrdersStore.destroy();
      stores.current.integrationsStore.stop();
    };
  }, [stores.current]);

  return stores.current;
}

export function StoreWrapper({ children }) {
  const stores = useCreateStores();

  return (
    <OrdersStoreProvider value={{ active: stores.activeOrdersStore }}>
      <IntegrationsStoreContext.Provider value={stores.integrationsStore}>{children}</IntegrationsStoreContext.Provider>
    </OrdersStoreProvider>
  );
}
