import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from 'shared/styles';

export function HeroSection({ handleImgLoad }) {
  return (
    <Wrapper>
      <picture>
        <source media='(max-width: 902px)' srcSet='/year-in-review/hero-mobile-2021.svg' />
        <source media={mediaQueries.desktop} srcSet='/year-in-review/hero-2021.svg' />
        <Hero src='/year-in-review/hero-2021.svg' alt='year in review presented by Dutchie' onLoad={handleImgLoad} />
      </picture>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding-bottom: 80px;

  @media ${mediaQueries.desktop} {
    //height: 630px;
    overflow: hidden;
  }
`;

const Hero = styled.img`
  width: 100%;
`;
