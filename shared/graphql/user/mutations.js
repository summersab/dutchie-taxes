import gql from 'graphql-tag';

export const createContact = gql`
  mutation CreateContact($email: String!, $location: String, $zip: String) {
    createContact(email: $email, location: $location, zip: $zip) {
      email
    }
  }
`;

export const updateTextSetting = gql`
  mutation UpdateTextSetting($enabled: Boolean!) {
    updateTextSetting(enabled: $enabled) {
      success
    }
  }
`;

export const updateEmailMutation = gql`
  mutation UpdateEmail($email: String!, $password: String!) {
    updateEmail(email: $email, password: $password) {
      success
    }
  }
`;

export const updateProfile = gql`
  mutation UpdateProfile($profile: consumerUserProfileInput!) {
    updateProfileV2(profile: $profile) {
      success
    }
  }
`;

export const updateConsumerUser = gql`
  mutation UpdateConsumerUser($input: consumerUserProfileInput!) {
    updateConsumerUser(user: $input) {
      success
    }
  }
`;

export const acceptTermsOfService = gql`
  mutation AcceptTermsOfService {
    acceptTermsOfService {
      success
    }
  }
`;

export const setViewedTermsOfService = gql`
  mutation SetViewedTermsOfService {
    setViewedTermsOfService {
      success
    }
  }
`;
