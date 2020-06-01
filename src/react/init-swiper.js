// eslint-disable-next-line
import SwiperCore from '../../core';
import { needsNavigation, needsPagination, needsScrollbar } from './utils';

function initSwiper({ el, nextEl, prevEl, paginationEl, scrollbarEl }, swiperParams) {
  if (needsNavigation(swiperParams) && nextEl && prevEl) {
    if (swiperParams.navigation === true) {
      swiperParams.navigation = {};
    }
    swiperParams.navigation.nextEl = nextEl;
    swiperParams.navigation.prevEl = prevEl;
  }
  if (needsPagination(swiperParams) && paginationEl) {
    if (swiperParams.pagination === true) {
      swiperParams.pagination = {};
    }
    swiperParams.pagination.el = paginationEl;
  }
  if (needsScrollbar(swiperParams) && scrollbarEl) {
    if (swiperParams.scrollbar === true) {
      swiperParams.scrollbar = {};
    }
    swiperParams.scrollbar.el = scrollbarEl;
  }
  return new SwiperCore(el, swiperParams);
}

export { initSwiper };
