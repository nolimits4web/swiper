import Swiper from '../swiper-class';

export interface AutoplayMethods {
  /**
   * Whether autoplay enabled and running
   */
  running: boolean;

  /**
   * Whether autoplay is paused
   */
  paused: boolean;

  /**
   * If autoplay is paused, it contains time left (in ms) before transition to next slide
   */
  timeLeft: number;

  /**
   * Pause autoplay
   */
  pause(): void;

  /**
   * Resume autoplay
   */
  resume(): void;

  /**
   * Start autoplay
   */
  start(): boolean;

  /**
   * Stop autoplay
   */
  stop(): boolean;
}

export interface AutoplayEvents {
  /**
   * Event will be fired in when autoplay started
   */
  autoplayStart: (swiper: Swiper) => void;
  /**
   * Event will be fired when autoplay stopped
   */
  autoplayStop: (swiper: Swiper) => void;
  /**
   * Event will be fired on autoplay pause
   */
  autoplayPause: (swiper: Swiper) => void;
  /**
   * Event will be fired on autoplay resume
   */
  autoplayResume: (swiper: Swiper) => void;
  /**
   * Event triggers continuously while autoplay is enabled. It contains time left (in ms) before transition to next slide and percentage of that time related to autoplay delay
   */
  autoplayTimeLeft: (swiper: Swiper, timeLeft: number, percentage: number) => void;
  /**
   * Event will be fired when slide changed with autoplay
   */
  autoplay: (swiper: Swiper) => void;
}

/**
 * Object with autoplay parameters or boolean `true` to enable with default settings.
 *
 * @example
 * ```js
 * const swiper = new Swiper('.swiper', {
 *   autoplay: {
 *     delay: 5000,
 *   },
 * });
 * ```
 */
export interface AutoplayOptions {
  /**
   * Delay between transitions (in ms). If this parameter is not specified, auto play will be disabled
   *
   * If you need to specify different delay for specific slides you can do it by using
   * `data-swiper-autoplay` (in ms) attribute on slide.
   *
   * @example
   * ```html
   * <!-- hold this slide for 2 seconds -->
   * <div class="swiper-slide" data-swiper-autoplay="2000">
   * ```
   *
   * @default 3000
   */
  delay?: number;

  /**
   * Enable this parameter and autoplay will be stopped when it reaches last slide (has no effect in loop mode)
   *
   * @default false
   */
  stopOnLastSlide?: boolean;

  /**
   * Set to `false` and autoplay will not be disabled after user interactions (swipes),
   * it will be restarted every time after interaction
   *
   * @default true
   */
  disableOnInteraction?: boolean;

  /**
   * Enables autoplay in reverse direction
   *
   * @default false
   */
  reverseDirection?: boolean;

  /**
   * When enabled autoplay will wait for wrapper transition to continue.
   * Can be disabled in case of using Virtual Translate when your
   * slider may not have transition
   *
   * @default true
   */
  waitForTransition?: boolean;

  /**
   * When enabled autoplay will be paused on pointer (mouse) enter over Swiper container.
   *
   * @default false
   */
  pauseOnMouseEnter?: boolean;
}
