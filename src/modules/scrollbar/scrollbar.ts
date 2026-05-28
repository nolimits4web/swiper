import type { Swiper, SwiperModuleFn } from '../../core/core';
import type { CSSSelector } from '../../swiper-shared.d.ts';
import { createElement, elementOffset, makeElementsArray, nextTick } from '../../shared/utils';
import createElementIfNotDefined from '../../shared/create-element-if-not-defined';
import classesToSelector from '../../shared/classes-to-selector';
import classesToTokens from '../../shared/classes-to-tokens';

/**
 * Object with scrollbar parameters.
 *
 * @example
 * ```js
 * const swiper = new Swiper('.swiper', {
 *   scrollbar: {
 *     el: '.swiper-scrollbar',
 *     draggable: true,
 *   },
 * });
 * ```
 */
export interface ScrollbarOptions {
  /**
   * Boolean property to use with breakpoints to enable/disable scrollbar on certain breakpoints
   */
  enabled?: boolean;
  /**
   * String with CSS selector or HTML element of the container with scrollbar.
   *
   * @default null
   */
  el?: CSSSelector | HTMLElement | null;

  /**
   * Hide scrollbar automatically after user interaction
   *
   * @default true
   */
  hide?: boolean;

  /**
   * Set to `true` to enable make scrollbar draggable that allows you to control slider position
   *
   * @default false
   */
  draggable?: boolean;

  /**
   * Set to `true` to snap slider position to slides when you release scrollbar
   *
   * @default false
   */
  snapOnRelease?: boolean;

  /**
   * Size of scrollbar draggable element in px
   *
   * @default 'auto'
   */
  dragSize?: 'auto' | number;

  /**
   * Scrollbar element additional CSS class when it is disabled
   *
   * @default 'swiper-scrollbar-lock'
   */
  lockClass?: string;

  /**
   * Scrollbar draggable element CSS class
   *
   * @default 'swiper-scrollbar-drag'
   */
  dragClass?: string;

  /**
   * CSS class name added on swiper container and scrollbar element when scrollbar is disabled by breakpoint
   *
   * @default 'swiper-scrollbar-disabled'
   */
  scrollbarDisabledClass?: string;

  /**
   * CSS class name set to scrollbar in horizontal Swiper
   *
   * @default 'swiper-scrollbar-horizontal'
   */
  horizontalClass?: string;

  /**
   * CSS class name set to scrollbar in vertical Swiper
   *
   * @default 'swiper-scrollbar-vertical'
   */
  verticalClass?: string;
}

export interface ScrollbarMethods {
  /**
   * HTMLElement of Scrollbar container element
   */
  el: HTMLElement;

  /**
   * HTMLElement of Scrollbar draggable handler element
   */
  dragEl: HTMLElement;

  /**
   * Updates scrollbar track and handler sizes
   */
  updateSize(): void;

  /**
   * Updates scrollbar translate
   */
  setTranslate(): void;

  /**
   * Initialize scrollbar
   */
  init(): void;

  /**
   * Destroy scrollbar
   */
  destroy(): void;
}

export interface ScrollbarEvents {
  /**
   * Event will be fired on draggable scrollbar drag start
   */
  scrollbarDragStart: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired on draggable scrollbar drag move
   */
  scrollbarDragMove: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired on draggable scrollbar drag end
   */
  scrollbarDragEnd: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;
}

// Runtime-only members attached to swiper.scrollbar beyond the published API.
interface ScrollbarInternals extends ScrollbarMethods {
  enable: () => void;
  disable: () => void;
}

// All ScrollbarOptions fields are optional in the public type, but extendParams
// fills them in at module init time. Use this view internally to access defaults
// without proliferating `!` non-null assertions through the module.
type ScrollbarParamsRuntime = Required<Omit<ScrollbarOptions, 'el'>> & Pick<ScrollbarOptions, 'el'>;

declare module '../../core/core' {
  interface Swiper {
    scrollbar: ScrollbarInternals;
  }
  interface SwiperOptions {
    /**
     * Object with scrollbar parameters or boolean `true` to enable with default settings.
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   scrollbar: {
     *     el: '.swiper-scrollbar',
     *     draggable: true,
     *   },
     * });
     * ```
     */
    scrollbar?: ScrollbarOptions | boolean;
  }
  interface SwiperParams {
    scrollbar?: ScrollbarOptions;
  }
  interface SwiperEvents extends ScrollbarEvents {}
}

type PointerLike = MouseEvent | PointerEvent | TouchEvent;

const Scrollbar: SwiperModuleFn = ({ swiper, extendParams, on, emit }) => {
  let isTouched = false;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let dragTimeout: ReturnType<typeof setTimeout> | null = null;
  let dragStartPos: number | null = 0;
  let dragSize = 0;
  let trackSize = 0;
  let divider = 0;

  extendParams({
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag',
      scrollbarDisabledClass: 'swiper-scrollbar-disabled',
      horizontalClass: `swiper-scrollbar-horizontal`,
      verticalClass: `swiper-scrollbar-vertical`,
    },
  });

  // Initialized as a partial; remaining methods (updateSize, setTranslate,
  // init, destroy, enable, disable) attach after their definitions below.
  swiper.scrollbar = {
    el: null as unknown as HTMLElement,
    dragEl: null as unknown as HTMLElement,
  } as ScrollbarInternals;

  function getParams(): ScrollbarParamsRuntime {
    return swiper.params.scrollbar as ScrollbarParamsRuntime;
  }

  function setTranslate(): void {
    const params = getParams();
    if (!params.el || !swiper.scrollbar.el) return;
    const { scrollbar, rtlTranslate: rtl } = swiper;
    const { dragEl, el } = scrollbar;
    const progress = swiper.params.loop ? swiper.progressLoop ?? 0 : swiper.progress;

    let newSize = dragSize;
    let newPos = (trackSize - dragSize) * progress;
    if (rtl) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      dragEl.style.transform = `translate3d(${newPos}px, 0, 0)`;
      dragEl.style.width = `${newSize}px`;
    } else {
      dragEl.style.transform = `translate3d(0px, ${newPos}px, 0)`;
      dragEl.style.height = `${newSize}px`;
    }
    if (params.hide) {
      if (timeout) clearTimeout(timeout);
      el.style.opacity = '1';
      timeout = setTimeout(() => {
        el.style.opacity = '0';
        el.style.transitionDuration = '400ms';
      }, 1000);
    }
  }
  function setTransition(duration: number): void {
    if (!getParams().el || !swiper.scrollbar.el) return;
    swiper.scrollbar.dragEl.style.transitionDuration = `${duration}ms`;
  }
  function updateSize(): void {
    const params = getParams();
    if (!params.el || !swiper.scrollbar.el) return;

    const { scrollbar } = swiper;
    const { dragEl, el } = scrollbar;

    dragEl.style.width = '';
    dragEl.style.height = '';
    trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;

    divider =
      swiper.size /
      (swiper.virtualSize +
        (swiper.params.slidesOffsetBefore ?? 0) -
        (swiper.params.centeredSlides ? swiper.snapGrid[0]! : 0));
    if (params.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(String(params.dragSize), 10);
    }

    if (swiper.isHorizontal()) {
      dragEl.style.width = `${dragSize}px`;
    } else {
      dragEl.style.height = `${dragSize}px`;
    }

    if (divider >= 1) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
    if (params.hide) {
      el.style.opacity = '0';
    }

    if (swiper.params.watchOverflow && swiper.enabled) {
      scrollbar.el.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
    }
  }
  function getPointerPosition(e: PointerLike): number {
    if (swiper.isHorizontal()) {
      return (e as PointerEvent).clientX ?? (e as TouchEvent).touches?.[0]?.clientX ?? 0;
    }
    return (e as PointerEvent).clientY ?? (e as TouchEvent).touches?.[0]?.clientY ?? 0;
  }
  function setDragPosition(e: PointerLike): void {
    const { scrollbar, rtlTranslate: rtl } = swiper;
    const { el } = scrollbar;

    let positionRatio: number;
    positionRatio =
      (getPointerPosition(e) -
        elementOffset(el)[swiper.isHorizontal() ? 'left' : 'top'] -
        (dragStartPos !== null ? dragStartPos : dragSize / 2)) /
      (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (rtl) {
      positionRatio = 1 - positionRatio;
    }

    const position =
      swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;

    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  function onDragStart(e: PointerEvent): void {
    const params = getParams();
    const { scrollbar, wrapperEl } = swiper;
    const { el, dragEl } = scrollbar;
    isTouched = true;
    dragStartPos =
      e.target === dragEl
        ? getPointerPosition(e) -
          (e.target as HTMLElement).getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top']
        : null;
    e.preventDefault();
    e.stopPropagation();

    wrapperEl.style.transitionDuration = '100ms';
    dragEl.style.transitionDuration = '100ms';
    setDragPosition(e);

    if (dragTimeout) clearTimeout(dragTimeout);

    el.style.transitionDuration = '0ms';
    if (params.hide) {
      el.style.opacity = '1';
    }
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.scrollSnapType = 'none';
    }
    emit('scrollbarDragStart', e);
  }
  function onDragMove(e: PointerEvent): void {
    const { scrollbar, wrapperEl } = swiper;
    const { el, dragEl } = scrollbar;

    if (!isTouched) return;
    if (e.cancelable) e.preventDefault();
    setDragPosition(e);
    wrapperEl.style.transitionDuration = '0ms';
    el.style.transitionDuration = '0ms';
    dragEl.style.transitionDuration = '0ms';
    emit('scrollbarDragMove', e);
  }
  function onDragEnd(e: PointerEvent): void {
    const params = getParams();
    const { scrollbar, wrapperEl } = swiper;
    const { el } = scrollbar;

    if (!isTouched) return;
    isTouched = false;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.scrollSnapType = '';
      wrapperEl.style.transitionDuration = '';
    }
    if (params.hide) {
      if (dragTimeout) clearTimeout(dragTimeout);
      dragTimeout = nextTick(() => {
        el.style.opacity = '0';
        el.style.transitionDuration = '400ms';
      }, 1000);
    }
    emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideToClosest();
    }
  }

  function events(method: 'on' | 'off'): void {
    const { scrollbar, params } = swiper;
    const el = scrollbar.el;
    if (!el) return;
    const activeListener = params.passiveListeners ? { passive: false, capture: false } : false;
    const passiveListener = params.passiveListeners ? { passive: true, capture: false } : false;
    const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
    el[eventMethod]('pointerdown', onDragStart as EventListener, activeListener);
    document[eventMethod]('pointermove', onDragMove as EventListener, activeListener);
    document[eventMethod]('pointerup', onDragEnd as EventListener, passiveListener);
  }

  function enableDraggable(): void {
    if (!getParams().el || !swiper.scrollbar.el) return;
    events('on');
  }
  function disableDraggable(): void {
    if (!getParams().el || !swiper.scrollbar.el) return;
    events('off');
  }
  function init(): void {
    const { scrollbar, el: swiperEl } = swiper;
    swiper.params.scrollbar = createElementIfNotDefined<ScrollbarOptions>(
      swiper,
      swiper.originalParams.scrollbar as ScrollbarOptions | undefined,
      swiper.params.scrollbar as ScrollbarOptions | undefined,
      { el: 'swiper-scrollbar' },
    );
    const params = getParams();
    if (!params.el) return;

    let el: HTMLElement | NodeListOf<HTMLElement> | HTMLElement[];
    if (typeof params.el === 'string' && swiper.isElement) {
      el = swiper.el.querySelector(params.el) as HTMLElement;
    } else {
      el = params.el as HTMLElement;
    }
    if (!el && typeof params.el === 'string') {
      el = document.querySelectorAll<HTMLElement>(params.el);
      if (!el.length) return;
    } else if (!el) {
      el = params.el as HTMLElement;
    }

    if (
      swiper.params.uniqueNavElements &&
      typeof params.el === 'string' &&
      (el as ArrayLike<HTMLElement>).length > 1 &&
      swiperEl.querySelectorAll(params.el).length === 1
    ) {
      el = swiperEl.querySelector(params.el) as HTMLElement;
    }
    if ((el as ArrayLike<HTMLElement>).length > 0) {
      el = (el as ArrayLike<HTMLElement>)[0]!;
    }
    const elTyped = el as HTMLElement;

    elTyped.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);

    let dragEl: HTMLElement | null = null;
    if (elTyped) {
      dragEl = elTyped.querySelector(classesToSelector(params.dragClass)) as HTMLElement | null;
      if (!dragEl) {
        dragEl = createElement('div', params.dragClass);
        elTyped.append(dragEl);
      }
    }

    Object.assign(scrollbar, {
      el: elTyped,
      dragEl,
    });

    if (params.draggable) {
      enableDraggable();
    }

    if (elTyped) {
      elTyped.classList[swiper.enabled ? 'remove' : 'add'](...classesToTokens(params.lockClass));
    }
  }
  function destroy(): void {
    const params = getParams();
    const el = swiper.scrollbar.el;
    if (el) {
      el.classList.remove(
        ...classesToTokens(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass),
      );
    }

    disableDraggable();
  }

  on('changeDirection', () => {
    if (!swiper.scrollbar || !swiper.scrollbar.el) return;
    const params = getParams();
    const els = makeElementsArray(swiper.scrollbar.el as HTMLElement | HTMLElement[]);
    els.forEach((subEl) => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });

  on('init', () => {
    if (getParams().enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      updateSize();
      setTranslate();
    }
  });
  on('update resize observerUpdate lock unlock changeDirection', () => {
    updateSize();
  });
  on('setTranslate', () => {
    setTranslate();
  });
  on('setTransition', (_s, duration: number) => {
    setTransition(duration);
  });
  on('enable disable', () => {
    const { el } = swiper.scrollbar;
    if (el) {
      el.classList[swiper.enabled ? 'remove' : 'add'](...classesToTokens(getParams().lockClass));
    }
  });
  on('destroy', () => {
    destroy();
  });

  const enable = (): void => {
    const params = getParams();
    swiper.el.classList.remove(...classesToTokens(params.scrollbarDisabledClass));
    if (swiper.scrollbar.el) {
      swiper.scrollbar.el.classList.remove(...classesToTokens(params.scrollbarDisabledClass));
    }
    init();
    updateSize();
    setTranslate();
  };

  const disable = (): void => {
    const params = getParams();
    swiper.el.classList.add(...classesToTokens(params.scrollbarDisabledClass));
    if (swiper.scrollbar.el) {
      swiper.scrollbar.el.classList.add(...classesToTokens(params.scrollbarDisabledClass));
    }
    destroy();
  };

  Object.assign(swiper.scrollbar, {
    enable,
    disable,
    updateSize,
    setTranslate,
    init,
    destroy,
  });
};

export default Scrollbar;
