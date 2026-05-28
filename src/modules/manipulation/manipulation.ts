import type { SwiperModule } from '../../core/core';
import appendSlide from './methods/appendSlide';
import prependSlide from './methods/prependSlide';
import addSlide from './methods/addSlide';
import removeSlide from './methods/removeSlide';
import removeAllSlides from './methods/removeAllSlides';

type SlideInput = HTMLElement | string | Array<HTMLElement | string>;

export interface ManipulationOptions {}

export interface ManipulationMethods {
  /**
   * Add new slides to the end. slides could be
   * HTMLElement or HTML string with new slide or
   * array with such slides, for example:
   *
   * @example
   * ```js
   * appendSlide('<div class="swiper-slide">Slide 10"</div>')
   *
   * appendSlide([
   *  '<div class="swiper-slide">Slide 10"</div>',
   *  '<div class="swiper-slide">Slide 11"</div>'
   * ]);
   * ```
   */
  appendSlide(slides: SlideInput): void;

  /**
   * Add new slides to the beginning. slides could be
   * HTMLElement or HTML string with new slide or array with such slides, for example:
   *
   * @example
   * ```js
   * prependSlide('<div class="swiper-slide">Slide 0"</div>')
   *
   * prependSlide([
   *  '<div class="swiper-slide">Slide 1"</div>',
   *  '<div class="swiper-slide">Slide 2"</div>'
   * ]);
   * ```
   */
  prependSlide(slides: SlideInput): void;

  /**
   * Add new slides to the required index. slides could be HTMLElement or HTML string with new slide or array with such slides, for example:
   *
   * @example
   * ```js
   * addSlide(1, '<div class="swiper-slide">Slide 10"</div>')
   *
   * addSlide(1, [
   *  '<div class="swiper-slide">Slide 10"</div>',
   *  '<div class="swiper-slide">Slide 11"</div>'
   * ]);
   * ```
   */
  addSlide(index: number, slides: SlideInput): void;

  /**
   * Remove selected slides. slideIndex could be a number with slide index to remove or array with indexes.
   *
   * @example
   * ```js
   * removeSlide(0); // remove first slide
   * removeSlide([0, 1]); // remove first and second slides
   * removeAllSlides();    // Remove all slides
   * ```
   */
  removeSlide(slideIndex: number | number[]): void;

  /**
   * Remove all slides
   */
  removeAllSlides(): void;
}

export interface ManipulationEvents {}

declare module '../../core/core' {
  interface Swiper extends ManipulationMethods {}
  interface SwiperEvents extends ManipulationEvents {}
}

const Manipulation: SwiperModule = ({ swiper }) => {
  Object.assign(swiper, {
    appendSlide: appendSlide.bind(swiper),
    prependSlide: prependSlide.bind(swiper),
    addSlide: addSlide.bind(swiper),
    removeSlide: removeSlide.bind(swiper),
    removeAllSlides: removeAllSlides.bind(swiper),
  });
};

export default Manipulation;
