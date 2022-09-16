import React from 'react';

import { StyledCard, CardHeader, Text, Title, ImageContainer, Image } from './category-card.styles';

type CategoryCardProps = {
  label: string;
  imgSrc: string;
};

export const TEST_ID_CATEGORY_CARD = 'category-card';

export function CategoryCard({ label, imgSrc }: CategoryCardProps): JSX.Element {
  return (
    <StyledCard data-testid={TEST_ID_CATEGORY_CARD}>
      <CardHeader>
        <Text>SHOP</Text>
        <Title>{label}</Title>
      </CardHeader>
      <ImageContainer>
        <Image src={`${imgSrc}?w=200&h=100`} htmlAttributes={{ alt: label }} />
      </ImageContainer>
    </StyledCard>
  );
}
