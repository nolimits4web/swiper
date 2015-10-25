var version = '3.1.7';

Package.describe({
  name: 'nolimits4web:swiper',
  summary: 'iDangero.us Swiper - free and most modern mobile touch slider with hardware accelerated transitions and amazing native behavior.',
  version: version,
  git: 'https://github.com/nolimits4web/Swiper',
  documentation: 'https://github.com/nolimits4web/Swiper/blob/master/README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.addFiles([
    'dist/css/swiper.min.css',
    'dist/js/swiper.js'
    ], ['client']
  );

  // Since swiper is attached to window, we do not need to export Swiper
  // api.export('Swiper');
});

Package.onTest(function (api) {
});
