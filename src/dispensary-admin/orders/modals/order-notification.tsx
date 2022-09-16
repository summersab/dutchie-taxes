import React, { useState, useEffect, useMemo } from 'react';
import Push from 'push.js';
import { useStores } from 'src/hooks/use-stores';
import { useMutation } from '@apollo/react-hooks';

import OrderConfirmationNotification from 'src/modals/orders/confirmation';

import { useOrdersStore } from 'src/stores/orders';
import { updateOrderStatus } from 'shared/graphql/order/mutations';
import { playAlert } from 'shared/helpers/play-alert';

import { GqlAdminOrderType as Order } from 'types/graphql';

const notificationSound = [
  'https://assets.dutchie.com/order-alert-sound.m4a',
  'https://assets.dutchie.com/order-alert-sound.mp3',
  'https://assets.dutchie.com/order-alert-sound.webm',
];

type OrderNotificationProps = {
  orders: Order[] | null;
};

export default function OrderNotification(props: OrderNotificationProps): JSX.Element | false {
  const [loading, setLoading] = useState(false);

  const { UI, User, apolloClient } = useStores();
  const ordersStore = useOrdersStore();

  const { orders: couldBeOrders } = props;
  const orders = useMemo(() => couldBeOrders ?? [], [couldBeOrders]);

  const [updateOrder] = useMutation(updateOrderStatus, { client: apolloClient, context: { useBatch: true } });

  const { audioNotificationsOnNewOrdersDisabled } = User.profile;

  useEffect(() => {
    const playNotificationSound = !audioNotificationsOnNewOrdersDisabled;
    if (playNotificationSound) {
      playAlert(notificationSound);
    }
  }, [orders, audioNotificationsOnNewOrdersDisabled]);

  async function confirmOrder(order: Order): Promise<void> {
    try {
      Push.close(`order:${order._id}`);

      await updateOrder({
        variables: {
          input: {
            id: order._id,
            status: 'confirmed',
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function onConfirmOrders(): Promise<null> {
    if (orders.length < 1) {
      return null;
    }
    setLoading(true);

    let route = null;
    if (orders.length === 1) {
      const { dispensaryId } = orders[0];
      if (!dispensaryId) {
        setLoading(false);
        return null;
      }
      route = `/dispensaries/${dispensaryId}/orders/edit/${orders[0]._id}`;
      await confirmOrder(orders[0]);
    } else {
      await Promise.all(orders.map((order) => confirmOrder(order)));
    }
    UI.openOrderConfirmedNotification(route);
    setLoading(false);
    ordersStore.active.refresh();
    return null;
  }

  return (
    orders.length > 0 && (
      <OrderConfirmationNotification orders={orders} loading={loading} onClick={() => onConfirmOrders()} />
    )
  );
}
