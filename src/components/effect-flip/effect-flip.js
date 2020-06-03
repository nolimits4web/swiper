import $ from '../../utils/dom';
import { extend, bindModuleMethods } from '../../utils/utils';

const Flip = {
  setTranslate() {
    const swiper = this;
    const { slides, rtlTranslate: rtl } = swiper;
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
      let tx = -offset;
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

      if (swiper.params.flipEffect.slideShadows) {
        // Set shadows
        let shadowBefore = swiper.isHorizontal()
          ? $slideEl.find('.swiper-slide-shadow-left')
          : $slideEl.find('.swiper-slide-shadow-top');
        let shadowAfter = swiper.isHorizontal()
          ? $slideEl.find('.swiper-slide-shadow-right')
          : $slideEl.find('.swiper-slide-shadow-bottom');
        if (shadowBefore.length === 0) {
          shadowBefore = $(
            `<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`,
          );
          $slideEl.append(shadowBefore);
        }
        if (shadowAfter.length === 0) {
          shadowAfter = $(
            `<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`,
          );
          $slideEl.append(shadowAfter);
        }
        if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
        if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
      }
      $slideEl.transform(
        `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      );
    }
  },
  setTransition(duration) {
    const swiper = this;
    const { slides, activeIndex, $wrapperEl } = swiper;
    slides
      .transition(duration)
      .find(
        '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
      )
      .transition(duration);
    if (swiper.params.virtualTranslate && duration !== 0) {
      let eventTriggered = false;
      // eslint-disable-next-line
      slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
        eventTriggered = true;
        swiper.animating = false;
        const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
        for (let i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  },
};

export default {
  name: 'effect-flip',
  params: {
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
    },
  },
  create() {
    const swiper = this;
    bindModuleMethods(swiper, {
      flipEffect: {
        ...Flip,
      },
    });
  },
  on: {
    beforeInit(swiper) {
      if (swiper.params.effect !== 'flip') return;
      swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
      const overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      extend(swiper.params, overwriteParams);
      extend(swiper.originalParams, overwriteParams);
    },
    setTranslate(swiper) {
      if (swiper.params.effect !== 'flip') return;
      swiper.flipEffect.setTranslate();
    },
    setTransition(swiper, duration) {
      if (swiper.params.effect !== 'flip') return;
      swiper.flipEffect.setTransition(duration);
    },
  },
};
