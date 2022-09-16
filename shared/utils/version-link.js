import { ApolloLink } from 'apollo-link';

export function VersionLink(onUpdateVersion) {
  return new ApolloLink((operation, forward) =>
    // eslint-disable-next-line lodash/prefer-lodash-method
    forward(operation).map((data) => {
      const dutchieVersion = operation.getContext().response.headers.get('x-dutchie-version');

      if (dutchieVersion) {
        onUpdateVersion(dutchieVersion);
      }

      return data;
    })
  );
}
