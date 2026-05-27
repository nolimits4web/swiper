import { setInnerHTML } from '../shared/utils';
import { isObject } from './utils';
import type { Swiper, SwiperOptions } from '../core/core';

export interface UpdateSwiperArgs {
  swiper: Swiper;
  slides?: unknown[];
  passedParams: Record<string, unknown>;
  changedParams: string[];
  nextEl?: HTMLElement | string | null;
  prevEl?: HTMLElement | string | null;
  scrollbarEl?: HTMLElement | string | null;
  paginationEl?: HTMLElement | string | null;
}

type ModuleKey = 'navigation' | 'pagination' | 'scrollbar';

interface PartAwareElement extends HTMLElement {
  part: DOMTokenList;
}

export function updateSwiper(args: UpdateSwiperArgs): void {
  let { nextEl, prevEl, scrollbarEl, paginationEl } = args;
  const { swiper, slides, passedParams, changedParams } = args;
  const updateParams = changedParams.filter(
    (key) => key !== 'children' && key !== 'direction' && key !== 'wrapperClass',
  );
  const { params: currentParams, pagination, navigation, scrollbar, virtual, thumbs } = swiper;
  const passed = passedParams as Record<string, Record<string, unknown> | boolean | undefined>;
  const current = currentParams as unknown as Record<
    string,
    Record<string, unknown> | boolean | undefined
  >;

  let needThumbsInit: boolean | undefined;
  let needControllerInit: boolean | undefined;
  let needPaginationInit: boolean | undefined;
  let needScrollbarInit: boolean | undefined;
  let needNavigationInit: boolean | undefined;
  let loopNeedDestroy: boolean | undefined;
  let loopNeedEnable: boolean | undefined;
  let loopNeedReloop: boolean | undefined;

  const passedThumbs = passed.thumbs as
    | { swiper?: Swiper; [k: string]: unknown }
    | boolean
    | undefined;
  const currentThumbs = current.thumbs as { swiper?: Swiper | null } | boolean | undefined;
  if (
    changedParams.includes('thumbs') &&
    isObject(passedThumbs) &&
    isObject(passedThumbs.swiper) &&
    !(passedThumbs.swiper as Swiper).destroyed &&
    isObject(currentThumbs) &&
    (!currentThumbs.swiper || (currentThumbs.swiper as Swiper).destroyed)
  ) {
    needThumbsInit = true;
  }

  const passedController = passed.controller as
    | { control?: unknown; [k: string]: unknown }
    | boolean
    | undefined;
  const currentController = current.controller as
    | { control?: unknown; [k: string]: unknown }
    | boolean
    | undefined;
  if (
    changedParams.includes('controller') &&
    isObject(passedController) &&
    passedController.control &&
    isObject(currentController) &&
    !currentController.control
  ) {
    needControllerInit = true;
  }

  const passedPagination = passed.pagination as
    | { el?: unknown; [k: string]: unknown }
    | boolean
    | undefined;
  if (
    changedParams.includes('pagination') &&
    isObject(passedPagination) &&
    (passedPagination.el || paginationEl) &&
    (current.pagination || current.pagination === false) &&
    pagination &&
    !pagination.el
  ) {
    needPaginationInit = true;
  }

  const passedScrollbar = passed.scrollbar as
    | { el?: unknown; [k: string]: unknown }
    | boolean
    | undefined;
  if (
    changedParams.includes('scrollbar') &&
    isObject(passedScrollbar) &&
    (passedScrollbar.el || scrollbarEl) &&
    (current.scrollbar || current.scrollbar === false) &&
    scrollbar &&
    !scrollbar.el
  ) {
    needScrollbarInit = true;
  }

  const passedNavigation = passed.navigation as
    | { nextEl?: unknown; prevEl?: unknown; [k: string]: unknown }
    | boolean
    | undefined;
  if (
    changedParams.includes('navigation') &&
    isObject(passedNavigation) &&
    (passedNavigation.prevEl || prevEl) &&
    (passedNavigation.nextEl || nextEl) &&
    (current.navigation || current.navigation === false) &&
    navigation &&
    !navigation.prevEl &&
    !navigation.nextEl
  ) {
    needNavigationInit = true;
  }

  interface ModuleInstanceLike {
    destroy(): void;
    el?: HTMLElement;
    nextEl?: HTMLElement;
    prevEl?: HTMLElement;
  }
  const destroyModule = (mod: ModuleKey) => {
    const moduleInstance = swiper[mod] as ModuleInstanceLike | undefined;
    if (!moduleInstance) return;
    moduleInstance.destroy();
    const currentModule = current[mod];
    const currentObj = isObject(currentModule) ? currentModule : undefined;
    if (mod === 'navigation') {
      if (swiper.isElement) {
        moduleInstance.prevEl?.remove();
        moduleInstance.nextEl?.remove();
      }
      if (currentObj) {
        currentObj.prevEl = undefined;
        currentObj.nextEl = undefined;
      }
      moduleInstance.prevEl = undefined;
      moduleInstance.nextEl = undefined;
    } else {
      if (swiper.isElement) {
        moduleInstance.el?.remove();
      }
      if (currentObj) currentObj.el = undefined;
      moduleInstance.el = undefined;
    }
  };

  if (changedParams.includes('loop') && swiper.isElement) {
    if (currentParams.loop && !passedParams.loop) {
      loopNeedDestroy = true;
    } else if (!currentParams.loop && passedParams.loop) {
      loopNeedEnable = true;
    } else {
      loopNeedReloop = true;
    }
  }

  updateParams.forEach((key) => {
    const currentValue = current[key];
    const passedValue = passed[key];
    if (isObject(currentValue) && isObject(passedValue)) {
      Object.assign(currentValue, passedValue);
      if (
        (key === 'navigation' || key === 'pagination' || key === 'scrollbar') &&
        'enabled' in passedValue &&
        !passedValue.enabled
      ) {
        destroyModule(key);
      }
    } else {
      if (
        (passedValue === true || passedValue === false) &&
        (key === 'navigation' || key === 'pagination' || key === 'scrollbar')
      ) {
        if (passedValue === false) {
          destroyModule(key);
        }
      } else {
        current[key] = passedValue;
      }
    }
  });

  if (
    updateParams.includes('controller') &&
    !needControllerInit &&
    swiper.controller &&
    swiper.controller.control &&
    isObject(currentController) &&
    currentController.control
  ) {
    swiper.controller.control = currentController.control as Swiper | Swiper[];
  }

  if (changedParams.includes('children') && slides && virtual && currentParams.virtual?.enabled) {
    virtual.slides = slides;
    virtual.update(true);
  } else if (changedParams.includes('virtual') && virtual && currentParams.virtual?.enabled) {
    if (slides) virtual.slides = slides;
    virtual.update(true);
  }
  if (changedParams.includes('children') && slides && currentParams.loop) {
    loopNeedReloop = true;
  }

  if (needThumbsInit && thumbs) {
    const initialized = thumbs.init();
    if (initialized) thumbs.update(true);
  }

  if (needControllerInit && swiper.controller && isObject(currentController)) {
    swiper.controller.control = currentController.control as Swiper | Swiper[];
  }

  if (needPaginationInit && pagination) {
    if (swiper.isElement && (!paginationEl || typeof paginationEl === 'string')) {
      const el = document.createElement('div') as PartAwareElement;
      el.classList.add('swiper-pagination');
      el.part.add('pagination');
      swiper.el.appendChild(el);
      paginationEl = el;
    }
    const paginationParams = current.pagination;
    if (paginationEl && isObject(paginationParams))
      paginationParams.el = paginationEl as HTMLElement;
    pagination.init();
    pagination.render();
    pagination.update();
  }

  if (needScrollbarInit && scrollbar) {
    if (swiper.isElement && (!scrollbarEl || typeof scrollbarEl === 'string')) {
      const el = document.createElement('div') as PartAwareElement;
      el.classList.add('swiper-scrollbar');
      el.part.add('scrollbar');
      swiper.el.appendChild(el);
      scrollbarEl = el;
    }
    const scrollbarParams = current.scrollbar;
    if (scrollbarEl && isObject(scrollbarParams)) scrollbarParams.el = scrollbarEl as HTMLElement;
    scrollbar.init();
    scrollbar.updateSize();
    scrollbar.setTranslate();
  }

  if (needNavigationInit && navigation) {
    if (swiper.isElement) {
      if (!nextEl || typeof nextEl === 'string') {
        const el = document.createElement('div') as PartAwareElement;
        el.classList.add('swiper-button-next');
        setInnerHTML(el, navigation.arrowSvg);
        el.part.add('button-next');
        swiper.el.appendChild(el);
        nextEl = el;
      }
      if (!prevEl || typeof prevEl === 'string') {
        const el = document.createElement('div') as PartAwareElement;
        el.classList.add('swiper-button-prev');
        setInnerHTML(el, navigation.arrowSvg);
        el.part.add('button-prev');
        swiper.el.appendChild(el);
        prevEl = el;
      }
    }
    const navigationParams = current.navigation;
    if (nextEl && isObject(navigationParams)) navigationParams.nextEl = nextEl as HTMLElement;
    if (prevEl && isObject(navigationParams)) navigationParams.prevEl = prevEl as HTMLElement;
    navigation.init();
    navigation.update();
  }

  if (changedParams.includes('allowSlideNext')) {
    swiper.allowSlideNext = passed.allowSlideNext as boolean;
  }
  if (changedParams.includes('allowSlidePrev')) {
    swiper.allowSlidePrev = passed.allowSlidePrev as boolean;
  }
  if (changedParams.includes('direction')) {
    swiper.changeDirection(passed.direction as SwiperOptions['direction'], false);
  }
  if (loopNeedDestroy || loopNeedReloop) {
    swiper.loopDestroy();
  }
  if (loopNeedEnable || loopNeedReloop) {
    swiper.loopCreate();
  }
  swiper.update();
}
