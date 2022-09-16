import _ from 'lodash';
import { observable, computed, action } from 'mobx';
import { useHistory } from 'react-router-dom';

import { adminDispensaries, chainDispensaryIds } from 'shared/graphql/dispensary/queries';
import { dispensaryUpdate, dispensaryRemoveFromChain } from 'shared/graphql/dispensary/mutations';
import { removeTypename } from 'shared/helpers/utils';
import addSubscriptionToChain from 'shared/graphql/dispensary-billing/mutations/add-subscription-to-chain.gql';
// eslint-disable-next-line max-len
import removeSubscriptionFromChain from 'shared/graphql/dispensary-billing/mutations/remove-subscription-from-chain.gql';
import getChainBillingInfo from 'shared/graphql/dispensary-billing/queries/get-chain-billing-info.gql';
import { EmptyObject, ExcludeTypename } from 'shared/utils/type-utils';
import PublicEnv from 'shared/utils/public-env';
import { RootState } from 'src/state/app';
import {
  GqlDispensaries,
  GqlOrderTypeConfig,
  GqlOrderTypesConfig,
  GqlPaymentTypesConfig,
  GqlInStorePickupOrderingSettings,
  GqlCurbsidePickupOrderingSettings,
  GqlDriveThruPickupOrderingSettings,
  GqlDeliveryOrderingSettings,
  GqlKioskOrderingSettings,
} from 'types/graphql';

type History = ReturnType<typeof useHistory>;

// TODO(ts-refactor): extract to enum when at full TS coverage
export type ErnieQueueType = 'danger' | 'error' | 'info' | 'success';
type ErnieQueueItem = {
  msg: string;
  type: ErnieQueueType;
  timeout: number;
};

// Since we've added two non-order-type properties to OrderTypesConfig,
// we need to prevent them from being used as order type keys
type OrderTypeKeys = ExcludeTypename<Omit<GqlOrderTypesConfig, 'offerAnyPickupService' | 'offerDeliveryService'>>;

const MIN_ERNIE_TIMEOUT_MS = 1600;

type ModalTypes =
  | 'emailConfirmModal'
  | 'hoursModal'
  | 'hoursPublishModal'
  | 'paymentFeesModal'
  | 'publishModal'
  | 'showIntroModal';

export class UIState {
  @observable latestVersion: string | null = null;

  @observable dispensary: EmptyObject | GqlDispensaries = {};
  @observable unpublishedDispoChanges = false;
  @observable routeAfterPublishedCheck = '';
  @observable amplitudeLoaded = false;

  @observable publishModal = false;
  @observable emailConfirmModal = false;
  @observable paymentFeesModal = false;
  @observable hoursModal = false;
  @observable hoursPublishModal = false;
  @observable customerModalId = '';
  @observable dispensaryModalId: string | null = null;
  @observable showIntroModal = false;

  @observable ernieQueue: ErnieQueueItem[] = [];
  @observable chainDispensaryIds: string[] = [];
  @observable emailSubscriptionObj: { open: false } | { open: true; confirmed: boolean; resolve: () => unknown } = {
    open: false,
  };
  @observable orderConfirmedObj: { open: false } | { open: true; route: string | null } = { open: false };
  @observable notifiedArrivalsIds: string[] = [];
  @observable billingActive = false;

  // user-flow
  @observable showSignup = false;
  @observable showChangePasswordWhileLoggedIn = false;
  @observable showRequestPasswordResetEmail = false;

  constructor(private readonly rootStore: RootState) {}

  /**
   * TODO(ts-refactor): figure out a better pattern for this
   * @deprecated
   */
  @action toggleModal = (name: ModalTypes): void => {
    // HACK - this is a bad smell
    this[name] = !this[name] as never;
  };

  @action showErnie = (
    msg = 'Something went wrong. Please contact support.',
    type: ErnieQueueType = 'danger',
    timeout?: number
  ): void => {
    const numWords = _.words(msg).length;

    // explanation: (60 sec / 200 words) * numWords * (1000 millisecs / 1 sec) + 0.25 sec
    // assuming 200 wpm and reaction time of 0.25 sec
    const time = Math.min((60 / 200) * numWords * 1000 + 250, MIN_ERNIE_TIMEOUT_MS);

    this.ernieQueue.push({ msg, type, timeout: timeout ?? time });
  };

  @action openEmailSubscriptionConfirmationModal = ({ confirmed }: { confirmed: boolean }): Promise<void> =>
    new Promise<void>((resolve) => (this.emailSubscriptionObj = { open: true, confirmed, resolve }));

  @action openOrderConfirmedNotification = (route: string | null): void => {
    this.orderConfirmedObj = { open: true, route };

    setTimeout(() => {
      this.orderConfirmedObj = { open: false };
    }, 5 * 1000);
  };

  @action updateLatestVersion = (latestVersion: string): void => {
    this.latestVersion = latestVersion;
  };

  @computed get menuIsIntegrated(): boolean {
    return (this.dispensary.menuIntegration ?? []).length > 0;
  }

  @computed get hasFleetManagementIntegration(): boolean {
    const maybeFleetManagementIntegration = this.dispensary.fleetManagementIntegration ?? [];
    return maybeFleetManagementIntegration[0]?.live ?? false;
  }

  @computed get fleetManagementStatus(): string | null {
    const maybeFleetManagementIntegration = this.dispensary.fleetManagementIntegration ?? [];
    const maybeFlags = maybeFleetManagementIntegration[0]?.flags;
    return maybeFlags?.fleetManagementStatus ?? maybeFlags?.onfleetStatus ?? null;
  }

  @action setDispensary = (dispensary: GqlDispensaries): void => {
    if (!this.unpublishedDispoChanges) {
      this.dispensary = dispensary;

      if (!this.rootStore.User.isSuperAdmin && PublicEnv.appEnv !== 'development') {
        void this.rootStore.Stream.setup();
      }
    }
  };

  @action unsetDispensary = (): void => {
    this.dispensary = {};
    this.unpublishedDispoChanges = false;
    this.routeAfterPublishedCheck = '';
    this.publishModal = false;
    this.hoursPublishModal = false;

    // promise is ignored (possibly unintentionally, was not clear at time of refactor)
    void this.rootStore.Stream.cleanup();
  };

  @action updateDispensaryProperty = (path: string, value: any): void => {
    _.set(this.dispensary, path, value);
  };

  @action updateOrderTypesConfig = (orderTypeKey: OrderTypeKeys, enable: boolean): void => {
    const { orderTypesConfig } = this.dispensary;
    const orderTypeConfig:
      | GqlCurbsidePickupOrderingSettings
      | GqlDeliveryOrderingSettings
      | GqlDriveThruPickupOrderingSettings
      | GqlInStorePickupOrderingSettings
      | GqlKioskOrderingSettings
      | GqlOrderTypeConfig
      | null
      | undefined = orderTypesConfig ? orderTypesConfig[orderTypeKey] : null;

    if (!orderTypesConfig || !orderTypeConfig) {
      console.warn(`Could not find config for orderType "${orderTypeKey as string}"`);
      return;
    }

    if (enable) {
      // if order type already has at least one payment type enabled (i.e., it's been configured in the past), then
      // we don't need to initialize payment types
      const orderTypeHasExistingSettings = _.some(removeTypename(orderTypeConfig.paymentTypes));
      const dispensaryAcceptsCash = this.dispensary.paymentTypesAccepted?.cash;

      // handle payment type config init for a newly-enabled order type
      if (!orderTypeHasExistingSettings && dispensaryAcceptsCash) {
        // initialize with cash enabled
        if (orderTypeConfig.paymentTypes) {
          orderTypeConfig.paymentTypes.cash = true;
        } else {
          console.warn(`paymentTypes not present on cashless orderTypeConfig`);
        }
      } else if (!orderTypeHasExistingSettings) {
        // for dispo that does not already offer cash for any other order type, copy config from an enabled order type,
        // or fall back to debit in rare case no other order types are enabled
        const templateOrderType: GqlOrderTypeConfig | null | undefined = Object.values(
          orderTypesConfig
        ).find<GqlOrderTypeConfig>(
          // This is complex because OrderTypesConfig includes __typename
          (config): config is GqlOrderTypeConfig => typeof config === 'object' && !!config?.enabled
        );
        _.assign(orderTypeConfig.paymentTypes, templateOrderType?.paymentTypes ?? { debit: true });
      }
      orderTypeConfig.enabled = true;
    } else {
      orderTypeConfig.enabled = false;
    }
  };

  @action updatePaymentTypes = (
    orderTypeKey: OrderTypeKeys,
    paymentTypeKey: ExcludeTypename<GqlPaymentTypesConfig>,
    enable: boolean
  ): void => {
    const { orderTypesConfig, paymentTypesAccepted } = this.dispensary;
    const orderTypeConfig = orderTypesConfig ? orderTypesConfig[orderTypeKey] : null;

    if (!orderTypeConfig || !orderTypesConfig || !orderTypeConfig.paymentTypes || !paymentTypesAccepted) {
      return;
    }

    orderTypeConfig.paymentTypes[paymentTypeKey] = enable;
    paymentTypesAccepted[paymentTypeKey] = _.some(
      ['pickup', 'curbsidePickup', 'driveThruPickup', 'delivery', 'kiosk'],
      (key: OrderTypeKeys) => orderTypesConfig[key]?.paymentTypes?.[paymentTypeKey]
    );
  };

  @action saveDispensaryInfo = async (): Promise<boolean> => {
    const profileFields = [
      'acceptsTips',
      'address',
      'ageVerificationBannerColor',
      'ageVerificationBannerHtml',
      'bannerImage',
      'callConfirmation',
      'categoryLimits',
      'categoryLimitsEnabled',
      'categoryPhotos',
      'chain',
      'colorSettings',
      'complianceCode',
      'customCategoryPhotos',
      'customDomainSettings',
      'description',
      'durationEstimateOverrides',
      'email',
      'emailConfirmation',
      'embedBackUrl',
      'embeddedLogoImage',
      'embeddedMenuUrl',
      'embedSettings',
      'featureFlags',
      'listImage',
      'logoImage',
      'medicalDispensary',
      'medSubjectToExciseTax',
      'menuBannerColor',
      'menuBannerHtml',
      'menuOrder',
      'menuUrl',
      'menuWeights',
      'messagingSettings',
      'mixAndMatchPricingWeights',
      'name',
      'ordersConfig',
      'paymentFees',
      'phone',
      'phoneTree',
      'plusSettings',
      'printedMenuSettings',
      'recDispensary',
      'removeMedicalCardFieldsAtCheckout',
      'requirePhotoIdForDelivery',
      'requirePhotoIdForPickup',
      'requiresDriversLicense',
      'requiresDriversLicenseForPickup',
      'SpecialLogoImage',
      'storeSettings',
      'taxConfig',
      'timezone',
    ];

    const profile = removeTypename({
      ..._.pick(this.dispensary, profileFields),
    });

    try {
      if (profile.chain === 'dutchie-remove') {
        const { error } = await this.rootStore.apolloClient.mutate({
          mutation: dispensaryRemoveFromChain,
          variables: {
            input: {
              id: this.dispensary.id,
            },
          },
        });
        delete profile.chain;

        if (error) {
          throw new Error(error.message);
        }
      }

      const { data, error } = await this.rootStore.apolloClient.mutate({
        mutation: dispensaryUpdate,
        variables: {
          input: {
            email: this.dispensary.email,
            id: this.dispensary.id,
            profile,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (this.rootStore.User.isSuperAdmin && this.dispensary.chain && this.dispensary.status === 'open') {
        await this.addLocationToChainBilling(this.dispensary.chain);
      }

      await this.fetchDispensary();

      this.unpublishedDispoChanges = false;

      return data.dispensaryUpdate.success;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  @action fetchDispensary = async (): Promise<void> => {
    if (!this.dispensary.id) {
      return;
    }

    const { data } = await this.rootStore.apolloClient.query({
      fetchPolicy: 'network-only',
      query: adminDispensaries,
      variables: {
        dispensaryFilter: {
          cNameOrID: this.dispensary.id,
          includePending: true,
        },
      },
    });

    const { filteredDispensaries } = data;
    const [firstValue] = filteredDispensaries;

    this.dispensary = firstValue;
  };

  @action fetchChainDispensaryIds = async (chainId: string): Promise<void> => {
    const { data } = await this.rootStore.apolloClient.query({
      fetchPolicy: 'network-only',
      query: chainDispensaryIds,
      variables: { chainId },
    });

    this.chainDispensaryIds = data.chainDispensaryIds;
  };

  @action publishCheck = ({ newRoute, router }: { newRoute: string; router: History }): void => {
    if (!this.unpublishedDispoChanges) {
      router.push(newRoute);
    } else {
      this.routeAfterPublishedCheck = newRoute;
      if (_.last(_.split(router.location.pathname, '/')) === 'hours') {
        // Hours (V1) page should use its own route-leaving guard's
        // publish modal and not the global settings publishModal
        // TO DO: Clean this up once Hours V1 is retired.
        this.toggleModal('hoursPublishModal');
      } else {
        this.toggleModal('publishModal');
      }
    }
  };

  @action markArrivalsNotified = (arrivals: Array<{ id: string }> = []): void => {
    this.notifiedArrivalsIds = _.uniq([...this.notifiedArrivalsIds, ..._.map(arrivals, 'id')]);
  };

  @action addLocationToChainBilling = async (chainId: string, dispensaryId = this.dispensary.id): Promise<void> => {
    const { apolloClient } = this.rootStore;

    try {
      const locationBilling = await apolloClient.query({
        query: getChainBillingInfo,
        variables: { dispensaries: [dispensaryId] },
      });

      // if subscription DNE for this location, add it to the chain
      if (!locationBilling.data?.getBillingSubscriptions.length) {
        await this.fetchChainDispensaryIds(chainId);

        const chainBilling = await apolloClient.query({
          query: getChainBillingInfo,
          variables: { dispensaries: this.chainDispensaryIds },
        });

        if (chainBilling.data?.getBillingSubscriptions?.length) {
          const {
            dispensaryBilling: { chargebeeCustomerId, chain },
          } = chainBilling.data.getBillingSubscriptions[0];

          // if other locations are billed as a chain, proceed
          if (chain) {
            await apolloClient.mutate({
              mutation: addSubscriptionToChain,
              variables: {
                dispensaryIds: [dispensaryId],
                chargebeeCustomerId,
              },
            });

            this.showErnie(`Successfully updated billing info for ${chainId}`, 'success');
          }
        }
      }
    } catch (error) {
      console.error('Error updating chain billing', error);
      this.showErnie(`Error updating billing info for ${chainId}. Please check the chain's billing page.`, 'danger');
    }
  };

  @action removeLocationFromChainBilling = async (
    chainId: string,
    dispensaryId = this.dispensary.id
  ): Promise<void> => {
    const { apolloClient } = this.rootStore;

    try {
      const locationBilling = await apolloClient.query({
        query: getChainBillingInfo,
        variables: { dispensaries: [dispensaryId] },
      });

      if (locationBilling.data?.getBillingSubscriptions?.length) {
        const {
          dispensaryBilling: { chargebeeCustomerId, chain },
        } = locationBilling.data.getBillingSubscriptions[0];

        // if other locations are billed as a chain, proceed
        if (chain) {
          await apolloClient.mutate({
            mutation: removeSubscriptionFromChain,
            variables: {
              ids: [dispensaryId],
              chargebeeCustomerId,
            },
          });

          this.showErnie(`Successfully updated billing info for ${chainId}`, 'success');
        }
      }
    } catch (error) {
      console.error('Error updating chain billing', error);
      this.showErnie(`Error updating billing info for ${chainId}. Please check the chain's billing page.`, 'danger');
    }
  };
}
