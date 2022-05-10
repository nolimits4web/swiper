import { createEffect, createSignal, onCleanup, splitProps } from 'solid-js';
import { uniqueClasses } from './utils.js';
import { SwiperSlideContext } from './context.js';

const SwiperSlide = (props) => {
  const [local, rest] = splitProps(props, [
    'children',
    'class',
    'ref',
    'swiper',
    'Tag',
    'virtualIndex',
    'zoom',
  ]);

  const [slideClasses, setSlideClasses] = createSignal('swiper-slide');

  function updateClasses(_s, el, classNames) {
    if (el === local.ref) {
      setSlideClasses(classNames);
    }
  }
  createEffect(() => {
    if (!local.ref || !local.swiper) {
      return;
    }
    if (local.swiper.destroyed) {
      if (slideClasses !== 'swiper-slide') {
        setSlideClasses('swiper-slide');
      }
      return;
    }
    local.swiper.on('_slideClass', updateClasses);
    // eslint-disable-next-line
    onCleanup(() => {
      if (!local.swiper) return;
      local.swiper.off('_slideClass', updateClasses);
    });
  });
  createEffect(() => {
    if (local.swiper && local.ref && !local.swiper.destroyed) {
      setSlideClasses(local.swiper.getSlideClasses(local.ref));
    }
  });

  const slideData = {
    isActive:
      slideClasses.indexOf('swiper-slide-active') >= 0 ||
      slideClasses.indexOf('swiper-slide-duplicate-active') >= 0,
    isVisible: slideClasses.indexOf('swiper-slide-visible') >= 0,
    isDuplicate: slideClasses.indexOf('swiper-slide-duplicate') >= 0,
    isPrev:
      slideClasses.indexOf('swiper-slide-prev') >= 0 ||
      slideClasses.indexOf('swiper-slide-duplicate-prev') >= 0,
    isNext:
      slideClasses.indexOf('swiper-slide-next') >= 0 ||
      slideClasses.indexOf('swiper-slide-duplicate-next') >= 0,
  };

  const renderChildren = () => {
    return typeof local.children === 'function' ? local.children(slideData) : local.children;
  };

  /* eslint-disable react/react-in-jsx-scope */
  /* eslint-disable react/no-unknown-property */

  return (
    <local.Tag
      ref={local.ref}
      class={uniqueClasses(`${slideClasses}${local.class ? ` ${local.class}` : ''}`)}
      data-swiper-slide-index={local.virtualIndex}
      {...rest}
    >
      <SwiperSlideContext.Provider value={slideData}>
        {local.zoom ? (
          <div
            className="swiper-zoom-container"
            data-swiper-zoom={typeof local.zoom === 'number' ? local.zoom : undefined}
          >
            {renderChildren()}
          </div>
        ) : (
          renderChildren()
        )}
      </SwiperSlideContext.Provider>
    </local.Tag>
  );
};

SwiperSlide.displayName = 'SwiperSlide';

export { SwiperSlide };
