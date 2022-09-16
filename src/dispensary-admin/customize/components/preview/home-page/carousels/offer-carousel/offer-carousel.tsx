import React from 'react';
import styled from 'styled-components';

import { GqlSpecials } from 'types/graphql';

import { Skeleton } from '../loading-skelelton';
import { OfferCard } from './offer-card';

type OfferCarouselProps = {
  label: string;
  loading: boolean;
  offers: GqlSpecials[] | undefined;
};

export const TEST_ID_OFFER_CAROUSEL = 'offer-carousel';

export function OfferCarousel({ label, offers, loading }: OfferCarouselProps): JSX.Element | null {
  if (!offers || loading) {
    return (
      <LoadingContainer>
        <Skeleton width={310} height={160} borderRadius={20} />
      </LoadingContainer>
    );
  }

  return (
    <Container data-testid={TEST_ID_OFFER_CAROUSEL}>
      <Header>
        <Title>{label}</Title>
        <ViewAllLink>View All</ViewAllLink>
      </Header>

      <CardsContainer>
        {offers.map((offer: GqlSpecials) => (
          <OfferCard {...offer} key={offer._id} />
        ))}
      </CardsContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 40px 16px 5px 16px;
  border-bottom: 1px solid #d7e4eb;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;
`;

const Title = styled.h2`
  color: #242526;
  font-weight: bold;
  font-size: 20px;
`;

const ViewAllLink = styled.a`
  color: ${({ theme }) => theme.linkColor};
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fill, 310px);
  grid-gap: 11px;
  margin-top: 15px;
  padding: 10px 0 18px 0;
  margin-left: -30px;
  padding-left: 30px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const LoadingContainer = styled.div`
  padding: 30px 20px;
`;
