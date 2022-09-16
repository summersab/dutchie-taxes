import React, { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NextButton, PrevButton } from './button';
import { Viewport, ButtonsContainer, DotButton, Main, DotsContainer } from './image-banner.styles';
import { useImageBanner } from './use-image-banner';
import type { CarouselOptions } from './use-image-banner';

export const TEST_ID_SLIDER_CONTROLS = 'slider-controls';

const defaultCarouselOptions = {
  draggable: true,
  loop: false,
  startIndex: 0,
  slidesToScroll: 1,
  banners: null,
};

type ImageBannerProps = {
  carouselOptions?: CarouselOptions;
  isPreview?: boolean;
  children: ReactNode;
};

export function ImageBanner({ children, carouselOptions, isPreview = false }: ImageBannerProps): JSX.Element {
  const {
    carouselRef,
    prevBtnEnabled,
    nextBtnEnabled,
    selectedIndex,
    scrollSnaps,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = useImageBanner({ carouselOptions: carouselOptions ?? defaultCarouselOptions });

  return (
    <Main isPreview={isPreview}>
      <Viewport className='embla__viewport' ref={carouselRef}>
        {children}
      </Viewport>
      {!!scrollSnaps?.length && (
        <ButtonsContainer data-testid={TEST_ID_SLIDER_CONTROLS}>
          {!isPreview && <PrevButton enabled={prevBtnEnabled} onClick={scrollPrev} />}
          <DotsContainer>
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={`slider-dot-${uuidv4()}`}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
          </DotsContainer>
          {!isPreview && <NextButton enabled={nextBtnEnabled} onClick={scrollNext} />}
        </ButtonsContainer>
      )}
    </Main>
  );
}
