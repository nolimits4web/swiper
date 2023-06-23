import {
  h,
  ref,
  onMounted,
  onUpdated,
  onBeforeUpdate,
  computed,
  onBeforeUnmount,
  provide,
} from 'vue';
import { uniqueClasses } from '../components-shared/utils.mjs';

const SwiperSlide = {
  name: 'SwiperSlide',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    swiperRef: { type: Object, required: false },
    swiperSlideIndex: { type: Number, default: undefined, required: false },
    zoom: { type: Boolean, default: undefined, required: false },
    lazy: { type: Boolean, default: false, required: false },
    virtualIndex: {
      type: [String, Number],
      default: undefined,
    },
  },
  setup(props, { slots }) {
    let eventAttached = false;
    const { swiperRef } = props;
    const slideElRef = ref(null);
    const slideClasses = ref('swiper-slide');
    const lazyLoaded = ref(false);

    function updateClasses(swiper, el, classNames) {
      if (el === slideElRef.value) {
        slideClasses.value = classNames;
      }
    }

    onMounted(() => {
      if (!swiperRef || !swiperRef.value) return;
      swiperRef.value.on('_slideClass', updateClasses);
      eventAttached = true;
    });

    onBeforeUpdate(() => {
      if (eventAttached || !swiperRef || !swiperRef.value) return;
      swiperRef.value.on('_slideClass', updateClasses);
      eventAttached = true;
    });

    onUpdated(() => {
      if (!slideElRef.value || !swiperRef || !swiperRef.value) return;
      if (typeof props.swiperSlideIndex !== 'undefined') {
        slideElRef.value.swiperSlideIndex = props.swiperSlideIndex;
      }
      if (swiperRef.value.destroyed) {
        if (slideClasses.value !== 'swiper-slide') {
          slideClasses.value = 'swiper-slide';
        }
      }
    });

    onBeforeUnmount(() => {
      if (!swiperRef || !swiperRef.value) return;
      swiperRef.value.off('_slideClass', updateClasses);
    });

    const slideData = computed(() => ({
      isActive: slideClasses.value.indexOf('swiper-slide-active') >= 0,
      isVisible: slideClasses.value.indexOf('swiper-slide-visible') >= 0,
      isPrev: slideClasses.value.indexOf('swiper-slide-prev') >= 0,
      isNext: slideClasses.value.indexOf('swiper-slide-next') >= 0,
    }));
    provide('swiperSlide', slideData);

    const onLoad = () => {
      lazyLoaded.value = true;
    };

    return () => {
      return h(
        props.tag,
        {
          class: uniqueClasses(`${slideClasses.value}`),
          ref: slideElRef,
          'data-swiper-slide-index':
            typeof props.virtualIndex === 'undefined' &&
            swiperRef &&
            swiperRef.value &&
            swiperRef.value.params.loop
              ? props.swiperSlideIndex
              : props.virtualIndex,
          onLoadCapture: onLoad,
        },
        props.zoom
          ? h(
              'div',
              {
                class: 'swiper-zoom-container',
                'data-swiper-zoom': typeof props.zoom === 'number' ? props.zoom : undefined,
              },
              [
                slots.default && slots.default(slideData.value),
                props.lazy && !lazyLoaded.value && h('div', { class: 'swiper-lazy-preloader' }),
              ],
            )
          : [
              slots.default && slots.default(slideData.value),
              props.lazy && !lazyLoaded.value && h('div', { class: 'swiper-lazy-preloader' }),
            ],
      );
    };
  },
};

export { SwiperSlide };
