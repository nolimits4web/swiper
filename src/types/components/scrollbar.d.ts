import { CSSSelector } from '../shared';
import Swiper from '../swiper-class';

export interface ScrollbarMethods {
  /**
   * HTMLElement of Scrollbar container element
   */
  el: HTMLElement;

  /**
   * HTMLElement of Scrollbar draggable handler element
   */
  dragEl: HTMLElement;

  /**
   * Updates scrollbar track and handler sizes
   */
  updateSize(): void;

  /**
   * Updates scrollbar translate
   */
  setTranslate(): void;

  /**
   * Initialize scrollbar
   */
  init(): void;

  /**
   * Destroy scrollbar
   */
  destroy(): void;
}

export interface ScrollbarEvents {
  /**
   * Event will be fired on draggable scrollbar drag start
   */
  scrollbarDragStart: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired on draggable scrollbar drag move
   */
  scrollbarDragMove: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired on draggable scrollbar drag end
   */
  scrollbarDragEnd: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;
}

/**
 * Object with scrollbar parameters.
 *
 * @example
 * var mySwiper = new Swiper('.swiper-container', {
 *   scrollbar: {
 *     el: '.swiper-scrollbar',
 *     draggable: true,
 *   },
 * });
 */
export interface ScrollbarOptions {
  /**
   * String with CSS selector or HTML element of the container with scrollbar.
   */
  el?: CSSSelector | HTMLElement;

  /**
   * Hide scrollbar automatically after user interaction
   *
   * @default true
   */
  hide?: boolean;

  /**
   * Set to true to enable make scrollbar draggable that allows you to control slider position
   *
   * @default true
   */
  draggable?: boolean;

  /**
   * Set to true to snap slider position to slides when you release scrollbar
   *
   * @default false
   */
  snapOnRelease?: boolean;

  /**
   * Size of scrollbar draggable element in px
   *
   * @default 'auto'
   */
  dragSize?: 'auto' | number;

  /**
   * Scrollbar element additional CSS class when it is disabled
   *
   * @default 'swiper-scrollbar-lock'
   */
  lockClass?: string;

  /**
   *     Scrollbar draggable element CSS class
   *
   * @default 'swiper-scrollbar-drag'
   */
  dragClass?: string;
}
