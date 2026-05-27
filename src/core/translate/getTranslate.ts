import { getTranslate } from '../../shared/utils';
import type { Swiper } from '../core';

export default function getSwiperTranslate(
  this: Swiper,
  axis: 'x' | 'y' = this.isHorizontal() ? 'x' : 'y',
): number {
  const swiper = this;

  const { params, rtlTranslate: rtl, translate, wrapperEl } = swiper;

  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }
  if (params.cssMode) {
    return translate;
  }

  let currentTranslate = getTranslate(wrapperEl, axis);
  currentTranslate += swiper.cssOverflowAdjustment();
  if (rtl) currentTranslate = -currentTranslate;

  return currentTranslate || 0;
}
