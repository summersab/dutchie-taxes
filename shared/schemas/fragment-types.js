export default {
  __schema: {
    types: [
      {
        name: 'BaseOrderingSettings',
        kind: 'INTERFACE',
        possibleTypes: [
          {
            name: 'InStorePickupOrderingSettings',
            description: '',
          },
          {
            name: 'CurbsidePickupOrderingSettings',
            description: '',
          },
          {
            name: 'DriveThruPickupOrderingSettings',
            description: '',
          },
          {
            name: 'DeliveryOrderingSettings',
            description: '',
          },
        ],
      },
      {
        name: 'PaymentsCheckoutCredentials',
        kind: 'UNION',
        possibleTypes: [
          {
            name: 'ChaseHostedProfileCredentials',
            description: '',
          },
          {
            name: 'MonerisHTProfileCredentials',
            description: '',
          },
        ],
      },
    ],
  },
};
