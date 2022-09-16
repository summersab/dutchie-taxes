import gql from 'graphql-tag';

export const emailIntegrationCredentials = gql`
  mutation emailIntegrationCredentials($input: integrationCredsInput!) {
    emailIntegrationCredentials(input: $input) {
      success
    }
  }
`;

export const dispensaryUpdate = gql`
  mutation DispensaryUpdate($input: dispensaryUpdateInput!) {
    dispensaryUpdate(input: $input) {
      success
    }
  }
`;

export const dispensaryUpdateOptionsSettings = gql`
  mutation DispensaryUpdateOptionsSettings($input: dispensaryUpdateOptionsSettingsInput!) {
    dispensaryUpdateOptionsSettings(input: $input) {
      success
      message
    }
  }
`;

export const dispensaryUpdateTaxConfiguration = gql`
  mutation DispensaryUpdateTaxConfiguration($input: dispensaryUpdateInput!) {
    dispensaryUpdateTaxConfiguration(input: $input) {
      success
    }
  }
`;

export const dispensaryRemoveFromChain = gql`
  mutation DispensaryRemoveFromChain($input: dispensaryRemoveFromChainInput!) {
    dispensaryRemoveFromChain(input: $input) {
      success
    }
  }
`;
