import { useState, useEffect } from 'react';

import { DefaultImages } from 'shared/constants';
import { ProductCarouselData } from '../product-carousel.types';

export const TEST_ID_CAROUSEL_CARD = 'product-carousel-card';

type GetDefaultProductCarouselCardImageProps = Pick<ProductCarouselData, 'id' | 'imageUrl' | 'type'>;

type GetDefaultProductCarouselCardImageReturn = {
  imageSrc: string;
  onImageError: () => void;
};

export function GetDefaultProductCarouselCardImage({
  id,
  imageUrl,
  type,
}: GetDefaultProductCarouselCardImageProps): GetDefaultProductCarouselCardImageReturn {
  const [imageHasError, setImageHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(imageUrl);

  const defaultImage = DefaultImages[type] ?? DefaultImages.Flower;

  const onImageError = (): void => {
    setImageHasError(true);
    console.log(`Image failed to load.`, {
      imgSrc: imageUrl,
      product: { id },
    });
  };

  useEffect(() => {
    if (imageHasError) {
      setImageSrc(defaultImage);
    }
  }, [imageHasError, defaultImage]);

  return {
    imageSrc,
    onImageError,
  };
}
