import onTouchStart from './onTouchStart';
import onTouchMove from './onTouchMove';
import onTouchEnd from './onTouchEnd';
import onResize from './onResize';
import onClick from './onClick';
import onScroll from './onScroll';
import onLoad from './onLoad';
import onDocumentTouchStart from './onDocumentTouchStart';
import type { Swiper } from '../core';

const events = (swiper: Swiper, method: 'on' | 'off'): void => {
  const { params, el, wrapperEl, device } = swiper;
  const capture = !!params.nested;
  const domMethod: 'addEventListener' | 'removeEventListener' =
    method === 'on' ? 'addEventListener' : 'removeEventListener';
  const swiperMethod = method;
  if (!el || typeof el === 'string') return;

  // Touch Events
  document[domMethod]('touchstart', swiper.onDocumentTouchStart as EventListener, {
    passive: false,
    capture,
  });
  el[domMethod]('touchstart', swiper.onTouchStart as EventListener, { passive: false });
  el[domMethod]('pointerdown', swiper.onTouchStart as EventListener, { passive: false });
  document[domMethod]('touchmove', swiper.onTouchMove as EventListener, {
    passive: false,
    capture,
  });
  document[domMethod]('pointermove', swiper.onTouchMove as EventListener, {
    passive: false,
    capture,
  });
  document[domMethod]('touchend', swiper.onTouchEnd as EventListener, { passive: true });
  document[domMethod]('pointerup', swiper.onTouchEnd as EventListener, { passive: true });
  document[domMethod]('pointercancel', swiper.onTouchEnd as EventListener, { passive: true });
  document[domMethod]('touchcancel', swiper.onTouchEnd as EventListener, { passive: true });
  document[domMethod]('pointerout', swiper.onTouchEnd as EventListener, { passive: true });
  document[domMethod]('pointerleave', swiper.onTouchEnd as EventListener, { passive: true });
  document[domMethod]('contextmenu', swiper.onTouchEnd as EventListener, { passive: true });

  // Prevent Links Clicks
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]('click', swiper.onClick as EventListener, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]('scroll', swiper.onScroll);
  }

  // Resize handler
  const subscribe = (events: string): void => {
    swiper[swiperMethod](events, onResize, true);
  };
  if (params.updateOnWindowResize) {
    subscribe(
      device.ios || device.android
        ? 'resize orientationchange observerUpdate'
        : 'resize observerUpdate',
    );
  } else {
    subscribe('observerUpdate');
  }

  // Images loader
  el[domMethod]('load', swiper.onLoad as EventListener, { capture: true });
};

function attachEvents(this: Swiper): void {
  const swiper = this;
  const { params } = swiper;

  swiper.onTouchStart = onTouchStart.bind(swiper);
  swiper.onTouchMove = onTouchMove.bind(swiper);
  swiper.onTouchEnd = onTouchEnd.bind(swiper);
  swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);

  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }

  swiper.onClick = onClick.bind(swiper);
  swiper.onLoad = onLoad.bind(swiper);

  events(swiper, 'on');
}

function detachEvents(this: Swiper): void {
  const swiper = this;
  events(swiper, 'off');
}

export default {
  attachEvents,
  detachEvents,
};
