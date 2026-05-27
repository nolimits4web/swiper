import type { SwiperModuleFn } from '../../core/core';
import { elementChildren } from '../../shared/utils';

export interface ParallaxOptions {
  /**
   * Enable, if you want to use "parallaxed" elements inside of slider
   *
   * @default false
   */
  enabled?: boolean;
}

export interface ParallaxMethods {}

export interface ParallaxEvents {}

// All ParallaxOptions fields are optional in the public type, but extendParams
// fills them in at module init time. Use this view internally to access defaults
// without proliferating `!` non-null assertions through the module.
type ParallaxParamsRuntime = Required<ParallaxOptions>;

declare module '../../core/core' {
  interface Swiper {
    parallax: ParallaxMethods;
  }
  interface SwiperOptions {
    /**
     * Object with parallax parameters or boolean `true` to enable with default settings.
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   parallax: true,
     * });
     * ```
     */
    parallax?: ParallaxOptions | boolean;
  }
  interface SwiperParams {
    parallax?: ParallaxOptions;
  }
  interface SwiperEvents extends ParallaxEvents {}
}

// Slides annotated with progress get a runtime numeric field. Slides without
// the annotation read undefined; the runtime treats that as "skip".
interface ParallaxSlide extends HTMLElement {
  progress?: number;
}

const Parallax: SwiperModuleFn = ({ swiper, extendParams, on }) => {
  extendParams({
    parallax: {
      enabled: false,
    },
  });

  swiper.parallax = {};

  function getParams(): ParallaxParamsRuntime {
    return swiper.params.parallax as ParallaxParamsRuntime;
  }

  const elementsSelector =
    '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]';

  const setTransform = (el: HTMLElement, progress: number): void => {
    const { rtl } = swiper;

    const rtlFactor = rtl ? -1 : 1;

    const p = el.getAttribute('data-swiper-parallax') || '0';
    let x = el.getAttribute('data-swiper-parallax-x');
    let y = el.getAttribute('data-swiper-parallax-y');
    const scale = el.getAttribute('data-swiper-parallax-scale');
    const opacity = el.getAttribute('data-swiper-parallax-opacity');
    const rotate = el.getAttribute('data-swiper-parallax-rotate');

    if (x || y) {
      x = x || '0';
      y = y || '0';
    } else if (swiper.isHorizontal()) {
      x = p;
      y = '0';
    } else {
      y = p;
      x = '0';
    }

    if (x.indexOf('%') >= 0) {
      x = `${parseInt(x, 10) * progress * rtlFactor}%`;
    } else {
      x = `${Number(x) * progress * rtlFactor}px`;
    }
    if (y.indexOf('%') >= 0) {
      y = `${parseInt(y, 10) * progress}%`;
    } else {
      y = `${Number(y) * progress}px`;
    }

    if (typeof opacity !== 'undefined' && opacity !== null) {
      const opacityNum = Number(opacity);
      const currentOpacity = opacityNum - (opacityNum - 1) * (1 - Math.abs(progress));
      el.style.opacity = String(currentOpacity);
    }
    let transform = `translate3d(${x}, ${y}, 0px)`;
    if (typeof scale !== 'undefined' && scale !== null) {
      const scaleNum = Number(scale);
      const currentScale = scaleNum - (scaleNum - 1) * (1 - Math.abs(progress));
      transform += ` scale(${currentScale})`;
    }
    if (rotate && typeof rotate !== 'undefined' && rotate !== null) {
      const currentRotate = Number(rotate) * progress * -1;
      transform += ` rotate(${currentRotate}deg)`;
    }
    el.style.transform = transform;
  };

  const setTranslate = (): void => {
    const { el, slides, progress, snapGrid } = swiper;
    const elements = elementChildren(el, elementsSelector);
    if (swiper.isElement) {
      elements.push(...elementChildren(swiper.hostEl, elementsSelector));
    }
    elements.forEach((subEl) => {
      setTransform(subEl as HTMLElement, progress);
    });

    slides.forEach((slideEl, slideIndex) => {
      let slideProgress = (slideEl as ParallaxSlide).progress ?? 0;
      const slidesPerGroup = swiper.params.slidesPerGroup ?? 1;
      if (slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
      }
      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      slideEl
        .querySelectorAll<HTMLElement>(`${elementsSelector}, [data-swiper-parallax-rotate]`)
        .forEach((subEl) => {
          setTransform(subEl, slideProgress);
        });
    });
  };

  const setTransition = (duration: number = swiper.params.speed ?? 300): void => {
    const { el, hostEl } = swiper;
    const elements = [...el.querySelectorAll<HTMLElement>(elementsSelector)];
    if (swiper.isElement) {
      elements.push(...hostEl.querySelectorAll<HTMLElement>(elementsSelector));
    }
    elements.forEach((parallaxEl) => {
      const attr = parallaxEl.getAttribute('data-swiper-parallax-duration');
      let parallaxDuration = (attr ? parseInt(attr, 10) : 0) || duration;
      if (duration === 0) parallaxDuration = 0;
      parallaxEl.style.transitionDuration = `${parallaxDuration}ms`;
    });
  };

  on('beforeInit', () => {
    if (!getParams().enabled) return;
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
  });
  on('init', () => {
    if (!getParams().enabled) return;
    setTranslate();
  });
  on('setTranslate', () => {
    if (!getParams().enabled) return;
    setTranslate();
  });
  on('setTransition', (_swiper, duration) => {
    if (!getParams().enabled) return;
    setTransition(duration);
  });
};

export default Parallax;
