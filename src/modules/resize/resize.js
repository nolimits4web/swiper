export default {
  name: 'resize',
  on: {
    init() {
      const swiper = this;
      // Emit resize
      window.addEventListener('resize', () => {
        swiper.emit('resize');
      }, false);

      // Emit orientationchange
      window.addEventListener('orientationchange', () => {
        swiper.emit('orientationchange');
      });
    },
  },
};
