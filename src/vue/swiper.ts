import {
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  provide,
  ref,
  shallowRef,
  watch,
  type PropType,
  type Ref,
  type SetupContext,
  type VNode,
} from 'vue';
import SwiperCore from '../swiper';
import { getParams } from '../components-shared/get-params';
import { mountSwiper } from '../components-shared/mount-swiper';
import {
  extend,
  needsNavigation,
  needsPagination,
  needsScrollbar,
  uniqueClasses,
  wrapperClass,
} from '../components-shared/utils';
import { getChangedParams } from '../components-shared/get-changed-params';
import { getChildren, type MutableRef } from './get-children';
import { updateSwiper } from '../components-shared/update-swiper';
import { renderVirtual, type VueVirtualData } from './virtual';
import { updateOnVirtualData } from '../components-shared/update-on-virtual-data';
import type { Swiper as SwiperClass, SwiperEventHandler, SwiperOptions } from '../core/core';

type VNodeWithLegacy = VNode & { componentOptions?: { tag?: string; Ctor?: unknown } };

const SWIPER_EVENTS = [
  '_beforeBreakpoint',
  '_containerClasses',
  '_slideClass',
  '_slideClasses',
  '_swiper',
  '_freeModeNoMomentumRelease',
  '_virtualUpdated',
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
  'slidesUpdated',
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
] as const;

const Swiper = defineComponent({
  name: 'Swiper',
  props: {
    tag: { type: String, default: 'div' },
    wrapperTag: { type: String, default: 'div' },
    modules: { type: Array as PropType<SwiperOptions['modules']>, default: undefined },
    init: { type: Boolean, default: undefined },
    direction: {
      type: String as PropType<SwiperOptions['direction']>,
      default: undefined,
    },
    oneWayMovement: { type: Boolean, default: undefined },
    swiperElementNodeName: { type: String, default: 'SWIPER-CONTAINER' },
    touchEventsTarget: {
      type: String as PropType<SwiperOptions['touchEventsTarget']>,
      default: undefined,
    },
    initialSlide: { type: Number, default: undefined },
    speed: { type: Number, default: undefined },
    cssMode: { type: Boolean, default: undefined },
    updateOnWindowResize: { type: Boolean, default: undefined },
    resizeObserver: { type: Boolean, default: undefined },
    nested: { type: Boolean, default: undefined },
    focusableElements: { type: String, default: undefined },
    width: { type: Number, default: undefined },
    height: { type: Number, default: undefined },
    preventInteractionOnTransition: { type: Boolean, default: undefined },
    userAgent: { type: String, default: undefined },
    url: { type: String, default: undefined },
    edgeSwipeDetection: {
      type: [Boolean, String] as PropType<boolean | string>,
      default: undefined,
    },
    edgeSwipeThreshold: { type: Number, default: undefined },
    autoHeight: { type: Boolean, default: undefined },
    setWrapperSize: { type: Boolean, default: undefined },
    virtualTranslate: { type: Boolean, default: undefined },
    effect: { type: String as PropType<SwiperOptions['effect']>, default: undefined },
    breakpoints: { type: Object as PropType<SwiperOptions['breakpoints']>, default: undefined },
    breakpointsBase: { type: String, default: undefined },
    spaceBetween: {
      type: [Number, String] as PropType<number | string>,
      default: undefined,
    },
    slidesPerView: {
      type: [Number, String] as PropType<SwiperOptions['slidesPerView']>,
      default: undefined,
    },
    maxBackfaceHiddenSlides: { type: Number, default: undefined },
    slidesPerGroup: { type: Number, default: undefined },
    slidesPerGroupSkip: { type: Number, default: undefined },
    slidesPerGroupAuto: { type: Boolean, default: undefined },
    centeredSlides: { type: Boolean, default: undefined },
    centeredSlidesBounds: { type: Boolean, default: undefined },
    slidesOffsetBefore: { type: Number, default: undefined },
    slidesOffsetAfter: { type: Number, default: undefined },
    normalizeSlideIndex: { type: Boolean, default: undefined },
    centerInsufficientSlides: { type: Boolean, default: undefined },
    watchOverflow: { type: Boolean, default: undefined },
    roundLengths: { type: Boolean, default: undefined },
    touchRatio: { type: Number, default: undefined },
    touchAngle: { type: Number, default: undefined },
    simulateTouch: { type: Boolean, default: undefined },
    shortSwipes: { type: Boolean, default: undefined },
    longSwipes: { type: Boolean, default: undefined },
    longSwipesRatio: { type: Number, default: undefined },
    longSwipesMs: { type: Number, default: undefined },
    followFinger: { type: Boolean, default: undefined },
    allowTouchMove: { type: Boolean, default: undefined },
    threshold: { type: Number, default: undefined },
    touchMoveStopPropagation: { type: Boolean, default: undefined },
    touchStartPreventDefault: { type: Boolean, default: undefined },
    touchStartForcePreventDefault: { type: Boolean, default: undefined },
    touchReleaseOnEdges: { type: Boolean, default: undefined },
    uniqueNavElements: { type: Boolean, default: undefined },
    resistance: { type: Boolean, default: undefined },
    resistanceRatio: { type: Number, default: undefined },
    watchSlidesProgress: { type: Boolean, default: undefined },
    grabCursor: { type: Boolean, default: undefined },
    preventClicks: { type: Boolean, default: undefined },
    preventClicksPropagation: { type: Boolean, default: undefined },
    slideToClickedSlide: { type: Boolean, default: undefined },
    loop: { type: Boolean, default: undefined },
    loopedSlides: { type: Number, default: undefined },
    loopPreventsSliding: { type: Boolean, default: undefined },
    loopAdditionalSlides: { type: Number, default: undefined },
    loopAddBlankSlides: { type: Boolean, default: undefined },
    rewind: { type: Boolean, default: undefined },
    allowSlidePrev: { type: Boolean, default: undefined },
    allowSlideNext: { type: Boolean, default: undefined },
    swipeHandler: { type: Boolean, default: undefined },
    noSwiping: { type: Boolean, default: undefined },
    noSwipingClass: { type: String, default: undefined },
    noSwipingSelector: { type: String, default: undefined },
    passiveListeners: { type: Boolean, default: undefined },
    containerModifierClass: { type: String, default: undefined },
    slideClass: { type: String, default: undefined },
    slideActiveClass: { type: String, default: undefined },
    slideVisibleClass: { type: String, default: undefined },
    slideFullyVisibleClass: { type: String, default: undefined },
    slideBlankClass: { type: String, default: undefined },
    slideNextClass: { type: String, default: undefined },
    slidePrevClass: { type: String, default: undefined },
    wrapperClass: { type: String, default: undefined },
    lazyPreloaderClass: { type: String, default: undefined },
    lazyPreloadPrevNext: { type: Number, default: undefined },
    runCallbacksOnInit: { type: Boolean, default: undefined },
    observer: { type: Boolean, default: undefined },
    observeParents: { type: Boolean, default: undefined },
    observeSlideChildren: { type: Boolean, default: undefined },
    a11y: {
      type: [Boolean, Object] as PropType<SwiperOptions['a11y']>,
      default: undefined,
    },
    autoplay: {
      type: [Boolean, Object] as PropType<SwiperOptions['autoplay']>,
      default: undefined,
    },
    controller: {
      type: Object as PropType<SwiperOptions['controller']>,
      default: undefined,
    },
    coverflowEffect: {
      type: Object as PropType<SwiperOptions['coverflowEffect']>,
      default: undefined,
    },
    cubeEffect: { type: Object as PropType<SwiperOptions['cubeEffect']>, default: undefined },
    fadeEffect: { type: Object as PropType<SwiperOptions['fadeEffect']>, default: undefined },
    flipEffect: { type: Object as PropType<SwiperOptions['flipEffect']>, default: undefined },
    creativeEffect: {
      type: Object as PropType<SwiperOptions['creativeEffect']>,
      default: undefined,
    },
    cardsEffect: { type: Object as PropType<SwiperOptions['cardsEffect']>, default: undefined },
    hashNavigation: {
      type: [Boolean, Object] as PropType<SwiperOptions['hashNavigation']>,
      default: undefined,
    },
    history: {
      type: [Boolean, Object] as PropType<SwiperOptions['history']>,
      default: undefined,
    },
    keyboard: {
      type: [Boolean, Object] as PropType<SwiperOptions['keyboard']>,
      default: undefined,
    },
    mousewheel: {
      type: [Boolean, Object] as PropType<SwiperOptions['mousewheel']>,
      default: undefined,
    },
    navigation: {
      type: [Boolean, Object] as PropType<SwiperOptions['navigation']>,
      default: undefined,
    },
    pagination: {
      type: [Boolean, Object] as PropType<SwiperOptions['pagination']>,
      default: undefined,
    },
    parallax: {
      type: [Boolean, Object] as PropType<SwiperOptions['parallax']>,
      default: undefined,
    },
    scrollbar: {
      type: [Boolean, Object] as PropType<SwiperOptions['scrollbar']>,
      default: undefined,
    },
    thumbs: { type: Object as PropType<SwiperOptions['thumbs']>, default: undefined },
    virtual: {
      type: [Boolean, Object] as PropType<SwiperOptions['virtual']>,
      default: undefined,
    },
    zoom: {
      type: [Boolean, Object] as PropType<SwiperOptions['zoom']>,
      default: undefined,
    },
    grid: { type: Object as PropType<SwiperOptions['grid']>, default: undefined },
    freeMode: {
      type: [Boolean, Object] as PropType<SwiperOptions['freeMode']>,
      default: undefined,
    },
    enabled: { type: Boolean, default: undefined },
  },
  emits: SWIPER_EVENTS as unknown as string[],
  setup(props, { slots: originalSlots, emit }: SetupContext) {
    const { tag: Tag, wrapperTag: WrapperTag } = props;

    const containerClasses = ref('swiper');
    const virtualData = ref<VueVirtualData | null>(null);
    const breakpointChanged = ref(false);
    const initializedRef = ref(false);
    const swiperElRef = ref<HTMLElement | null>(null);
    const swiperRef = shallowRef<SwiperClass | null>(null);
    const oldPassedParamsRef = ref<Record<string, unknown> | null>(null);
    const slidesRef: MutableRef<VNodeWithLegacy[]> = { value: [] };
    const oldSlidesRef: MutableRef<VNodeWithLegacy[]> = { value: [] };

    const nextElRef = ref<HTMLElement | null>(null);
    const prevElRef = ref<HTMLElement | null>(null);
    const paginationElRef = ref<HTMLElement | null>(null);
    const scrollbarElRef = ref<HTMLElement | null>(null);

    const { params: swiperParams, passedParams } = getParams(
      props as unknown as Record<string, unknown>,
      false,
    );

    getChildren(originalSlots, slidesRef, oldSlidesRef);

    oldPassedParamsRef.value = passedParams;
    oldSlidesRef.value = slidesRef.value;

    const onBeforeBreakpoint = (): void => {
      getChildren(originalSlots, slidesRef, oldSlidesRef);
      breakpointChanged.value = true;
    };

    swiperParams.onAny = (event: string, ...args: unknown[]): void => {
      (emit as (e: string, ...a: unknown[]) => void)(event, ...args);
    };

    Object.assign(swiperParams.on as Record<string, SwiperEventHandler>, {
      _beforeBreakpoint: onBeforeBreakpoint,
      _containerClasses(_swiper: SwiperClass, classes: string) {
        containerClasses.value = classes;
      },
    });

    // init Swiper
    const passParams = { ...swiperParams } as SwiperOptions & { wrapperClass?: string };
    delete passParams.wrapperClass;
    swiperRef.value = new SwiperCore(passParams);
    const instance = swiperRef.value;
    if (instance && instance.virtual && instance.params.virtual?.enabled) {
      instance.virtual.slides = slidesRef.value;
      const extendWith = {
        cache: false,
        slides: slidesRef.value,
        renderExternal: (data: VueVirtualData) => {
          virtualData.value = data;
        },
        renderExternalUpdate: false,
      };
      extend(instance.params.virtual, extendWith);
      if (instance.originalParams.virtual) extend(instance.originalParams.virtual, extendWith);
    }

    onUpdated(() => {
      if (!initializedRef.value && swiperRef.value) {
        swiperRef.value.emitSlidesClasses();
        initializedRef.value = true;
      }
      const { passedParams: newPassedParams } = getParams(
        props as unknown as Record<string, unknown>,
        false,
      );

      const changedParams = getChangedParams(
        newPassedParams,
        oldPassedParamsRef.value,
        slidesRef.value,
        oldSlidesRef.value,
        (c) => (c.props ? c.props.key : undefined),
      );
      oldPassedParamsRef.value = newPassedParams;

      if (
        (changedParams.length || breakpointChanged.value) &&
        swiperRef.value &&
        !swiperRef.value.destroyed
      ) {
        updateSwiper({
          swiper: swiperRef.value,
          slides: slidesRef.value,
          passedParams: newPassedParams,
          changedParams,
          nextEl: nextElRef.value,
          prevEl: prevElRef.value,
          scrollbarEl: scrollbarElRef.value,
          paginationEl: paginationElRef.value,
        });
      }
      breakpointChanged.value = false;
    });

    provide('swiper', swiperRef as Ref<SwiperClass | null>);

    watch(virtualData, () => {
      nextTick(() => {
        updateOnVirtualData(swiperRef.value);
      });
    });

    onMounted(() => {
      if (!swiperElRef.value || !swiperRef.value) return;
      mountSwiper(
        {
          el: swiperElRef.value,
          nextEl: nextElRef.value,
          prevEl: prevElRef.value,
          paginationEl: paginationElRef.value,
          scrollbarEl: scrollbarElRef.value,
          swiper: swiperRef.value,
        },
        swiperParams,
      );

      emit('swiper', swiperRef.value);
    });
    onBeforeUnmount(() => {
      if (swiperRef.value && !swiperRef.value.destroyed) {
        swiperRef.value.destroy(true, false);
      }
    });

    function renderSlides(
      slides: VNodeWithLegacy[],
    ): VNodeWithLegacy[] | ReturnType<typeof renderVirtual> {
      if (swiperParams.virtual) {
        return renderVirtual(swiperRef as Ref<SwiperClass | null>, slides, virtualData.value);
      }
      slides.forEach((slide, index) => {
        const slideProps = (slide.props ?? {}) as Record<string, unknown>;
        slideProps.swiperRef = swiperRef;
        slideProps.swiperSlideIndex = index;
        slide.props = slideProps;
      });
      return slides;
    }

    return () => {
      const { slides, slots } = getChildren(originalSlots, slidesRef, oldSlidesRef);
      return h(
        Tag,
        {
          ref: swiperElRef,
          class: uniqueClasses(containerClasses.value),
        },
        [
          slots['container-start'],
          h(WrapperTag, { class: wrapperClass(swiperParams.wrapperClass) }, [
            slots['wrapper-start'],
            renderSlides(slides),
            slots['wrapper-end'],
          ]),
          needsNavigation(props) && [
            h('div', { ref: prevElRef, class: 'swiper-button-prev' }),
            h('div', { ref: nextElRef, class: 'swiper-button-next' }),
          ],
          needsScrollbar(props) && h('div', { ref: scrollbarElRef, class: 'swiper-scrollbar' }),
          needsPagination(props) && h('div', { ref: paginationElRef, class: 'swiper-pagination' }),
          slots['container-end'],
        ],
      );
    };
  },
});

export { Swiper };
