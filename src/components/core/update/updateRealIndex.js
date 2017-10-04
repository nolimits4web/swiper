export default function () {
  const swiper = this;
  const previousRealIndex = swiper.realIndex;
  swiper.realIndex = parseInt(swiper.slides.eq(swiper.activeIndex).attr('data-swiper-slide-index') || swiper.activeIndex, 10);
  if (previousRealIndex !== swiper.realIndex) {
    swiper.emit('realIndexChange');
  }
}
