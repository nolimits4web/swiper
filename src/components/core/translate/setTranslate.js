import Support from '../../../utils/support';

export default function (translate, updateActiveIndex, byController) {
  const swiper = this;
  const { rtl, params, $wrapperEl, progress } = swiper;
  let x = 0;
  let y = 0;
  const z = 0;

  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }

  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }

  if (!params.virtualTranslate) {
    if (Support.transforms3d) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
    else $wrapperEl.transform(`translate(${x}px, ${y}px)`);
  }

  swiper.translate = swiper.isHorizontal() ? x : y;

  // Check if we need to update progress
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }

  if (updateActiveIndex) swiper.updateActiveIndex();

  // if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
  //   s.effects[s.params.effect].setTranslate(s.translate);
  // }
  // if (s.params.parallax && s.parallax) {
  //   s.parallax.setTranslate(s.translate);
  // }
  // if (s.params.scrollbar && s.scrollbar) {
  //   s.scrollbar.setTranslate(s.translate);
  // }
  // if (s.params.control && s.controller) {
  //   s.controller.setTranslate(s.translate, byController);
  // }
  swiper.emit('setTranslate', swiper.translate, byController);
}
