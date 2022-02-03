import { SwiperEvents } from 'swiper/types';

export type EventsParams = {
  [Property in keyof SwiperEvents]: Parameters<SwiperEvents[Property]>;
};
