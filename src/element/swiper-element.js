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

class SwiperContainer extends HTMLElement {
  constructor() {
    super();

    this.tempDiv = document.createElement('div');
    this.shadowEl = this.attachShadow({ mode: 'open' });
  }

  cssStyles() {
    return [
      SwiperCSS, // eslint-disable-line
      ...(this.modulesStyles && Array.isArray(this.modulesStyles) ? this.modulesStyles : []),
    ].join('\n');
  }

  render() {
    // global styles
    let globalStyles = document.querySelector('link#swiper-element-styles');
    if (!globalStyles) {
      globalStyles = document.createElement('style');
      globalStyles.textContent = [SwiperFontCSS, this.cssStyles()].join('\n'); // eslint-disable-line
      globalStyles.id = 'swiper-element-styles';
      document.head.prepend(globalStyles);
    }
    // local styles
    this.stylesEl = document.createElement('style');
    this.stylesEl.textContent = this.cssStyles();
    this.shadowEl.appendChild(this.stylesEl);
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
    const { params: swiperParams, passedParams } = getParams(this);
    this.swiperParams = swiperParams;
    this.passedParams = passedParams;
    delete this.swiperParams.init;

    this.render();
    // eslint-disable-next-line
    this.swiper = new Swiper(this, {
      ...swiperParams,
      touchEventsTarget: 'container',
      observer: true,
      onAny: (name, ...args) => {
        const event = new CustomEvent(name.toLowerCase(), {
          detail: args,
          bubbles: true,
          cancelable: true,
        });
        this.dispatchEvent(event);
      },
    });

    this.initialized = true;
  }

  connectedCallback() {
    if (this.init === false || this.getAttribute('init') === 'false') return;
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

class SwiperSlide extends HTMLElement {
  constructor() {
    super();

    this.tempDiv = document.createElement('div');
    this.shadowEl = this.attachShadow({ mode: 'open' });
  }

  initialize() {
    this.tempDiv.innerHTML = `
      <slot />
    `;
    [...this.tempDiv.children].forEach((el) => {
      this.shadowEl.appendChild(el);
    });
  }

  connectedCallback() {
    this.initialize();
  }
}

// eslint-disable-next-line
const register = () => {
  if (typeof window === 'undefined') return;
  if (!window.customElements.get('swiper-container'))
    window.customElements.define('swiper-container', SwiperContainer);
  if (!window.customElements.get('swiper-slide'))
    window.customElements.define('swiper-slide', SwiperSlide);
};

//BROWSER_REGISTER

//EXPORT
