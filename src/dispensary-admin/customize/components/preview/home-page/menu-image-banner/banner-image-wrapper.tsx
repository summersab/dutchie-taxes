import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type BannerImageWrapperProps = {
  children: ReactNode;
  linkUrl: string | null | undefined;
};

export function BannerImageWrapper({ children, linkUrl }: BannerImageWrapperProps): JSX.Element {
  if (linkUrl) {
    return (
      <Link href={linkUrl} target='_blank' rel='noopener noreferrer'>
        {children}
      </Link>
    );
  }

  return <Container>{children}</Container>;
}

const imageWrapperStyle = css`
  width: 100%;
  padding: 10px 16px;
`;

const Link = styled.a`
  ${imageWrapperStyle}
`;

const Container = styled.div`
  ${imageWrapperStyle}
`;
