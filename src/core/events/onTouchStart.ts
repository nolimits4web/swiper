import { now, elementIsChildOf } from '../../shared/utils';
import type { Swiper } from '../core';

// Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd
function closestElement(selector: string, base: Element): Element | null {
  type WalkableEl = Element & { assignedSlot?: HTMLSlotElement | null };
  function __closestFrom(el: WalkableEl | Document | Window | null | undefined): Element | null {
    if (!el || el === document || el === window) return null;
    let cur = el as WalkableEl;
    if (cur.assignedSlot) cur = cur.assignedSlot as WalkableEl;
    const found = cur.closest(selector);
    if (!found && !cur.getRootNode) {
      return null;
    }
    const root = cur.getRootNode() as Node & { host?: Element };
    return found || __closestFrom(root.host);
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
  // Legacy event wrappers (jQuery etc.) nest the native event under .originalEvent.
  type LegacyWrapped = { originalEvent?: TouchEvent | PointerEvent | MouseEvent };
  const e: TouchEvent | PointerEvent | MouseEvent = (event as LegacyWrapped).originalEvent ?? event;
  const data = swiper.touchEventsData;
  if (e.type === 'pointerdown') {
    const pe = e as PointerEvent;
    if (data.pointerId !== null && data.pointerId !== pe.pointerId) {
      return;
    }
    data.pointerId = pe.pointerId;
  } else if (e.type === 'touchstart' && (e as TouchEvent).targetTouches.length === 1) {
    data.touchId = (e as TouchEvent).targetTouches[0]!.identifier;
  }
  if (e.type === 'touchstart') {
    // don't proceed touch event
    preventEdgeSwipe(swiper, e, (e as TouchEvent).targetTouches[0]!.pageX);
    return;
  }

  const { params, touches, enabled } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && (e as PointerEvent).pointerType === 'mouse') return;

  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }

  let targetEl = e.target as HTMLElement;

  if (params.touchEventsTarget === 'wrapper') {
    if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
  }
  // Secondary mouse buttons (right-click / middle-click) shouldn't start a swipe.
  const mouseLike = e as MouseEvent;
  if (typeof mouseLike.which === 'number' && mouseLike.which === 3) return;
  if (typeof mouseLike.button === 'number' && mouseLike.button > 0) return;
  if (data.isTouched && data.isMoved) return;

  // change target el for shadow root component
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
  // `path` is a non-standard Chrome extension; `composedPath()` is the modern API.
  const eventPath = e.composedPath
    ? e.composedPath()
    : (e as Event & { path?: EventTarget[] }).path;
  if (
    swipingClassHasValue &&
    e.target &&
    (e.target as Element & { shadowRoot?: ShadowRoot | null }).shadowRoot &&
    eventPath
  ) {
    targetEl = eventPath[0] as HTMLElement;
  }

  const noSwipingSelector = params.noSwipingSelector
    ? params.noSwipingSelector
    : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(
    e.target && (e.target as Element & { shadowRoot?: ShadowRoot | null }).shadowRoot
  );

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
    if (typeof params.swipeHandler === 'string' && !targetEl.closest(params.swipeHandler)) return;
  }

  // At this point `e` is a PointerEvent or MouseEvent (touchstart returned earlier).
  const pe = e as PointerEvent;
  touches.currentX = pe.pageX;
  touches.currentY = pe.pageY;
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
  swiper.swipeDirection = undefined;
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
    (pe.pointerType === 'mouse' ||
      (pe.pointerType !== 'mouse' && !targetEl.matches(data.focusableElements)))
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
    params.freeMode.enabled &&
    swiper.freeMode &&
    swiper.animating &&
    !params.cssMode
  ) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit('touchStart', e);
}
