import { extend } from '../../shared/utils';
import type { Swiper, SwiperOptions } from '../core';

const isGridEnabled = (swiper: Swiper, params: SwiperOptions): boolean => {
  return !!(swiper.grid && params.grid && params.grid.rows! > 1);
};

export default function setBreakpoint(this: Swiper): void {
  const swiper = this;
  const { realIndex, initialized, params, el } = swiper;
  const breakpoints = params.breakpoints;
  if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) return;

  // Get breakpoint for window/container width and update parameters
  const breakpointsBase =
    params.breakpointsBase === 'window' || !params.breakpointsBase
      ? params.breakpointsBase
      : 'container';
  const breakpointContainer =
    ['window', 'container'].includes(params.breakpointsBase as string) || !params.breakpointsBase
      ? swiper.el
      : (document.querySelector(params.breakpointsBase as string) as HTMLElement);

  const breakpoint = swiper.getBreakpoint(
    breakpoints,
    breakpointsBase as string,
    breakpointContainer,
  );

  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;

  const breakpointsRecord = breakpoints as Record<string, SwiperOptions>;
  const breakpointOnlyParams =
    breakpoint in breakpointsRecord ? breakpointsRecord[breakpoint] : undefined;
  const breakpointParams: SwiperOptions = breakpointOnlyParams || swiper.originalParams;

  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);

  const wasGrabCursor = swiper.params.grabCursor;
  const isGrabCursor = breakpointParams.grabCursor;

  const wasEnabled = params.enabled;

  if (wasMultiRow && !isMultiRow) {
    el.classList.remove(
      `${params.containerModifierClass}grid`,
      `${params.containerModifierClass}grid-column`,
    );
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el.classList.add(`${params.containerModifierClass}grid`);
    if (
      (breakpointParams.grid!.fill && breakpointParams.grid!.fill === 'column') ||
      (!breakpointParams.grid!.fill && params.grid!.fill === 'column')
    ) {
      el.classList.add(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
  }
  if (wasGrabCursor && !isGrabCursor) {
    swiper.unsetGrabCursor();
  } else if (!wasGrabCursor && isGrabCursor) {
    swiper.setGrabCursor();
  }

  // Toggle navigation, pagination, scrollbar
  type EnableableModuleProp = 'navigation' | 'pagination' | 'scrollbar';
  type EnableableModuleOptions = { enabled?: boolean } | boolean | undefined;
  const moduleOpt = (opts: SwiperOptions, prop: EnableableModuleProp): EnableableModuleOptions =>
    (opts as unknown as Record<EnableableModuleProp, EnableableModuleOptions>)[prop];
  (['navigation', 'pagination', 'scrollbar'] as const).forEach((prop) => {
    const bpOpts = moduleOpt(breakpointParams, prop);
    if (typeof bpOpts === 'undefined') return;
    const paramsOpts = moduleOpt(params, prop);
    const wasModuleEnabled =
      typeof paramsOpts === 'object' && paramsOpts !== null && paramsOpts.enabled;
    const isModuleEnabled = typeof bpOpts === 'object' && bpOpts !== null && bpOpts.enabled;
    const moduleApi = swiper[prop] as { enable?: () => void; disable?: () => void } | undefined;
    if (wasModuleEnabled && !isModuleEnabled) moduleApi?.disable?.();
    if (!wasModuleEnabled && isModuleEnabled) moduleApi?.enable?.();
  });

  const directionChanged =
    breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop =
    params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  const wasLoop = params.loop;

  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  extend(swiper.params, breakpointParams);

  const isEnabled = swiper.params.enabled;
  const hasLoop = swiper.params.loop;

  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev,
  });

  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }

  swiper.currentBreakpoint = breakpoint;

  swiper.emit('_beforeBreakpoint', breakpointParams);

  if (initialized) {
    if (needsReLoop) {
      swiper.loopDestroy();
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (!wasLoop && hasLoop) {
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (wasLoop && !hasLoop) {
      swiper.loopDestroy();
    }
  }

  swiper.emit('breakpoint', breakpointParams);
}
