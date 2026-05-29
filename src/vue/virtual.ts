import { h, type Ref, type VNode } from 'vue';

import type { Swiper as SwiperClass } from '../core/core';

export interface VueVirtualData {
  from: number;
  to: number;
  offset: number;
}

interface ComponentOptionsLegacy {
  tag?: string;
  children?: VNode[];
  Ctor?: unknown;
}

interface VNodeWithLegacy extends VNode {
  componentOptions?: ComponentOptionsLegacy;
}

interface VNodeProps {
  style?: Record<string, string>;
  swiperRef?: Ref<SwiperClass | null>;
  [key: string]: unknown;
}

export function renderVirtual(
  swiperRef: Ref<SwiperClass | null>,
  slides: VNodeWithLegacy[],
  virtualData: VueVirtualData | null,
): Array<VNode | undefined> | null {
  if (!virtualData) return null;
  const swiper = swiperRef.value;
  if (!swiper) return null;

  const getSlideIndex = (index: number): number => {
    let slideIndex = index;
    if (index < 0) {
      slideIndex = slides.length + index;
    } else if (slideIndex >= slides.length) {
      slideIndex -= slides.length;
    }
    return slideIndex;
  };

  const style: Record<string, string> = swiper.isHorizontal()
    ? { [swiper.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px` }
    : { top: `${virtualData.offset}px` };
  const { from, to } = virtualData;
  const loopFrom = swiper.params.loop ? -slides.length : 0;
  const loopTo = swiper.params.loop ? slides.length * 2 : slides.length;
  const slidesToRender: VNodeWithLegacy[] = [];
  for (let i = loopFrom; i < loopTo; i += 1) {
    if (i >= from && i <= to && slidesToRender.length < slides.length) {
      const slide = slides[getSlideIndex(i)];
      if (slide) slidesToRender.push(slide);
    }
  }
  return slidesToRender.map((slide) => {
    const props = (slide.props ?? {}) as VNodeProps;
    props.style = props.style ?? {};
    props.swiperRef = swiperRef;
    props.style = style;
    slide.props = props;
    if (slide.type) {
      return h(slide.type as never, { ...props }, slide.children as never);
    }
    if (slide.componentOptions) {
      return h(
        slide.componentOptions.Ctor as never,
        { ...props },
        slide.componentOptions.children as never,
      );
    }
    return undefined;
  });
}
