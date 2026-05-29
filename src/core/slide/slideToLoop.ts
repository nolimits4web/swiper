import type { Swiper } from '../core';

// Grid module tags slide elements with their column index at layout time
// (see src/modules/grid/grid.ts → updateSlide). Read-only here.
interface GridSlideEl extends HTMLElement {
  column?: number;
}

export default function slideToLoop(
  this: Swiper,
  index: number | string = 0,
  speed?: number,
  runCallbacks = true,
  internal?: boolean,
): Swiper | undefined {
  if (typeof index === 'string') {
    const indexAsNumber = parseInt(index, 10);
    index = indexAsNumber;
  }
  const swiper = this;
  if (swiper.destroyed) return;

  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }

  const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows! > 1;
  let newIndex: number = index as number;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual?.enabled) {
      newIndex = newIndex + (swiper.virtual.slidesBefore ?? 0);
    } else {
      let targetSlideIndex: number;
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid!.rows!;
        const targetSlideEl = swiper.slides.find(
          (slideEl) => Number(slideEl.getAttribute('data-swiper-slide-index')) === slideIndex,
        ) as GridSlideEl | undefined;
        targetSlideIndex = targetSlideEl?.column ?? 0;
      } else {
        targetSlideIndex = swiper.getSlideIndexByData(newIndex);
      }

      const cols = gridEnabled
        ? Math.ceil(swiper.slides.length / swiper.params.grid!.rows!)
        : swiper.slides.length;

      const { centeredSlides, slidesOffsetBefore, slidesOffsetAfter } = swiper.params;
      const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
      let slidesPerView: number;
      if (swiper.params.slidesPerView === 'auto') {
        slidesPerView = swiper.slidesPerViewDynamic();
      } else {
        slidesPerView = Math.ceil(parseFloat(String(swiper.params.slidesPerView)));
        if (bothDirections && slidesPerView % 2 === 0) {
          slidesPerView = slidesPerView + 1;
        }
      }
      let needLoopFix = cols - targetSlideIndex < slidesPerView;
      if (bothDirections) {
        needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
      }
      if (internal && bothDirections && swiper.params.slidesPerView !== 'auto' && !gridEnabled) {
        needLoopFix = false;
      }

      if (needLoopFix) {
        const direction: 'prev' | 'next' = bothDirections
          ? targetSlideIndex < swiper.activeIndex
            ? 'prev'
            : 'next'
          : targetSlideIndex - swiper.activeIndex - 1 < (swiper.params.slidesPerView as number)
            ? 'next'
            : 'prev';
        swiper.loopFix({
          direction,
          slideTo: true,
          activeSlideIndex:
            direction === 'next' ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
          slideRealIndex: direction === 'next' ? swiper.realIndex : undefined,
        });
      }

      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid!.rows!;
        const targetSlideEl = swiper.slides.find(
          (slideEl) => Number(slideEl.getAttribute('data-swiper-slide-index')) === slideIndex,
        ) as GridSlideEl | undefined;
        newIndex = targetSlideEl?.column ?? 0;
      } else {
        newIndex = swiper.getSlideIndexByData(newIndex);
      }
    }
  }

  requestAnimationFrame(() => {
    swiper.slideTo(newIndex, speed, runCallbacks, internal);
  });
  return swiper;
}
