/** @jsxImportSource solid-js */
/* eslint-disable no-restricted-globals */
import { createSignal } from 'solid-js';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/solid/swiper-solid';

const App = () => {
  const [enabled, toggle] = createSignal(true);
  return (
    <main>
      <button onClick={() => toggle(!enabled())}>Toggle</button>
      <p>Enabled: {String(enabled())}</p>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        onSwiper={(swiper) => (window.swiper = swiper)}
        slidesPerView={enabled() ? 3 : 1}
        spaceBetween={enabled() ? 50 : 16}
        navigation={enabled()}
        loop
        scrollbar={enabled()}
        pagination={enabled()}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </Swiper>
    </main>
  );
};

export default App;
