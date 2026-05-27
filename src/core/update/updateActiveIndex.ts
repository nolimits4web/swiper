import { preload } from '../../shared/process-lazy-preloader';
import type { Swiper } from '../core';

export function getActiveIndexByTranslate(swiper: Swiper): number {
  const { slidesGrid, params } = swiper;
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  let activeIndex: number | undefined;
  for (let i = 0; i < slidesGrid.length; i += 1) {
    if (typeof slidesGrid[i + 1] !== 'undefined') {
      if (
        translate >= slidesGrid[i]! &&
        translate < slidesGrid[i + 1]! - (slidesGrid[i + 1]! - slidesGrid[i]!) / 2
      ) {
        activeIndex = i;
      } else if (translate >= slidesGrid[i]! && translate < slidesGrid[i + 1]!) {
        activeIndex = i + 1;
      }
    } else if (translate >= slidesGrid[i]!) {
      activeIndex = i;
    }
  }
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    if ((activeIndex as number) < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
  }
  return activeIndex as number;
}

export default function updateActiveIndex(this: Swiper, newActiveIndex?: number): void {
  const swiper = this;
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  const {
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex,
  } = swiper;
  let activeIndex = newActiveIndex;
  let snapIndex: number;

  const getVirtualRealIndex = (aIndex: number): number => {
    let realIndex = aIndex - (swiper.virtual as any).slidesBefore;
    if (realIndex < 0) {
      realIndex = (swiper.virtual as any).slides.length + realIndex;
    }
    if (realIndex >= (swiper.virtual as any).slides.length) {
      realIndex -= (swiper.virtual as any).slides.length;
    }
    return realIndex;
  };
  if (typeof activeIndex === 'undefined') {
    activeIndex = getActiveIndexByTranslate(swiper);
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip!, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup!);
  }
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex && !swiper.params.loop) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }
    return;
  }
  if (
    activeIndex === previousIndex &&
    swiper.params.loop &&
    swiper.virtual &&
    (swiper.params.virtual as any).enabled
  ) {
    swiper.realIndex = getVirtualRealIndex(activeIndex);
    return;
  }

  const gridEnabled = swiper.grid && params.grid && params.grid.rows! > 1;

  const normalizeSlideIndexToColumn = (index: number): number => {
    if (!gridEnabled) return index;
    return Math.floor(index / params.grid!.rows!);
  };
  // suppress unused
  void normalizeSlideIndexToColumn;

  // Get real index
  let realIndex: number;
  if (swiper.virtual && (params.virtual as any).enabled) {
    if (params.loop) {
      realIndex = getVirtualRealIndex(activeIndex);
    } else {
      realIndex = activeIndex;
    }
  } else if (gridEnabled) {
    const firstSlideInColumn = swiper.slides.find(
      (slideEl) => (slideEl as any).column === activeIndex,
    )!;
    let activeSlideIndex = parseInt(
      firstSlideInColumn.getAttribute('data-swiper-slide-index')!,
      10,
    );
    if (Number.isNaN(activeSlideIndex)) {
      activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
    }
    realIndex = Math.floor(activeSlideIndex / params.grid!.rows!);
  } else if (swiper.slides[activeIndex]) {
    const slideIndex = swiper.slides[activeIndex]!.getAttribute('data-swiper-slide-index');
    if (slideIndex) {
      realIndex = parseInt(slideIndex, 10);
    } else {
      realIndex = activeIndex;
    }
  } else {
    realIndex = activeIndex;
  }

  Object.assign(swiper, {
    previousSnapIndex,
    snapIndex,
    previousRealIndex,
    realIndex,
    previousIndex,
    activeIndex,
  });

  if (swiper.initialized) {
    preload(swiper);
  }
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');

  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }
    swiper.emit('slideChange');
  }
}
