import type { Swiper } from './swiper.d.ts';

export interface CSSSelector extends String {}

export type SwiperModule = (options: {
  params: Swiper['params'];
  swiper: Swiper;
  extendParams: (obj: { [name: string]: any }) => void;
  on: Swiper['on'];
  once: Swiper['once'];
  off: Swiper['off'];
  emit: Swiper['emit'];
}) => void;
