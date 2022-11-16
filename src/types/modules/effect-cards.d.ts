import { CSSSelector } from '../shared';

export interface CardsEffectMethods {}

export interface CardsEffectEvents {}

export interface CardsEffectOptions {
  /**
   * Enables slides shadows
   *
   * @default true
   */
  slideShadows?: boolean;

  /**
   * Enables cards rotation
   *
   * @default true
   */
  rotate?: boolean;

  /**
   * Rotate angle per slide (in degrees)
   *
   * @default 2
   */
  perSlideRotate?: number;

  /**
   * Offset distance per slide (in px)
   *
   * @default 8
   */
  perSlideOffset?: number;

  /**
   * CSS selector of the element inside of the slide to transform instead of the slide itself. Useful to use with cssMode
   *
   * @default null
   */
  transformEl?: CSSSelector;
}
