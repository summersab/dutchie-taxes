import _ from 'lodash';
import { observable, computed, action, transaction } from 'mobx';

import { isSEOBot, removeTypename } from 'shared/helpers/utils';
import { configureRollbar, configureLogRocket, segmentIdentifyAndGroup } from 'shared/helpers/tools';
import { isAdminAccessible, isChainAdmin, isConsumerUser, isSuperAdmin, isDispensaryUser } from 'shared/helpers/users';

import updateAdminUser from 'shared/graphql/user/mutations/update-admin-user.gql';
import { validatePasswordResetTokenQuery, validatePasswordTokenQuery } from 'shared/graphql/user/queries';
import PublicEnv from 'shared/utils/public-env';

import resetPasswordV2 from 'shared/graphql/password/mutations/reset-password-v2.gql';
import sendPasswordResetEmailV2 from 'shared/graphql/password/mutations/send-password-reset-email-v2.gql';
import setPasswordV2 from 'shared/graphql/password/mutations/set-passwordV2.gql';
import updatePasswordV2 from 'shared/graphql/password/mutations/update-password-v2.gql';
import logoutMutation from 'shared/graphql/user/mutations/logout.gql';
import loginAdmin from 'shared/graphql/user/mutations/login-admin.gql';
import loginAdminViaToken from 'shared/graphql/user/mutations/login-admin-via-token.gql';
import { EmptyObject, WhenNotVoid } from 'shared/utils/type-utils';
import meAdmin from 'src/state/me-admin.gql';
import {
  GqlLoginAdminMutation,
  GqlLoginAdminMutationVariables,
  GqlLoginAdminViaTokenMutation,
  GqlLoginAdminViaTokenMutationVariables,
  GqlLogoutMutation,
  GqlLogoutMutationVariables,
  GqlMeAdminQuery,
  GqlMeAdminQueryVariables,
  GqlMutationUpdateUserArgs,
  GqlResetPasswordV2Mutation,
  GqlResetPasswordV2MutationVariables,
  GqlSendPasswordResetEmailV2Mutation,
  GqlSendPasswordResetEmailV2MutationVariables,
  GqlSetPasswordV2Mutation,
  GqlSetPasswordV2MutationVariables,
  GqlUpdatePasswordV2Mutation,
  GqlUpdatePasswordV2MutationVariables,
} from 'types/graphql';
import { RootState } from './app';

type User = WhenNotVoid<GqlMeAdminQuery['meAdmin']>;
type Profile = WhenNotVoid<User['profile']>;
type LoginResponse =
  | {
      error: any;
      success: boolean;
    }
  | {
      success: boolean;
      error?: undefined;
    };

/* eslint-disable @typescript-eslint/member-ordering */

export class UserState {
  @observable _user: EmptyObject | User = {};
  @observable chainIds: Array<string | null> = [];
  @observable email: string | null | undefined;
  @observable enterpriseId: string | null | undefined;
  @observable exists = false;
  @observable id: string | null | undefined;
  @observable initialUserFetchFinished = false;
  @observable profile: EmptyObject | Profile = {};

  constructor(private readonly rootStore: RootState) {
    void this.fetchUser();
  }

  fetchUser = async (): Promise<void> => {
    let user: User | undefined;

    if (this.getHasToken()) {
      try {
        const response = await this.rootStore.apolloClient.query<GqlMeAdminQuery, GqlMeAdminQueryVariables>({
          fetchPolicy: 'no-cache',
          query: meAdmin,
        });

        user = removeTypename(response.data.meAdmin);
      } catch (e) {
        if (e.networkError) {
          // If network error, don't reset whole session.
          console.warn('network error');
          return;
        }

        console.warn('Error Fetching User', e);
      }
    }

    await this.handleSetupUser(user);
  };

  handleSetupUser = async (user?: User): Promise<void> => {
    const shouldBootServices = !isSEOBot() && PublicEnv.appEnv === 'production';

    if (user && !isAdminAccessible(user)) {
      await this.logout();
      window.location.href = `${PublicEnv.consumerUrl}/login`;
      return;
    }

    configureRollbar(user);
    segmentIdentifyAndGroup(user);

    if (shouldBootServices) {
      try {
        configureLogRocket(user);
      } catch (e) {
        console.error(e);
      }
    }

    if (user) {
      await transaction(async () => {
        this._user = user;
        this.chainIds = user.chainDispensaryIds ?? [];
        this.email = user.emails[0]?.address;
        this.enterpriseId = user.enterpriseId;
        this.exists = true;
        this.id = user._id;
        this.initialUserFetchFinished = true;
        this.profile = user.profile;
      });
    } else {
      transaction(() => {
        this._user = {};
        this.chainIds = [];
        this.email = null;
        this.enterpriseId = '';
        this.exists = false;
        this.id = null;
        this.initialUserFetchFinished = true;
        this.profile = {};
      });
    }
  };

  getHasToken = (): boolean => !_.isEmpty(window.localStorage.getItem('access-token'));

  @action updateUser = async ({
    audioNotificationsOnNewArrivalsDisabled,
    audioNotificationsOnNewOrdersDisabled,
    browserNotification,
    desktopNotification,
    email,
    emailNotifications,
    fullName,
    isWeeklyReportEnabled,
    phone,
    roleAtDispensary,
    textNotifications,
  }: GqlMutationUpdateUserArgs['user']): Promise<void> => {
    this.email = email;
    this.profile = {
      ...this.profile,
      audioNotificationsOnNewArrivalsDisabled,
      audioNotificationsOnNewOrdersDisabled,
      browserNotification,
      desktopNotification,
      emailNotifications,
      fullName,
      isWeeklyReportEnabled,
      phone,
      roleAtDispensary,
      textNotifications,
    };

    if (this.profile.permissions && this.profile.permissions.dispensaryIds === undefined) {
      const activeDispensary = this.rootStore.UI.dispensary.id;
      if (this.profile.dispensaryId) {
        this.profile.permissions.dispensaryIds = [this.profile.dispensaryId];
      } else if (activeDispensary) {
        this.profile.permissions.dispensaryIds = [activeDispensary];
      }
    }

    // TODO: add type information for mutate
    const response = await this.rootStore.apolloClient.mutate({
      mutation: updateAdminUser,
      variables: {
        input: removeTypename({
          _id: this.id,
          audioNotificationsOnNewArrivalsDisabled,
          audioNotificationsOnNewOrdersDisabled,
          browserNotification,
          desktopNotification,
          email,
          emailNotifications,
          fullName,
          isWeeklyReportEnabled,
          permissions: _.omit(this.profile.permissions, 'tasks', 'techSupportFeatures'),
          phone,
          roleAtDispensary,
          textNotifications,
        }),
      },
    });

    return response.data.updateUser;
  };

  logout = async (): Promise<void> => {
    const hasToken = this.getHasToken();

    if (hasToken) {
      try {
        await this.rootStore.apolloClient.mutate<GqlLogoutMutation, GqlLogoutMutationVariables>({
          mutation: logoutMutation,
        });
      } catch (error) {
        console.error(error);
      }
    }

    this.handleSetupAuthorizationToken();
    await this.handleSetupUser();
  };

  handleSetupAuthorizationToken = (accessToken?: string | null): void => {
    if (!accessToken) {
      window.localStorage.removeItem('access-token');
    } else {
      window.localStorage.setItem('access-token', accessToken);
    }

    const token = window.localStorage.getItem('access-token');
    this.rootStore.Pusher.resetToken(token);
  };

  @action login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await this.rootStore.apolloClient.mutate<GqlLoginAdminMutation, GqlLoginAdminMutationVariables>({
        mutation: loginAdmin,
        variables: {
          email,
          password,
        },
      });

      const accessToken = response.data?.loginAdmin?.accessToken;

      this.handleSetupAuthorizationToken(accessToken);
      await this.fetchUser();

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error, success: false };
    }
  };

  @action loginViaToken = async (transferToken: string): Promise<LoginResponse> => {
    try {
      const response = await this.rootStore.apolloClient.mutate<
        GqlLoginAdminViaTokenMutation,
        GqlLoginAdminViaTokenMutationVariables
      >({
        mutation: loginAdminViaToken,
        variables: {
          transferToken,
        } as GqlLoginAdminViaTokenMutationVariables,
      });

      const accessToken = response.data?.loginAdminViaToken?.accessToken;

      this.handleSetupAuthorizationToken(accessToken);
      await this.fetchUser();

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error, success: false };
    }
  };

  @computed get user(): EmptyObject | User {
    return this._user;
  }

  @computed get loggedIn(): boolean {
    return !_.isEmpty(this._user);
  }

  @computed get isSuperAdmin(): boolean {
    return isSuperAdmin({ profile: this.profile });
  }

  @computed get isChainAdmin(): boolean {
    return isChainAdmin({ profile: this.profile });
  }

  @computed get isEnterpriseAdmin(): boolean {
    return this.profile.permissions?.enterpriseAdmin ?? false;
  }

  @computed get isOutsourceCleaner(): boolean {
    return isSuperAdmin({ profile: this.profile }) && !!this.profile.permissions?.menuReview;
  }

  @computed get hasTasksPermissions(): boolean {
    return isSuperAdmin({ profile: this.profile }) && !!this.profile.permissions?.tasks;
  }

  @computed get hasOrdersPermissions(): boolean {
    return (
      isSuperAdmin({ profile: this.profile }) ||
      (isDispensaryUser({ profile: this.profile }) && !!this.profile.permissions?.orders)
    );
  }

  @computed get hasMessagingPermissions(): boolean {
    return (
      isSuperAdmin({ profile: this.profile }) ||
      (isDispensaryUser({ profile: this.profile }) && !!this.profile.permissions?.messaging)
    );
  }

  @computed get isSuperOutsourceCleaner(): boolean {
    return isSuperAdmin({ profile: this.profile }) && !!this.profile.permissions?.superMenuReview;
  }

  @computed get isDispensaryUser(): boolean {
    return isDispensaryUser({ profile: this.profile });
  }

  @computed get isConsumerUser(): boolean {
    return isConsumerUser({ profile: this.profile });
  }

  @computed get fullName(): string {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,@typescript-eslint/prefer-nullish-coalescing
    return this.profile.fullName || `${this.profile.firstName} ${this.profile.lastName}`;
  }

  @action updatePasswordWhenLoggedIn = async (oldPassword: string, newPassword: string): Promise<void> => {
    const response = await this.rootStore.apolloClient.mutate<
      GqlUpdatePasswordV2Mutation,
      GqlUpdatePasswordV2MutationVariables
    >({
      mutation: updatePasswordV2,
      variables: {
        oldPassword,
        newPassword,
      },
    });

    this.handleSetupAuthorizationToken(response.data?.updatePasswordV2?.accessToken);
  };

  @action sendPasswordResetEmail = async (
    email: string
  ): Promise<{
    success: boolean;
    data?: GqlSendPasswordResetEmailV2Mutation | null;
    err?: any;
  }> => {
    try {
      const response = await this.rootStore.apolloClient.mutate<
        GqlSendPasswordResetEmailV2Mutation,
        GqlSendPasswordResetEmailV2MutationVariables
      >({
        mutation: sendPasswordResetEmailV2,
        variables: { email },
      });
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, err };
    }
  };

  @action validateResetToken = async (token: string): Promise<void> => {
    // TODO: add type information for query
    const response = await this.rootStore.apolloClient.query({
      query: validatePasswordResetTokenQuery,
      variables: {
        token,
      },
    });

    return response.data.validatePasswordResetTokenQuery.isValid;
  };

  @action validatePasswordToken = async (token: string): Promise<void> => {
    // TODO: add type information for query
    const response = await this.rootStore.apolloClient.query({
      query: validatePasswordTokenQuery,
      variables: {
        token,
      },
    });

    return response.data.validatePasswordTokenQuery.isValid;
  };

  @action setPassword = async (
    token: string,
    password: string
  ): Promise<{
    success: boolean;
    data?: GqlSetPasswordV2Mutation | null;
    err?: any;
  }> => {
    try {
      const result = await this.rootStore.apolloClient.mutate<
        GqlSetPasswordV2Mutation,
        GqlSetPasswordV2MutationVariables
      >({
        mutation: setPasswordV2,
        variables: { input: { token, password } },
      });
      return { success: true, data: result.data };
    } catch (err) {
      return { success: false, err };
    }
  };

  @action resetPassword = async (
    token: string,
    password: string
  ): Promise<{
    success: boolean;
    data?: GqlResetPasswordV2Mutation | null;
    err?: any;
  }> => {
    try {
      const response = await this.rootStore.apolloClient.mutate<
        GqlResetPasswordV2Mutation,
        GqlResetPasswordV2MutationVariables
      >({
        mutation: resetPasswordV2,
        variables: { input: { token, password } },
      });
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, err };
    }
  };
}
