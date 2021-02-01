import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { getParams } from './get-params';
import { initSwiper, mountSwiper } from './init-swiper';
import { needsScrollbar, needsNavigation, needsPagination, uniqueClasses, extend } from './utils';
import { renderLoop, calcLoopedSlides } from './loop';
import { getChangedParams } from './get-changed-params';
import { getChildren } from './get-children';
import { updateSwiper } from './update-swiper';
import { renderVirtual, updateOnVirtualData } from './virtual';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

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
    const [containerClasses, setContainerClasses] = useState('swiper-container');
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

    const { params: swiperParams, passedParams, rest: restProps } = getParams(rest);

    const { slides, slots } = getChildren(children);

    const changedParams = getChangedParams(
      passedParams,
      oldPassedParamsRef.current,
      slides,
      oldSlides.current,
    );

    oldPassedParamsRef.current = passedParams;
    oldSlides.current = slides;

    const onBeforeBreakpoint = () => {
      setBreakpointChanged(!breakpointChanged);
    };

    Object.assign(swiperParams.on, {
      _containerClasses(swiper, classes) {
        setContainerClasses(classes);
      },
    });

    if (!swiperElRef.current) {
      // init swiper
      swiperRef.current = initSwiper(swiperParams);
      swiperRef.current.loopCreate = () => {};
      swiperRef.current.loopDestroy = () => {};
      if (swiperParams.loop) {
        swiperRef.current.loopedSlides = calcLoopedSlides(slides, swiperParams);
      }
      if (swiperRef.current.virtual && swiperRef.current.params.virtual.enabled) {
        swiperRef.current.virtual.slides = slides;
        const extendWith = {
          cache: false,
          renderExternal: setVirtualData,
          renderExternalUpdate: false,
        };
        extend(swiperRef.current.params.virtual, extendWith);
        extend(swiperRef.current.originalParams.virtual, extendWith);
      }
    }

    // Listen for breakpoints change
    if (swiperRef.current) {
      swiperRef.current.on('_beforeBreakpoint', onBeforeBreakpoint);
    }
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
      if (changedParams.length && swiperRef.current && !swiperRef.current.destroyed) {
        updateSwiper(swiperRef.current, slides, passedParams, changedParams);
      }
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
      if (!swiperParams.loop || (swiperRef.current && swiperRef.current.destroyed)) {
        return slides.map((child) => {
          return React.cloneElement(child, { swiper: swiperRef.current });
        });
      }
      return renderLoop(swiperRef.current, slides, swiperParams);
    }

    return (
      <Tag
        ref={swiperElRef}
        className={uniqueClasses(`${containerClasses}${className ? ` ${className}` : ''}`)}
        {...restProps}
      >
        {slots['container-start']}
        {needsNavigation(swiperParams) && (
          <>
            <div ref={prevElRef} className="swiper-button-prev" />
            <div ref={nextElRef} className="swiper-button-next" />
          </>
        )}
        {needsScrollbar(swiperParams) && <div ref={scrollbarElRef} className="swiper-scrollbar" />}
        {needsPagination(swiperParams) && (
          <div ref={paginationElRef} className="swiper-pagination" />
        )}
        <WrapperTag className="swiper-wrapper">
          {slots['wrapper-start']}
          {renderSlides()}
          {slots['wrapper-end']}
        </WrapperTag>
        {slots['container-end']}
      </Tag>
    );
  },
);

Swiper.displayName = 'Swiper';

export { Swiper };
