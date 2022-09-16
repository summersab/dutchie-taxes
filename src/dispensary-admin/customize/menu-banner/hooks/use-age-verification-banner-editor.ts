import { useState } from 'react';

import { useStores } from 'src/hooks/use-stores';
import { bannerColors } from '../menu-banner.utils';
import { Color } from '../../helpers';

export type UseAgeVerificationBannerEditorReturn = {
  ageVerificationBannerColor: string;
  ageVerificationBannerHtml: string;
  handleChangeForAgeVerificationBanner: (html: string) => void;
  handleSelectColorForAgeVerificationBanner: (color: Color) => void;
  selectedAgeVerificationBannerColor: Color;
};

export function useAgeVerificationBannerEditor(): UseAgeVerificationBannerEditorReturn {
  const { UI } = useStores();

  const [ageVerificationBannerHtml, setAgeVerificationBannerHtml] = useState(
    UI.dispensary.ageVerificationBannerHtml ?? ''
  );
  const [ageVerificationBannerColor, setAgeVerificationBannerColor] = useState(
    UI.dispensary.ageVerificationBannerColor ?? 'green'
  );

  // have to null-coalesce bc Array.find can return undefined
  const selectedAgeVerificationBannerColor =
    bannerColors.find((color) => color.key === ageVerificationBannerColor) ?? bannerColors[0];

  function handleChangeForAgeVerificationBanner(html: string): void {
    setAgeVerificationBannerHtml(html);
    UI.unpublishedDispoChanges = true;
  }

  function handleSelectColorForAgeVerificationBanner(color: Color): void {
    setAgeVerificationBannerColor(color.key);
    UI.unpublishedDispoChanges = true;
  }

  return {
    ageVerificationBannerColor,
    ageVerificationBannerHtml,
    handleChangeForAgeVerificationBanner,
    handleSelectColorForAgeVerificationBanner,
    selectedAgeVerificationBannerColor,
  };
}
