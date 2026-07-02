import type { Swiper, SwiperModule } from '../../core/core';
import classesToSelector from '../../shared/classes-to-selector';
import createElementIfNotDefined from '../../shared/create-element-if-not-defined';
import {
  elementIndex,
  elementOuterSize,
  elementParents,
  makeElementsArray,
  setInnerHTML,
} from '../../shared/utils';
import type { CSSSelector } from '../../types/shared';

export interface PaginationOptions {
  /**
   * Boolean property to use with breakpoints to enable/disable pagination on certain breakpoints
   */
  enabled?: boolean;
  /**
   * String with CSS selector or HTML element of the container with pagination
   *
   * @default null
   */
  el?: CSSSelector | HTMLElement | null;

  /**
   * String with type of pagination. Can be `'bullets'`, `'fraction'`, `'progressbar'` or `'custom'`
   *
   * @default 'bullets'
   */
  type?: 'bullets' | 'fraction' | 'progressbar' | 'custom';

  /**
   * Defines which HTML tag will be used to represent single pagination bullet. Only for `'bullets'` pagination type.
   *
   * @default 'span'
   */
  bulletElement?: string;

  /**
   * Good to enable if you use bullets pagination with a lot of slides. So it will keep only few bullets visible at the same time.
   *
   * @default false
   */
  dynamicBullets?: boolean;

  /**
   * The number of main bullets visible when `dynamicBullets` enabled.
   *
   * @default 1
   */
  dynamicMainBullets?: number;

  /**
   * Toggle (hide/show) pagination container visibility after click on Slider's container
   *
   * @default true
   */
  hideOnClick?: boolean;

  /**
   * If `true` then clicking on pagination button will cause transition to appropriate slide. Only for bullets pagination type
   *
   * @default false
   */
  clickable?: boolean;

  /**
   * Makes pagination progressbar opposite to Swiper's `direction` parameter, means vertical progressbar for horizontal swiper
   * direction and horizontal progressbar for vertical swiper direction
   *
   * @default false
   */
  progressbarOpposite?: boolean;

  /**
   * format fraction pagination current number. Function receives current number,
   * and you need to return formatted value
   */
  formatFractionCurrent?: (number: number) => number | string;

  /**
   * format fraction pagination total number. Function receives total number, and you
   * need to return formatted value
   */
  formatFractionTotal?: (number: number) => number | string;

  /**
   * This parameter allows totally customize pagination bullets, you need to pass here a function that accepts `index` number of
   * pagination bullet and required element class name (`className`). Only for `'bullets'` pagination type
   *
   * @default null
   *
   * @example
   * ```js
   * const swiper = new Swiper('.swiper', {
   *   //...
   *   pagination: {
   *     //...
   *     renderBullet: function (index, className) {
   *       return '<span class="' + className + '">' + (index + 1) + '</span>';
   *     },
   *   },
   * });
   * ```
   */
  renderBullet?: (index: number, className: string) => string;

  /**
   * This parameter allows to customize "fraction" pagination html. Only for `'fraction'` pagination type
   *
   * @default null
   *
   * @example
   * ```js
   * const swiper = new Swiper('.swiper', {
   *   //...
   *   pagination: {
   *     //...
   *     renderFraction: function (currentClass, totalClass) {
   *       return '<span class="' + currentClass + '"></span>' +
   *               ' of ' +
   *               '<span class="' + totalClass + '"></span>';
   *     },
   *   },
   * });
   * ```
   */
  renderFraction?: (currentClass: string, totalClass: string) => string;

  /**
   * This parameter allows to customize "progress" pagination. Only for `'progress'` pagination type
   *
   * @default null
   *
   * @example
   * ```js
   * const swiper = new Swiper('.swiper', {
   *   //...
   *   pagination: {
   *     //...
   *     renderProgressbar: function (progressbarFillClass) {
   *       return '<span class="' + progressbarFillClass + '"></span>';
   *     },
   *   },
   * });
   * ```
   */
  renderProgressbar?: (progressbarFillClass: string) => string;

  /**
   * This parameter is required for `'custom'` pagination type where you have to specify
   * how it should be rendered.
   *
   * @default null
   *
   * @example
   * ```js
   * const swiper = new Swiper('.swiper', {
   *   //...
   *   pagination: {
   *     //...
   *     renderCustom: function (swiper, current, total) {
   *       return current + ' of ' + total;
   *     },
   *   },
   * });
   * ```
   */
  renderCustom?: (swiper: Swiper, current: number, total: number) => string;

  /**
   * CSS class name of single pagination bullet
   *
   * @default 'swiper-pagination-bullet'
   */
  bulletClass?: string;

  /**
   * CSS class name of currently active pagination bullet
   *
   * @default 'swiper-pagination-bullet-active'
   */
  bulletActiveClass?: string;

  /**
   * The beginning of the modifier CSS class name that will be added to pagination depending on parameters
   *
   * @default 'swiper-pagination-'
   */
  modifierClass?: string;

  /**
   * CSS class name of the element with currently active index in "fraction" pagination
   *
   * @default 'swiper-pagination-current'
   */
  currentClass?: string;

  /**
   * CSS class name of the element with total number of "snaps" in "fraction" pagination
   *
   * @default 'swiper-pagination-total'
   */
  totalClass?: string;

  /**
   * CSS class name of pagination when it becomes inactive
   *
   * @default 'swiper-pagination-hidden'
   */
  hiddenClass?: string;

  /**
   * CSS class name of pagination progressbar fill element
   *
   * @default 'swiper-pagination-progressbar-fill'
   */
  progressbarFillClass?: string;

  /**
   * CSS class name of pagination progressbar opposite
   *
   * @default 'swiper-pagination-progressbar-opposite'
   */
  progressbarOppositeClass?: string;
  /**
   * CSS class name set to pagination when it is clickable
   *
   * @default 'swiper-pagination-clickable'
   */
  clickableClass?: string;

  /**
   * CSS class name set to pagination when it is disabled
   *
   * @default 'swiper-pagination-lock'
   */
  lockClass?: string;

  /**
   * CSS class name set to pagination in horizontal Swiper
   *
   * @default 'swiper-pagination-horizontal'
   */
  horizontalClass?: string;

  /**
   * CSS class name set to pagination in vertical Swiper
   *
   * @default 'swiper-pagination-vertical'
   */
  verticalClass?: string;

  /**
   * CSS class name added on swiper container and pagination element when pagination is disabled by breakpoint
   *
   * @default 'swiper-pagination-disabled'
   */
  paginationDisabledClass?: string;
}

export interface PaginationMethods {
  /**
   * HTMLElement of pagination container element
   */
  el: HTMLElement;

  /**
   * Array of pagination bullets
   * HTML elements. To get specific slide HTMLElement
   * use `swiper.pagination.bullets[1]`.
   */
  bullets: HTMLElement[];

  /**
   * Render pagination layout
   */
  render(): void;

  /**
   * Update pagination state (enabled/disabled/active)
   */
  update(): void;

  /**
   * Initialize pagination
   */
  init(): void;

  /**
   * Destroy pagination
   */
  destroy(): void;
}

export interface PaginationEvents {
  /**
   * Event will be fired after pagination rendered
   */
  paginationRender: (swiper: Swiper, paginationEl: HTMLElement) => void;

  /**
   * Event will be fired when pagination updated
   */
  paginationUpdate: (swiper: Swiper, paginationEl: HTMLElement) => void;

  /**
   * Event will be fired on pagination hide
   */
  paginationHide: (swiper: Swiper) => void;

  /**
   * Event will be fired on pagination show
   */
  paginationShow: (swiper: Swiper) => void;
}

// Runtime-only members attached to swiper.pagination beyond the published API.
interface PaginationInternals extends PaginationMethods {
  enable: () => void;
  disable: () => void;
}

// All PaginationOptions fields are optional in the public type, but extendParams
// fills them in at module init time. Use this view internally to access defaults
// without proliferating `!` non-null assertions through the module.
type PaginationParamsRuntime = Required<
  Omit<
    PaginationOptions,
    'el' | 'renderBullet' | 'renderProgressbar' | 'renderFraction' | 'renderCustom'
  >
> &
  Pick<
    PaginationOptions,
    'el' | 'renderBullet' | 'renderProgressbar' | 'renderFraction' | 'renderCustom'
  >;

declare module '../../core/core' {
  interface Swiper {
    pagination: PaginationInternals;
  }
  interface SwiperOptions {
    /**
     * Object with pagination parameters or boolean `true` to enable with default settings.
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   pagination: {
     *     el: '.swiper-pagination',
     *     type: 'bullets',
     *   },
     * });
     * ```
     */
    pagination?: PaginationOptions | boolean;
  }
  interface SwiperParams {
    pagination?: PaginationOptions;
  }
  interface SwiperEvents extends PaginationEvents {}
}

const isVirtualEnabled = (swiper: Swiper): boolean =>
  !!swiper.virtual && !!(swiper.params.virtual as { enabled?: boolean } | undefined)?.enabled;

const isFreeModeEnabled = (swiper: Swiper): boolean =>
  !!(swiper.params.freeMode as { enabled?: boolean } | undefined)?.enabled;

const Pagination: SwiperModule = ({ swiper, extendParams, on, emit }) => {
  const pfx = 'swiper-pagination';
  extendParams({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: (number: number) => number,
      formatFractionTotal: (number: number) => number,
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`,
    },
  });

  // Initialized as a partial; remaining methods (render, update, init,
  // destroy, enable, disable) attach after their definitions below.
  swiper.pagination = {
    el: null as unknown as HTMLElement,
    bullets: [],
  } as unknown as PaginationInternals;

  let bulletSize: number | undefined;
  let dynamicBulletIndex = 0;

  function getParams(): PaginationParamsRuntime {
    return swiper.params.pagination as PaginationParamsRuntime;
  }

  function isPaginationDisabled(): boolean {
    const elParam = getParams().el;
    return (
      !elParam ||
      !swiper.pagination.el ||
      (Array.isArray(swiper.pagination.el) &&
        (swiper.pagination.el as unknown as HTMLElement[]).length === 0)
    );
  }

  function setSideBullets(
    bulletEl: HTMLElement | null | undefined,
    position: 'prev' | 'next',
  ): void {
    const { bulletActiveClass } = getParams();
    if (!bulletEl) return;
    let current: Element | null =
      bulletEl[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
    if (current) {
      current.classList.add(`${bulletActiveClass}-${position}`);
      current = current[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
      if (current) {
        current.classList.add(`${bulletActiveClass}-${position}-${position}`);
      }
    }
  }

  function getMoveDirection(
    prevIndex: number,
    nextIndex: number,
    length: number,
  ): 'next' | 'previous' | undefined {
    prevIndex = prevIndex % length;
    nextIndex = nextIndex % length;
    if (nextIndex === prevIndex + 1) {
      return 'next';
    } else if (nextIndex === prevIndex - 1) {
      return 'previous';
    }
    return undefined;
  }
  function onBulletClick(e: Event): void {
    const targetEl = e.target as HTMLElement;
    const bulletEl = targetEl.closest(
      classesToSelector(getParams().bulletClass),
    ) as HTMLElement | null;
    if (!bulletEl) {
      return;
    }
    e.preventDefault();
    const index = (elementIndex(bulletEl) ?? 0) * (swiper.params.slidesPerGroup ?? 1);
    if (swiper.params.loop) {
      if (swiper.realIndex === index) return;
      const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
      if (moveDirection === 'next') {
        swiper.slideNext();
      } else if (moveDirection === 'previous') {
        swiper.slidePrev();
      } else {
        swiper.slideToLoop(index);
      }
    } else {
      swiper.slideTo(index);
    }
  }

  function update(): void {
    // Render || Update Pagination bullets/items
    const rtl = swiper.rtl;
    const params = getParams();
    if (isPaginationDisabled()) return;

    const els = makeElementsArray(swiper.pagination.el as HTMLElement | HTMLElement[]);
    // Current/Total
    let current: number;
    let previousIndex: number | undefined;
    const gridParams = swiper.params.grid as { rows?: number } | undefined;
    const slidesLength = isVirtualEnabled(swiper)
      ? swiper.virtual.slides.length
      : swiper.grid && gridParams?.rows && gridParams.rows > 1
        ? swiper.slides.length / Math.ceil(gridParams.rows)
        : swiper.slides.length;
    const total = swiper.params.loop
      ? Math.ceil(slidesLength / (swiper.params.slidesPerGroup ?? 1))
      : swiper.snapGrid.length;
    if (swiper.params.loop) {
      previousIndex = swiper.previousRealIndex || 0;
      current =
        (swiper.params.slidesPerGroup ?? 1) > 1
          ? Math.floor(swiper.realIndex / (swiper.params.slidesPerGroup ?? 1))
          : swiper.realIndex;
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
      previousIndex = swiper.previousSnapIndex;
    } else {
      previousIndex = swiper.previousIndex || 0;
      current = swiper.activeIndex || 0;
    }
    // Types
    if (
      params.type === 'bullets' &&
      swiper.pagination.bullets &&
      swiper.pagination.bullets.length > 0
    ) {
      const bullets = swiper.pagination.bullets;
      let firstIndex: number = 0;
      let lastIndex: number = 0;
      let midIndex: number = 0;
      if (params.dynamicBullets) {
        bulletSize = elementOuterSize(
          bullets[0]!,
          swiper.isHorizontal() ? 'width' : 'height',
          true,
        );
        const dim = swiper.isHorizontal() ? 'width' : 'height';
        els.forEach((subEl) => {
          subEl.style[dim] = `${(bulletSize ?? 0) * (params.dynamicMainBullets + 4)}px`;
        });
        if (params.dynamicMainBullets > 1 && previousIndex !== undefined) {
          dynamicBulletIndex += current - (previousIndex || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach((bulletEl: HTMLElement) => {
        const classesToRemove: string[] = [
          '',
          '-next',
          '-next-next',
          '-prev',
          '-prev-prev',
          '-main',
        ]
          .map((suffix) => `${params.bulletActiveClass}${suffix}`)
          .flatMap((s) => (typeof s === 'string' && s.includes(' ') ? s.split(' ') : [s]));
        bulletEl.classList.remove(...classesToRemove);
      });

      if (els.length > 1) {
        bullets.forEach((bullet: HTMLElement) => {
          const bulletIndex = elementIndex(bullet);
          if (bulletIndex === current) {
            bullet.classList.add(...params.bulletActiveClass.split(' '));
          } else if (swiper.isElement) {
            bullet.setAttribute('part', 'bullet');
          }
          if (params.dynamicBullets && bulletIndex !== undefined) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              bullet.classList.add(...`${params.bulletActiveClass}-main`.split(' '));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets(bullet, 'prev');
            }
            if (bulletIndex === lastIndex) {
              setSideBullets(bullet, 'next');
            }
          }
        });
      } else {
        const bullet = bullets[current];
        if (bullet) {
          bullet.classList.add(...params.bulletActiveClass.split(' '));
        }
        if (swiper.isElement) {
          bullets.forEach((bulletEl: HTMLElement, bulletIndex: number) => {
            bulletEl.setAttribute('part', bulletIndex === current ? 'bullet-active' : 'bullet');
          });
        }
        if (params.dynamicBullets) {
          const firstDisplayedBullet = bullets[firstIndex];
          const lastDisplayedBullet = bullets[lastIndex];
          for (let i = firstIndex; i <= lastIndex; i += 1) {
            if (bullets[i]) {
              bullets[i]!.classList.add(...`${params.bulletActiveClass}-main`.split(' '));
            }
          }

          setSideBullets(firstDisplayedBullet, 'prev');
          setSideBullets(lastDisplayedBullet, 'next');
        }
      }
      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        const bulletsOffset =
          ((bulletSize ?? 0) * dynamicBulletsLength - (bulletSize ?? 0)) / 2 -
          midIndex * (bulletSize ?? 0);
        const offsetProp: 'right' | 'left' = rtl ? 'right' : 'left';
        const positionDim = swiper.isHorizontal() ? offsetProp : 'top';
        bullets.forEach((bullet: HTMLElement) => {
          bullet.style[positionDim] = `${bulletsOffset}px`;
        });
      }
    }
    els.forEach((subEl, subElIndex) => {
      if (params.type === 'fraction') {
        subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
          (fractionEl as HTMLElement).textContent = String(
            params.formatFractionCurrent(current + 1),
          );
        });
        subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
          (totalEl as HTMLElement).textContent = String(params.formatFractionTotal(total));
        });
      }
      if (params.type === 'progressbar') {
        let progressbarDirection: 'horizontal' | 'vertical';
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }
        const scale = (current + 1) / total;
        let scaleX = 1;
        let scaleY = 1;
        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        subEl
          .querySelectorAll<HTMLElement>(classesToSelector(params.progressbarFillClass))
          .forEach((progressEl) => {
            progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
            progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
          });
      }
      if (params.type === 'custom' && params.renderCustom) {
        setInnerHTML(subEl, params.renderCustom(swiper, current + 1, total));
        if (subElIndex === 0) emit('paginationRender', subEl);
      } else {
        if (subElIndex === 0) emit('paginationRender', subEl);
        emit('paginationUpdate', subEl);
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
      }
    });
  }
  function render(): void {
    // Render Container
    const params = getParams();
    if (isPaginationDisabled()) return;
    const gridParams = swiper.params.grid as { rows?: number } | undefined;
    const slidesLength = isVirtualEnabled(swiper)
      ? swiper.virtual.slides.length
      : swiper.grid && gridParams?.rows && gridParams.rows > 1
        ? swiper.slides.length / Math.ceil(gridParams.rows)
        : swiper.slides.length;

    const els = makeElementsArray(swiper.pagination.el as HTMLElement | HTMLElement[]);
    let paginationHTML = '';
    if (params.type === 'bullets') {
      let numberOfBullets = swiper.params.loop
        ? Math.ceil(slidesLength / (swiper.params.slidesPerGroup ?? 1))
        : swiper.snapGrid.length;
      if (swiper.params.freeMode && isFreeModeEnabled(swiper) && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (let i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          // oxfmt-ignore
          paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ''} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML =
          `<span class="${params.currentClass}"></span>` +
          ' / ' +
          `<span class="${params.totalClass}"></span>`;
      }
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }
    }
    swiper.pagination.bullets = [];
    els.forEach((subEl) => {
      if (params.type !== 'custom') {
        setInnerHTML(subEl, paginationHTML || '');
      }
      if (params.type === 'bullets') {
        swiper.pagination.bullets.push(
          ...Array.from(subEl.querySelectorAll<HTMLElement>(classesToSelector(params.bulletClass))),
        );
      }
    });
    if (params.type !== 'custom') {
      emit('paginationRender', els[0]);
    }
  }
  function init(): void {
    swiper.params.pagination = createElementIfNotDefined<PaginationOptions>(
      swiper,
      swiper.originalParams.pagination as PaginationOptions | undefined,
      swiper.params.pagination as PaginationOptions | undefined,
      { el: 'swiper-pagination' },
    );
    const params = getParams();
    if (!params.el) return;
    let el: HTMLElement | HTMLElement[] | null | undefined;
    if (typeof params.el === 'string' && swiper.isElement) {
      el = swiper.el.querySelector(params.el) as HTMLElement | null;
    }
    if (!el && typeof params.el === 'string') {
      el = [...document.querySelectorAll<HTMLElement>(params.el)];
    }
    if (!el) {
      el = params.el as HTMLElement | HTMLElement[] | null | undefined;
    }
    if (!el || (Array.isArray(el) && el.length === 0)) return;

    if (
      swiper.params.uniqueNavElements &&
      typeof params.el === 'string' &&
      Array.isArray(el) &&
      el.length > 1
    ) {
      el = [...swiper.el.querySelectorAll<HTMLElement>(params.el)];
      // check if it belongs to another nested Swiper
      if (el.length > 1) {
        const found = (el as HTMLElement[]).find((subEl) => {
          if (elementParents(subEl, '.swiper')[0] !== swiper.el) return false;
          return true;
        });
        if (found) el = found;
      }
    }
    if (Array.isArray(el) && el.length === 1) el = el[0];

    Object.assign(swiper.pagination, {
      el,
    });

    const els = makeElementsArray(el as HTMLElement | HTMLElement[]);
    els.forEach((subEl) => {
      if (params.type === 'bullets' && params.clickable) {
        subEl.classList.add(...(params.clickableClass || '').split(' '));
      }

      subEl.classList.add(params.modifierClass + params.type);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);

      if (params.type === 'bullets' && params.dynamicBullets) {
        subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
        dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === 'progressbar' && params.progressbarOpposite) {
        subEl.classList.add(params.progressbarOppositeClass);
      }

      if (params.clickable) {
        subEl.addEventListener('click', onBulletClick);
      }

      if (!swiper.enabled) {
        subEl.classList.add(params.lockClass);
      }
    });
  }

  function destroy(): void {
    const params = getParams();
    if (isPaginationDisabled()) return;
    const el = swiper.pagination.el;
    if (el) {
      const els = makeElementsArray(el as HTMLElement | HTMLElement[]);
      els.forEach((subEl) => {
        subEl.classList.remove(params.hiddenClass);
        subEl.classList.remove(params.modifierClass + params.type);
        subEl.classList.remove(
          swiper.isHorizontal() ? params.horizontalClass : params.verticalClass,
        );
        if (params.clickable) {
          subEl.classList.remove(...(params.clickableClass || '').split(' '));
          subEl.removeEventListener('click', onBulletClick);
        }
      });
    }

    if (swiper.pagination.bullets)
      swiper.pagination.bullets.forEach((subEl: HTMLElement) =>
        subEl.classList.remove(...params.bulletActiveClass.split(' ')),
      );
  }

  on('changeDirection', () => {
    if (!swiper.pagination || !swiper.pagination.el) return;
    const params = getParams();
    const els = makeElementsArray(swiper.pagination.el as HTMLElement | HTMLElement[]);
    els.forEach((subEl) => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });

  on('init', () => {
    if (getParams().enabled === false) {
      disable();
    } else {
      init();
      render();
      update();
    }
  });
  on('activeIndexChange', () => {
    if (typeof swiper.snapIndex === 'undefined') {
      update();
    }
  });
  on('snapIndexChange', () => {
    update();
  });
  on('snapGridLengthChange', () => {
    render();
    update();
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    const { el } = swiper.pagination;
    if (el) {
      const params = getParams();
      const els = makeElementsArray(el as HTMLElement | HTMLElement[]);
      els.forEach((subEl) => subEl.classList[swiper.enabled ? 'remove' : 'add'](params.lockClass));
    }
  });
  on('lock unlock', () => {
    update();
  });
  on('click', (_s, e: Event) => {
    const targetEl = e.target as HTMLElement;
    const els = makeElementsArray(swiper.pagination.el as HTMLElement | HTMLElement[]);
    const params = getParams();
    if (
      params.el &&
      params.hideOnClick &&
      els &&
      els.length > 0 &&
      !targetEl.classList.contains(params.bulletClass)
    ) {
      if (
        swiper.navigation &&
        ((swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl) ||
          (swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
      )
        return;
      const isHidden = els[0]!.classList.contains(params.hiddenClass);
      if (isHidden === true) {
        emit('paginationShow');
      } else {
        emit('paginationHide');
      }
      els.forEach((subEl) => subEl.classList.toggle(params.hiddenClass));
    }
  });

  const enable = (): void => {
    const params = getParams();
    swiper.el.classList.remove(params.paginationDisabledClass);
    const { el } = swiper.pagination;
    if (el) {
      const els = makeElementsArray(el as HTMLElement | HTMLElement[]);
      els.forEach((subEl) => subEl.classList.remove(params.paginationDisabledClass));
    }
    init();
    render();
    update();
  };

  const disable = (): void => {
    const params = getParams();
    swiper.el.classList.add(params.paginationDisabledClass);
    const { el } = swiper.pagination;
    if (el) {
      const els = makeElementsArray(el as HTMLElement | HTMLElement[]);
      els.forEach((subEl) => subEl.classList.add(params.paginationDisabledClass));
    }
    destroy();
  };

  Object.assign(swiper.pagination, {
    enable,
    disable,
    render,
    update,
    init,
    destroy,
  });
};

export default Pagination;
