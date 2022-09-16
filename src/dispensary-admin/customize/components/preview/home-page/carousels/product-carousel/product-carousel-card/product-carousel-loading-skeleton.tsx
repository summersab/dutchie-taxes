import React from 'react';
import styled from 'styled-components';
import { Skeleton } from '../../loading-skelelton';

import { Container, Header, CardsContainer } from '../product-carousel.styles';

export function ProductCarouselLoadingSkeleton(): JSX.Element {
  return (
    <Container>
      <Header>
        <Skeleton width={180} height={16} rounded />
      </Header>

      <CardsContainer>
        <ProductCarouselCardLoadingSkeleton />
        <ProductCarouselCardLoadingSkeleton />
      </CardsContainer>
    </Container>
  );
}

function ProductCarouselCardLoadingSkeleton(): JSX.Element {
  return (
    <SkeletonWrapper>
      <Skeleton width={130} height={130} borderRadius={10} />
      <SkeletonContentContainer>
        <Skeleton width={44} height={8} rounded />
        <Skeleton width={137} height={10} rounded />
        <Skeleton width={94} height={8} rounded />
        <Inline>
          <Skeleton width={59} height={8} mr={2} rounded />
          <Skeleton width={59} height={8} rounded />
        </Inline>
      </SkeletonContentContainer>
    </SkeletonWrapper>
  );
}

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 160px;
  margin-top: 6px;
`;

const SkeletonContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 160px;
  height: 100px;
  margin-top: 20px;
`;

const Inline = styled.div`
  display: flex;
`;
