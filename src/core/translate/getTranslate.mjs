import { getTranslate } from '../../shared/utils.mjs';

export default function getSwiperTranslate(axis = this.isHorizontal() ? 'x' : 'y') {
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
