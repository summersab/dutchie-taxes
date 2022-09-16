import _ from 'lodash';
import { useObserver } from 'mobx-react';
import { useEffect, useState } from 'react';

import useStores from 'shared/hooks/use-stores';

type VersionCheckReturnValue = {
  hasLatestVersion: boolean;
  onReload: () => void;
};

export function useVersionCheck(currentVersion: string): VersionCheckReturnValue {
  const [hasLatestVersion, setHasLatestVersion] = useState(true);
  const { UI } = useStores();
  const latestVersion = useObserver<string>(() => UI.latestVersion);

  useEffect(() => {
    const debugMessage = `[VERSION] Current version: ${currentVersion}, latest version: ${latestVersion}`;
    console.debug(debugMessage);

    if (!_.isNull(currentVersion) && !_.isNull(latestVersion) && currentVersion !== latestVersion) {
      console.debug(`[VERSION] Out of date, requesting update`);
      setHasLatestVersion(false);
    }
  }, [currentVersion, latestVersion]);

  function onReload(): void {
    window.location.reload(true);
  }

  return { hasLatestVersion, onReload };
}
