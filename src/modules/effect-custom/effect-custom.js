export default function EffectCustom({ swiper, extendParams, on }) {
  extendParams({
    customEffect: {
      transformEl: null,
      limitProgress: 1,
      perspective: false,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1,
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1,
      },
    },
  });

  const getTranslateValue = (value) => {
    if (typeof value === 'string') return value;
    return `${value}px`;
  };

  const setTranslate = () => {
    const { slides } = swiper;
    const params = swiper.params.customEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      const progress = Math.min(
        Math.max($slideEl[0].progress, -params.limitProgress),
        params.limitProgress,
      );
      const offset = $slideEl[0].swiperSlideOffset;
      const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
      const r = [0, 0, 0];
      if (!swiper.isHorizontal()) {
        t[1] = t[0];
        t[0] = 0;
      }
      let data = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1,
      };
      if (progress < 0) {
        data = params.next;
      } else if (progress > 0) {
        data = params.prev;
      }
      // set translate
      t.forEach((value, index) => {
        t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(
          progress,
        )}))`;
      });
      // set rotates
      r.forEach((value, index) => {
        r[index] = data.rotate[index] * Math.abs(progress);
      });

      $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

      const translateString = t.join(', ');
      const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
      const scaleString =
        progress < 0
          ? `scale(${1 + (1 - data.scale) * progress})`
          : `scale(${1 - (1 - data.scale) * progress})`;
      const opacityString =
        progress < 0 ? 1 + (1 - data.opacity) * progress : 1 - (1 - data.opacity) * progress;
      const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`;

      if (params.transformEl) {
        $slideEl
          .find(params.transformEl)
          .css({
            'backface-visibility': 'hidden',
            '-webkit-backface-visibility': 'hidden',
            opacity: opacityString,
          })
          .transform(transform);
      } else {
        $slideEl.transform(transform).css({ opacity: opacityString });
      }
    }
  };

  const setTransition = (duration) => {
    const { slides, activeIndex, $wrapperEl } = swiper;
    const { transformEl } = swiper.params.customEffect;
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
    if (swiper.params.effect !== 'custom') return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}custom`);
    if (swiper.params.customEffect.perspective) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }
    const overwriteParams = {
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode,
    };
    Object.assign(swiper.params, overwriteParams);
    Object.assign(swiper.originalParams, overwriteParams);
  });
  on('setTranslate', () => {
    if (swiper.params.effect !== 'custom') return;
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    if (swiper.params.effect !== 'custom') return;
    setTransition(duration);
  });
}
