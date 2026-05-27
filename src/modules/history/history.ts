import type { SwiperModuleFn } from '../../core/core';
import type {
  HistoryEvents,
  HistoryMethods,
  HistoryOptions,
} from '../../types/modules/history.d.ts';

export type { HistoryEvents, HistoryMethods, HistoryOptions };

declare module '../../core/core' {
  interface Swiper {
    history: HistoryMethods;
  }
  interface SwiperOptions {
    history?: HistoryOptions | boolean;
  }
  interface SwiperParams {
    history?: HistoryOptions;
  }
  interface SwiperEvents extends HistoryEvents {}
}

interface PathValues {
  key: string | undefined;
  value: string | undefined;
}

const History: SwiperModuleFn = ({ swiper, extendParams, on }) => {
  extendParams({
    history: {
      enabled: false,
      root: '',
      replaceState: false,
      key: 'slides',
      keepQuery: false,
    },
  });

  let initialized = false;
  let paths: PathValues = { key: undefined, value: undefined };

  const slugify = (text: string): string => {
    return text
      .toString()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const getPathValues = (urlOverride?: string | null): PathValues => {
    let location: URL | Location;
    if (urlOverride) {
      location = new URL(urlOverride);
    } else {
      location = window.location;
    }
    const pathArray = location.pathname
      .slice(1)
      .split('/')
      .filter((part) => part !== '');
    const total = pathArray.length;
    const key = pathArray[total - 2];
    const value = pathArray[total - 1];
    return { key, value };
  };
  const setHistory = (key: string | undefined, index: number): void => {
    const histParams = swiper.params.history!;
    if (!initialized || !histParams.enabled) return;
    let location: URL | Location;
    if (swiper.params.url) {
      location = new URL(swiper.params.url);
    } else {
      location = window.location;
    }
    const slide =
      swiper.virtual && (swiper.params.virtual as any).enabled
        ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${index}"]`)
        : swiper.slides[index];
    if (!slide) return;
    let value = slugify(slide.getAttribute('data-history') || '');
    const root = histParams.root ?? '';
    if (root.length > 0) {
      const trimmedRoot = root[root.length - 1] === '/' ? root.slice(0, root.length - 1) : root;
      value = `${trimmedRoot}/${key ? `${key}/` : ''}${value}`;
    } else if (!location.pathname.includes(key || '')) {
      value = `${key ? `${key}/` : ''}${value}`;
    }
    if (histParams.keepQuery) {
      value += location.search;
    }
    const currentState = window.history.state as { value?: string } | null;
    if (currentState && currentState.value === value) {
      return;
    }
    if (histParams.replaceState) {
      window.history.replaceState({ value }, '', value);
    } else {
      window.history.pushState({ value }, '', value);
    }
  };

  const scrollToSlide = (
    speed: number,
    value: string | undefined,
    runCallbacks?: boolean,
  ): void => {
    if (value) {
      for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
        const slide = swiper.slides[i]!;
        const slideHistory = slugify(slide.getAttribute('data-history') || '');
        if (slideHistory === value) {
          const index = swiper.getSlideIndex(slide);
          swiper.slideTo(index, speed, runCallbacks);
        }
      }
    } else {
      swiper.slideTo(0, speed, runCallbacks);
    }
  };

  const setHistoryPopState = (): void => {
    paths = getPathValues(swiper.params.url);
    scrollToSlide(swiper.params.speed!, paths.value, false);
  };

  const init = (): void => {
    const histParams = swiper.params.history;
    if (!histParams) return;
    if (!window.history || !window.history.pushState) {
      histParams.enabled = false;
      (swiper.params.hashNavigation as any).enabled = true;
      return;
    }
    initialized = true;
    paths = getPathValues(swiper.params.url);
    if (!paths.key && !paths.value) {
      if (!histParams.replaceState) {
        window.addEventListener('popstate', setHistoryPopState);
      }
      return;
    }
    scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
    if (!histParams.replaceState) {
      window.addEventListener('popstate', setHistoryPopState);
    }
  };
  const destroy = (): void => {
    if (!swiper.params.history!.replaceState) {
      window.removeEventListener('popstate', setHistoryPopState);
    }
  };

  on('init', () => {
    if (swiper.params.history!.enabled) {
      init();
    }
  });
  on('destroy', () => {
    if (swiper.params.history!.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', () => {
    if (initialized) {
      setHistory(swiper.params.history!.key, swiper.activeIndex);
    }
  });
  on('slideChange', () => {
    if (initialized && swiper.params.cssMode) {
      setHistory(swiper.params.history!.key, swiper.activeIndex);
    }
  });
};

export default History;
