import { getDocument } from 'ssr-window';
import { now } from '../../shared/utils.mjs';

export default function onTouchMove(event) {
  const document = getDocument();
  const swiper = this;
  const data = swiper.touchEventsData;
  const { params, touches, rtlTranslate: rtl, enabled } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && event.pointerType === 'mouse') return;

  let e = event;
  if (e.originalEvent) e = e.originalEvent;

  if (e.type === 'pointermove') {
    if (data.touchId !== null) return; // return from pointer if we use touch
    const id = e.pointerId;
    if (id !== data.pointerId) return;
  }

  let targetTouch;
  if (e.type === 'touchmove') {
    targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  } else {
    targetTouch = e;
  }

  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    return;
  }

  const pageX = targetTouch.pageX;
  const pageY = targetTouch.pageY;

  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }

  if (!swiper.allowTouchMove) {
    if (!e.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY,
      });
      data.touchStartTime = now();
    }
    return;
  }

  if (params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      // Vertical
      if (
        (pageY < touches.startY && swiper.translate <= swiper.maxTranslate()) ||
        (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
      ) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (
      (pageX < touches.startX && swiper.translate <= swiper.maxTranslate()) ||
      (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
    ) {
      return;
    }
  }

  if (document.activeElement) {
    if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }

  if (data.allowTouchCallbacks) {
    swiper.emit('touchMove', e);
  }

  touches.previousX = touches.currentX;
  touches.previousY = touches.currentY;
  touches.currentX = pageX;
  touches.currentY = pageY;

  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold)
    return;

  if (typeof data.isScrolling === 'undefined') {
    let touchAngle;
    if (
      (swiper.isHorizontal() && touches.currentY === touches.startY) ||
      (swiper.isVertical() && touches.currentX === touches.startX)
    ) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
        data.isScrolling = swiper.isHorizontal()
          ? touchAngle > params.touchAngle
          : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }
  if (typeof data.startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }

  let diff = swiper.isHorizontal() ? diffX : diffY;
  let touchesDiff = swiper.isHorizontal()
    ? touches.currentX - touches.previousX
    : touches.currentY - touches.previousY;

  if (params.oneWayMovement) {
    diff = Math.abs(diff) * (rtl ? 1 : -1);
    touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
  }
  touches.diff = diff;

  diff *= params.touchRatio;
  if (rtl) {
    diff = -diff;
    touchesDiff = -touchesDiff;
  }

  const prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  swiper.touchesDirection = touchesDiff > 0 ? 'prev' : 'next';

  const isLoop = swiper.params.loop && !params.cssMode;
  const allowLoopFix =
    (swiper.touchesDirection === 'next' && swiper.allowSlideNext) ||
    (swiper.touchesDirection === 'prev' && swiper.allowSlidePrev);
  if (!data.isMoved) {
    if (isLoop && allowLoopFix) {
      swiper.loopFix({ direction: swiper.swipeDirection });
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      const evt = new window.CustomEvent('transitionend', {
        bubbles: true,
        cancelable: true,
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    // Grab Cursor
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit('sliderFirstMove', e);
  }
  let loopFixed;
  let time = new Date().getTime();

  if (
    data.isMoved &&
    data.allowThresholdMove &&
    prevTouchesDirection !== swiper.touchesDirection &&
    isLoop &&
    allowLoopFix &&
    Math.abs(diff) >= 1
  ) {
    Object.assign(touches, {
      startX: pageX,
      startY: pageY,
      currentX: pageX,
      currentY: pageY,
      startTranslate: data.currentTranslate,
    });
    data.loopSwapReset = true;
    data.startTranslate = data.currentTranslate;
    return;
  }
  swiper.emit('sliderMove', e);
  data.isMoved = true;

  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (
      isLoop &&
      allowLoopFix &&
      !loopFixed &&
      data.allowThresholdMove &&
      data.currentTranslate >
        (params.centeredSlides
          ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1]
          : swiper.minTranslate())
    ) {
      swiper.loopFix({ direction: 'prev', setTranslate: true, activeSlideIndex: 0 });
    }
    if (data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate =
          swiper.minTranslate() -
          1 +
          (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      }
    }
  } else if (diff < 0) {
    if (
      isLoop &&
      allowLoopFix &&
      !loopFixed &&
      data.allowThresholdMove &&
      data.currentTranslate <
        (params.centeredSlides
          ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1]
          : swiper.maxTranslate())
    ) {
      swiper.loopFix({
        direction: 'next',
        setTranslate: true,
        activeSlideIndex:
          swiper.slides.length -
          (params.slidesPerView === 'auto'
            ? swiper.slidesPerViewDynamic()
            : Math.ceil(parseFloat(params.slidesPerView, 10))),
      });
    }
    if (data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate =
          swiper.maxTranslate() +
          1 -
          (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }
    }
  }

  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }

  // Directions locks
  if (
    !swiper.allowSlideNext &&
    swiper.swipeDirection === 'next' &&
    data.currentTranslate < data.startTranslate
  ) {
    data.currentTranslate = data.startTranslate;
  }
  if (
    !swiper.allowSlidePrev &&
    swiper.swipeDirection === 'prev' &&
    data.currentTranslate > data.startTranslate
  ) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }

  // Threshold
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal()
          ? touches.currentX - touches.startX
          : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }

  if (!params.followFinger || params.cssMode) return;

  // Update active index in free mode
  if (
    (params.freeMode && params.freeMode.enabled && swiper.freeMode) ||
    params.watchSlidesProgress
  ) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  // Update progress
  swiper.updateProgress(data.currentTranslate);
  // Update translate
  swiper.setTranslate(data.currentTranslate);
}
