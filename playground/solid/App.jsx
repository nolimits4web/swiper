/** @jsxImportSource solid-js */
/* eslint-disable no-restricted-globals */
import { createSignal } from 'solid-js';
import { Navigation, Pagination, Scrollbar, A11y, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/solid/swiper-solid';

const App = () => {
  return (
    <main>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Virtual]}
        onSwiper={(swiper) => (window.swiper = swiper)}
        slidesPerView={3}
        spaceBetween={50}
        navigation={true}
        pagination={true}
        virtual
      >
        <SwiperSlide virtualIndex={0}>Slide 1</SwiperSlide>
        <SwiperSlide virtualIndex={1}>Slide 2</SwiperSlide>
        <SwiperSlide virtualIndex={2}>Slide 3</SwiperSlide>
        <SwiperSlide virtualIndex={3}>Slide 4</SwiperSlide>
        <SwiperSlide virtualIndex={4}>Slide 5</SwiperSlide>
      </Swiper>
    </main>
  );
};

export default App;
