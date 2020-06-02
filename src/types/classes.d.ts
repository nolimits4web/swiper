import Swiper, { DOM7Element } from '../index';

// Reexport everything from `swiper` except the default export of the
// `Swiper` class, which is instead provided as a named export by
// `swiper.esm`.
export * from '../index';
export { Swiper };

/*
 * Swiper exports the following as ES5 module (in swiper.esm.js).
 */

/**
 * Virtual Slides module.
 */
export class Virtual {
  /**
   * Object with cached slides HTML elements
   */
  cache: object;

  /**
   * Index of first rendered slide
   */
  from: number;

  /**
   * Index of last rendered slide
   */
  to: number;

  /**
   * Array with slide items passed by virtual.slides parameter
   */
  slides: any[];

  /*
   * Methods
   */

  /**
   * Add new slides to the end. slides could be HTMLElement or HTML string with new slide or array
   * with such slides, for example:
   *
   * @example
   * mySwiper.appendSlide('<div class="swiper-slide">Slide 10"</div>')
   * mySwiper.appendSlide([
   *   '<div class="swiper-slide">Slide 10"</div>',
   *   '<div class="swiper-slide">Slide 11"</div>'
   * ]);
   */
  appendSlide(slide: HTMLElement | string): void;

  /**
   * Add new slides to the beginning. slides could be HTMLElement or HTML string with new slide or
   * array with such slides, for example:
   *
   * @example
   * mySwiper.prependSlide('<div class="swiper-slide">Slide 0"</div>')
   * mySwiper.prependSlide([
   * '<div class="swiper-slide">Slide 1"</div>',
   * '<div class="swiper-slide">Slide 2"</div>'
   * ]);
   */
  prependSlide(slide: HTMLElement | string): void;

  /**
   * Update virutal slides state
   */
  update(): void;
}

/**
 * Controller module.
 */
export class Controller {
  /**
   * Pass here another Swiper instance or array with Swiper instances that should be controlled
   * by this Swiper
   */
  control?: Swiper;
}

/**
 * Accessibility module (a11y$)
 */
export class A11y {}

/**
 * History Navigation module.
 */
export class History {}

/**
 * Hash Navigation module.
 */
export class HashNavigation {}

/**
 * Fade Effect module.
 */
export class EffectFade {}

/**
 * Cube Effect module.
 */
export class EffectCube {}

/**
 * Flip Effect module.
 */
export class EffectFlip {}

/**
 * Coverflow Effect module.
 */
export class EffectCoverflow {}
