import $ from '../../shared/dom.js';

export default function EffectFlip({ swiper, extendParams, on }) {
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
      transformEl: null,
    },
  });

  const createShadow = (params, $slideEl, side) => {
    const $shadowEl = $(`<div class="swiper-slide-shadow-${side}"></div>`);
    if (params.transformEl) {
      $slideEl.find(params.transformEl).append($shadowEl);
    } else {
      $slideEl.append($shadowEl);
    }
    return $shadowEl;
  };

  const setTranslate = () => {
    const { slides, rtlTranslate: rtl } = swiper;
    const params = swiper.params.flipEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      let progress = $slideEl[0].progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      }
      const offset = $slideEl[0].swiperSlideOffset;
      const rotate = -180 * progress;
      let rotateY = rotate;
      let rotateX = 0;
      let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }

      $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

      if (params.slideShadows) {
        // Set shadows
        let shadowBefore = swiper.isHorizontal()
          ? $slideEl.find('.swiper-slide-shadow-left')
          : $slideEl.find('.swiper-slide-shadow-top');
        let shadowAfter = swiper.isHorizontal()
          ? $slideEl.find('.swiper-slide-shadow-right')
          : $slideEl.find('.swiper-slide-shadow-bottom');
        if (shadowBefore.length === 0) {
          shadowBefore = createShadow(params, $slideEl, swiper.isHorizontal() ? 'left' : 'top');
        }
        if (shadowAfter.length === 0) {
          shadowAfter = createShadow(params, $slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
        }
        if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
        if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
      }
      const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      if (params.transformEl) {
        $slideEl
          .find(params.transformEl)
          .css({ 'backface-visibility': 'hidden', '-webkit-backface-visibility': 'hidden' })
          .transform(transform);
      } else {
        $slideEl.transform(transform);
      }
    }
  };

  const setTransition = (duration) => {
    const { slides, activeIndex, $wrapperEl } = swiper;
    const { transformEl } = swiper.params.flipEffect;
    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    $transitionElements
      .transition(duration)
      .find(
        '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
      )
      .transition(duration);
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
    if (swiper.params.effect !== 'flip') return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
    swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
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
    if (swiper.params.effect !== 'flip') return;
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    if (swiper.params.effect !== 'flip') return;
    setTransition(duration);
  });
}
