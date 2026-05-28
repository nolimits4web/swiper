import type { Swiper, SwiperOptions } from '../core/core';

export interface CSSSelector extends String {}

// Single canonical type for module functions. Used as the public type for
// `modules: [Navigation, ...]` arrays and as the internal type for the
// runtime module installer.
export type SwiperModule = (ctx: {
  params: SwiperOptions;
  swiper: Swiper;
  extendParams: (obj: Record<string, any>) => void;
  on: Swiper['on'];
  once: Swiper['once'];
  off: Swiper['off'];
  emit: Swiper['emit'];
}) => void;
