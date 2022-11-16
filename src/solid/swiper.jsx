import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  Show,
  splitProps,
  children,
} from 'solid-js';
import SwiperCore from 'swiper';
import { SwiperContext } from './context.js';
import { getChangedParams } from '../components-shared/get-changed-params.js';
import { getChildren } from './get-children.js';
import { getParams } from '../components-shared/get-params.js';
import { calcLoopedSlides, renderLoop } from './loop.js';
import { mountSwiper } from '../components-shared/mount-swiper.js';
import { updateSwiper } from '../components-shared/update-swiper.js';
import {
  extend,
  needsNavigation,
  needsPagination,
  needsScrollbar,
  uniqueClasses,
} from '../components-shared/utils.js';
import { renderVirtual } from './virtual.js';
import { updateOnVirtualData } from '../components-shared/update-on-virtual-data.js';

const Swiper = (props) => {
  let eventsAssigned = false;
  const [containerClasses, setContainerClasses] = createSignal('swiper');
  const [virtualData, setVirtualData] = createSignal(null);
  const [, setBreakpointChanged] = createSignal(false);

  // The variables bellow are mofied by SolidJS and can't be const
  let initializedRef = false; // eslint-disable-line prefer-const
  let swiperElRef = null; // eslint-disable-line prefer-const
  let swiperRef = null; // eslint-disable-line prefer-const
  let oldPassedParamsRef = null; // eslint-disable-line prefer-const
  let oldSlides = null; // eslint-disable-line prefer-const

  let nextElRef = null; // eslint-disable-line prefer-const
  let prevElRef = null; // eslint-disable-line prefer-const
  let paginationElRef = null; // eslint-disable-line prefer-const
  let scrollbarElRef = null; // eslint-disable-line prefer-const

  const [local, rest] = splitProps(props, [
    'children',
    'class',
    'onSwiper',
    'ref',
    'tag',
    'wrapperTag',
  ]);

  const params = createMemo(() => getParams(rest));

  const slidesSlots = children(() => getChildren(local.children));

  const onBeforeBreakpoint = () => {
    setBreakpointChanged((state) => !state);
  };

  Object.assign(params().params.on, {
    _containerClasses(swiper, classes) {
      setContainerClasses(classes);
    },
  });

  const initSwiper = () => {
    // init swiper
    Object.assign(params().params.on, params().events);
    eventsAssigned = true;
    swiperRef = new SwiperCore(params().params);
    swiperRef.loopCreate = () => {};
    swiperRef.loopDestroy = () => {};
    if (params().params.loop) {
      swiperRef.loopedSlides = calcLoopedSlides(slidesSlots().slides, params().params);
    }
    if (swiperRef.virtual && swiperRef.params.virtual.enabled) {
      swiperRef.virtual.slides = slidesSlots().slides;
      const extendWith = {
        cache: false,
        slides: slidesSlots().slides,
        renderExternal: (data) => {
          setVirtualData(data);
        },
        renderExternalUpdate: true,
      };
      extend(swiperRef.params.virtual, extendWith);
      extend(swiperRef.originalParams.virtual, extendWith);
    }
  };

  if (!swiperElRef) {
    initSwiper();
  }

  // Listen for breakpoints change
  if (swiperRef) {
    swiperRef.on('_beforeBreakpoint', onBeforeBreakpoint);
  }

  const attachEvents = () => {
    if (eventsAssigned || !params().events || !swiperRef) return;
    Object.keys(params().events).forEach((eventName) => {
      swiperRef.on(eventName, params().events[eventName]);
    });
  };

  const detachEvents = () => {
    if (!params().events || !swiperRef) return;
    Object.keys(params().events).forEach((eventName) => {
      swiperRef.off(eventName, params().events[eventName]);
    });
  };

  onCleanup(() => {
    if (swiperRef) swiperRef.off('_beforeBreakpoint', onBeforeBreakpoint);
  });

  // set initialized flag
  createEffect(() => {
    if (!initializedRef && swiperRef) {
      swiperRef.emitSlidesClasses();
      initializedRef = true;
    }
  });

  // mount swiper
  onMount(() => {
    if (local.ref) {
      if (typeof local.ref === 'function') {
        local.ref(swiperElRef);
      } else {
        local.ref = swiperElRef;
      }
    }
    if (!swiperElRef) return;
    if (swiperRef.destroyed) {
      initSwiper();
    }

    mountSwiper(
      {
        el: swiperElRef,
        nextEl: nextElRef,
        prevEl: prevElRef,
        paginationEl: paginationElRef,
        scrollbarEl: scrollbarElRef,
        swiper: swiperRef,
      },
      params().params,
    );

    if (local.onSwiper) local.onSwiper(swiperRef);
  });

  onCleanup(() => {
    if (swiperRef && !swiperRef.destroyed) {
      swiperRef.destroy(true, false);
    }
  });

  // watch for params change
  createEffect(() => {
    attachEvents();
    const { passedParams } = params();
    const changedParams = getChangedParams(
      passedParams,
      oldPassedParamsRef,
      slidesSlots().slides,
      oldSlides,
      (c) => c.key,
    );
    oldPassedParamsRef = passedParams;
    oldSlides = slidesSlots().slides;
    if (changedParams.length && swiperRef && !swiperRef.destroyed) {
      updateSwiper({
        swiper: swiperRef,
        slides: slidesSlots().slides,
        passedParams,
        changedParams,
        nextEl: nextElRef,
        prevEl: prevElRef,
        scrollbarEl: scrollbarElRef,
        paginationEl: paginationElRef,
      });
    }
    onCleanup(detachEvents);
  });

  // update on virtual update
  createEffect(() => {
    updateOnVirtualData(swiperRef);
    setTimeout(() => {
      updateOnVirtualData(swiperRef);
    });
  });

  // bypass swiper instance to slides
  function renderSlides() {
    if (params().params.virtual) {
      return renderVirtual(swiperRef, slidesSlots().slides, virtualData());
    }
    if (!params().params.loop || (swiperRef && swiperRef.destroyed)) {
      return slidesSlots().slides;
    }
    return renderLoop(swiperRef, slidesSlots().slides, params().params);
  }

  /* eslint-disable react/react-in-jsx-scope */
  /* eslint-disable react/no-unknown-property */

  return (
    <div
      ref={swiperElRef}
      class={uniqueClasses(`${containerClasses()}${local.class ? ` ${local.class}` : ''}`)}
      {...params().rest}
    >
      <SwiperContext.Provider value={swiperRef}>
        {slidesSlots().slots['container-start']}

        <div class="swiper-wrapper">
          {slidesSlots().slots['wrapper-start']}
          {renderSlides()}
          {slidesSlots().slots['wrapper-end']}
        </div>

        <Show when={needsNavigation(params().params)}>
          <div ref={prevElRef} class="swiper-button-prev" />
          <div ref={nextElRef} class="swiper-button-next" />
        </Show>
        <Show when={needsScrollbar(params().params)}>
          <div ref={scrollbarElRef} class="swiper-scrollbar" />
        </Show>
        <Show when={needsPagination(params().params)}>
          <div ref={paginationElRef} class="swiper-pagination" />
        </Show>

        {slidesSlots().slots['container-end']}
      </SwiperContext.Provider>
    </div>
  );
};

export { Swiper };
