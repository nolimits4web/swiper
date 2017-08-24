import $ from '../../utils/dom';
import Utils from '../../utils/utils';

const Parallax = {
  setTransform(el, progress) {
    const swiper = this;
    const { rtl } = swiper;

    const $el = $(el);
    const rtlFactor = rtl ? -1 : 1;

    const p = $el.attr('data-swiper-parallax') || '0';
    let pX = $el.attr('data-swiper-parallax-x');
    let pY = $el.attr('data-swiper-parallax-y');

    if (pX || pY) {
      pX = pX || '0';
      pY = pY || '0';
    } else if (swiper.isHorizontal()) {
      pX = p;
      pY = '0';
    } else {
      pY = p;
      pX = '0';
    }

    if ((pX).indexOf('%') >= 0) {
      pX = `${parseInt(pX, 10) * progress * rtlFactor}%`;
    } else {
      pX = `${pX * progress * rtlFactor}px`;
    }
    if ((pY).indexOf('%') >= 0) {
      pY = `${parseInt(pY, 10) * progress}%`;
    } else {
      pY = `${pY * progress}px`;
    }

    $el.transform(`translate3d(${pX}, ${pY}, 0px)`);
  },
  setTranslate() {
    const swiper = this;
    const { $el, slides, progress } = swiper;
    $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
      .each((index, el) => {
        Parallax.setTransform(el, progress);
      });
    slides.each((slideIndex, slideEl) => {
      $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
        .each((index, el) => {
          const slideProgress = Math.min(Math.max(slideEl.progress, -1), 1);
          Parallax.setTransform(el, slideProgress);
        });
    });
  },
  setTransition(duration = this.params.speed) {
    const swiper = this;
    const { $el } = swiper;
    $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
      .each((index, parallaxEl) => {
        const $parallaxEl = $(parallaxEl);
        let parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
        if (duration === 0) parallaxDuration = 0;
        $parallaxEl.transition(parallaxDuration);
      });
  },
};

export default {
  name: 'parallax',
  create() {
    const swiper = this;
    Utils.extend(swiper, {
      parallax: {
        setTransform: Parallax.setTransform.bind(swiper),
        setTranslate: Parallax.setTranslate.bind(swiper),
        setTransition: Parallax.setTransition.bind(swiper),
      },
    });
  },
  on: {
    init() {
      const swiper = this;
      swiper.parallax.setTranslate();
    },
    setTranslate() {
      const swiper = this;
      swiper.parallax.setTranslate();
    },
    setTransition(duration) {
      const swiper = this;
      swiper.parallax.setTransition(duration);
    },
  },
};
