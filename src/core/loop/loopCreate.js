import $ from '../../shared/dom.js';

export default function loopCreate(slideRealIndex) {
  const swiper = this;
  const { params, $slidesEl } = swiper;
  if (!params.loop || (swiper.virtual && swiper.params.virtual.enabled)) return;

  const slides = $slidesEl.children(`.${params.slideClass}, swiper-slide`);

  slides.each((el, index) => {
    const slide = $(el);
    slide.attr('data-swiper-slide-index', index);
  });

  swiper.loopFix(slideRealIndex);
}
