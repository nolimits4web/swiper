import React, { useRef, useState, useEffect, forwardRef } from 'react';
import SwiperCore from '../swiper.mjs';
import { getParams } from '../components-shared/get-params.mjs';
import { mountSwiper } from '../components-shared/mount-swiper.mjs';
import {
  needsScrollbar,
  needsNavigation,
  needsPagination,
  uniqueClasses,
  extend,
  wrapperClass,
} from '../components-shared/utils.mjs';
import { getChangedParams } from '../components-shared/get-changed-params.mjs';
import { getChildren } from './get-children.mjs';
import { updateSwiper } from '../components-shared/update-swiper.mjs';
import { renderVirtual } from './virtual.mjs';
import { updateOnVirtualData } from '../components-shared/update-on-virtual-data.mjs';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.mjs';
import { SwiperContext } from './context.mjs';

const Swiper = forwardRef(
  (
    {
      className,
      tag: Tag = 'div',
      wrapperTag: WrapperTag = 'div',
      children,
      onSwiper,
      ...rest
    } = {},
    externalElRef,
  ) => {
    let eventsAssigned = false;
    const [containerClasses, setContainerClasses] = useState('swiper');
    const [virtualData, setVirtualData] = useState(null);
    const [breakpointChanged, setBreakpointChanged] = useState(false);
    const initializedRef = useRef(false);
    const swiperElRef = useRef(null);
    const swiperRef = useRef(null);
    const oldPassedParamsRef = useRef(null);
    const oldSlides = useRef(null);

    const nextElRef = useRef(null);
    const prevElRef = useRef(null);
    const paginationElRef = useRef(null);
    const scrollbarElRef = useRef(null);

    const { params: swiperParams, passedParams, rest: restProps, events } = getParams(rest);

    const { slides, slots } = getChildren(children);

    const onBeforeBreakpoint = () => {
      setBreakpointChanged(!breakpointChanged);
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
      const passParams = { ...swiperParams };
      delete passParams.wrapperClass;
      swiperRef.current = new SwiperCore(passParams);
      if (swiperRef.current.virtual && swiperRef.current.params.virtual.enabled) {
        swiperRef.current.virtual.slides = slides;
        const extendWith = {
          cache: false,
          slides,
          renderExternal: setVirtualData,
          renderExternalUpdate: false,
        };
        extend(swiperRef.current.params.virtual, extendWith);
        extend(swiperRef.current.originalParams.virtual, extendWith);
      }
    };

    if (!swiperElRef.current) {
      initSwiper();
    }

    // Listen for breakpoints change
    if (swiperRef.current) {
      swiperRef.current.on('_beforeBreakpoint', onBeforeBreakpoint);
    }

    const attachEvents = () => {
      if (eventsAssigned || !events || !swiperRef.current) return;
      Object.keys(events).forEach((eventName) => {
        swiperRef.current.on(eventName, events[eventName]);
      });
    };

    const detachEvents = () => {
      if (!events || !swiperRef.current) return;
      Object.keys(events).forEach((eventName) => {
        swiperRef.current.off(eventName, events[eventName]);
      });
    };

    useEffect(() => {
      return () => {
        if (swiperRef.current) swiperRef.current.off('_beforeBreakpoint', onBeforeBreakpoint);
      };
    });

    // set initialized flag
    useEffect(() => {
      if (!initializedRef.current && swiperRef.current) {
        swiperRef.current.emitSlidesClasses();
        initializedRef.current = true;
      }
    });

    // mount swiper
    useIsomorphicLayoutEffect(() => {
      if (externalElRef) {
        externalElRef.current = swiperElRef.current;
      }
      if (!swiperElRef.current) return;
      if (swiperRef.current.destroyed) {
        initSwiper();
      }

      mountSwiper(
        {
          el: swiperElRef.current,
          nextEl: nextElRef.current,
          prevEl: prevElRef.current,
          paginationEl: paginationElRef.current,
          scrollbarEl: scrollbarElRef.current,
          swiper: swiperRef.current,
        },
        swiperParams,
      );

      if (onSwiper) onSwiper(swiperRef.current);
      // eslint-disable-next-line
      return () => {
        if (swiperRef.current && !swiperRef.current.destroyed) {
          swiperRef.current.destroy(true, false);
        }
      };
    }, []);

    // watch for params change
    useIsomorphicLayoutEffect(() => {
      attachEvents();
      const changedParams = getChangedParams(
        passedParams,
        oldPassedParamsRef.current,
        slides,
        oldSlides.current,
        (c) => c.key,
      );
      oldPassedParamsRef.current = passedParams;
      oldSlides.current = slides;
      if (changedParams.length && swiperRef.current && !swiperRef.current.destroyed) {
        updateSwiper({
          swiper: swiperRef.current,
          slides,
          passedParams,
          changedParams,
          nextEl: nextElRef.current,
          prevEl: prevElRef.current,
          scrollbarEl: scrollbarElRef.current,
          paginationEl: paginationElRef.current,
        });
      }
      return () => {
        detachEvents();
      };
    });

    // update on virtual update
    useIsomorphicLayoutEffect(() => {
      updateOnVirtualData(swiperRef.current);
    }, [virtualData]);

    // bypass swiper instance to slides
    function renderSlides() {
      if (swiperParams.virtual) {
        return renderVirtual(swiperRef.current, slides, virtualData);
      }
      return slides.map((child, index) => {
        return React.cloneElement(child, { swiper: swiperRef.current, swiperSlideIndex: index });
      });
    }

    return (
      <Tag
        ref={swiperElRef}
        className={uniqueClasses(`${containerClasses}${className ? ` ${className}` : ''}`)}
        {...restProps}
      >
        <SwiperContext.Provider value={swiperRef.current}>
          {slots['container-start']}
          <WrapperTag className={wrapperClass(swiperParams.wrapperClass)}>
            {slots['wrapper-start']}
            {renderSlides()}
            {slots['wrapper-end']}
          </WrapperTag>
          {needsNavigation(swiperParams) && (
            <>
              <div ref={prevElRef} className="swiper-button-prev" />
              <div ref={nextElRef} className="swiper-button-next" />
            </>
          )}
          {needsScrollbar(swiperParams) && (
            <div ref={scrollbarElRef} className="swiper-scrollbar" />
          )}
          {needsPagination(swiperParams) && (
            <div ref={paginationElRef} className="swiper-pagination" />
          )}
          {slots['container-end']}
        </SwiperContext.Provider>
      </Tag>
    );
  },
);

Swiper.displayName = 'Swiper';

export { Swiper };
