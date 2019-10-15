export default function (coordinate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
  const swiper = this;

  const {
    params,
  } = swiper;

  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }

  const minTranslate = swiper.minTranslate();
  const maxTranslate = swiper.maxTranslate();
  let translate;
  if (translateBounds && coordinate < minTranslate) translate = minTranslate;
  else if (translateBounds && coordinate > maxTranslate) translate = maxTranslate;
  else translate = coordinate;

  // Update progress
  swiper.updateProgress(translate);

  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(translate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionEnd');
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(translate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionStart');
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onScrollToWrapperTransitionEnd) {
        swiper.onScrollToWrapperTransitionEnd = function transitionEnd(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onScrollToWrapperTransitionEnd);
          swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onScrollToWrapperTransitionEnd);
          swiper.onScrollToWrapperTransitionEnd = null;
          delete swiper.onScrollToWrapperTransitionEnd;
          if (runCallbacks) {
            swiper.emit('transitionEnd');
          }
        };
      }
      swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onScrollToWrapperTransitionEnd);
      swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onScrollToWrapperTransitionEnd);
    }
  }

  return true;
}
