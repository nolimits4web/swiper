import { elementChildren, nextTick } from '../../shared/utils';
import type { Swiper } from '../core';

export default function slideToClickedSlide(this: Swiper): void {
  const swiper = this;
  if (swiper.destroyed) return;
  const { params, slidesEl, clickedSlide, clickedIndex } = swiper;
  if (clickedSlide === undefined || clickedIndex === undefined) return;

  const slidesPerView =
    params.slidesPerView === 'auto'
      ? swiper.slidesPerViewDynamic()
      : (params.slidesPerView as number);
  let slideToIndex = swiper.getSlideIndexWhenGrid(clickedIndex);

  let realIndex: number;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  const isGrid = swiper.grid && swiper.params.grid && swiper.params.grid.rows! > 1;
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt(clickedSlide.getAttribute('data-swiper-slide-index')!, 10);
    if (params.centeredSlides) {
      swiper.slideToLoop(realIndex);
    } else if (
      slideToIndex >
      (isGrid
        ? (swiper.slides.length - slidesPerView) / 2 - (swiper.params.grid!.rows! - 1)
        : swiper.slides.length - slidesPerView)
    ) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex(
        elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]!,
      );

      nextTick(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}
