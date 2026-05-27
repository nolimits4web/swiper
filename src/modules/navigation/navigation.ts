import type { SwiperModuleFn } from '../../core/core';
import type {
  NavigationEvents,
  NavigationMethods,
  NavigationOptions,
} from '../../types/modules/navigation.d.ts';
import type { CSSSelector } from '../../types/shared.d.ts';
import createElementIfNotDefined from '../../shared/create-element-if-not-defined';
import { makeElementsArray, setInnerHTML } from '../../shared/utils';

export type { NavigationEvents, NavigationMethods, NavigationOptions };

// Runtime-only members attached to swiper.navigation beyond the published API.
interface NavigationInternals extends NavigationMethods {
  enable: () => void;
  disable: () => void;
  arrowSvg: string;
}

declare module '../../core/core' {
  interface Swiper {
    navigation: NavigationInternals;
  }
  interface SwiperOptions {
    navigation?: NavigationOptions | boolean;
  }
  interface SwiperParams {
    navigation?: NavigationOptions;
  }
  interface SwiperEvents extends NavigationEvents {}
}

const arrowSvg = `<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>`;

type NavEl = HTMLElement | HTMLElement[] | CSSSelector | null | undefined;

const Navigation: SwiperModuleFn = ({ swiper, extendParams, on, emit }) => {
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
    const params = swiper.params.navigation!;
    const els = makeElementsArray(el as HTMLElement | HTMLElement[]);
    els.forEach((subEl) => {
      if (subEl) {
        subEl.classList[disabled ? 'add' : 'remove'](...params.disabledClass!.split(' '));
        if (subEl.tagName === 'BUTTON') (subEl as HTMLButtonElement).disabled = disabled;
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass!);
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
    const params = swiper.params.navigation!;

    swiper.params.navigation = createElementIfNotDefined(
      swiper,
      swiper.originalParams.navigation as any,
      swiper.params.navigation as any,
      {
        nextEl: 'swiper-button-next',
        prevEl: 'swiper-button-prev',
      },
    );
    if (!(params.nextEl || params.prevEl)) return;

    let nextEl = getEl(params.nextEl);
    let prevEl = getEl(params.prevEl);
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
        el.classList.add(...params.lockClass!.split(' '));
      }
    };

    nextEls.forEach((el) => initButton(el, 'next'));
    prevEls.forEach((el) => initButton(el, 'prev'));
  }
  function destroy(): void {
    const { nextEl, prevEl } = swiper.navigation;
    const nextEls = makeElementsArray(nextEl as HTMLElement | HTMLElement[]);
    const prevEls = makeElementsArray(prevEl as HTMLElement | HTMLElement[]);
    const destroyButton = (el: HTMLElement, dir: 'next' | 'prev'): void => {
      el.removeEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      el.classList.remove(...swiper.params.navigation!.disabledClass!.split(' '));
    };
    nextEls.forEach((el) => destroyButton(el, 'next'));
    prevEls.forEach((el) => destroyButton(el, 'prev'));
  }

  on('init', () => {
    if (swiper.params.navigation!.enabled === false) {
      // eslint-disable-next-line
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
    const { nextEl, prevEl } = swiper.navigation;
    const nextEls = makeElementsArray(nextEl as HTMLElement | HTMLElement[]);
    const prevEls = makeElementsArray(prevEl as HTMLElement | HTMLElement[]);
    if (swiper.enabled) {
      update();
      return;
    }
    [...nextEls, ...prevEls]
      .filter((el) => !!el)
      .forEach((el) => el.classList.add(swiper.params.navigation!.lockClass!));
  });
  on('click', (_s, e: Event) => {
    const { nextEl, prevEl } = swiper.navigation;
    const nextEls = makeElementsArray(nextEl as HTMLElement | HTMLElement[]);
    const prevEls = makeElementsArray(prevEl as HTMLElement | HTMLElement[]);
    const targetEl = (e as Event).target as HTMLElement;
    let targetIsButton: boolean | EventTarget | undefined =
      prevEls.includes(targetEl) || nextEls.includes(targetEl);

    if (swiper.isElement && !targetIsButton) {
      const path = (e as any).path || ((e as Event).composedPath && (e as Event).composedPath());
      if (path) {
        targetIsButton = (path as EventTarget[]).find(
          (pathEl) =>
            nextEls.includes(pathEl as HTMLElement) || prevEls.includes(pathEl as HTMLElement),
        );
      }
    }
    if (swiper.params.navigation!.hideOnClick && !targetIsButton) {
      if (
        swiper.pagination &&
        swiper.params.pagination &&
        swiper.params.pagination!.clickable &&
        (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))
      )
        return;
      let isHidden: boolean | undefined;
      if (nextEls.length) {
        isHidden = nextEls[0]!.classList.contains(swiper.params.navigation!.hiddenClass!);
      } else if (prevEls.length) {
        isHidden = prevEls[0]!.classList.contains(swiper.params.navigation!.hiddenClass!);
      }
      if (isHidden === true) {
        emit('navigationShow');
      } else {
        emit('navigationHide');
      }
      [...nextEls, ...prevEls]
        .filter((el) => !!el)
        .forEach((el) => el.classList.toggle(swiper.params.navigation!.hiddenClass!));
    }
  });

  const enable = (): void => {
    swiper.el.classList.remove(...swiper.params.navigation!.navigationDisabledClass!.split(' '));
    init();
    update();
  };

  const disable = (): void => {
    swiper.el.classList.add(...swiper.params.navigation!.navigationDisabledClass!.split(' '));
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
