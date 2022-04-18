import { CSSSelector } from '../shared';

export interface PanoramaEffectMethods {}

export interface PanoramaEffectEvents {}

export interface PanoramaEffectOptions {
  /**
   * Enables slides shadows
   *
   * @default 200
   */
  depth?: number;

  /**
   * Slide rotate in degrees
   *
   * @default 30
   */
  rotate?: number;
}
