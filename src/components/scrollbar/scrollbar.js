import { getDocument } from 'ssr-window';
import $ from '../../utils/dom';
import { extend, nextTick, bindModuleMethods, createElementIfNotDefined } from '../../utils/utils';

const Scrollbar = {
  setTranslate() {
    const swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    const { scrollbar, rtlTranslate: rtl, progress } = swiper;
    const { dragSize, trackSize, $dragEl, $el } = scrollbar;
    const params = swiper.params.scrollbar;

    let newSize = dragSize;
    let newPos = (trackSize - dragSize) * progress;
    if (rtl) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      $dragEl.transform(`translate3d(${newPos}px, 0, 0)`);
      $dragEl[0].style.width = `${newSize}px`;
    } else {
      $dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);
      $dragEl[0].style.height = `${newSize}px`;
    }
    if (params.hide) {
      clearTimeout(swiper.scrollbar.timeout);
      $el[0].style.opacity = 1;
      swiper.scrollbar.timeout = setTimeout(() => {
        $el[0].style.opacity = 0;
        $el.transition(400);
      }, 1000);
    }
  },
  setTransition(duration) {
    const swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    swiper.scrollbar.$dragEl.transition(duration);
  },
  updateSize() {
    const swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;

    const { scrollbar } = swiper;
    const { $dragEl, $el } = scrollbar;

    $dragEl[0].style.width = '';
    $dragEl[0].style.height = '';
    const trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

    const divider = swiper.size / swiper.virtualSize;
    const moveDivider = divider * (trackSize / swiper.size);
    let dragSize;
    if (swiper.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
    }

    if (swiper.isHorizontal()) {
      $dragEl[0].style.width = `${dragSize}px`;
    } else {
      $dragEl[0].style.height = `${dragSize}px`;
    }

    if (divider >= 1) {
      $el[0].style.display = 'none';
    } else {
      $el[0].style.display = '';
    }
    if (swiper.params.scrollbar.hide) {
      $el[0].style.opacity = 0;
    }
    extend(scrollbar, {
      trackSize,
      divider,
      moveDivider,
      dragSize,
    });
    if (swiper.params.watchOverflow && swiper.enabled) {
      scrollbar.$el[swiper.isLocked ? 'addClass' : 'removeClass'](
        swiper.params.scrollbar.lockClass,
      );
    }
  },
  getPointerPosition(e) {
    const swiper = this;
    if (swiper.isHorizontal()) {
      return e.type === 'touchstart' || e.type === 'touchmove'
        ? e.targetTouches[0].clientX
        : e.clientX;
    }
    return e.type === 'touchstart' || e.type === 'touchmove'
      ? e.targetTouches[0].clientY
      : e.clientY;
  },
  setDragPosition(e) {
    const swiper = this;
    const { scrollbar, rtlTranslate: rtl } = swiper;
    const { $el, dragSize, trackSize, dragStartPos } = scrollbar;

    let positionRatio;
    positionRatio =
      (scrollbar.getPointerPosition(e) -
        $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] -
        (dragStartPos !== null ? dragStartPos : dragSize / 2)) /
      (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (rtl) {
      positionRatio = 1 - positionRatio;
    }

    const position =
      swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;

    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  },
  onDragStart(e) {
    const swiper = this;
    const params = swiper.params.scrollbar;
    const { scrollbar, $wrapperEl } = swiper;
    const { $el, $dragEl } = scrollbar;
    swiper.scrollbar.isTouched = true;
    swiper.scrollbar.dragStartPos =
      e.target === $dragEl[0] || e.target === $dragEl
        ? scrollbar.getPointerPosition(e) -
          e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top']
        : null;
    e.preventDefault();
    e.stopPropagation();

    $wrapperEl.transition(100);
    $dragEl.transition(100);
    scrollbar.setDragPosition(e);

    clearTimeout(swiper.scrollbar.dragTimeout);

    $el.transition(0);
    if (params.hide) {
      $el.css('opacity', 1);
    }
    if (swiper.params.cssMode) {
      swiper.$wrapperEl.css('scroll-snap-type', 'none');
    }
    swiper.emit('scrollbarDragStart', e);
  },
  onDragMove(e) {
    const swiper = this;
    const { scrollbar, $wrapperEl } = swiper;
    const { $el, $dragEl } = scrollbar;

    if (!swiper.scrollbar.isTouched) return;
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
    scrollbar.setDragPosition(e);
    $wrapperEl.transition(0);
    $el.transition(0);
    $dragEl.transition(0);
    swiper.emit('scrollbarDragMove', e);
  },
  onDragEnd(e) {
    const swiper = this;

    const params = swiper.params.scrollbar;
    const { scrollbar, $wrapperEl } = swiper;
    const { $el } = scrollbar;

    if (!swiper.scrollbar.isTouched) return;
    swiper.scrollbar.isTouched = false;
    if (swiper.params.cssMode) {
      swiper.$wrapperEl.css('scroll-snap-type', '');
      $wrapperEl.transition('');
    }
    if (params.hide) {
      clearTimeout(swiper.scrollbar.dragTimeout);
      swiper.scrollbar.dragTimeout = nextTick(() => {
        $el.css('opacity', 0);
        $el.transition(400);
      }, 1000);
    }
    swiper.emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideToClosest();
    }
  },
  enableDraggable() {
    const swiper = this;
    if (!swiper.params.scrollbar.el) return;
    const document = getDocument();
    const { scrollbar, touchEventsTouch, touchEventsDesktop, params, support } = swiper;
    const $el = scrollbar.$el;
    const target = $el[0];
    const activeListener =
      support.passiveListener && params.passiveListeners
        ? { passive: false, capture: false }
        : false;
    const passiveListener =
      support.passiveListener && params.passiveListeners
        ? { passive: true, capture: false }
        : false;
    if (!target) return;
    if (!support.touch) {
      target.addEventListener(
        touchEventsDesktop.start,
        swiper.scrollbar.onDragStart,
        activeListener,
      );
      document.addEventListener(
        touchEventsDesktop.move,
        swiper.scrollbar.onDragMove,
        activeListener,
      );
      document.addEventListener(
        touchEventsDesktop.end,
        swiper.scrollbar.onDragEnd,
        passiveListener,
      );
    } else {
      target.addEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
      target.addEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
      target.addEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
    }
  },
  disableDraggable() {
    const swiper = this;
    if (!swiper.params.scrollbar.el) return;
    const document = getDocument();
    const { scrollbar, touchEventsTouch, touchEventsDesktop, params, support } = swiper;
    const $el = scrollbar.$el;
    const target = $el[0];
    const activeListener =
      support.passiveListener && params.passiveListeners
        ? { passive: false, capture: false }
        : false;
    const passiveListener =
      support.passiveListener && params.passiveListeners
        ? { passive: true, capture: false }
        : false;
    if (!target) return;
    if (!support.touch) {
      target.removeEventListener(
        touchEventsDesktop.start,
        swiper.scrollbar.onDragStart,
        activeListener,
      );
      document.removeEventListener(
        touchEventsDesktop.move,
        swiper.scrollbar.onDragMove,
        activeListener,
      );
      document.removeEventListener(
        touchEventsDesktop.end,
        swiper.scrollbar.onDragEnd,
        passiveListener,
      );
    } else {
      target.removeEventListener(
        touchEventsTouch.start,
        swiper.scrollbar.onDragStart,
        activeListener,
      );
      target.removeEventListener(
        touchEventsTouch.move,
        swiper.scrollbar.onDragMove,
        activeListener,
      );
      target.removeEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
    }
  },
  init() {
    const swiper = this;
    const { scrollbar, $el: $swiperEl } = swiper;
    swiper.params.scrollbar = createElementIfNotDefined(
      $swiperEl,
      swiper.params.scrollbar,
      swiper.params.createElements,
      { el: 'swiper-scrollbar' },
    );
    const params = swiper.params.scrollbar;
    if (!params.el) return;

    let $el = $(params.el);
    if (
      swiper.params.uniqueNavElements &&
      typeof params.el === 'string' &&
      $el.length > 1 &&
      $swiperEl.find(params.el).length === 1
    ) {
      $el = $swiperEl.find(params.el);
    }

    let $dragEl = $el.find(`.${swiper.params.scrollbar.dragClass}`);
    if ($dragEl.length === 0) {
      $dragEl = $(`<div class="${swiper.params.scrollbar.dragClass}"></div>`);
      $el.append($dragEl);
    }

    extend(scrollbar, {
      $el,
      el: $el[0],
      $dragEl,
      dragEl: $dragEl[0],
    });

    if (params.draggable) {
      scrollbar.enableDraggable();
    }

    if ($el) {
      $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
    }
  },
  destroy() {
    const swiper = this;
    swiper.scrollbar.disableDraggable();
  },
};

export default {
  name: 'scrollbar',
  params: {
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag',
    },
  },
  create() {
    const swiper = this;
    bindModuleMethods(swiper, {
      scrollbar: {
        isTouched: false,
        timeout: null,
        dragTimeout: null,
        ...Scrollbar,
      },
    });
  },
  on: {
    init(swiper) {
      swiper.scrollbar.init();
      swiper.scrollbar.updateSize();
      swiper.scrollbar.setTranslate();
    },
    update(swiper) {
      swiper.scrollbar.updateSize();
    },
    resize(swiper) {
      swiper.scrollbar.updateSize();
    },
    observerUpdate(swiper) {
      swiper.scrollbar.updateSize();
    },
    setTranslate(swiper) {
      swiper.scrollbar.setTranslate();
    },
    setTransition(swiper, duration) {
      swiper.scrollbar.setTransition(duration);
    },
    'enable disable': (swiper) => {
      const { $el } = swiper.scrollbar;
      if ($el) {
        $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
      }
    },
    destroy(swiper) {
      swiper.scrollbar.destroy();
    },
  },
};
