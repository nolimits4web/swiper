import type { Swiper, SwiperModuleFn } from '../../core/core';
import { elementChildren } from '../../shared/utils';

export interface HashNavigationOptions {
  /**
   * Boolean property to use with breakpoints to enable/disable hash navigation on certain breakpoints
   *
   * @default false
   */
  enabled?: boolean;

  /**
   * Set to `true` to enable also navigation through slides (when hashnav
   * is enabled) by browser history or by setting directly hash on document location
   *
   * @default false
   */
  watchState?: boolean;

  /**
   * Works in addition to hashnav to replace current url state with the
   * new one instead of adding it to history
   *
   * @default     false
   */
  replaceState?: boolean;

  /**
   * Designed to be used with Virtual slides when it is impossible to find slide in DOM by hash (e.g. not yet rendered)
   *
   */
  getSlideIndex?: (swiper: Swiper, hash: string) => number;
}

export interface HashNavigationMethods {}

export interface HashNavigationEvents {
  /**
   * Event will be fired on window hash change
   */
  hashChange: (swiper: Swiper) => void;
  /**
   * Event will be fired when swiper updates the hash
   */
  hashSet: (swiper: Swiper) => void;
}

// All HashNavigationOptions fields are optional in the public type, but
// extendParams fills them in at module init time. Use this view internally to
// access defaults without proliferating `!` non-null assertions through the module.
type HashNavigationParamsRuntime = Required<HashNavigationOptions>;

declare module '../../core/core' {
  interface Swiper {
    hashNavigation: HashNavigationMethods;
  }
  interface SwiperOptions {
    /**
     * Enables hash url navigation to for slides.
     * Object with hash navigation parameters or boolean `true` to enable with default settings
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   hashNavigation: {
     *     replaceState: true,
     *   },
     * });
     * ```
     */
    hashNavigation?: HashNavigationOptions | boolean;
  }
  interface SwiperParams {
    hashNavigation?: HashNavigationOptions;
  }
  interface SwiperEvents extends HashNavigationEvents {}
}

const isVirtualEnabled = (swiper: Swiper): boolean =>
  !!swiper.virtual && !!(swiper.params.virtual as { enabled?: boolean } | undefined)?.enabled;

const HashNavigation: SwiperModuleFn = ({ swiper, extendParams, emit, on }) => {
  let initialized = false;
  extendParams({
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false,
      getSlideIndex(_s: Swiper, hash: string): number {
        if (isVirtualEnabled(swiper)) {
          const slideWithHash = swiper.slides.find(
            (slideEl) => slideEl.getAttribute('data-hash') === hash,
          );
          if (!slideWithHash) return 0;
          const index = parseInt(slideWithHash.getAttribute('data-swiper-slide-index') || '0', 10);
          return index;
        }
        const matched = elementChildren(
          swiper.slidesEl,
          `.${swiper.params.slideClass}[data-hash="${hash}"], swiper-slide[data-hash="${hash}"]`,
        )[0];
        return matched ? swiper.getSlideIndex(matched as HTMLElement) : 0;
      },
    },
  });

  function getParams(): HashNavigationParamsRuntime {
    return swiper.params.hashNavigation as HashNavigationParamsRuntime;
  }

  const onHashChange = (): void => {
    emit('hashChange');
    const newHash = document.location.hash.replace('#', '');
    const activeSlideEl = isVirtualEnabled(swiper)
      ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`)
      : swiper.slides[swiper.activeIndex];
    const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') : '';
    if (newHash !== activeSlideHash) {
      const newIndex = getParams().getSlideIndex(swiper, newHash);
      if (typeof newIndex === 'undefined' || Number.isNaN(newIndex)) return;
      swiper.slideTo(newIndex);
    }
  };
  const setHash = (): void => {
    const params = getParams();
    if (!initialized || !params.enabled) return;
    const activeSlideEl = isVirtualEnabled(swiper)
      ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`)
      : swiper.slides[swiper.activeIndex];
    const activeSlideHash = activeSlideEl
      ? activeSlideEl.getAttribute('data-hash') || activeSlideEl.getAttribute('data-history')
      : '';
    if (params.replaceState && window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#${activeSlideHash}` || '');
      emit('hashSet');
    } else {
      document.location.hash = activeSlideHash || '';
      emit('hashSet');
    }
  };
  const init = (): void => {
    const params = getParams();
    const historyParams = swiper.params.history as { enabled?: boolean } | undefined;
    if (!params.enabled || (historyParams && historyParams.enabled)) return;
    initialized = true;
    const hash = document.location.hash.replace('#', '');
    if (hash) {
      const speed = 0;
      const index = params.getSlideIndex(swiper, hash);
      swiper.slideTo(index || 0, speed, swiper.params.runCallbacksOnInit, true);
    }
    if (params.watchState) {
      window.addEventListener('hashchange', onHashChange);
    }
  };
  const destroy = (): void => {
    if (getParams().watchState) {
      window.removeEventListener('hashchange', onHashChange);
    }
  };

  on('init', () => {
    if (getParams().enabled) {
      init();
    }
  });
  on('destroy', () => {
    if (getParams().enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', () => {
    if (initialized) {
      setHash();
    }
  });
  on('slideChange', () => {
    if (initialized && swiper.params.cssMode) {
      setHash();
    }
  });
};

export default HashNavigation;
