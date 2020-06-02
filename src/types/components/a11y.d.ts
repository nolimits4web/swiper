export interface A11yMethods {}

export interface A11yEvents {}

export interface A11yOptions {
  /**
   * Enables A11y
   *
   * @default true
   */
  enabled?: boolean;

  /**
   * Message for screen readers for previous button
   *
   * @default 'Previous slide'
   */
  prevSlideMessage?: string;

  /**
   * Message for screen readers for next button
   *
   * @default 'Next slide'
   */
  nextSlideMessage?: string;

  /**
   * Message for screen readers for previous button when swiper is on first slide
   *
   * @default 'This is the first slide'
   */
  firstSlideMessage?: string;

  /**
   * Message for screen readers for previous button when swiper is on last slide
   *
   * @default 'This is the last slide'
   */
  lastSlideMessage?: string;

  /**
   * Message for screen readers for single pagination bullet
   *
   * @default 'Go to slide {{index}}'
   */
  paginationBulletMessage?: string;

  /**
   * CSS class name of a11 notification
   *
   * @default 'swiper-notification'
   */
  notificationClass?: string;
}
