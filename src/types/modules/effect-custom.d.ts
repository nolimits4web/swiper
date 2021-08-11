import { CSSSelector } from '../shared';

interface CustomEffectTransform {
  translate?: string[] | number[];
  rotate?: number[];
  opacity?: number;
  scale?: number;
  shadow?: boolean;
  origin?: string;
}

export interface CustomEffectMethods {}

export interface CustomEffectEvents {}

export interface CustomEffectOptions {
  /**
   * Previous slide transformations. Accepts object of the following type:
   * ```
   * {
   *   // Array with translate X, Y and Z values
   *   translate: string[] | number[];
   *   // Array with rotate X, Y and Z values (in deg)
   *   rotate?: number[];
   *   // Slide opacity
   *   opacity?: number;
   *   // Slide scale
   *   scale?: number;
   *   // Enables slide shadow
   *   shadow?: boolean;
   *   // Transform origin, e.g. `left bottom`
   *   origin?: string;
   * }
   * ```
   *
   */
  prev?: CustomEffectTransform;
  /**
   * Next slide transformations. ```
   * {
   *   // Array with translate X, Y and Z values
   *   translate: string[] | number[];
   *   // Array with rotate X, Y and Z values (in deg)
   *   rotate: number[];
   *   // Slide opacity
   *   opacity: number;
   *   // Slide scale
   *   scale: number;
   * }
   * ```
   *
   */
  next?: CustomEffectTransform;
  /**
   * CSS selector of the element inside of the slide to transform instead of the slide itself. Useful to use with cssMode
   *
   * @default null
   */
  transformEl?: CSSSelector;
  /**
   * Limit progress/offset to amount of side slides. If `1`, then slides all slides after prev/next will have same state. If `2`, then all slides after 2nd before/after active will have same state, etc.
   *
   * @default 1
   */
  limitProgress?: number;
  /**
   * Enable this parameter if your custom transforms require 3D transformations (`translateZ`, `rotateX`, `rotateY` )
   *
   * @default true
   */
  perspective?: boolean;
}
