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
    zoom: Boolean,
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
      if (!slideElRef.value || !swiperRef.value) return;
      if (swiperRef.value.destroyed) {
        if (slideClasses.value !== 'swiper-slide') {
          slideClasses.value = 'swiper-slide';
        }
        return;
      }
      swiperRef.value.on('_slideClass', updateClasses);
    });
    onBeforeUpdate(() => {
      if (!swiperRef.value) return;
      swiperRef.value.off('_slideClass', updateClasses);
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
              slots.default(),
            )
          : slots.default(),
      );
  },
};

export { SwiperSlide };
