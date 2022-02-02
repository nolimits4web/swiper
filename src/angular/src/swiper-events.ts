import { SwiperEvents } from 'swiper/types';

export type SwiperNgEvents = {
  [Property in keyof SwiperEvents]: Parameters<SwiperEvents[Property]>;
};
