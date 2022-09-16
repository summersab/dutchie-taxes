import _ from 'lodash';
import { observable, computed, action, toJS, reaction } from 'mobx';
import { createContext } from 'react';

import { appState } from 'src/state/app';
import { PusherConfig } from 'shared/constants';
import createContextHelpers from 'shared/helpers/context';

import getOrdersQuery from './get-orders.gql';

export const OrdersStoreContext = createContext({});
export const { OrdersStoreProvider, withOrdersStore, useOrdersStore } = createContextHelpers(
  OrdersStoreContext,
  'ordersStore'
);

const defaultRefreshInterval = 45;
const defaultThrottlingInterval = 2;

export const defaultParams = {
  chainId: null,
  kiosk: null,
  page: 0,
  perPage: 20,
  search: '',
  sortBy: { id: 'createdAt', desc: true },
  status: 'closed',
};

export default class OrdersStore {
  failedRequestsCount = 0;
  @observable dispensaryId = null;
  @observable isFetching = false;
  @observable initialLoadFinished = false;
  @observable params = {};
  @observable _orders = [];
  @observable _totalOrderCount = 0;

  constructor({ dispensaryId, FeatureFlags, params = {}, pusher }) {
    this.dispensaryId = dispensaryId;
    this.params = { ...defaultParams, ...params };
    this.pusher = pusher;
    this.failureTimeout = null;
    this.handleSetupPollingInterval(FeatureFlags.flags);
    this.handleSetupThrottlingInterval(FeatureFlags.flags);

    reaction(
      () => FeatureFlags.flags,
      () => {
        this.handleSetupPollingInterval(FeatureFlags.flags);
        this.handleSetupThrottlingInterval(FeatureFlags.flags);
        this.start();
      }
    );
  }

  handleSetupPollingInterval = (flags) => {
    const value = flags['configuration.dispensary-orders-polling-interval'];
    this.pollInterval = _.clamp(value, defaultRefreshInterval, 120) || defaultRefreshInterval;
    console.debug(`Orders Store: Setting polling interval to ${this.pollInterval} seconds`);
  };

  handleSetupThrottlingInterval = (flags) => {
    const value = flags['configuration.dispensary-orders-throttling-interval'];
    const throttlingInterval = _.clamp(value, defaultThrottlingInterval, 10) || defaultThrottlingInterval;
    const throttlingIntervalMilliseconds = throttlingInterval * 1000;
    this.throttledRefresh = _.throttle(this.refresh, throttlingIntervalMilliseconds);
    console.debug(`Orders Store: Setting throttling interval to ${throttlingInterval} seconds`);
  };

  onOrdersDidChange = (_data) => {
    this.throttledRefresh();
  };

  fetch = async () => {
    if (this.isFetching) {
      return;
    }
    this.isFetching = true;

    try {
      const { data, error } = await appState.apolloClient.query({
        query: getOrdersQuery,
        fetchPolicy: 'network-only',
        variables: {
          input: {
            ...this.params,
            sortBy: {
              id: _.get(this.params, 'sortBy.id', 'createdAt'),
              desc: Boolean(_.get(this.params, 'sortBy.desc', false)),
            },
            dispensaryId: this.dispensaryId,
          },
        },
      });

      if (error) {
        console.error('Error fetching orders.');
        console.error(error);
        this.failedRequestsCount = this.failedRequestsCount + 1;
        this.failureTimeout = setTimeout(this.fetch, 2500 * this.failedRequestsCount); // Retry immediately if failure.
      } else {
        const orders = data.getOrders?.orders || [];
        const totalCount = data.getOrders?.queryInfo?.totalCount || 0;

        this._orders = orders;
        this._totalOrderCount = totalCount;
        this.initialLoadFinished = true;
        this.failedRequestsCount = 0;
      }
    } catch (e) {
      this.failedRequestsCount = this.failedRequestsCount + 1;
      this.failureTimeout = setTimeout(this.fetch, 2500 * this.failedRequestsCount); // Retry immediately if failure.
      console.error(e);
    } finally {
      this.isFetching = false;
    }
  };

  start = async () => {
    this.stop();
    await this.fetch();
    this.startPusher();
    const pollIntervalMilliseconds = this.pollInterval * 1000;
    this.pollingId = setInterval(this.throttledRefresh, pollIntervalMilliseconds);
  };

  startPusher = () => {
    if (!this.unregisterPusher) {
      this.unregisterPusher = this.pusher.register(
        PusherConfig.DispensaryOrders.CHANNEL({ id: this.dispensaryId }),
        PusherConfig.DispensaryOrders.Events.ORDER_UPDATED,
        this.onOrdersDidChange
      );
    }
  };

  stop = () => {
    this.isFetching = false;
    clearInterval(this.pollingId);
  };

  destroy = () => {
    this.stop();

    if (this.unregisterPusher) {
      this.unregisterPusher();
    }

    if (this.failureTimeout) {
      clearTimeout(this.failureTimeout);
    }
  };

  refresh = () => {
    this.start();
  };

  @action
  updateParams = (params = {}) => {
    this.params = { ...defaultParams, ...params };
    this.initialLoadFinished = false;
    this.refresh();
  };

  @computed
  get isEmpty() {
    return this.orderCount === 0 && this.initialLoadFinished;
  }

  @computed
  get orderCount() {
    return (this._orders || []).length;
  }

  @computed
  get totalOrderCount() {
    return this._totalOrderCount;
  }

  @computed
  get orders() {
    return toJS(this._orders);
  }
}
