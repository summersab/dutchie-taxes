import { RootState } from 'src/state/app';
import { StreamChat } from 'stream-chat';
import gql from 'graphql-tag';
import isFinite from 'lodash/isFinite';
import { action, observable } from 'mobx';
import PublicEnv from 'shared/utils/public-env';

const GENERATE_DISPENSARY_USER_STREAM_TOKEN = gql`
  mutation GenerateDispensaryUserStreamToken($input: dispensaryUserStreamTokenInput!) {
    generateDispensaryUserStreamToken(input: $input) {
      token
    }
  }
`;

export class StreamState {
  @observable client = new StreamChat(PublicEnv.streamKey);
  @observable unreadCount = 0;
  @observable loading = true;

  private listener: { unsubscribe: () => void } | null = null;

  constructor(private readonly rootStore: RootState) {}

  @action setup = async (): Promise<void> => {
    const {
      apolloClient,
      UI: { dispensary },
      User,
    } = this.rootStore;
    this.loading = true;

    if (this.client.user?.id === dispensary.id) {
      this.loading = false;
      return;
    }

    await this.cleanup();

    if (dispensary.id && User.hasMessagingPermissions) {
      const streamTokenForDispensary = (User.profile.streamTokens ?? []).find(
        (tokenObj) => tokenObj?.dispensaryId === dispensary.id
      );

      if (streamTokenForDispensary) {
        await this.client.setUser({ id: dispensary.id }, streamTokenForDispensary.token);
      } else {
        try {
          const { data } = await apolloClient.mutate({
            mutation: GENERATE_DISPENSARY_USER_STREAM_TOKEN,
            variables: { input: { dispensaryId: dispensary.id, isSuperAdmin: this.rootStore.User.isSuperAdmin } },
          });

          await this.client.setUser({ id: dispensary.id }, data.generateDispensaryUserStreamToken.token);
        } catch (error) {
          console.error('Error generating Stream token', error);
        }
      }

      this.loading = false;

      this.listener = this.client.on(({ unread_channels: unreadChannels }) => {
        if (isFinite(unreadChannels)) {
          this.unreadCount = unreadChannels;
        }
      });
    }
  };

  @action cleanup = async (): Promise<void> => {
    if (this.listener) {
      this.listener.unsubscribe();
    }
    await this.client.disconnect();
  };
}
