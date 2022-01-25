<script>
  import { getContext } from 'svelte';

  const swiper = getContext('swiper');
  const slideData = getContext('swiperSlide');
</script>

<div style="line-height: 1; margin-top: 20px;">
  <slot /> - {$slideData.isActive} - {$slideData.isNext}
  <button
    on:click={() => {
      swiper.slideNext();
    }}>Next</button
  >
</div>
