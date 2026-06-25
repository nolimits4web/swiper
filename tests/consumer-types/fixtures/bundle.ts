/**
 * `swiper/bundle` entry.
 *
 * The bundle build registers EVERY module at runtime, so — unlike the bare
 * `swiper` / `swiper/core` entries — its module options, events, and methods
 * must be available WITHOUT a separate `swiper/modules` import. The dedicated
 * `swiper-bundle.d.ts` side-effect-imports the modules index to pull in every
 * module's `declare module` augmentation block.
 *
 * Regression guard: v12 inlined all module options into one `SwiperOptions`, so
 * `swiper/bundle` + `navigation`/`pagination`/… type-checked out of the box.
 * v14 moved those into per-module augmentations that only load via
 * `swiper/modules`, which silently broke `swiper/bundle` users until the
 * bundle entry got its own augmentation-loading declarations.
 */
import Swiper from 'swiper/bundle';
import { Swiper as SwiperNamed } from 'swiper/bundle';

const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  // Module-augmented options — NO `swiper/modules` import needed.
  navigation: { nextEl: '.next', prevEl: '.prev' },
  pagination: { el: '.pagination', clickable: true },
  autoplay: { delay: 3000 },
  effect: 'fade',
  fadeEffect: { crossFade: true },
  on: {
    slideChange: (s) => void s.activeIndex,
    autoplayTimeLeft: (s, timeLeft, percentage) => void [s, timeLeft * 1, percentage * 1],
  },
});

// Augmented per-module method bags resolve on the instance too.
swiper.navigation.update();
swiper.autoplay.start();
void swiper.activeIndex;

const swiper2: SwiperNamed = swiper;
void swiper2;

// Teeth: a wrong module-option value must still error — proves the augmented
// options are real types, not `any`.
// @ts-expect-error pagination.clickable is a boolean, not a string
new Swiper('.x', { pagination: { clickable: 'yes' } });
