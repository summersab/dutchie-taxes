import { useRouteMatch } from 'react-router-dom';

import type { SectionLink, SectionLinksObject } from 'src/models/section-links';
import { useUser } from 'src/hooks/use-user';
import useEnterprise from 'src/hooks/use-enterprise';
import useBillingUIV2 from 'src/enterprise-admin/hooks/use-billing-ui-v2';

export function useChainAdminLinks(): SectionLinksObject {
  const User = useUser();
  const enterprise = useEnterprise();
  const enterpriseId = enterprise.id;
  const useEnterpriseAdminUI = useBillingUIV2();
  const isBillingUIV2 = !useEnterpriseAdminUI.loading && useEnterpriseAdminUI.useV2UI;
  const chainMatch = useRouteMatch<{ chainId: string }>('/chains/:chainId');
  const atOrderMatch = useRouteMatch<{ chainId: string; variant: string; orderId: string }>(
    '/chains/:chainId/orders/:variant/:orderId'
  );

  if (!chainMatch) {
    return {
      links: [],
      redirectPath: '/redirect',
    };
  }

  const basePath = chainMatch.path;
  const baseTo = chainMatch.url;

  const billingToPath =
    enterpriseId && isBillingUIV2 ? `/enterprise/${enterpriseId}/settings/billing` : `${baseTo}/settings/billing`;

  const links: SectionLink[] = [
    {
      backlink: atOrderMatch?.isExact ? `${baseTo}/orders/${atOrderMatch.params.variant}` : undefined,
      filePath: './orders',
      icon: 'orders',
      key: 'orders',
      label: 'Orders',
      routePath: `${basePath}/orders`,
      subHeaders: [
        { to: `${baseTo}/orders/main`, label: 'Online', visible: true },
        { to: `${baseTo}/orders/kiosk`, label: 'Kiosk', visible: true },
      ],
      to: `${baseTo}/orders`,
      visible: User.isSuperAdmin || (User.isChainAdmin && (User.profile.permissions?.orders ?? false)),
    },
    {
      filePath: './dispensaries',
      icon: 'dispensaries',
      key: 'dispensaries',
      label: 'Dispensaries',
      routePath: `${basePath}/dispensaries`,
      to: `${baseTo}/dispensaries`,
      visible: User.isSuperAdmin || User.isChainAdmin,
    },
    {
      filePath: './analytics',
      icon: 'analytics',
      key: 'analytics',
      label: 'Analytics',
      routePath: `${basePath}/analytics`,
      to: `${baseTo}/analytics`,
      subHeaders: [
        { to: `${baseTo}/analytics/sales`, label: 'Sales', visible: true },
        { to: `${baseTo}/analytics/products`, label: 'Products', visible: true },
        { to: `${baseTo}/analytics/brands`, label: 'Brands', visible: true },
        { to: `${baseTo}/analytics/ecommerce`, label: 'Ecommerce', visible: true },
        { to: `${baseTo}/analytics/marketing`, label: 'Marketing', visible: true },
      ],
      visible: User.isSuperAdmin || (User.isChainAdmin && (User.profile.permissions?.analytics ?? false)),
    },
    {
      filePath: './settings',
      icon: 'settings',
      key: 'settings',
      label: 'Settings',
      routePath: `${basePath}/settings`,
      subHeaders: [
        { to: `${baseTo}/settings/account`, label: 'My Account', visible: true },
        {
          to: billingToPath,
          label: 'Billing',
          visible: User.isSuperAdmin || (User.profile.permissions?.billing ?? false),
        },
      ],
      to: `${baseTo}/settings`,
      visible: User.isSuperAdmin || User.isChainAdmin,
    },
  ];

  const visibleLinks = links.filter((link) => link.visible);
  const redirectPath = visibleLinks.length > 0 ? visibleLinks[0].to : '/redirect';

  return { links: visibleLinks, redirectPath };
}
