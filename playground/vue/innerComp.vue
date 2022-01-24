<template>
  test - {{ swiperSlide.isActive }} - {{ swiperSlide.isNext }}
  <button @click="swiper.slideNext()">Next</button>
</template>
<script>
import { inject } from 'vue';
export default {
  setup() {
    const swiper = inject('swiper');
    const swiperSlide = inject('swiperSlide');
    console.log({ swiper, swiperSlide });
    return {
      swiper,
      swiperSlide,
    };
    // console.log(swiper, slideData);
  },
};
</script>
