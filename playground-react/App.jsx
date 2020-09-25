/* eslint-disable no-restricted-globals */
import React from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from '../build/core';
import { Swiper, SwiperSlide } from '../build/react';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const App = () => {
  return (
    <main>
      <Swiper
        onSwiper={(swiper) => (window.swiper = swiper)}
        slidesPerView={3}
        spaceBetween={50}
        navigation
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
        <SwiperSlide>Slide 10</SwiperSlide>
      </Swiper>
    </main>
  );
};

export default App;
