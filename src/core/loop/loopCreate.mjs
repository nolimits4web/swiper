import { elementChildren } from '../../shared/utils.mjs';

export default function loopCreate(slideRealIndex) {
  const swiper = this;
  const { params, slidesEl } = swiper;
  if (!params.loop || (swiper.virtual && swiper.params.virtual.enabled)) return;

  const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);

  slides.forEach((el, index) => {
    el.setAttribute('data-swiper-slide-index', index);
  });

  if (swiper.slides.length % params.slidesPerGroup !== 0) {
    try {
      console.warn(
        'Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)',
      );
    } catch (err) {
      // err
    }
  }

  swiper.loopFix({ slideRealIndex, direction: params.centeredSlides ? undefined : 'next' });
}
