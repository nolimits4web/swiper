module.exports = [
  {
    path: 'package/swiper-bundle.js',
    limit: '40 KB',
  },
  {
    path: 'package/swiper.esm.js',
    import: 'SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Virtual, Zoom }',
    limit: '30 KB',
  },
  {
    path: 'package/swiper.esm.js',
    import: 'SwiperCore, { Navigation, Pagination }',
    limit: '25 KB',
  },
];
