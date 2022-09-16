import gql from 'graphql-tag';

export const filteredIntegrations = gql`
  query FilteredIntegrations($dispensaryId: String!) {
    filteredIntegrations(dispensaryId: $dispensaryId) {
      _id
      adapter
      credentials
      dispensaryId
      failedSyncs
      flags
      integrationType
      isRunning
      lastImportedAtISO
      lastSyncAt
      lastSyncAtISO
      live
      meta {
        custom_types
        shopifyFields
      }
      pending
      thresholds
      kioskThresholds
      types
      weights
      integrationCategory
      categoryMapping {
        foreignCategory
        localCategory
        localSubcategory
      }
      fieldMapping {
        foreignField
        localField
      }
      crmPropertyMapping {
        foreignProperty
        localProperty
      }
      syncFailureMessage
      syncFailureType
    }
  }
`;
