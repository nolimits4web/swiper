import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line
import SwiperCore from '../../core';
import { getParams } from './get-params';

function needsNavigation(params = {}) {
  return params.navigation && !params.navigation.nextEl && !params.navigation.prevEl;
}
function needsPagination(params = {}) {
  return params.pagination && !params.pagination.el && !params.pagination.el;
}
function needsScrollbar(params = {}) {
  return params.scrollbar && !params.scrollbar.el && !params.scrollbar.el;
}

function initSwiper({ el, nextEl, prevEl, paginationEl, scrollbarEl }, params) {
  const { params: swiperParams } = getParams(params);
  if (needsNavigation(swiperParams) && nextEl && prevEl) {
    if (swiperParams.navigation === true) {
      swiperParams.navigation = {};
    }
    swiperParams.navigation.nextEl = nextEl;
    swiperParams.navigation.prevEl = prevEl;
  }
  if (needsPagination(swiperParams) && paginationEl) {
    if (swiperParams.pagination === true) {
      swiperParams.pagination = {};
    }
    swiperParams.pagination.el = paginationEl;
  }
  if (needsScrollbar(swiperParams) && scrollbarEl) {
    if (swiperParams.scrollbar === true) {
      swiperParams.scrollbar = {};
    }
    swiperParams.scrollbar.el = scrollbarEl;
  }
  return new SwiperCore(el, swiperParams);
}

const Swiper = ({ className, children, onSwiper, ...rest } = {}) => {
  const swiperElRef = useRef(null);
  const swiperRef = useRef(null);
  const nextElRef = useRef(null);
  const prevElRef = useRef(null);
  const paginationElRef = useRef(null);
  const scrollbarElRef = useRef(null);

  useEffect(() => {
    if (!swiperElRef.current) return;
    swiperRef.current = initSwiper(
      {
        el: swiperElRef.current,
        nextEl: nextElRef.current,
        prevEl: prevElRef.current,
        paginationEl: paginationElRef.current,
        scrollbarEl: scrollbarElRef.current,
      },
      rest,
    );
    if (onSwiper) onSwiper(swiperRef.current);
    // eslint-disable-next-line
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  const { params: swiperParams, rest: restProps } = getParams(rest);

  return (
    <div
      ref={swiperElRef}
      className={`swiper-container${className ? ` ${className}` : ''}`}
      {...restProps}
    >
      {needsNavigation(swiperParams) && (
        <>
          <div ref={prevElRef} className="swiper-button-prev"></div>
          <div ref={nextElRef} className="swiper-button-next"></div>
        </>
      )}
      {needsScrollbar(swiperParams) && (
        <div ref={scrollbarElRef} className="swiper-scrollbar"></div>
      )}
      {needsPagination(swiperParams) && (
        <div ref={paginationElRef} className="swiper-pagination"></div>
      )}
      <div className="swiper-wrapper">{children}</div>
    </div>
  );
};

Swiper.displayName = 'Swiper';

export { Swiper };
