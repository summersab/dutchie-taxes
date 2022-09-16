import _ from 'lodash';

import LogRocket from 'shared/logrocket';
import { flattenedIntegrationsForSegment } from './integrations';
import { isSuperAdmin } from './users';

export const buildSuperAdminTraits = () => ({
  name: 'dutchie',
  tags: 'dispensary_user_segment',
});

export const buildIntegrationsTraits = (dispoIntegrations) => {
  const allIntegrations = flattenedIntegrationsForSegment();
  _.forEach(dispoIntegrations, (integration) => {
    allIntegrations[integration.adapter] = integration.live;
  });
  return allIntegrations;
};

export const buildDispensaryTraits = (dispensary) => ({
  chain_id: dispensary?.chain,
  city: dispensary?.location?.city,
  country: dispensary?.location?.country,
  embedded: !_.isEmpty(dispensary?.embeddedMenuUrl),
  id: dispensary?.id,
  name: dispensary?.name,
  phone: dispensary?.phone,
  postalCode: dispensary?.location?.zipcode,
  state: dispensary?.location?.state,
  subdomain: !_.isEmpty(dispensary?.customDomainSettings),
  status: dispensary?.status,
  tags: 'dispensary_user_segment', // these tags are needed for Zendesk downstream
  tier: dispensary?.tier,
  timezone: dispensary?.timezone,
});

export const buildTraitsFromUser = (user) => {
  const traits = {
    createdAt: user.createdAt,
    email: _.get(user, 'emails[0].address'),
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    name: user.profile.fullName,
    phone: user.profile.phone,
  };

  // flatten permissions
  _.merge(traits, user.profile.permissions);

  return traits;
};

function getEnvIdentifier(id) {
  return window.reactEnv.appEnv === 'production' ? id : 'developmentId';
}

export const segmentIdentifyAndGroup = (user, dispensary, integrations) => {
  if (!window.analytics || !user) {
    return;
  }
  const userId = getEnvIdentifier(user._id);
  // in all cases at least call identify on the user
  window.analytics.identify(userId, { ...buildTraitsFromUser(user) });
  // if user is super admin, we want to add them to the dutchie org in zendesk
  if (isSuperAdmin(user)) {
    window.analytics.group('superAdminId', { ...buildSuperAdminTraits() });
  }
  // when dispensary data is provided, we can group it into an org downstream
  if (dispensary) {
    let traits = buildDispensaryTraits(dispensary);
    const dispoId = getEnvIdentifier(dispensary.id);
    if (integrations) {
      traits = { ...traits, ...buildIntegrationsTraits(integrations) };
    }
    window.analytics.group(dispoId, traits);
  }
};

export const configureRollbar = (user) => {
  if (!window.Rollbar || !user) {
    return;
  }

  const traits = buildTraitsFromUser(user);

  const rollbarConfig = {
    payload: {
      person: {
        ...traits,
        id: user._id,
        username: traits.name,
      },
    },
  };

  window.Rollbar.configure(rollbarConfig);
};

export const configureLogRocket = (user) => {
  if (!user) {
    return;
  }

  LogRocket.identify(user._id, buildTraitsFromUser(user));
};

export const openZendeskWidget = () => {
  if (_.isFunction(window.zE)) {
    try {
      window.zE('webWidget', 'open');
    } catch (error) {
      window.zE('messenger', 'open');
    }
  }
};

export const showZendeskWidget = () => {
  if (_.isFunction(window.zE)) {
    try {
      window.zE('webWidget', 'show');
    } catch (error) {
      window.zE('messenger', 'open');
    }
  }
};

export const hideZendeskWidget = () => {
  if (_.isFunction(window.zE)) {
    try {
      window.zE('webWidget', 'hide');
    } catch (error) {
      window.zE('messenger', 'close');
    }
  }
};
