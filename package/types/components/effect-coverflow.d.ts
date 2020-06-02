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
   * Stretch space between slides (in px)
   *
   * @default 0
   */
  stretch?: number;
  /**
   * Depth offset in px (slides translate in Z axis)
   *
   * @default 100
   */
  depth?: number;
  /**
   * Effect multipler
   *
   * @default 1
   */
  modifier?: number;
}
