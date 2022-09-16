import { useState } from 'react';

import { useStores } from 'src/hooks/use-stores';
import { bannerColors } from '../menu-banner.utils';
import { Color } from '../../helpers';

export type UseMenuBannerEditorReturn = {
  handleChangeForMenuBanner: (html: string) => void;
  handleSelectColorForMenuBanner: (color: Color) => void;
  menuBannerColor: string;
  menuBannerHtml: string;
  selectedMenuBannerColor: Color;
};

export function useMenuBannerEditor(): UseMenuBannerEditorReturn {
  const { UI } = useStores();

  const [menuBannerHtml, setMenuBannerHtml] = useState(UI.dispensary.menuBannerHtml ?? '');
  const [menuBannerColor, setMenuBannerColor] = useState(UI.dispensary.menuBannerColor ?? 'green');

  // have to null-coalesce bc Array.find can return undefined
  const selectedMenuBannerColor = bannerColors.find((color) => color.key === menuBannerColor) ?? bannerColors[0];

  function handleChangeForMenuBanner(html: string): void {
    setMenuBannerHtml(html);
    UI.unpublishedDispoChanges = true;
  }

  function handleSelectColorForMenuBanner(color: Color): void {
    setMenuBannerColor(color.key);
    UI.unpublishedDispoChanges = true;
  }

  return {
    handleChangeForMenuBanner,
    handleSelectColorForMenuBanner,
    menuBannerColor,
    menuBannerHtml,
    selectedMenuBannerColor,
  };
}
