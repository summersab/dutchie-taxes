import { Provider as MobxProvider } from 'mobx-react';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { withLDProvider, useFlags } from 'launchdarkly-react-client-sdk';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';
import { ThemeProvider as MuiProvider, StylesProvider } from '@material-ui/core/styles';

import PublicEnv from 'shared/utils/public-env';
import { appState } from 'src/state/app';
import DutchieRouter from 'src/routes';
import Ernie from 'shared/components/ernie';
import { styledComponentsTheme } from 'shared/themes';
import { VersionBanner } from 'src/components/version-banner';

import { GlobalStyles, adminMuiTheme } from './styles';

type Props = {
  currentVersion: string;
};

function Root(props: Props): JSX.Element {
  const { currentVersion } = props;
  const flags = useFlags();
  const showVersionBanner = flags['feature.please-update-banner'];

  return (
    <MobxProvider {...appState.stores()}>
      <ApolloProvider client={appState.apolloClient}>
        <StyledComponentsProvider theme={styledComponentsTheme}>
          <MuiProvider theme={adminMuiTheme}>
            <StylesProvider injectFirst>
              <React.Fragment>
                {showVersionBanner && <VersionBanner currentVersion={currentVersion} />}
                <GlobalStyles />
                <DutchieRouter />
                <Ernie />
              </React.Fragment>
            </StylesProvider>
          </MuiProvider>
        </StyledComponentsProvider>
      </ApolloProvider>
    </MobxProvider>
  );
}

const RootWithLD = withLDProvider({
  clientSideID: PublicEnv.launchDarklyClientId,
  reactOptions: {
    useCamelCaseFlagKeys: false,
  },
  user: {
    email: 'engineering@dutchie.com',
    key: 'eng-internal',
  },
})(Root);

export default RootWithLD;
