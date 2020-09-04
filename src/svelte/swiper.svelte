<div
  bind:this={swiperEl}
  class={uniqueClasses(`${containerClasses}${className ? ` ${className}` : ''}`)}
  {...restProps}
>
  <slot name="content-start" />
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
  <div class="swiper-wrapper">
    <slot name="wrapper-start" />
    <slot />
    <slot name="wrapper-end" />
  </div>
  <slot name="content-end" />
</div>

<script>
  import { onMount, onDestroy, afterUpdate, createEventDispatcher } from 'svelte';
  import { getParams } from './get-params';
  import { initSwiper } from './init-swiper';
  import { needsScrollbar, needsNavigation, needsPagination, uniqueClasses } from './utils';
  import { getChangedParams } from './get-changed-params';
  import { updateSwiper } from './update-swiper';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  let containerClasses = 'swiper-container';
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

  export function swiper() {
    return swiperInstance;
  }

  const calcParams = () => {
    paramsData = getParams($$restProps);
    swiperParams = paramsData.params;
    passedParams = paramsData.passedParams;
    restProps = paramsData.rest;
  }

  calcParams();
  oldPassedParams = passedParams;

  swiperParams.onAny = (event, ...args) => {
    dispatch(event, [args]);
  };
  Object.assign(swiperParams.on, {
    _containerClasses(_swiper, classes) {
      containerClasses = classes;
    },
    _swiper(_swiper) {
      swiperInstance = _swiper;
      dispatch('swiper', [_swiper]);
    },
  });

  onMount(() => {
    if (!swiperEl) return;
    initSwiper(
      {
        el: swiperEl,
        nextEl: nextEl,
        prevEl: prevEl,
        paginationEl: paginationEl,
        scrollbarEl: scrollbarEl,
      },
      swiperParams,
    );
  });

  afterUpdate(() => {
    if (!swiperInstance) return;
    calcParams();
    const changedParams = getChangedParams(
      passedParams,
      oldPassedParams,
    );

    updateSwiper(swiperInstance, passedParams, changedParams);
    oldPassedParams = passedParams;
  });

  onDestroy(() => {
    if (swiperInstance && !swiperInstance.destroyed) {
      swiperInstance.destroy();
    }
  });

</script>
