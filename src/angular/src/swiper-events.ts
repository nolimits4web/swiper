import { SwiperEvents } from 'swiper/types';

export type EventsParams<T = SwiperEvents> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? Parameters<T[P]> : never;
};
