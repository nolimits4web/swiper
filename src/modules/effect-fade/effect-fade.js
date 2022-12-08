import effectInit from '../../shared/effect-init.js';
import effectTarget from '../../shared/effect-target.js';
import effectVirtualTransitionEnd from '../../shared/effect-virtual-transition-end.js';
import { findElementsInElements } from '../../shared/utils.js';

export default function EffectFade({ swiper, extendParams, on }) {
  extendParams({
    fadeEffect: {
      crossFade: false,
      transformEl: null,
    },
  });

  const setTranslate = () => {
    const { slides } = swiper;
    const params = swiper.params.fadeEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = swiper.slides[i];
      const offset = slideEl.swiperSlideOffset;
      let tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = swiper.params.fadeEffect.crossFade
        ? Math.max(1 - Math.abs(slideEl.progress), 0)
        : 1 + Math.min(Math.max(slideEl.progress, -1), 0);

      const targetEl = effectTarget(params, slideEl);
      targetEl.style.opacity = slideOpacity;
      targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
    }
  };
  const setTransition = (duration) => {
    const { transformEl } = swiper.params.fadeEffect;

    const transitionElements = transformEl
      ? findElementsInElements(swiper.slides, transformEl)
      : swiper.slides;
    transitionElements.forEach((el) => {
      el.style.transition = `${duration}ms`;
    });

    effectVirtualTransitionEnd({ swiper, duration, transformEl, allSlides: true });
  };

  effectInit({
    effect: 'fade',
    swiper,
    on,
    setTranslate,
    setTransition,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode,
    }),
  });
}
