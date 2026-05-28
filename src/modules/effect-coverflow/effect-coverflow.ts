import type { SwiperModule } from '../../core/core';
import createShadow from '../../shared/create-shadow';
import effectInit from '../../shared/effect-init';
import effectTarget from '../../shared/effect-target';
import { getRotateFix, getSlideTransformEl } from '../../shared/utils';

export interface CoverflowEffectOptions {
  /**
   * Enables slides shadows
   *
   * @default true
   */
  slideShadows?: boolean;
  /**
   * Slide rotate in degrees
   *
   * @default 50
   */
  rotate?: number;
  /**
   * Stretch space between slides
   *
   * - a number is interpreted as pixels (e.g., `20` for 20px).
   * - a string with a percentage (e.g., `"50%"`).
   *
   * @default 0
   */
  stretch?: number | `${number}%`;
  /**
   * Depth offset in px (slides translate in Z axis)
   *
   * @default 100
   */
  depth?: number;
  /**
   * Slide scale effect
   *
   * @default 1
   */
  scale?: number;
  /**
   * Effect multiplier. A number is multiplied with the slide's normalized
   * offset from center; a function receives that offset and returns the
   * resulting multiplier.
   *
   * @default 1
   */
  modifier?: number | ((centerOffset: number) => number);
}

export interface CoverflowEffectMethods {}

export interface CoverflowEffectEvents {}

type CoverflowEffectParamsRuntime = Required<CoverflowEffectOptions>;

declare module '../../core/core' {
  interface Swiper {
    coverflowEffect: CoverflowEffectMethods;
  }
  interface SwiperOptions {
    /**
     * Object with Coverflow-effect parameters.
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   effect: 'coverflow',
     *   coverflowEffect: {
     *     rotate: 30,
     *     slideShadows: false,
     *   },
     * });
     * ```
     */
    coverflowEffect?: CoverflowEffectOptions;
  }
  interface SwiperParams {
    coverflowEffect?: CoverflowEffectOptions;
  }
  interface SwiperEvents extends CoverflowEffectEvents {}
}

const EffectCoverflow: SwiperModule = ({ swiper, extendParams, on }) => {
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true,
    },
  });

  function getParams(): CoverflowEffectParamsRuntime {
    return swiper.params.coverflowEffect as CoverflowEffectParamsRuntime;
  }

  const setTranslate = (): void => {
    const { width: swiperWidth, height: swiperHeight, slides, slidesSizesGrid } = swiper;
    const params = getParams();
    const isHorizontal = swiper.isHorizontal();
    const transform = swiper.translate;
    const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    const rotate = isHorizontal ? params.rotate : -params.rotate;
    const translate = params.depth;
    const r = getRotateFix(swiper);
    // Each slide offset from center
    for (let i = 0, length = slides.length; i < length; i += 1) {
      const slideEl = slides[i]!;
      const slideSize = slidesSizesGrid[i]!;
      const slideOffset = slideEl.swiperSlideOffset ?? 0;
      const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
      const offsetMultiplier =
        typeof params.modifier === 'function'
          ? params.modifier(centerOffset)
          : centerOffset * params.modifier;

      let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      // var rotateZ = 0
      let translateZ = -translate * Math.abs(offsetMultiplier);

      let stretch: number =
        typeof params.stretch === 'string' && params.stretch.indexOf('%') !== -1
          ? (parseFloat(params.stretch) / 100) * slideSize
          : (params.stretch as number);

      let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      let translateX = isHorizontal ? stretch * offsetMultiplier : 0;

      let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) translateX = 0;
      if (Math.abs(translateY) < 0.001) translateY = 0;
      if (Math.abs(translateZ) < 0.001) translateZ = 0;
      if (Math.abs(rotateY) < 0.001) rotateY = 0;
      if (Math.abs(rotateX) < 0.001) rotateX = 0;
      if (Math.abs(scale) < 0.001) scale = 0;

      const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${r(
        rotateX,
      )}deg) rotateY(${r(rotateY)}deg) scale(${scale})`;
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = slideTransform;

      slideEl.style.zIndex = String(-Math.abs(Math.round(offsetMultiplier)) + 1);

      if (params.slideShadows) {
        // Set shadows
        let shadowBeforeEl = isHorizontal
          ? slideEl.querySelector<HTMLElement>('.swiper-slide-shadow-left')
          : slideEl.querySelector<HTMLElement>('.swiper-slide-shadow-top');
        let shadowAfterEl = isHorizontal
          ? slideEl.querySelector<HTMLElement>('.swiper-slide-shadow-right')
          : slideEl.querySelector<HTMLElement>('.swiper-slide-shadow-bottom');
        if (!shadowBeforeEl) {
          shadowBeforeEl = createShadow('coverflow', slideEl, isHorizontal ? 'left' : 'top');
        }
        if (!shadowAfterEl) {
          shadowAfterEl = createShadow('coverflow', slideEl, isHorizontal ? 'right' : 'bottom');
        }
        if (shadowBeforeEl)
          shadowBeforeEl.style.opacity = String(offsetMultiplier > 0 ? offsetMultiplier : 0);
        if (shadowAfterEl)
          shadowAfterEl.style.opacity = String(-offsetMultiplier > 0 ? -offsetMultiplier : 0);
      }
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
  };

  effectInit({
    effect: 'coverflow',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true,
    }),
  });
};

export default EffectCoverflow;
