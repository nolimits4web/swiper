import { h, ref, onMounted, onUpdated, onBeforeUpdate, onBeforeUnmount, watch } from 'vue';
import { getParams } from './get-params';
import { initSwiper } from './init-swiper';
import { needsScrollbar, needsNavigation, needsPagination, uniqueClasses } from './utils';
import { renderLoop, calcLoopedSlides } from './loop';
import { getChangedParams } from './get-changed-params';
import { getChildren } from './get-children';
import { updateSwiper } from './update-swiper';
import { renderVirtual, updateOnVirtualData } from './virtual';

const Swiper = {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    wrapperTag: {
      type: String,
      default: 'div',
    },
    virtual: Boolean,
    navigation: Boolean,
    pagination: Boolean,
    loop: Boolean,
  },
  setup(props, { slots: originalSlots, emit }) {
    const { className, tag: Tag, wrapperTag: WrapperTag, ...rest } = props;

    const containerClasses = ref('swiper-container');
    const virtualData = ref(null);
    const breakpointChanged = ref(false);
    const initializedRef = ref(false);
    const swiperElRef = ref(null);
    const swiperRef = ref(null);
    const oldPassedParamsRef = ref(null);
    const oldSlides = ref(null);

    const nextElRef = ref(null);
    const prevElRef = ref(null);
    const paginationElRef = ref(null);
    const scrollbarElRef = ref(null);

    const { params: swiperParams, passedParams } = getParams(rest);

    const { slides, slots } = getChildren(originalSlots);

    const changedParams = getChangedParams(
      passedParams,
      oldPassedParamsRef.value,
      slides,
      oldSlides.value,
    );

    oldPassedParamsRef.value = passedParams;
    oldSlides.value = slides;

    const onBeforeBreakpoint = () => {
      breakpointChanged.value = !breakpointChanged.value;
    };

    swiperParams.onAny = (event, ...args) => {
      emit(event, ...args);
    };
    Object.assign(swiperParams.on, {
      _containerClasses(swiper, classes) {
        containerClasses.value = classes;
      },
      _swiper(swiper) {
        swiper.loopCreate = () => {};
        swiper.loopDestroy = () => {};
        if (swiperParams.loop) {
          swiper.loopedSlides = calcLoopedSlides(slides, swiperParams);
        }
        swiperRef.value = swiper;
        if (swiper.virtual && swiper.params.virtual.enabled) {
          swiper.virtual.slides = slides;
          swiper.params.virtual.cache = false;
          swiper.params.virtual.renderExternal = (data) => {
            virtualData.value = data;
          };
          swiper.params.virtual.renderExternalUpdate = false;
        }
      },
    });

    if (swiperRef.value) {
      swiperRef.value.on('_beforeBreakpoint', onBeforeBreakpoint);
    }
    onBeforeUpdate(() => {
      if (swiperRef.value) swiperRef.value.off('_beforeBreakpoint', onBeforeBreakpoint);
    });

    // set initialized flag
    onUpdated(() => {
      if (!initializedRef.value && swiperRef.value) {
        swiperRef.value.emitSlidesClasses();
        initializedRef.value = true;
      }
    });
    // useEffect(() => {
    //   if (!initializedRef.value && swiperRef.value) {
    //     swiperRef.value.emitSlidesClasses();
    //     initializedRef.value = true;
    //   }
    // });

    // watch for params change
    onUpdated(() => {
      if (changedParams.length && swiperRef.value && !swiperRef.value.destroyed) {
        updateSwiper(swiperRef.value, slides, passedParams, changedParams);
      }
    });

    // update on virtual update
    watch(virtualData, () => {
      updateOnVirtualData(swiperRef.value);
    });

    // init swiper
    onMounted(() => {
      if (!swiperElRef.value) return;

      initSwiper(
        {
          el: swiperElRef.value,
          nextEl: nextElRef.value,
          prevEl: prevElRef.value,
          paginationEl: paginationElRef.value,
          scrollbarEl: scrollbarElRef.value,
        },
        swiperParams,
      );

      emit('swiper', swiperRef.value);
    });
    onBeforeUnmount(() => {
      if (swiperRef.value && !swiperRef.value.destroyed) {
        swiperRef.value.destroy();
      }
    });

    // bypass swiper instance to slides
    function renderSlides() {
      if (swiperParams.virtual) {
        return renderVirtual(swiperRef, slides, virtualData.value);
      }
      if (!swiperParams.loop || (swiperRef.value && swiperRef.value.destroyed)) {
        slides.forEach((slide) => {
          if (!slide.props) slide.props = {};
          slide.props.swiperRef = swiperRef;
        });
        return slides;
      }
      return renderLoop(swiperRef, slides, swiperParams);
    }

    return () =>
      h(
        Tag,
        {
          ref: swiperElRef,
          class: uniqueClasses(`${containerClasses.value}${className ? ` ${className}` : ''}`),
        },
        [
          slots['container-start'],
          needsNavigation(passedParams) && [
            h('div', { ref: prevElRef, class: 'swiper-button-prev' }),
            h('div', { ref: nextElRef, class: 'swiper-button-next' }),
          ],
          needsScrollbar(passedParams) &&
            h('div', { ref: scrollbarElRef, class: 'swiper-scrollbar' }),
          needsPagination(passedParams) &&
            h('div', { ref: paginationElRef, class: 'swiper-pagination' }),
          h(WrapperTag, { class: 'swiper-wrapper' }, [
            slots['wrapper-start'],
            renderSlides(),
            slots['wrapper-end'],
          ]),
          slots['container-end'],
        ],
      );
  },
};

export { Swiper };
