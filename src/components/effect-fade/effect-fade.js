import Utils from '../../utils/utils';
import $ from '../../utils/dom';

const Fade = {
  setTranslate() {
    const swiper = this;
    const { slides } = swiper;
    // eslint-disable-next-line
    for (let i = -2; i < 3; i++) {
      const slide = slides.eq(swiper.activeIndex + i);
      if (slide && slide.attr('transform')) {
        slide.transform(slide.attr('transform'));
        slide.removeAttr('transform');
      }
    }
  },
  setTransition(duration) {
    const swiper = this;
    const { slides, $wrapperEl } = swiper;

    const foundElements = [];
    if (slides[swiper.activeIndex]) foundElements.push(slides[swiper.activeIndex]);

    if (slides[swiper.activeIndex + 1]) foundElements.push(slides[swiper.activeIndex + 1]);

    if (slides[swiper.activeIndex - 1]) foundElements.push(slides[swiper.activeIndex - 1]);

    $(foundElements).transition(duration);

    if (swiper.params.virtualTranslate && duration !== 0) {
      let eventTriggered = false;
      $(foundElements).transitionEnd(() => {
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
  },
};

export default {
  name: 'effect-fade',
  params: {
    fadeEffect: {
      crossFade: false,
    },
  },
  create() {
    const swiper = this;
    Utils.extend(swiper, {
      fadeEffect: {
        setTranslate: Fade.setTranslate.bind(swiper),
        setTransition: Fade.setTransition.bind(swiper),
      },
    });
  },
  on: {
    init() {
      const swiper = this;
      const slides = swiper.slides;
      for (let i = 0; i < slides.length; i += 1) {
        const $slideEl = swiper.slides.eq(i);
        const offset = $slideEl[0].swiperSlideOffset;
        let tx = -offset;
        if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
        let ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }

        $slideEl.attr('transform', `translate(${tx}px, ${ty}px)`);
        if (i === 0 || i === 1) {
          $slideEl.transform(`translate(${tx}px, ${ty}px)`);
        }
      }
    },
    beforeInit() {
      const swiper = this;
      if (swiper.params.effect !== 'fade') return;
      swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
      const overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate() {
      const swiper = this;
      if (swiper.params.effect !== 'fade') return;
      swiper.fadeEffect.setTranslate();
    },
    setTransition(duration) {
      const swiper = this;
      if (swiper.params.effect !== 'fade') return;
      swiper.fadeEffect.setTransition(duration);
    },
  },
};
