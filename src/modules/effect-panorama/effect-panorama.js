import effectInit from '../../shared/effect-init.js';
import effectTarget from '../../shared/effect-target.js';

export default function EffectPanorama({ swiper, extendParams, on }) {
  extendParams({
    panoramaEffect: {
      depth: 200,
      rotate: 30,
    },
  });

  const setTranslate = () => {
    const { slides, slidesSizesGrid } = swiper;

    const params = swiper.params.panoramaEffect;
    const center = (params.rotate * Math.PI) / 180 / 2;
    const rotate = 1 / (180 / params.rotate);
    const translate = params.depth;

    for (let i = 0, length = slides.length; i < length; i += 1) {
      const $slideEl = slides.eq(i);
      const slideProgress = $slideEl[0].progress;
      const slideSize = slidesSizesGrid[i];
      const offset = swiper.params.centeredSlides ? 0 : (swiper.params.slidesPerView - 1) * 0.5;

      const slideOffset = slideProgress + offset;
      const centerOffset = 1 - Math.cos(slideOffset * rotate * Math.PI);

      const translateX = `${slideOffset * (slideSize / 3) * centerOffset}`;
      const translateZ = `${((slideSize * 0.5) / Math.sin(center)) * centerOffset - translate}`;
      const rotateY = slideOffset * params.rotate;

      const slideTransform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
      const $targetEl = effectTarget(params, $slideEl);
      $targetEl.transform(slideTransform);
    }
  };

  const setTransition = (duration) => {
    const { transformEl } = swiper.params.panoramaEffect;
    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    $transitionElements.transition(duration);
  };

  effectInit({
    effect: 'panorama',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true,
    }),
  });
}
