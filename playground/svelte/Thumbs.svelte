<script>
  // eslint-disable-next-line
  import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Thumbs,
    // eslint-disable-next-line
  } from 'swiper';
  // eslint-disable-next-line
  import { Swiper, SwiperSlide } from 'swiper/svelte/swiper-svelte.js';

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
  <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
    thumbs={{ swiper: thumbsSwiper }}
    slidesPerView={1}
    spaceBetween={50}
    navigation
  >
    {#each slides as slide, index (index)}
      <SwiperSlide>Slide {slide + 1}</SwiperSlide>
    {/each}
  </Swiper>
  <Swiper
    on:swiper={setThumbsSwiper}
    modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
    slidesPerView={5}
    spaceBetween={10}
    navigation
    watchSlidesProgress
  >
    {#each slides as slide, index (index)}
      <SwiperSlide>Slide {slide + 1}</SwiperSlide>
    {/each}
  </Swiper>
</main>
