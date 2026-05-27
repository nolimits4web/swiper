import type { Swiper, SwiperModuleFn } from '../../core/core';
import classesToSelector from '../../shared/classes-to-selector';
import { createElement, elementIndex, makeElementsArray, setInnerHTML } from '../../shared/utils';

export interface A11yOptions {
  /**
   * Enables A11y
   *
   * @default true
   */
  enabled?: boolean;

  /**
   * Message for screen readers for previous button
   *
   * @default 'Previous slide'
   */
  prevSlideMessage?: string;

  /**
   * Message for screen readers for next button
   *
   * @default 'Next slide'
   */
  nextSlideMessage?: string;

  /**
   * Message for screen readers for previous button when swiper is on first slide
   *
   * @default 'This is the first slide'
   */
  firstSlideMessage?: string;

  /**
   * Message for screen readers for next button when swiper is on last slide
   *
   * @default 'This is the last slide'
   */
  lastSlideMessage?: string;

  /**
   * Message for screen readers for single pagination bullet
   *
   * @default 'Go to slide {{index}}'
   */
  paginationBulletMessage?: string;

  /**
   * CSS class name of A11y notification
   *
   * @default 'swiper-notification'
   */
  notificationClass?: string;

  /**
   * Message for screen readers for outer swiper container
   *
   * @default null
   */
  containerMessage?: string | null;

  /**
   * Message for screen readers describing the role of outer swiper container
   *
   * @default null
   */
  containerRoleDescriptionMessage?: string | null;

  /**
   * Value of the "role" attribute to be set on the swiper container
   *
   * @default null
   */
  containerRole?: string | null;

  /**
   * Message for screen readers describing the role of slide element
   *
   * @default null
   */
  itemRoleDescriptionMessage?: string | null;

  /**
   * Message for screen readers describing the label of slide element
   *
   * @default '{{index}} / {{slidesLength}}'
   */
  slideLabelMessage?: string;

  /**
   * Value of swiper slide `role` attribute
   *
   * @default 'group'
   */
  slideRole?: string;

  /**
   * Value of `id` attribute to be set on swiper-wrapper. If `null` will be generated automatically
   *
   * @default null
   */
  id?: string | number | null;

  /**
   * Enables scrolling to the slide that has been focused
   *
   * @default true
   */
  scrollOnFocus?: boolean;
  /**
   * Whether or not the swiper-wrapper should have the `aria-live` attribute applied to it.
   * If true, the value will be `off` when autoplay is enabled, otherwise it will be `polite`
   *
   * @default true
   */
  wrapperLiveRegion?: boolean;
}

export interface A11yMethods {}

export interface A11yEvents {}

// Runtime-only state attached to swiper.a11y beyond the published methods.
interface A11yInternals extends A11yMethods {
  clicked: boolean;
}

// All A11yOptions fields are optional in the public type, but extendParams fills
// them in at module init time. Use this view internally to access defaults
// without proliferating `!` non-null assertions through the module.
type A11yParamsRuntime = Required<
  Omit<
    A11yOptions,
    | 'containerMessage'
    | 'containerRoleDescriptionMessage'
    | 'containerRole'
    | 'itemRoleDescriptionMessage'
    | 'id'
  >
> &
  Pick<
    A11yOptions,
    | 'containerMessage'
    | 'containerRoleDescriptionMessage'
    | 'containerRole'
    | 'itemRoleDescriptionMessage'
    | 'id'
  >;

declare module '../../core/core' {
  interface Swiper {
    a11y: A11yInternals;
  }
  interface SwiperOptions {
    /**
     * Object with a11y parameters or boolean `true` to enable with default settings.
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   a11y: {
     *     prevSlideMessage: 'Previous slide',
     *     nextSlideMessage: 'Next slide',
     *   },
     * });
     * ```
     */
    a11y?: A11yOptions | boolean;
  }
  interface SwiperParams {
    a11y?: A11yOptions;
  }
  interface SwiperEvents extends A11yEvents {}
}

type ElOrEls = HTMLElement | HTMLElement[] | null | undefined;

const isVirtualEnabled = (swiper: Swiper): boolean =>
  !!swiper.virtual && !!(swiper.params.virtual as { enabled?: boolean } | undefined)?.enabled;

const A11y: SwiperModuleFn = ({ swiper, extendParams, on }) => {
  extendParams({
    a11y: {
      enabled: true,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      containerRole: null,
      itemRoleDescriptionMessage: null,
      slideRole: 'group',
      id: null,
      scrollOnFocus: true,
      wrapperLiveRegion: true,
    },
  });

  swiper.a11y = {
    clicked: false,
  };

  let liveRegion: HTMLElement | null = null;
  let preventFocusHandler = false;
  let focusTargetSlideEl: HTMLElement | undefined;
  let visibilityChangedTimestamp = new Date().getTime();

  function getParams(): A11yParamsRuntime {
    return swiper.params.a11y as A11yParamsRuntime;
  }

  function notify(message: string | undefined): void {
    const notification = liveRegion;
    if (!notification || !message) return;
    setInnerHTML(notification, message);
  }

  function getRandomNumber(size = 16): string {
    const randomChar = () => Math.round(16 * Math.random()).toString(16);
    return 'x'.repeat(size).replace(/x/g, randomChar);
  }
  function makeElFocusable(el: ElOrEls): void {
    const els = makeElementsArray(el);
    els.forEach((subEl: HTMLElement) => {
      subEl.setAttribute('tabIndex', '0');
    });
  }
  function makeElNotFocusable(el: ElOrEls): void {
    const els = makeElementsArray(el);
    els.forEach((subEl: HTMLElement) => {
      subEl.setAttribute('tabIndex', '-1');
    });
  }
  function addElRole(el: ElOrEls, role: string): void {
    const els = makeElementsArray(el);
    els.forEach((subEl: HTMLElement) => {
      subEl.setAttribute('role', role);
    });
  }
  function addElRoleDescription(el: ElOrEls, description: string): void {
    const els = makeElementsArray(el);
    els.forEach((subEl: HTMLElement) => {
      subEl.setAttribute('aria-roledescription', description);
    });
  }
  function addElLabel(el: ElOrEls, label: string): void {
    const els = makeElementsArray(el);
    els.forEach((subEl: HTMLElement) => {
      subEl.setAttribute('aria-label', label);
    });
  }
  function addElId(el: ElOrEls, id: string): void {
    const els = makeElementsArray(el);
    els.forEach((subEl: HTMLElement) => {
      subEl.setAttribute('id', id);
    });
  }
  function addElLive(el: ElOrEls, live: string): void {
    const els = makeElementsArray(el);
    els.forEach((subEl: HTMLElement) => {
      subEl.setAttribute('aria-live', live);
    });
  }
  function disableEl(el: ElOrEls): void {
    const els = makeElementsArray(el);
    els.forEach((subEl: HTMLElement) => {
      subEl.setAttribute('aria-disabled', 'true');
    });
  }
  function enableEl(el: ElOrEls): void {
    const els = makeElementsArray(el);
    els.forEach((subEl: HTMLElement) => {
      subEl.removeAttribute('aria-disabled');
    });
  }

  function onEnterOrSpaceKey(e: KeyboardEvent): void {
    if (e.keyCode !== 13 && e.keyCode !== 32) return;
    const params = getParams();
    const paginationParams = swiper.params.pagination as { bulletClass?: string } | undefined;
    const targetEl = e.target as HTMLElement;
    if (
      swiper.pagination &&
      swiper.pagination.el &&
      (targetEl === swiper.pagination.el || swiper.pagination.el.contains(targetEl))
    ) {
      if (!targetEl.matches(classesToSelector(paginationParams?.bulletClass))) return;
    }
    if (swiper.navigation && swiper.navigation.prevEl && swiper.navigation.nextEl) {
      const prevEls = makeElementsArray(swiper.navigation.prevEl);
      const nextEls = makeElementsArray(swiper.navigation.nextEl);
      if (nextEls.includes(targetEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          notify(params.lastSlideMessage);
        } else {
          notify(params.nextSlideMessage);
        }
      }
      if (prevEls.includes(targetEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          notify(params.firstSlideMessage);
        } else {
          notify(params.prevSlideMessage);
        }
      }
    }

    if (swiper.pagination && targetEl.matches(classesToSelector(paginationParams?.bulletClass))) {
      targetEl.click();
    }
  }

  function updateNavigation(): void {
    if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
    const { nextEl, prevEl } = swiper.navigation;

    if (prevEl) {
      if (swiper.isBeginning) {
        disableEl(prevEl);
        makeElNotFocusable(prevEl);
      } else {
        enableEl(prevEl);
        makeElFocusable(prevEl);
      }
    }
    if (nextEl) {
      if (swiper.isEnd) {
        disableEl(nextEl);
        makeElNotFocusable(nextEl);
      } else {
        enableEl(nextEl);
        makeElFocusable(nextEl);
      }
    }
  }

  function hasPagination(): boolean {
    return !!(swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length);
  }

  function hasClickablePagination(): boolean {
    const paginationParams = swiper.params.pagination as { clickable?: boolean } | undefined;
    return hasPagination() && !!paginationParams?.clickable;
  }

  function updatePagination(): void {
    const params = getParams();
    if (!hasPagination()) return;
    const paginationParams = swiper.params.pagination as {
      clickable?: boolean;
      renderBullet?: unknown;
      bulletActiveClass?: string;
    };
    swiper.pagination.bullets.forEach((bulletEl: HTMLElement) => {
      if (paginationParams.clickable) {
        makeElFocusable(bulletEl);
        if (!paginationParams.renderBullet) {
          addElRole(bulletEl, 'button');
          addElLabel(
            bulletEl,
            params.paginationBulletMessage.replace(
              /\{\{index\}\}/,
              String((elementIndex(bulletEl) ?? 0) + 1),
            ),
          );
        }
      }
      if (bulletEl.matches(classesToSelector(paginationParams.bulletActiveClass))) {
        bulletEl.setAttribute('aria-current', 'true');
      } else {
        bulletEl.removeAttribute('aria-current');
      }
    });
  }

  const initNavEl = (el: HTMLElement, _wrapperId: string, message: string): void => {
    makeElFocusable(el);
    if (el.tagName !== 'BUTTON') {
      addElRole(el, 'button');
      el.addEventListener('keydown', onEnterOrSpaceKey);
    }
    addElLabel(el, message);
  };

  const handlePointerDown = (e: PointerEvent): void => {
    if (
      focusTargetSlideEl &&
      focusTargetSlideEl !== e.target &&
      !focusTargetSlideEl.contains(e.target as Node)
    ) {
      preventFocusHandler = true;
    }
    swiper.a11y.clicked = true;
  };
  const handlePointerUp = (): void => {
    preventFocusHandler = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!swiper.destroyed) {
          swiper.a11y.clicked = false;
        }
      });
    });
  };

  const onVisibilityChange = (_e: Event): void => {
    visibilityChangedTimestamp = new Date().getTime();
  };

  const handleFocus = (e: FocusEvent): void => {
    const params = getParams();
    if (swiper.a11y.clicked || !params.scrollOnFocus) return;
    if (new Date().getTime() - visibilityChangedTimestamp < 100) return;

    const target = e.target as HTMLElement;
    const slideEl = target.closest(
      `.${swiper.params.slideClass}, swiper-slide`,
    ) as HTMLElement | null;
    if (!slideEl || !swiper.slides.includes(slideEl)) return;
    focusTargetSlideEl = slideEl;
    const isVirtual = isVirtualEnabled(swiper);
    const isActive =
      (isVirtual
        ? parseInt(slideEl.getAttribute('data-swiper-slide-index') || '0', 10)
        : swiper.slides.indexOf(slideEl)) === swiper.activeIndex;
    const isVisible =
      swiper.params.watchSlidesProgress &&
      swiper.visibleSlides &&
      swiper.visibleSlides.includes(slideEl);
    if (isActive || isVisible) return;
    const sourceCapabilities = (
      e as FocusEvent & {
        sourceCapabilities?: { firesTouchEvents?: boolean };
      }
    ).sourceCapabilities;
    if (sourceCapabilities && sourceCapabilities.firesTouchEvents) return;
    if (swiper.isHorizontal()) {
      swiper.el.scrollLeft = 0;
    } else {
      swiper.el.scrollTop = 0;
    }
    requestAnimationFrame(() => {
      if (preventFocusHandler) return;
      if (swiper.params.loop) {
        swiper.slideToLoop(
          swiper.getSlideIndexWhenGrid(
            parseInt(slideEl.getAttribute('data-swiper-slide-index') || '0', 10),
          ),
          0,
        );
      } else if (isVirtual) {
        swiper.slideTo(
          swiper.getSlideIndexWhenGrid(
            parseInt(slideEl.getAttribute('data-swiper-slide-index') || '0', 10),
          ),
          0,
        );
      } else {
        swiper.slideTo(swiper.getSlideIndexWhenGrid(swiper.slides.indexOf(slideEl)), 0);
      }

      preventFocusHandler = false;
    });
  };

  const initSlides = (): void => {
    const params = getParams();
    if (params.itemRoleDescriptionMessage) {
      addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage);
    }
    if (params.slideRole) {
      addElRole(swiper.slides, params.slideRole);
    }

    const slidesLength = swiper.slides.length;
    const slideLabelMessage = params.slideLabelMessage;
    if (slideLabelMessage) {
      swiper.slides.forEach((slideEl: HTMLElement, index: number) => {
        const slideIndex = swiper.params.loop
          ? parseInt(slideEl.getAttribute('data-swiper-slide-index') || '0', 10)
          : index;
        const ariaLabelMessage = slideLabelMessage
          .replace(/\{\{index\}\}/, String(slideIndex + 1))
          .replace(/\{\{slidesLength\}\}/, String(slidesLength));
        addElLabel(slideEl, ariaLabelMessage);
      });
    }
  };

  const init = (): void => {
    const params = getParams();
    if (liveRegion) swiper.el.append(liveRegion);

    // Container
    const containerEl = swiper.el;
    if (params.containerRoleDescriptionMessage) {
      addElRoleDescription(containerEl, params.containerRoleDescriptionMessage);
    }
    if (params.containerMessage) {
      addElLabel(containerEl, params.containerMessage);
    }
    if (params.containerRole) {
      addElRole(containerEl, params.containerRole);
    }

    // Wrapper
    const wrapperEl = swiper.wrapperEl;
    const wrapperId = String(
      params.id || wrapperEl.getAttribute('id') || `swiper-wrapper-${getRandomNumber(16)}`,
    );
    addElId(wrapperEl, wrapperId);
    if (params.wrapperLiveRegion) {
      const autoplayParams = swiper.params.autoplay as { enabled?: boolean } | undefined;
      const live = swiper.params.autoplay && autoplayParams?.enabled ? 'off' : 'polite';
      addElLive(wrapperEl, live);
    }

    // Slide
    initSlides();

    // Navigation
    const nav = swiper.navigation
      ? swiper.navigation
      : ({ nextEl: undefined, prevEl: undefined } as {
          nextEl?: HTMLElement;
          prevEl?: HTMLElement;
        });
    const nextEls = makeElementsArray(nav.nextEl);
    const prevEls = makeElementsArray(nav.prevEl);

    if (nextEls) {
      nextEls.forEach((el: HTMLElement) => initNavEl(el, wrapperId, params.nextSlideMessage));
    }
    if (prevEls) {
      prevEls.forEach((el: HTMLElement) => initNavEl(el, wrapperId, params.prevSlideMessage));
    }

    // Pagination
    if (hasClickablePagination()) {
      const paginationEl = makeElementsArray(swiper.pagination.el);
      paginationEl.forEach((el: HTMLElement) => {
        el.addEventListener('keydown', onEnterOrSpaceKey);
      });
    }

    // Tab focus
    document.addEventListener('visibilitychange', onVisibilityChange);
    swiper.el.addEventListener('focus', handleFocus as EventListener, true);
    swiper.el.addEventListener('pointerdown', handlePointerDown as EventListener, true);
    swiper.el.addEventListener('pointerup', handlePointerUp, true);
  };
  function destroy(): void {
    if (liveRegion) liveRegion.remove();
    const nav = swiper.navigation
      ? swiper.navigation
      : ({ nextEl: undefined, prevEl: undefined } as {
          nextEl?: HTMLElement;
          prevEl?: HTMLElement;
        });
    const nextEls = makeElementsArray(nav.nextEl);
    const prevEls = makeElementsArray(nav.prevEl);
    if (nextEls) {
      nextEls.forEach((el: HTMLElement) => el.removeEventListener('keydown', onEnterOrSpaceKey));
    }
    if (prevEls) {
      prevEls.forEach((el: HTMLElement) => el.removeEventListener('keydown', onEnterOrSpaceKey));
    }

    // Pagination
    if (hasClickablePagination()) {
      const paginationEl = makeElementsArray(swiper.pagination.el);
      paginationEl.forEach((el: HTMLElement) => {
        el.removeEventListener('keydown', onEnterOrSpaceKey);
      });
    }

    document.removeEventListener('visibilitychange', onVisibilityChange);
    // Tab focus
    if (swiper.el && typeof swiper.el !== 'string') {
      swiper.el.removeEventListener('focus', handleFocus as EventListener, true);
      swiper.el.removeEventListener('pointerdown', handlePointerDown as EventListener, true);
      swiper.el.removeEventListener('pointerup', handlePointerUp, true);
    }
  }

  on('beforeInit', () => {
    liveRegion = createElement('span', getParams().notificationClass);
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('aria-atomic', 'true');
  });

  on('afterInit', () => {
    if (!getParams().enabled) return;
    init();
  });
  on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
    if (!getParams().enabled) return;
    initSlides();
  });
  on('fromEdge toEdge afterInit lock unlock', () => {
    if (!getParams().enabled) return;
    updateNavigation();
  });
  on('paginationUpdate', () => {
    if (!getParams().enabled) return;
    updatePagination();
  });
  on('destroy', () => {
    if (!getParams().enabled) return;
    destroy();
  });
};

export default A11y;
