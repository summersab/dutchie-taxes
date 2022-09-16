import React from 'react';

import { FullPageLoader } from 'shared/components/loading';
import { useGetMenuCustomization } from '../data-access';

import { MenuBannerForm } from './menu-banner-form';

export function MenuBannerV2(): JSX.Element | null {
  const { data, loading } = useGetMenuCustomization();

  if (loading) {
    return <FullPageLoader />;
  }

  if (data) {
    return <MenuBannerForm data={data} />;
  }

  return null;
}
