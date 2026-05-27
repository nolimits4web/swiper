/* eslint-disable consistent-return */
import type { SwiperModuleFn } from '../../core/core';
import type {
  MousewheelEvents,
  MousewheelMethods,
  MousewheelOptions,
} from '../../types/modules/mousewheel.d.ts';
import { now, nextTick } from '../../shared/utils';

export type { MousewheelEvents, MousewheelMethods, MousewheelOptions };

// Runtime-only members: enable()/disable() return a boolean internally
// (the legacy code uses the return to short-circuit re-enable calls), but
// the published MousewheelMethods declares them as `() => void`. Mirror
// the public shape in the public type, and override internally.
interface MousewheelInternals extends Omit<MousewheelMethods, 'enable' | 'disable'> {
  enable: () => boolean;
  disable: () => boolean;
}

declare module '../../core/core' {
  interface Swiper {
    mousewheel: MousewheelInternals;
  }
  interface SwiperOptions {
    mousewheel?: MousewheelOptions | boolean;
  }
  interface SwiperParams {
    mousewheel?: MousewheelOptions;
  }
  interface SwiperEvents extends MousewheelEvents {}
}

interface NormalizedWheel {
  spinX: number;
  spinY: number;
  pixelX: number;
  pixelY: number;
}

interface WheelEventRecord {
  time: number;
  delta: number;
  direction: number;
  raw?: WheelEvent;
}

const Mousewheel: SwiperModuleFn = ({ swiper, extendParams, on, emit }) => {
  extendParams({
    mousewheel: {
      enabled: false,
      releaseOnEdges: false,
      invert: false,
      forceToAxis: false,
      sensitivity: 1,
      eventsTarget: 'container',
      thresholdDelta: null,
      thresholdTime: null,
      noMousewheelClass: 'swiper-no-mousewheel',
    },
  });

  let timeout: ReturnType<typeof setTimeout> | undefined;
  let lastScrollTime = now();
  let lastEventBeforeSnap: WheelEventRecord | undefined;
  let mouseEntered = false;
  const recentWheelEvents: WheelEventRecord[] = [];

  function normalize(e: WheelEvent | (WheelEvent & Record<string, any>)): NormalizedWheel {
    // Reasonable defaults
    const PIXEL_STEP = 10;
    const LINE_HEIGHT = 40;
    const PAGE_HEIGHT = 800;

    const ev = e as any;
    let sX = 0;
    let sY = 0; // spinX, spinY
    let pX = 0;
    let pY = 0; // pixelX, pixelY

    // Legacy
    if ('detail' in ev) {
      sY = ev.detail;
    }
    if ('wheelDelta' in ev) {
      sY = -ev.wheelDelta / 120;
    }
    if ('wheelDeltaY' in ev) {
      sY = -ev.wheelDeltaY / 120;
    }
    if ('wheelDeltaX' in ev) {
      sX = -ev.wheelDeltaX / 120;
    }

    // side scrolling on FF with DOMMouseScroll
    if ('axis' in ev && ev.axis === ev.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }

    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;

    if ('deltaY' in ev) {
      pY = ev.deltaY;
    }
    if ('deltaX' in ev) {
      pX = ev.deltaX;
    }

    if (ev.shiftKey && !pX) {
      // if user scrolls with shift he wants horizontal scroll
      pX = pY;
      pY = 0;
    }

    if ((pX || pY) && ev.deltaMode) {
      if (ev.deltaMode === 1) {
        // delta in LINE units
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        // delta in PAGE units
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }

    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY,
    };
  }
  function handleMouseEnter(): void {
    if (!swiper.enabled) return;
    mouseEntered = true;
  }
  function handleMouseLeave(): void {
    if (!swiper.enabled) return;
    mouseEntered = false;
  }
  function animateSlider(newEvent: WheelEventRecord): boolean {
    const params = swiper.params.mousewheel!;
    if (params.thresholdDelta && newEvent.delta < params.thresholdDelta) {
      // Prevent if delta of wheel scroll delta is below configured threshold
      return false;
    }

    if (params.thresholdTime && now() - lastScrollTime < params.thresholdTime) {
      // Prevent if time between scrolls is below configured threshold
      return false;
    }

    // If the movement is NOT big enough and
    // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
    //   Don't go any further (avoid insignificant scroll movement).
    if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
      // Return false as a default
      return true;
    }
    if (newEvent.direction < 0) {
      if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
        swiper.slideNext();
        emit('scroll', newEvent.raw);
      }
    } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
      swiper.slidePrev();
      emit('scroll', newEvent.raw);
    }
    // If you got here is because an animation has been triggered so store the current time
    lastScrollTime = new window.Date().getTime();
    // Return false as a default
    return false;
  }
  function releaseScroll(newEvent: WheelEventRecord): boolean {
    const params = swiper.params.mousewheel!;
    if (newEvent.direction < 0) {
      if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
        // Return true to animate scroll on edges
        return true;
      }
    } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
      // Return true to animate scroll on edges
      return true;
    }
    return false;
  }
  function handle(event: WheelEvent | (WheelEvent & { originalEvent?: WheelEvent })): boolean {
    let e: WheelEvent = event as WheelEvent;
    let disableParentSwiper = true;
    if (!swiper.enabled) return false;

    // Ignore event if the target or its parents have the swiper-no-mousewheel class
    const params = swiper.params.mousewheel!;
    if ((event.target as Element).closest(`.${params.noMousewheelClass}`)) return false;

    if (swiper.params.cssMode) {
      e.preventDefault();
    }

    let targetEl: Element | HTMLElement | null = swiper.el;
    if (params.eventsTarget !== 'container') {
      targetEl = document.querySelector(params.eventsTarget as string);
    }
    const targetElContainsTarget = targetEl && targetEl.contains(e.target as Node);
    if (!mouseEntered && !targetElContainsTarget && !params.releaseOnEdges) return true;

    if ((event as any).originalEvent) e = (event as any).originalEvent;
    let delta = 0;
    const rtlFactor = swiper.rtlTranslate ? -1 : 1;

    const data = normalize(e);

    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;
        else return true;
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;
      else return true;
    } else {
      delta =
        Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }

    if (delta === 0) return true;

    if (params.invert) delta = -delta;

    // Get the scroll positions
    let positions = swiper.getTranslate() + delta * (params.sensitivity ?? 1);

    if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
    if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();

    // When loop is true:
    //     the disableParentSwiper will be true.
    // When loop is false:
    //     if the scroll positions is not on edge,
    //     then the disableParentSwiper will be true.
    //     if the scroll on edge positions,
    //     then the disableParentSwiper will be false.
    disableParentSwiper = swiper.params.loop
      ? true
      : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());

    if (disableParentSwiper && swiper.params.nested) e.stopPropagation();

    if (!swiper.params.freeMode || !(swiper.params.freeMode as any).enabled) {
      // Register the new event in a variable which stores the relevant data
      const newEvent: WheelEventRecord = {
        time: now(),
        delta: Math.abs(delta),
        direction: Math.sign(delta),
        raw: event,
      };

      // Keep the most recent events
      if (recentWheelEvents.length >= 2) {
        recentWheelEvents.shift(); // only store the last N events
      }
      const prevEvent = recentWheelEvents.length
        ? recentWheelEvents[recentWheelEvents.length - 1]
        : undefined;
      recentWheelEvents.push(newEvent);

      if (prevEvent) {
        if (
          newEvent.direction !== prevEvent.direction ||
          newEvent.delta > prevEvent.delta ||
          newEvent.time > prevEvent.time + 150
        ) {
          animateSlider(newEvent);
        }
      } else {
        animateSlider(newEvent);
      }

      // If it's time to release the scroll:
      //   Return now so you don't hit the preventDefault.
      if (releaseScroll(newEvent)) {
        return true;
      }
    } else {
      // Freemode or scrollContainer:
      const newEvent: WheelEventRecord = {
        time: now(),
        delta: Math.abs(delta),
        direction: Math.sign(delta),
      };

      const ignoreWheelEvents =
        lastEventBeforeSnap &&
        newEvent.time < lastEventBeforeSnap.time + 500 &&
        newEvent.delta <= lastEventBeforeSnap.delta &&
        newEvent.direction === lastEventBeforeSnap.direction;
      if (!ignoreWheelEvents) {
        lastEventBeforeSnap = undefined;

        let position = swiper.getTranslate() + delta * (params.sensitivity ?? 1);
        const wasBeginning = swiper.isBeginning;
        const wasEnd = swiper.isEnd;

        if (position >= swiper.minTranslate()) position = swiper.minTranslate();
        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();

        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();

        if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
          swiper.updateSlidesClasses();
        }
        if (swiper.params.loop) {
          swiper.loopFix({
            direction: newEvent.direction < 0 ? 'next' : 'prev',
            byMousewheel: true,
          });
        }

        if ((swiper.params.freeMode as any).sticky) {
          clearTimeout(timeout);
          timeout = undefined;
          if (recentWheelEvents.length >= 15) {
            recentWheelEvents.shift(); // only store the last N events
          }
          const prevEvent = recentWheelEvents.length
            ? recentWheelEvents[recentWheelEvents.length - 1]
            : undefined;
          const firstEvent = recentWheelEvents[0];
          recentWheelEvents.push(newEvent);
          if (
            prevEvent &&
            (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)
          ) {
            // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
            recentWheelEvents.splice(0);
          } else if (
            recentWheelEvents.length >= 15 &&
            firstEvent &&
            newEvent.time - firstEvent.time < 500 &&
            firstEvent.delta - newEvent.delta >= 1 &&
            newEvent.delta <= 6
          ) {
            const snapToThreshold = delta > 0 ? 0.8 : 0.2;
            lastEventBeforeSnap = newEvent;
            recentWheelEvents.splice(0);
            timeout = nextTick(() => {
              if (swiper.destroyed || !swiper.params) return;
              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
            }, 0); // no delay; move on next tick
          }
          if (!timeout) {
            timeout = nextTick(() => {
              if (swiper.destroyed || !swiper.params) return;
              const snapToThreshold = 0.5;
              lastEventBeforeSnap = newEvent;
              recentWheelEvents.splice(0);
              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
            }, 500);
          }
        }

        // Emit event
        if (!ignoreWheelEvents) emit('scroll', e);

        // Stop autoplay
        if (swiper.params.autoplay && (swiper.params.autoplay as any).disableOnInteraction)
          swiper.autoplay.stop();
        // Return page scroll on edge positions
        if (
          params.releaseOnEdges &&
          (position === swiper.minTranslate() || position === swiper.maxTranslate())
        ) {
          return true;
        }
      }
    }

    if (e.preventDefault) e.preventDefault();
    else (e as any).returnValue = false;
    return false;
  }

  function events(method: 'addEventListener' | 'removeEventListener'): void {
    const params = swiper.params.mousewheel!;
    let targetEl: Element | HTMLElement | null = swiper.el;
    if (params.eventsTarget !== 'container') {
      targetEl = document.querySelector(params.eventsTarget as string);
    }
    targetEl![method]('mouseenter', handleMouseEnter as EventListener);
    targetEl![method]('mouseleave', handleMouseLeave as EventListener);
    targetEl![method]('wheel', handle as unknown as EventListener);
  }

  function enable(): boolean {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.removeEventListener('wheel', handle as unknown as EventListener);
      return true;
    }
    if (swiper.mousewheel.enabled) return false;
    events('addEventListener');
    swiper.mousewheel.enabled = true;
    return true;
  }
  function disable(): boolean {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.addEventListener('wheel', handle as unknown as EventListener);
      return true;
    }
    if (!swiper.mousewheel.enabled) return false;
    events('removeEventListener');
    swiper.mousewheel.enabled = false;
    return true;
  }

  on('init', () => {
    if (!swiper.params.mousewheel!.enabled && swiper.params.cssMode) {
      disable();
    }
    if (swiper.params.mousewheel!.enabled) enable();
  });
  swiper.mousewheel = {
    enabled: false,
    enable,
    disable,
  };

  on('destroy', () => {
    if (swiper.params.cssMode) {
      enable();
    }
    if (swiper.mousewheel.enabled) disable();
  });
};

export default Mousewheel;
