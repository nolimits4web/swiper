import $ from '../../utils/dom';
import Utils from '../../utils/utils';
import Support from '../../utils/support';

const Scrollbar = {
  isTouched: false,
  timeout: null,
  dragTimeout: null,
  setTranslate() {
    const swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    const { scrollbar, rtl, progress } = swiper;
    const { dragSize, trackSize, $dragEl, $el } = scrollbar;
    const params = swiper.params.scrollbar;

    let newSize = dragSize;
    let newPos = (trackSize - dragSize) * progress;
    if (rtl && swiper.isHorizontal()) {
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
      if (Support.transforms3d) {
        $dragEl.transform(`translate3d(${newPos}px, 0, 0)`);
      } else {
        $dragEl.transform(`translateX(${newPos}px)`);
      }
      $dragEl[0].style.width = `${newSize}px`;
    } else {
      if (Support.transforms3d) {
        $dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);
      } else {
        $dragEl.transform(`translateY(${newPos}px)`);
      }
      $dragEl[0].style.height = `${newSize}px`;
    }
    if (params.hide) {
      clearTimeout(Scrollbar.timeout);
      $el[0].style.opacity = 1;
      Scrollbar.timeout = setTimeout(() => {
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
    if (swiper.params.scrollbarHide) {
      $el[0].style.opacity = 0;
    }
    Utils.extend(scrollbar, {
      trackSize,
      divider,
      moveDivider,
      dragSize,
    });
  },
  setDragPosition(e) {
    const swiper = this;
    const { scrollbar } = swiper;
    const { $el, dragSize, moveDivider } = scrollbar;

    let pointerPosition;
    if (swiper.isHorizontal()) {
      pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX);
    } else {
      pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY);
    }
    let position = (pointerPosition) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragSize / 2);
    const positionMin = -swiper.minTranslate() * moveDivider;
    const positionMax = -swiper.maxTranslate() * moveDivider;
    if (position < positionMin) {
      position = positionMin;
    } else if (position > positionMax) {
      position = positionMax;
    }
    position = -position / moveDivider;
    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    swiper.updateRealIndex();
  },
  onDragStart(e) {
    const swiper = this;
    const params = swiper.params.scrollbar;
    const { scrollbar, $wrapperEl } = swiper;
    const { $el, $dragEl } = scrollbar;
    Scrollbar.isTouched = true;
    e.preventDefault();
    e.stopPropagation();

    scrollbar.setDragPosition(e);
    clearTimeout(Scrollbar.dragTimeout);

    $el.transition(0);
    if (params.hide) {
      $el.css('opacity', 1);
    }
    $wrapperEl.transition(100);
    $dragEl.transition(100);
    swiper.emit('scrollbarDragStart', e);
  },
  onDragMove(e) {
    const swiper = this;
    const { scrollbar, $wrapperEl } = swiper;
    const { $el, $dragEl } = scrollbar;

    if (!Scrollbar.isTouched) return;
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
    const { scrollbar } = swiper;
    const { $el } = scrollbar;

    if (!Scrollbar.isTouched) return;
    Scrollbar.isTouched = false;
    if (params.hide) {
      clearTimeout(Scrollbar.dragTimeout);
      Scrollbar.dragTimeout = Utils.nextTick(() => {
        $el.css('opacity', 0);
        $el.transition(400);
      }, 1000);
    }
    swiper.emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideReset();
    }
  },
  enableDraggable() {
    const swiper = this;
    if (!swiper.params.scrollbar.el) return;
    const { scrollbar } = swiper;
    const $el = scrollbar.$el;
    const target = Support.touch ? $el[0] : document;
    $el.on(Scrollbar.dragEvents.start, Scrollbar.onDragStart.bind(swiper));
    $(target).on(Scrollbar.dragEvents.move, Scrollbar.onDragMove.bind(swiper));
    $(target).on(Scrollbar.dragEvents.end, Scrollbar.onDragEnd.bind(swiper));
  },
  disableDraggable() {
    const swiper = this;
    if (!swiper.params.scrollbar.el) return;
    const { scrollbar } = swiper;
    const $el = scrollbar.$el;
    const target = Support.touch ? $el[0] : document;
    $el.off(Scrollbar.dragEvents.start);
    $(target).off(Scrollbar.dragEvents.move);
    $(target).off(Scrollbar.dragEvents.end);
  },
  init() {
    const swiper = this;
    if (!swiper.params.scrollbar.el) return;
    const { scrollbar, $el: $swiperEl, touchEvents } = swiper;
    const params = swiper.params.scrollbar;

    let $el = $(params.el);
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
      $el = $swiperEl.find(params.el);
    }

    let $dragEl = $el.find('.swiper-scrollbar-drag');
    if ($dragEl.length === 0) {
      $dragEl = $('<div class="swiper-scrollbar-drag"></div>');
      $el.append($dragEl);
    }

    Scrollbar.dragEvents = (function dragEvents() {
      if ((swiper.params.simulateTouch === false && !Support.touch)) {
        return {
          start: 'mousedown',
          move: 'mousemove',
          end: 'mouseup',
        };
      }
      return touchEvents;
    }());

    Utils.extend(scrollbar, {
      $el,
      el: $el[0],
      $dragEl,
      dragEl: $dragEl[0],
    });

    if (params.draggable) {
      scrollbar.enableDraggable();
    }
  },
  destroy() {

  },
};

export default {
  name: 'scrollbar',
  params: {
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: true,
      snapOnRelease: false,
    },
  },
  create() {
    const swiper = this;
    Utils.extend(swiper, {
      scrollbar: {
        init: Scrollbar.init.bind(swiper),
        updateSize: Scrollbar.updateSize.bind(swiper),
        setTranslate: Scrollbar.setTranslate.bind(swiper),
        setTransition: Scrollbar.setTransition.bind(swiper),
        enableDraggable: Scrollbar.enableDraggable.bind(swiper),
        disableDraggable: Scrollbar.disableDraggable.bind(swiper),
        setDragPosition: Scrollbar.setDragPosition.bind(swiper),
      },
    });
  },
  on: {
    init() {
      const swiper = this;
      swiper.scrollbar.init();
      swiper.scrollbar.updateSize();
      swiper.scrollbar.setTranslate();
    },
    setTranslate() {
      const swiper = this;
      swiper.scrollbar.setTranslate();
    },
    setTransition(duration) {
      const swiper = this;
      swiper.scrollbar.setTransition(duration);
    },
    destroy() {
      const swiper = this;
      swiper.scrollbar.destroy();
    },
  },
};
