import { SwiperEvents } from 'swiper/types';
export declare type EventsParams<T = SwiperEvents> = {
    [P in keyof T]: T[P] extends (...args: any[]) => any ? Parameters<T[P]> : never;
};
