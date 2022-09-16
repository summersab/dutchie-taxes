import gql from 'graphql-tag';

export const getUserQuery = gql`
  query GetUserQuery($id: String!) {
    getUserQuery(id: $id) {
      _id
      email
      phone
      createdAt
      fullName
      firstName
      lastName
      textNotifications
    }
  }
`;

export const filteredUsers = gql`
  query FilteredUsers($usersFilter: usersFilterInput!) {
    filteredUsers(filter: $usersFilter) {
      _id
      email
      type
      fullName
      phone
      textNotifications
      permissions {
        orders
        menu
        customers
        promote
        analytics
        settings
        users
        allLocations
        dispensaryIds
        driver
        menuReview
        superMenuReview
        messaging
        billing
      }
      dispensaryId
      chainID
      createdAt
      createdBy
      roleAtDispensary
    }
  }
`;

export const superAdminUsers = gql`
  query SuperAdminUsers($usersFilter: usersFilterInput!) {
    filteredUsers(filter: $usersFilter) {
      userId: _id
      email
      fullName
      firstName
      lastName
      type
    }
  }
`;
// deprecated by checkUserExistence ENG-8299
export const userExistsCheck = gql`
  query UserExistsCheck($input: userIdExistsInput!) {
    userExistsCheck(input: $input) {
      exists
      _id
    }
  }
`;

export const checkUserExistence = gql`
  query CheckUserExistence($email: String!) {
    checkUserExistence(email: $email) {
      success
      message
    }
  }
`;

export const validatePasswordResetTokenQuery = gql`
  query ValidatePasswordResetTokenQuery($token: String!) {
    validatePasswordResetTokenQuery(token: $token) {
      isValid
    }
  }
`;

export const validatePasswordTokenQuery = gql`
  query ValidatePasswordTokenQuery($token: String!) {
    validatePasswordTokenQuery(token: $token) {
      isValid
    }
  }
`;

export const superAdminCustomers = gql`
  query SuperAdminCustomers(
    $customersFilter: superAdminCustomersFilter
    $customersSort: customersSortInput
    $customersPagination: customersPaginationInput
  ) {
    superAdminCustomers(filter: $customersFilter, sort: $customersSort, pagination: $customersPagination) {
      meta {
        totalCount
      }
      customers {
        _id
        email
        createdAt
        ordersTotal
        numOrders
        fullName
        firstName
        lastName
        phone
      }
    }
  }
`;
