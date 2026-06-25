/**
 * Vue wrapper consumer surface: `swiper/vue`.
 *
 * Full Vue SFC template type-checking needs `vue-tsc` (out of scope here — the
 * Vue playground covers runtime). This fixture verifies that the wrapper's
 * declarations resolve and are shaped correctly: the components are usable
 * values, and the composables return the documented reactive refs.
 */
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/vue';

// Components are exported as defined component values.
void Swiper;
void SwiperSlide;

// `useSwiper` returns a Ref to the Swiper instance.
const swiperRef = useSwiper();
void swiperRef.value.activeIndex;
swiperRef.value.slideNext();

// `useSwiperSlide` returns a Ref to the slide state.
const slideRef = useSwiperSlide();
void slideRef.value.isActive;
void slideRef.value.isNext;
