export default function () {
  const swiper = this;
  swiper.realIndex = parseInt(swiper.slides.eq(swiper.activeIndex).attr('data-swiper-slide-index') || swiper.activeIndex, 10);
}
