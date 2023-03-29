import { getWindow, getDocument } from 'ssr-window';

let support;

function calcSupport() {
  const window = getWindow();
  const document = getDocument();

  return {
    smoothScroll: document.documentElement && 'scrollBehavior' in document.documentElement.style,

    touch: !!(
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)
    ),

    // Maximum supported CSS position magnitude in px - todo: maybe actually find out somehow?
    maxPx: 2**23,
  };
}

function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}

export { getSupport };
