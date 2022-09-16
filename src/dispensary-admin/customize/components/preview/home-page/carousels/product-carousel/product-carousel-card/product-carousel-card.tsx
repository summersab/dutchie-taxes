import React from 'react';

import { formatCurrency } from 'shared/helpers/utils';

import { ProductCarouselData } from '../product-carousel.types';
import { Container, Price, Image, Name, Brand, Strain, Button } from './product-carousel-card.styles';
import { GetDefaultProductCarouselCardImage } from './product-carousel-card.utils';

import SvgAddIcon from './svg/add-icon';

export const TEST_ID_CAROUSEL_CARD = 'product-carousel-card';

type ProductCarouselCardProps = ProductCarouselData;

export function ProductCarouselCard({
  id,
  name,
  imageUrl,
  prices,
  brandName,
  strainType,
  type,
}: ProductCarouselCardProps): JSX.Element {
  const { imageSrc, onImageError } = GetDefaultProductCarouselCardImage({ id, imageUrl, type });

  return (
    <Container id={id} data-testid={TEST_ID_CAROUSEL_CARD}>
      <Button>
        <SvgAddIcon />
      </Button>

      <Image src={imageSrc} onError={onImageError} />

      <Price>{formatCurrency(prices[0])}</Price>

      <Name>{name}</Name>

      {brandName && <Brand>{brandName}</Brand>}

      <Strain>{strainType}</Strain>
    </Container>
  );
}
