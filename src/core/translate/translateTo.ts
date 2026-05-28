import type { Swiper } from '../core';

export default function translateTo(
  this: Swiper,
  translate = 0,
  speed: number = this.params.speed!,
  runCallbacks = true,
  translateBounds = true,
  internal?: boolean,
): boolean {
  const swiper = this;

  const { params, wrapperEl } = swiper;

  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }

  const minTranslate = swiper.minTranslate();
  const maxTranslate = swiper.maxTranslate();
  let newTranslate: number;
  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;
  else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;
  else newTranslate = translate;

  // Update progress
  swiper.updateProgress(newTranslate);

  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
    } else {
      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: -newTranslate,
        behavior: 'smooth',
      });
    }
    return true;
  }

  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionEnd');
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionStart');
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(
          this: HTMLElement,
          e: TransitionEvent,
        ) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.wrapperEl.removeEventListener(
            'transitionend',
            swiper.onTranslateToWrapperTransitionEnd as EventListener,
          );
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          swiper.animating = false;
          if (runCallbacks) {
            swiper.emit('transitionEnd');
          }
        };
      }
      swiper.wrapperEl.addEventListener(
        'transitionend',
        swiper.onTranslateToWrapperTransitionEnd as EventListener,
      );
    }
  }

  return true;
}
