import { createContext, useContext } from 'react';

export const SwiperSlideContext = createContext(null);

export const useSwiperSlideContext = () => {
  return useContext(SwiperSlideContext);
};

export const SwiperContext = createContext(null);

export const useSwiperContext = () => {
  return useContext(SwiperContext);
};
