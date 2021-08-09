import { SvelteComponentTyped } from 'svelte';
import { SwiperOptions, Swiper as SwiperClass } from '../types/';

// @ts-ignore
interface SwiperProps extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['div']> {}
interface SwiperProps extends SwiperOptions {}

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
    default: {};
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
    default: {};
  }
> {}

export { Swiper, SwiperSlide };
