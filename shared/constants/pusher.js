export const PusherConfig = {
  Dispensary: {
    CHANNEL: (dispensaryId) => `private-curbside-arrivals-user-${dispensaryId}`,
    Events: {
      CURBSIDE_ARRIVAL_ARRIVED: 'curbside-arrival-arrived',
      CURBSIDE_ARRIVAL_CLEARED_ALL: 'curbside-arrival-cleared-all',
      CURBSIDE_ARRIVAL_CLEARED: 'curbside-arrival-cleared',
      CURBSIDE_ARRIVAL_UPDATED: 'curbside-arrival-updated',
    },
  },
  DispensaryOrders: {
    CHANNEL: ({ id }) => `dispensary-${id}-orders`,
    Events: {
      ORDER_UPDATED: 'order-updated',
    },
  },
  Order: {
    CHANNEL: (orderId) => `order-${orderId}`,
    Events: {
      ORDER_UPDATED: 'order-updated',
    },
  },
  PrivateOrder: {
    CHANNEL: (orderId) => `private-order-${orderId}`,
    Events: {
      ORDER_PRINTED: 'client-order-printed',
    },
  },
  PersistentRequests: {
    CHANNEL: ({ id }) => `persistent-requests-session-${id}`,
    Events: {
      RESOLVED: 'persistent-request-resolved',
    },
  },
  Terminal: {
    CHANNEL: ({ deviceId }) => `private-terminal-${deviceId}`,
    Events: {
      PRINT: 'print-from-commands',
    },
  },
  Consumer: {
    CHANNEL: 'consumer-general',
    Events: {
      ReloadApp: 'reload-app',
    },
  },
  Admin: {
    CHANNEL: 'admin-general',
    Events: {
      ReloadApp: 'reload-app',
    },
  },
  ContentCleanup: {
    CHANNEL: 'presence-content-cleanup-tool',
    Events: {
      SUBSCRIPTION_ERROR: 'pusher:subscription_error',
      SUBSCRIPTION_SUCCEEDED: 'pusher:subscription_succeeded',
    },
  },
  Buckets: {
    CHANNEL: 'buckets',
    Events: {
      CREATED: 'created',
      DESTROYED: 'destroyed',
      UPDATED: 'updated',
    },
  },
  DeviceConnections: {
    Events: {
      sendConnectionToken: 'SEND_CONNECTION_TOKEN',
      connectionFinalized: 'CONNECTION_FINALIZED',
    },
  },
};
