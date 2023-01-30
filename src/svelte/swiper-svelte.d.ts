import { SvelteComponentTyped } from 'svelte';
import { SwiperOptions, Swiper as SwiperClass } from '../types/';

// @ts-ignore
interface SwiperProps
  extends SwiperOptions,
    svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['div']> {}

// @ts-ignore
interface SwiperSlideProps extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['div']> {
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
}

declare class Swiper extends SvelteComponentTyped<
  SwiperProps,
  {
    swiper: CustomEvent<void>;
    // CORE_EVENTS
    // MODULES_EVENTS
  },
  {
    default: {
      virtualData: {
        slides: any[];
        offset: number;
        from: number;
        to: number;
        slidesGrid: number[];
      };
    };
    'container-start': {};
    'wrapper-start': {};
    'wrapper-end': {};
    'container-end': {};
  }
> {}

declare class SwiperSlide extends SvelteComponentTyped<
  SwiperSlideProps,
  {},
  {
    default: {
      data: {
        isActive: boolean;
        isVisible: boolean;
        isDuplicate: boolean;
        isPrev: boolean;
        isNext: boolean;
      };
    };
  }
> {}

export { Swiper, SwiperSlide };
