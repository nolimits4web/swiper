<script>
  import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Thumbs } from '../build/core';
  import { Swiper, SwiperSlide } from '../build/svelte';

  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs]);

  let thumbsSwiper = null;

  const slides = [0, 1, 2, 3, 4, 5, 6, 7];

  const setThumbsSwiper = (e) => {
    const [swiper] = e.detail;
    setTimeout(() => {
      thumbsSwiper = swiper;
    });
  };
</script>

<main>
  <Swiper thumbs={{ swiper: thumbsSwiper }} slidesPerView={1} spaceBetween={50} navigation>
    {#each slides as slide, index (index)}
      <SwiperSlide>Slide {slide + 1}</SwiperSlide>
    {/each}
  </Swiper>
  <Swiper
    on:swiper={setThumbsSwiper}
    slidesPerView={5}
    spaceBetween={10}
    navigation
    watchSlidesVisibility
    watchSlidesProgress>
    {#each slides as slide, index (index)}
      <SwiperSlide>Slide {slide + 1}</SwiperSlide>
    {/each}
  </Swiper>
</main>
