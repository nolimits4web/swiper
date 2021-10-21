<script>
  // eslint-disable-next-line
  import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Virtual,
    // eslint-disable-next-line
  } from 'swiper';
  // eslint-disable-next-line
  import { Swiper, SwiperSlide } from 'swiper/svelte/swiper-svelte.js';

  const data = {
    min: 1,
    max: 5,
  };

  let virtualSlides = Array.from({ length: 5 }).map((slide, index) => `Slide ${index + 1}`);

  function prependSlide() {
    data.min -= 1;
    virtualSlides.unshift(`Slide ${data.min}`);
    // to trigget Svelte update
    virtualSlides = [...virtualSlides];
    window.swiper.slideNext(0);
  }

  function appendSlide() {
    data.max += 1;
    virtualSlides.push(`Slide ${data.max}`);
    // to trigget Svelte update
    virtualSlides = [...virtualSlides];
  }
</script>

<main>
  <Swiper
    on:swiper={(e) => (window.swiper = e.detail[0])}
    modules={[Navigation, Pagination, Scrollbar, A11y, Virtual]}
    slidesPerView={1}
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

  <button on:click={prependSlide}>Prepend</button>
  <button on:click={appendSlide}>Append</button>
</main>
