import React, { Component } from 'react';
import { computed, autorun } from 'mobx';
import { observer, inject, disposeOnUnmount } from 'mobx-react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { withOrdersStore } from 'src/stores/orders';
import OrderNotification from 'src/dispensary-admin/orders/modals/order-notification';
import Push from 'push.js';

@inject('UI', 'User')
@withOrdersStore
@observer
class OpenOrdersNotification extends Component {
  lastDesktopNotificationId;

  @computed get shouldRespondToNewOrder() {
    const { User } = this.props;
    const { permissions } = User.profile;

    if (User.isSuperAdmin || !permissions?.orders) {
      return false;
    }

    return true;
  }

  @disposeOnUnmount autoNotify = autorun(() => {
    if (!(this.shouldRespondToNewOrder && this.openOrders.length > 0)) {
      return;
    }
    if (this.multipleOrders) {
      this.notifyOfMultipleOrders();
    } else if (this.openOrders[0]._id !== this.lastDesktopNotificationId) {
      this.notifyOfSingleOrder();
    }
  });

  @computed get openOrders() {
    return _.filter(this.props.ordersStore.active.orders, { status: 'open' });
  }

  @computed get multipleOrders() {
    return _.filter(this.props.ordersStore.active.orders, { status: 'open' }).length > 1;
  }

  notifyOfSingleOrder() {
    const newOrder = this.openOrders[0];
    const { browserNotification, desktopNotification } = this.props.User.profile;
    this.lastDesktopNotificationId = newOrder._id;

    if (!desktopNotification) {
      return;
    }

    Push.create('You have a new dutchie order!', {
      body: 'Click to view the order',
      icon: '/icons/notification-icon-32x32.png',
      tag: `order:${newOrder._id}`,
      requireInteraction: true,
      onClick() {
        window.focus();
        this.close(); // This refers to the notification.
        if (browserNotification === false) {
          this.props.history.push(`/dispensaries/${newOrder.dispensaryId}/orders/edit/${newOrder._id}`);
        }
      },
    });
  }

  notifyOfMultipleOrders() {
    const { desktopNotification } = this.props.User.profile;

    if (!desktopNotification) {
      return;
    }

    Push.create('You have new dutchie orders!', {
      body: 'Confirm your orders to view more',
      icon: '/icons/notification-icon-32x32.png',
      tag: 'orders',
      requireInteraction: true,
      onClick() {
        window.focus();
        this.close(); // This refers to the notification.
      },
    });
  }

  render() {
    if (!this.shouldRespondToNewOrder || _.isEmpty(this.openOrders)) {
      return null;
    }

    const { browserNotification } = this.props.User.profile;

    if (browserNotification !== false) {
      return <OrderNotification orders={this.openOrders} multipleOrders={this.multipleOrders} />;
    }

    return null;
  }
}

export default withRouter(OpenOrdersNotification);
