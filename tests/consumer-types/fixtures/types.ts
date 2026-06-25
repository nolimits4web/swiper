/**
 * Type-only entry: `swiper/types`.
 *
 * Existing users pull option/interface types from `swiper/types` (the public
 * type aggregator). v12 shipped `types/index.d.ts`, so this resolved even under
 * classic `node` resolution; v14 must preserve that via `typesVersions`.
 */
import type { Swiper, SwiperOptions, SwiperModule, SwiperEvents } from 'swiper/types';
import type { NavigationOptions, PaginationOptions, AutoplayOptions } from 'swiper/types';

const opts: SwiperOptions = {
  slidesPerView: 'auto',
  navigation: true,
  pagination: { clickable: true },
};

const nav: NavigationOptions = { nextEl: '.n', prevEl: '.p' };
const pag: PaginationOptions = { el: '.p', type: 'bullets' };
const auto: AutoplayOptions = { delay: 2500 };

declare const mod: SwiperModule;
declare const swiper: Swiper;
declare const onChange: SwiperEvents['slideChange'];

void [opts, nav, pag, auto, mod, swiper.activeIndex, onChange];

// Teeth: wrong shape on a re-exported option interface must still error.
// @ts-expect-error `delay` is a number, not a string
const badAuto: AutoplayOptions = { delay: 'soon' };
void badAuto;
