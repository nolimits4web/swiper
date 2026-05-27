import type { SwiperModuleFn } from '../../core/core';

export interface HistoryOptions {
  /**
   * Enables History Plugin.
   *
   * @default false
   */
  enabled?: boolean;

  /**
   * Swiper page root, useful to specify when you use Swiper history mode not on root website page.
   * For example can be `https://my-website.com/` or `https://my-website.com/subpage/` or `/subpage/`
   *
   *
   * @default ''
   */
  root?: string;

  /**
   * Works in addition to hashnav or history to replace current url state with the
   * new one instead of adding it to history
   *
   * @default false
   */
  replaceState?: boolean;

  /**
   * Url key for slides
   *
   * @default 'slides'
   */
  key?: string;

  /**
   * Keep query parameters when changing browser url.
   *
   * @default false
   */
  keepQuery?: boolean;
}

export interface HistoryMethods {}

export interface HistoryEvents {}

// All HistoryOptions fields are optional in the public type, but extendParams
// fills them in at module init time. Use this view internally to access defaults
// without proliferating `!` non-null assertions through the module.
type HistoryParamsRuntime = Required<HistoryOptions>;

declare module '../../core/core' {
  interface Swiper {
    history: HistoryMethods;
  }
  interface SwiperOptions {
    /**
     * Enables history push state where every slide will have its own url. In this parameter you have to specify main slides url like `"slides"` and specify every slide url using `data-history` attribute.
     *
     * Object with history navigation parameters or boolean `true` to enable with default settings
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   history: {
     *     replaceState: true,
     *   },
     * });
     * ```
     *
     * @example
     * ```html
     * <!-- will produce "slides/slide1" url in browser history -->
     * <div class="swiper-slide" data-history="slide1"></div>
     * ```
     */
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

  function getParams(): HistoryParamsRuntime {
    return swiper.params.history as HistoryParamsRuntime;
  }

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
    const params = getParams();
    if (!initialized || !params.enabled) return;
    let location: URL | Location;
    if (swiper.params.url) {
      location = new URL(swiper.params.url);
    } else {
      location = window.location;
    }
    const isVirtualEnabled = !!(swiper.params.virtual as { enabled?: boolean } | undefined)
      ?.enabled;
    const slide =
      swiper.virtual && isVirtualEnabled
        ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${index}"]`)
        : swiper.slides[index];
    if (!slide) return;
    let value = slugify(slide.getAttribute('data-history') || '');
    const root = params.root;
    if (root.length > 0) {
      const trimmedRoot = root[root.length - 1] === '/' ? root.slice(0, root.length - 1) : root;
      value = `${trimmedRoot}/${key ? `${key}/` : ''}${value}`;
    } else if (!location.pathname.includes(key || '')) {
      value = `${key ? `${key}/` : ''}${value}`;
    }
    if (params.keepQuery) {
      value += location.search;
    }
    const currentState = window.history.state as { value?: string } | null;
    if (currentState && currentState.value === value) {
      return;
    }
    if (params.replaceState) {
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
    const params = swiper.params.history;
    if (!params) return;
    if (!window.history || !window.history.pushState) {
      params.enabled = false;
      const hashParams = swiper.params.hashNavigation as { enabled?: boolean } | undefined;
      if (hashParams) hashParams.enabled = true;
      return;
    }
    initialized = true;
    paths = getPathValues(swiper.params.url);
    if (!paths.key && !paths.value) {
      if (!params.replaceState) {
        window.addEventListener('popstate', setHistoryPopState);
      }
      return;
    }
    scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
    if (!params.replaceState) {
      window.addEventListener('popstate', setHistoryPopState);
    }
  };
  const destroy = (): void => {
    if (!getParams().replaceState) {
      window.removeEventListener('popstate', setHistoryPopState);
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
      setHistory(getParams().key, swiper.activeIndex);
    }
  });
  on('slideChange', () => {
    if (initialized && swiper.params.cssMode) {
      setHistory(getParams().key, swiper.activeIndex);
    }
  });
};

export default History;
