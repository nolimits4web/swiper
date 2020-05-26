import React from 'react';

const SwiperSlide = ({ children } = {}) => {
  return <div className="swiper-slide">{children}</div>;
};

SwiperSlide.displayName = 'SwiperSlide';

export { SwiperSlide };
