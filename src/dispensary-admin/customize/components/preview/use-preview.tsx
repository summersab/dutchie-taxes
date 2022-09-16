import { fonts } from 'shared/constants/menu-fonts';
import { navigationBarColors, linkColors } from '../../helpers';
import { PreviewTheme, PreviewData } from './preview.types';

type UsePreviewReturn = {
  theme: PreviewTheme;
  font: {
    fontFamily: string;
    fontFamilyEncoded?: string;
  };
};

export function usePreview(data: PreviewData): UsePreviewReturn {
  const { colorSettings, fontSettings } = data;

  const navBarColor = navigationBarColors[colorSettings.navBarColor];
  const linkColor = linkColors[colorSettings.linkColor];
  const font = fonts[fontSettings.family];

  const theme = {
    navColor: navBarColor.background,
    linkColor: linkColor.background,
    fontFamily: font.fontFamily,
  };

  return {
    theme,
    font,
  };
}
