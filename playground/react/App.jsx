/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
// eslint-disable-next-line
import { A11y, Navigation, Pagination, Scrollbar, Mousewheel } from 'swiper/modules';
// eslint-disable-next-line
import { Swiper, SwiperSlide } from 'swiper/swiper-react-bundle';

const App = () => {
  const [toggled, setToggled] = useState(false);
  const toggle = () => {
    setToggled(!toggled);
  };
  return (
    <main>
      <button onClick={toggle}>Toggle</button>
      <Swiper
        virtual
        onSwiper={(swiper) => (window.swiper = swiper)}
        slidesPerView={toggled ? 2 : 1}
        spaceBetween={10}
        navigation={true}
        scrollbar
        pagination={{ clickable: true }}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        {!toggled && <SwiperSlide>Slide 2</SwiperSlide>}
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
      </Swiper>
    </main>
  );
};

export default App;
