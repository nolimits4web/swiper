import { SwiperOptions } from '../types/swiper-options';
import Swiper from '../types/swiper-class';

declare const register: (injectStyles?: boolean) => void;

interface SwiperContainerEventMap extends HTMLElementEventMap {
  slidechange: Event;
}

interface SwiperContainer extends HTMLElement {}
interface SwiperContainer extends SwiperOptions {
  swiper?: Swiper;
  initialize?: () => void;
  injectStyles?: string[];
  injectStylesUrls?: string[];
  eventsPrefix?: string;
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
  lazy?: string | boolean;
}

export { register, SwiperContainer, SwiperSlide };
