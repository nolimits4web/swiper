import React, {
  forwardRef,
  useRef,
  useState,
  type ElementType,
  type ForwardedRef,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { uniqueClasses } from '../components-shared/utils';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';
import { SwiperSlideContext, type SwiperSlideData } from './context';
import type { Swiper as SwiperClass } from '../core/core';

interface SwiperSlideElement extends HTMLDivElement {
  swiperSlideIndex?: number;
  lazyPreloaderManaged?: boolean;
}

export interface SwiperSlideProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  tag?: string;
  zoom?: boolean | number;
  lazy?: boolean;
  virtualIndex?: number;
  swiperSlideIndex?: number;
  swiper?: SwiperClass | null;
  children?: ReactNode | ((slideData: SwiperSlideData) => ReactNode);
}

const SwiperSlide = forwardRef<HTMLElement, SwiperSlideProps>(function SwiperSlide(
  props,
  externalRef,
) {
  const {
    tag: Tag = 'div',
    children,
    className = '',
    swiper,
    zoom,
    lazy,
    virtualIndex,
    swiperSlideIndex,
    ...rest
  } = props;
  const slideElRef = useRef<SwiperSlideElement | null>(null);
  const [slideClasses, setSlideClasses] = useState('swiper-slide');
  const [lazyLoaded, setLazyLoaded] = useState(false);

  function updateClasses(_s: SwiperClass, el: HTMLElement, classNames: string): void {
    if (el === slideElRef.current) {
      setSlideClasses(classNames);
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (typeof swiperSlideIndex !== 'undefined' && slideElRef.current) {
      slideElRef.current.swiperSlideIndex = swiperSlideIndex;
    }
    if (externalRef) {
      if (typeof externalRef === 'function') {
        externalRef(slideElRef.current);
      } else {
        (externalRef as MutableRefObject<HTMLElement | null>).current = slideElRef.current;
      }
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

  const slideData: SwiperSlideData = {
    isActive: slideClasses.indexOf('swiper-slide-active') >= 0,
    isVisible: slideClasses.indexOf('swiper-slide-visible') >= 0,
    isFullyVisible: slideClasses.indexOf('swiper-slide-fully-visible') >= 0,
    isPrev: slideClasses.indexOf('swiper-slide-prev') >= 0,
    isNext: slideClasses.indexOf('swiper-slide-next') >= 0,
  };

  const renderChildren = (): ReactNode =>
    typeof children === 'function' ? children(slideData) : children;

  const onLoad = (): void => {
    setLazyLoaded(true);
  };

  const lazyPreloaderRef = (node: HTMLDivElement | null): void => {
    if (node) {
      (node as HTMLDivElement & { lazyPreloaderManaged?: boolean }).lazyPreloaderManaged = true;
    }
  };

  // Dynamic tag: forwardRef can't infer the element type from a string variable.
  const TagComponent = Tag as ElementType;

  return (
    <TagComponent
      ref={slideElRef as ForwardedRef<HTMLElement>}
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
            {lazy && !lazyLoaded && (
              <div className="swiper-lazy-preloader" ref={lazyPreloaderRef} />
            )}
          </div>
        </SwiperSlideContext.Provider>
      )}
      {!zoom && (
        <SwiperSlideContext.Provider value={slideData}>
          {renderChildren()}
          {lazy && !lazyLoaded && (
            <div className="swiper-lazy-preloader" ref={lazyPreloaderRef} />
          )}
        </SwiperSlideContext.Provider>
      )}
    </TagComponent>
  );
});

SwiperSlide.displayName = 'SwiperSlide';

export { SwiperSlide };
