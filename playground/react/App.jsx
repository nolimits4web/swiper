/* eslint-disable no-restricted-globals */
import React from 'react';
// eslint-disable-next-line
import { EffectCoverflow } from 'swiper';
// eslint-disable-next-line
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import './styled.scss';

const App = () => {
  return (
    <div className="swiperWrapper">
      <div className="swiperContainer">
        <Swiper
          className="swiperContent"
          effect="coverflow"
          modules={[EffectCoverflow]}
          coverflowEffect={{
            depth: 160,
            modifier: 1,
            rotate: 12,
            scale: 1,
            slideShadows: false,
            stretch: -20,
          }}
          slidesPerView={7}
          centeredSlides
          loop
          freeMode
          grabCursor
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
