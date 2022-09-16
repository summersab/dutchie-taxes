import React from 'react';
import styled from 'styled-components';
import Imgix from 'shared/components/imgix';

import { ImageBanner } from 'shared/components/image-banner';
import { BannerImageWrapper } from './banner-image-wrapper';

export type Banner = {
  _id: string;
  image: string;
  mobileImage: string;
  alt?: string | null;
  link?: string | null;
  position: number;
};

export type MenuImageBannerProps = {
  banners: Banner[] | null;
};

export const TEST_ID_MENU_IMAGE_BANNER = 'menu-image-banner';
export const TEST_ID_SCROLL_ITEM_CONTAINER = 'scroll-item-container';

export function MenuImageBanner({ banners }: MenuImageBannerProps): JSX.Element {
  if (!banners) {
    return <></>;
  }

  const carouselOptions = {
    draggable: banners.length > 1,
    loop: false,
    startIndex: 0,
    slidesToScroll: 1,
    banners,
  };

  return (
    <ImageBanner carouselOptions={carouselOptions} isPreview>
      <MainImageScrollContainer data-testid={TEST_ID_MENU_IMAGE_BANNER}>
        {banners.map((banner) => (
          <ScrollItem
            key={banner._id}
            data-testid={TEST_ID_SCROLL_ITEM_CONTAINER}
            isSingleBanner={banners.length === 1}
          >
            <BannerImageWrapper linkUrl={banner.link}>
              <MainImage src={`${banner.mobileImage}?w=315&h=141`} htmlAttributes={{ alt: banner.alt }} />
            </BannerImageWrapper>
          </ScrollItem>
        ))}
      </MainImageScrollContainer>
    </ImageBanner>
  );
}

const MainImageScrollContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const ScrollItem = styled.div<{ isSingleBanner: boolean }>`
  min-width: 100%;
  display: flex;
  justify-content: center;

  &.is-selected {
    margin-right: ${({ isSingleBanner }) => (isSingleBanner ? '0' : '-26px')};
  }
`;

const MainImage = styled(Imgix)<{ src: string; htmlAttributes: any }>`
  display: block;
  border-radius: 8px;
`;
