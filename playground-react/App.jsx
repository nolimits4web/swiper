import React, { useState } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from '../build/core';
import { Swiper, SwiperSlide } from '../build/react';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

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
          onSwiper={(swiper) => (window.swiper = swiper)}
          slidesPerView={3}
          spaceBetween={100}
          navigation
          loop
          // scrollbar={{ draggable: true }}
          pagination={{ clickable: true }}
          // initialSlide={2}
          onClick={() => console.log('tada!')}
        >
          <SwiperSlide className={showSwiperClass ? 'extra-class' : ''}>
            Slide 1 {showSwiperClass ? 'extra-class' : ''}
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide zoom={5} className={showSwiperClass ? 'extra-class' : ''}>
            Slide 3
          </SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      ) : (
        <p>No swiper</p>
      )}
    </div>
  );
};

export default App;
