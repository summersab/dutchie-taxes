import { DispensaryMenuBannerColors } from 'shared/constants';

export const bannerColors = Object.entries(DispensaryMenuBannerColors).map(([key, value]) => ({
  ...value,
  key,
  value: key,
}));
