import React, { useRef, useState, forwardRef } from 'react';
import { uniqueClasses } from './utils';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

const SwiperSlide = forwardRef(
  (
    { tag: Tag = 'div', children, className = '', swiper, zoom, virtualIndex, ...rest } = {},
    externalRef,
  ) => {
    const slideElRef = useRef(null);
    const [slideClasses, setSlideClasses] = useState('swiper-slide');

    function updateClasses(swiper, el, classNames) {
      if (el === slideElRef.current) {
        setSlideClasses(classNames);
      }
    }

    useIsomorphicLayoutEffect(() => {
      if (externalRef) {
        externalRef.current = slideElRef.current;
      }
      if (!slideElRef.current || !swiper) return;
      if (swiper.destroyed) {
        if (slideClasses !== 'swiper-slide') {
          setSlideClasses('swiper-slide');
        }
        return;
      }
      swiper.on('_slideClass', updateClasses);
      // eslint-disable-next-line
      return () => {
        if (!swiper) return;
        swiper.off('_slideClass', updateClasses);
      };
    });

    let slideData;
    if (typeof children === 'function') {
      slideData = {
        isActive:
          slideClasses.indexOf('swiper-slide-active') >= 0 ||
          slideClasses.indexOf('swiper-slide-duplicate-active') >= 0,
        isVisible: slideClasses.indexOf('swiper-slide-visible') >= 0,
        isDuplicate: slideClasses.indexOf('swiper-slide-duplicate') >= 0,
        isPrev:
          slideClasses.indexOf('swiper-slide-prev') >= 0 ||
          slideClasses.indexOf('swiper-slide-duplicate-prev') >= 0,
        isNext:
          slideClasses.indexOf('swiper-slide-next') >= 0 ||
          slideClasses.indexOf('swiper-slide-duplicate next') >= 0,
      };
    }

    const renderChildren = () => {
      return typeof children === 'function' ? children(slideData) : children;
    };

    return (
      <Tag
        ref={slideElRef}
        className={uniqueClasses(`${slideClasses}${className ? ` ${className}` : ''}`)}
        data-swiper-slide-index={virtualIndex}
        {...rest}
      >
        {zoom ? (
          <div
            className="swiper-zoom-container"
            data-swiper-zoom={typeof zoom === 'number' ? zoom : undefined}
          >
            {renderChildren()}
          </div>
        ) : (
          renderChildren()
        )}
      </Tag>
    );
  },
);

SwiperSlide.displayName = 'SwiperSlide';

export { SwiperSlide };
