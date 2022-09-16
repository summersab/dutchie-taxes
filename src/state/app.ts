import _ from 'lodash';
import ApolloClientUtils from 'shared/utils/apollo-client-utils';
import { UIState } from 'src/state/ui';
import { FeatureFlagsState } from 'src/state/feature-flags';
import { UserState } from 'src/state/user';
import { PusherState } from 'src/state/pusher';
import { StreamState } from 'src/state/stream';
import PublicEnv from 'shared/utils/public-env';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

// rationale: legacy support
/* eslint-disable @typescript-eslint/naming-convention */

function onSessionExpired(): void {
  window.localStorage.removeItem('access-token');
  window.location.href = '/login';
}

type RootStateStores = {
  apolloClient: ApolloClient<NormalizedCacheObject, any>;
  FeatureFlags: FeatureFlagsState;
  Pusher: PusherState;
  SpecialsState?: Record<any, any>;
  Stream: StreamState;
  UI: UIState;
  User: UserState;
};

export class RootState {
  readonly FeatureFlags = new FeatureFlagsState(this);
  readonly UI = new UIState(this);
  readonly apolloClient = ApolloClientUtils.setupMainApolloClient('admin', {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    onAuthError: _.noop,
    onSessionExpired,
    onUpdateVersion: (latestVersion: string) => {
      this.UI.updateLatestVersion(latestVersion);
    },
  });
  readonly Pusher = new PusherState(this, PublicEnv.pusherKey, RootState.getToken());
  readonly Stream = new StreamState(this);
  readonly User = new UserState(this);

  private static getToken(): string | undefined {
    return window.localStorage.getItem('access-token') ?? undefined;
  }

  stores(): RootStateStores {
    return {
      apolloClient: this.apolloClient,
      FeatureFlags: this.FeatureFlags,
      Pusher: this.Pusher,
      Stream: this.Stream,
      UI: this.UI,
      User: this.User,
    };
  }
}

export const appState = new RootState();

export type RootStore = ReturnType<typeof appState['stores']>;

window._____APP_STATE_____ = appState;
