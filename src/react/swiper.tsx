import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ForwardedRef,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import SwiperCore from '../swiper';
import { getParams } from '../components-shared/get-params';
import { mountSwiper } from '../components-shared/mount-swiper';
import {
  needsScrollbar,
  needsNavigation,
  needsPagination,
  uniqueClasses,
  extend,
  wrapperClass,
} from '../components-shared/utils';
import { getChangedParams } from '../components-shared/get-changed-params';
import { getChildren } from './get-children';
import { updateSwiper } from '../components-shared/update-swiper';
import { renderVirtual, type VirtualData } from './virtual';
import { updateOnVirtualData } from '../components-shared/update-on-virtual-data';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';
import { SwiperContext } from './context';
import type {
  Swiper as SwiperClass,
  SwiperOptions,
  SwiperEventHandler,
} from '../core/core';

type DropEvents =
  | 'onProgress'
  | 'onClick'
  | 'onTouchEnd'
  | 'onTouchMove'
  | 'onTouchStart'
  | 'onTransitionEnd'
  | 'onKeyPress'
  | 'onDoubleClick'
  | 'onScroll'
  | 'onResize';

export interface SwiperProps
  extends Omit<HTMLAttributes<HTMLElement>, DropEvents>,
    SwiperOptions {
  tag?: string;
  wrapperTag?: string;
  onSwiper?: (swiper: SwiperClass) => void;
  children?: ReactNode;
}

const Swiper = forwardRef<HTMLElement, SwiperProps>(function Swiper(propsArg, externalElRef) {
  const {
    className,
    tag: Tag = 'div',
    wrapperTag: WrapperTag = 'div',
    children,
    onSwiper,
    ...rest
  } = propsArg ?? {};

  let eventsAssigned = false;
  const [containerClasses, setContainerClasses] = useState('swiper');
  const [virtualData, setVirtualData] = useState<VirtualData | null>(null);
  const [breakpointChanged, setBreakpointChanged] = useState(false);
  const initializedRef = useRef(false);
  const swiperElRef = useRef<HTMLElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const oldPassedParamsRef = useRef<Record<string, unknown> | null>(null);
  const oldSlides = useRef<ReturnType<typeof getChildren>['slides'] | null>(null);

  const nextElRef = useRef<HTMLDivElement | null>(null);
  const prevElRef = useRef<HTMLDivElement | null>(null);
  const paginationElRef = useRef<HTMLDivElement | null>(null);
  const scrollbarElRef = useRef<HTMLDivElement | null>(null);

  const {
    params: swiperParams,
    passedParams,
    rest: restProps,
    events,
  } = getParams(rest as Record<string, unknown>);

  const { slides, slots } = getChildren(children);

  const onBeforeBreakpoint = (): void => {
    setBreakpointChanged(!breakpointChanged);
  };

  Object.assign(swiperParams.on as Record<string, SwiperEventHandler>, {
    _containerClasses(_swiper: SwiperClass, classes: string) {
      setContainerClasses(classes);
    },
  });

  const initSwiper = (): void => {
    Object.assign(swiperParams.on as Record<string, SwiperEventHandler>, events);
    eventsAssigned = true;
    const passParams = { ...swiperParams } as SwiperOptions & { wrapperClass?: string };
    delete passParams.wrapperClass;
    swiperRef.current = new SwiperCore(passParams);
    const instance = swiperRef.current;
    if (instance.virtual && instance.params.virtual?.enabled) {
      instance.virtual.slides = slides;
      const extendWith = {
        cache: false,
        slides,
        renderExternal: setVirtualData,
        renderExternalUpdate: false,
      };
      extend(instance.params.virtual, extendWith);
      if (instance.originalParams.virtual) extend(instance.originalParams.virtual, extendWith);
    }
  };

  if (!swiperElRef.current) {
    initSwiper();
  }

  if (swiperRef.current) {
    swiperRef.current.on('_beforeBreakpoint', onBeforeBreakpoint);
  }

  const attachEvents = (): void => {
    if (eventsAssigned || !events || !swiperRef.current) return;
    Object.keys(events).forEach((eventName) => {
      swiperRef.current!.on(eventName, events[eventName]!);
    });
  };

  const detachEvents = (): void => {
    if (!events || !swiperRef.current) return;
    Object.keys(events).forEach((eventName) => {
      swiperRef.current!.off(eventName, events[eventName]!);
    });
  };

  useEffect(() => {
    return () => {
      if (swiperRef.current) swiperRef.current.off('_beforeBreakpoint', onBeforeBreakpoint);
    };
  });

  useEffect(() => {
    if (!initializedRef.current && swiperRef.current) {
      swiperRef.current.emitSlidesClasses();
      initializedRef.current = true;
    }
  });

  useIsomorphicLayoutEffect(() => {
    if (externalElRef) {
      if (typeof externalElRef === 'function') {
        externalElRef(swiperElRef.current);
      } else {
        (externalElRef as MutableRefObject<HTMLElement | null>).current = swiperElRef.current;
      }
    }
    if (!swiperElRef.current) return;
    if (swiperRef.current && swiperRef.current.destroyed) {
      initSwiper();
    }

    mountSwiper(
      {
        el: swiperElRef.current,
        nextEl: nextElRef.current,
        prevEl: prevElRef.current,
        paginationEl: paginationElRef.current,
        scrollbarEl: scrollbarElRef.current,
        swiper: swiperRef.current!,
      },
      swiperParams,
    );

    if (onSwiper && swiperRef.current && !swiperRef.current.destroyed) onSwiper(swiperRef.current);
    return () => {
      if (swiperRef.current && !swiperRef.current.destroyed) {
        swiperRef.current.destroy(true, false);
      }
    };
  }, []);

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

  useIsomorphicLayoutEffect(() => {
    updateOnVirtualData(swiperRef.current);
  }, [virtualData]);

  function renderSlides(): ReactNode {
    if (swiperParams.virtual) {
      return renderVirtual(swiperRef.current, slides, virtualData);
    }
    return slides.map((child, index) =>
      React.cloneElement(child, { swiper: swiperRef.current, swiperSlideIndex: index }),
    );
  }

  const TagComponent = Tag as ElementType;
  const WrapperComponent = WrapperTag as ElementType;

  return (
    <TagComponent
      ref={swiperElRef as ForwardedRef<HTMLElement>}
      className={uniqueClasses(`${containerClasses}${className ? ` ${className}` : ''}`)}
      {...(restProps as HTMLAttributes<HTMLElement>)}
    >
      <SwiperContext.Provider value={swiperRef.current}>
        {slots['container-start']}
        <WrapperComponent className={wrapperClass(swiperParams.wrapperClass)}>
          {slots['wrapper-start']}
          {renderSlides()}
          {slots['wrapper-end']}
        </WrapperComponent>
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
    </TagComponent>
  );
});

Swiper.displayName = 'Swiper';

export { Swiper };
