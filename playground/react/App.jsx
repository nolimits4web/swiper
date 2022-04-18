/* eslint-disable no-restricted-globals */
import React from 'react';
// eslint-disable-next-line
import { EffectPanorama } from 'swiper';
// eslint-disable-next-line
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
// import 'swiper/css/panorama';

import './styled.scss';

const App = () => {
  return (
    <div className="swiperWrapper">
      <div className="swiperContainer">
        <Swiper
          className="swiperContent"
          effect="panorama"
          modules={[EffectPanorama]}
          panoramaEffect={{
            depth: 200,
            rotate: 15,
          }}
          centeredSlides
          grabCursor
          breakpoints={{
            480: {
              slidesPerView: 3,
              panorama: {
                rotate: 35,
                depth: 150,
              },
            },
            640: {
              slidesPerView: 4,
              panorama: {
                rotate: 30,
                depth: 150,
              },
            },
            1024: {
              slidesPerView: 5,
              panorama: {
                rotate: 30,
                depth: 200,
              },
            },
            1200: {
              slidesPerView: 7,
              panorama: {
                rotate: 25,
                depth: 250,
              },
            },
          }}
        >
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1599229526921-4f29d42b0b41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2815&q=80"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1599229526921-4f29d42b0b41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2815&q=80"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1599229526921-4f29d42b0b41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2815&q=80"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1599229526921-4f29d42b0b41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2815&q=80"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1599229526921-4f29d42b0b41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2815&q=80"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1599229526921-4f29d42b0b41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2815&q=80"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1599229526921-4f29d42b0b41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2815&q=80"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default App;
