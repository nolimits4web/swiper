export default function appendSlide(slides) {
  const swiper = this;
  const { $wrapperEl, params } = swiper;
  if (params.loop) {
    swiper.loopDestroy();
  }
  const _slides = typeof slides === 'object' && 'length' in slides ? slides : [slides];
  _slides.map((slide) => $wrapperEl.append(slide));

  if (params.loop) {
    swiper.loopCreate();
  }
  if (!(params.observer && swiper.support.observer)) {
    swiper.update();
  }
}
