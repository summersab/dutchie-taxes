import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';

import { removeTypename } from 'shared/helpers/utils';
import useErnie from 'shared/hooks/use-ernie';
import { PreviewData } from '../components/preview';
import { ImageBanner, ImageBanners, MenuBannerFormProps } from './image-banner.types';
import { reorder, sortByPosition, remove } from './image-banner-list/image-banner-list.utils';
import { useUpdateImageBanners } from '../data-access';

const IMAGE_BANNER_MAX = 6;

type UseImageBannerFormReturn = {
  imageBanners: ImageBanners;
  isDirty: boolean;
  isImageBannerLimitReached: boolean;
  handleAddImageBanner: (banner: ImageBanner) => void;
  handleRemoveBanner: (bannerIndex: number) => void;
  onDragEnd: (result: DropResult) => void;
  previewData: PreviewData;
  handlePublish: () => void;
  handleReset: () => void;
};

export function useImageBannerForm({ data }: MenuBannerFormProps): UseImageBannerFormReturn {
  const { imageBanners } = data;
  const [localImageBanners, setLocalImageBanners] = useState(sortByPosition(imageBanners ?? []));
  const [isDirty, setIsDirty] = useState(false);
  const isImageBannerLimitReached = localImageBanners.length >= IMAGE_BANNER_MAX;
  const showErnie = useErnie();

  const { id: dispensaryId } = useParams<{ id: string }>();
  const updateData = useUpdateImageBanners();

  function handleAddImageBanner(banner: ImageBanner): void {
    if (localImageBanners.length > 0) {
      (localImageBanners as any[]).map((b: ImageBanner) => (b.position += 1));
    }

    setLocalImageBanners(sortByPosition([...localImageBanners, banner]));
    setIsDirty(true);
  }

  function handleRemoveBanner(bannerIndex: number): void {
    const newBanners = remove([...localImageBanners], bannerIndex);

    setLocalImageBanners(sortByPosition(newBanners));
    setIsDirty(true);
  }

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    const newBanners = reorder([...localImageBanners], result.source.index, result.destination.index);

    setLocalImageBanners(newBanners);
    setIsDirty(true);
  };

  const handlePublish = async (): Promise<void> => {
    try {
      await updateData({
        variables: {
          dispensaryId,
          input: {
            imageBanners: removeTypename(localImageBanners),
          },
        },
      });

      showErnie('Your image banners have been updated', 'success');
      setIsDirty(false);
    } catch (err) {
      showErnie('Something went wrong, please try again.', 'danger');
      console.error(err);
    }
  };

  const handleReset = (): void => {
    setLocalImageBanners(sortByPosition(imageBanners ?? []));
  };

  const previewData = { ...data, imageBanners: localImageBanners };

  return {
    imageBanners: localImageBanners,
    isDirty,
    isImageBannerLimitReached,
    handleAddImageBanner,
    handleRemoveBanner,
    onDragEnd,
    previewData,
    handlePublish,
    handleReset,
  };
}
