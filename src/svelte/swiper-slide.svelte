<div
  bind:this={slideEl}
  class={uniqueClasses(`${slideClasses}${className ? ` ${className}` : ''}`)}
  {...$$restProps}
>
  {#if zoom}
    <div
      class="swiper-zoom-container"
      data-swiper-zoom={typeof zoom === 'number' ? zoom : undefined}
    >
      <slot data={slideData} />
    </div>
  {:else}
    <slot data={slideData} />
  {/if}
</div>
<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate, tick } from 'svelte';
  import { uniqueClasses } from './utils';

  export let zoom = undefined;

  let className = undefined;
  export { className as class };

  let slideEl = null;
  let slideClasses = 'swiper-slide';

  let swiper = null;

  const updateClasses = (_, el, classNames) => {
    if (el === slideEl) {
      slideClasses = classNames;
    }
  }

  $: slideData = {
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

  afterUpdate(() => {
    if (!slideEl) return;
    tick().then(() => {
      swiper = slideEl.parentElement.parentElement.swiper;
      if (!swiper) return;
      if (swiper.destroyed) {
        if (slideClasses !== 'swiper-slide') {
          slideClasses = 'swiper-slide';
        }
        return;
      }
      swiper.on('_slideClass', updateClasses);
    })
  });

  beforeUpdate(() => {
    if (!swiper) return;
    swiper.off('_slideClass', updateClasses);
  });

</script>
