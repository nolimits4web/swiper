import React, { useRef, useState, useEffect } from 'react';
import { getParams } from './get-params';
import { initSwiper } from './init-swiper';
import { needsScrollbar, needsNavigation, needsPagination, uniqueClasses } from './utils';

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

  const { params: swiperParams, rest: restProps } = getParams(rest, setContainerClasses);

  // right after init
  useEffect(() => {
    if (!initializedRef.current && swiperRef.current) {
      swiperRef.current.emitSlidesClasses();
      initializedRef.current = true;
    }
  });

  // init swiper
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
      swiperParams,
    );

    if (onSwiper) onSwiper(swiperRef.current);
    // eslint-disable-next-line
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  // bypass swiper instance to slides
  function renderSlides() {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { swiper: swiperRef.current });
    });
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
