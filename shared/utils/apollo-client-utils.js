import ApolloClient from 'apollo-client';
import fetchPonyfill from 'fetch-ponyfill';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import _ from 'lodash';

import PublicEnv from 'shared/utils/public-env';
import possibleTypes from 'shared/schemas/fragment-types';
import { VersionLink } from './version-link';

const { fetch } = fetchPonyfill({});

export const EXTENSION_ERRORS = {
  AUTHERROR: ['AUTHENTICATION_ERROR', 'UNAUTHENTICATED'],
  FORBIDDEN: ['FORBIDDEN'],
  SESSIONEXPIRED: ['SESSION_INVALID'],
};

const errorLinkFactory = ({ onSessionExpired, onAuthError } = {}) =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map((error) => {
        if (EXTENSION_ERRORS.FORBIDDEN.includes(error.extensions?.code)) {
          // console.error('Forbidden');
          onAuthError?.call(this, error);
        }

        if (EXTENSION_ERRORS.AUTHERROR.includes(error.extensions?.code)) {
          // console.error('Auth error');
          onSessionExpired?.call(this, error);
        }

        if (EXTENSION_ERRORS.SESSIONEXPIRED.includes(error.extensions?.code)) {
          // console.error('Session expired');
          onSessionExpired?.call(this, error);
        }
      });
    }
    if (networkError) {
      console.error(`Network Error: ${networkError.message}`);
    }
  });

const setAuthorization = (operation, forward) => {
  const headers = {};
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('access-token');
    headers.url = window.location.href;

    if (token) {
      headers.authorization = token;
    }
  }

  operation.setContext(() => {
    return {
      headers,
    };
  });

  return forward(operation);
};

const appMapping = {
  admin: 'Admin',
  brands: 'Brands',
};

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: possibleTypes,
});

function setupMainApolloClient(appKey, { onSessionExpired, onAuthError, onUpdateVersion = _.noop } = {}) {
  const appName = _.get(appMapping, appKey, '(NO APP SET)');
  const versionLinkInstance = VersionLink(onUpdateVersion);
  const errorLink = errorLinkFactory({ onSessionExpired, onAuthError });
  const httpLink = new HttpLink({
    fetch,
    credentials: 'include',
    uri: '/graphql',
    useGETForHashedQueries: true,
  });
  const batchHttpLink = new BatchHttpLink({
    fetch,
    uri: '/graphql',
    headers: { batch: true },
  });
  return new ApolloClient({
    name: `Dutchie ${appName} Express GraphQL (${PublicEnv.appEnv})`,
    version: PublicEnv.herokuSlugCommit,
    cache: new InMemoryCache({ fragmentMatcher }),
    // eslint-disable-next-line lodash/prefer-lodash-method
    link: ApolloLink.split(
      (operation) => operation.getContext().useBatch,
      ApolloLink.from([versionLinkInstance, setAuthorization, errorLink, batchHttpLink]),
      ApolloLink.from([
        versionLinkInstance,
        setAuthorization,
        errorLink,
        createPersistedQueryLink({ useGETForHashedQueries: true }),
        httpLink,
      ])
    ),
  });
}

export default { setupMainApolloClient };
