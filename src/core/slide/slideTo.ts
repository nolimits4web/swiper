import { getBrowser } from '../../shared/get-browser';
import type { Swiper } from '../core';

export default function slideTo(
  this: Swiper,
  index: number | string = 0,
  speed?: number,
  runCallbacks = true,
  internal?: boolean,
  initial?: boolean,
): boolean {
  if (typeof index === 'string') {
    index = parseInt(index, 10);
  }

  const swiper = this;

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
      } as any;
    }
    swiper.wrapperEl.addEventListener(
      'transitionend',
      swiper.onSlideToWrapperTransitionEnd as EventListener,
    );
  }

  return true;
}
