import { inject } from 'vue';
export const useSwiperSlide = () => {
  return inject('swiperSlide');
};
export const useSwiper = () => {
  return inject('swiper');
};