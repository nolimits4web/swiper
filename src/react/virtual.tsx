import React, { type CSSProperties, type ReactElement } from 'react';
import type { Swiper as SwiperClass } from '../core/core';
import type { ChildWithProps } from './get-children';

export interface VirtualData {
  from: number;
  to: number;
  offset: number;
}

export function renderVirtual(
  swiper: SwiperClass | null,
  slides: ChildWithProps[],
  virtualData: VirtualData | null,
): ReactElement[] | null {
  if (!virtualData || !swiper) return null;

  const getSlideIndex = (index: number): number => {
    let slideIndex = index;
    if (index < 0) {
      slideIndex = slides.length + index;
    } else if (slideIndex >= slides.length) {
      slideIndex -= slides.length;
    }
    return slideIndex;
  };

  const style: CSSProperties = swiper.isHorizontal()
    ? {
        [swiper.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`,
      }
    : {
        top: `${virtualData.offset}px`,
      };
  const { from, to } = virtualData;
  const loopFrom = swiper.params.loop ? -slides.length : 0;
  const loopTo = swiper.params.loop ? slides.length * 2 : slides.length;
  const slidesToRender: ChildWithProps[] = [];
  for (let i = loopFrom; i < loopTo; i += 1) {
    if (i >= from && i <= to) {
      const slide = slides[getSlideIndex(i)];
      if (slide) slidesToRender.push(slide);
    }
  }
  return slidesToRender.map((child, index) => {
    const virtualIndex = child.props.virtualIndex as string | number | undefined;
    return React.cloneElement(child, {
      swiper,
      style,
      key: virtualIndex || child.key || `slide-${index}`,
    });
  });
}
