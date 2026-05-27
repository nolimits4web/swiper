import type { Swiper, SwiperOptions } from '../core/core';

interface EffectInitParams {
  effect: string;
  swiper: Swiper;
  on: Swiper['on'];
  setTranslate: () => void;
  setTransition: (duration: number) => void;
  overwriteParams?: () => Partial<SwiperOptions>;
  perspective?: () => boolean;
  recreateShadows?: () => void;
  getEffectParams?: () => { slideShadows?: boolean } | undefined;
}

export default function effectInit(params: EffectInitParams): void {
  const {
    effect,
    swiper,
    on,
    setTranslate,
    setTransition,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams,
  } = params;

  on('beforeInit', () => {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }

    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};

    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on('setTranslate _virtualUpdated', () => {
    if (swiper.params.effect !== effect) return;
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    if (swiper.params.effect !== effect) return;
    setTransition(duration);
  });

  on('transitionEnd', () => {
    if (swiper.params.effect !== effect) return;
    if (recreateShadows) {
      const effectParams = getEffectParams ? getEffectParams() : undefined;
      if (!effectParams || !effectParams.slideShadows) return;
      swiper.slides.forEach((slideEl) => {
        slideEl
          .querySelectorAll(
            '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
          )
          .forEach((shadowEl) => shadowEl.remove());
      });
      recreateShadows();
    }
  });

  let requireUpdateOnVirtual = false;
  on('virtualUpdate', () => {
    if (swiper.params.effect !== effect) return;
    if (!swiper.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(() => {
      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
        setTranslate();
        requireUpdateOnVirtual = false;
      }
    });
  });
}
