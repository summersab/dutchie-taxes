/* eslint-disable @typescript-eslint/naming-convention */
import { SVGAttributes } from 'react';

import { CustomFont } from 'types/graphql';
import { fonts as menuFonts } from 'shared/constants/menu-fonts';

import {
  ProximaNova,
  FiraSans,
  Heebo,
  Lato,
  Matter,
  Merriweather,
  NotoSans,
  Nunito,
  Rokkit,
  Volkhorn,
  Volkhov,
  WorkSans,
  Exo,
} from './svgs';

export type FontOption = {
  fontFamily: string;
  fontFamilyEncoded?: string;
  label: string;
  value: CustomFont;
  Component: (props: SVGAttributes<unknown>) => JSX.Element;
};

export type Fonts = Record<CustomFont, FontOption>;

export const fonts: Fonts = {
  [CustomFont.exo]: {
    ...menuFonts.EXO,
    value: CustomFont.exo,
    label: 'Exo',
    Component: Exo,
  },
  [CustomFont.firaSans]: {
    ...menuFonts.FIRA_SANS,
    label: 'Fira Sans',
    value: CustomFont.firaSans,
    Component: FiraSans,
  },
  [CustomFont.heebo]: {
    ...menuFonts.HEEBO,
    label: 'Heebo',
    value: CustomFont.heebo,
    Component: Heebo,
  },
  [CustomFont.lato]: {
    ...menuFonts.LATO,
    label: 'Lato',
    value: CustomFont.lato,
    Component: Lato,
  },
  [CustomFont.matter]: {
    ...menuFonts.MATTER,
    label: 'Matter',
    value: CustomFont.matter,
    Component: Matter,
  },
  [CustomFont.merriweather]: {
    ...menuFonts.MERRIWEATHER,
    label: 'Merriweather',
    value: CustomFont.merriweather,
    Component: Merriweather,
  },
  [CustomFont.notoSans]: {
    ...menuFonts.NOTO_SANS,
    label: 'Noto Sans',
    value: CustomFont.notoSans,
    Component: NotoSans,
  },
  [CustomFont.nunito]: {
    ...menuFonts.NUNITO,
    label: 'Nunito',
    value: CustomFont.nunito,
    Component: Nunito,
  },
  [CustomFont.proximaNova]: {
    ...menuFonts.PROXIMA_NOVA,
    label: 'Proxima Nova',
    value: CustomFont.proximaNova,
    Component: ProximaNova,
  },
  [CustomFont.rokkitt]: {
    ...menuFonts.ROKKITT,
    label: 'Rokkitt',
    value: CustomFont.rokkitt,
    Component: Rokkit,
  },
  [CustomFont.volkhov]: {
    ...menuFonts.VOLKHOV,
    label: 'Volkhov',
    value: CustomFont.volkhov,
    Component: Volkhov,
  },
  [CustomFont.vollkorn]: {
    ...menuFonts.VOLLKORN,
    label: 'Vollkorn',
    value: CustomFont.vollkorn,
    Component: Volkhorn,
  },
  [CustomFont.workSans]: {
    ...menuFonts.WORK_SANS,
    label: 'Work Sans',
    value: CustomFont.workSans,
    Component: WorkSans,
  },
};

export const fontsOptions = Object.values(fonts);
