import _ from 'lodash';
import { observable, transaction, computed } from 'mobx';
import { createContext } from 'react';

import { appState } from 'src/state/app';
import { filteredIntegrations } from 'shared/graphql/integration/queries';
import createContextHelpers from 'shared/helpers/context';

export const IntegrationsStoreContext = createContext({});
export const { withIntegrationsStore, useIntegrationsStore } = createContextHelpers(
  IntegrationsStoreContext,
  'integrationsStore'
);

export default class IntegrationsStore {
  @observable dispensaryId = null;
  @observable hasLoaded = false;
  @observable integrations = [];
  @observable subscription = null;

  constructor({ dispensaryId, ldClient }) {
    this.dispensaryId = dispensaryId;
    this.ldClient = ldClient;
  }

  fetch = () => {
    return this.start();
  };

  start = () =>
    new Promise((resolve) => {
      this.stop();
      this.subscription = appState.apolloClient
        .watchQuery({
          query: filteredIntegrations,
          variables: {
            dispensaryId: this.dispensaryId,
          },
          fetchPolicy: 'cache-and-network',
          pollInterval: 30 * 1000,
          notifyOnNetworkStatusChange: true,
        })
        .subscribe({
          next: (response) => {
            if (response?.loading) {
              return;
            }
            transaction(() => {
              this.integrations = response.data?.filteredIntegrations || [];
              this.hasLoaded = true;
              resolve();
            });
          },
        });
    });

  stop = () => {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  };

  @computed get downIntegrations() {
    const { adapters: downAdapters = [] } = this.ldClient?.variation('alert.pos-status-banner', { adapters: [] }) || {};
    return _.filter(this.integrations, ({ adapter }) => downAdapters.includes(adapter));
  }

  @computed get invalidCredentialIntegrations() {
    return _.filter(this.integrations, { syncFailureType: 'InvalidPOSCredentials' });
  }

  @computed get erroredIntegrations() {
    return [...this.invalidCredentialIntegrations, ...this.downIntegrations];
  }
}
