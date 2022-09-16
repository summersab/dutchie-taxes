import React from 'react';

import { Preview } from '../components/preview';
import { MenuCustomizationLayout } from '../components/menu-customization-layout';

import { MenuCustomizationData } from '../data-access';

import { useImageBannerForm } from './use-image-banner-form';
import { AddImageBanner } from './add-image-banner';
import { ImageBannerLimit } from './image-banner-limit';
import { ImageBannerList } from './image-banner-list';

export type MenuBannerFormProps = {
  data: MenuCustomizationData;
};

export function ImageBannerForm({ data }: MenuBannerFormProps): JSX.Element {
  const {
    isDirty,
    imageBanners,
    isImageBannerLimitReached,
    handleAddImageBanner,
    handleRemoveBanner,
    onDragEnd,
    previewData,
    handlePublish,
    handleReset,
  } = useImageBannerForm({ data });

  return (
    <MenuCustomizationLayout
      headerText='Image Banner'
      subHeaderText='Display an image slider on your home page.'
      isDirty={isDirty}
      handlePublish={handlePublish}
      handleReset={handleReset}
      previewComponent={<Preview.HomePage data={previewData} />}
    >
      {isImageBannerLimitReached ? <ImageBannerLimit /> : <AddImageBanner addBanner={handleAddImageBanner} />}
      <ImageBannerList imageBanners={imageBanners} removeBanner={handleRemoveBanner} onDragEnd={onDragEnd} />
    </MenuCustomizationLayout>
  );
}
