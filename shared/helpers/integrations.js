import _ from 'lodash';
import flow from 'lodash/fp/flow';
import keys from 'lodash/fp/keys';
import reject from 'lodash/fp/reject';

import { categories } from 'shared/constants';
import { getIntegrationCategory } from 'shared/core/helpers/integrations';
import { integrationsByCategory } from 'shared/core/constants/integrations';

export const flattenedIntegrationsForSegment = () => {
  const result = {};
  _.forEach(_.values(integrationsByCategory), (categoryIntegrations) => {
    const childKeys = _.keys(categoryIntegrations);
    _.forEach(childKeys, (k) => {
      result[k] = false;
    });
  });
  return result;
};

export const highSpeedIntegrations = ['flowhub', 'greenbitsV2', 'leaflogix', 'treezV2'];
export const highSpeedIntegrationTime = '5 minutes';

const restrictedIntegrations = {
  chase: ({ showChaseFeature }) => showChaseFeature,
  dutchiePay: ({ showDutchiePay }) => showDutchiePay,
  fyllo: ({ showFylloFeature }) => showFylloFeature,
  menuImport: ({ dispensary }) => dispensary?.featureFlags?.enableMenuImport,
  moneris: ({ showMonerisFeature }) => showMonerisFeature,
  naturesMedicine: ({ dispensary }) => dispensary.chain === 'natures-medicines',
  alcanna: ({ dispensary }) => dispensary.chain === 'spiritleaf',
};

export const integrationWholesaleSupport = {
  blaze: true,
  flowhub: true,
  treezV2: true,
};

export const availableIntegrations = ({ dispensary, showChaseFeature, showFylloFeature, showMonerisFeature }) => {
  let names = {};
  _.forIn(integrationsByCategory, (value) => (names = { ...names, ...value }));
  return flow(
    keys,
    reject(
      (adapter) =>
        restrictedIntegrations[adapter] &&
        !restrictedIntegrations[adapter].call(this, {
          dispensary,
          showChaseFeature,
          showFylloFeature,
          showMonerisFeature,
        })
    )
  )(names);
};

export const integrationDisplayName = (adapter) => {
  let names = {};
  _.forIn(integrationsByCategory, (value) => (names = { ...names, ...value }));
  return names[adapter] || adapter;
};

export const integrationCategoryDisplay = (adapter) => {
  const category = getIntegrationCategory(adapter);

  const names = {
    pos: 'Point of Sale',
    fleetManagement: 'Fleet Management',
    crm: 'CRM',
    analytics: 'Analytics',
    rewards: 'Loyalty & Rewards',
    payments: 'Payments',
    menuImport: 'Menu Import',
  };

  return names[category] || 'Point of Sale';
};

export const integrationDescription = (adapter, shouldShowUpdatedHubspotText) => {
  const name = integrationDisplayName(adapter);
  const category = getIntegrationCategory(adapter);

  const hubspotCopy = shouldShowUpdatedHubspotText
    ? `Record Deals, Contacts, and Line Items in HubSpot for each Dutchie order or cart created.`
    : `Record Deals, Contacts, and Line Items in HubSpot for each Dutchie order placed.`;

  const descriptions = {
    fleetManagement: `Send Dutchie orders directly to ${name} to manage drivers and optimize routes.`,
    crm: adapter === 'hubspot' ? hubspotCopy : `Send your customer information directly to ${name}.`,
    analytics: `Send sales data from your embedded menu into ${name} to track helpful information
    such as product performance, shopping cart funnels, and more.`,
    rewards:
      adapter === 'springbig'
        ? `Allow customers to use their Springbig Rewards or Springbig Offers rewards on a Dutchie order.`
        : `Allow customers to use their ${name} rewards on a Dutchie order.`,
    payments:
      adapter === 'hypur'
        ? `Connect your Dutchie account with Hypur
      so your customers can use Hypur's online payment solution when they checkout.`
        : `Connect to your ${name} account to accept credit
      card payments on Dutchie orders. Once enabled, customers can pay for their
      order with any major credit card and funds will be automatically deposited into your ${name} account.`,
    menuImport:
      // As items are bought through Dutchie, they’ll automatically deduct from the current inventory count of that
      // product.', leaving this one out for now; replace when implemented
      `Manually import your inventory as a .CSV File and we’ll instantly build your menu.
      You can import your menu as often as you like to keep your inventory up to date.`,
    default: `Connect your Dutchie menu with your ${name} inventory, so new and sold out items sync in real-time.`,
  };
  /* eslint-enable */

  return descriptions[category] || descriptions.default;
};

export const integrationCardDescription = (adapter) => {
  const name = integrationDisplayName(adapter);
  const descriptions = {
    merrco: `Connect to your ${name} account to accept credit card payments on Dutchie orders.`,
    hypur: `Connect your Dutchie account with Hypur so your customers can use Hypur's
    online payment solution when they checkout.`,
  };
  return descriptions[adapter];
};

export const integrationSyncTime = (adapter) => {
  return highSpeedIntegrations.includes(adapter) ? highSpeedIntegrationTime : '10 minutes';
};

export const imageStyle = (adapter) => {
  if (adapter === 'onfleet') {
    return { paddingBottom: '18px', height: '40px' };
  }
  if (adapter === 'merrco') {
    return { paddingBottom: '10px', height: '35px' };
  }
  if (adapter === 'menuImport') {
    return { paddingBottom: '10px', height: '58px' };
  }
  return { paddingBottom: '10px', height: '48px' };
};

export const imageUrl = (adapter) => {
  const nonStandardImageUrls = {
    cannveya: '/images/cannveya-logo.svg',
    'google-tag-manager': '/images/google-tag-manager-logo.svg',
    fyllo: '/images/fyllo-logo.png',
    hypur: '/images/hypur-logo.svg',
    menuImport: '/images/menu-import.svg',
    merrco: '/images/merrco-logo.svg',
    pineappleExpress: '/images/pineapple-express-logo.png',
    shopify: '/images/shopify-logo.svg',
  };

  return _.get(nonStandardImageUrls, adapter, `/images/${adapter}-logo.png`);
};

export const shouldIncludeIntegrationNameWithImage = (adapter) => ['menuImport'].includes(adapter);

export const canAddNewIntegration = (category, existingCategories = []) => {
  if (category === 'analytics') {
    return true;
  }

  if (existingCategories.includes('pos')) {
    existingCategories.push('menuImport');
  }
  if (existingCategories.includes('menuImport')) {
    existingCategories.push('pos');
  }

  return !_.includes(existingCategories, category);
};

// Used to get the categories that are coming from an integration object.
// Looks at legacy and new data types.
export const categoriesInUse = (integration) => {
  if (!integration) {
    return [];
  }

  let mappedCategories = [];
  if (integration.categoryMapping?.length) {
    mappedCategories = _.map(integration.categoryMapping, 'localCategory');
  }
  if (!mappedCategories.length && integration.types) {
    mappedCategories = _.values(integration.types);
  }

  return categories.filter((category) => {
    return category !== 'N/A' && mappedCategories.includes(category);
  });
};

export const getFilteredIntegration = (integrations, menuType, category = 'pos') => {
  const filteredIntegrations = _.filter(
    integrations,
    (integration) => getIntegrationCategory(integration.adapter) === category
  );
  return _.find(filteredIntegrations, { integrationType: menuType }) || filteredIntegrations[0];
};
