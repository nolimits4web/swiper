import React, { useState } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar } from '../build/core';
import { Swiper, SwiperSlide } from '../build/react';

SwiperCore.use([Navigation, Pagination, Scrollbar]);

const App = () => {
  const [showSwiper, setShowSwiper] = useState(true);
  const [showText, setShowText] = useState(false);
  const [showSwiperClass, setShowSwiperClass] = useState(false);
  return (
    <div id="test">
      <button onClick={() => setShowSwiper(!showSwiper)}>Toggle Swiper</button>
      <button onClick={() => setShowText(!showText)}>Toggle Text</button>
      <button onClick={() => setShowSwiperClass(!showSwiperClass)}>Toggle Swiper Class</button>
      {showText && (
        <>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt maxime autem harum
            quos rerum a dignissimos ut explicabo quidem, officia fugit nesciunt laboriosam
            necessitatibus, adipisci rem sunt esse, quaerat dolorem?
          </p>
          <p>
            Porro possimus dolores aliquid nulla odit laboriosam aspernatur similique provident,
            dignissimos in, rerum impedit minima nam ab consectetur ullam necessitatibus aliquam
            exercitationem ipsum obcaecati quaerat ut. Iusto, alias voluptate. Quo!
          </p>
        </>
      )}
      {showSwiper ? (
        <Swiper
          className={showSwiperClass ? 'extra-class' : ''}
          id={showSwiperClass ? 'extra-id' : ''}
          onSwiper={(swiper) => console.log(swiper)}
          slidesPerView={2}
          spaceBetween={100}
          navigation
          scrollbar={{ draggable: true }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
        </Swiper>
      ) : (
        <p>No swiper</p>
      )}
    </div>
  );
};

export default App;
