/* eslint-disable no-underscore-dangle */
import type { Swiper, SwiperEventHandler } from './core';
import type { SwiperEvents } from '../swiper-events.d.ts';

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
    return self.on(events, onceHandler, priority);
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

  emit(this: Swiper, ...args: unknown[]): Swiper {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    let events: string | string[];
    let data: unknown[];
    let context: unknown;
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0] as string | string[];
      data = args.slice(1, args.length);
      context = self;
    } else {
      const opts = args[0] as { events: string | string[]; data?: unknown[]; context?: unknown };
      events = opts.events;
      data = opts.data ?? [];
      context = opts.context || self;
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
