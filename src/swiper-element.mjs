/* eslint-disable spaced-comment */
import Swiper from './swiper.mjs';
import { paramsList } from './components-shared/params-list.mjs';
import { getParams } from './components-shared/get-element-params.mjs';
import {
  needsScrollbar,
  needsNavigation,
  needsPagination,
  attrToProp,
} from './components-shared/utils.mjs';
import { updateSwiper } from './components-shared/update-swiper.mjs';
import { setInnerHTML } from './shared/utils.mjs';

//SWIPER_STYLES
//SWIPER_SLIDE_STYLES

class DummyHTMLElement {}

const ClassToExtend =
  typeof window === 'undefined' || typeof HTMLElement === 'undefined'
    ? DummyHTMLElement
    : HTMLElement;

const addStyle = (shadowRoot, styles) => {
  if (typeof CSSStyleSheet !== 'undefined' && shadowRoot.adoptedStyleSheets) {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    shadowRoot.adoptedStyleSheets = [styleSheet];
  } else {
    const style = document.createElement('style');
    style.rel = 'stylesheet';
    style.textContent = styles;
    shadowRoot.appendChild(style);
  }
};

class SwiperContainer extends ClassToExtend {
  constructor() {
    super();
  }

  cssStyles() {
    return [
      SwiperCSS, // eslint-disable-line
      ...(this.injectStyles && Array.isArray(this.injectStyles) ? this.injectStyles : []),
    ].join('\n');
  }

  cssLinks() {
    return this.injectStylesUrls || [];
  }

  calcSlideSlots() {
    const currentSideSlots = this.slideSlots || 0;
    // slide slots
    const slideSlotChildren = [...this.querySelectorAll(`[slot^=slide-]`)].map((child) => {
      return parseInt(child.getAttribute('slot').split('slide-')[1], 10);
    });
    this.slideSlots = slideSlotChildren.length ? Math.max(...slideSlotChildren) + 1 : 0;
    if (!this.rendered) return;
    if (this.slideSlots > currentSideSlots) {
      for (let i = currentSideSlots; i < this.slideSlots; i += 1) {
        const slideEl = document.createElement('swiper-slide');
        slideEl.setAttribute('part', `slide slide-${i + 1}`);
        const slotEl = document.createElement('slot');
        slotEl.setAttribute('name', `slide-${i + 1}`);
        slideEl.appendChild(slotEl);
        this.shadowRoot.querySelector('.swiper-wrapper').appendChild(slideEl);
      }
    } else if (this.slideSlots < currentSideSlots) {
      const slides = this.swiper.slides;
      for (let i = slides.length - 1; i >= 0; i -= 1) {
        if (i > this.slideSlots) {
          slides[i].remove();
        }
      }
    }
  }

  render() {
    if (this.rendered) return;

    this.calcSlideSlots();

    // local styles
    let localStyles = this.cssStyles();
    if (this.slideSlots > 0) {
      localStyles = localStyles.replace(/::slotted\(([a-z-0-9.]*)\)/g, '$1');
    }
    if (localStyles.length) {
      addStyle(this.shadowRoot, localStyles);
    }

    this.cssLinks().forEach((url) => {
      const linkExists = this.shadowRoot.querySelector(`link[href="${url}"]`);
      if (linkExists) return;
      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = url;
      this.shadowRoot.appendChild(linkEl);
    });
    // prettier-ignore
    const el = document.createElement('div');
    el.classList.add('swiper');
    el.part = 'container';

    // prettier-ignore
    setInnerHTML(el, `
      <slot name="container-start"></slot>
      <div class="swiper-wrapper" part="wrapper">
        <slot></slot>
        ${Array.from({length: this.slideSlots}).map((_, index) => `
        <swiper-slide part="slide slide-${index}">
          <slot name="slide-${index}"></slot>
        </swiper-slide>
        `).join('')}
      </div>
      <slot name="container-end"></slot>
      ${needsNavigation(this.passedParams) ? `
        <div part="button-prev" class="swiper-button-prev"></div>
        <div part="button-next" class="swiper-button-next"></div>
      ` : ''}
      ${needsPagination(this.passedParams) ? `
        <div part="pagination" class="swiper-pagination"></div>
      ` : ''}
      ${needsScrollbar(this.passedParams) ? `
        <div part="scrollbar" class="swiper-scrollbar"></div>
      ` : ''}
    `);
    this.shadowRoot.appendChild(el);
    this.rendered = true;
  }

  initialize() {
    if (this.swiper && this.swiper.initialized) return;

    this.attachShadow({ mode: 'open' });

    const { params: swiperParams, passedParams } = getParams(this);
    this.swiperParams = swiperParams;
    this.passedParams = passedParams;
    delete this.swiperParams.init;

    this.render();

    // eslint-disable-next-line
    this.swiper = new Swiper(this.shadowRoot.querySelector('.swiper'), {
      ...(swiperParams.virtual ? {} : { observer: true }),
      ...swiperParams,
      touchEventsTarget: 'container',
      onAny: (name, ...args) => {
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

  connectedCallback() {
    if (
      this.swiper &&
      this.swiper.initialized &&
      this.nested &&
      this.closest('swiper-slide') &&
      this.closest('swiper-slide').swiperLoopMoveDOM
    ) {
      return;
    }
    if (this.init === false || this.getAttribute('init') === 'false') {
      return;
    }
    this.initialize();
  }

  disconnectedCallback() {
    if (
      this.nested &&
      this.closest('swiper-slide') &&
      this.closest('swiper-slide').swiperLoopMoveDOM
    ) {
      return;
    }
    if (this.swiper && this.swiper.destroy) {
      this.swiper.destroy();
    }
  }

  updateSwiperOnPropChange(propName, propValue) {
    const { params: swiperParams, passedParams } = getParams(this, propName, propValue);
    this.passedParams = passedParams;
    this.swiperParams = swiperParams;
    if (this.swiper && this.swiper.params[propName] === propValue) {
      return;
    }
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
    if (!(this.swiper && this.swiper.initialized)) return;
    if (prevValue === 'true' && newValue === null) {
      newValue = false;
    }
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
    configurable: true,
    get() {
      return (this.passedParams || {})[paramName];
    },
    set(value) {
      if (!this.passedParams) this.passedParams = {};
      this.passedParams[paramName] = value;
      if (!(this.swiper && this.swiper.initialized)) return;
      this.updateSwiperOnPropChange(paramName, value);
    },
  });
});

class SwiperSlide extends ClassToExtend {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  render() {
    const lazy =
      this.lazy || this.getAttribute('lazy') === '' || this.getAttribute('lazy') === 'true';
    addStyle(this.shadowRoot, SwiperSlideCSS);
    this.shadowRoot.appendChild(document.createElement('slot'));
    if (lazy) {
      const lazyDiv = document.createElement('div');
      lazyDiv.classList.add('swiper-lazy-preloader');
      lazyDiv.part.add('preloader');
      this.shadowRoot.appendChild(lazyDiv);
    }
  }

  initialize() {
    this.render();
  }

  connectedCallback() {
    if (this.swiperLoopMoveDOM) {
      return;
    }

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

if (typeof window !== 'undefined') {
  window.SwiperElementRegisterParams = (params) => {
    paramsList.push(...params);
  };
}

//BROWSER_REGISTER

export { SwiperContainer, SwiperSlide, register };
