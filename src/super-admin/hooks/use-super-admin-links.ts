import { useRouteMatch } from 'react-router-dom';
import { useFlags } from 'launchdarkly-react-client-sdk';
import ContentStatistics from 'src/super-admin/content/cleanup/components/content-statistics';
import { useUser } from 'src/hooks/use-user';
import type { SectionLink, SectionLinksObject } from 'src/models/section-links';

export function useSuperAdminLinks(): SectionLinksObject {
  const User = useUser();
  const superMatch = useRouteMatch('/super');
  const atOrderMatch = useRouteMatch<{ variant: string }>(`/super/orders/:variant/:orderId`);
  const atEditProduct = useRouteMatch<{ id: string; productId: string }>(`/super/content/products/edit/:id/:productId`);
  const flags = useFlags();

  if (!superMatch) {
    return {
      links: [],
      redirectPath: '/redirect',
    };
  }

  const basePath = superMatch.path;
  const baseTo = superMatch.url;

  const links: SectionLink[] = [
    {
      filePath: './orders',
      icon: 'orders',
      key: 'orders',
      label: 'Orders',
      routePath: `${basePath}/orders`,
      to: `${baseTo}/orders`,
      visible: User.isSuperAdmin && !User.isOutsourceCleaner,
      backlink: atOrderMatch?.isExact ? `${baseTo}/orders/${atOrderMatch.params.variant}` : undefined,
      subHeaders: [
        { to: `${baseTo}/orders/main`, label: 'Online', visible: true },
        { to: `${baseTo}/orders/kiosk`, label: 'Kiosk', visible: true },
      ],
    },
    {
      filePath: './dispensaries',
      icon: 'dispensaries',
      key: 'dispensaries',
      label: 'Dispensaries',
      routePath: `${basePath}/dispensaries`,
      to: `${baseTo}/dispensaries`,
      visible: User.isSuperAdmin && !User.isOutsourceCleaner,
      subHeaders: [
        { to: `${baseTo}/dispensaries/active`, label: 'Active', visible: true },
        { to: `${baseTo}/dispensaries/pending`, label: 'Pending', visible: true },
        { to: `${baseTo}/dispensaries/chains`, label: 'Chains', visible: true },
      ],
    },
    {
      filePath: './content',
      icon: 'content',
      key: 'content',
      label: 'Content',
      routePath: `${basePath}/content`,
      to: `${baseTo}/content`,
      visible: User.isSuperAdmin || User.isOutsourceCleaner,
      backlink: atEditProduct?.isExact ? `${baseTo}/content/products` : undefined,
      headerComponent: ContentStatistics,
      subHeaders: [
        { to: `${baseTo}/content/products`, label: 'Products', visible: true },
        { to: `${baseTo}/content/cleanup`, label: 'Cleanup', visible: true },
        { to: `${baseTo}/content/bulk-review`, label: 'Bulk Review', visible: true },
        { to: `${baseTo}/content/brands`, label: 'Brands', visible: true },
        { to: `${baseTo}/content/libraries`, label: 'Libraries', visible: true },
        {
          to: `${baseTo}/content/pending-libraries`,
          label: 'Pending Libraries',
          visible: flags['content.content-approval-modal'],
        },
        { to: `${baseTo}/content/strains`, label: 'Strains', visible: true },
        { to: `${baseTo}/content/terpenes`, label: 'Terpenes', visible: true },
        {
          to: `${baseTo}/content/brand-merge-tool`,
          label: 'Brand Merge Tool',
          visible: true,
        },
        {
          to: `${baseTo}/content/brand-merge-history`,
          label: 'Brand Merge History',
          visible: true,
        },
      ],
    },
    {
      filePath: './coupons',
      icon: 'coupons',
      key: 'coupons',
      label: 'Coupons',
      routePath: `${basePath}/coupons`,
      to: `${baseTo}/coupons`,
      visible: User.isSuperAdmin && !User.isOutsourceCleaner,
    },
    {
      filePath: './customers',
      icon: 'customers',
      key: 'customers',
      label: 'Customers',
      routePath: `${basePath}/customers`,
      to: `${baseTo}/customers`,
      visible: User.isSuperAdmin && !User.isOutsourceCleaner,
    },
    {
      filePath: './analytics',
      icon: 'analytics',
      key: 'analytics',
      label: 'Analytics',
      routePath: `${basePath}/analytics`,
      to: `${baseTo}/analytics`,
      visible: User.isSuperAdmin && !User.isOutsourceCleaner,
      subHeaders: [
        { to: `${baseTo}/analytics/sales`, label: 'Sales', visible: true },
        { to: `${baseTo}/analytics/products`, label: 'Products', visible: true },
        { to: `${baseTo}/analytics/brands`, label: 'Brands', visible: true },
        { to: `${baseTo}/analytics/ecommerce`, label: 'Ecommerce', visible: true },
        { to: `${baseTo}/analytics/marketing`, label: 'Marketing', visible: true },
      ],
    },
    {
      filePath: './settings',
      icon: 'settings',
      key: 'settings',
      label: 'Settings',
      routePath: `${basePath}/settings`,
      to: `${baseTo}/settings`,
      visible: User.isSuperAdmin && !User.isOutsourceCleaner,
      subHeaders: [
        { to: `${baseTo}/settings/account`, label: 'My Account', visible: true },
        { to: `${baseTo}/settings/users`, label: 'Super Admins', visible: true },
      ],
    },
    {
      filePath: './tasks',
      icon: 'tasks',
      key: 'tasks',
      label: 'Tasks',
      routePath: `${basePath}/tasks`,
      to: `${baseTo}/tasks`,
      visible: User.hasTasksPermissions,
    },
  ];

  const visibleLinks = links.filter((link) => link.visible);
  const redirectPath = visibleLinks.length > 0 ? visibleLinks[0].to : '/redirect';

  return { links: visibleLinks, redirectPath };
}
