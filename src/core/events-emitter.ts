/* eslint-disable no-underscore-dangle */
import type { Swiper, SwiperEventHandler } from './core';
import type { SwiperEvents } from '../types/swiper-events.d.ts';

interface OnceHandler extends SwiperEventHandler {
  __emitterProxy?: SwiperEventHandler;
}

export default {
  on(
    this: Swiper,
    events: keyof SwiperEvents | string,
    handler: SwiperEventHandler,
    priority?: boolean,
  ): Swiper {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    const method: 'unshift' | 'push' = priority ? 'unshift' : 'push';
    (events as string).split(' ').forEach((event) => {
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event]![method](handler);
    });
    return self;
  },

  once(
    this: Swiper,
    events: keyof SwiperEvents | string,
    handler: SwiperEventHandler,
    priority?: boolean,
  ): Swiper {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    const onceHandler: OnceHandler = function onceHandlerFn(...args: any[]) {
      self.off(events, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      handler.apply(self, args);
    };
    onceHandler.__emitterProxy = handler;
    return self.on(events as any, onceHandler, priority);
  },

  onAny(this: Swiper, handler: SwiperEventHandler, priority?: boolean): Swiper {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    const method: 'unshift' | 'push' = priority ? 'unshift' : 'push';
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },

  offAny(this: Swiper, handler: SwiperEventHandler): Swiper {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsAnyListeners) return self;
    const index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },

  off(this: Swiper, events: keyof SwiperEvents | string, handler?: SwiperEventHandler): Swiper {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    (events as string).split(' ').forEach((event) => {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event]!.forEach((eventHandler: OnceHandler, index) => {
          if (
            eventHandler === handler ||
            (eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler)
          ) {
            self.eventsListeners[event]!.splice(index, 1);
          }
        });
      }
    });
    return self;
  },

  emit(this: Swiper, ...args: any[]): Swiper {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    let events: string | string[];
    let data: any[];
    let context: any;
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events) ? events : (events as string).split(' ');

    eventsArray.forEach((event) => {
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach((eventHandler) => {
          eventHandler.apply(context, [event, ...data]);
        });
      }
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event]!.forEach((eventHandler) => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  },
};
