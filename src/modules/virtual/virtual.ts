import type { Swiper, SwiperModule } from '../../core/core';
import { createElement, elementChildren, setCSSProperty, setInnerHTML } from '../../shared/utils';

export interface VirtualData<T = unknown> {
  /**
   * slides left/top offset in px
   */
  offset: number;
  /**
   * index of first slide required to be rendered
   */
  from: number;
  /**
   * index of last slide required to be rendered
   */
  to: number;
  /**
   * array with slide items to be rendered
   */
  slides: T[];
}

export interface VirtualOptions<T = unknown> {
  /**
   * Whether the virtual slides are enabled
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * Array with slides
   *
   * @default []
   */
  slides?: T[];

  /**
   * Slide size for slidesPerView: `auto` (in px)
   *
   * @default 320
   */
  slidesPerViewAutoSlideSize?: number;

  /**
   * Enables DOM cache of rendering slides html elements. Once they are rendered they will be saved to cache and reused from it.
   *
   * @default true
   */
  cache?: boolean;
  /**
   * Increases amount of pre-rendered slides before active slide
   *
   * @default 0
   */
  addSlidesBefore?: number;
  /**
   * Increases amount of pre-rendered slides after active slide
   *
   * @default 0
   */
  addSlidesAfter?: number;
  /**
   * Function to render slide. As an argument it accepts current slide item for `slides` array and index number of the current slide. Function must return an outer HTML of the swiper slide or slide HTML element.
   *
   * @default null
   */
  renderSlide?: ((slide: T, index: number) => HTMLElement | string) | null;
  /**
   * Function for external rendering (e.g. using some other library to handle DOM manipulations and state like React.js or Vue.js).
   *
   * @default null
   */
  renderExternal?: ((data: VirtualData<T>) => void) | null;
  /**
   * When enabled (by default) it will update Swiper layout right after renderExternal called. Useful to disable and update swiper manually when used with render libraries that renders asynchronously
   *
   * @default true
   */
  renderExternalUpdate?: boolean;
}

export interface VirtualMethods<T = unknown> {
  /**
   * Object with cached slides HTML elements, keyed by slide index.
   */
  cache: Record<number, HTMLElement>;

  /**
   * Index of first rendered slide
   */
  from: number;

  /**
   * Index of last rendered slide
   */
  to: number;

  /**
   * Array with slide items passed by `virtual.slides` parameter
   */
  slides: T[];

  /**
   * Append slide. `slides` can be a single slide item or array with such slides.
   *
   * @note Only for Core version (in React & Vue it should be done by modifying slides array/data/source)
   */
  appendSlide(slide: T | T[]): void;

  /**
   * Prepend slide. `slides` can be a single slide item or array with such slides.
   *
   * @note Only for Core version (in React & Vue it should be done by modifying slides array/data/source)
   */
  prependSlide(slide: T | T[]): void;

  /**
   * Remove specific slide or slides. `slideIndexes` can be a number with slide index to remove or array with indexes.
   *
   * @note Only for Core version (in React & Vue it should be done by modifying slides array/data/source)
   */
  removeSlide(slideIndexes: number | number[]): void;

  /**
   * Remove all slides
   *
   * @note Only for Core version (in React & Vue it should be done by modifying slides array/data/source)
   */
  removeAllSlides(): void;

  /**
   * Update virtual slides state.
   *
   * @param force - re-render even if the slice didn't move
   * @param beforeInit - internal flag set by the module during `beforeInit`
   * @param forceActiveIndex - override `swiper.activeIndex` when computing the slice
   */
  update(force?: boolean, beforeInit?: boolean, forceActiveIndex?: number): void;
}

// Internal-only state attached to `swiper.virtual` at runtime: the slides
// offset and the slidesBefore/slidesAfter counts other modules read off
// of `swiper.virtual.*`. Kept separate from `VirtualMethods` so the
// public published shape stays minimal.
export interface VirtualInternals<T = unknown> extends VirtualMethods<T> {
  /**
   * Pixel offset applied to virtual slides — left/top depending on direction.
   */
  offset: number;
  /**
   * Snapshot of `swiper.slidesGrid` taken when the last `update` ran. Used
   * to detect that the grid changed without a from/to change.
   */
  slidesGrid: number[];
  /**
   * Number of virtual slides reserved before the active slice. Set on
   * each `update` and read by core code that translates between virtual
   * indices and DOM positions.
   */
  slidesBefore?: number;
  /**
   * Number of virtual slides reserved after the active slice.
   */
  slidesAfter?: number;
}

export interface VirtualEvents {
  /**
   * Event will be fired after the virtual slides DOM has been re-rendered
   * (either internally by the module or after a `renderExternal` round-trip).
   */
  virtualUpdate: (swiper: Swiper) => void;
}

declare module '../../core/core' {
  interface Swiper {
    virtual: VirtualInternals;
  }
  interface SwiperOptions {
    /**
     * Enables virtual slides functionality. Object with virtual slides parameters or boolean `true` to enable with default settings.
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   virtual: {
     *     slides: ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'],
     *   },
     * });
     * ```
     */
    virtual?: VirtualOptions | boolean;
  }
  interface SwiperParams {
    virtual?: VirtualOptions;
  }
  interface SwiperEvents extends VirtualEvents {}
}

// All VirtualOptions fields are optional in the public type, but extendParams
// fills them in at module init time. Use this view internally to access defaults
// without proliferating `!` non-null assertions through the module.
type VirtualParamsRuntime = Required<VirtualOptions>;

const Virtual: SwiperModule = ({ swiper, extendParams, on, emit }) => {
  extendParams({
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      slidesPerViewAutoSlideSize: 320,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: true,
      addSlidesBefore: 0,
      addSlidesAfter: 0,
    },
  });

  let cssModeTimeout: ReturnType<typeof setTimeout> | undefined;

  // Methods (appendSlide/prependSlide/removeSlide/removeAllSlides/update) are
  // attached via Object.assign below once they're defined. Cast through
  // Partial<> so the initial state-only literal can be assigned without
  // pretending the methods exist yet.
  swiper.virtual = {
    cache: {},
    from: 0,
    to: 0,
    slides: [] as unknown[],
    offset: 0,
    slidesGrid: [],
  } as Partial<VirtualInternals> as VirtualInternals;

  function getParams(): VirtualParamsRuntime {
    return swiper.params.virtual as VirtualParamsRuntime;
  }

  // Created lazily so module init does not touch the DOM (SSR / Node safe).
  let tempDOM: HTMLElement | undefined;
  const getTempDOM = (): HTMLElement => (tempDOM ??= document.createElement('div'));

  function renderSlide(slide: unknown, index: number): HTMLElement {
    const params = getParams();
    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index]!;
    }
    let slideEl: HTMLElement;
    if (params.renderSlide) {
      const rendered = params.renderSlide.call(swiper, slide, index);
      if (typeof rendered === 'string') {
        const el = getTempDOM();
        setInnerHTML(el, rendered);
        slideEl = el.children[0] as HTMLElement;
      } else {
        slideEl = rendered as HTMLElement;
      }
    } else if (swiper.isElement) {
      slideEl = createElement('swiper-slide');
    } else {
      slideEl = createElement('div', swiper.params.slideClass);
    }
    slideEl.setAttribute('data-swiper-slide-index', String(index));
    if (!params.renderSlide) {
      setInnerHTML(slideEl, slide as string);
    }

    if (params.cache) {
      swiper.virtual.cache[index] = slideEl;
    }
    return slideEl;
  }

  function update(force?: boolean, beforeInit?: boolean, forceActiveIndex?: number): void {
    const {
      slidesPerGroup,
      centeredSlides,
      slidesPerView,
      loop: isLoop,
      initialSlide,
    } = swiper.params;
    if (beforeInit && !isLoop && (initialSlide ?? 0) > 0) {
      return;
    }
    const { addSlidesBefore, addSlidesAfter, slidesPerViewAutoSlideSize } = getParams();
    const {
      from: previousFrom,
      to: previousTo,
      slides,
      slidesGrid: previousSlidesGrid,
      offset: previousOffset,
    } = swiper.virtual;
    if (!swiper.params.cssMode) {
      swiper.updateActiveIndex();
    }

    const activeIndex =
      typeof forceActiveIndex === 'undefined' ? swiper.activeIndex || 0 : forceActiveIndex;

    let offsetProp: 'left' | 'right' | 'top';
    if (swiper.rtlTranslate) offsetProp = 'right';
    else offsetProp = swiper.isHorizontal() ? 'left' : 'top';

    let slidesPerViewNumeric: number;
    if (slidesPerView === 'auto') {
      if (slidesPerViewAutoSlideSize) {
        let swiperSize = swiper.size;
        if (!swiperSize) {
          swiperSize = swiper.isHorizontal()
            ? swiper.el.getBoundingClientRect().width
            : swiper.el.getBoundingClientRect().height;
        }
        slidesPerViewNumeric = Math.max(1, Math.ceil(swiperSize / slidesPerViewAutoSlideSize));
      } else {
        slidesPerViewNumeric = 1;
      }
    } else {
      slidesPerViewNumeric = slidesPerView ?? 1;
    }

    const groupSize = slidesPerGroup ?? 1;
    let slidesAfter: number;
    let slidesBefore: number;
    if (centeredSlides) {
      slidesAfter = Math.floor(slidesPerViewNumeric / 2) + groupSize + addSlidesAfter;
      slidesBefore = Math.floor(slidesPerViewNumeric / 2) + groupSize + addSlidesBefore;
    } else {
      slidesAfter = slidesPerViewNumeric + (groupSize - 1) + addSlidesAfter;
      slidesBefore = (isLoop ? slidesPerViewNumeric : groupSize) + addSlidesBefore;
    }
    let from = activeIndex - slidesBefore;
    let to = activeIndex + slidesAfter;
    if (!isLoop) {
      from = Math.max(from, 0);
      to = Math.min(to, slides.length - 1);
    }
    let offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
    if (isLoop && activeIndex >= slidesBefore) {
      from -= slidesBefore;
      if (!centeredSlides) offset += swiper.slidesGrid[0]!;
    } else if (isLoop && activeIndex < slidesBefore) {
      from = -slidesBefore;
      if (centeredSlides) offset += swiper.slidesGrid[0]!;
    }

    Object.assign(swiper.virtual, {
      from,
      to,
      offset,
      slidesGrid: swiper.slidesGrid,
      slidesBefore,
      slidesAfter,
    });

    function onRendered(): void {
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      emit('virtualUpdate');
    }

    if (previousFrom === from && previousTo === to && !force) {
      if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        swiper.slides.forEach((slideEl) => {
          slideEl.style.setProperty(
            offsetProp,
            `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`,
          );
        });
      }
      swiper.updateProgress();
      emit('virtualUpdate');
      return;
    }
    const virtualParams = getParams();
    if (virtualParams.renderExternal) {
      const slidesToRender: unknown[] = [];
      for (let i = from; i <= to; i += 1) {
        slidesToRender.push(slides[i]);
      }
      virtualParams.renderExternal.call(swiper, {
        offset,
        from,
        to,
        slides: slidesToRender,
      });
      if (virtualParams.renderExternalUpdate) {
        onRendered();
      } else {
        emit('virtualUpdate');
      }
      return;
    }
    const prependIndexes: number[] = [];
    const appendIndexes: number[] = [];

    const getSlideIndex = (index: number): number => {
      let slideIndex = index;
      if (index < 0) {
        slideIndex = slides.length + index;
      } else if (slideIndex >= slides.length) {
        slideIndex = slideIndex - slides.length;
      }
      return slideIndex;
    };

    if (force) {
      swiper.slides
        .filter((el) => el.matches(`.${swiper.params.slideClass}, swiper-slide`))
        .forEach((slideEl) => {
          slideEl.remove();
        });
    } else {
      for (let i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          const slideIndex = getSlideIndex(i);
          swiper.slides
            .filter((el) =>
              el.matches(
                `.${swiper.params.slideClass}[data-swiper-slide-index="${slideIndex}"], swiper-slide[data-swiper-slide-index="${slideIndex}"]`,
              ),
            )
            .forEach((slideEl) => {
              slideEl.remove();
            });
        }
      }
    }

    const loopFrom = isLoop ? -slides.length : 0;
    const loopTo = isLoop ? slides.length * 2 : slides.length;
    for (let i = loopFrom; i < loopTo; i += 1) {
      if (i >= from && i <= to) {
        const slideIndex = getSlideIndex(i);
        if (typeof previousTo === 'undefined' || force) {
          appendIndexes.push(slideIndex);
        } else {
          if (i > previousTo) appendIndexes.push(slideIndex);
          if (i < previousFrom) prependIndexes.push(slideIndex);
        }
      }
    }
    appendIndexes.forEach((index) => {
      swiper.slidesEl.append(renderSlide(slides[index], index));
    });
    if (isLoop) {
      for (let i = prependIndexes.length - 1; i >= 0; i -= 1) {
        const index = prependIndexes[i]!;
        swiper.slidesEl.prepend(renderSlide(slides[index], index));
      }
    } else {
      prependIndexes.sort((a, b) => b - a);
      prependIndexes.forEach((index) => {
        swiper.slidesEl.prepend(renderSlide(slides[index], index));
      });
    }
    elementChildren(swiper.slidesEl, '.swiper-slide, swiper-slide').forEach((slideEl) => {
      (slideEl as HTMLElement).style.setProperty(
        offsetProp,
        `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`,
      );
    });
    onRendered();
  }

  function appendSlide(slides: unknown | unknown[]): void {
    if (
      slides !== null &&
      typeof slides === 'object' &&
      'length' in (slides as { length?: unknown })
    ) {
      const arr = slides as unknown[];
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i]) swiper.virtual.slides.push(arr[i]);
      }
    } else {
      swiper.virtual.slides.push(slides);
    }
    update(true);
  }
  function prependSlide(slides: unknown | unknown[]): void {
    const activeIndex = swiper.activeIndex;
    let newActiveIndex = activeIndex + 1;
    let numberOfNewSlides = 1;

    if (Array.isArray(slides)) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
      numberOfNewSlides = slides.length;
    } else {
      swiper.virtual.slides.unshift(slides);
    }
    if (getParams().cache) {
      const cache = swiper.virtual.cache;
      const newCache: Record<number, HTMLElement> = {};
      Object.keys(cache).forEach((cachedIndex) => {
        const cachedEl = cache[Number(cachedIndex)]!;
        const cachedElIndex = cachedEl.getAttribute('data-swiper-slide-index');
        if (cachedElIndex) {
          cachedEl.setAttribute(
            'data-swiper-slide-index',
            String(parseInt(cachedElIndex, 10) + numberOfNewSlides),
          );
        }
        newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cachedEl;
      });
      swiper.virtual.cache = newCache;
    }
    update(true);
    swiper.slideTo(newActiveIndex, 0);
  }
  function removeSlide(slidesIndexes: number | number[]): void {
    if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
    let activeIndex = swiper.activeIndex;
    const shiftCacheDownFrom = (removedIndex: number): void => {
      Object.keys(swiper.virtual.cache).forEach((key) => {
        const numericKey = Number(key);
        if (numericKey > removedIndex) {
          const shifted = swiper.virtual.cache[numericKey]!;
          swiper.virtual.cache[numericKey - 1] = shifted;
          shifted.setAttribute('data-swiper-slide-index', String(numericKey - 1));
          delete swiper.virtual.cache[numericKey];
        }
      });
    };
    if (Array.isArray(slidesIndexes)) {
      for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
        if (getParams().cache) {
          delete swiper.virtual.cache[slidesIndexes[i]!];
          shiftCacheDownFrom(slidesIndexes[i]!);
        }
        swiper.virtual.slides.splice(slidesIndexes[i]!, 1);

        if (slidesIndexes[i]! < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
    } else {
      if (getParams().cache) {
        delete swiper.virtual.cache[slidesIndexes];
        shiftCacheDownFrom(slidesIndexes);
      }
      swiper.virtual.slides.splice(slidesIndexes, 1);

      if (slidesIndexes < activeIndex) activeIndex -= 1;
      activeIndex = Math.max(activeIndex, 0);
    }
    update(true);
    swiper.slideTo(activeIndex, 0);
  }
  function removeAllSlides(): void {
    swiper.virtual.slides = [];
    if (getParams().cache) {
      swiper.virtual.cache = {};
    }
    update(true);
    swiper.slideTo(0, 0);
  }

  on('beforeInit', () => {
    if (!getParams().enabled) return;
    let domSlidesAssigned = false;
    const passedVirtual = swiper.passedParams.virtual;
    const passedSlidesUndefined =
      !passedVirtual || typeof passedVirtual !== 'object' || passedVirtual.slides === undefined;
    if (passedSlidesUndefined) {
      const slides = [...swiper.slidesEl.children].filter((el) =>
        (el as Element).matches(`.${swiper.params.slideClass}, swiper-slide`),
      ) as HTMLElement[];
      if (slides && slides.length) {
        swiper.virtual.slides = [...slides];
        domSlidesAssigned = true;
        slides.forEach((slideEl, slideIndex) => {
          slideEl.setAttribute('data-swiper-slide-index', String(slideIndex));
          swiper.virtual.cache[slideIndex] = slideEl;
          slideEl.remove();
        });
      }
    }
    if (!domSlidesAssigned) {
      swiper.virtual.slides = getParams().slides;
    }

    swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);

    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;

    update(false, true);
  });
  on('setTranslate', () => {
    if (!getParams().enabled) return;
    if (swiper.params.cssMode && !swiper._immediateVirtual) {
      clearTimeout(cssModeTimeout);
      cssModeTimeout = setTimeout(() => {
        update();
      }, 100);
    } else {
      update();
    }
  });
  on('init update resize', () => {
    if (!getParams().enabled) return;
    if (swiper.params.cssMode) {
      setCSSProperty(swiper.wrapperEl, '--swiper-virtual-size', `${swiper.virtualSize}px`);
    }
  });

  Object.assign(swiper.virtual, {
    appendSlide,
    prependSlide,
    removeSlide,
    removeAllSlides,
    update,
  });
};

export default Virtual;
