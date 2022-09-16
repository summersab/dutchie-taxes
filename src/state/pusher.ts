import _ from 'lodash';
import { action, computed, observable, reaction, transaction } from 'mobx';
import Pusher, { Channel } from 'pusher-js';
import { RootState } from 'src/state/app';
import PublicEnv from 'shared/utils/public-env';

type Registration = {
  channel: Channel;
  channelName: string;
  event: string;
  callback: () => unknown;
};

type VoidCallbackFn = () => void;
export class PusherState {
  @observable token: string | null | undefined = null;
  @observable registrations: Registration[] = [];
  @observable private _socket: Pusher | null = null;

  constructor(private readonly rootStore: RootState, private readonly pusherKey: string, token?: string) {
    this.token = token;

    reaction(
      () => this.rootStore.FeatureFlags.flags,
      () => {
        this.rebindRegistrations();
      }
    );
  }

  @action
  register = (channelName: string, event: string, callback: (payload?: unknown) => unknown): VoidCallbackFn => {
    PusherState.debug(`[PUSHER] Register: channel ${channelName}, event ${event}`);
    const channel = this.bindCallbackToChannel(channelName, event, callback);
    const registration = {
      channel,
      channelName,
      event,
      callback,
    };

    this.registrations.push(registration);

    return (): void => {
      this.unregister(channelName, event, callback);
    };
  };

  @action unregister = (channelName: string, event: string, callback: (payload?: unknown) => unknown): void => {
    PusherState.debug(`[PUSHER] Unregister: channel ${channelName}, event ${event}`);
    const [toUnregister, newRegistrations] = _.partition(this.registrations, { channelName, event, callback });

    _.forEach(toUnregister, (registration) => {
      PusherState.unbindCallbackFromChannel(
        registration.channel,
        registration.channelName,
        registration.event,
        registration.callback
      );
    });

    this.registrations = newRegistrations;
  };

  @action resetToken = (token?: string | null): void => {
    PusherState.debug(`[PUSHER] Reset auth token`);
    transaction(() => {
      this.token = token;
      this.rebindRegistrations();
    });
  };

  @action rebindRegistrations = (): void => {
    transaction(() => {
      this._socket?.disconnect();
      this._socket = this.createSocket(this.token ?? undefined);

      this.registrations = _.map(this.registrations, (registration) => {
        const { channel, channelName, event, callback } = registration;
        PusherState.unbindCallbackFromChannel(channel, channelName, event, callback);

        const newChannel = this.bindCallbackToChannel(channelName, event, callback);
        registration.channel = newChannel;
        return registration;
      });
    });
  };

  @computed
  get socket(): Pusher {
    if (this._socket) {
      return this._socket;
    }

    if (!this.token) {
      throw new Error('Attempted to get socket() without token');
    }

    this._socket = this.createSocket(this.token);
    return this._socket;
  }

  private createSocket(token?: string): Pusher {
    PusherState.debug(`[PUSHER] Create new socket`);

    return new Pusher(this.pusherKey, {
      auth: { headers: { 'user-token': token } },
      authEndpoint: '/api/v2/pusher/authenticate_user',
      cluster: 'us3',
      forceTLS: true,
    });
  }

  private bindCallbackToChannel(channelName: string, event: string, callback: (payload: unknown) => unknown): Channel {
    PusherState.debug(`[PUSHER] Bind callback to channel ${channelName}`);
    const channel = this.socket.subscribe(channelName);
    channel.bind(event, callback);
    return channel;
  }

  private static debug(message: string): void {
    if (PublicEnv.appEnv !== 'development') {
      console.debug(message);
    }
  }

  private static unbindCallbackFromChannel(
    channel: Channel,
    channelName: string,
    event: string,
    callback: (payload: unknown) => unknown
  ): void {
    PusherState.debug(`[PUSHER] Unbind callback from channel ${channelName}`);
    channel.unbind(event, callback);
    channel.unsubscribe();
  }
}
