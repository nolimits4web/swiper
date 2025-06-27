import { elementChildren, nextTick } from '../../shared/utils.mjs';

export default function slideToClickedSlide() {
  const swiper = this;
  if (swiper.destroyed) return;
  const { params, slidesEl } = swiper;

  const slidesPerView =
    params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.clickedIndex;

  let realIndex;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  const isGrid = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      if (
        slideToIndex < swiper.loopedSlides - slidesPerView / 2 ||
        slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2
      ) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(
          elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0],
        );

        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (
      slideToIndex > isGrid
        ? (swiper.slides.length - slidesPerView) / 2 - (swiper.params.grid.rows - 1)
        : swiper.slides.length - slidesPerView
    ) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex(
        elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0],
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
