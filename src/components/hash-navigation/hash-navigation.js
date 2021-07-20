import { getWindow, getDocument } from 'ssr-window';
import $ from '../../utils/dom';
import { bindModuleMethods } from '../../utils/utils';

const HashNavigation = {
  onHashChange() {
    const swiper = this;
    const document = getDocument();
    swiper.emit('hashChange');
    const newHash = document.location.hash.replace('#', '');
    const activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
    if (newHash !== activeSlideHash) {
      const newIndex = swiper.$wrapperEl
        .children(`.${swiper.params.slideClass}[data-hash="${newHash}"]`)
        .index();
      if (typeof newIndex === 'undefined') return;
      swiper.slideTo(newIndex);
    }
  },
  setHash() {
    const swiper = this;
    const window = getWindow();
    const document = getDocument();
    if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) return;
    if (
      swiper.params.hashNavigation.replaceState &&
      window.history &&
      window.history.replaceState
    ) {
      window.history.replaceState(
        null,
        null,
        `#${swiper.slides.eq(swiper.activeIndex).attr('data-hash')}` || '',
      );
      swiper.emit('hashSet');
    } else {
      const slide = swiper.slides.eq(swiper.activeIndex);
      const hash = slide.attr('data-hash') || slide.attr('data-history');
      document.location.hash = hash || '';
      swiper.emit('hashSet');
    }
  },
  init() {
    const swiper = this;
    const document = getDocument();
    const window = getWindow();
    if (
      !swiper.params.hashNavigation.enabled ||
      (swiper.params.history && swiper.params.history.enabled)
    )
      return;
    swiper.hashNavigation.initialized = true;
    const hash = document.location.hash.replace('#', '');
    if (hash) {
      const speed = 0;
      for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
        const slide = swiper.slides.eq(i);
        const slideHash = slide.attr('data-hash') || slide.attr('data-history');
        if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
          const index = slide.index();
          swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
        }
      }
    }
    if (swiper.params.hashNavigation.watchState) {
      $(window).on('hashchange', swiper.hashNavigation.onHashChange);
    }
  },
  destroy() {
    const swiper = this;
    const window = getWindow();
    if (swiper.params.hashNavigation.watchState) {
      $(window).off('hashchange', swiper.hashNavigation.onHashChange);
    }
  },
};
export default {
  name: 'hash-navigation',
  params: {
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false,
    },
  },
  create() {
    const swiper = this;
    bindModuleMethods(swiper, {
      hashNavigation: {
        initialized: false,
        ...HashNavigation,
      },
    });
  },
  on: {
    init(swiper) {
      if (swiper.params.hashNavigation.enabled) {
        swiper.hashNavigation.init();
      }
    },
    destroy(swiper) {
      if (swiper.params.hashNavigation.enabled) {
        swiper.hashNavigation.destroy();
      }
    },
    'transitionEnd _freeModeNoMomentumRelease': (swiper) => {
      if (swiper.hashNavigation.initialized) {
        swiper.hashNavigation.setHash();
      }
    },
    slideChange(swiper) {
      if (swiper.hashNavigation.initialized && swiper.params.cssMode) {
        swiper.hashNavigation.setHash();
      }
    },
  },
};
