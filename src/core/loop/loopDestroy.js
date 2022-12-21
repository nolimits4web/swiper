export default function loopDestroy() {
  const swiper = this;
  const { slides, params, slidesEl } = swiper;
  if (!params.loop || (swiper.virtual && swiper.params.virtual.enabled)) return;
  swiper.recalcSlides();

  const newSlidesOrder = [];
  slides.forEach((slideEl) => {
    const index =
      typeof slideEl.swiperSlideIndex === 'undefined'
        ? slideEl.getAttribute('data-swiper-slide-index') * 1
        : slideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  });
  slides.forEach((slideEl) => {
    slideEl.removeAttribute('data-swiper-slide-index');
  });
  newSlidesOrder.forEach((slideEl) => {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}
