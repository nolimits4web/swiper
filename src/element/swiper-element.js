/* eslint-disable spaced-comment */
//IMPORT_SWIPER
import { paramsList } from '../components-shared/params-list.js';
import { getParams } from './get-params.js';
import {
  needsScrollbar,
  needsNavigation,
  needsPagination,
  attrToProp,
} from '../components-shared/utils.js';
import { updateSwiper } from '../components-shared/update-swiper.js';

//SWIPER_STYLES

let globalInjectStyles = true;

const addGlobalStyles = (preInit, swiper) => {
  let globalStyles = document.querySelector('style#swiper-element-styles');
  const shouldOverwrite = globalStyles && globalStyles.preInit && !preInit;
  if (!preInit && swiper) {
    swiper.cssLinks().forEach((url) => {
      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = url;
      document.head.prepend(linkEl);
    });
  }
  if (!globalStyles || shouldOverwrite) {
    globalStyles = globalStyles || document.createElement('style');
    globalStyles.textContent = [SwiperFontCSS, swiper ? swiper.cssStyles() : ''].join('\n'); // eslint-disable-line
    globalStyles.id = 'swiper-element-styles';
    globalStyles.preInit = preInit;
    document.head.prepend(globalStyles);
  }
};

class DummyHTMLElement {}

const ClassToExtend =
  typeof window === 'undefined' || typeof HTMLElement === 'undefined'
    ? DummyHTMLElement
    : HTMLElement;

class SwiperContainer extends ClassToExtend {
  constructor() {
    super();

    this.tempDiv = document.createElement('div');
    this.shadowEl = this.attachShadow({ mode: 'open' });
  }

  cssStyles() {
    return [
      globalInjectStyles ? SwiperCSS : '', // eslint-disable-line
      ...(this.injectStyles && Array.isArray(this.injectStyles) ? this.injectStyles : []),
    ].join('\n');
  }

  cssLinks() {
    return this.injectStylesUrls || [];
  }

  render() {
    if (globalInjectStyles) {
      // global styles
      addGlobalStyles(false, this);
    }

    // local styles
    const localStyles = this.cssStyles();
    if (localStyles.length) {
      this.stylesEl = document.createElement('style');
      this.stylesEl.textContent = localStyles;
      this.shadowEl.appendChild(this.stylesEl);
    }

    this.cssLinks().forEach((url) => {
      const linkExists = document.querySelector(`link[href="${url}"]`);
      if (linkExists) return;
      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = url;
      this.shadowEl.appendChild(linkEl);
    });
    // prettier-ignore
    this.tempDiv.innerHTML = `
      <slot name="container-start"></slot>
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
      <slot name="container-end"></slot>
      ${needsNavigation(this.passedParams) ? `
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      ` : ''}
      ${needsPagination(this.passedParams) ? `
        <div class="swiper-pagination"></div>
      ` : '' }
      ${needsScrollbar(this.passedParams) ? `
        <div class="swiper-scrollbar"></div>
      ` : '' }
    `;
    [...this.tempDiv.children].forEach((el) => {
      this.shadowEl.appendChild(el);
    });
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;
    const { params: swiperParams, passedParams } = getParams(this);
    this.swiperParams = swiperParams;
    this.passedParams = passedParams;
    delete this.swiperParams.init;

    this.render();
    // eslint-disable-next-line
    this.swiper = new Swiper(this, {
      ...swiperParams,
      touchEventsTarget: 'container',
      ...(swiperParams.virtual ? {} : { observer: true }),
      onAny: (name, ...args) => {
        const event = new CustomEvent(name.toLowerCase(), {
          detail: args,
          bubbles: true,
          cancelable: true,
        });
        this.dispatchEvent(event);
      },
    });
  }

  connectedCallback() {
    if (this.init === false || this.getAttribute('init') === 'false') {
      addGlobalStyles(true, this);
      return;
    }
    this.initialize();
  }

  disconnectedCallback() {
    if (this.swiper && this.swiper.destroy) {
      this.swiper.destroy();
    }
  }

  updateSwiperOnPropChange(propName) {
    const { params: swiperParams, passedParams } = getParams(this);
    this.passedParams = passedParams;
    this.swiperParams = swiperParams;

    updateSwiper({
      swiper: this.swiper,
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

  attributeChangedCallback(attr, prevValue, newValue) {
    if (!this.initialized) return;
    this.updateSwiperOnPropChange(attr, newValue);
  }

  static get observedAttributes() {
    const attrs = paramsList
      .filter((param) => param.includes('_'))
      .map((param) =>
        param
          .replace(/[A-Z]/g, (v) => `-${v}`)
          .replace('_', '')
          .toLowerCase(),
      );
    return attrs;
  }
}

paramsList.forEach((paramName) => {
  if (paramName === 'init') return;
  paramName = paramName.replace('_', '');
  Object.defineProperty(SwiperContainer.prototype, paramName, {
    get() {
      return (this.passedParams || {})[paramName];
    },
    set(value) {
      if (!this.passedParams) this.passedParams = {};
      this.passedParams[paramName] = value;
      if (!this.initialized) return;
      this.updateSwiperOnPropChange(paramName, value);
    },
  });
});

class SwiperSlide extends ClassToExtend {
  constructor() {
    super();

    this.tempDiv = document.createElement('div');
    this.shadowEl = this.attachShadow({ mode: 'open' });
  }

  render() {
    const lazy =
      this.lazy || this.getAttribute('lazy') === '' || this.getAttribute('lazy') === 'true';

    this.tempDiv.innerHTML = `<slot />`;

    [...this.tempDiv.children].forEach((el) => {
      this.shadowEl.appendChild(el);
    });

    if (lazy) {
      const lazyDiv = document.createElement('div');
      lazyDiv.classList.add('swiper-lazy-preloader');
      this.appendChild(lazyDiv);
    }
  }

  initialize() {
    this.render();
  }

  connectedCallback() {
    this.initialize();
  }
}

// eslint-disable-next-line
const register = (injectStyles = true) => {
  if (typeof window === 'undefined') return;
  if (!injectStyles) {
    globalInjectStyles = false;
  }
  if (globalInjectStyles) {
    addGlobalStyles(true);
  }
  if (!window.customElements.get('swiper-container'))
    window.customElements.define('swiper-container', SwiperContainer);
  if (!window.customElements.get('swiper-slide'))
    window.customElements.define('swiper-slide', SwiperSlide);
};

if (typeof window !== 'undefined') {
  window.SwiperElementRegisterParams = (params) => {
    paramsList.push(...params);
  };
}

//BROWSER_REGISTER

//EXPORT
