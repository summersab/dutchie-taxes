import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { PhoneWrapper } from 'src/svg/phone-wrapper';

import { usePreview } from './use-preview';
import { PreviewData } from './preview.types';

export type PreviewProps = {
  children: React.ReactNode;
  data: PreviewData;
};

export function Preview({ children, data }: PreviewProps): JSX.Element {
  const { theme, font } = usePreview(data);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {font.fontFamilyEncoded && (
          <link
            href={`https://fonts.googleapis.com/css2?family=${font.fontFamilyEncoded}&display=swap`}
            rel='stylesheet'
          />
        )}

        <PhoneWrapper />

        <ContentContainer>
          <PreviewBanner>Preview</PreviewBanner>
          <ScrollableContainer>{children}</ScrollableContainer>
        </ContentContainer>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  font-family: ${({ theme }) => theme.fontFamily};
  height: 802px;
  overflow: hidden;
  position: relative;
  width: 370px;
`;

const ScrollableContainer = styled.div`
  height: 720px;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ContentContainer = styled.div`
  border-radius: 44px;
  bottom: 12px;
  left: 11px;
  overflow: hidden;
  position: absolute;
  right: 11px;
  top: 11px;

  & a {
    color: ${({ theme }) => theme.linkColor};
  }
`;

const PreviewBanner = styled.div`
  font-size: 12px;
  font-weight: 700;
  height: 60px;
  line-height: ${17 / 12};
  padding: 33px 0 0;
  text-align: center;
  text-transform: uppercase;
`;
