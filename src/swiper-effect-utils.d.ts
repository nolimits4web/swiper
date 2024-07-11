import { Swiper, SwiperOptions } from './types/index.d.ts';

declare const createShadow: (suffix?: string, slideEl: HTMLElement, side?: string) => HTMLElement;

declare const effectInit: (params: {
  effect: string;
  swiper: Swiper;
  on: () => void;
  setTranslate: () => void;
  setTransition: (duration: number) => void;
  overwriteParams?: () => SwiperOptions;
  perspective?: () => boolean;
  recreateShadows?: () => void;
  getEffectParams?: () => { slideShadows?: boolean };
}) => void;

declare const effectTarget: (effectParams: any, slideEl: HTMLElement) => void;

declare const effectVirtualTransitionEnd: (params: {
  swiper: Swiper;
  duration: number;
  transformElements: HTMLElement[];
  allSlides?: boolean;
}) => void;

declare const getSlideTransformEl: (slideEl: HTMLElement) => void;

export { createShadow, effectInit, effectTarget, effectVirtualTransitionEnd, getSlideTransformEl };
