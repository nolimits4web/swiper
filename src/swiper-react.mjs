import React, { useRef, useState, useEffect, useLayoutEffect, forwardRef } from 'react';
import { register } from './swiper-element.mjs';
import { getParams } from './components-shared/get-params.mjs';

function useIsomorphicLayoutEffect(callback, deps) {
  // eslint-disable-next-line
  if (typeof window === 'undefined') return useEffect(callback, deps);
  return useLayoutEffect(callback, deps);
}

const Swiper = forwardRef((props, externalElRef) => {
  const swiperRef = useRef(null);
  const swiperElRef = useRef(null);
  const { params, rest: restParams } = getParams(props);
  const { className, children, onSwiper, ...rest } = props;

  // store virtual data
  const [virtualData, setVirtualData] = useState({
    from: 0,
    to: 0,
    offset: 0,
    slides: [],
  });

  let virtualDataUpdated = false;
  const getVirtualSlides = () => {
    return (children || []).filter((c) => !!c);
  };

  const virtualDefaults = () => {
    return {
      cache: false,
      slides: getVirtualSlides(),
      renderExternal: setVirtualData,
    };
  };

  useIsomorphicLayoutEffect(() => {
    virtualDataUpdated = true;
  }, [virtualData]);

  useIsomorphicLayoutEffect(() => {
    if (virtualDataUpdated) {
      virtualDataUpdated = false;
      return;
    }
    if (!swiperRef.current) return;
    if (swiperRef.current.virtual) {
      if (params.virtual === true) {
        params.virtual = {
          enabled: true,
        };
      }
      if (params.virtual && params.virtual.enabled) {
        Object.assign(params.virtual, virtualDefaults());
        swiperRef.current.virtual.slides = getVirtualSlides();
      }
    }

    if (swiperElRef.current) {
      Object.assign(swiperElRef.current, params);
    }
  });

  useIsomorphicLayoutEffect(() => {
    // Register Swiper web component
    register();
    if (params.virtual === true) {
      params.virtual = {
        enabled: true,
      };
    }
    if (params.virtual && params.virtual.enabled) {
      Object.assign(params.virtual, virtualDefaults());
    }

    // Assign it to swiper element
    Object.assign(swiperElRef.current, params);

    // initialize swiper
    swiperElRef.current.initialize();
    swiperRef.current = swiperElRef.current.swiper;
    if (onSwiper) onSwiper(swiperRef.current);
  }, []);

  // calc slides to render
  const slides =
    params.virtual === true || (params.virtual && params.virtual.enabled)
      ? virtualData.slides.map((slide, index) =>
          // clone slide
          React.cloneElement(slide, {
            // add key
            key: virtualData.from + index,
            // set slides offset
            style: {
              [props.direction === 'vertical' ? 'top' : 'left']: virtualData.offset,
            },
            // add and swiper slide index to data attribute
            ['data-swiper-slide-index']: virtualData.from + index,
          }),
        )
      : children; // return children if virtual is disabled

  const setRefs = (r) => {
    swiperElRef.current = r;
    if (externalElRef) externalElRef.current = r;
  };
  const passProps = {
    init: false,
    ref: setRefs,
    ...restParams,
  };
  return <swiper-container {...passProps}>{slides}</swiper-container>;
});

const SwiperSlide = forwardRef((props, externalElRef) => {
  const { children, ...rest } = props;
  const passProps = {
    ref: externalElRef,
    ...rest,
  };
  return <swiper-slide {...passProps}>{children}</swiper-slide>;
});

Swiper.displayName = 'Swiper';
SwiperSlide.displayName = 'SwiperSlide';

export { Swiper, SwiperSlide };
