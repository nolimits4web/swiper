export interface VirtualMethods<T = any> {
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
   * Array with slide items passed by `virtual.slides` parameter
   */
  slides: T[];

  /*
   * Methods
   */

  /**
   * Append slide. `slides` can be a single slide item or array with such slides.
   *
   * @note Only for Core version (in React & Vue it should be done by modifying slides array/data/source)
   */
  appendSlide(slide: HTMLElement | string | HTMLElement[] | string[]): void;

  /**
   * Prepend slide. `slides` can be a single slide item or array with such slides.
   *
   * @note Only for Core version (in React & Vue it should be done by modifying slides array/data/source)
   */
  prependSlide(slide: HTMLElement | string | HTMLElement[] | string[]): void;

  /**
   * Remove specific slide or slides. `slideIndexes` can be a number with slide index to remove or array with indexes.
   *
   * @note Only for Core version (in React & Vue it should be done by modifying slides array/data/source)
   */
  removeSlide(slideIndexes: number[]): void;

  /**
   * Remove all slides
   *
   * @note Only for Core version (in React & Vue it should be done by modifying slides array/data/source)
   */
  removeAllSlides(): void;

  /**
   * Update virtual slides state
   */
  update(force: boolean): void;
}

export interface VirtualEvents {}

export interface VirtualData<T> {
  /**
   * slides left/top offset in px
   */
  offset: number;
  /**
   * index of first slide required to be rendered
   */
  from: number;
  /**
   * index of last slide required to be rendered
   */
  to: number;
  /**
   * array with slide items to be rendered
   */
  slides: T[];
}

export interface VirtualOptions<T = any> {
  /**
   * Whether the virtual slides are enabled
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * Array with slides
   *
   * @default []
   */
  slides?: T[];
  /**
   * Enables DOM cache of rendering slides html elements. Once they are rendered they will be saved to cache and reused from it.
   *
   * @default true
   */
  cache?: boolean;
  /**
   * Increases amount of pre-rendered slides before active slide
   *
   * @default 0
   */
  addSlidesBefore?: number;
  /**
   * Increases amount of pre-rendered slides after active slide
   *
   * @default 0
   */
  addSlidesAfter?: number;
  /**
   * Function to render slide. As an argument it accepts current slide item for `slides` array and index number of the current slide. Function must return an outer HTML of the swiper slide or slide HTML element.
   *
   * @default null
   */
  renderSlide?: (slide: T, index: any) => any | null;
  /**
   * Function for external rendering (e.g. using some other library to handle DOM manipulations and state like React.js or Vue.js). As an argument it accepts `data` object with the following properties:
   *
   * - `offset` - slides left/top offset in px
   * - `from` - index of first slide required to be rendered
   * - `to` - index of last slide required to be rendered
   * - `slides` - array with slide items to be rendered
   *
   * @default null
   */
  renderExternal?: (data: VirtualData<T>) => any | null;
  /**
   * When enabled (by default) it will update Swiper layout right after renderExternal called. Useful to disable and update swiper manually when used with render libraries that renders asynchronously
   *
   * @default true
   */
  renderExternalUpdate?: boolean;
}
