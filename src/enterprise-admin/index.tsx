import loadable from '@loadable/component';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useEnterpriseFlag from 'shared/hooks/use-enterprise-flag';
import { AdminLayout } from 'src/components/admin-layout';
import useEnterprise from 'src/hooks/use-enterprise';
import { useEnterpriseAdminLinks } from 'src/enterprise-admin/hooks/use-enterprise-admin-links';
import { FF_ENTERPRISE_SPECIALS } from 'src/lib/constants';
import { useUser } from 'src/hooks/use-user';

const LoadableRoute = loadable((props: { filePath: string }) => import(`${props.filePath}`));

const EnterpriseAdmin = (): JSX.Element => {
  const history = useHistory();
  const User = useUser();
  const { id: enterpriseId, uniqueName } = useEnterprise();
  const enterpriseSpecialsFlag = useEnterpriseFlag(FF_ENTERPRISE_SPECIALS, enterpriseId);
  const { links, redirectPath } = useEnterpriseAdminLinks();

  useEffect(() => {
    if (!enterpriseSpecialsFlag && !User.isEnterpriseAdmin && !User.isSuperAdmin) {
      history.push(redirectPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterpriseSpecialsFlag, User.isEnterpriseAdmin, User.isSuperAdmin]); // FIXME: ENG-32714 fix hooks dependency

  return (
    <AdminLayout
      links={links}
      loadableRoute={LoadableRoute}
      redirectPath={redirectPath}
      title={uniqueName ?? 'Enterprise Admin'}
    />
  );
};

export default EnterpriseAdmin;
