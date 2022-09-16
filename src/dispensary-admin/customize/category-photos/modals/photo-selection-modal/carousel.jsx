import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import styled, { css } from 'styled-components';
import { ChevronIcon } from 'src/svg/chevron-icon';

const settings = {
  align: `start`,
  containScroll: `trimSnaps`,
  draggable: true,
  loop: false,
  slidesToScroll: 3,
  speed: 20,
  startIndex: 0,
};

export const EmblaCarousel = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(settings);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  useEffect(() => {
    const onSelect = () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };

    if (emblaApi && children.length > 3) {
      try {
        WheelGesturesPlugin(emblaApi);
      } catch (err) {
        console.error(err);
      }
      emblaApi.on(`select`, onSelect);
      onSelect();
      // eslint-disable-next-line lodash/prefer-noop
      return () => emblaApi.off(`select`, () => {});
    }
    // eslint-disable-next-line lodash/prefer-noop
    return () => {};
  }, [emblaApi]);

  const scrollPrev = useCallback(
    (e) => {
      e.stopPropagation();
      const selectedScrollSnap = emblaApi.selectedScrollSnap();
      const nextRowSnap = selectedScrollSnap - 1;
      const nextScrollSnap = nextRowSnap <= 0 ? 0 : nextRowSnap;
      emblaApi.scrollTo(nextScrollSnap);
    },
    [emblaApi]
  );

  const scrollNext = useCallback(
    (e) => {
      e.stopPropagation();
      const scrollSnapList = emblaApi.scrollSnapList();
      const selectedScrollSnap = emblaApi.selectedScrollSnap();
      const nextRowSnap = selectedScrollSnap + 1;
      const nextScrollSnap = nextRowSnap > scrollSnapList.length ? scrollSnapList.length : nextRowSnap;
      emblaApi.scrollTo(nextScrollSnap);
    },
    [emblaApi]
  );

  return (
    <Embla>
      <Viewport ref={emblaRef}>
        <Container>{children}</Container>
      </Viewport>
      <PrevButton nextBtnEnabled={nextBtnEnabled} onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </Embla>
  );
};

export const PrevButton = ({ enabled, nextBtnEnabled, onClick }) => (
  <ButtonPrev className='--left' disabled={!enabled} nextBtnEnabled={nextBtnEnabled} onClick={onClick}>
    <BackArrow onClick={onClick} width='100%' height='100%' fill='#4F5D68' />
  </ButtonPrev>
);

export const NextButton = ({ enabled, onClick }) => (
  <ButtonNext className='--right' disabled={!enabled} onClick={onClick}>
    <ForwardArrow onClick={onClick} width='100%' height='100%' />
  </ButtonNext>
);

const CircleArrowStyles = css`
  height: 12px;
  width: 19px;
`;

const Embla = styled.div`
  position: relative;
  width: 715px;
`;

const Viewport = styled.div`
  overflow: hidden;
  padding: 20px 0;

  &.is-draggable {
    cursor: move;
    cursor: grab;
  }

  &.is-dragging {
    cursor: grabbing;
  }
`;

const Container = styled.div`
  display: flex;
  will-change: transform;
`;

const CircleContainer = css`
  border-radius: 50%;
  height: 54px;
  width: 54px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.17);
`;

const sharedButtonStyles = css`
  display: none;
  background-color: #f3f6f8;
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  outline: 0;
  border-radius: 35px;
  border: 0;
  width: 54px;
  height: 54px;
  cursor: pointer;
  display: block;
  :disabled {
    display: none;
  }
  :hover {
    background-color: #bccad2;
  }
  svg {
    margin-top: 5px;
  }
  ${CircleContainer}
`;

const ButtonPrev = styled.button`
  ${sharedButtonStyles}
  left: -59px;
`;

const ButtonNext = styled.button`
  ${sharedButtonStyles}
  right: -59px
`;

const ForwardArrow = styled(ChevronIcon)`
  transform: rotate(-90deg);
  margin-left: 3px;
  ${CircleArrowStyles}
`;

const BackArrow = styled(ChevronIcon)`
  transform: rotate(90deg);
  margin-left: -3px;
  ${CircleArrowStyles}
`;
