import Swiper from '../swiper-class';

export interface FreeModeMethods {
  /**
   * Swiper instance of thumbs swiper
   */
  swiper: Swiper;

  /**
   * Update thumbs
   */
  update(initial: boolean): void;

  /**
   * Initialize thumbs
   */
  init(): boolean;
}

export interface FreeModeEvents {}

export interface FreeModeOptions {
  /**
   * Swiper instance of swiper used as thumbs or object with Swiper parameters to initialize thumbs swiper
   *
   * @default null
   */
  swiper?: Swiper | null;

  enabled?: boolean;

  /**
   * If enabled, then slide will keep moving for a while after you release it
   *
   * @default true
   */
  momentum?: boolean;

  /**
   * Higher value produces larger momentum distance after you release slider
   *
   * @default 1
   */
  momentumRatio?: number;

  /**
   * Higher value produces larger momentum velocity after you release slider
   *
   * @default 1
   */
  momentumVelocityRatio?: number;

  /**
   * Set to `false` if you want to disable momentum bounce in free mode
   *
   * @default true
   */
  momentumBounce?: boolean;

  /**
   * Higher value produces larger momentum bounce effect
   *
   * @default 1
   */
  momentumBounceRatio?: number;

  /**
   * Minimum touchmove-velocity required to trigger free mode momentum
   *
   * @default 0.02
   */
  minimumVelocity?: number;

  /**
   * Set to enabled to enable snap to slides positions in free mode
   *
   * @default false
   */
  sticky?: boolean;
}
