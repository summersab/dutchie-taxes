import { action, computed, observable, toJS } from 'mobx';

import { RootState } from 'src/state/app';

type FeatureFlags = Record<string, string>;

export class FeatureFlagsState {
  @observable _flags: FeatureFlags = {};

  constructor(private readonly rootStore: RootState) {}

  @action
  setFlags(newFlags: FeatureFlags): void {
    this._flags = newFlags;
  }

  @computed
  get flags(): FeatureFlags {
    return toJS(this._flags);
  }
}
