import React from 'react';
import styled from 'styled-components';
import { layout } from 'styled-system';

import Card from 'shared/components/card';
import Imgix from 'shared/components/imgix';

export default function CategoryTile({
  label,
  breakpoint = `960`,
  category,
  imgSrc,
  onClick,
  children,
  disableImageAlt = false,
  ...props
}) {
  const computedLabel = label || category?.label;
  return (
    <StyledCard breakpoint={breakpoint} alwaysShowShadow onClick={onClick} {...props}>
      {children}
      <CardHeader>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <Text>Shop</Text>
        <Title breakpoint={breakpoint}>{computedLabel}</Title>
      </CardHeader>
      <ImageContainer>
        <Image src={imgSrc} htmlAttributes={{ alt: disableImageAlt ? '' : computedLabel }} />
      </ImageContainer>
    </StyledCard>
  );
}

export const StyledCard = styled(Card)`
  justify-content: flex-start;
  padding: 15px;
  border-radius: 17px;
  background: #fff;
  height: 100%;
  width: 100%;
  ${layout}

  @media only screen and (min-width: 992px) {
    &:hover {
      box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.25);
    }
    &:focus {
      /* Visible in the full-colour space */
      box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.25);

      /* Visible in Windows high-contrast themes */
      outline-color: transparent;
      outline-width: 2px;
    }
  }

  @media screen and (min-width: ${({ breakpoint }) => breakpoint}px) {
    border-radius: 24px;
    padding: 20px 25px;
  }
`;

const Text = styled.p`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 11px;
  line-height: 12px;
  color: #afb1b2;
  margin: 0;
  font-size: 11px;
  display: flex;
`;

const Title = styled.span`
  color: #242526;
  font-weight: bold;
  font-size: 16px;
  margin: 0;
  display: flex;

  @media screen and (min-width: ${({ breakpoint }) => breakpoint}px) {
    font-size: 20px;
  }
`;

const CardHeader = styled.div`
  width: 100%;
`;

const Image = styled(Imgix)`
  border-radius: 3px;
  object-fit: contain;
  width: 100%;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  margin-top: auto;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  /*
  This padding value sizes the image container to be 160px x 85px for the 214px x 187px tile...
  and dynamically sizes the image container to maintain the same aspect ratio for different tile sizes.
  For this to work with other tile sizes, the tile must keep the same width to height ratio (1.14:1)
  */
  padding: 38.3% 12.6% 9.4%;
`;
