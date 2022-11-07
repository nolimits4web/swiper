<script>
  import { onMount, onDestroy, afterUpdate, createEventDispatcher, tick, setContext } from 'svelte';
  import Swiper from 'swiper';
  import { getParams } from '../components-shared/get-params.js';
  import { mountSwiper } from '../components-shared/mount-swiper.js';
  import {
    needsScrollbar,
    needsNavigation,
    needsPagination,
    uniqueClasses,
    extend,
  } from '../components-shared/utils.js';
  import { getChangedParams } from '../components-shared/get-changed-params.js';
  import { updateSwiper } from '../components-shared/update-swiper.js';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let tag = 'div';
  export let wrapperTag = 'div';

  let containerClasses = 'swiper';
  let breakpointChanged = false;
  let swiperInstance = null;
  let oldPassedParams = null;

  let paramsData;
  let swiperParams;
  let passedParams;
  let restProps;

  let swiperEl = null;
  let prevEl = null;
  let nextEl = null;
  let scrollbarEl = null;
  let paginationEl = null;
  let virtualData = { slides: [] };

  export function swiper() {
    return swiperInstance;
  }

  const setVirtualData = (data) => {
    virtualData = data;

    tick().then(() => {
      swiperInstance.$wrapperEl.children('.swiper-slide').each((el) => {
        if (el.onSwiper) el.onSwiper(swiperInstance);
      });
      swiperInstance.updateSlides();
      swiperInstance.updateProgress();
      swiperInstance.updateSlidesClasses();
      if (swiperInstance.lazy && swiperInstance.params.lazy.enabled) {
        swiperInstance.lazy.load();
      }
    });
  };

  const calcParams = () => {
    paramsData = getParams($$restProps);
    swiperParams = paramsData.params;
    passedParams = paramsData.passedParams;
    restProps = paramsData.rest;
  };

  calcParams();
  oldPassedParams = passedParams;

  const onBeforeBreakpoint = () => {
    breakpointChanged = true;
  };

  swiperParams.onAny = (event, ...args) => {
    dispatch(event, args);
  };
  Object.assign(swiperParams.on, {
    _beforeBreakpoint: onBeforeBreakpoint,
    _containerClasses(_swiper, classes) {
      containerClasses = classes;
    },
  });

  swiperInstance = new Swiper(swiperParams);
  setContext('swiper', swiperInstance);
  if (swiperInstance.virtual && swiperInstance.params.virtual.enabled) {
    const extendWith = {
      cache: false,
      renderExternal: (data) => {
        setVirtualData(data);
        if (swiperParams.virtual && swiperParams.virtual.renderExternal) {
          swiperParams.virtual.renderExternal(data);
        }
      },
      renderExternalUpdate: false,
    };
    extend(swiperInstance.params.virtual, extendWith);
    extend(swiperInstance.originalParams.virtual, extendWith);
  }

  onMount(() => {
    if (!swiperEl) return;
    mountSwiper(
      {
        el: swiperEl,
        nextEl: nextEl,
        prevEl: prevEl,
        paginationEl: paginationEl,
        scrollbarEl: scrollbarEl,
        swiper: swiperInstance,
      },
      swiperParams,
    );
    dispatch('swiper', [swiperInstance]);
    if (swiperParams.virtual) return;
    swiperInstance.slides.each((el) => {
      if (el.onSwiper) el.onSwiper(swiperInstance);
    });
  });

  afterUpdate(() => {
    if (!swiperInstance) return;
    calcParams();

    const changedParams = getChangedParams(passedParams, oldPassedParams);
    if (
      (changedParams.length || breakpointChanged) &&
      swiperInstance &&
      !swiperInstance.destroyed
    ) {
      updateSwiper({
        swiper: swiperInstance,
        passedParams,
        changedParams,
        nextEl,
        prevEl,
        scrollbarEl,
        paginationEl,
      });
    }
    breakpointChanged = false;
    oldPassedParams = passedParams;
  });

  onDestroy(() => {
    // eslint-disable-next-line
    if (typeof window !== 'undefined' && swiperInstance && !swiperInstance.destroyed) {
      swiperInstance.destroy(true, false);
    }
  });
</script>

<svelte:element
  this={tag}
  bind:this={swiperEl}
  class={uniqueClasses(`${containerClasses}${className ? ` ${className}` : ''}`)}
  {...restProps}
>
  <slot name="container-start" />
  <svelte:element this={wrapperTag} class="swiper-wrapper">
    <slot name="wrapper-start" />
    <slot {virtualData} />
    <slot name="wrapper-end" />
  </svelte:element>
  {#if needsNavigation(swiperParams)}
    <div bind:this={prevEl} class="swiper-button-prev" />
    <div bind:this={nextEl} class="swiper-button-next" />
  {/if}
  {#if needsScrollbar(swiperParams)}
    <div bind:this={scrollbarEl} class="swiper-scrollbar" />
  {/if}
  {#if needsPagination(swiperParams)}
    <div bind:this={paginationEl} class="swiper-pagination" />
  {/if}
  <slot name="container-end" />
</svelte:element>
