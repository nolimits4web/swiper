<template>
  <main>
    <swiper
      @swiper="onSwiper"
      :slidesPerView="3"
      :spaceBetween="50"
      navigation
      :scrollbar="{ draggable: true }"
      :pagination="{ clickable: true }"
      virtual
    >
      <swiper-slide data-swiper-slide-index="0">Slide 1</swiper-slide>
      <swiper-slide data-swiper-slide-index="1">Slide 2</swiper-slide>
      <swiper-slide data-swiper-slide-index="2">Slide 3</swiper-slide>
      <swiper-slide data-swiper-slide-index="3">Slide 4</swiper-slide>
      <swiper-slide data-swiper-slide-index="4">Slide 5</swiper-slide>
      <swiper-slide data-swiper-slide-index="5">Slide 6</swiper-slide>
      <swiper-slide data-swiper-slide-index="6">Slide 7</swiper-slide>
      <swiper-slide data-swiper-slide-index="7">Slide 8</swiper-slide>
      <swiper-slide data-swiper-slide-index="8">Slide 9</swiper-slide>
      <swiper-slide data-swiper-slide-index="9">Slide 10</swiper-slide>
    </swiper>
  </main>
</template>
<script>
import { ref } from 'vue';
// eslint-disable-next-line
import { Swiper, SwiperSlide } from 'swiper/swiper-vue-bundle';

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
