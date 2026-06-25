/**
 * React wrapper consumer surface: `swiper/react`.
 *
 * Exercises the component props (including event handler props synthesized from
 * core + module events at build time), the slot components, the render-prop
 * slide form, the hooks, and the exported types.
 */
import * as React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';
import type { SwiperProps, SwiperSlideProps, SwiperRef } from 'swiper/react';

function Inner() {
  const swiper = useSwiper();
  const slide = useSwiperSlide();
  void [swiper.activeIndex, slide.isActive, slide.isVisible];
  return null;
}

export function App() {
  const ref = React.useRef<SwiperRef>(null);
  return (
    <Swiper
      ref={ref}
      modules={[Navigation, Pagination]}
      slidesPerView={3}
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      className="demo"
      onSwiper={(s) => void s.activeIndex}
      onSlideChange={(s) => void s.activeIndex}
      onAutoplayTimeLeft={(s, timeLeft, percentage) => void [s, timeLeft, percentage]}
    >
      <SwiperSlide>plain slide</SwiperSlide>
      <SwiperSlide zoom lazy virtualIndex={1}>
        {({ isActive }) => <span>{isActive ? 'active' : 'idle'}</span>}
      </SwiperSlide>
      <Inner />
    </Swiper>
  );
}

const _props: SwiperProps = { slidesPerView: 2, navigation: true };
const _slideProps: SwiperSlideProps = { zoom: true, virtualIndex: 0 };
void [_props, _slideProps];

// Teeth: an unknown prop must still error under JSX checking.
// @ts-expect-error `slidesPerView` is number | 'auto', never an object
const _bad: SwiperProps = { slidesPerView: {} };
void _bad;
