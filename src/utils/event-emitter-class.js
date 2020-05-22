/* eslint-disable no-underscore-dangle */

class EventEmitter {
  constructor(parents = []) {
    const self = this;
    self.eventsParents = parents;
    self.listeners = {};
    self.anyListeners = [];
  }

  on(events, handler, priority) {
    const self = this;
    if (typeof handler !== 'function') return self;
    const method = priority ? 'unshift' : 'push';
    events.split(' ').forEach((event) => {
      if (!self.listeners[event]) self.listeners[event] = [];
      self.listeners[event][method](handler);
    });
    return self;
  }

  once(events, handler, priority) {
    const self = this;
    if (typeof handler !== 'function') return self;
    function onceHandler(...args) {
      self.off(events, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events, onceHandler, priority);
  }

  onAny(handler, priority) {
    const self = this;
    if (typeof handler !== 'function') return self;
    const method = priority ? 'unshift' : 'push';
    if (self.anyListeners.indexOf(handler) < 0) {
      self.anyListeners[method](handler);
    }
    return self;
  }

  offAny(handler) {
    const self = this;
    if (!self.anyListeners) return self;
    const index = self.anyListeners.indexOf(handler);
    if (index >= 0) {
      self.anyListeners.splice(index, 1);
    }
    return self;
  }

  off(events, handler) {
    const self = this;
    if (!self.listeners) return self;
    events.split(' ').forEach((event) => {
      if (typeof handler === 'undefined') {
        self.listeners[event] = [];
      } else if (self.listeners[event]) {
        self.listeners[event].forEach((eventHandler, index) => {
          if (
            eventHandler === handler ||
            (eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler)
          ) {
            self.listeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  }

  emit(...args) {
    const self = this;
    if (!self.listeners) return self;
    let events;
    let data;
    let context;
    let eventsParents;
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
      eventsParents = self.eventsParents;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
      eventsParents = args[0].local ? [] : args[0].parents || self.eventsParents;
    }
    const eventsArray = Array.isArray(events) ? events : events.split(' ');
    const localEvents = eventsArray.map((eventName) => eventName.replace('local::', ''));
    const parentEvents = eventsArray.filter((eventName) => eventName.indexOf('local::') < 0);

    localEvents.forEach((event) => {
      if (self.listeners && self.listeners[event]) {
        const handlers = [];
        self.listeners[event].forEach((eventHandler) => {
          handlers.push(eventHandler);
        });
        handlers.forEach((eventHandler) => {
          eventHandler.apply(context, data);
        });
      }
    });
    if (eventsParents && eventsParents.length > 0) {
      eventsParents.forEach((eventsParent) => {
        eventsParent.emit(parentEvents, ...data);
      });
    }
    return self;
  }
}

export default EventEmitter;
