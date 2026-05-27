import type { SwiperModuleFn } from '../../core/core';

export interface GridOptions {
  /**
   * Number of slides rows, for multirow layout
   *
   * @default 1
   */
  rows?: number;

  /**
   * Can be `'column'` or `'row'`. Defines how slides should fill rows, by column or by row
   *
   * @note if used with loop mode make sure number of slides is even specified in loop mode requirements, or enable `loopAddBlankSlides` parameter
   *
   * @default 'column'
   */
  fill?: 'row' | 'column';
}

export interface GridMethods {
  /**
   * Computes the row/column layout for the given slide list and stores
   * the totals used by `updateSlide`/`updateWrapperSize`.
   */
  initSlides(slides: HTMLElement[]): void;
  /**
   * Reverts inline styles previously applied by `updateSlide` so the
   * slider can switch back to single-row mode without leftover height.
   */
  unsetSlides(): void;
  /**
   * Assigns `row`/`column` indices and the row-spanning inline styles to
   * a slide, based on its position in the source list.
   */
  updateSlide(i: number, slide: HTMLElement, slides: HTMLElement[]): void;
  /**
   * Adjusts `swiper.virtualSize` and `snapGrid` to fit a multi-row layout
   * given the per-slide size.
   */
  updateWrapperSize(slideSize: number, snapGrid: number[]): void;
}

export interface GridEvents {}

// All GridOptions fields are optional in the public type, but extendParams
// fills them in at module init time. Use this view internally to access
// defaults without proliferating `!` non-null assertions through the module.
type GridParamsRuntime = Required<GridOptions>;

declare module '../../core/core' {
  interface Swiper {
    grid: GridMethods;
  }
  interface SwiperOptions {
    /**
     * Object with grid parameters to enable "multirow" slider.
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   grid: {
     *     rows: 2,
     *   },
     * });
     * ```
     */
    grid?: GridOptions;
  }
  interface SwiperParams {
    grid?: GridOptions;
  }
  interface SwiperEvents extends GridEvents {}
}

// Slides laid out via `updateSlide` get `row`/`column` numeric tags plus the
// `swiperSlideGridSet` flag used by `unsetSlides` to know which slides it
// owns inline styles for.
interface GridSlide extends HTMLElement {
  row?: number;
  column?: number;
  swiperSlideGridSet?: boolean;
}

const Grid: SwiperModuleFn = ({ swiper, extendParams, on }) => {
  extendParams({
    grid: {
      rows: 1,
      fill: 'column',
    },
  });

  function getParams(): GridParamsRuntime {
    return swiper.params.grid as GridParamsRuntime;
  }

  let slidesNumberEvenToRows: number;
  let slidesPerRow: number;
  let numFullColumns: number;
  let wasMultiRow: boolean;

  const getSpaceBetween = (): number => {
    let spaceBetween: number | string = swiper.params.spaceBetween ?? 0;
    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiper.size;
    } else if (typeof spaceBetween === 'string') {
      spaceBetween = parseFloat(spaceBetween);
    }
    return spaceBetween as number;
  };

  const isVirtualEnabled = (): boolean => {
    const virtualParams = swiper.params.virtual;
    return (
      !!swiper.virtual &&
      typeof virtualParams === 'object' &&
      virtualParams !== null &&
      !!virtualParams.enabled
    );
  };

  const initSlides = (slides: HTMLElement[]): void => {
    const { slidesPerView } = swiper.params;
    const { rows, fill } = getParams();
    const slidesLength = isVirtualEnabled() ? swiper.virtual.slides.length : slides.length;
    numFullColumns = Math.floor(slidesLength / rows);
    if (Math.floor(slidesLength / rows) === slidesLength / rows) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
    }
    if (slidesPerView !== 'auto' && fill === 'row') {
      slidesNumberEvenToRows = Math.max(
        slidesNumberEvenToRows,
        Math.floor(slidesPerView ?? 1) * rows,
      );
    }
    slidesPerRow = slidesNumberEvenToRows / rows;
  };

  const unsetSlides = (): void => {
    if (swiper.slides) {
      swiper.slides.forEach((slide) => {
        const gridSlide = slide as GridSlide;
        if (gridSlide.swiperSlideGridSet) {
          slide.style.height = '';
          slide.style.setProperty(swiper.getDirectionLabel('margin-top'), '');
        }
      });
    }
  };

  const updateSlide = (i: number, slide: HTMLElement, slides: HTMLElement[]): void => {
    const { slidesPerGroup } = swiper.params;
    const spaceBetween = getSpaceBetween();
    const { rows, fill } = getParams();
    const slidesLength = isVirtualEnabled() ? swiper.virtual.slides.length : slides.length;
    // Set slides order
    let newSlideOrderIndex: number;
    let column: number;
    let row: number;
    if (fill === 'row' && (slidesPerGroup ?? 1) > 1) {
      const groupsPer = slidesPerGroup ?? 1;
      const groupIndex = Math.floor(i / (groupsPer * rows));
      const slideIndexInGroup = i - rows * groupsPer * groupIndex;
      const columnsInGroup =
        groupIndex === 0
          ? groupsPer
          : Math.min(Math.ceil((slidesLength - groupIndex * rows * groupsPer) / rows), groupsPer);
      row = Math.floor(slideIndexInGroup / columnsInGroup);
      column = slideIndexInGroup - row * columnsInGroup + groupIndex * groupsPer;

      newSlideOrderIndex = column + (row * slidesNumberEvenToRows) / rows;
      slide.style.order = String(newSlideOrderIndex);
    } else if (fill === 'column') {
      column = Math.floor(i / rows);
      row = i - column * rows;
      if (column > numFullColumns || (column === numFullColumns && row === rows - 1)) {
        row += 1;
        if (row >= rows) {
          row = 0;
          column += 1;
        }
      }
    } else {
      row = Math.floor(i / slidesPerRow);
      column = i - row * slidesPerRow;
    }
    const gridSlide = slide as GridSlide;
    gridSlide.row = row;
    gridSlide.column = column;
    slide.style.height = `calc((100% - ${(rows - 1) * spaceBetween}px) / ${rows})`;
    slide.style.setProperty(
      swiper.getDirectionLabel('margin-top'),
      row !== 0 && spaceBetween ? `${spaceBetween}px` : '',
    );
    gridSlide.swiperSlideGridSet = true;
  };

  const updateWrapperSize = (slideSize: number, snapGrid: number[]): void => {
    const { centeredSlides, roundLengths } = swiper.params;
    const spaceBetween = getSpaceBetween();
    const { rows } = getParams();
    swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
    if (!swiper.params.cssMode) {
      swiper.wrapperEl.style.setProperty(
        swiper.getDirectionLabel('width'),
        `${swiper.virtualSize + spaceBetween}px`,
      );
    }
    if (centeredSlides) {
      const newSlidesGrid: number[] = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i]!;
        if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i]! < swiper.virtualSize + snapGrid[0]!) newSlidesGrid.push(slidesGridItem);
      }
      snapGrid.splice(0, snapGrid.length);
      snapGrid.push(...newSlidesGrid);
    }
  };
  const onInit = (): void => {
    const gridParams = swiper.params.grid;
    wasMultiRow = !!(gridParams && (gridParams.rows ?? 1) > 1);
  };

  const onUpdate = (): void => {
    const { params, el } = swiper;
    const gridParams = params.grid;
    const isMultiRow = !!(gridParams && (gridParams.rows ?? 1) > 1);

    if (wasMultiRow && !isMultiRow) {
      el.classList.remove(
        `${params.containerModifierClass}grid`,
        `${params.containerModifierClass}grid-column`,
      );
      numFullColumns = 1;
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add(`${params.containerModifierClass}grid`);
      if (gridParams!.fill === 'column') {
        el.classList.add(`${params.containerModifierClass}grid-column`);
      }
      swiper.emitContainerClasses();
    }
    wasMultiRow = isMultiRow;
  };

  on('init', onInit);
  on('update', onUpdate);

  swiper.grid = {
    initSlides,
    unsetSlides,
    updateSlide,
    updateWrapperSize,
  };
};

export default Grid;
