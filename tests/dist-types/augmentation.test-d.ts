import type { SwiperEvents, SwiperOptions } from '../../dist/core/core';
import { Navigation } from '../../dist/modules';
/**
 * Phase 6 regression guard: each module's `declare module '../../core/core'`
 * augmentation block must reach consumers through the SHIPPED `dist/` types,
 * not just through the in-repo source types.
 *
 * This file deliberately imports from `dist/`. It will only type-check after
 * `npm run build` produces `dist/swiper.d.ts`, `dist/core/core.d.ts`, and the
 * per-module emitted `.d.ts` files. The runtime `npm run contract-test` makes
 * sure those files exist; this static test asserts that the augmentation
 * payload (e.g. `navigation?` on `SwiperOptions`, `swiper.navigation` on
 * `Swiper`, `'navigationShow'` on `SwiperEvents`) actually lands on the
 * consumer-facing types after `import { Navigation } from 'swiper/modules'`.
 *
 * Importing `dist/...` directly (rather than via the `swiper` / `swiper/modules`
 * subpaths) sidesteps the package.json `exports` map — that's intentional. The
 * `exports` map is what Node and bundlers resolve at runtime; this file only
 * cares that the .d.ts contents themselves are wired correctly. The contract
 * test plus the `exports` map cover the path-resolution side.
 */
import { Swiper } from '../../dist/swiper';

type Expect<T extends true> = T;
type HasKey<O, K extends PropertyKey> = K extends keyof O ? true : false;

// The shipping gap: SwiperOptions gains `navigation?` only via Navigation's
// `declare module` block. If emission breaks (e.g. augmentation stripped by
// `--isolatedModules` mishandling), this assertion fails.
type _Opts_navigation = Expect<HasKey<SwiperOptions, 'navigation'>>;
type _Opts_pagination = Expect<HasKey<SwiperOptions, 'pagination'>>;
type _Opts_a11y = Expect<HasKey<SwiperOptions, 'a11y'>>;

// SwiperEvents augmented with per-module event names.
type _Evt_navigationShow = Expect<HasKey<SwiperEvents, 'navigationShow'>>;
type _Evt_paginationRender = Expect<HasKey<SwiperEvents, 'paginationRender'>>;
type _Evt_autoplayStart = Expect<HasKey<SwiperEvents, 'autoplayStart'>>;

// The full user smoke test from the plan's §6 acceptance criteria:
// "new Swiper('.x', { navigation: { nextEl: '.n' } }) type-checks after only
// `import { Navigation } from 'swiper/modules'`."
new Swiper('.x', {
  modules: [Navigation],
  navigation: { nextEl: '.n', prevEl: '.p' },
});

// Swiper instance gains the module method bag.
declare const swiper: Swiper;
type _S_navigation = Expect<HasKey<Swiper, 'navigation'>>;
void swiper.navigation.update;
void swiper.navigation.nextEl;
