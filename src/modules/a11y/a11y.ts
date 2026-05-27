import type { SwiperModuleFn } from '../../core/core';
import type { A11yEvents, A11yMethods, A11yOptions } from '../../types/modules/a11y.d.ts';
import classesToSelector from '../../shared/classes-to-selector';
import { createElement, elementIndex, makeElementsArray, setInnerHTML } from '../../shared/utils';

export type { A11yEvents, A11yMethods, A11yOptions };

// Runtime-only state attached to swiper.a11y beyond the published methods.
interface A11yInternals extends A11yMethods {
  clicked: boolean;
}

declare module '../../core/core' {
  interface Swiper {
    a11y: A11yInternals;
  }
  interface SwiperOptions {
    a11y?: A11yOptions | boolean;
  }
  interface SwiperParams {
    a11y?: A11yOptions;
  }
  interface SwiperEvents extends A11yEvents {}
}

type ElOrEls = HTMLElement | HTMLElement[] | null | undefined;

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
    const params = swiper.params.a11y!;
    const targetEl = e.target as HTMLElement;
    if (
      swiper.pagination &&
      swiper.pagination.el &&
      (targetEl === swiper.pagination.el || swiper.pagination.el.contains(targetEl))
    ) {
      if (!targetEl.matches(classesToSelector(swiper.params.pagination!.bulletClass))) return;
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

    if (
      swiper.pagination &&
      targetEl.matches(classesToSelector(swiper.params.pagination!.bulletClass))
    ) {
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
    return hasPagination() && !!swiper.params.pagination!.clickable;
  }

  function updatePagination(): void {
    const params = swiper.params.a11y!;
    if (!hasPagination()) return;
    swiper.pagination.bullets.forEach((bulletEl: HTMLElement) => {
      const paginationParams = swiper.params.pagination!;
      if (paginationParams.clickable) {
        makeElFocusable(bulletEl);
        if (!paginationParams.renderBullet) {
          addElRole(bulletEl, 'button');
          addElLabel(
            bulletEl,
            (params.paginationBulletMessage ?? '').replace(
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
    if (swiper.a11y.clicked || !swiper.params.a11y!.scrollOnFocus) return;
    if (new Date().getTime() - visibilityChangedTimestamp < 100) return;

    const target = e.target as HTMLElement;
    const slideEl = target.closest(
      `.${swiper.params.slideClass}, swiper-slide`,
    ) as HTMLElement | null;
    if (!slideEl || !swiper.slides.includes(slideEl)) return;
    focusTargetSlideEl = slideEl;
    const isVirtual = swiper.virtual && (swiper.params.virtual as any).enabled;
    const isActive =
      (isVirtual
        ? parseInt(slideEl.getAttribute('data-swiper-slide-index') || '0', 10)
        : swiper.slides.indexOf(slideEl)) === swiper.activeIndex;
    const isVisible =
      swiper.params.watchSlidesProgress &&
      swiper.visibleSlides &&
      swiper.visibleSlides.includes(slideEl);
    if (isActive || isVisible) return;
    if ((e as any).sourceCapabilities && (e as any).sourceCapabilities.firesTouchEvents) return;
    if (swiper.isHorizontal()) {
      swiper.el.scrollLeft = 0;
    } else {
      swiper.el.scrollTop = 0;
    }
    requestAnimationFrame(() => {
      if (preventFocusHandler) return;
      if (swiper.params.loop) {
        swiper.slideToLoop(
          (swiper as any).getSlideIndexWhenGrid(
            parseInt(slideEl.getAttribute('data-swiper-slide-index') || '0', 10),
          ),
          0,
        );
      } else if (isVirtual) {
        swiper.slideTo(
          (swiper as any).getSlideIndexWhenGrid(
            parseInt(slideEl.getAttribute('data-swiper-slide-index') || '0', 10),
          ),
          0,
        );
      } else {
        swiper.slideTo((swiper as any).getSlideIndexWhenGrid(swiper.slides.indexOf(slideEl)), 0);
      }

      preventFocusHandler = false;
    });
  };

  const initSlides = (): void => {
    const params = swiper.params.a11y!;
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
    const params = swiper.params.a11y!;
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
      const live =
        swiper.params.autoplay && (swiper.params.autoplay as any).enabled ? 'off' : 'polite';
      addElLive(wrapperEl, live);
    }

    // Slide
    initSlides();

    // Navigation
    const nav = swiper.navigation ? swiper.navigation : ({} as { nextEl?: any; prevEl?: any });
    const nextEls = makeElementsArray(nav.nextEl);
    const prevEls = makeElementsArray(nav.prevEl);

    if (nextEls) {
      nextEls.forEach((el: HTMLElement) => initNavEl(el, wrapperId, params.nextSlideMessage ?? ''));
    }
    if (prevEls) {
      prevEls.forEach((el: HTMLElement) => initNavEl(el, wrapperId, params.prevSlideMessage ?? ''));
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
    const nav = swiper.navigation ? swiper.navigation : ({} as { nextEl?: any; prevEl?: any });
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
    liveRegion = createElement('span', swiper.params.a11y!.notificationClass);
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('aria-atomic', 'true');
  });

  on('afterInit', () => {
    if (!swiper.params.a11y!.enabled) return;
    init();
  });
  on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
    if (!swiper.params.a11y!.enabled) return;
    initSlides();
  });
  on('fromEdge toEdge afterInit lock unlock', () => {
    if (!swiper.params.a11y!.enabled) return;
    updateNavigation();
  });
  on('paginationUpdate', () => {
    if (!swiper.params.a11y!.enabled) return;
    updatePagination();
  });
  on('destroy', () => {
    if (!swiper.params.a11y!.enabled) return;
    destroy();
  });
};

export default A11y;
