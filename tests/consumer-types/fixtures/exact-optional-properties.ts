import Swiper from 'swiper';
import type { PaginationOptions } from 'swiper/types';

// Explicit undefined should be accepted for optional public options.
new Swiper('.swiper', {
  slidesOffsetBefore: undefined,
  slidesOffsetAfter: undefined,
  initialSlide: undefined,
  speed: undefined,
  direction: undefined,
  modules: undefined,
  pagination: {
    clickable: undefined,
    type: undefined,
  } satisfies PaginationOptions,
  breakpoints: {
    768: {
      slidesOffsetAfter: undefined,
      pagination: {
        clickable: undefined,
      },
    },
  },
});
