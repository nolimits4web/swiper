import { Component, JSX } from 'solid-js';
import { SwiperOptions, Swiper as SwiperClass } from '../types';

interface SwiperProps extends SwiperOptions {
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

interface SwiperSlideProps {
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
  children?: JSX.Element | ((slideData: SlideData) => JSX.Element);
}

interface SwiperProps
  extends Omit<
    JSX.HTMLAttributes<HTMLElement>,
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
interface SwiperSlideProps extends Omit<JSX.HTMLAttributes<HTMLElement>, 'children'> {}

declare const Swiper: Component<SwiperProps>;
declare const SwiperSlide: Component<SwiperSlideProps>;

declare const useSwiper: () => SwiperClass;
declare const useSwiperSlide: () => SlideData;

export { Swiper, SwiperSlide, SwiperProps, SwiperSlideProps, useSwiper, useSwiperSlide };
