/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';

import { hasIsolatedMenus } from 'shared/core/helpers/dispensaries';
import { isMed, isRec } from 'shared/helpers/dispensaries';

import { useDispensary } from 'src/hooks/use-dispensary';
import useEnterprise from 'src/hooks/use-enterprise';
import useRetailer from 'src/hooks/use-retailer';
import { useStream } from 'src/hooks/use-stream';
import { useUI } from 'src/hooks/use-ui';
import { useUser } from 'src/hooks/use-user';
import useBillingUIV2 from 'src/enterprise-admin/hooks/use-billing-ui-v2';
import type { SectionLink, SectionLinksObject } from 'src/models/section-links';
import { useOrdersStore } from 'src/stores/orders';
import useDispensaryFlag from 'shared/hooks/use-dispensary-flag';

export function useDispensaryAdminLinks(): SectionLinksObject {
  const [backToMenuLink, setBackToMenuLink] = useState<string | undefined>('');
  const Stream = useStream();
  const dispensary = useDispensary();
  const User = useUser();
  const UI = useUI();
  const router = useHistory();
  const location = useLocation();
  const ordersStore = useOrdersStore();
  const enterprise = useEnterprise();
  const enterpriseId = enterprise.id;
  const dispensaryIds = dispensary.id ? [dispensary.id] : [];
  const { id: retailerId } = useRetailer(dispensaryIds);
  const useEnterpriseAdminUI = useBillingUIV2();
  const isBillingUIV2 = !useEnterpriseAdminUI.loading && useEnterpriseAdminUI.useV2UI;
  const orderCount = useObserver(() => ordersStore?.active?.orderCount) || 0;
  const unreadConversationCount = useObserver(() => Stream.unreadCount);
  const billingActive = useObserver(() => UI.billingActive);
  const isolatedMenus = hasIsolatedMenus(dispensary);
  const dispensaryRouteMatch = useRouteMatch<{ id: string }>('/dispensaries/:id');
  const atDispensaryMenu = useRouteMatch<{ id: string }>('/dispensaries/:id/menu');
  const atEditProduct = useRouteMatch<{ id: string; productId: string }>('/dispensaries/:id/menu/edit/:productId');
  const atAddSpecial = useRouteMatch<{ id: string }>('/dispensaries/:id/promote/specials/add');
  const atEditSpecial = useRouteMatch<{ id: string; specialId: string }>(
    '/dispensaries/:id/promote/specials/edit/:specialId'
  );

  const showCustomizePrimaryNav = useDispensaryFlag('rollout.customize-admin-primary-navigation', dispensary.id);

  const {
    analytics: canViewAnalytics,
    billing: canViewBilling,
    customers: canViewCustomers,
    menu: canViewMenu,
    messaging: canViewMessaging,
    orders: canViewOrders,
    promote: canViewPromote,
    settings: canViewSettings,
    users: canViewUsers,
  } = User.profile.permissions ?? {
    analytics: false,
    billing: false,
    customers: false,
    menu: false,
    messaging: false,
    orders: false,
    promote: false,
    settings: false,
    users: false,
  };

  useEffect(() => {
    if (atDispensaryMenu && location.search.length > 0) {
      // if currently at the menu path and query params have been set,
      // use the location pathname and search values to preserve the
      // most recent query params by setting backToMenuLink in state
      setBackToMenuLink(`${location.pathname}${location.search}`);
      return;
    }

    if (backToMenuLink?.length === 0) {
      // if the backToMenuLink is an empty string, set it to the default menu route
      const basePathToMenu = dispensaryRouteMatch?.url;
      setBackToMenuLink(basePathToMenu ? `${basePathToMenu}/menu` : undefined);
    }
  }, [location, backToMenuLink, dispensaryRouteMatch?.url, atDispensaryMenu]);

  if (!dispensaryRouteMatch) {
    return {
      links: [],
      redirectPath: '/redirect',
    };
  }
  const basePath = dispensaryRouteMatch.path;
  const baseTo = dispensaryRouteMatch.url;

  const billingToPath =
    retailerId && enterpriseId && isBillingUIV2
      ? `/enterprise/${enterpriseId}/settings/billing/retailer/${retailerId}`
      : `${baseTo}/settings/billing`;

  const links: SectionLink[] = [
    {
      badge: orderCount === 0 ? '' : orderCount,
      filePath: './orders',
      icon: 'orders',
      key: 'orders',
      label: 'Orders',
      routePath: `${basePath}/orders`,
      to: `${baseTo}/orders`,
      subHeaders: [
        { to: `${baseTo}/orders/current`, label: 'Current', visible: true },
        { to: `${baseTo}/orders/past`, label: 'Past', visible: true },
        { to: `${baseTo}/orders/cancelled`, label: 'Cancelled', visible: true },
      ],
      visible: User.isSuperAdmin || canViewOrders,
    },
    {
      backlink: atEditProduct?.isExact ? backToMenuLink : undefined,
      filePath: './menu',
      icon: 'menu',
      key: 'menu',
      label: 'Menu',
      routePath: `${basePath}/menu`,
      subHeaders: [
        {
          to: `${baseTo}/menu/rec`,
          label: 'Recreational',
          visible: isolatedMenus && isRec(dispensary) && !atEditProduct,
        },
        { to: `${baseTo}/menu/med`, label: 'Medical', visible: isolatedMenus && isMed(dispensary) && !atEditProduct },
      ],
      to: `${baseTo}/menu`,
      visible: User.isSuperAdmin || canViewMenu,
    },
    {
      filePath: './customers',
      icon: 'customers',
      key: 'customers',
      label: 'Customers',
      routePath: `${basePath}/customers`,
      to: `${baseTo}/customers`,
      visible: User.isSuperAdmin || canViewCustomers,
    },
    {
      filePath: './analytics',
      icon: 'analytics',
      key: 'analytics',
      label: 'Analytics',
      routePath: `${basePath}/analytics`,
      subHeaders: [
        { label: 'Sales', pageTitle: 'Sales Overview', to: `${baseTo}/analytics/sales`, visible: true },
        { label: 'Products', pageTitle: 'Products', to: `${baseTo}/analytics/products`, visible: true },
        { label: 'Brands', pageTitle: 'Brands', to: `${baseTo}/analytics/brands`, visible: true },
        { label: 'Ecommerce', pageTitle: 'Ecommerce', to: `${baseTo}/analytics/ecommerce`, visible: true },
        { label: 'Marketing', pageTitle: 'Marketing', to: `${baseTo}/analytics/marketing`, visible: true },
      ],
      to: `${baseTo}/analytics`,
      visible: User.isSuperAdmin || canViewAnalytics,
    },
    {
      filePath: './reporting',
      icon: 'reporting',
      key: 'reporting',
      label: 'Reporting',
      routePath: `${basePath}/reporting`,
      to: `${baseTo}/reporting`,
      visible: User.isSuperAdmin || (canViewOrders && canViewCustomers),
    },
    {
      backlink: atEditSpecial?.isExact || atAddSpecial?.isExact ? `${baseTo}/promote/specials` : undefined,
      filePath: './promote',
      icon: 'promote',
      key: 'promote',
      label: 'Promote',
      routePath: `${basePath}/promote`,
      subHeaders: [
        {
          label: 'Specials',
          to: `${baseTo}/promote/specials`,
          visible: !atAddSpecial?.isExact && !atEditSpecial?.isExact,
        },
        {
          label: 'Coupons',
          to: `${baseTo}/promote/coupons`,
          visible: !atAddSpecial?.isExact && !atEditSpecial?.isExact,
        },
      ],
      to: `${baseTo}/promote`,
      visible: User.isSuperAdmin || canViewPromote,
    },
    {
      badge: unreadConversationCount > 0 ? unreadConversationCount : '',
      filePath: './messaging',
      icon: 'messaging',
      key: 'messaging',
      label: 'Messaging',
      routePath: `${basePath}/messaging`,
      to: `${baseTo}/messaging`,
      visible: User.isSuperAdmin || canViewMessaging,
    },
    {
      filePath: './customize',
      icon: 'customize',
      key: 'customize',
      label: 'Customize',
      routePath: `${basePath}/customize`,
      to: `${baseTo}/customize`,
      visible: showCustomizePrimaryNav && (User.isSuperAdmin || canViewSettings),
    },
    {
      filePath: './settings',
      icon: 'settings',
      key: 'settings',
      label: 'Settings',
      routePath: `${basePath}/settings`,
      to: `${baseTo}/settings`,
      visible: true,
      subHeaders: [
        {
          label: 'Store Info',
          onClick: () => UI.publishCheck({ newRoute: `${baseTo}/settings/info`, router }),
          to: `${baseTo}/settings/info`,
          visible: User.isSuperAdmin || canViewSettings,
        },
        {
          label: 'Ordering',
          onClick: () => UI.publishCheck({ newRoute: `${baseTo}/settings/ordering`, router }),
          to: `${baseTo}/settings/ordering`,
          visible: User.isSuperAdmin || canViewSettings,
        },
        {
          label: 'Hours',
          onClick: () => UI.publishCheck({ newRoute: `${baseTo}/settings/hours`, router }),
          to: `${baseTo}/settings/hours`,
          visible: User.isSuperAdmin || canViewSettings,
        },
        {
          label: 'My Account',
          onClick: () => UI.publishCheck({ newRoute: `${baseTo}/settings/account`, router }),
          to: `${baseTo}/settings/account`,
          visible: !User.isSuperAdmin,
        },
        {
          label: 'Users',
          onClick: () => UI.publishCheck({ newRoute: `${baseTo}/settings/users`, router }),
          to: `${baseTo}/settings/users`,
          visible: User.isSuperAdmin || canViewUsers,
        },
        {
          label: 'Devices',
          onClick: () => UI.publishCheck({ newRoute: `${baseTo}/settings/devices`, router }),
          to: `${baseTo}/settings/devices`,
          visible: User.isSuperAdmin || canViewSettings,
        },
        {
          label: 'Billing',
          onClick: () => UI.publishCheck({ newRoute: billingToPath, router }),
          to: billingToPath,
          visible: (billingActive && canViewBilling) || User.isSuperAdmin,
        },
        {
          label: 'Options',
          onClick: () => UI.publishCheck({ newRoute: `${baseTo}/settings/options`, router }),
          to: `${baseTo}/settings/options`,
          superAdminOnly: true,
          visible: User.isSuperAdmin,
        },
        {
          label: 'Taxes',
          onClick: () => UI.publishCheck({ newRoute: `${baseTo}/settings/taxes`, router }),
          to: `${baseTo}/settings/taxes`,
          superAdminOnly: true,
          visible: User.isSuperAdmin,
        },
        {
          label: 'Integrations',
          onClick: () =>
            UI.publishCheck({
              newRoute: `${baseTo}/settings/integrations`,
              router,
            }),
          to: `${baseTo}/settings/integrations`,
          visible: User.isSuperAdmin || canViewSettings,
        },
        {
          label: 'Customize',
          onClick: () =>
            UI.publishCheck({
              newRoute: `${baseTo}/settings/customize`,
              router,
            }),
          to: `${baseTo}/settings/customize`,
          visible: !showCustomizePrimaryNav && (User.isSuperAdmin || canViewSettings),
        },
        // {
        //   label: 'Dispensary API Keys',
        //   onClick: () => UI.publishCheck({ newRoute: `${baseTo}/settings/api-keys`, router }),
        //   superAdminOnly: true,
        //   to: `${baseTo}/settings/api-keys`,
        //   visible: User.isSuperAdmin,
        // },
        // {
        //   label: 'Enterprise API Keys',
        //   onClick: () => UI.publishCheck({ newRoute: `${baseTo}/settings/enterprise-api-keys`, router }),
        //   superAdminOnly: true,
        //   to: `${baseTo}/settings/enterprise-api-keys`,
        //   visible: User.isSuperAdmin,
        // },
      ],
    },
  ];

  const visibleLinks = links.filter((link) => link.visible);
  const redirectPath = visibleLinks.length > 0 ? visibleLinks[0].to : '/redirect';

  return { links: visibleLinks, redirectPath };
}
