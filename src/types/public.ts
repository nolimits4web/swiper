// Public type aggregator. Exposed at `swiper/types` via the package.json
// exports map. Re-exports the canonical `Swiper`, `SwiperOptions`,
// `SwiperEvents`, and per-module type interfaces (`NavigationOptions`,
// `NavigationMethods`, `NavigationEvents`, etc.) so consumers can pull
// them all from a single subpath.
export * from './shared';
export type { Swiper, SwiperOptions, SwiperEvents, SwiperParams } from '../core/core';

export type * from '../modules/a11y/a11y';
export type * from '../modules/autoplay/autoplay';
export type * from '../modules/controller/controller';
export type * from '../modules/effect-coverflow/effect-coverflow';
export type * from '../modules/effect-cube/effect-cube';
export type * from '../modules/effect-fade/effect-fade';
export type * from '../modules/effect-flip/effect-flip';
export type * from '../modules/effect-creative/effect-creative';
export type * from '../modules/effect-cards/effect-cards';
export type * from '../modules/hash-navigation/hash-navigation';
export type * from '../modules/history/history';
export type * from '../modules/keyboard/keyboard';
export type * from '../modules/mousewheel/mousewheel';
export type * from '../modules/navigation/navigation';
export type * from '../modules/pagination/pagination';
export type * from '../modules/parallax/parallax';
export type * from '../modules/scrollbar/scrollbar';
export type * from '../modules/thumbs/thumbs';
export type * from '../modules/virtual/virtual';
export type * from '../modules/zoom/zoom';
export type * from '../modules/free-mode/free-mode';
export type * from '../modules/grid/grid';
export type * from '../modules/manipulation/manipulation';
