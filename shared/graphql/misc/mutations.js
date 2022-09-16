import gql from 'graphql-tag';

export const uploadSecureImage = gql`
  mutation UploadSecureImage($input: imageUploadInput!) {
    uploadSecureImage(input: $input) {
      key
    }
  }
`;

export const uploadImage = gql`
  mutation UploadImage($input: imageUploadInput!) {
    uploadImage(input: $input) {
      url
    }
  }
`;

export const createContactUs = gql`
  mutation CreateContactUs(
    $email: String
    $name: String
    $message: String
    $reason: String
    $orderId: String
    $dispensaryName: String
  ) {
    createContactUs(
      email: $email
      name: $name
      message: $message
      reason: $reason
      orderId: $orderId
      dispensaryName: $dispensaryName
    ) {
      email
      name
      message
      reason
      orderId
      dispensaryName
    }
  }
`;
