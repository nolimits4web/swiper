import type { Swiper, SwiperOptions } from '../core/core';
import { needsNavigation, needsPagination, needsScrollbar } from './utils';

export interface MountSwiperRefs {
  el: HTMLElement;
  nextEl?: HTMLElement | null;
  prevEl?: HTMLElement | null;
  paginationEl?: HTMLElement | null;
  scrollbarEl?: HTMLElement | null;
  swiper: Swiper;
}

export function mountSwiper(refs: MountSwiperRefs, swiperParams: SwiperOptions): void {
  const { el, nextEl, prevEl, paginationEl, scrollbarEl, swiper } = refs;
  if (needsNavigation(swiperParams) && nextEl && prevEl) {
    const params = swiper.params.navigation as Record<string, unknown>;
    const original = swiper.originalParams.navigation as Record<string, unknown>;
    params.nextEl = nextEl;
    original.nextEl = nextEl;
    params.prevEl = prevEl;
    original.prevEl = prevEl;
  }
  if (needsPagination(swiperParams) && paginationEl) {
    (swiper.params.pagination as Record<string, unknown>).el = paginationEl;
    (swiper.originalParams.pagination as Record<string, unknown>).el = paginationEl;
  }
  if (needsScrollbar(swiperParams) && scrollbarEl) {
    (swiper.params.scrollbar as Record<string, unknown>).el = scrollbarEl;
    (swiper.originalParams.scrollbar as Record<string, unknown>).el = scrollbarEl;
  }
  swiper.init(el);
}
