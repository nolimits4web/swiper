import createShadow from '../../shared/create-shadow.mjs';
import effectInit from '../../shared/effect-init.mjs';
import effectTarget from '../../shared/effect-target.mjs';
import effectVirtualTransitionEnd from '../../shared/effect-virtual-transition-end.mjs';
import { getSlideTransformEl } from '../../shared/utils.mjs';

export default function EffectFlip({ swiper, extendParams, on }) {
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
    },
  });

  const createSlideShadows = (slideEl, progress) => {
    let shadowBefore = swiper.isHorizontal()
      ? slideEl.querySelector('.swiper-slide-shadow-left')
      : slideEl.querySelector('.swiper-slide-shadow-top');
    let shadowAfter = swiper.isHorizontal()
      ? slideEl.querySelector('.swiper-slide-shadow-right')
      : slideEl.querySelector('.swiper-slide-shadow-bottom');
    if (!shadowBefore) {
      shadowBefore = createShadow('flip', slideEl, swiper.isHorizontal() ? 'left' : 'top');
    }
    if (!shadowAfter) {
      shadowAfter = createShadow('flip', slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };

  const recreateShadows = () => {
    // Set shadows
    const params = swiper.params.flipEffect;
    swiper.slides.forEach((slideEl) => {
      let progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      createSlideShadows(slideEl, progress, params);
    });
  };

  const setTranslate = () => {
    const { slides, rtlTranslate: rtl } = swiper;
    const params = swiper.params.flipEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      let progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      const offset = slideEl.swiperSlideOffset;
      const rotate = -180 * progress;
      let rotateY = rotate;
      let rotateX = 0;
      let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }

      slideEl.style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

      if (params.slideShadows) {
        createSlideShadows(slideEl, progress, params);
      }
      const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = transform;
    }
  };

  const setTransition = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));

    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll(
        '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
      ).forEach((shadowEl) => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });

    effectVirtualTransitionEnd({ swiper, duration, transformElements });
  };

  effectInit({
    effect: 'flip',
    swiper,
    on,
    setTranslate,
    setTransition,
    recreateShadows,
    getEffectParams: () => swiper.params.flipEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode,
    }),
  });
}
