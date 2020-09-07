import { h, ref, onUpdated, onBeforeUpdate } from 'vue';
import { uniqueClasses } from './utils';

const SwiperSlide = {
  name: 'SwiperSlide',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    swiperRef: Object,
    zoom: { type: Boolean, default: undefined },
  },
  setup(props, { slots }) {
    const { tag: Tag, class: className = '', swiperRef, zoom } = props;
    const slideElRef = ref(null);
    const slideClasses = ref('swiper-slide');

    function updateClasses(swiper, el, classNames) {
      if (el === slideElRef.value) {
        slideClasses.value = classNames;
      }
    }

    onUpdated(() => {
      if (!slideElRef.value || !swiperRef || !swiperRef.value) return;
      if (swiperRef.value.destroyed) {
        if (slideClasses.value !== 'swiper-slide') {
          slideClasses.value = 'swiper-slide';
        }
        return;
      }
      swiperRef.value.on('_slideClass', updateClasses);
    });
    onBeforeUpdate(() => {
      if (!swiperRef || !swiperRef.value) return;
      swiperRef.value.off('_slideClass', updateClasses);
    });

    const slideData = () => ({
      isActive:
        slideClasses.value.indexOf('swiper-slide-active') >= 0 ||
        slideClasses.value.indexOf('swiper-slide-duplicate-active') >= 0,
      isVisible: slideClasses.value.indexOf('swiper-slide-visible') >= 0,
      isDuplicate: slideClasses.value.indexOf('swiper-slide-duplicate') >= 0,
      isPrev:
        slideClasses.value.indexOf('swiper-slide-prev') >= 0 ||
        slideClasses.value.indexOf('swiper-slide-duplicate-prev') >= 0,
      isNext:
        slideClasses.value.indexOf('swiper-slide-next') >= 0 ||
        slideClasses.value.indexOf('swiper-slide-duplicate next') >= 0,
    });
    return () =>
      h(
        Tag,
        {
          class: uniqueClasses(`${slideClasses.value}${className ? ` ${className}` : ''}`),
          ref: slideElRef,
        },
        zoom
          ? h(
              'div',
              {
                class: 'swiper-zoom-container',
                'data-swiper-zoom': typeof zoom === 'number' ? zoom : undefined,
              },
              slots.default(slideData()),
            )
          : slots.default(slideData()),
      );
  },
};

export { SwiperSlide };
