import { createContext, useContext } from 'react';
export const SwiperSlideContext = /*#__PURE__*/createContext(null);
export const useSwiperSlide = () => {
  return useContext(SwiperSlideContext);
};
export const SwiperContext = /*#__PURE__*/createContext(null);
export const useSwiper = () => {
  return useContext(SwiperContext);
};