import React from 'react';

import { FullPageLoader } from 'shared/components/loading';
import { useGetMenuCustomization } from '../data-access';

import { ImageBannerForm } from './image-banner-form';

export function ImageBanner(): JSX.Element | null {
  const { data, loading } = useGetMenuCustomization();

  if (loading) {
    return <FullPageLoader />;
  }

  if (data) {
    return <ImageBannerForm data={data} />;
  }

  return null;
}
