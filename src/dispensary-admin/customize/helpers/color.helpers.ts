import { LinkColor, NavBarColor } from 'types/graphql';

import { MakeOptional } from 'shared/utils/type-utils';
import { navigationBarColorsV2, linkColorsV2 } from 'shared/constants/menu-colors';
import { DispensaryMenuBannerColors } from 'shared/constants/dispensaries';

export type Color<Value = string> = {
  key: string;
  value: Value;
  background: string;
  border: string;
  color: string;
};

export enum MenuBannerColor {
  green = 'green',
  blue = 'blue',
  red = 'red',
  yellow = 'yellow',
  orange = 'orange',
  purple = 'purple',
  black = 'black',
  grey = 'grey',
}

export function isValidMenuBannerColor(color: any): color is MenuBannerColor {
  return color && color in MenuBannerColor;
}

export function normalizeColorMapping<T extends string>(
  mapping: Record<string, MakeOptional<Color<T>, 'key' | 'value'>>
): Record<T, Color<T>> {
  const res = Object.entries(mapping).reduce(
    (prev, [k, v]) => ({
      ...prev,
      [k]: { ...v, key: v.key ?? k, value: k },
    }),
    {}
  );

  return res as Record<T, Color<T>>;
}

export const navigationBarColors = normalizeColorMapping<NavBarColor>(navigationBarColorsV2);

export const linkColors = normalizeColorMapping<LinkColor>(linkColorsV2);

export const menuBannerColors = normalizeColorMapping<MenuBannerColor>(DispensaryMenuBannerColors);
