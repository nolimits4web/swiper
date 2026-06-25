/**
 * Core entry consumer surface: `swiper` + `swiper/modules`.
 *
 * Mirrors the most common ways an existing user imports and uses Swiper. This
 * file must type-check identically to v12 under every `moduleResolution` mode
 * (classic `node`, `node16`, `bundler`).
 */
import Swiper from 'swiper';
import { Swiper as SwiperNamed } from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Autoplay, EffectFade],
  slidesPerView: 3,
  spaceBetween: 20,
  // Module-augmented options must be accepted on SwiperOptions.
  navigation: { nextEl: '.next', prevEl: '.prev' },
  pagination: { el: '.pagination', clickable: true },
  autoplay: { delay: 3000, disableOnInteraction: false },
  effect: 'fade',
  fadeEffect: { crossFade: true },
  on: {
    // Core event handler is typed.
    slideChange: (s) => void s.activeIndex,
    // Module event (autoplay) is augmented onto SwiperEvents.
    autoplayTimeLeft: (s, timeLeft, percentage) => void [s, timeLeft * 1, percentage * 1],
  },
});

// Instance methods + the augmented per-module method bag.
swiper.slideNext();
swiper.slideTo(2, 300);
swiper.navigation.update();
swiper.autoplay.start();
swiper.update();
void swiper.activeIndex;
void swiper.isBeginning;

// The named export is the same class as the default export.
const swiper2: SwiperNamed = swiper;
void swiper2;

// Teeth: a genuinely wrong option must still error — proves the option types
// did not silently degrade to `any` during the TS rewrite.
// @ts-expect-error slidesPerView accepts `number | 'auto'`, never a boolean
new Swiper('.x', { slidesPerView: true });
