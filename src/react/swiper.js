import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { getParams } from './get-params';
import { initSwiper } from './init-swiper';
import { needsScrollbar, needsNavigation, needsPagination, uniqueClasses } from './utils';
import { renderLoop, calcLoopedSlides } from './loop';

const Swiper = ({
  className,
  tag: Tag = 'div',
  wrapperTag: WrapperTag = 'div',
  children,
  onSwiper,
  ...rest
} = {}) => {
  const [containerClasses, setContainerClasses] = useState('swiper-container');
  const initializedRef = useRef(false);
  const swiperElRef = useRef(null);
  const swiperRef = useRef(null);
  const nextElRef = useRef(null);
  const prevElRef = useRef(null);
  const paginationElRef = useRef(null);
  const scrollbarElRef = useRef(null);

  const { params: swiperParams, rest: restProps } = getParams(rest);

  Object.assign(swiperParams.on, {
    _containerClasses: setContainerClasses,
    _swiper(swiper) {
      if (swiperParams.loop) {
        swiper.loopCreate = () => {};
        swiper.loopDestroy = () => {};
        swiper.loopedSlides = calcLoopedSlides(children, swiperParams);
      }
      swiperRef.current = swiper;
    },
  });

  // right after init
  useEffect(() => {
    if (!initializedRef.current && swiperRef.current) {
      swiperRef.current.emitSlidesClasses();
      initializedRef.current = true;
    }
  });

  // init swiper
  useLayoutEffect(() => {
    if (!swiperElRef.current) return;
    initSwiper(
      {
        el: swiperElRef.current,
        nextEl: nextElRef.current,
        prevEl: prevElRef.current,
        paginationEl: paginationElRef.current,
        scrollbarEl: scrollbarElRef.current,
      },
      swiperParams,
    );

    if (onSwiper) onSwiper(swiperRef.current);
    // eslint-disable-next-line
    return () => {
      if (swiperRef.current && !swiperRef.current.destroyed) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  // bypass swiper instance to slides
  function renderSlides() {
    if (!swiperParams.loop || (swiperRef.current && swiperRef.current.destroyed)) {
      return React.Children.map(children, (child) => {
        return React.cloneElement(child, { swiper: swiperRef.current });
      });
    }
    return renderLoop(swiperRef.current, swiperParams, children);
  }

  return (
    <Tag
      ref={swiperElRef}
      className={uniqueClasses(`${containerClasses}${className ? ` ${className}` : ''}`)}
      {...restProps}
    >
      {needsNavigation(swiperParams) && (
        <>
          <div ref={prevElRef} className="swiper-button-prev" />
          <div ref={nextElRef} className="swiper-button-next" />
        </>
      )}
      {needsScrollbar(swiperParams) && <div ref={scrollbarElRef} className="swiper-scrollbar" />}
      {needsPagination(swiperParams) && <div ref={paginationElRef} className="swiper-pagination" />}
      <WrapperTag className="swiper-wrapper">{renderSlides()}</WrapperTag>
    </Tag>
  );
};

Swiper.displayName = 'Swiper';

export { Swiper };
