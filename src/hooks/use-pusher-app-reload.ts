import { useEffect } from 'react';

import { useStores } from 'src/hooks/use-stores';
import { PusherConfig } from 'shared/constants';

function handleReloadApp(): void {
  console.debug('Dutchie has been updated, reloading...');
  window.location.reload(true);
}

export function usePusherAppReload(): void {
  const { Pusher } = useStores();

  useEffect(() => Pusher.register(PusherConfig.Admin.CHANNEL, PusherConfig.Admin.Events.ReloadApp, handleReloadApp), [
    Pusher,
  ]);
}
