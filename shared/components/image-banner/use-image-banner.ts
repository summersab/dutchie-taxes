import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel, { EmblaOptionsType, UseEmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

type EmblaViewportRefType = UseEmblaCarouselType[0];
type ButtonScrollEventHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

type Banner = {
  _id: string;
  image: string;
  alt?: string | null;
  link?: string | null;
  position: number;
};

export type CarouselOptions = EmblaOptionsType & { banners: Banner[] | null };

type UseImageBannerParams = {
  carouselOptions: CarouselOptions;
};

type UseImageBannerReturn = {
  carouselRef: EmblaViewportRefType;
  prevBtnEnabled: boolean;
  nextBtnEnabled: boolean;
  selectedIndex: number;
  scrollSnaps: number[] | null;
  scrollPrev: ButtonScrollEventHandler;
  scrollNext: ButtonScrollEventHandler;
  scrollTo: (index: number) => void;
};

export function useImageBanner({ carouselOptions }: UseImageBannerParams): UseImageBannerReturn {
  const autoplay = Autoplay({ delay: 4000, stopOnInteraction: false });

  const [emblaRef, embla] = useEmblaCarousel({ ...carouselOptions, loop: true }, [autoplay]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[] | null>(null);

  const { banners } = carouselOptions;

  const onSelect = useCallback(() => {
    if (!embla) {
      return;
    }

    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) {
      return;
    }

    embla.reInit();
    onSelect();
    const initialScrollSnaps = embla.scrollSnapList();
    setScrollSnaps(initialScrollSnaps.length === 1 ? null : initialScrollSnaps);
    embla.on(`select`, onSelect);
  }, [embla, onSelect, banners]);

  const scrollPrev = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      embla?.scrollPrev();
    },
    [embla]
  );
  const scrollNext = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      embla?.scrollNext();
    },
    [embla]
  );

  const scrollTo = useCallback((index) => embla?.scrollTo(index), [embla]);

  return {
    carouselRef: emblaRef,
    prevBtnEnabled,
    nextBtnEnabled,
    selectedIndex,
    scrollSnaps,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}
