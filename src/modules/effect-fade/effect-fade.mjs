import effectInit from '../../shared/effect-init.mjs';
import effectTarget from '../../shared/effect-target.mjs';
import effectVirtualTransitionEnd from '../../shared/effect-virtual-transition-end.mjs';
import { getSlideTransformEl } from '../../shared/utils.mjs';

export default function EffectFade({ swiper, extendParams, on }) {
  extendParams({
    fadeEffect: {
      crossFade: false,
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
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
    });

    effectVirtualTransitionEnd({ swiper, duration, transformElements, allSlides: true });
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
