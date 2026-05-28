import type { SwiperModule } from '../../core/core';
import createShadow from '../../shared/create-shadow';
import effectInit from '../../shared/effect-init';
import effectTarget from '../../shared/effect-target';
import effectVirtualTransitionEnd from '../../shared/effect-virtual-transition-end';
import { getRotateFix, getSlideTransformEl } from '../../shared/utils';

export interface CreativeEffectTransform {
  /** Array with translate X, Y and Z values (px or `<n>%`). */
  translate?: (string | number)[];
  /** Array with rotate X, Y and Z values (in deg). */
  rotate?: number[];
  /** Slide opacity. */
  opacity?: number;
  /** Slide scale. */
  scale?: number;
  /** Enables slide shadow. */
  shadow?: boolean;
  /** Transform origin, e.g. `left bottom`. */
  origin?: string;
}

export interface CreativeEffectOptions {
  /**
   * Previous slide transformations.
   */
  prev?: CreativeEffectTransform;
  /**
   * Next slide transformations.
   */
  next?: CreativeEffectTransform;
  /**
   * Limit progress/offset to amount of side slides. If `1`, then all slides
   * after prev/next will share the same state.
   *
   * @default 1
   */
  limitProgress?: number;
  /**
   * Splits shadow "opacity" per slide based on `limitProgress` (only if
   * transformation shadows enabled).
   *
   * @default false
   */
  shadowPerProgress?: boolean;
  /**
   * Allows to multiply slides transformations and opacity.
   *
   * @default 1
   */
  progressMultiplier?: number;
  /**
   * Enable this parameter if your custom transforms require 3D
   * transformations (`translateZ`, `rotateX`, `rotateY`).
   *
   * @default true
   */
  perspective?: boolean;
}

export interface CreativeEffectMethods {}

export interface CreativeEffectEvents {}

type CreativeEffectParamsRuntime = Required<CreativeEffectOptions>;

declare module '../../core/core' {
  interface Swiper {
    creativeEffect: CreativeEffectMethods;
  }
  interface SwiperOptions {
    /**
     * Object with Creative-effect parameters
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   effect: 'creative',
     *   creativeEffect: {
     *     prev: {
     *       // will set `translateZ(-400px)` on previous slides
     *       translate: [0, 0, -400],
     *     },
     *     next: {
     *       // will set `translateX(100%)` on next slides
     *       translate: ['100%', 0, 0],
     *     },
     *   },
     * });
     * ```
     */
    creativeEffect?: CreativeEffectOptions;
  }
  interface SwiperParams {
    creativeEffect?: CreativeEffectOptions;
  }
  interface SwiperEvents extends CreativeEffectEvents {}
}

// Internal shape passed into the per-slide loop. The defaults supplied via
// `extendParams` guarantee these arrays are present at runtime; modelling
// them as `Required` lets us index them without `!`/`?.` noise.
type ResolvedTransform = Required<
  Pick<CreativeEffectTransform, 'translate' | 'rotate' | 'scale' | 'opacity'>
> &
  Pick<CreativeEffectTransform, 'shadow' | 'origin'>;

const EffectCreative: SwiperModule = ({ swiper, extendParams, on }) => {
  extendParams({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: false,
      progressMultiplier: 1,
      perspective: true,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1,
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1,
      },
    },
  });

  function getParams(): CreativeEffectParamsRuntime {
    return swiper.params.creativeEffect as CreativeEffectParamsRuntime;
  }

  const getTranslateValue = (value: string | number): string => {
    if (typeof value === 'string') return value;
    return `${value}px`;
  };

  const setTranslate = (): void => {
    const { slides, wrapperEl, slidesSizesGrid } = swiper;
    const params = getParams();
    const { progressMultiplier: multiplier } = params;

    const isCenteredSlides = swiper.params.centeredSlides;
    const rotateFix = getRotateFix(swiper);

    if (isCenteredSlides) {
      const margin = slidesSizesGrid[0]! / 2 - (swiper.params.slidesOffsetBefore ?? 0);
      wrapperEl.style.transform = `translateX(calc(50% - ${margin}px))`;
    }

    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i]!;
      const slideProgress = slideEl.progress ?? 0;
      const progress = Math.min(
        Math.max(slideProgress, -params.limitProgress),
        params.limitProgress,
      );
      let originalProgress = progress;

      if (!isCenteredSlides) {
        originalProgress = Math.min(
          Math.max(slideEl.originalProgress ?? 0, -params.limitProgress),
          params.limitProgress,
        );
      }

      const offset = slideEl.swiperSlideOffset ?? 0;
      const t: (string | number)[] = [
        swiper.params.cssMode ? -offset - swiper.translate : -offset,
        0,
        0,
      ];
      const r: number[] = [0, 0, 0];
      let custom = false;
      if (!swiper.isHorizontal()) {
        t[1] = t[0]!;
        t[0] = 0;
      }
      let data: ResolvedTransform = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1,
      };
      if (progress < 0) {
        data = params.next as ResolvedTransform;
        custom = true;
      } else if (progress > 0) {
        data = params.prev as ResolvedTransform;
        custom = true;
      }
      // set translate
      t.forEach((value, index) => {
        t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index]!)} * ${Math.abs(
          progress * multiplier,
        )}))`;
      });
      // set rotates
      r.forEach((_value, index) => {
        r[index] = data.rotate[index]! * Math.abs(progress * multiplier);
      });

      slideEl.style.zIndex = String(-Math.abs(Math.round(slideProgress)) + slides.length);

      const translateString = t.join(', ');
      const rotateString = `rotateX(${rotateFix(r[0]!)}deg) rotateY(${rotateFix(
        r[1]!,
      )}deg) rotateZ(${rotateFix(r[2]!)}deg)`;
      const scaleString =
        originalProgress < 0
          ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})`
          : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
      const opacityString =
        originalProgress < 0
          ? 1 + (1 - data.opacity) * originalProgress * multiplier
          : 1 - (1 - data.opacity) * originalProgress * multiplier;
      const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`;

      // Set shadows
      if ((custom && data.shadow) || !custom) {
        let shadowEl = slideEl.querySelector<HTMLElement>('.swiper-slide-shadow');
        if (!shadowEl && data.shadow) {
          shadowEl = createShadow('creative', slideEl);
        }
        if (shadowEl) {
          const shadowOpacity = params.shadowPerProgress
            ? progress * (1 / params.limitProgress)
            : progress;
          shadowEl.style.opacity = String(Math.min(Math.max(Math.abs(shadowOpacity), 0), 1));
        }
      }

      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = transform;
      targetEl.style.opacity = String(opacityString);
      if (data.origin) {
        targetEl.style.transformOrigin = data.origin;
      }
    }
  };

  const setTransition = (duration: number): void => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));

    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll<HTMLElement>('.swiper-slide-shadow').forEach((shadowEl) => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });

    effectVirtualTransitionEnd({ swiper, duration, transformElements, allSlides: true });
  };

  effectInit({
    effect: 'creative',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => getParams().perspective,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode,
    }),
  });
};

export default EffectCreative;
