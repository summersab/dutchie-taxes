import React from 'react';

import { menuBannerColors } from '../../../helpers';

import { Preview } from '../preview';
import { PreviewData } from '../preview.types';

import { NavBar } from './navbar';
import { MenuBanner } from './menu-banner';
import { MenuImageBanner } from './menu-image-banner';
import { Categories } from './categories';
import { Carousels } from './carousels';
import { Disclaimer } from './disclaimer';

type HomePageProps = {
  data: PreviewData;
};

type UseHomePageReturn = {
  menuBannerBackgroundColor: string;
};

function useHomePage(data: PreviewData): UseHomePageReturn {
  const menuBannerBackgroundColor = menuBannerColors[data.menuBannerColor].background;

  return {
    menuBannerBackgroundColor,
  };
}

export function HomePage({ data }: HomePageProps): JSX.Element {
  const { menuBannerBackgroundColor } = useHomePage(data);
  const { menuBannerHtml, disclaimerTextHtml, menuSections, categories, imageBanners } = data;

  return (
    <Preview data={data}>
      <NavBar />

      {!!imageBanners?.length && <MenuImageBanner banners={imageBanners} />}

      {menuBannerHtml && <MenuBanner bannerColor={menuBannerBackgroundColor} bannerHtml={menuBannerHtml} />}

      <Categories categories={categories} />

      <Carousels menuSections={menuSections} />

      {disclaimerTextHtml && <Disclaimer disclaimerHtml={disclaimerTextHtml} />}
    </Preview>
  );
}
