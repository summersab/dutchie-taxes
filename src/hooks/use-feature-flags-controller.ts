import { useFlags } from 'launchdarkly-react-client-sdk';
import React from 'react';

import { useStores } from 'src/hooks/use-stores';

export function useFeatureFlagsController(): void {
  const flags = useFlags();
  const stores = useStores();

  React.useEffect(() => {
    stores.FeatureFlags.setFlags(flags);
  }, [stores.FeatureFlags, flags]);
}
