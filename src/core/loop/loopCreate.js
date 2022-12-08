export default function loopCreate(slideRealIndex) {
  const swiper = this;
  const { params, $slidesEl } = swiper;
  if (!params.loop || (swiper.virtual && swiper.params.virtual.enabled)) return;

  const slides = $slidesEl.children(`.${params.slideClass}, swiper-slide`);

  slides.forEach((el, index) => {
    el.setAttribute('data-swiper-slide-index', index);
  });

  swiper.loopFix(slideRealIndex);
}
