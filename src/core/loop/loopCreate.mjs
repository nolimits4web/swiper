import { elementChildren } from '../../shared/utils.mjs';

export default function loopCreate(slideRealIndex) {
  const swiper = this;
  const { params, slidesEl } = swiper;
  if (!params.loop || (swiper.virtual && swiper.params.virtual.enabled)) return;

  const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);

  slides.forEach((el, index) => {
    el.setAttribute('data-swiper-slide-index', index);
  });

  swiper.loopFix({ slideRealIndex, direction: params.centeredSlides ? undefined : 'next' });
}
