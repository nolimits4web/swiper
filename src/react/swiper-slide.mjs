import React, { useRef, useState, forwardRef } from 'react';
import { uniqueClasses } from '../components-shared/utils.mjs';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.mjs';
import { SwiperSlideContext } from './context.mjs';

const SwiperSlide = forwardRef(
  (
    {
      tag: Tag = 'div',
      children,
      className = '',
      swiper,
      zoom,
      lazy,
      virtualIndex,
      swiperSlideIndex,
      ...rest
    } = {},
    externalRef,
  ) => {
    const slideElRef = useRef(null);
    const [slideClasses, setSlideClasses] = useState('swiper-slide');
    const [lazyLoaded, setLazyLoaded] = useState(false);
    function updateClasses(_s, el, classNames) {
      if (el === slideElRef.current) {
        setSlideClasses(classNames);
      }
    }
    useIsomorphicLayoutEffect(() => {
      if (typeof swiperSlideIndex !== 'undefined') {
        slideElRef.current.swiperSlideIndex = swiperSlideIndex;
      }
      if (externalRef) {
        externalRef.current = slideElRef.current;
      }
      if (!slideElRef.current || !swiper) {
        return;
      }
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
    useIsomorphicLayoutEffect(() => {
      if (swiper && slideElRef.current && !swiper.destroyed) {
        setSlideClasses(swiper.getSlideClasses(slideElRef.current));
      }
    }, [swiper]);

    const slideData = {
      isActive: slideClasses.indexOf('swiper-slide-active') >= 0,
      isVisible: slideClasses.indexOf('swiper-slide-visible') >= 0,
      isPrev: slideClasses.indexOf('swiper-slide-prev') >= 0,
      isNext: slideClasses.indexOf('swiper-slide-next') >= 0,
    };

    const renderChildren = () => {
      return typeof children === 'function' ? children(slideData) : children;
    };

    const onLoad = () => {
      setLazyLoaded(true);
    };

    return (
      <Tag
        ref={slideElRef}
        className={uniqueClasses(`${slideClasses}${className ? ` ${className}` : ''}`)}
        data-swiper-slide-index={virtualIndex}
        onLoad={onLoad}
        {...rest}
      >
        {zoom && (
          <SwiperSlideContext.Provider value={slideData}>
            <div
              className="swiper-zoom-container"
              data-swiper-zoom={typeof zoom === 'number' ? zoom : undefined}
            >
              {renderChildren()}
              {lazy && !lazyLoaded && <div className="swiper-lazy-preloader" />}
            </div>
          </SwiperSlideContext.Provider>
        )}
        {!zoom && (
          <SwiperSlideContext.Provider value={slideData}>
            {renderChildren()}
            {lazy && !lazyLoaded && <div className="swiper-lazy-preloader" />}
          </SwiperSlideContext.Provider>
        )}
      </Tag>
    );
  },
);

SwiperSlide.displayName = 'SwiperSlide';

export { SwiperSlide };
