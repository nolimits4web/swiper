<script>
  import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Virtual } from '../../build/core';
  import { Swiper, SwiperSlide } from '../../build/svelte';

  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Virtual]);

  const virtualSlides = Array.from({ length: 5 }).map((slides, index) => `Slide ${index + 1}`);
</script>

<main>
  <Swiper
    on:swiper={(e) => (window.swiper = e.detail[0])}
    slidesPerView={3}
    spaceBetween={50}
    navigation
    scrollbar={{ draggable: true }}
    pagination={{ clickable: true }}
    virtual={{ slides: virtualSlides }}
    let:virtualData={{ slides, offset, from }}
  >
    {#each slides as slide, index (from + index)}
      <SwiperSlide virtualIndex={from + index} style={`left: ${offset}px`}>{slide}</SwiperSlide>
    {/each}
  </Swiper>
</main>
