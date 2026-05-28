import type { Swiper } from '../core';

export default function onResize(this: Swiper): void {
  const swiper = this;

  const { params, el } = swiper;

  if (el && el.offsetWidth === 0) return;

  // Breakpoints
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }

  // Save locks
  const { allowSlideNext, allowSlidePrev, snapGrid } = swiper;

  const isVirtual = swiper.virtual && swiper.params.virtual?.enabled;

  // Disable locks on resize
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;

  swiper.updateSize();
  swiper.updateSlides();

  swiper.updateSlidesClasses();
  const isVirtualLoop = isVirtual && params.loop;
  if (
    (params.slidesPerView === 'auto' || (params.slidesPerView as number) > 1) &&
    swiper.isEnd &&
    !swiper.isBeginning &&
    !swiper.params.centeredSlides &&
    !isVirtualLoop
  ) {
    const slidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    swiper.slideTo(slidesLength - 1, 0, false, true);
  } else {
    if (swiper.params.loop && !isVirtual) {
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }

  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    type AutoplayResize = { resizeTimeout?: ReturnType<typeof setTimeout> };
    const autoplay = swiper.autoplay as typeof swiper.autoplay & AutoplayResize;
    clearTimeout(autoplay.resizeTimeout);
    autoplay.resizeTimeout = setTimeout(() => {
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }, 500);
  }
  // Return locks after resize
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;

  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}
