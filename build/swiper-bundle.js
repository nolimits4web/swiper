var swiper = new Swiper({
    el: '.swiper-container',
    initialSlide: 2,
    spaceBetween: 50,
    slidesPerView: 2,
    centeredSlides: true,
    slideToClickedSlide: true,
    grabCursor: true,
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    mousewheel: {
      enabled: true,
    },
    keyboard: {
      enabled: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });