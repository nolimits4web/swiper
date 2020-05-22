import { getDocument } from 'ssr-window';

import onTouchStart from './onTouchStart';
import onTouchMove from './onTouchMove';
import onTouchEnd from './onTouchEnd';
import onResize from './onResize';
import onClick from './onClick';
import onScroll from './onScroll';

let dummyEventAttached = false;
function dummyEventListener() {}

function attachEvents() {
  const swiper = this;
  const document = getDocument();
  const { params, touchEvents, el, wrapperEl, device, support } = swiper;

  swiper.onTouchStart = onTouchStart.bind(swiper);
  swiper.onTouchMove = onTouchMove.bind(swiper);
  swiper.onTouchEnd = onTouchEnd.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }

  swiper.onClick = onClick.bind(swiper);

  const capture = !!params.nested;

  // Touch Events
  if (!support.touch && support.pointerEvents) {
    el.addEventListener(touchEvents.start, swiper.onTouchStart, false);
    document.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
    document.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
  } else {
    if (support.touch) {
      const passiveListener =
        touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners
          ? { passive: true, capture: false }
          : false;
      el.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
      el.addEventListener(
        touchEvents.move,
        swiper.onTouchMove,
        support.passiveListener ? { passive: false, capture } : capture,
      );
      el.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      if (touchEvents.cancel) {
        el.addEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
      }
      if (!dummyEventAttached) {
        document.addEventListener('touchstart', dummyEventListener);
        dummyEventAttached = true;
      }
    }
    if (
      (params.simulateTouch && !device.ios && !device.android) ||
      (params.simulateTouch && !support.touch && device.ios)
    ) {
      el.addEventListener('mousedown', swiper.onTouchStart, false);
      document.addEventListener('mousemove', swiper.onTouchMove, capture);
      document.addEventListener('mouseup', swiper.onTouchEnd, false);
    }
  }
  // Prevent Links Clicks
  if (params.preventClicks || params.preventClicksPropagation) {
    el.addEventListener('click', swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl.addEventListener('scroll', swiper.onScroll);
  }

  // Resize handler
  if (params.updateOnWindowResize) {
    swiper.on(
      device.ios || device.android
        ? 'resize orientationchange observerUpdate'
        : 'resize observerUpdate',
      onResize,
      true,
    );
  } else {
    swiper.on('observerUpdate', onResize, true);
  }
}

function detachEvents() {
  const swiper = this;
  const document = getDocument();

  const { params, touchEvents, el, wrapperEl, device, support } = swiper;

  const capture = !!params.nested;

  // Touch Events
  if (!support.touch && support.pointerEvents) {
    el.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
    document.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
    document.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
  } else {
    if (support.touch) {
      const passiveListener =
        touchEvents.start === 'onTouchStart' && support.passiveListener && params.passiveListeners
          ? { passive: true, capture: false }
          : false;
      el.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
      el.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
      el.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      if (touchEvents.cancel) {
        el.removeEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
      }
    }
    if (
      (params.simulateTouch && !device.ios && !device.android) ||
      (params.simulateTouch && !support.touch && device.ios)
    ) {
      el.removeEventListener('mousedown', swiper.onTouchStart, false);
      document.removeEventListener('mousemove', swiper.onTouchMove, capture);
      document.removeEventListener('mouseup', swiper.onTouchEnd, false);
    }
  }
  // Prevent Links Clicks
  if (params.preventClicks || params.preventClicksPropagation) {
    el.removeEventListener('click', swiper.onClick, true);
  }

  if (params.cssMode) {
    wrapperEl.removeEventListener('scroll', swiper.onScroll);
  }

  // Resize handler
  swiper.off(
    device.ios || device.android
      ? 'resize orientationchange observerUpdate'
      : 'resize observerUpdate',
    onResize,
  );
}

export default {
  attachEvents,
  detachEvents,
};
