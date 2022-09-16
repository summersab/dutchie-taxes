import { useRouteMatch } from 'react-router-dom';

import type { SectionLink, SectionLinksObject } from 'src/models/section-links';
import { useUser } from 'src/hooks/use-user';

const useEnterpriseAdminLinks = (): SectionLinksObject => {
  const User = useUser();
  const userHasEnterpriseSpecialsAccess = User.profile.permissions?.enterpriseSpecials ?? false;

  // Matchers
  const enterpriseRouteMatch = useRouteMatch<{ enterpriseId: string }>('/enterprise/:enterpriseId');
  const atAddSpecial = useRouteMatch<{ id: string }>('/enterprise/:enterpriseId/promote/specials/add');
  const atEditSpecial = useRouteMatch<{ id: string; specialId: string }>(
    '/enterprise/:enterpriseId/promote/specials/edit/:specialId'
  );
  const atOrderMatch = useRouteMatch<{ chainId: string; variant: string; orderId: string }>(
    '/chains/:chainId/orders/:variant/:orderId'
  );

  if (!enterpriseRouteMatch) {
    return {
      links: [],
      redirectPath: '/redirect',
    };
  }

  const basePath = enterpriseRouteMatch.path;
  const baseTo = enterpriseRouteMatch.url;

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
      visible: true,
    },
    {
      filePath: './dispensaries',
      icon: 'dispensaries',
      key: 'dispensaries',
      label: 'Dispensaries',
      routePath: `${basePath}/dispensaries`,
      to: `${baseTo}/dispensaries`,
      visible: true,
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
      visible: true,
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
      ],
      to: `${baseTo}/promote`,
      visible: User.isSuperAdmin || userHasEnterpriseSpecialsAccess,
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
        { to: `${baseTo}/settings/account`, label: 'My Account', visible: true },
        // we are hiding billing for now as enterprise billing was moved to SalesForce
        { to: `${baseTo}/settings/billing`, label: 'Billing', visible: false },
      ],
    },
  ];

  const visibleLinks = links.filter(({ visible }) => visible);

  return { links: visibleLinks, redirectPath: '/redirect' };
};

export { useEnterpriseAdminLinks };
