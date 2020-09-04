<template>
  <main>
    <swiper
      @swiper="onSwiper"
      :slidesPerView="3"
      :spaceBetween="50"
      navigation
      :scrollbar="{ draggable: true }"
      :pagination="{ clickable: true }"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
      <swiper-slide>Slide 10</swiper-slide>
    </swiper>
  </main>
</template>
<script>
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from '../build/core';
import { Swiper, SwiperSlide } from '../build/vue';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    const onSwiper = (swiper) => {
      window.swiper = swiper;
    };
    return {
      onSwiper,
    };
  },
};
</script>
