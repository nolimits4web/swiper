import { createContext, useContext } from 'react';

import type { Swiper as SwiperClass } from '../core/core';

export interface SwiperSlideData {
  isActive: boolean;
  isVisible: boolean;
  isFullyVisible: boolean;
  isPrev: boolean;
  isNext: boolean;
}

export const SwiperSlideContext = createContext<SwiperSlideData | null>(null);

export const useSwiperSlide = (): SwiperSlideData | null => useContext(SwiperSlideContext);

export const SwiperContext = createContext<SwiperClass | null>(null);

export const useSwiper = (): SwiperClass | null => useContext(SwiperContext);
