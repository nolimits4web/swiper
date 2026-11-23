import assert from 'node:assert/strict';
import { getDocument } from 'ssr-window';

import onTouchStart from '../src/core/events/onTouchStart.js';
import onTouchMove from '../src/core/events/onTouchMove.js';
import onTouchEnd from '../src/core/events/onTouchEnd.js';

if (getDocument().activeElement) {
  getDocument().activeElement.matches = () => false;
}

console.log('Running touch event handling tests for v9 backport...\n');

function createMockSwiper() {
  return {
    params: {
      touchAngle: 45,
      threshold: 0,
      simulateTouch: true,
      touchStartPreventDefault: true,
      touchStartForcePreventDefault: false,
    },
    touchEventsData: {
      isTouched: false,
      isMoved: false,
      allowTouchCallbacks: true,
      touchStartTime: 0,
      isScrolling: undefined,
      currentTranslate: 0,
      startTranslate: 0,
      allowThresholdMove: true,
      focusableElements: 'input, select, option, textarea, button, video, label',
      lastClickTime: 0,
      velocities: [],
      allowMomentumBounce: undefined,
      startMoving: undefined,
      evCache: [],
      pointerId: null,
      touchId: null,
    },
    touches: {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      diff: 0,
    },
    enabled: true,
    animating: false,
    allowTouchMove: true,
    isHorizontal: () => true,
    isVertical: () => false,
    updateSize: () => {},
    emit: (event) => {},
    getTranslate: () => 0,
    setTranslate: () => {},
    setTransition: () => {},
    translate: 0,
    minTranslate: () => 0,
    maxTranslate: () => -500,
  };
}

// Test 1: Native touchstart tracks touchId
{
  const swiper = createMockSwiper();
  const touchEvent = {
    type: 'touchstart',
    targetTouches: [{ identifier: 101, pageX: 50, pageY: 100 }],
    target: { matches: () => false, closest: () => null },
    preventDefault: () => {},
  };

  onTouchStart.call(swiper, touchEvent);
  assert.equal(swiper.touchEventsData.touchId, 101, 'touchstart should store touch identifier');

  // Then pointerdown sets up the touch data
  const pointerEvent = {
    type: 'pointerdown',
    pointerId: 1,
    pageX: 50,
    pageY: 100,
    target: { matches: () => false, closest: () => null },
    preventDefault: () => {},
  };
  onTouchStart.call(swiper, pointerEvent);

  assert.equal(swiper.touchEventsData.pointerId, 1, 'pointerdown should store pointerId');
  assert.equal(swiper.touchEventsData.isTouched, true, 'isTouched should be true');
  assert.equal(swiper.touches.startX, 50, 'startX should match');
  console.log('✓ Test 1: touchstart and pointerdown store IDs correctly');
}

// Test 2: Native touchmove handles swipe and prevents default on horizontal movement
{
  const swiper = createMockSwiper();
  swiper.touchEventsData.isTouched = true;
  swiper.touchEventsData.touchId = 101;
  swiper.touchEventsData.pointerId = 1;
  swiper.touches.startX = 50;
  swiper.touches.startY = 100;

  // Pointermove with touchId active should be skipped (ignored in favor of touchmove)
  let pointerMovePrevented = false;
  const pointerMove = {
    type: 'pointermove',
    pointerId: 1,
    pageX: 150,
    pageY: 100,
    preventDefault: () => {
      pointerMovePrevented = true;
    },
  };
  onTouchMove.call(swiper, pointerMove);
  assert.equal(
    pointerMovePrevented,
    false,
    'pointermove should be ignored when touchId is present',
  );
  assert.equal(
    swiper.touches.currentX,
    0,
    'touches.currentX should not be modified by skipped pointermove',
  );

  // Native touchmove event should be processed and call preventDefault()
  let touchMovePrevented = false;
  const touchMove = {
    type: 'touchmove',
    cancelable: true,
    changedTouches: [{ identifier: 101, pageX: 100, pageY: 102 }], // Horizontal swipe (diffX = 50, diffY = 2)
    target: { matches: () => false },
    preventDefault: () => {
      touchMovePrevented = true;
    },
  };
  onTouchMove.call(swiper, touchMove);

  assert.equal(swiper.touches.currentX, 100, 'currentX updated by touchmove');
  assert.equal(
    swiper.touchEventsData.isScrolling,
    false,
    'horizontal movement is recognized as non-scrolling',
  );
  assert.equal(
    touchMovePrevented,
    true,
    'native touchmove.preventDefault() was called to prevent vertical scroll',
  );
  console.log(
    '✓ Test 2: touchmove properly processes touch and calls preventDefault() on horizontal swipe',
  );
}

// Test 3: Native touchend cleans up touchId and pointerId
{
  const swiper = createMockSwiper();
  swiper.touchEventsData.isTouched = true;
  swiper.touchEventsData.isMoved = true;
  swiper.touchEventsData.touchId = 101;
  swiper.touchEventsData.pointerId = 1;
  swiper.browser = { isSafari: false, isWebView: false };
  swiper.params.threshold = 0;
  swiper.params.resistanceRatio = 0.85;
  swiper.params.touchAngle = 45;
  swiper.params.grabCursor = false;
  swiper.slidesGrid = [0, 100, 200];
  swiper.rtlTranslate = false;
  swiper.setTranslate = () => {};
  swiper.slideReset = () => {};
  swiper.slideTo = () => {};
  swiper.updateProgress = () => {};

  const touchEnd = {
    type: 'touchend',
    changedTouches: [{ identifier: 101, pageX: 100, pageY: 100 }],
    target: { matches: () => false },
  };

  onTouchEnd.call(swiper, touchEnd);

  assert.equal(swiper.touchEventsData.touchId, null, 'touchId should be reset to null');
  assert.equal(swiper.touchEventsData.pointerId, null, 'pointerId should be reset to null');
  console.log('✓ Test 3: touchend resets touchId and pointerId to null');
}

console.log('\nAll touch event tests passed successfully!\n');
