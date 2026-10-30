import type { Swiper } from '../core';
import { isResizePending } from '../update/updateSize';

export default function onScroll(this: Swiper): void {
  const swiper = this;
  if (swiper.destroyed) return;
  const { wrapperEl, rtlTranslate, enabled } = swiper;
  if (!enabled) return;
  // A resize moves the scroll position (re-snap, clamp) before onResize() measures the new layout;
  // read against the old slide grid it names another slide. Leave it to onResize(), which keeps
  // the slider on its slide. Browsers fire it before or after the ResizeObserver, so check the size.
  if (isResizePending(swiper)) return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  if (swiper.translate === 0) swiper.translate = 0;

  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();

  let newProgress: number;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }

  swiper.emit('setTranslate', swiper.translate, false);
}
