import { inject, type ComputedRef, type Ref } from 'vue';

import type { Swiper as SwiperClass } from '../core/core';

export interface VueSwiperSlideData {
  isActive: boolean;
  isVisible: boolean;
  isPrev: boolean;
  isNext: boolean;
}

export const useSwiperSlide = (): ComputedRef<VueSwiperSlideData> | undefined =>
  inject<ComputedRef<VueSwiperSlideData>>('swiperSlide');

export const useSwiper = (): Ref<SwiperClass | null> | undefined =>
  inject<Ref<SwiperClass | null>>('swiper');
