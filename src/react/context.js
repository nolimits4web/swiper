import { createContext, useContext } from 'react';

export const SwiperSlideContext = createContext(null);

export const useSwiperSlide = () => {
  return useContext(SwiperSlideContext);
};

export const SwiperContext = createContext(null);

export const useSwiper = () => {
  return useContext(SwiperContext);
};
