import { elementChildren, isObject, elementNextAll, elementPrevAll } from '../../shared/utils.js';

export default function Thumb({ swiper, extendParams, on }) {
  extendParams({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: true,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'swiper-slide-thumb-active',
      thumbsContainerClass: 'swiper-thumbs',
    },
  });

  let initialized = false;
  let swiperCreated = false;

  swiper.thumbs = {
    swiper: null,
  };

  function onThumbClick() {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;

    const clickedIndex = thumbsSwiper.clickedIndex;
    const clickedSlide = thumbsSwiper.clickedSlide;
    if (clickedSlide && clickedSlide.classList.contains(swiper.params.thumbs.slideThumbActiveClass))
      return;
    if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
    let slideToIndex;
    if (thumbsSwiper.params.loop) {
      slideToIndex = parseInt(
        thumbsSwiper.clickedSlide.getAttribute('data-swiper-slide-index'),
        10,
      );
    } else {
      slideToIndex = clickedIndex;
    }
    if (swiper.params.loop) {
      const currentIndex = swiper.activeIndex;

      const prevIndex = swiper.slides.indexOf(
        elementPrevAll(
          swiper.slides[currentIndex],
          `[data-swiper-slide-index="${slideToIndex}"]`,
        )[0],
      );
      const nextIndex = swiper.slides.indexOf(
        elementNextAll(
          swiper.slides[currentIndex],
          `[data-swiper-slide-index="${slideToIndex}"]`,
        )[0],
      );

      if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;
      else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;
      else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;
      else slideToIndex = prevIndex;
    }
    swiper.slideTo(slideToIndex);
  }

  function init() {
    const { thumbs: thumbsParams } = swiper.params;
    if (initialized) return false;
    initialized = true;
    const SwiperClass = swiper.constructor;
    if (thumbsParams.swiper instanceof SwiperClass) {
      swiper.thumbs.swiper = thumbsParams.swiper;
      Object.assign(swiper.thumbs.swiper.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false,
      });
      Object.assign(swiper.thumbs.swiper.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false,
      });
      swiper.thumbs.swiper.update();
    } else if (isObject(thumbsParams.swiper)) {
      const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
      Object.assign(thumbsSwiperParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false,
      });
      swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
      swiperCreated = true;
    }
    swiper.thumbs.swiper.el.classList.add(swiper.params.thumbs.thumbsContainerClass);
    swiper.thumbs.swiper.on('tap', onThumbClick);
    return true;
  }

  function update(initial) {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;

    const slidesPerView =
      thumbsSwiper.params.slidesPerView === 'auto'
        ? thumbsSwiper.slidesPerViewDynamic()
        : thumbsSwiper.params.slidesPerView;

    // Activate thumbs
    let thumbsToActivate = 1;
    const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
      thumbsToActivate = swiper.params.slidesPerView;
    }

    if (!swiper.params.thumbs.multipleActiveThumbs) {
      thumbsToActivate = 1;
    }

    thumbsToActivate = Math.floor(thumbsToActivate);

    thumbsSwiper.slides.removeClass(thumbActiveClass);
    if (
      thumbsSwiper.params.loop ||
      (thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled)
    ) {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        elementChildren(
          thumbsSwiper.wrapperEl,
          `[data-swiper-slide-index="${swiper.realIndex + i}"]`,
        ).forEach((slideEl) => {
          slideEl.classList.add(thumbActiveClass);
        });
      }
    } else {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        thumbsSwiper.slides[swiper.realIndex + i].classList.add(thumbActiveClass);
      }
    }

    const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
    const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
    if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
      const currentThumbsIndex = thumbsSwiper.activeIndex;
      let newThumbsIndex;
      let direction;
      if (thumbsSwiper.params.loop) {
        // Find actual thumbs index to slide to
        const prevThumbsIndex = thumbsSwiper.slides.indexOf(
          elementPrevAll(
            thumbsSwiper.slides[currentThumbsIndex],
            `[data-swiper-slide-index="${swiper.realIndex}"]`,
          )[0],
        );
        const nextThumbsIndex = thumbsSwiper.slides.indexOf(
          elementNextAll(
            thumbsSwiper.slides[currentThumbsIndex],
            `[data-swiper-slide-index="${swiper.realIndex}"]`,
          )[0],
        );

        if (typeof prevThumbsIndex === 'undefined') {
          newThumbsIndex = nextThumbsIndex;
        } else if (typeof nextThumbsIndex === 'undefined') {
          newThumbsIndex = prevThumbsIndex;
        } else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {
          newThumbsIndex =
            thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;
        } else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {
          newThumbsIndex = nextThumbsIndex;
        } else {
          newThumbsIndex = prevThumbsIndex;
        }
        direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
      } else {
        newThumbsIndex = swiper.realIndex;
        direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
      }
      if (useOffset) {
        newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
      }

      if (
        thumbsSwiper.visibleSlidesIndexes &&
        thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0
      ) {
        if (thumbsSwiper.params.centeredSlides) {
          if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
          } else {
            newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
          }
        } else if (
          newThumbsIndex > currentThumbsIndex &&
          thumbsSwiper.params.slidesPerGroup === 1
        ) {
          // newThumbsIndex = newThumbsIndex - slidesPerView + 1;
        }
        thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
      }
    }
  }

  on('beforeInit', () => {
    const { thumbs } = swiper.params;
    if (!thumbs || !thumbs.swiper) return;
    if (typeof thumbs.swiper === 'string' || thumbs.swiper instanceof HTMLElement) {
      const thumbsElement = thumbs.swiper;
      if (thumbsElement.swiper) {
        thumbs.swiper = swiper;
      } else {
        const onThumbsSwiper = (e) => {
          thumbs.swiper = e.detail[0];
          thumbsElement.removeEventListener('init', onThumbsSwiper);
          init();
          update(true);
          thumbs.swiper.update();
          swiper.update();
        };
        thumbsElement.addEventListener('init', onThumbsSwiper);
        return;
      }
    }
    init();
    update(true);
  });
  on('slideChange update resize observerUpdate', () => {
    update();
  });
  on('setTransition', (_s, duration) => {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    thumbsSwiper.setTransition(duration);
  });
  on('beforeDestroy', () => {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    if (swiperCreated) {
      thumbsSwiper.destroy();
    }
  });

  Object.assign(swiper.thumbs, {
    init,
    update,
  });
}
