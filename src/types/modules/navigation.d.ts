import { CSSSelector } from '../shared';
import Swiper from '../swiper-class';

export interface NavigationMethods {
  /**
   * HTMLElement of "next" navigation button
   */
  nextEl: HTMLElement;

  /**
   * HTMLElement of "previous" navigation button
   */
  prevEl: HTMLElement;

  /**
   * Update navigation buttons state (enabled/disabled)
   */
  update(): void;

  /**
   * Initialize navigation
   */
  init(): void;

  /**
   * Destroy navigation
   */
  destroy(): void;
}

export interface NavigationEvents {
  /**
   * Event will be fired on navigation hide
   */
  navigationHide: (swiper: Swiper) => void;
  /**
   * Event will be fired on navigation show
   */
  navigationShow: (swiper: Swiper) => void;
}

export interface NavigationOptions {
  /**
   * Boolean property to use with breakpoints to enable/disable navigation on certain breakpoints
   */
  enabled?: boolean;
  /**
   * String with CSS selector or HTML element of the element that will work
   * like "next" button after click on it
   *
   * @default null
   */
  nextEl?: CSSSelector | HTMLElement | null;

  /**
   * String with CSS selector or HTML element of the element that will work
   * like "prev" button after click on it
   *
   * @default null
   */
  prevEl?: CSSSelector | HTMLElement | null;

  /**
   * Toggle navigation buttons visibility after click on Slider's container
   *
   * @default false
   */
  hideOnClick?: boolean;

  /**
   * CSS class name added to navigation button when it becomes disabled
   *
   * @default 'swiper-button-disabled'
   */
  disabledClass?: string;

  /**
   * CSS class name added to navigation button when it becomes hidden
   *
   * @default 'swiper-button-hidden'
   */
  hiddenClass?: string;

  /**
   * CSS class name added to navigation button when it is disabled
   *
   * @default 'swiper-button-lock'
   */
  lockClass?: string;

  /**
   * CSS class name added on swiper container when navigation is disabled by breakpoint
   *
   * @default 'swiper-navigation-disabled'
   */
  navigationDisabledClass?: string;
}
