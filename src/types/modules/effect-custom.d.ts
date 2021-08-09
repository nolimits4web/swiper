import { CSSSelector } from '../shared';

interface CustomEffectTransform {
  translate: string[] | number[];
  rotate: number[];
  opacity: number;
  scale: number;
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
   *   rotate: number[];
   *   // Slide opacity
   *   opacity: number;
   *   // Slide scale
   *   scale: number;
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
}
