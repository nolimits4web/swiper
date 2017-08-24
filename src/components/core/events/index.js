import Device from '../../../utils/device';
import Support from '../../../utils/support';
import Browser from '../../../utils/browser';

import onTouchStart from './onTouchStart';
import onTouchMove from './onTouchMove';
import onTouchEnd from './onTouchEnd';
import onResize from './onResize';
import onClick from './onClick';

let onTouchStartBound;
let onTouchMoveBound;
let onTouchEndBound;
let onClickBound;

function attachEvents() {
  const swiper = this;

  const { params, touchEvents, el, wrapperEl } = swiper;

  if (process.env.TARGET !== 'desktop') {
    onTouchStartBound = onTouchStart.bind(swiper);
    onTouchMoveBound = onTouchMove.bind(swiper);
    onTouchEndBound = onTouchEnd.bind(swiper);
  }

  onClickBound = onClick.bind(swiper);

  const target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  const capture = !!params.nested;

  // Touch Events
  if (process.env.TARGET !== 'desktop') {
    if (Browser.ie) {
      target.addEventListener(touchEvents.start, onTouchStartBound, false);
      (Support.touch ? target : document).addEventListener(touchEvents.move, onTouchMoveBound, capture);
      (Support.touch ? target : document).addEventListener(touchEvents.end, onTouchEndBound, false);
    } else {
      if (Support.touch) {
        const passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        target.addEventListener(touchEvents.start, onTouchStartBound, passiveListener);
        target.addEventListener(touchEvents.move, onTouchMoveBound, capture);
        target.addEventListener(touchEvents.end, onTouchEndBound, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        target.addEventListener('mousedown', onTouchStartBound, false);
        document.addEventListener('mousemove', onTouchMoveBound, capture);
        document.addEventListener('mouseup', onTouchEndBound, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      target.addEventListener('click', onClickBound, true);
    }
  } else {
    target.addEventListener('click', onClickBound, false);
  }

  // Resize handler
  swiper.on('resize', onResize);
}

function detachEvents() {
  const swiper = this;

  const { params, touchEvents, el, wrapperEl } = swiper;

  const target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  const capture = !!params.nested;

  // Touch Events
  if (process.env.TARGET !== 'desktop') {
    if (Browser.ie) {
      target.removeEventListener(touchEvents.start, onTouchStartBound, false);
      (Support.touch ? target : document).removeEventListener(touchEvents.move, onTouchMoveBound, capture);
      (Support.touch ? target : document).removeEventListener(touchEvents.end, onTouchEndBound, false);
    } else {
      if (Support.touch) {
        const passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        target.removeEventListener(touchEvents.start, onTouchStartBound, passiveListener);
        target.removeEventListener(touchEvents.move, onTouchMoveBound, capture);
        target.removeEventListener(touchEvents.end, onTouchEndBound, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        target.removeEventListener('mousedown', onTouchStartBound, false);
        document.removeEventListener('mousemove', onTouchMoveBound, capture);
        document.removeEventListener('mouseup', onTouchEndBound, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      target.removeEventListener('click', onClickBound, true);
    }
  } else {
    target.removeEventListener('click', onClickBound, true);
  }

  // Resize handler
  swiper.off('resize', onResize);
}

export default {
  attachEvents,
  detachEvents,
};
