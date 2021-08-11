export default function EffectCards({ swiper, extendParams, on }) {
  extendParams({
    cardsEffect: {
      transformEl: null,
    },
  });

  const setTranslate = () => {
    const { slides, activeIndex } = swiper;
    const params = swiper.params.cardsEffect;
    const { startTranslate, isTouched } = swiper.touchEventsData;
    const currentTranslate = swiper.translate;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      const slideProgress = $slideEl[0].progress;
      const progress = Math.min(Math.max(slideProgress, -4), 4);
      let offset = $slideEl[0].swiperSlideOffset;
      if (swiper.params.centeredSlides && !swiper.params.cssMode) {
        swiper.$wrapperEl.transform(`translateX(${swiper.minTranslate()}px)`);
      }
      if (swiper.params.centeredSlides && swiper.params.cssMode) {
        offset -= slides[0].swiperSlideOffset;
      }
      let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let tY = 0;
      const tZ = -100 * Math.abs(progress);
      let scale = 1;
      let rotate = -2 * progress;

      let tXAdd = 8 - Math.abs(progress) * 0.75;

      const isSwipeToNext =
        (i === activeIndex || i === activeIndex - 1) &&
        progress > 0 &&
        progress < 1 &&
        (isTouched || swiper.params.cssMode) &&
        currentTranslate < startTranslate;
      const isSwipeToPrev =
        (i === activeIndex || i === activeIndex + 1) &&
        progress < 0 &&
        progress > -1 &&
        (isTouched || swiper.params.cssMode) &&
        currentTranslate > startTranslate;
      if (isSwipeToNext || isSwipeToPrev) {
        const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
        rotate += -28 * progress * subProgress;
        scale += -0.5 * subProgress;
        tXAdd += 96 * subProgress;
        tY = `${-25 * subProgress * Math.abs(progress)}%`;
      }

      if (progress < 0) {
        // next
        tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`;
      } else if (progress > 0) {
        // prev
        tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`;
      } else {
        tX = `${tX}px`;
      }
      if (!swiper.isHorizontal()) {
        const prevY = tY;
        tY = tX;
        tX = prevY;
      }

      const scaleString =
        progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
      const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${rotate}deg)
        scale(${scaleString})
      `;

      $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      if (params.transformEl) {
        $slideEl
          .find(params.transformEl)
          .css({
            'backface-visibility': 'hidden',
            '-webkit-backface-visibility': 'hidden',
          })
          .transform(transform);
      } else {
        $slideEl.transform(transform);
      }
    }
  };

  const setTransition = (duration) => {
    const { slides, activeIndex, $wrapperEl } = swiper;
    const { transformEl } = swiper.params.cardsEffect;
    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    $transitionElements.transition(duration);

    if (swiper.params.virtualTranslate && duration !== 0) {
      let eventTriggered = false;
      const $transitionEndTarget = transformEl
        ? slides.eq(activeIndex).find(transformEl)
        : slides.eq(activeIndex);
      // eslint-disable-next-line
      $transitionEndTarget.transitionEnd(() => {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
        for (let i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  };

  on('beforeInit', () => {
    if (swiper.params.effect !== 'cards') return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}cards`);
    swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    const overwriteParams = {
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode,
    };
    Object.assign(swiper.params, overwriteParams);
    Object.assign(swiper.originalParams, overwriteParams);
  });
  on('setTranslate', () => {
    if (swiper.params.effect !== 'cards') return;
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    if (swiper.params.effect !== 'cards') return;
    setTransition(duration);
  });
}
