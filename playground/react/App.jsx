/* eslint-disable no-restricted-globals */
import React from 'react';
// eslint-disable-next-line
import { A11y, Navigation, Pagination, Scrollbar, Mousewheel } from 'swiper/modules';
// eslint-disable-next-line
import { Swiper, SwiperSlide } from 'swiper/swiper-react';

const App = () => {
  return (
    <main>
      <Swiper
        modules={[Pagination, Mousewheel, Navigation, Scrollbar]}
        onSwiper={(swiper) => (window.swiper = swiper)}
        slidesPerView={3.3}
        threshold={2}
        spaceBetween={10}
        navigation={true}
        scrollbar
        mousewheel={{ forceToAxis: true, sensitivity: 0.1, releaseOnEdges: true }}
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
