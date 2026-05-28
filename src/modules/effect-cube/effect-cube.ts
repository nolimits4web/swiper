import type { SwiperModule } from '../../core/core';
import effectInit from '../../shared/effect-init';
import { createElement, getRotateFix } from '../../shared/utils';

export interface CubeEffectOptions {
  /**
   * Enables slides shadows
   *
   * @default true
   */
  slideShadows?: boolean;
  /**
   * Enables main slider shadow
   *
   * @default true
   */
  shadow?: boolean;
  /**
   * Main shadow offset in px
   *
   * @default 20
   */
  shadowOffset?: number;
  /**
   * Main shadow scale ratio
   *
   * @default 0.94
   */
  shadowScale?: number;
}

export interface CubeEffectMethods {}

export interface CubeEffectEvents {}

type CubeEffectParamsRuntime = Required<CubeEffectOptions>;

declare module '../../core/core' {
  interface Swiper {
    cubeEffect: CubeEffectMethods;
  }
  interface SwiperOptions {
    /**
     * Object with Cube-effect parameters
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   effect: 'cube',
     *   cubeEffect: {
     *     slideShadows: false,
     *   },
     * });
     * ```
     */
    cubeEffect?: CubeEffectOptions;
  }
  interface SwiperParams {
    cubeEffect?: CubeEffectOptions;
  }
  interface SwiperEvents extends CubeEffectEvents {}
}

const EffectCube: SwiperModule = ({ swiper, extendParams, on }) => {
  extendParams({
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  });

  function getParams(): CubeEffectParamsRuntime {
    return swiper.params.cubeEffect as CubeEffectParamsRuntime;
  }

  const createSlideShadows = (
    slideEl: HTMLElement,
    progress: number,
    isHorizontal: boolean,
  ): void => {
    let shadowBefore = isHorizontal
      ? slideEl.querySelector<HTMLElement>('.swiper-slide-shadow-left')
      : slideEl.querySelector<HTMLElement>('.swiper-slide-shadow-top');
    let shadowAfter = isHorizontal
      ? slideEl.querySelector<HTMLElement>('.swiper-slide-shadow-right')
      : slideEl.querySelector<HTMLElement>('.swiper-slide-shadow-bottom');
    if (!shadowBefore) {
      shadowBefore = createElement(
        'div',
        `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}`.split(' '),
      );
      slideEl.append(shadowBefore);
    }
    if (!shadowAfter) {
      shadowAfter = createElement(
        'div',
        `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}`.split(
          ' ',
        ),
      );
      slideEl.append(shadowAfter);
    }
    if (shadowBefore) shadowBefore.style.opacity = String(Math.max(-progress, 0));
    if (shadowAfter) shadowAfter.style.opacity = String(Math.max(progress, 0));
  };

  const recreateShadows = (): void => {
    // create new ones
    const isHorizontal = swiper.isHorizontal();
    swiper.slides.forEach((slideEl) => {
      const progress = Math.max(Math.min(slideEl.progress ?? 0, 1), -1);
      createSlideShadows(slideEl, progress, isHorizontal);
    });
  };

  const setTranslate = (): void => {
    const {
      el,
      wrapperEl,
      slides,
      width: swiperWidth,
      height: swiperHeight,
      rtlTranslate: rtl,
      size: swiperSize,
    } = swiper;
    const r = getRotateFix(swiper);
    const params = getParams();
    const isHorizontal = swiper.isHorizontal();
    const isVirtual = !!(swiper.virtual && swiper.params.virtual?.enabled);
    let wrapperRotate = 0;
    let cubeShadowEl: HTMLElement | null = null;

    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl = swiper.wrapperEl.querySelector<HTMLElement>('.swiper-cube-shadow');
        if (!cubeShadowEl) {
          cubeShadowEl = createElement('div', 'swiper-cube-shadow');
          swiper.wrapperEl.append(cubeShadowEl);
        }
        cubeShadowEl.style.height = `${swiperWidth}px`;
      } else {
        cubeShadowEl = el.querySelector<HTMLElement>('.swiper-cube-shadow');
        if (!cubeShadowEl) {
          cubeShadowEl = createElement('div', 'swiper-cube-shadow');
          el.append(cubeShadowEl);
        }
      }
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i]!;
      let slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt(slideEl.getAttribute('data-swiper-slide-index') ?? '0', 10);
      }
      let slideAngle = slideIndex * 90;
      let round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      const progress = Math.max(Math.min(slideEl.progress ?? 0, 1), -1);
      let tx = 0;
      let ty = 0;
      let tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + round * 4 * swiperSize;
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = 3 * swiperSize + swiperSize * 4 * round;
      }
      if (rtl) {
        tx = -tx;
      }

      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }

      const transform = `rotateX(${r(isHorizontal ? 0 : -slideAngle)}deg) rotateY(${r(
        isHorizontal ? slideAngle : 0,
      )}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
      }
      slideEl.style.transform = transform;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress, isHorizontal);
      }
    }
    wrapperEl.style.transformOrigin = `50% 50% -${swiperSize / 2}px`;
    wrapperEl.style.setProperty('-webkit-transform-origin', `50% 50% -${swiperSize / 2}px`);

    if (params.shadow && cubeShadowEl) {
      if (isHorizontal) {
        cubeShadowEl.style.transform = `translate3d(0px, ${
          swiperWidth / 2 + params.shadowOffset
        }px, ${-swiperWidth / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${params.shadowScale})`;
      } else {
        const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        const multiplier =
          1.5 -
          (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2 +
            Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2);
        const scale1 = params.shadowScale;
        const scale2 = params.shadowScale / multiplier;
        const offset = params.shadowOffset;
        cubeShadowEl.style.transform = `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${
          swiperHeight / 2 + offset
        }px, ${-swiperHeight / 2 / scale2}px) rotateX(-89.99deg)`;
      }
    }
    wrapperEl.style.transform = `translate3d(0px,0,0px) rotateX(${r(
      swiper.isHorizontal() ? 0 : wrapperRotate,
    )}deg) rotateY(${r(swiper.isHorizontal() ? -wrapperRotate : 0)}deg)`;

    wrapperEl.style.setProperty('--swiper-cube-translate-z', '0px');
  };
  const setTransition = (duration: number): void => {
    const { el, slides } = swiper;
    slides.forEach((slideEl) => {
      slideEl.style.transitionDuration = `${duration}ms`;
      slideEl
        .querySelectorAll<HTMLElement>(
          '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
        )
        .forEach((subEl) => {
          subEl.style.transitionDuration = `${duration}ms`;
        });
    });

    if (swiper.params.cubeEffect?.shadow && !swiper.isHorizontal()) {
      const shadowEl = el.querySelector<HTMLElement>('.swiper-cube-shadow');
      if (shadowEl) shadowEl.style.transitionDuration = `${duration}ms`;
    }
  };

  effectInit({
    effect: 'cube',
    swiper,
    on,
    setTranslate,
    setTransition,
    recreateShadows,
    getEffectParams: () => swiper.params.cubeEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: false,
      virtualTranslate: true,
    }),
  });
};

export default EffectCube;
