import React from 'react';
import styled from 'styled-components';

type OfferCardProps = {
  menuDisplayName?: string | null;
  menuDisplayImage?: string | null;
};

export const TEST_ID_OFFER_CARD = 'offer-card';

export function OfferCard({ menuDisplayName, menuDisplayImage }: OfferCardProps): JSX.Element {
  return (
    <Container data-testid={TEST_ID_OFFER_CARD}>
      <Content background={menuDisplayImage}>
        <Title>{menuDisplayName}</Title>
        <Button>SHOP</Button>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 20px;
  position: relative;
  width: 310px;
  margin-right: 14px;
  height: 155px;
`;

const Content = styled.div<{ background?: string | null }>`
  display: grid;
  padding: 29px;
  background: linear-gradient(180deg, rgba(11, 31, 50, 0.432) 33.75%, rgba(11, 31, 50, 0.9) 100%),
    url(${(props) => (props.background ? props.background : '/images/default-special-card.jpg')});
  background-position: center left;
  background-size: cover;
  border-radius: 20px;
  align-items: center;
  height: 100%;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 1.2;
  color: #ffffff;
  text-shadow: 0px 2px 4px rgb(152 163 173 / 36%);
  width: 100%;
  word-break: break-word;
`;

const Button = styled.button`
  width: 65px;
  height: 32px;
  background: transparent;
  font-weight: bold;
  font-size: 12px;
  line-height: 13px;
  color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 20px;
  cursor: pointer;
`;
