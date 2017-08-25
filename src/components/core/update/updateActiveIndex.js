import Utils from '../../../utils/utils';

export default function () {
  const swiper = this;
  const translate = swiper.rtl ? swiper.translate : -swiper.translate;
  const { slidesGrid, snapGrid, params, activeIndex } = swiper;
  let newActiveIndex;
  let snapIndex;
  for (let i = 0; i < slidesGrid.length; i += 1) {
    if (typeof slidesGrid[i + 1] !== 'undefined') {
      if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
        newActiveIndex = i;
      } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
        newActiveIndex = i + 1;
      }
    } else if (translate >= slidesGrid[i]) {
      newActiveIndex = i;
    }
  }
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
  }
  snapIndex = Math.floor(newActiveIndex / params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

  if (newActiveIndex === activeIndex) {
    return;
  }
  Utils.extend(swiper, {
    snapIndex,
    previousIndex: activeIndex,
    activeIndex: newActiveIndex,
  });
  swiper.emit('aciveIndexChange');
  swiper.emit('snapIndexChange');
}
