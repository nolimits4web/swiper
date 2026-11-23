import assert from 'node:assert/strict';
import test from 'node:test';

import defaults from '../../src/core/defaults.mjs';
import onTouchStart from '../../src/core/events/onTouchStart.mjs';
import onClick from '../../src/core/events/onClick.mjs';
import { getDocument } from 'ssr-window';

test('default focusable elements include links', () => {
  assert.match(defaults.focusableElements, /(^|,\s*)a(,|$)/);
});

test('touch start does not prevent default for links', () => {
  const document = getDocument();
  if (document.activeElement) {
    document.activeElement.matches = () => false;
  }
  const target = {
    nodeName: 'A',
    isContentEditable: false,
    closest: () => null,
    matches: (selector) => selector.split(', ').includes('a'),
  };

  let prevented = false;
  const event = {
    type: 'pointerdown',
    pointerId: 1,
    pointerType: 'touch',
    target,
    pageX: 100,
    pageY: 100,
    preventDefault: () => {
      prevented = true;
    },
  };

  const swiper = {
    params: { ...defaults, touchEventsTarget: 'container' },
    enabled: true,
    animating: false,
    allowTouchMove: true,
    allowSlideNext: true,
    allowSlidePrev: true,
    touchEventsData: {
      pointerId: null,
      isTouched: false,
      isMoved: false,
      focusableElements: defaults.focusableElements,
    },
    touches: {},
    updateSize: () => {},
    emit: () => {},
  };

  onTouchStart.call(swiper, event);

  assert.equal(target.matches(defaults.focusableElements), true);
  assert.equal(prevented, false);
});

test('preventClicks options control link clicks without blocking native navigation', () => {
  let prevented = false;
  let stopped = false;
  const event = {
    preventDefault: () => {
      prevented = true;
    },
    stopPropagation: () => {
      stopped = true;
    },
    stopImmediatePropagation: () => {
      stopped = true;
    },
  };

  onClick.call(
    {
      enabled: true,
      allowClick: true,
      animating: false,
      params: {
        preventClicks: true,
        preventClicksPropagation: true,
      },
    },
    event,
  );

  assert.equal(prevented, false);
  assert.equal(stopped, false);
});
