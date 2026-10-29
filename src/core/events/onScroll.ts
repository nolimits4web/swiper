import type { Swiper } from '../core';

// Whether the container changed size along the slider since Swiper last measured it, with
// onResize() still to come: the ResizeObserver hands every change to onResize() on the next
// animation frame.
export function isResizePending(swiper: Swiper): boolean {
  const { params, el } = swiper;
  return (
    !!params.updateOnWindowResize &&
    !!params.resizeObserver &&
    typeof window.ResizeObserver !== 'undefined' &&
    (swiper.isHorizontal() ? el.clientWidth : el.clientHeight) !== swiper._clientSize
  );
}

export default function onScroll(this: Swiper): void {
  const swiper = this;
  if (swiper.destroyed) return;
  const { wrapperEl, rtlTranslate, enabled } = swiper;
  if (!enabled) return;
  // In cssMode the scroll position is the slider's state, and a layout change moves it before
  // onResize() has measured the new layout: the browser re-snaps the wrapper onto a slide's new
  // offset, or clamps it when the track can no longer scroll as far. Read against the slide grid
  // from before the change, that position names another slide - and another isEnd - which
  // onResize() would then re-seat the slider onto. Browsers deliver this scroll before or after the
  // ResizeObserver callback, so it is told apart by the size alone and left to onResize(), which
  // re-seats the slider onto the slide it was on.
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
