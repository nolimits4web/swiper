import $ from '../../shared/dom.js';

export default function Lazy({ swiper, extendParams, on }) {
  extendParams({
    lazy: {
      preloaderClass: 'swiper-lazy-preloader',
    },
  });

  const slideSelector = () => (swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`);

  const onLoad = (e) => {
    const slideEl = e.target.closest(slideSelector());
    if (!slideEl) return;
    $(slideEl).find(`.${swiper.params.lazy.preloaderClass}`).remove();
  };

  on('beforeInit', () => {
    if (swiper.el && swiper.$el) {
      swiper.$el.on('load', onLoad, { capture: true });
    }
  });

  on('destroy', () => {
    if (!swiper.$el || !swiper.el) return;
    swiper.$el.off('load', onLoad, { capture: true });
  });
}
