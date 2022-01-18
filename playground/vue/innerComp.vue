<template>
  test - {{ slideData.isActive }} - {{ slideData.isNext }}
  <button @click="swiper.slideNext()">Next</button>
</template>
<script>
import { inject } from 'vue';
export default {
  setup() {
    const swiper = inject('swiper');
    const slideData = inject('slideData');
    return {
      swiper,
      slideData,
    };
    // console.log(swiper, slideData);
  },
};
</script>
