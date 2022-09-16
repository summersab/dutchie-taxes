import loadable from '@loadable/component';
import React from 'react';

import { AdminLayout } from 'src/components/admin-layout';
import { useSuperAdminLinks } from 'src/super-admin/hooks/use-super-admin-links';
import { useUser } from 'src/hooks/use-user';

const LoadableRoute = loadable((props: { filePath: string }) => import(`${props.filePath}`));

export function SuperAdminIndex(): JSX.Element {
  const User = useUser();
  const { links, redirectPath } = useSuperAdminLinks();

  return <AdminLayout links={links} loadableRoute={LoadableRoute} redirectPath={redirectPath} title={User.fullName} />;
}
