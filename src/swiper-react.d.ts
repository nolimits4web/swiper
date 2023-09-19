import * as React from 'react';

import type { SwiperOptions, Swiper as SwiperClass } from './types/index.d.ts';
import { SwiperContainer, SwiperSlide } from './swiper-element.js';

type SwiperProps = Omit<
  React.HTMLAttributes<SwiperContainer>,
  | 'onProgress'
  | 'onClick'
  | 'onTouchEnd'
  | 'onTouchMove'
  | 'onTouchStart'
  | 'onTransitionEnd'
  | 'onKeyPress'
  | 'onDoubleClick'
  | 'onScroll'
  | 'onResize'
> &
  SwiperOptions & {
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
  };

interface SlideData {
  isActive: boolean;
  isVisible: boolean;
  isPrev: boolean;
  isNext: boolean;
}

type SwiperSlideProps = Omit<React.HTMLAttributes<SwiperSlide>, 'children'> & {
  children?: React.ReactNode | ((slideData: SlideData) => React.ReactNode);
};

interface SwiperRef extends React.HTMLAttributes<SwiperContainer> {}

declare const Swiper: React.FunctionComponent<
  React.RefAttributes<SwiperRef> & React.PropsWithChildren<SwiperProps>
>;
declare const SwiperSlide: React.FunctionComponent<SwiperSlideProps>;

declare const useSwiper: () => SwiperClass;
declare const useSwiperSlide: () => SlideData;

export {
  Swiper,
  SwiperSlide,
  SwiperProps,
  SwiperSlideProps,
  SwiperRef,
  useSwiper,
  useSwiperSlide,
  SwiperClass,
};
