export default function EffectFade({ swiper, extendParams, on }) {
  extendParams({
    fadeEffect: {
      crossFade: false,
      transformEl: null,
    },
  });

  const setTranslate = () => {
    const { slides } = swiper;
    const params = swiper.params.fadeEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = swiper.slides.eq(i);
      const offset = $slideEl[0].swiperSlideOffset;
      let tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = swiper.params.fadeEffect.crossFade
        ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
        : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);

      const $translateTarget = params.transformEl ? $slideEl.find(params.transformEl) : $slideEl;
      $translateTarget
        .css({
          opacity: slideOpacity,
        })
        .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
    }
  };
  const setTransition = (duration) => {
    const { slides, $wrapperEl } = swiper;
    const { transformEl } = swiper.params.fadeEffect;
    const $transitionElements = transformEl ? slides.find(transformEl) : slides;
    $transitionElements.transition(duration);
    if (swiper.params.virtualTranslate && duration !== 0) {
      let eventTriggered = false;
      const $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;
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
    if (swiper.params.effect !== 'fade') return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
    const overwriteParams = {
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode,
    };
    Object.assign(swiper.params, overwriteParams);
    Object.assign(swiper.originalParams, overwriteParams);
  });
  on('setTranslate', () => {
    if (swiper.params.effect !== 'fade') return;
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    if (swiper.params.effect !== 'fade') return;
    setTransition(duration);
  });
}
