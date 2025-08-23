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

//SWIPER_STYLES
//SWIPER_SLIDE_STYLES

class DummyHTMLElement {}

const ClassToExtend =
  typeof window === 'undefined' || typeof HTMLElement === 'undefined'
    ? DummyHTMLElement
    : HTMLElement;

const arrowSvg = `<svg viewBox="0 0 40 40"><path stroke="currentColor" fill="none" d="M15 8L25 20L15 32"/></svg>`;

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

const debounce = (func, wait = 50) => {
  let timer = null;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      func(...args);
    }, wait);
  };
};

const setCustomProperties = (swiper) => {
  swiper.hostEl.style.removeProperty('--swiper-slide-size');
  swiper.hostEl.style.removeProperty('--swiper-checked-height');

  const slideSize = swiper.slidesSizesGrid[0];
  let tallestHeight = 0;

  if (typeof slideSize === 'number') {
    swiper.hostEl.style.setProperty('--swiper-slide-size', `${Math.floor(slideSize)}px`);
  }

  const checkHeightSelector = swiper.passedParams?.checkHeight;
  let elementsToCheckHeight = [];

  if (checkHeightSelector) {
    elementsToCheckHeight = Array.from(swiper.hostEl.querySelectorAll(checkHeightSelector));
  }

  if (elementsToCheckHeight.length === 0) {
    return;
  }

  tallestHeight = elementsToCheckHeight.reduce((max, element) => {
    const height = Math.round(element.offsetHeight);
    return Math.max(height, max);
  }, 0);

  if (tallestHeight > 0) {
    swiper.hostEl.style.setProperty('--swiper-checked-height', `${tallestHeight}px`);
  }
};

class SwiperContainer extends ClassToExtend {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  static get nextButtonSvg() {
    return arrowSvg;
  }

  static get prevButtonSvg() {
    return arrowSvg.replace(
      '/></svg>',
      ' transform-origin="center" transform="rotate(180)"/></svg>',
    );
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
    const currentSlideSlots = this.slideSlots || 0;
    // slide slots
    const slideSlotChildren = [...this.querySelectorAll(`[slot^=slide-]`)].map((child) => {
      return parseInt(child.getAttribute('slot').split('slide-')[1], 10);
    });
    this.slideSlots = slideSlotChildren.length ? Math.max(...slideSlotChildren) + 1 : 0;
    if (!this.rendered) return;
    if (this.slideSlots > currentSlideSlots) {
      for (let i = currentSlideSlots; i < this.slideSlots; i += 1) {
        const slideEl = document.createElement('swiper-slide');
        slideEl.setAttribute('part', `slide slide-${i + 1}`);
        const slotEl = document.createElement('slot');
        slotEl.setAttribute('name', `slide-${i + 1}`);
        slideEl.appendChild(slotEl);
        this.shadowRoot.querySelector('.swiper-wrapper').appendChild(slideEl);
      }
    } else if (this.slideSlots < currentSlideSlots) {
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
    el.classList.add('swiper-root');
    el.part = 'root';

    // prettier-ignore
    el.innerHTML = `
      <slot name="container-start"></slot>
      <div class="swiper" part="container">
        <div class="swiper-wrapper" part="wrapper">
          <slot></slot>
          ${Array.from({length: this.slideSlots}).map((_, index) => `
          <swiper-slide part="slide slide-${index}">
            <slot name="slide-${index}"></slot>
          </swiper-slide>
          `).join('')}
        </div>
      </div>
      <slot name="container-end"></slot>
      ${needsNavigation(this.passedParams) ? `
        <div part="button-prev" class="swiper-button-prev">${this.constructor.prevButtonSvg}</div>
        <div part="button-next" class="swiper-button-next">${this.constructor.nextButtonSvg}</div>
      ` : ''}
      ${needsPagination(this.passedParams) ? `
        <div part="pagination" class="swiper-pagination"></div>
      ` : ''}
      ${needsScrollbar(this.passedParams) ? `
        <div part="scrollbar" class="swiper-scrollbar"></div>
      ` : ''}
    `;
    this.shadowRoot.appendChild(el);
    this.rendered = true;
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;
    const { params: swiperParams, passedParams } = getParams(this);
    if (passedParams.pagination) {
      swiperParams.pagination = {
        el: '.swiper-pagination',
        type: passedParams.pagination.type || 'progressbar',
        clickable: passedParams.pagination.clickable ?? passedParams.pagination.type === 'bullets',
        enabled: true,
      };
    }
    if (passedParams.loop) {
      swiperParams.watchSlidesProgress = true;
    }
    this.swiperParams = swiperParams;
    this.passedParams = passedParams;
    delete this.swiperParams.init;

    this.render();

    const debouncedSetCustomProperties = debounce(setCustomProperties);

    // eslint-disable-next-line
    this.swiper = new Swiper(this.shadowRoot.querySelector('.swiper'), {
      ...(swiperParams.virtual ? {} : { observer: true }),
      ...swiperParams,
      touchEventsTarget: 'container',
      onAny: (name, ...args) => {
        if (name === 'observerUpdate') {
          this.calcSlideSlots();
        }
        // CUSTOM: set --swiper-slide-size property
        if (name === 'afterInit' || name === 'resize' || name === 'update') {
          const [swiper] = args;

          debouncedSetCustomProperties(swiper);
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
      this.initialized &&
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
    this.initialized = false;
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
    if (!this.initialized) return;
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
      if (!this.initialized) return;
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
