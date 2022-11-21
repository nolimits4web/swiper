export default function appendSlide(slides) {
  const swiper = this;
  const { params, $slidesEl } = swiper;

  if (params.loop) {
    swiper.loopDestroy();
  }
  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) $slidesEl.append(slides[i]);
    }
  } else {
    $slidesEl.append(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer) {
    swiper.update();
  }
}
