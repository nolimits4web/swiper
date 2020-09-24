import { isObject, extend } from './utils';

function updateSwiper(swiper, passedParams, changedParams) {
  const updateParams = changedParams.filter((key) => key !== 'children' && key !== 'direction');
  const { params: currentParams, pagination, navigation, scrollbar, thumbs } = swiper;
  let needThumbsInit;
  let needControllerInit;
  let needPaginationInit;
  let needScrollbarInit;
  let needNavigationInit;
  if (
    changedParams.includes('thumbs') &&
    passedParams.thumbs &&
    passedParams.thumbs.swiper &&
    currentParams.thumbs &&
    !currentParams.thumbs.swiper
  ) {
    needThumbsInit = true;
  }
  if (
    changedParams.includes('controller') &&
    passedParams.controller &&
    passedParams.controller.control &&
    currentParams.controller &&
    !currentParams.controller.control
  ) {
    needControllerInit = true;
  }
  if (
    changedParams.includes('pagination') &&
    passedParams.pagination &&
    passedParams.pagination.el &&
    currentParams.pagination &&
    pagination &&
    !pagination.el
  ) {
    needPaginationInit = true;
  }

  if (
    changedParams.includes('scrollbar') &&
    passedParams.scrollbar &&
    passedParams.scrollbar.el &&
    currentParams.scrollbar &&
    scrollbar &&
    !scrollbar.el
  ) {
    needScrollbarInit = true;
  }

  if (
    changedParams.includes('navigation') &&
    passedParams.navigation &&
    passedParams.navigation.prevEl &&
    passedParams.navigation.nextEl &&
    currentParams.navigation &&
    navigation &&
    !navigation.prevEl &&
    !navigation.nextEl
  ) {
    needNavigationInit = true;
  }

  updateParams.forEach((key) => {
    if (isObject(currentParams[key]) && isObject(passedParams[key])) {
      extend(currentParams[key], passedParams[key]);
    } else {
      currentParams[key] = passedParams[key];
    }
  });

  if (needThumbsInit) {
    const initialized = thumbs.init();
    if (initialized) {
      thumbs.update(true);
    }
  }

  if (needControllerInit) {
    swiper.controller.control = currentParams.controller.control;
  }

  if (needPaginationInit) {
    pagination.init();
    pagination.render();
    pagination.update();
  }

  if (needScrollbarInit) {
    scrollbar.init();
    scrollbar.updateSize();
    scrollbar.setTranslate();
  }

  if (needNavigationInit) {
    navigation.init();
    navigation.update();
  }

  if (changedParams.includes('allowSlideNext')) {
    swiper.allowSlideNext = passedParams.allowSlideNext;
  }
  if (changedParams.includes('allowSlidePrev')) {
    swiper.allowSlidePrev = passedParams.allowSlidePrev;
  }
  if (changedParams.includes('direction')) {
    swiper.changeDirection(passedParams.direction, false);
  }
  swiper.update();
}
export { updateSwiper };
