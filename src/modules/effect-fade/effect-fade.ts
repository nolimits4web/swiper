import type { SwiperModuleFn } from '../../core/core';
import effectInit from '../../shared/effect-init';
import effectTarget from '../../shared/effect-target';
import effectVirtualTransitionEnd from '../../shared/effect-virtual-transition-end';
import { getSlideTransformEl } from '../../shared/utils';

export interface FadeEffectOptions {
  /**
   * Enables slides cross fade
   *
   * @default false
   */
  crossFade?: boolean;
}

export interface FadeEffectMethods {}

export interface FadeEffectEvents {}

type FadeEffectParamsRuntime = Required<FadeEffectOptions>;

declare module '../../core/core' {
  interface Swiper {
    fadeEffect: FadeEffectMethods;
  }
  interface SwiperOptions {
    /**
     * Object with Fade-effect parameters
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   effect: 'fade',
     *   fadeEffect: {
     *     crossFade: true
     *   },
     * });
     * ```
     */
    fadeEffect?: FadeEffectOptions;
  }
  interface SwiperParams {
    fadeEffect?: FadeEffectOptions;
  }
  interface SwiperEvents extends FadeEffectEvents {}
}

const EffectFade: SwiperModuleFn = ({ swiper, extendParams, on }) => {
  extendParams({
    fadeEffect: {
      crossFade: false,
    },
  });

  function getParams(): FadeEffectParamsRuntime {
    return swiper.params.fadeEffect as FadeEffectParamsRuntime;
  }

  const setTranslate = (): void => {
    const { slides } = swiper;
    const params = getParams();
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i]!;
      const offset = slideEl.swiperSlideOffset ?? 0;
      let tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideProgress = slideEl.progress ?? 0;
      const slideOpacity = params.crossFade
        ? Math.max(1 - Math.abs(slideProgress), 0)
        : 1 + Math.min(Math.max(slideProgress, -1), 0);

      const targetEl = effectTarget(params, slideEl);
      targetEl.style.opacity = String(slideOpacity);
      targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
    }
  };
  const setTransition = (duration: number): void => {
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
};

export default EffectFade;
