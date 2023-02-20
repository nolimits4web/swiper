export interface LoadPrevNextMethods {}

export interface LoadPrevNextEvents {}

export interface LoadPrevNextOptions {
  /**
   * Enables LoadPrevNext Plugin.
   *
   * @default false
   */
  enabled?: boolean;

  /**
   * Number of next and/or previous slides to preload.
   *
   * @default 1
   */
  amount?: number;

  /**
   * Set to `false` to disable preloading previous slides.
   *
   * @default true
   */
  prev?: boolean;

  /**
   * Set to `false` to disable preloading next slides.
   *
   * @default true
   */
  next?: boolean;
}
