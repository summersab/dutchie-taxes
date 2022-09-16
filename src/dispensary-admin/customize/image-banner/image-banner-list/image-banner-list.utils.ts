import type { ImageBanners } from '../image-banner.types';

export const reorder = (banners: ImageBanners, startIndex: number, endIndex: number): ImageBanners => {
  const result = Array.from(banners);
  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  return resetPositionValues(result);
};

export const remove = (banners: ImageBanners, index: number): ImageBanners => {
  banners.splice(index, 1);

  return resetPositionValues(banners);
};

export const sortByPosition = (banners: any[] | ImageBanners): any[] | ImageBanners => {
  banners.sort((a, b) => {
    if (a.position < b.position) {
      return -1;
    }

    if (a.position > b.position) {
      return 1;
    }

    return 0;
  });

  return banners;
};

export const resetPositionValues = (banners: ImageBanners): ImageBanners => {
  const positionedBanners = banners.map((banner, index) => ({
    ...banner,
    position: index,
  }));

  return positionedBanners;
};
