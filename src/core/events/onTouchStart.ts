import { now, elementIsChildOf } from '../../shared/utils';
import type { Swiper } from '../core';

// Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd
function closestElement(selector: string, base: Element): Element | null {
  function __closestFrom(el: any): Element | null {
    if (!el || el === document || el === window) return null;
    if (el.assignedSlot) el = el.assignedSlot;
    const found = el.closest(selector);
    if (!found && !el.getRootNode) {
      return null;
    }
    return found || __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}

function preventEdgeSwipe(swiper: Swiper, event: Event, startX: number): boolean {
  const { params } = swiper;
  const edgeSwipeDetection = params.edgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold!;
  if (
    edgeSwipeDetection &&
    (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)
  ) {
    if (edgeSwipeDetection === 'prevent') {
      event.preventDefault();
      return true;
    }
    return false;
  }
  return true;
}

export default function onTouchStart(
  this: Swiper,
  event: TouchEvent | PointerEvent | MouseEvent,
): void {
  const swiper = this;
  if (swiper.destroyed) return;
  let e: any = event;
  if ((e as any).originalEvent) e = (e as any).originalEvent;
  const data = swiper.touchEventsData;
  if (e.type === 'pointerdown') {
    if (data.pointerId !== null && data.pointerId !== e.pointerId) {
      return;
    }
    data.pointerId = e.pointerId;
  } else if (e.type === 'touchstart' && e.targetTouches.length === 1) {
    data.touchId = e.targetTouches[0].identifier;
  }
  if (e.type === 'touchstart') {
    // don't proceed touch event
    preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
    return;
  }

  const { params, touches, enabled } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === 'mouse') return;

  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }

  let targetEl: HTMLElement = e.target;

  if (params.touchEventsTarget === 'wrapper') {
    if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
  }
  if ('which' in e && (e as any).which === 3) return;
  if ('button' in e && (e as any).button > 0) return;
  if (data.isTouched && data.isMoved) return;

  // change target el for shadow root component
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
  // eslint-disable-next-line
  const eventPath = e.composedPath ? e.composedPath() : (e as any).path;
  if (swipingClassHasValue && e.target && (e.target as any).shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }

  const noSwipingSelector = params.noSwipingSelector
    ? params.noSwipingSelector
    : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e.target && (e.target as any).shadowRoot);

  // use closestElement for shadow root element to get the actual closest for nested shadow root element
  if (
    params.noSwiping &&
    (isTargetShadow
      ? closestElement(noSwipingSelector, targetEl)
      : targetEl.closest(noSwipingSelector))
  ) {
    swiper.allowClick = true;
    return;
  }

  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler as string)) return;
  }

  touches.currentX = e.pageX;
  touches.currentY = e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;

  // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

  if (!preventEdgeSwipe(swiper, e, startX)) {
    return;
  }

  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined,
  });

  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined as any;
  if (params.threshold! > 0) data.allowThresholdMove = false;
  let preventDefault = true;
  if (targetEl.matches(data.focusableElements)) {
    preventDefault = false;
    if (targetEl.nodeName === 'SELECT') {
      data.isTouched = false;
    }
  }

  if (
    document.activeElement &&
    (document.activeElement as Element).matches(data.focusableElements) &&
    document.activeElement !== targetEl &&
    (e.pointerType === 'mouse' ||
      (e.pointerType !== 'mouse' && !targetEl.matches(data.focusableElements)))
  ) {
    (document.activeElement as HTMLElement).blur();
  }

  const shouldPreventDefault =
    preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  if (
    (params.touchStartForcePreventDefault || shouldPreventDefault) &&
    !targetEl.isContentEditable
  ) {
    e.preventDefault();
  }
  if (
    params.freeMode &&
    (params.freeMode as any).enabled &&
    swiper.freeMode &&
    swiper.animating &&
    !params.cssMode
  ) {
    (swiper.freeMode as any).onTouchStart();
  }
  swiper.emit('touchStart', e);
}
