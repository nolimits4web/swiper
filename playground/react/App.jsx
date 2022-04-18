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
              <img alt="" src="https://cheongmac.blob.core.windows.net/temp/magazine.png" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img alt="" src="https://cheongmac.blob.core.windows.net/temp/magazine.png" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img alt="" src="https://cheongmac.blob.core.windows.net/temp/magazine.png" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img alt="" src="https://cheongmac.blob.core.windows.net/temp/magazine.png" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img alt="" src="https://cheongmac.blob.core.windows.net/temp/magazine.png" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img alt="" src="https://cheongmac.blob.core.windows.net/temp/magazine.png" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperSlideItem">
              <img alt="" src="https://cheongmac.blob.core.windows.net/temp/magazine.png" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default App;
