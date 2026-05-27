/* eslint-disable spaced-comment */
import Swiper from './swiper';
import { paramsList } from './components-shared/params-list';
import { getParams } from './components-shared/get-element-params';
import {
  attrToProp,
  needsNavigation,
  needsPagination,
  needsScrollbar,
} from './components-shared/utils';
import { updateSwiper } from './components-shared/update-swiper';
import { setInnerHTML } from './shared/utils';
import type { Swiper as SwiperClass, SwiperOptions } from './core/core';

// CSS strings injected at build time. The sentinel string literals below are
// replaced by scripts/build-modules.js after rollup emits the .mjs file.
// Real `const` statements are used (rather than the `//SWIPER_STYLES` comment
// markers used pre-v14) because the TS+rollup pipeline strips standalone
// comments — only a real statement survives compilation.
const SwiperCSS = '__SWIPER_STYLES__';
const SwiperSlideCSS = '__SWIPER_SLIDE_STYLES__';

interface SwiperSlideLoopElement extends HTMLElement {
  swiperLoopMoveDOM?: boolean;
}

declare global {
  interface Window {
    SwiperElementRegisterParams?: (params: string[]) => void;
  }
}

class DummyHTMLElement {}

const ClassToExtend = (typeof window === 'undefined' || typeof HTMLElement === 'undefined'
  ? DummyHTMLElement
  : HTMLElement) as unknown as typeof HTMLElement;

interface PartAware extends HTMLElement {
  part: DOMTokenList;
}

const addStyle = (shadowRoot: ShadowRoot, styles: string): void => {
  if (typeof CSSStyleSheet !== 'undefined' && shadowRoot.adoptedStyleSheets) {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    shadowRoot.adoptedStyleSheets = [styleSheet];
  } else {
    const style = document.createElement('style');
    style.textContent = styles;
    shadowRoot.appendChild(style);
  }
};

class SwiperContainer extends ClassToExtend {
  swiper?: SwiperClass;
  swiperParams: SwiperOptions = {};
  passedParams: Record<string, unknown> = {};
  injectStyles?: string[];
  injectStylesUrls?: string[];
  slideSlots: number = 0;
  rendered?: boolean;
  nested?: boolean;
  init?: boolean;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  cssStyles(): string {
    return [
      SwiperCSS,
      ...(this.injectStyles && Array.isArray(this.injectStyles) ? this.injectStyles : []),
    ].join('\n');
  }

  cssLinks(): string[] {
    return this.injectStylesUrls || [];
  }

  calcSlideSlots(): void {
    const currentSideSlots = this.slideSlots || 0;
    const slideSlotChildren = [...this.querySelectorAll(`[slot^=slide-]`)].map((child) =>
      parseInt(child.getAttribute('slot')!.split('slide-')[1]!, 10),
    );
    this.slideSlots = slideSlotChildren.length ? Math.max(...slideSlotChildren) + 1 : 0;
    if (!this.rendered) return;
    if (this.slideSlots > currentSideSlots) {
      for (let i = currentSideSlots; i < this.slideSlots; i += 1) {
        const slideEl = document.createElement('swiper-slide') as PartAware;
        slideEl.setAttribute('part', `slide slide-${i + 1}`);
        const slotEl = document.createElement('slot');
        slotEl.setAttribute('name', `slide-${i + 1}`);
        slideEl.appendChild(slotEl);
        this.shadowRoot!.querySelector('.swiper-wrapper')!.appendChild(slideEl);
      }
    } else if (this.slideSlots < currentSideSlots) {
      const slides = this.swiper!.slides;
      for (let i = slides.length - 1; i >= 0; i -= 1) {
        if (i > this.slideSlots) {
          slides[i]!.remove();
        }
      }
    }
  }

  render(): void {
    if (this.rendered) return;

    this.calcSlideSlots();

    let localStyles = this.cssStyles();
    if (this.slideSlots > 0) {
      localStyles = localStyles.replace(/::slotted\(([a-z-0-9.]*)\)/g, '$1');
    }
    if (localStyles.length) {
      addStyle(this.shadowRoot!, localStyles);
    }

    this.cssLinks().forEach((url) => {
      const linkExists = this.shadowRoot!.querySelector(`link[href="${url}"]`);
      if (linkExists) return;
      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = url;
      this.shadowRoot!.appendChild(linkEl);
    });

    const el = document.createElement('div') as PartAware;
    el.classList.add('swiper');
    el.part.add('container');

    setInnerHTML(
      el,
      `
      <slot name="container-start"></slot>
      <div class="swiper-wrapper" part="wrapper">
        <slot></slot>
        ${Array.from({ length: this.slideSlots })
          .map(
            (_, index) => `
        <swiper-slide part="slide slide-${index}">
          <slot name="slide-${index}"></slot>
        </swiper-slide>
        `,
          )
          .join('')}
      </div>
      <slot name="container-end"></slot>
      ${
        needsNavigation(this.passedParams)
          ? `
        <div part="button-prev" class="swiper-button-prev"><slot name="button-prev"></slot></div>
        <div part="button-next" class="swiper-button-next"><slot name="button-next"></slot></div>
      `
          : ''
      }
      ${
        needsPagination(this.passedParams)
          ? `
        <div part="pagination" class="swiper-pagination"></div>
      `
          : ''
      }
      ${
        needsScrollbar(this.passedParams)
          ? `
        <div part="scrollbar" class="swiper-scrollbar"></div>
      `
          : ''
      }
    `,
    );
    this.shadowRoot!.appendChild(el);
    this.rendered = true;
  }

  initialize(): void {
    if (this.swiper && this.swiper.initialized) return;
    const { params: swiperParams, passedParams } = getParams(
      this as unknown as Element & Record<string, unknown>,
    );
    this.swiperParams = swiperParams;
    this.passedParams = passedParams;
    delete this.swiperParams.init;

    this.render();

    this.swiper = new Swiper(this.shadowRoot!.querySelector('.swiper') as HTMLElement, {
      ...(swiperParams.virtual ? {} : { observer: true }),
      ...swiperParams,
      touchEventsTarget: 'container',
      onAny: (name: string, ...args: unknown[]) => {
        if (name === 'observerUpdate') {
          this.calcSlideSlots();
        }
        const eventName = swiperParams.eventsPrefix
          ? `${swiperParams.eventsPrefix}${name.toLowerCase()}`
          : name.toLowerCase();
        const event = new CustomEvent(eventName, {
          detail: args,
          bubbles: name !== 'hashChange',
          cancelable: true,
        });
        this.dispatchEvent(event);
      },
    });
  }

  connectedCallback(): void {
    const slideParent = this.closest('swiper-slide') as SwiperSlideLoopElement | null;
    if (
      this.swiper &&
      this.swiper.initialized &&
      this.nested &&
      slideParent &&
      slideParent.swiperLoopMoveDOM
    ) {
      return;
    }
    if (this.init === false || this.getAttribute('init') === 'false') {
      return;
    }
    this.initialize();
  }

  disconnectedCallback(): void {
    const slideParent = this.closest('swiper-slide') as SwiperSlideLoopElement | null;
    if (this.nested && slideParent && slideParent.swiperLoopMoveDOM) {
      return;
    }
    if (this.swiper && this.swiper.destroy) {
      this.swiper.destroy();
    }
  }

  updateSwiperOnPropChange(propName: string, propValue: unknown): void {
    const { params: swiperParams, passedParams } = getParams(
      this as unknown as Element & Record<string, unknown>,
      propName,
      propValue,
    );
    this.passedParams = passedParams;
    this.swiperParams = swiperParams;
    if (this.swiper && (this.swiper.params as Record<string, unknown>)[propName] === propValue) {
      return;
    }
    updateSwiper({
      swiper: this.swiper!,
      passedParams: this.passedParams,
      changedParams: [attrToProp(propName)],
      ...(propName === 'navigation' && passedParams[propName]
        ? {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }
        : {}),
      ...(propName === 'pagination' && passedParams[propName]
        ? {
            paginationEl: '.swiper-pagination',
          }
        : {}),
      ...(propName === 'scrollbar' && passedParams[propName]
        ? {
            scrollbarEl: '.swiper-scrollbar',
          }
        : {}),
    });
  }

  attributeChangedCallback(attr: string, prevValue: string | null, newValue: string | null): void {
    if (!(this.swiper && this.swiper.initialized)) return;
    let nextValue: string | boolean | null = newValue;
    if (prevValue === 'true' && newValue === null) {
      nextValue = false;
    }
    this.updateSwiperOnPropChange(attr, nextValue);
  }

  static get observedAttributes(): string[] {
    return paramsList
      .filter((param) => param.includes('_'))
      .map((param) =>
        param
          .replace(/[A-Z]/g, (v) => `-${v}`)
          .replace('_', '')
          .toLowerCase(),
      );
  }
}

paramsList.forEach((rawName) => {
  if (rawName === 'init') return;
  const paramName = rawName.replace('_', '');
  Object.defineProperty(SwiperContainer.prototype, paramName, {
    configurable: true,
    get(this: SwiperContainer) {
      return (this.passedParams || {})[paramName];
    },
    set(this: SwiperContainer, value: unknown) {
      if (!this.passedParams) this.passedParams = {};
      this.passedParams[paramName] = value;
      if (!(this.swiper && this.swiper.initialized)) return;
      this.updateSwiperOnPropChange(paramName, value);
    },
  });
});

class SwiperSlide extends ClassToExtend {
  lazy?: boolean;
  swiperLoopMoveDOM?: boolean;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  render(): void {
    const lazy =
      this.lazy || this.getAttribute('lazy') === '' || this.getAttribute('lazy') === 'true';
    addStyle(this.shadowRoot!, SwiperSlideCSS);
    this.shadowRoot!.appendChild(document.createElement('slot'));
    if (lazy) {
      const lazyDiv = document.createElement('div') as PartAware;
      lazyDiv.classList.add('swiper-lazy-preloader');
      lazyDiv.part.add('preloader');
      this.shadowRoot!.appendChild(lazyDiv);
    }
  }

  initialize(): void {
    this.render();
  }

  connectedCallback(): void {
    if (this.swiperLoopMoveDOM) {
      return;
    }
    this.initialize();
  }
}

const register = (): void => {
  if (typeof window === 'undefined') return;
  if (!window.customElements.get('swiper-container'))
    window.customElements.define('swiper-container', SwiperContainer);
  if (!window.customElements.get('swiper-slide'))
    window.customElements.define('swiper-slide', SwiperSlide);
};

if (typeof window !== 'undefined') {
  window.SwiperElementRegisterParams = (params: string[]): void => {
    paramsList.push(...params);
  };
}

//BROWSER_REGISTER

export { SwiperContainer, SwiperSlide, register };
