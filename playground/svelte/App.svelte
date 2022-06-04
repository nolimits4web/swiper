<script>
  // eslint-disable-next-line
  import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    // eslint-disable-next-line
  } from 'swiper';
  // eslint-disable-next-line
  import { Swiper, SwiperSlide } from 'swiper/svelte/swiper-svelte.js';
</script>

<main>
  <Swiper
    on:swiper={(e) => (window.swiper = e.detail[0])}
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    slidesPerView={1}
    spaceBetween={50}
    navigation
    scrollbar={{ draggable: true }}
    pagination={{ clickable: true }}
    watchSlidesProgress
  >
    <SwiperSlide let:data>Slide 1 {JSON.stringify(data)}</SwiperSlide>
    <SwiperSlide let:data={{ isActive }}>Slide 2</SwiperSlide>
    <SwiperSlide let:data={{ isActive }}>Slide 3 {isActive}</SwiperSlide>
    <SwiperSlide let:data={{ isActive }}>Slide 4 {isActive}</SwiperSlide>
    <SwiperSlide let:data={{ isActive }}>Slide 5 {isActive}</SwiperSlide>
  </Swiper>
</main>
