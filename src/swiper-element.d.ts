// @ts-ignore
import { Swiper, SwiperOptions } from './types/index.d.ts';

declare const register: () => void;

// prettier-ignore
interface SwiperContainerEventMap extends Omit<HTMLElementEventMap, 'click' | 'progress' | 'keypress' | 'resize' | 'touchstart' | 'touchmove' | 'touchend' | 'transitionend' | 'transitionstart'> {
  // CORE_EVENTS

  // MODULES_EVENTS
}

interface SwiperContainer extends HTMLElement {}
interface SwiperContainer extends SwiperOptions {
  swiper: Swiper;
  initialize: () => void;
  injectStyles: string[];
  injectStylesUrls: string[];
  eventsPrefix: string;
  addEventListener<K extends keyof SwiperContainerEventMap>(
    type: K,
    listener: (this: SwiperContainer, ev: SwiperContainerEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof SwiperContainerEventMap>(
    type: K,
    listener: (this: SwiperContainer, ev: SwiperContainerEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

interface SwiperSlide extends HTMLElement {
  lazy: string | boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'swiper-container': SwiperContainer;
    'swiper-slide': SwiperSlide;
  }
}

export { SwiperContainer, SwiperSlide, register };
