<template>
  <main>
    <swiper
      @swiper="onSwiper"
      :slidesPerView="3"
      :spaceBetween="50"
      navigation
      :scrollbar="{ draggable: true }"
      :pagination="{ clickable: true }"
      :modules="modules"
    >
      <swiper-slide><innerComp>Slide 1</innerComp></swiper-slide>
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
// eslint-disable-next-line
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// eslint-disable-next-line
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue.js';
import innerComp from './innerComp.vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
    innerComp,
  },

  setup() {
    const onSwiper = (swiper) => {
      window.swiper = swiper;
    };
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
      onSwiper,
    };
  },
};
</script>
