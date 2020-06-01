import React from 'react';

const SwiperSlide = ({ tag: Tag = 'div', children } = {}) => {
  return <Tag className="swiper-slide">{children}</Tag>;
};

SwiperSlide.displayName = 'SwiperSlide';

export { SwiperSlide };
