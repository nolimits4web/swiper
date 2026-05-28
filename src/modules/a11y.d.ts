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
   * Message for screen readers for next button when swiper is on last slide
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
   * CSS class name of A11y notification
   *
   * @default 'swiper-notification'
   */
  notificationClass?: string;

  /**
   * Message for screen readers for outer swiper container
   *
   * @default null
   */
  containerMessage?: string | null;

  /**
   * Message for screen readers describing the role of outer swiper container
   *
   * @default null
   */
  containerRoleDescriptionMessage?: string | null;

  /**
   * Value of the "role" attribute to be set on the swiper container
   *
   * @default null
   */
  containerRole?: string | null;

  /**
   * Message for screen readers describing the role of slide element
   *
   * @default null
   */
  itemRoleDescriptionMessage?: string | null;

  /**
   * Message for screen readers describing the label of slide element
   *
   * @default '{{index}} / {{slidesLength}}'
   */
  slideLabelMessage?: string;

  /**
   * Value of swiper slide `role` attribute
   *
   * @default 'group'
   */
  slideRole?: string;

  /**
   * Value of `id` attribute to be set on swiper-wrapper. If `null` will be generated automatically
   *
   * @default null
   */
  id?: string | number | null;

  /**
   * Enables scrolling to the slide that has been focused
   *
   * @default true
   */
  scrollOnFocus?: boolean;
  /**
   * Whether or not the swiper-wrapper should have the `aria-live` attribute applied to it.
   * If true, the value will be `off` when autoplay is enabled, otherwise it will be `polite`
   *
   * @default true
   */
  wrapperLiveRegion?: boolean;
}
