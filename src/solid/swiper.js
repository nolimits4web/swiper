import { createEffect, createSignal, onCleanup, Show, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import SwiperCore from 'swiper';
import { SwiperContext } from './context.js';
import { getChangedParams } from './get-changed-params.js';
import { getChildren } from './get-children.js';
import { getParams } from './get-params.js';
import { calcLoopedSlides, renderLoop } from './loop.js';
import { mountSwiper } from './mount-swiper.js';
import { updateSwiper } from './update-swiper.js';
import {
  extend,
  needsNavigation,
  needsPagination,
  needsScrollbar,
  uniqueClasses,
} from './utils.js';
import { renderVirtual, updateOnVirtualData } from './virtual.js';

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

  const { params: swiperParams, passedParams, rest: restProps, events } = getParams(rest);

  const { slides, slots } = getChildren(local.children);

  const onBeforeBreakpoint = () => {
    setBreakpointChanged((state) => !state);
  };

  Object.assign(swiperParams.on, {
    _containerClasses(swiper, classes) {
      setContainerClasses(classes);
    },
  });

  const initSwiper = () => {
    // init swiper
    Object.assign(swiperParams.on, events);
    eventsAssigned = true;
    swiperRef = new SwiperCore(swiperParams);
    swiperRef.loopCreate = () => {};
    swiperRef.loopDestroy = () => {};
    if (swiperParams.loop) {
      swiperRef.loopedSlides = calcLoopedSlides(slides, swiperParams);
    }
    if (swiperRef.virtual && swiperRef.params.virtual.enabled) {
      swiperRef.virtual.slides = slides;
      const extendWith = {
        cache: false,
        slides,
        renderExternal: (data) => setVirtualData(data),
        renderExternalUpdate: false,
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
    if (eventsAssigned || !events || !swiperRef) return;
    Object.keys(events).forEach((eventName) => {
      swiperRef.on(eventName, events[eventName]);
    });
  };

  const detachEvents = () => {
    if (!events || !swiperRef) return;
    Object.keys(events).forEach((eventName) => {
      swiperRef.off(eventName, events[eventName]);
    });
  };

  createEffect(() => {
    return () => {
      if (swiperRef) swiperRef.off('_beforeBreakpoint', onBeforeBreakpoint);
    };
  });

  // set initialized flag
  createEffect(() => {
    if (!initializedRef && swiperRef) {
      swiperRef.emitSlidesClasses();
      initializedRef = true;
    }
  });

  // mount swiper
  createEffect(() => {
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
      swiperParams,
    );

    if (local.onSwiper) local.onSwiper(swiperRef);
    // eslint-disable-next-line
    return () => {
      if (swiperRef && !swiperRef.destroyed) {
        swiperRef.destroy(true, false);
      }
    };
  });

  // watch for params change
  createEffect(() => {
    attachEvents();
    const changedParams = getChangedParams(passedParams, oldPassedParamsRef, slides, oldSlides);
    oldPassedParamsRef = passedParams;
    oldSlides = slides;
    if (changedParams.length && swiperRef && !swiperRef.destroyed) {
      updateSwiper({
        swiper: swiperRef,
        slides,
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
  });

  // bypass swiper instance to slides
  function renderSlides() {
    if (swiperParams.virtual) {
      return renderVirtual(swiperRef, slides, virtualData());
    }
    if (!swiperParams.loop || (swiperRef && swiperRef.destroyed)) {
      return slides.map((child) => {
        const node = child.cloneNode(true);
        node.swiper = swiperRef;
        return node;
      });
    }
    return renderLoop(swiperRef, slides, swiperParams);
  }

  /* eslint-disable react/react-in-jsx-scope */
  /* eslint-disable react/no-unknown-property */

  return (
    <Dynamic
      component={local.tag || 'div'}
      ref={swiperElRef}
      class={uniqueClasses(`${containerClasses()}${local.class ? ` ${local.class}` : ''}`)}
      {...restProps}
    >
      <SwiperContext.Provider value={swiperRef}>
        {slots['container-start']}

        <Dynamic component={local.wrapperTag || 'div'} class="swiper-wrapper">
          {slots['wrapper-start']}
          {renderSlides()}
          {slots['wrapper-end']}
        </Dynamic>

        <Show when={needsNavigation(swiperParams)}>
          <div ref={prevElRef} class="swiper-button-prev" />
          <div ref={nextElRef} class="swiper-button-next" />
        </Show>
        <Show when={needsScrollbar(swiperParams)}>
          <div ref={scrollbarElRef} class="swiper-scrollbar" />
        </Show>
        <Show when={needsPagination(swiperParams)}>
          <div ref={paginationElRef} class="swiper-pagination" />
        </Show>

        {slots['container-end']}
      </SwiperContext.Provider>
    </Dynamic>
  );
};

export { Swiper };
