import type { Swiper, SwiperModule } from '../../core/core';
import createElementIfNotDefined from '../../shared/create-element-if-not-defined';
import { makeElementsArray, setInnerHTML } from '../../shared/utils';
import type { CSSSelector } from '../../types/shared';

export interface NavigationOptions {
  /**
   * Boolean property to use with breakpoints to enable/disable navigation on certain breakpoints
   */
  enabled?: boolean;
  /**
   * String with CSS selector or HTML element of the element that will work
   * like "next" button after click on it
   *
   * @default null
   */
  nextEl?: CSSSelector | HTMLElement | null;

  /**
   * String with CSS selector or HTML element of the element that will work
   * like "prev" button after click on it
   *
   * @default null
   */
  prevEl?: CSSSelector | HTMLElement | null;

  /**
   * Boolean property to add SVG icons to navigation buttons
   *
   * @default true
   */
  addIcons?: boolean;

  /**
   * Toggle navigation buttons visibility after click on Slider's container
   *
   * @default false
   */
  hideOnClick?: boolean;

  /**
   * CSS class name added to navigation button when it becomes disabled
   *
   * @default 'swiper-button-disabled'
   */
  disabledClass?: string;

  /**
   * CSS class name added to navigation button when it becomes hidden
   *
   * @default 'swiper-button-hidden'
   */
  hiddenClass?: string;

  /**
   * CSS class name added to navigation button when it is disabled
   *
   * @default 'swiper-button-lock'
   */
  lockClass?: string;

  /**
   * CSS class name added on swiper container when navigation is disabled by breakpoint
   *
   * @default 'swiper-navigation-disabled'
   */
  navigationDisabledClass?: string;
}

export interface NavigationMethods {
  /**
   * HTMLElement of "next" navigation button
   */
  nextEl: HTMLElement;

  /**
   * HTMLElement of "previous" navigation button
   */
  prevEl: HTMLElement;

  /**
   * Update navigation buttons state (enabled/disabled)
   */
  update(): void;

  /**
   * Initialize navigation
   */
  init(): void;

  /**
   * Destroy navigation
   */
  destroy(): void;
}

export interface NavigationEvents {
  /**
   * Event will be fired on navigation hide
   */
  navigationHide: (swiper: Swiper) => void;
  /**
   * Event will be fired on navigation show
   */
  navigationShow: (swiper: Swiper) => void;
  /**
   * Event will be fired on navigation prev button click
   */
  navigationPrev: (swiper: Swiper) => void;
  /**
   * Event will be fired on navigation next button click
   */
  navigationNext: (swiper: Swiper) => void;
}

// Runtime-only members attached to swiper.navigation beyond the published API.
interface NavigationInternals extends NavigationMethods {
  enable: () => void;
  disable: () => void;
  arrowSvg: string;
}

// All NavigationOptions fields are optional in the public type, but extendParams
// fills them in at module init time. Use this view internally to access defaults
// without proliferating `!` non-null assertions through the module.
type NavigationParamsRuntime = Required<Omit<NavigationOptions, 'nextEl' | 'prevEl'>> &
  Pick<NavigationOptions, 'nextEl' | 'prevEl'>;

declare module '../../core/core' {
  interface Swiper {
    navigation: NavigationInternals;
  }
  interface SwiperOptions {
    /**
     * Object with navigation parameters or boolean `true` to enable with default settings.
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   navigation: {
     *     nextEl: '.swiper-button-next',
     *     prevEl: '.swiper-button-prev',
     *   },
     * });
     * ```
     */
    navigation?: NavigationOptions | boolean;
  }
  interface SwiperParams {
    navigation?: NavigationOptions;
  }
  interface SwiperEvents extends NavigationEvents {}
}

const arrowSvg = `<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>`;

type NavEl = HTMLElement | HTMLElement[] | CSSSelector | null | undefined;

const Navigation: SwiperModule = ({ swiper, extendParams, on, emit }) => {
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      addIcons: true,
      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled',
    },
  });

  // Initialized as a partial; remaining methods (update, init, destroy,
  // enable, disable) attach after their definitions below.
  swiper.navigation = {
    nextEl: null as unknown as HTMLElement,
    prevEl: null as unknown as HTMLElement,
    arrowSvg,
  } as NavigationInternals;

  function getParams(): NavigationParamsRuntime {
    return swiper.params.navigation as NavigationParamsRuntime;
  }

  function getEl(el: NavEl): HTMLElement | HTMLElement[] | NavEl {
    let res: HTMLElement | HTMLElement[] | null | undefined;
    if (el && typeof el === 'string' && swiper.isElement) {
      res = (swiper.el.querySelector(el) || swiper.hostEl.querySelector(el)) as HTMLElement | null;
      if (res) return res;
    }
    if (el) {
      if (typeof el === 'string') res = [...document.querySelectorAll<HTMLElement>(el)];
      if (
        swiper.params.uniqueNavElements &&
        typeof el === 'string' &&
        res &&
        (res as HTMLElement[]).length > 1 &&
        swiper.el.querySelectorAll(el).length === 1
      ) {
        res = swiper.el.querySelector(el) as HTMLElement | null;
      } else if (res && (res as HTMLElement[]).length === 1) {
        res = (res as HTMLElement[])[0];
      }
    }
    if (el && !res) return el;
    return res;
  }

  function toggleEl(el: NavEl, disabled: boolean): void {
    const params = getParams();
    const els = makeElementsArray(el as HTMLElement | HTMLElement[]);
    els.forEach((subEl) => {
      if (subEl) {
        subEl.classList[disabled ? 'add' : 'remove'](...params.disabledClass.split(' '));
        if (subEl.tagName === 'BUTTON') (subEl as HTMLButtonElement).disabled = disabled;
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
        }
      }
    });
  }
  function update(): void {
    // Update Navigation Buttons
    const { nextEl, prevEl } = swiper.navigation;
    if (swiper.params.loop) {
      toggleEl(prevEl, false);
      toggleEl(nextEl, false);
      return;
    }

    toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e: Event): void {
    e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
    emit('navigationPrev');
  }
  function onNextClick(e: Event): void {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
    emit('navigationNext');
  }
  function init(): void {
    swiper.params.navigation = createElementIfNotDefined<NavigationOptions>(
      swiper,
      swiper.originalParams.navigation as NavigationOptions | undefined,
      swiper.params.navigation as NavigationOptions | undefined,
      {
        nextEl: 'swiper-button-next',
        prevEl: 'swiper-button-prev',
      },
    );
    const params = getParams();
    if (!(params.nextEl || params.prevEl)) return;

    const nextEl = getEl(params.nextEl);
    const prevEl = getEl(params.prevEl);
    Object.assign(swiper.navigation, {
      nextEl,
      prevEl,
    });
    const nextEls = makeElementsArray(nextEl as HTMLElement | HTMLElement[]);
    const prevEls = makeElementsArray(prevEl as HTMLElement | HTMLElement[]);

    const initButton = (el: HTMLElement, dir: 'next' | 'prev'): void => {
      if (el) {
        if (
          params.addIcons &&
          el.matches('.swiper-button-next,.swiper-button-prev') &&
          !el.querySelector('svg')
        ) {
          const tempEl = document.createElement('div');
          setInnerHTML(tempEl, arrowSvg);
          const svgEl = tempEl.querySelector('svg');
          if (svgEl) el.appendChild(svgEl);
          tempEl.remove();
        }
        el.addEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el) {
        el.classList.add(...params.lockClass.split(' '));
      }
    };

    nextEls.forEach((el) => initButton(el, 'next'));
    prevEls.forEach((el) => initButton(el, 'prev'));
  }
  function destroy(): void {
    const params = getParams();
    const { nextEl, prevEl } = swiper.navigation;
    const nextEls = makeElementsArray(nextEl as HTMLElement | HTMLElement[]);
    const prevEls = makeElementsArray(prevEl as HTMLElement | HTMLElement[]);
    const destroyButton = (el: HTMLElement, dir: 'next' | 'prev'): void => {
      el.removeEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      el.classList.remove(...params.disabledClass.split(' '));
    };
    nextEls.forEach((el) => destroyButton(el, 'next'));
    prevEls.forEach((el) => destroyButton(el, 'prev'));
  }

  on('init', () => {
    if (getParams().enabled === false) {
      disable();
    } else {
      init();
      update();
    }
  });
  on('toEdge fromEdge lock unlock', () => {
    update();
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    const params = getParams();
    const { nextEl, prevEl } = swiper.navigation;
    const nextEls = makeElementsArray(nextEl as HTMLElement | HTMLElement[]);
    const prevEls = makeElementsArray(prevEl as HTMLElement | HTMLElement[]);
    if (swiper.enabled) {
      update();
      return;
    }
    [...nextEls, ...prevEls]
      .filter((el) => !!el)
      .forEach((el) => el.classList.add(params.lockClass));
  });
  on('click', (_s, e: Event) => {
    const params = getParams();
    const { nextEl, prevEl } = swiper.navigation;
    const nextEls = makeElementsArray(nextEl as HTMLElement | HTMLElement[]);
    const prevEls = makeElementsArray(prevEl as HTMLElement | HTMLElement[]);
    const targetEl = e.target as HTMLElement;
    let targetIsButton: boolean | EventTarget | undefined =
      prevEls.includes(targetEl) || nextEls.includes(targetEl);

    if (swiper.isElement && !targetIsButton) {
      const path = e.composedPath ? e.composedPath() : [];
      if (path.length) {
        targetIsButton = path.find(
          (pathEl) =>
            nextEls.includes(pathEl as HTMLElement) || prevEls.includes(pathEl as HTMLElement),
        );
      }
    }
    if (params.hideOnClick && !targetIsButton) {
      if (
        swiper.pagination &&
        swiper.params.pagination &&
        (swiper.params.pagination as { clickable?: boolean }).clickable &&
        (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))
      )
        return;
      let isHidden: boolean | undefined;
      if (nextEls.length) {
        isHidden = nextEls[0]!.classList.contains(params.hiddenClass);
      } else if (prevEls.length) {
        isHidden = prevEls[0]!.classList.contains(params.hiddenClass);
      }
      if (isHidden === true) {
        emit('navigationShow');
      } else {
        emit('navigationHide');
      }
      [...nextEls, ...prevEls]
        .filter((el) => !!el)
        .forEach((el) => el.classList.toggle(params.hiddenClass));
    }
  });

  const enable = (): void => {
    const params = getParams();
    swiper.el.classList.remove(...params.navigationDisabledClass.split(' '));
    init();
    update();
  };

  const disable = (): void => {
    const params = getParams();
    swiper.el.classList.add(...params.navigationDisabledClass.split(' '));
    destroy();
  };

  Object.assign(swiper.navigation, {
    enable,
    disable,
    update,
    init,
    destroy,
  });
};

export default Navigation;
