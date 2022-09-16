import loadable from '@loadable/component';
import React, { useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import useEnterpriseFlag from 'shared/hooks/use-enterprise-flag';
import { useChainAdminLinks } from 'src/chain-admin/hooks/use-chain-admins-links';
import { AdminLayout } from 'src/components/admin-layout';
import useEnterprise from 'src/hooks/use-enterprise';
import { FF_ENTERPRISE_SPECIALS } from 'src/lib/constants';
import { useUser } from 'src/hooks/use-user';

type MatchParams = { chainId: string };

const LoadableRoute = loadable((props: { filePath: string }) => import(`${props.filePath}`));

export default function ChainAdmin(props: RouteComponentProps<MatchParams>): JSX.Element {
  const { match } = props;
  const User = useUser();
  const { links, redirectPath } = useChainAdminLinks();
  const { id: enterpriseId } = useEnterprise();
  const history = useHistory();
  const enterpriseSpecialsFlag = useEnterpriseFlag(FF_ENTERPRISE_SPECIALS, enterpriseId);

  useEffect(() => {
    if (enterpriseSpecialsFlag && (User.isEnterpriseAdmin || User.isSuperAdmin)) {
      // only redirect if we're not in orders
      if (!RegExp(/.*\/orders\/.*\/.*/).exec(redirectPath)) {
        history.push(`/enterprise/${enterpriseId}/orders/main`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterpriseSpecialsFlag, User.isEnterpriseAdmin, User.isSuperAdmin, enterpriseId]);

  return (
    <AdminLayout links={links} loadableRoute={LoadableRoute} redirectPath={redirectPath} title={match.params.chainId} />
  );
}
