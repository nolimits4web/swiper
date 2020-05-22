import { getWindow, getDocument } from 'ssr-window';

let support;

function calcSupport() {
  const window = getWindow();
  const document = getDocument();

  return {
    touch: !!(
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)
    ),

    pointerEvents:
      !!window.PointerEvent &&
      'maxTouchPoints' in window.navigator &&
      window.navigator.maxTouchPoints >= 0,

    observer: (function checkObserver() {
      return 'MutationObserver' in window || 'WebkitMutationObserver' in window;
    })(),

    passiveListener: (function checkPassiveListener() {
      let supportsPassive = false;
      try {
        const opts = Object.defineProperty({}, 'passive', {
          // eslint-disable-next-line
          get() {
            supportsPassive = true;
          },
        });
        window.addEventListener('testPassiveListener', null, opts);
      } catch (e) {
        // No support
      }
      return supportsPassive;
    })(),

    gestures: (function checkGestures() {
      return 'ongesturestart' in window;
    })(),
  };
}

function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}

export { getSupport };
