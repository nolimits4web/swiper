import type { SwiperModule } from '../../core/core';
import createShadow from '../../shared/create-shadow';
import effectInit from '../../shared/effect-init';
import effectTarget from '../../shared/effect-target';
import effectVirtualTransitionEnd from '../../shared/effect-virtual-transition-end';
import { getRotateFix, getSlideTransformEl } from '../../shared/utils';

export interface FlipEffectOptions {
  /**
   * Enables slides shadows
   *
   * @default true
   */
  slideShadows?: boolean;
  /**
   * Limit edge slides rotation
   *
   * @default true
   */
  limitRotation?: boolean;
}

export interface FlipEffectMethods {}

export interface FlipEffectEvents {}

type FlipEffectParamsRuntime = Required<FlipEffectOptions>;

declare module '../../core/core' {
  interface Swiper {
    flipEffect: FlipEffectMethods;
  }
  interface SwiperOptions {
    /**
     * Object with Flip-effect parameters
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   effect: 'flip',
     *   flipEffect: {
     *     slideShadows: false,
     *   },
     * });
     * ```
     */
    flipEffect?: FlipEffectOptions;
  }
  interface SwiperParams {
    flipEffect?: FlipEffectOptions;
  }
  interface SwiperEvents extends FlipEffectEvents {}
}

const EffectFlip: SwiperModule = ({ swiper, extendParams, on }) => {
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
    },
  });

  function getParams(): FlipEffectParamsRuntime {
    return swiper.params.flipEffect as FlipEffectParamsRuntime;
  }

  const createSlideShadows = (slideEl: HTMLElement, progress: number): void => {
    let shadowBefore = swiper.isHorizontal()
      ? slideEl.querySelector<HTMLElement>('.swiper-slide-shadow-left')
      : slideEl.querySelector<HTMLElement>('.swiper-slide-shadow-top');
    let shadowAfter = swiper.isHorizontal()
      ? slideEl.querySelector<HTMLElement>('.swiper-slide-shadow-right')
      : slideEl.querySelector<HTMLElement>('.swiper-slide-shadow-bottom');
    if (!shadowBefore) {
      shadowBefore = createShadow('flip', slideEl, swiper.isHorizontal() ? 'left' : 'top');
    }
    if (!shadowAfter) {
      shadowAfter = createShadow('flip', slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
    }
    if (shadowBefore) shadowBefore.style.opacity = String(Math.max(-progress, 0));
    if (shadowAfter) shadowAfter.style.opacity = String(Math.max(progress, 0));
  };

  const recreateShadows = (): void => {
    // Set shadows
    const params = getParams();
    swiper.slides.forEach((slideEl) => {
      let progress = slideEl.progress ?? 0;
      if (params.limitRotation) {
        progress = Math.max(Math.min(progress, 1), -1);
      }
      createSlideShadows(slideEl, progress);
    });
  };

  const setTranslate = (): void => {
    const { slides, rtlTranslate: rtl } = swiper;
    const params = getParams();
    const rotateFix = getRotateFix(swiper);
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i]!;
      let progress = slideEl.progress ?? 0;
      if (params.limitRotation) {
        progress = Math.max(Math.min(progress, 1), -1);
      }
      const offset = slideEl.swiperSlideOffset ?? 0;
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

      slideEl.style.zIndex = String(-Math.abs(Math.round(progress)) + slides.length);

      if (params.slideShadows) {
        createSlideShadows(slideEl, progress);
      }
      const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateFix(
        rotateX,
      )}deg) rotateY(${rotateFix(rotateY)}deg)`;
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = transform;
    }
  };

  const setTransition = (duration: number): void => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));

    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll<HTMLElement>(
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
};

export default EffectFlip;
