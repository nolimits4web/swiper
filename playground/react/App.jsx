/* eslint-disable no-restricted-globals */
import React from 'react';
// eslint-disable-next-line
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
// eslint-disable-next-line
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

const App = () => {
  return (
    <main>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        onSwiper={(swiper) => (window.swiper = swiper)}
        slidesPerView={3}
        spaceBetween={50}
        navigation
        loop
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
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
