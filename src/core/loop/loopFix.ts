import { showWarning } from '../../shared/utils';
import type { Swiper } from '../core';

// Grid module tags slide elements with their column index at layout time
// (see src/modules/grid/grid.ts → updateSlide); loop also stamps a
// short-lived `swiperLoopMoveDOM` flag so the observer can ignore the
// shuffle.
interface LoopSlideEl extends HTMLElement {
  column?: number;
  swiperLoopMoveDOM?: boolean;
}

interface LoopFixOptions {
  slideRealIndex?: number;
  slideTo?: boolean;
  direction?: 'prev' | 'next';
  setTranslate?: boolean;
  activeSlideIndex?: number;
  initial?: boolean;
  byController?: boolean;
  byMousewheel?: boolean;
}

export default function loopFix(this: Swiper, options: LoopFixOptions = {}): void {
  const {
    slideRealIndex,
    slideTo = true,
    direction,
    setTranslate,
    activeSlideIndex: activeSlideIndexParam,
    initial,
    byController,
    byMousewheel,
  } = options;
  let activeSlideIndex = activeSlideIndexParam;
  const swiper = this;

  if (!swiper.params.loop) return;
  swiper.emit('beforeLoopFix');
  const { slides, allowSlidePrev, allowSlideNext, slidesEl, params } = swiper;
  const { centeredSlides, slidesOffsetBefore, slidesOffsetAfter, initialSlide } = params;
  const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;

  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;

  if (swiper.virtual && params.virtual?.enabled) {
    if (slideTo) {
      const virtualSlidesLength = swiper.virtual.slides.length;
      const virtualSlidesBefore = swiper.virtual.slidesBefore ?? 0;
      if (!bothDirections && swiper.snapIndex === 0) {
        swiper.slideTo(virtualSlidesLength, 0, false, true);
      } else if (bothDirections && swiper.snapIndex < (params.slidesPerView as number)) {
        swiper.slideTo(virtualSlidesLength + swiper.snapIndex, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(virtualSlidesBefore, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit('loopFix');
    return;
  }
  let slidesPerView: number = params.slidesPerView as number;
  if ((slidesPerView as unknown) === 'auto') {
    slidesPerView = swiper.slidesPerViewDynamic();
  } else {
    slidesPerView = Math.ceil(parseFloat(String(params.slidesPerView)));
    if (bothDirections && slidesPerView % 2 === 0) {
      slidesPerView = slidesPerView + 1;
    }
  }

  const slidesPerGroup: number = params.slidesPerGroupAuto
    ? slidesPerView
    : (params.slidesPerGroup as number);
  let loopedSlides = bothDirections
    ? Math.max(slidesPerGroup, Math.ceil(slidesPerView / 2))
    : slidesPerGroup;

  if (loopedSlides % slidesPerGroup !== 0) {
    loopedSlides += slidesPerGroup - (loopedSlides % slidesPerGroup);
  }
  loopedSlides += params.loopAdditionalSlides!;
  swiper.loopedSlides = loopedSlides;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows! > 1;

  if (
    slides.length < slidesPerView + loopedSlides ||
    (swiper.params.effect === 'cards' && slides.length < slidesPerView + loopedSlides * 2)
  ) {
    showWarning(
      'Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters',
    );
  } else if (gridEnabled && params.grid!.fill === 'row') {
    showWarning('Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`');
  }

  const prependSlidesIndexes: number[] = [];
  const appendSlidesIndexes: number[] = [];

  const cols = gridEnabled ? Math.ceil(slides.length / params.grid!.rows!) : slides.length;

  const isInitialOverflow =
    initial && cols - (initialSlide as number) < slidesPerView && !bothDirections;

  let activeIndex = isInitialOverflow ? (initialSlide as number) : swiper.activeIndex;

  if (typeof activeSlideIndex === 'undefined') {
    activeSlideIndex = swiper.getSlideIndex(
      slides.find((el) => el.classList.contains(params.slideActiveClass!))!,
    );
  } else {
    activeIndex = activeSlideIndex;
  }

  const isNext = direction === 'next' || !direction;
  const isPrev = direction === 'prev' || !direction;

  let slidesPrepended = 0;
  let slidesAppended = 0;

  const activeColIndex = gridEnabled
    ? (slides[activeSlideIndex] as LoopSlideEl).column ?? 0
    : activeSlideIndex;
  const activeColIndexWithShift =
    activeColIndex +
    (bothDirections && typeof setTranslate === 'undefined' ? -slidesPerView / 2 + 0.5 : 0);
  // prepend last slides before start
  if (activeColIndexWithShift < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
    for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        const colIndexToPrepend = cols - index - 1;
        for (let j = slides.length - 1; j >= 0; j -= 1) {
          if ((slides[j] as LoopSlideEl).column === colIndexToPrepend) prependSlidesIndexes.push(j);
        }
      } else {
        prependSlidesIndexes.push(cols - index - 1);
      }
    }
  } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
    slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
    if (isInitialOverflow) {
      slidesAppended = Math.max(
        slidesAppended,
        slidesPerView - cols + (initialSlide as number) + 1,
      );
    }

    for (let i = 0; i < slidesAppended; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        slides.forEach((slide, slideIndex) => {
          if ((slide as LoopSlideEl).column === index) appendSlidesIndexes.push(slideIndex);
        });
      } else {
        appendSlidesIndexes.push(index);
      }
    }
  }
  swiper.__preventObserver__ = true;
  requestAnimationFrame(() => {
    swiper.__preventObserver__ = false;
  });
  if (swiper.params.effect === 'cards' && slides.length < slidesPerView + loopedSlides * 2) {
    if (appendSlidesIndexes.includes(activeSlideIndex)) {
      appendSlidesIndexes.splice(appendSlidesIndexes.indexOf(activeSlideIndex), 1);
    }
    if (prependSlidesIndexes.includes(activeSlideIndex)) {
      prependSlidesIndexes.splice(prependSlidesIndexes.indexOf(activeSlideIndex), 1);
    }
  }

  if (isPrev) {
    prependSlidesIndexes.forEach((index) => {
      const slideEl = slides[index] as LoopSlideEl;
      slideEl.swiperLoopMoveDOM = true;
      slidesEl.prepend(slideEl);
      slideEl.swiperLoopMoveDOM = false;
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach((index) => {
      const slideEl = slides[index] as LoopSlideEl;
      slideEl.swiperLoopMoveDOM = true;
      slidesEl.append(slideEl);
      slideEl.swiperLoopMoveDOM = false;
    });
  }

  swiper.recalcSlides();
  if (params.slidesPerView === 'auto') {
    swiper.updateSlides();
  } else if (
    gridEnabled &&
    ((prependSlidesIndexes.length > 0 && isPrev) || (appendSlidesIndexes.length > 0 && isNext))
  ) {
    swiper.slides.forEach((slide, slideIndex) => {
      swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
    });
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (slideTo) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex === 'undefined') {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex]!;
        const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended]!;
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
          if (setTranslate) {
            swiper.touchEventsData.startTranslate =
              (swiper.touchEventsData.startTranslate as number) - diff;
            swiper.touchEventsData.currentTranslate =
              (swiper.touchEventsData.currentTranslate as number) - diff;
          }
        }
      } else {
        if (setTranslate) {
          const shift = gridEnabled
            ? prependSlidesIndexes.length / params.grid!.rows!
            : prependSlidesIndexes.length;
          swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
          swiper.touchEventsData.currentTranslate = swiper.translate;
        }
      }
    } else if (appendSlidesIndexes.length > 0 && isNext) {
      if (typeof slideRealIndex === 'undefined') {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex]!;
        const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended]!;
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
          if (setTranslate) {
            swiper.touchEventsData.startTranslate =
              (swiper.touchEventsData.startTranslate as number) - diff;
            swiper.touchEventsData.currentTranslate =
              (swiper.touchEventsData.currentTranslate as number) - diff;
          }
        }
      } else {
        const shift = gridEnabled
          ? appendSlidesIndexes.length / params.grid!.rows!
          : appendSlidesIndexes.length;
        swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
      }
    }
  }

  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;

  const controlled = swiper.controller?.control;
  if (controlled && !byController) {
    const loopParams = {
      slideRealIndex,
      direction,
      setTranslate,
      activeSlideIndex,
      byController: true,
    };
    if (Array.isArray(controlled)) {
      controlled.forEach((c: Swiper) => {
        if (!c.destroyed && c.params.loop)
          c.loopFix({
            ...loopParams,
            slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false,
          });
      });
    } else if (
      controlled instanceof (swiper.constructor as typeof Swiper) &&
      controlled.params.loop
    ) {
      controlled.loopFix({
        ...loopParams,
        slideTo: controlled.params.slidesPerView === params.slidesPerView ? slideTo : false,
      });
    }
  }

  swiper.emit('loopFix');
}
