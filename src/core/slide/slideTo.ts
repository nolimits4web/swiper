import { getBrowser } from '../../shared/get-browser';
import type { Swiper } from '../core';
import { isResizePending } from '../update/updateSize';

export default function slideTo(
  this: Swiper,
  index: number | string = 0,
  speed?: number,
  runCallbacks = true,
  internal?: boolean,
  initial?: boolean,
  directTransition?: boolean,
): boolean {
  if (typeof index === 'string') {
    index = parseInt(index, 10);
  }

  const swiper = this;

  if (swiper._directTransitionCleanup) {
    swiper._directTransitionCleanup();
  }

  let slideIndex: number = index as number;
  if (slideIndex < 0) slideIndex = 0;

  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled,
  } = swiper;

  if (
    (!enabled && !internal && !initial) ||
    swiper.destroyed ||
    (swiper.animating && params.preventInteractionOnTransition)
  ) {
    return false;
  }
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }

  const skip = Math.min(swiper.params.slidesPerGroupSkip!, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup!);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

  const translate = -snapGrid[snapIndex]!;
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate * 100);
      const normalizedGrid = Math.floor(slidesGrid[i]! * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i + 1]! * 100);
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (
          normalizedTranslate >= normalizedGrid &&
          normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2
        ) {
          slideIndex = i;
        } else if (
          normalizedTranslate >= normalizedGrid &&
          normalizedTranslate < normalizedGridNext
        ) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  // Directions locks
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (
      !swiper.allowSlideNext &&
      (rtl
        ? translate > swiper.translate && translate > swiper.minTranslate()
        : translate < swiper.translate && translate < swiper.minTranslate())
    ) {
      return false;
    }
    if (
      !swiper.allowSlidePrev &&
      translate > swiper.translate &&
      translate > swiper.maxTranslate()
    ) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }

  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }

  // Update progress
  swiper.updateProgress(translate);

  let direction: 'next' | 'prev' | 'reset';
  if (slideIndex > activeIndex) direction = 'next';
  else if (slideIndex < activeIndex) direction = 'prev';
  else direction = 'reset';

  // initial virtual
  const isVirtual = swiper.virtual && swiper.params.virtual?.enabled;
  const isInitialVirtual = isVirtual && initial;
  // Update Index
  if (
    !isInitialVirtual &&
    ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate))
  ) {
    swiper.updateActiveIndex(slideIndex);
    // Update Height
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }
    if (direction !== 'reset') {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    // onScroll() leaves the scroll this causes to onResize() while a resize is pending, and
    // onResize() re-seats the slider onto activeIndex - so it has to name this slide already.
    if (isResizePending(swiper)) swiper.updateActiveIndex(slideIndex);
    const isH = swiper.isHorizontal();
    const t = rtl ? translate : -translate;
    if (speed === 0) {
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = 'none';
        swiper._immediateVirtual = true;
      }

      if (isVirtual && !swiper._cssModeVirtualInitialSet && (swiper.params.initialSlide ?? 0) > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
        });
      } else {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      }
      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper.wrapperEl.style.scrollSnapType = '';
          swiper._immediateVirtual = false;
        });
      }
    } else {
      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: t,
        behavior: 'smooth',
      });
    }
    return true;
  }

  const browser = getBrowser();
  const isSafari = browser.isSafari;
  if (isVirtual && !initial && isSafari && swiper.isElement) {
    swiper.virtual.update(false, false, slideIndex);
  }

  const isDirect =
    typeof directTransition === 'undefined' ? params.directTransition : directTransition;
  const currentActiveIndex = activeIndex;
  const useDirectTransition =
    Boolean(isDirect) &&
    speed! > 0 &&
    !params.cssMode &&
    params.effect === 'slide' &&
    direction !== 'reset' &&
    Math.abs(slideIndex - currentActiveIndex) > 1 &&
    !isVirtual &&
    Boolean(swiper.slides[currentActiveIndex]) &&
    Boolean(swiper.slides[slideIndex]);

  if (useDirectTransition) {
    const currentSlide = swiper.slides[currentActiveIndex]!;
    const targetSlide = swiper.slides[slideIndex]!;

    const originalCurrentTransform = currentSlide.style.transform;
    const originalCurrentTransitionDuration = currentSlide.style.transitionDuration;
    const originalCurrentZIndex = currentSlide.style.zIndex;

    const originalTargetTransform = targetSlide.style.transform;
    const originalTargetTransitionDuration = targetSlide.style.transitionDuration;
    const originalTargetZIndex = targetSlide.style.zIndex;

    const isH = swiper.isHorizontal();
    const currentTranslate = swiper.translate;
    const targetTranslate = translate;

    const currentCoord = isH ? (rtl ? -currentTranslate : currentTranslate) : currentTranslate;
    const targetCoord = isH ? (rtl ? -targetTranslate : targetTranslate) : targetTranslate;
    const wrapperShift = targetCoord - currentCoord;

    const step = (direction === 'next' ? -1 : 1) * (rtl && isH ? -1 : 1) * swiper.size;

    const getTransform = (val: number) => {
      return isH ? `translate3d(${val}px, 0px, 0px)` : `translate3d(0px, ${val}px, 0px)`;
    };

    swiper.setTransition(0);
    swiper.setTranslate(translate);

    currentSlide.style.transitionDuration = '0ms';
    currentSlide.style.transform = getTransform(-wrapperShift);
    currentSlide.style.zIndex = '1';

    targetSlide.style.transitionDuration = '0ms';
    targetSlide.style.transform = getTransform(-step);
    targetSlide.style.zIndex = '2';

    // Force reflow
    void targetSlide.offsetHeight;

    currentSlide.style.transitionDuration = `${speed}ms`;
    currentSlide.style.transform = getTransform(-wrapperShift + step);

    targetSlide.style.transitionDuration = `${speed}ms`;
    targetSlide.style.transform = getTransform(0);

    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit('beforeTransitionStart', speed, internal);
    swiper.transitionStart(runCallbacks, direction);

    swiper.animating = true;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
      targetSlide.removeEventListener('transitionend', onTransitionEnd);
      currentSlide.style.transform = originalCurrentTransform;
      currentSlide.style.transitionDuration = originalCurrentTransitionDuration;
      currentSlide.style.zIndex = originalCurrentZIndex;
      targetSlide.style.transform = originalTargetTransform;
      targetSlide.style.transitionDuration = originalTargetTransitionDuration;
      targetSlide.style.zIndex = originalTargetZIndex;
      if (swiper._directTransitionCleanup === cleanup) {
        swiper._directTransitionCleanup = null;
      }
    };

    const onTransitionEnd = (e?: Event) => {
      if (e && e.target !== targetSlide) return;
      if (!swiper || swiper.destroyed) return;
      cleanup();
      swiper.transitionEnd(runCallbacks, direction);
    };

    targetSlide.addEventListener('transitionend', onTransitionEnd);
    timeoutId = setTimeout(onTransitionEnd, speed! + 50);

    swiper._directTransitionCleanup = cleanup;
    return true;
  }

  swiper.setTransition(speed!);
  swiper.setTranslate(translate);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit('beforeTransitionStart', speed, internal);
  swiper.transitionStart(runCallbacks, direction);

  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd(
        this: HTMLElement,
        e: TransitionEvent,
      ) {
        if (!swiper || swiper.destroyed) return;
        if (e.target !== this) return;
        swiper.wrapperEl.removeEventListener(
          'transitionend',
          swiper.onSlideToWrapperTransitionEnd as EventListener,
        );
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    swiper.wrapperEl.addEventListener(
      'transitionend',
      swiper.onSlideToWrapperTransitionEnd as EventListener,
    );
  }

  return true;
}
