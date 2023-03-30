export default function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;
  // eslint-disable-next-line
  const minusOffset = swiper.isElement
    ? swiper.isHorizontal()
      ? swiper.wrapperEl.offsetLeft
      : swiper.wrapperEl.offsetTop
    : 0;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset =
      (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset;
    // Handle abs(translate) > swiper.support.maxPx
    const adjustment = Math.trunc(swiper.translate / swiper.support.maxPx) * swiper.support.maxPx;
    slides[i].swiperSlideOffset -= adjustment;
  }
}
