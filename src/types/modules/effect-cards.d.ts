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
}
