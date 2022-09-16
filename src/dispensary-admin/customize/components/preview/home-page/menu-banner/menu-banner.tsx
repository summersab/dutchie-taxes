import React from 'react';
import styled from 'styled-components';
import RichTextHtmlWrapper from 'shared/components/rich-text-html-wrapper';

export type MenuBannerProps = {
  bannerColor: string;
  bannerHtml: string;
};

export const TEST_ID_MENU_BANNER = 'menu-banner';

export function MenuBanner({ bannerColor, bannerHtml }: MenuBannerProps): JSX.Element {
  return (
    <MenuBannerWrapper bannerColor={bannerColor} data-testid={TEST_ID_MENU_BANNER}>
      <RichTextHtmlWrapper html={bannerHtml} className='preview-menu-banner' />
    </MenuBannerWrapper>
  );
}

const MenuBannerWrapper = styled.div<{ bannerColor: string }>`
  background: ${({ bannerColor }) => bannerColor};
  padding: 25px;
  margin: 20px 16px;
  border-radius: 11px;
  font-size: 13px;
  line-height: 1.65;
  word-break: break-word;
  max-width: 1200px;
`;
