import React from 'react';

import { ProductCarouselData } from './product-carousel.types';
import { ProductCarouselCard } from './product-carousel-card';
import { Container, Header, Title, ViewAllLink, CardsContainer } from './product-carousel.styles';

import { ProductCarouselLoadingSkeleton } from './product-carousel-card/product-carousel-loading-skeleton';

type ProductCarouselProps = {
  label: string;
  loading: boolean;
  products: ProductCarouselData[] | undefined;
};

export const TEST_ID_CAROUSEL = 'product-carousel';

export function ProductCarousel({ label, products, loading }: ProductCarouselProps): JSX.Element | null {
  if (!products || loading) {
    return <ProductCarouselLoadingSkeleton />;
  }

  return (
    <Container data-testid={TEST_ID_CAROUSEL}>
      <Header>
        <Title>{label}</Title>
        <ViewAllLink>View All</ViewAllLink>
      </Header>

      <CardsContainer>
        {products.map((product) => (
          <ProductCarouselCard {...product} key={product.id} />
        ))}
      </CardsContainer>
    </Container>
  );
}
