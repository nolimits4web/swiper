module.exports = [
  {
    path: 'package/swiper-bundle.js',
    name: 'UMD bundle',
    limit: '40 KB',
  },
  {
    path: 'package/swiper-bundle.esm.js',
    name: 'ESM bundle',
    import: 'Swiper',
    limit: '40 KB',
  },
  {
    path: 'package/swiper.esm.js',
    name: 'ESM core + all components',
    import:
      'SwiperCore, { Navigation, Pagination, Virtual, Keyboard, Mousewheel, Scrollbar, Parallax, Zoom, Lazy, Controller, A11y, History, HashNavigation, Autoplay, EffectFade, EffectCube, EffectFlip, EffectCoverflow, Thumbs }',
    limit: '40 KB',
  },
  {
    path: 'package/swiper.esm.js',
    name: 'ESM core',
    import: 'SwiperCore',
    limit: '20 KB',
  },
];
