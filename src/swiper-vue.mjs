import { h, ref, onMounted, onUpdated, onBeforeUnmount, watch, nextTick } from 'vue';
import { register } from './swiper-element.mjs';
import { getParams } from './components-shared/get-params.mjs';

const stringProps =
  'eventsPrefix direction touchEventsTarget focusableElements userAgent url effect noSwipingClass noSwipingSelector containerModifierClass slideClass slideActiveClass slideVisibleClass slideNextClass slidePrevClass wrapperClass lazyPreloaderClass'
    .split(' ')
    .reduce((a, v) => ({ ...a, [v]: { type: String, default: undefined } }), {});
const booleanProps =
  'init oneWayMovement cssMode updateOnWindowResize resizeObserver nested preventInteractionOnTransition autoHeight setWrapperSize virtualTranslate slidesPerGroupAuto centeredSlides centeredSlidesBounds normalizeSlideIndex centerInsufficientSlides watchOverflow roundLengths simulateTouch shortSwipes longSwipes followFinger allowTouchMove touchMoveStopPropagation touchStartPreventDefault touchStartForcePreventDefault touchReleaseOnEdges uniqueNavElements resistance watchSlidesProgress grabCursor preventClicks preventClicksPropagation slideToClickedSlide loop loopPreventsSliding rewind allowSlidePrev allowSlideNext swipeHandler noSwiping passiveListeners runCallbacksOnInit observer observeParents observeSlideChildren enabled'
    .split(' ')
    .reduce((a, v) => ({ ...a, [v]: { type: Boolean, default: undefined } }), {});
const numberProps =
  'initialSlide speed width height edgeSwipeThreshold maxBackfaceHiddenSlides slidesPerGroup slidesPerGroupSkip slidesOffsetBefore slidesOffsetAfter touchRatio touchAngle longSwipesRatio longSwipesMs threshold resistanceRatio loopedSlides lazyPreloadPrevNext'
    .split(' ')
    .reduce((a, v) => ({ ...a, [v]: { type: Number, default: undefined } }), {});

const Swiper = {
  name: 'Swiper',
  props: {
    ...stringProps,
    ...booleanProps,
    ...numberProps,
    modules: { type: Array, default: undefined },

    edgeSwipeDetection: { type: [Boolean, String], default: undefined },

    breakpoints: { type: Object, default: undefined },
    spaceBetween: { type: [Number, String], default: undefined },
    slidesPerView: { type: [Number, String], default: undefined },

    a11y: { type: [Boolean, Object], default: undefined },
    autoplay: { type: [Boolean, Object], default: undefined },
    controller: { type: Object, default: undefined },
    coverflowEffect: { type: Object, default: undefined },
    cubeEffect: { type: Object, default: undefined },
    fadeEffect: { type: Object, default: undefined },
    flipEffect: { type: Object, default: undefined },
    creativeEffect: { type: Object, default: undefined },
    cardsEffect: { type: Object, default: undefined },
    hashNavigation: { type: [Boolean, Object], default: undefined },
    history: { type: [Boolean, Object], default: undefined },
    keyboard: { type: [Boolean, Object], default: undefined },
    mousewheel: { type: [Boolean, Object], default: undefined },
    navigation: { type: [Boolean, Object], default: undefined },
    pagination: { type: [Boolean, Object], default: undefined },
    parallax: { type: [Boolean, Object], default: undefined },
    scrollbar: { type: [Boolean, Object], default: undefined },
    thumbs: { type: Object, default: undefined },
    virtual: { type: [Boolean, Object], default: undefined },
    zoom: { type: [Boolean, Object], default: undefined },
    grid: { type: [Object], default: undefined },
    freeMode: { type: [Boolean, Object], default: undefined },
  },
  emits: [
    '_beforeBreakpoint',
    '_containerClasses',
    '_slideClass',
    '_slideClasses',
    '_swiper',
    '_freeModeNoMomentumRelease',
    'activeIndexChange',
    'afterInit',
    'autoplay',
    'autoplayStart',
    'autoplayStop',
    'autoplayPause',
    'autoplayResume',
    'autoplayTimeLeft',
    'beforeDestroy',
    'beforeInit',
    'beforeLoopFix',
    'beforeResize',
    'beforeSlideChangeStart',
    'beforeTransitionStart',
    'breakpoint',
    'breakpointsBase',
    'changeDirection',
    'click',
    'disable',
    'doubleTap',
    'doubleClick',
    'destroy',
    'enable',
    'fromEdge',
    'hashChange',
    'hashSet',
    'init',
    'keyPress',
    'lock',
    'loopFix',
    'momentumBounce',
    'navigationHide',
    'navigationShow',
    'navigationPrev',
    'navigationNext',
    'observerUpdate',
    'orientationchange',
    'paginationHide',
    'paginationRender',
    'paginationShow',
    'paginationUpdate',
    'progress',
    'reachBeginning',
    'reachEnd',
    'realIndexChange',
    'resize',
    'scroll',
    'scrollbarDragEnd',
    'scrollbarDragMove',
    'scrollbarDragStart',
    'setTransition',
    'setTranslate',
    'slideChange',
    'slideChangeTransitionEnd',
    'slideChangeTransitionStart',
    'slideNextTransitionEnd',
    'slideNextTransitionStart',
    'slidePrevTransitionEnd',
    'slidePrevTransitionStart',
    'slideResetTransitionStart',
    'slideResetTransitionEnd',
    'sliderMove',
    'sliderFirstMove',
    'slidesLengthChange',
    'slidesGridLengthChange',
    'snapGridLengthChange',
    'snapIndexChange',
    'swiper',
    'tap',
    'toEdge',
    'touchEnd',
    'touchMove',
    'touchMoveOpposite',
    'touchStart',
    'transitionEnd',
    'transitionStart',
    'unlock',
    'update',
    'virtualUpdate',
    'zoomChange',
  ],
  setup(props, ctx) {
    let swiper = null;
    const swiperElRef = ref(null);
    let { params, rest: restParams } = getParams(props);
    const slidesRef = { value: [] };
    let virtualDataUpdated = false;
    // store virtual data
    const virtualData = ref({
      from: 0,
      to: 0,
      offset: 0,
      slides: [],
    });

    const getVirtualSlides = () => {
      const slides = [];

      const getSlidesFromElements = (els, slotName) => {
        if (!Array.isArray(els)) {
          return;
        }
        els.forEach((vnode) => {
          const isFragment = typeof vnode.type === 'symbol';
          if (slotName === 'default') slotName = 'container-end';
          if (isFragment && vnode.children) {
            getSlidesFromElements(vnode.children, slotName);
          } else if (
            vnode.type &&
            (vnode.type.name === 'SwiperSlide' || vnode.type.name === 'AsyncComponentWrapper')
          ) {
            slides.push(vnode);
          } else if (slots[slotName]) {
            slots[slotName].push(vnode);
          }
        });
      };

      Object.keys(ctx.slots).forEach((slotName) => {
        if (typeof ctx.slots[slotName] !== 'function') return;
        const els = ctx.slots[slotName]();
        getSlidesFromElements(els, slotName);
      });
      slidesRef.value = slides;

      return slides;
    };

    const virtualDefaults = () => {
      return {
        cache: false,
        slides: getVirtualSlides(),
        renderExternal: (vd) => (virtualData.value = vd),
        renderExternalUpdate: false,
      };
    };

    watch(
      () => virtualData.value,
      () => {
        virtualDataUpdated = true;
        nextTick(() => {
          if (swiper && !swiper.destroyed) {
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
          }
        });
      },
    );

    onUpdated(() => {
      if (virtualDataUpdated) {
        virtualDataUpdated = false;
        return;
      }
      if (!swiper) return;
      const { params: newParams, rest: newRestParams } = getParams(props);
      params = newParams;
      restParams = newRestParams;

      if (swiper.virtual) {
        if (params.virtual === true) {
          params.virtual = {
            enabled: true,
          };
        }
        if (params.virtual && params.virtual.enabled) {
          Object.assign(params.virtual, virtualDefaults());
          swiper.virtual.slides = getVirtualSlides();
        }
      }

      if (swiperElRef.value) {
        Object.assign(swiperElRef.value, params);
      }
    });

    onMounted(() => {
      // Register Swiper web component
      register();
      if (params.virtual === true) {
        params.virtual = {
          enabled: true,
        };
      }
      if (params.virtual && params.virtual.enabled) {
        Object.assign(params.virtual, virtualDefaults());
      }

      // Assign it to swiper element
      Object.assign(swiperElRef.value, params);

      // initialize swiper
      swiperElRef.value.initialize();
      swiper = swiperElRef.value.swiper;
      ctx.emit('swiper', swiper);
    });

    const getSlidesToRender = (slots) => {
      const isVirtual = props.virtual === true || (params.virtual && params.virtual.enabled);
      if (!isVirtual) {
        return slots;
      }
      const slides = virtualData.value.slides.map((slide, index) => {
        const style = swiper.isHorizontal()
          ? {
              [swiper.rtlTranslate ? 'right' : 'left']: `${virtualData.value.offset}px`,
            }
          : {
              top: `${virtualData.value.offset}px`,
            };
        if (!slide.props) slide.props = {};
        if (!slide.props.style) slide.props.style = {};
        slide.props.style = style;
        slide.props.key = virtualData.value.from + index;
        slide.props['data-swiper-slide-index'] = virtualData.value.from + index;

        return h(slide.type, { ...slide.props }, slide.children);
      });
      return slides;
    };

    return () => {
      return h(
        'swiper-container',
        {
          ref: swiperElRef,
          init: false,
          ...restParams,
        },
        getSlidesToRender(ctx.slots && ctx.slots.default()),
      );
    };
  },
};

const SwiperSlide = {
  name: 'SwiperSlide',
  setup(props, { slots }) {
    return () => {
      return h('swiper-slide', {}, slots.default());
    };
  },
};

export { Swiper, SwiperSlide };
