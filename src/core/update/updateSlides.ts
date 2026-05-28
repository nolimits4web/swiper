import {
  elementChildren,
  elementOuterSize,
  elementStyle,
  setCSSProperty,
} from '../../shared/utils';
import type { Swiper, SwiperSlideElement } from '../core';

export default function updateSlides(this: Swiper): void {
  const swiper = this;

  function getDirectionPropertyValue(node: CSSStyleDeclaration, label: string): number {
    return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || '0');
  }

  const params = swiper.params;

  const { wrapperEl, slidesEl, rtlTranslate: rtl, wrongRTL } = swiper;
  const isVirtual = !!(swiper.virtual && params.virtual?.enabled);
  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  const slides = elementChildren(
    slidesEl,
    `.${swiper.params.slideClass}, swiper-slide`,
  ) as SwiperSlideElement[];
  const slidesLength: number = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid: number[] = [];
  const slidesGrid: number[] = [];
  const slidesSizesGrid: number[] = [];

  // Legacy: `slidesOffsetBefore`/`slidesOffsetAfter` accepted a function form at runtime that
  // returned the actual offset. Public type is `number`, so narrow defensively here.
  type OffsetParam = number | ((this: Swiper) => number) | undefined;
  const resolveOffset = (value: OffsetParam): number | undefined =>
    typeof value === 'function' ? value.call(swiper) : value;
  const offsetBefore = resolveOffset(params.slidesOffsetBefore as OffsetParam);
  const offsetAfter = resolveOffset(params.slidesOffsetAfter as OffsetParam);

  const previousSnapGridLength = swiper.snapGrid.length;
  const previousSlidesGridLength = swiper.slidesGrid.length;

  const swiperSize = swiper.size - (offsetBefore as number) - (offsetAfter as number);
  let spaceBetween: number | string = params.spaceBetween!;
  let slidePosition = -(offsetBefore as number);
  let prevSlideSize = 0;
  let index = 0;
  if (typeof swiperSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
  } else if (typeof spaceBetween === 'string') {
    spaceBetween = parseFloat(spaceBetween);
  }

  swiper.virtualSize =
    -(spaceBetween as number) - (offsetBefore as number) - (offsetAfter as number);

  // reset margins
  slides.forEach((slideEl) => {
    if (rtl) {
      slideEl.style.marginLeft = '';
    } else {
      slideEl.style.marginRight = '';
    }
    slideEl.style.marginBottom = '';
    slideEl.style.marginTop = '';
  });

  // reset cssMode offsets
  if (params.centeredSlides && params.cssMode) {
    setCSSProperty(wrapperEl, '--swiper-centered-offset-before', '');
    setCSSProperty(wrapperEl, '--swiper-centered-offset-after', '');
  }

  // set cssMode offsets
  if (params.cssMode) {
    setCSSProperty(wrapperEl, '--swiper-slides-offset-before', `${offsetBefore}px`);
    setCSSProperty(wrapperEl, '--swiper-slides-offset-after', `${offsetAfter}px`);
  }

  const gridEnabled = params.grid && params.grid.rows! > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slides);
  } else if (swiper.grid) {
    swiper.grid.unsetSlides();
  }

  // Calc slides
  let slideSize: number = 0;

  const shouldResetSlideSize =
    params.slidesPerView === 'auto' &&
    params.breakpoints &&
    Object.keys(params.breakpoints).filter((key) => {
      const bp = (params.breakpoints as Record<string, { slidesPerView?: unknown }>)[key];
      return typeof bp?.slidesPerView !== 'undefined';
    }).length > 0;

  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    const slide = slides[i];
    if (slide) {
      if (gridEnabled) {
        swiper.grid.updateSlide(i, slide, slides);
      }
      if (elementStyle(slide, 'display') === 'none') continue; // eslint-disable-line
    }

    if (isVirtual && params.slidesPerView === 'auto') {
      if (params.virtual?.slidesPerViewAutoSlideSize) {
        slideSize = params.virtual.slidesPerViewAutoSlideSize;
      }
      if (slideSize && slide) {
        if (params.roundLengths) slideSize = Math.floor(slideSize);

        (slide.style as unknown as Record<string, string>)[
          swiper.getDirectionLabel('width')
        ] = `${slideSize}px`;
      }
    } else if (params.slidesPerView === 'auto') {
      if (shouldResetSlideSize) {
        (slide!.style as unknown as Record<string, string>)[swiper.getDirectionLabel('width')] = ``;
      }
      const slideStyles = getComputedStyle(slide!);
      const currentTransform = slide!.style.transform;
      const currentWebKitTransform = (
        slide!.style as CSSStyleDeclaration & { webkitTransform?: string }
      ).webkitTransform;
      if (currentTransform) {
        slide!.style.transform = 'none';
      }
      if (currentWebKitTransform) {
        (slide!.style as CSSStyleDeclaration & { webkitTransform?: string }).webkitTransform =
          'none';
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal()
          ? elementOuterSize(slide!, 'width', true)
          : elementOuterSize(slide!, 'height', true);
      } else {
        // eslint-disable-next-line
        const width = getDirectionPropertyValue(slideStyles, 'width');
        const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
        const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
        const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
        const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
        const boxSizing = slideStyles.getPropertyValue('box-sizing');
        if (boxSizing && boxSizing === 'border-box') {
          slideSize = width + marginLeft + marginRight;
        } else {
          const { clientWidth, offsetWidth } = slide!;
          slideSize =
            width +
            paddingLeft +
            paddingRight +
            marginLeft +
            marginRight +
            (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide!.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        (slide!.style as CSSStyleDeclaration & { webkitTransform?: string }).webkitTransform =
          currentWebKitTransform;
      }
      if (params.roundLengths) slideSize = Math.floor(slideSize);
    } else {
      slideSize =
        (swiperSize - ((params.slidesPerView as number) - 1) * (spaceBetween as number)) /
        (params.slidesPerView as number);
      if (params.roundLengths) slideSize = Math.floor(slideSize);

      if (slide) {
        (slide.style as unknown as Record<string, string>)[
          swiper.getDirectionLabel('width')
        ] = `${slideSize}px`;
      }
    }
    if (slide) {
      slide.swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);

    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + (spaceBetween as number);
      if (prevSlideSize === 0 && i !== 0)
        slidePosition = slidePosition - swiperSize / 2 - (spaceBetween as number);
      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - (spaceBetween as number);
      if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup! === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (
        (index - Math.min(swiper.params.slidesPerGroupSkip!, index)) %
          swiper.params.slidesPerGroup! ===
        0
      )
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + (spaceBetween as number);
    }

    swiper.virtualSize += slideSize + (spaceBetween as number);

    prevSlideSize = slideSize;

    index += 1;
  }

  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + (offsetAfter as number);

  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    wrapperEl.style.width = `${swiper.virtualSize + (spaceBetween as number)}px`;
  }
  if (params.setWrapperSize) {
    (wrapperEl.style as unknown as Record<string, string>)[swiper.getDirectionLabel('width')] = `${
      swiper.virtualSize + (spaceBetween as number)
    }px`;
  }

  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid);
  }

  // Remove last grid elements depending on width
  if (!params.centeredSlides) {
    // Check if snapToSlideEdge should be applied
    const isFractionalSlidesPerView =
      params.slidesPerView !== 'auto' && (params.slidesPerView as number) % 1 !== 0;
    const shouldSnapToSlideEdge =
      params.snapToSlideEdge &&
      !params.loop &&
      (params.slidesPerView === 'auto' || isFractionalSlidesPerView);

    // Calculate the last allowed snap index when snapToSlideEdge is enabled
    // This ensures minimum slides are visible at the end
    let lastAllowedSnapIndex = snapGrid.length;
    if (shouldSnapToSlideEdge) {
      let minVisibleSlides: number;
      if (params.slidesPerView === 'auto') {
        // For 'auto' mode, calculate how many slides fit based on actual sizes
        minVisibleSlides = 1;
        let accumulatedSize = 0;
        for (let i = slidesSizesGrid.length - 1; i >= 0; i -= 1) {
          accumulatedSize +=
            slidesSizesGrid[i]! + (i < slidesSizesGrid.length - 1 ? (spaceBetween as number) : 0);
          if (accumulatedSize <= swiperSize) {
            minVisibleSlides = slidesSizesGrid.length - i;
          } else {
            break;
          }
        }
      } else {
        minVisibleSlides = Math.floor(params.slidesPerView as number);
      }
      lastAllowedSnapIndex = Math.max(slidesLength - minVisibleSlides, 0);
    }

    const newSlidesGrid: number[] = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i]!;
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (shouldSnapToSlideEdge) {
        // When snapToSlideEdge is enabled, only keep snaps up to lastAllowedSnapIndex
        if (i <= lastAllowedSnapIndex) {
          newSlidesGrid.push(slidesGridItem);
        }
      } else if (snapGrid[i]! <= swiper.virtualSize - swiperSize) {
        // When snapToSlideEdge is disabled, keep snaps that fit within scrollable area
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;

    if (
      Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]!) >
      1
    ) {
      // Only add edge-aligned snap if snapToSlideEdge is not enabled
      if (!shouldSnapToSlideEdge) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
  }
  if (isVirtual && params.loop) {
    const size = slidesSizesGrid[0]! + (spaceBetween as number);
    const slidesBefore = swiper.virtual.slidesBefore ?? 0;
    const slidesAfter = swiper.virtual.slidesAfter ?? 0;
    const virtualLoopCount = slidesBefore + slidesAfter;
    if (params.slidesPerGroup! > 1) {
      const groups = Math.ceil(virtualLoopCount / params.slidesPerGroup!);
      const groupSize = size * params.slidesPerGroup!;
      for (let i = 0; i < groups; i += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1]! + groupSize);
      }
    }
    for (let i = 0; i < virtualLoopCount; i += 1) {
      if (params.slidesPerGroup === 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1]! + size);
      }
      slidesGrid.push(slidesGrid[slidesGrid.length - 1]! + size);
      swiper.virtualSize += size;
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];

  if (spaceBetween !== 0) {
    const key =
      swiper.isHorizontal() && rtl ? 'marginLeft' : swiper.getDirectionLabel('marginRight');
    slides
      .filter((_, slideIndex) => {
        if (!params.cssMode || params.loop) return true;
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      })
      .forEach((slideEl) => {
        (slideEl.style as unknown as Record<string, string>)[key] = `${spaceBetween}px`;
      });
  }

  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + ((spaceBetween as number) || 0);
    });
    allSlidesSize -= spaceBetween as number;
    const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
    snapGrid = snapGrid.map((snap) => {
      if (snap <= 0) return -(offsetBefore as number);
      if (snap > maxSnap) return maxSnap + (offsetAfter as number);
      return snap;
    });
  }

  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + ((spaceBetween as number) || 0);
    });
    allSlidesSize -= spaceBetween as number;
    if (allSlidesSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }

  Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid,
  });

  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]!}px`);
    setCSSProperty(
      wrapperEl,
      '--swiper-centered-offset-after',
      `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1]! / 2}px`,
    );
    const addToSnapGrid = -swiper.snapGrid[0]!;
    const addToSlidesGrid = -swiper.slidesGrid[0]!;
    swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
    swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
  }

  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }

  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }

  swiper.emit('slidesUpdated');

  if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides!) {
      if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
}
