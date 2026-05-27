import type { SwiperModuleFn } from '../../core/core';
import type {
  HashNavigationEvents,
  HashNavigationMethods,
  HashNavigationOptions,
} from '../../types/modules/hash-navigation.d.ts';
import { elementChildren } from '../../shared/utils';

export type { HashNavigationEvents, HashNavigationMethods, HashNavigationOptions };

declare module '../../core/core' {
  interface Swiper {
    hashNavigation: HashNavigationMethods;
  }
  interface SwiperOptions {
    hashNavigation?: HashNavigationOptions | boolean;
  }
  interface SwiperParams {
    hashNavigation?: HashNavigationOptions;
  }
  interface SwiperEvents extends HashNavigationEvents {}
}

const HashNavigation: SwiperModuleFn = ({ swiper, extendParams, emit, on }) => {
  let initialized = false;
  extendParams({
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false,
      // _s parameter typed `any` to satisfy the legacy Swiper signature in
      // HashNavigationOptions.getSlideIndex; we use the closure-captured
      // `swiper` instead. Drops once HashNavigationOptions is rehomed.
      getSlideIndex(_s: any, hash: string): number {
        if (swiper.virtual && (swiper.params.virtual as any).enabled) {
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
  const onHashChange = (): void => {
    emit('hashChange');
    const newHash = document.location.hash.replace('#', '');
    const activeSlideEl =
      swiper.virtual && (swiper.params.virtual as any).enabled
        ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`)
        : swiper.slides[swiper.activeIndex];
    const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') : '';
    if (newHash !== activeSlideHash) {
      // `swiper as any` bridges the legacy Swiper type embedded in the user-
      // supplied getSlideIndex signature (from src/types/modules/) with the
      // new core/core Swiper. Drops in Phase 5 when src/types/ is removed.
      const newIndex = swiper.params.hashNavigation!.getSlideIndex!(swiper as any, newHash);
      if (typeof newIndex === 'undefined' || Number.isNaN(newIndex)) return;
      swiper.slideTo(newIndex);
    }
  };
  const setHash = (): void => {
    const hashParams = swiper.params.hashNavigation!;
    if (!initialized || !hashParams.enabled) return;
    const activeSlideEl =
      swiper.virtual && (swiper.params.virtual as any).enabled
        ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`)
        : swiper.slides[swiper.activeIndex];
    const activeSlideHash = activeSlideEl
      ? activeSlideEl.getAttribute('data-hash') || activeSlideEl.getAttribute('data-history')
      : '';
    if (hashParams.replaceState && window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#${activeSlideHash}` || '');
      emit('hashSet');
    } else {
      document.location.hash = activeSlideHash || '';
      emit('hashSet');
    }
  };
  const init = (): void => {
    const hashParams = swiper.params.hashNavigation!;
    const historyParams = swiper.params.history;
    if (!hashParams.enabled || (historyParams && historyParams.enabled)) return;
    initialized = true;
    const hash = document.location.hash.replace('#', '');
    if (hash) {
      const speed = 0;
      const index = hashParams.getSlideIndex!(swiper as any, hash);
      swiper.slideTo(index || 0, speed, swiper.params.runCallbacksOnInit, true);
    }
    if (hashParams.watchState) {
      window.addEventListener('hashchange', onHashChange);
    }
  };
  const destroy = (): void => {
    if (swiper.params.hashNavigation!.watchState) {
      window.removeEventListener('hashchange', onHashChange);
    }
  };

  on('init', () => {
    if (swiper.params.hashNavigation!.enabled) {
      init();
    }
  });
  on('destroy', () => {
    if (swiper.params.hashNavigation!.enabled) {
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
