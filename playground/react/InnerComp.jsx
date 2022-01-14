import React from 'react';
import {
  Swiper,
  SwiperSlide,
  useSwiperSlideContext,
  useSwiperContext,
} from 'swiper/react/swiper-react';

export default function InnerComp({ children }) {
  const { swiper, slides } = useSwiperContext();
  const { isActive, isDuplicate, isNext, isPrev, isVisible } = useSwiperSlideContext();
  return (
    <div style={{ lineHeight: 1, marginTop: '100px' }}>
      <>
        isActive: {isActive.toString()} isDuplicate: {isDuplicate.toString()} isNext:{' '}
        {isNext.toString()} isPrev: {isPrev.toString()} isVisible: {isVisible.toString()}
      </>
      <br />
      {children}
      <br />
      <button
        onClick={() => {
          swiper.slideNext(500);
        }}
      >
        Slide next
      </button>
    </div>
  );
}
