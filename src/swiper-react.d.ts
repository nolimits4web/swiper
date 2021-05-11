import * as React from 'react';

import { SwiperOptions } from './types/swiper-options';
import SwiperClass from './types/swiper-class';

interface Swiper extends SwiperOptions {
  /**
   * Swiper container tag
   *
   * @default 'div'
   */
  tag?: string;

  /**
   * Swiper wrapper tag
   *
   * @default 'div'
   */
  wrapperTag?: string;

  /**
   * Get Swiper instance
   */
  onSwiper?: (swiper: SwiperClass) => void;

  // CORE_EVENTS
  // MODULES_EVENTS
}

interface SlideData {
  isActive: boolean;
  isVisible: boolean;
  isDuplicate: boolean;
  isPrev: boolean;
  isNext: boolean;
}

interface SwiperSlide {
  /**
   * Slide tag
   *
   * @default 'div'
   */
  tag?: string;

  /**
   * Enables additional wrapper required for zoom mode
   *
   * @default false
   */
  zoom?: boolean;

  /**
   * Slide's index in slides array/collection
   *
   * @default false
   */
  virtualIndex?: number;

  /**
   * Slide's child element or render function
   *
   * @default undefined
   */
  children?: React.ReactNode | ((slideData: SlideData) => React.ReactNode);
}

interface Swiper
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    | 'onProgress'
    | 'onClick'
    | 'onTouchEnd'
    | 'onTouchMove'
    | 'onTouchStart'
    | 'onTransitionEnd'
    | 'onKeyPress'
    | 'onDoubleClick'
    | 'onScroll'
  > {}
interface SwiperSlide extends React.HTMLAttributes<HTMLElement> {}

declare const Swiper: React.FunctionComponent<Swiper>;
declare const SwiperSlide: React.VoidFunctionComponent<SwiperSlide>;

export { Swiper, SwiperSlide };
