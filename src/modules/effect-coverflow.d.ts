export interface CoverflowEffectMethods {}

export interface CoverflowEffectEvents {}

export interface CoverflowEffectOptions {
  /**
   * Enables slides shadows
   *
   * @default true
   */
  slideShadows?: boolean;
  /**
   * Slide rotate in degrees
   *
   * @default 50
   */
  rotate?: number;
  /**
   * Stretch space between slides
   *
   * - a number is interpreted as pixels (e.g., `20` for 20px).
   * - a string with a percentage (e.g., `"50%"`).
   *
   * @default 0
   */
  stretch?: number | `${number}%`;
  /**
   * Depth offset in px (slides translate in Z axis)
   *
   * @default 100
   */
  depth?: number;
  /**
   * Slide scale effect
   *
   * @default 1
   */
  scale?: number;
  /**
   * Effect multiplier
   *
   * @default 1
   */
  modifier?: number;
}
