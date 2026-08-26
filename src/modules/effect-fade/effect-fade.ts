import type { SwiperModule } from '../../core/core';
import effectInit from '../../shared/effect-init';
import effectTarget from '../../shared/effect-target';
import effectVirtualTransitionEnd from '../../shared/effect-virtual-transition-end';
import { getSlideTransformEl } from '../../shared/utils';

export type FadeEffectMode = 'default' | 'cross-fade' | 'out-in';

export interface FadeEffectOptions {
  /**
   * Fade transition mode:
   * - `'default'` - only the currently active slide fades out, while the new slide is fully visible beneath it
   * - `'cross-fade'` - both slides fade simultaneously
   * - `'out-in'` - the current slide fades out completely before the new slide starts fading in
   *
   * @default 'default'
   */
  mode?: FadeEffectMode;
  /**
   * Enables slides cross fade
   *
   * @deprecated Use `mode: 'cross-fade'` instead
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

const EffectFade: SwiperModule = ({ swiper, extendParams, on }) => {
  extendParams({
    fadeEffect: {
      crossFade: false,
      mode: 'default',
    },
  });

  // duration of the pending `out-in` transition, passed from setTransition to
  // setTranslate where the incoming slide is known
  let outInDuration = 0;

  function getParams(): FadeEffectParamsRuntime {
    return swiper.params.fadeEffect as FadeEffectParamsRuntime;
  }

  function getMode(): FadeEffectMode {
    const params = getParams();
    if (params.mode === 'default' && params.crossFade) return 'cross-fade';
    return params.mode;
  }

  const setTranslate = (): void => {
    const { slides } = swiper;
    const params = getParams();
    const mode = getMode();
    const outInTransition = mode === 'out-in' && outInDuration > 0;
    const duration = outInDuration;
    outInDuration = 0;
    const targetEls: HTMLElement[] = [];
    const incomingEls: HTMLElement[] = [];
    let hasFadingOut = false;
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
      let slideOpacity: number;
      if (mode === 'cross-fade') {
        slideOpacity = Math.max(1 - Math.abs(slideProgress), 0);
      } else if (mode === 'out-in') {
        slideOpacity = Math.max(1 - 2 * Math.abs(slideProgress), 0);
      } else {
        slideOpacity = 1 + Math.min(Math.max(slideProgress, -1), 0);
      }

      const targetEl = effectTarget(params, slideEl);
      if (outInTransition) {
        const prevOpacity = parseFloat(targetEl.style.opacity);
        if (slideOpacity === 0 && prevOpacity > 0) hasFadingOut = true;
        if (slideOpacity > 0) incomingEls.push(targetEl);
        targetEls.push(targetEl);
      }
      targetEl.style.opacity = String(slideOpacity);
      targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
    }
    if (outInTransition) {
      targetEls.forEach((el) => {
        const delayed = hasFadingOut && incomingEls.includes(el);
        el.style.transitionDuration = `${duration / 2}ms`;
        el.style.transitionDelay = delayed ? `${duration / 2}ms` : '0ms';
      });
      effectVirtualTransitionEnd({
        swiper,
        duration,
        transformElements: incomingEls,
        allSlides: true,
      });
    }
  };
  const setTransition = (duration: number): void => {
    const mode = getMode();
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      if (mode === 'out-in' && duration === 0) el.style.transitionDelay = '';
    });
    if (mode === 'out-in' && duration > 0 && !swiper.params.cssMode) {
      // sequencing (half durations, delay on the incoming slide) and the
      // transitionend listener are set in setTranslate, which runs right after
      // with up-to-date slides progress. Attaching transitionend here to all
      // slides would end the transition when outgoing slides finish at half time
      outInDuration = duration;
      return;
    }

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
