import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import { RootStore } from 'src/state/app';

export function useStores(): RootStore {
  return React.useContext(MobXProviderContext) as RootStore;
}
