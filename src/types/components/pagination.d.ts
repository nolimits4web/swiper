import { Dom7Array } from 'dom7';
import { CSSSelector } from '../shared';
import Swiper from '../swiper-class';

export interface PaginationMethods {
  /**
   * HTMLElement of pagination container element
   */
  el: HTMLElement;

  /**
   * Dom7 array-like collection of pagination bullets
   * HTML elements. To get specific slide HTMLElement
   * use `mySwiper.pagination.bullets[1]`.
   */
  bullets: Dom7Array[];

  /**
   * Render pagination layout
   */
  render(): void;

  /**
   * Update pagination state (enabled/disabled/active)
   */
  update(): void;
}

export interface PaginationEvents {
  /**
   * Event will be fired after pagination rendered
   */
  paginationRender: (swiper: Swiper, paginationEl: HTMLElement) => void;

  /**
   * Event will be fired when pagination updated
   */
  paginationUpdate: (swiper: Swiper, paginationEl: HTMLElement) => void;

  /**
   * Event will be fired on pagination hide
   */
  paginationHide: (swiper: Swiper) => void;

  /**
   * Event will be fired on pagination show
   */
  paginationShow: (swiper: Swiper) => void;
}

export interface PaginationOptions {
  /**
   * String with CSS selector or HTML element of the container with pagination
   */
  el?: CSSSelector | HTMLElement;

  /**
   * String with type of pagination. Can be "bullets", "fraction", "progressbar" or "custom"
   */
  type?: 'bullets' | 'fraction' | 'progressbar' | 'custom';

  /**
   * Defines which HTML tag will be use to represent single pagination bullet. Only for bullets pagination type.
   */
  bulletElement?: string;

  /**
   * Good to enable if you use bullets pagination with a lot of slides. So it will keep only few bullets visible at the same time.
   */
  dynamicBullets?: boolean;

  /**
   * The number of main bullets visible when dynamicBullets enabled.
   */
  dynamicMainBullets?: number;

  /**
   * Toggle (hide/true) pagination container visibility after click on Slider's container
   */
  hideOnClick?: boolean;

  /**
   * If true then clicking on pagination button will cause transition to appropriate slide. Only for bullets pagination type
   */
  clickable?: boolean;

  /**
   * Makes pagination progressbar opposite to Swiper's `direction` parameter, means vertical progressbar for horizontal swiper
   * direction and horizontal progressbar for vertical swiper direction
   */
  progressbarOpposite?: boolean;

  /**
   * format fraction pagination current number. Function receives current number,
   * and you need to return formatted value
   */
  formatFractionCurrent?: (number: number) => number;

  /**
   * format fraction pagination total number. Function receives total number, and you
   * need to return formatted value
   */
  formatFractionTotal?: (number: number) => number;

  /**
   * This parameter allows totally customize pagination bullets, you need to pass here a function that accepts index number of
   * pagination bullet and required element class name (className). Only for bullets pagination type
   */
  renderBullet?: (index: number, className: string) => void;

  /**
   * This parameter allows to customize "fraction" pagination html. Only for fraction pagination type
   */
  renderFraction?: (currentClass: string, totalClass: string) => void;

  /**
   * This parameter allows to customize "progress" pagination. Only for progress pagination type
   */
  renderProgressbar?: (progressbarFillClass: string) => void;

  /**
   * This parameter is required for custom pagination type where you have to specify
   * how it should be rendered.
   *
   * @example
   * var swiper = new Swiper('.swiper-container', {
   *   //...
   *   renderCustom: function (swiper, current, total) {
   *     return current + ' of ' + total;
   *   }
   * });
   */
  renderCustom?: (swiper: Swiper, current: number, total: number) => void;

  /**
   * CSS class name of single pagination bullet
   */
  bulletClass?: string;

  /**
   * CSS class name of currently active pagination bullet
   */
  bulletActiveClass?: string;

  /**
   * The beginning of the modifier CSS class name that will be added to pagination depending on parameters
   */
  modifierClass?: string;

  /**
   * CSS class name of the element with currently active index in "fraction" pagination
   */
  currentClass?: string;

  /**
   * CSS class name of the element with total number of "snaps" in "fraction" pagination
   */
  totalClass?: string;

  /**
   * CSS class name of pagination when it becomes inactive
   */
  hiddenClass?: string;

  /**
   * CSS class name of pagination progressbar fill element
   */
  progressbarFillClass?: string;

  /**
   * CSS class name of pagination progressbar opposite
   */
  progressbarOppositeClass?: string;
  /**
   * CSS class name set to pagination when it is clickable
   */
  clickableClass?: string;

  /**
   * CSS class name set to pagination when it is disabled
   */
  lockClass?: string;
}
