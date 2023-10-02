export default function Grid({ swiper, extendParams, on }) {
  extendParams({
    grid: {
      rows: 1,
      fill: 'column',
    },
  });

  let slidesNumberEvenToRows;
  let slidesPerRow;
  let numFullColumns;
  let wasMultiRow;

  const getSpaceBetween = () => {
    let spaceBetween = swiper.params.spaceBetween;
    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiper.size;
    } else if (typeof spaceBetween === 'string') {
      spaceBetween = parseFloat(spaceBetween);
    }
    return spaceBetween;
  };

  const initSlides = (slides) => {
    const { slidesPerView } = swiper.params;
    const { rows, fill } = swiper.params.grid;
    const slidesLength =
      swiper.virtual && swiper.params.virtual.enabled
        ? swiper.virtual.slides.length
        : slides.length;
    numFullColumns = Math.floor(slidesLength / rows);
    if (Math.floor(slidesLength / rows) === slidesLength / rows) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
    }
    if (slidesPerView !== 'auto' && fill === 'row') {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
    }
    slidesPerRow = slidesNumberEvenToRows / rows;
  };

  const unsetSlides = () => {
    if (swiper.slides) {
      swiper.slides.forEach((slide) => {
        if (slide.swiperSlideGridSet) {
          slide.style.height = '';
          slide.style[swiper.getDirectionLabel('margin-top')] = '';
        }
      });
    }
  };

  const updateSlide = (i, slide, slides) => {
    const { slidesPerGroup } = swiper.params;
    const spaceBetween = getSpaceBetween();
    const { rows, fill } = swiper.params.grid;
    const slidesLength =
      swiper.virtual && swiper.params.virtual.enabled
        ? swiper.virtual.slides.length
        : slides.length;
    // Set slides order
    let newSlideOrderIndex;
    let column;
    let row;
    if (fill === 'row' && slidesPerGroup > 1) {
      const groupIndex = Math.floor(i / (slidesPerGroup * rows));
      const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
      const columnsInGroup =
        groupIndex === 0
          ? slidesPerGroup
          : Math.min(
              Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows),
              slidesPerGroup,
            );
      row = Math.floor(slideIndexInGroup / columnsInGroup);
      column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;

      newSlideOrderIndex = column + (row * slidesNumberEvenToRows) / rows;
      slide.style.order = newSlideOrderIndex;
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
    slide.row = row;
    slide.column = column;
    slide.style.height = `calc((100% - ${(rows - 1) * spaceBetween}px) / ${rows})`;
    slide.style[swiper.getDirectionLabel('margin-top')] =
      row !== 0 ? spaceBetween && `${spaceBetween}px` : '';
    slide.swiperSlideGridSet = true;
  };

  const updateWrapperSize = (slideSize, snapGrid) => {
    const { centeredSlides, roundLengths } = swiper.params;
    const spaceBetween = getSpaceBetween();
    const { rows } = swiper.params.grid;
    swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
    if (!swiper.params.cssMode) {
      swiper.wrapperEl.style[swiper.getDirectionLabel('width')] = `${
        swiper.virtualSize + spaceBetween
      }px`;
    }
    if (centeredSlides) {
      const newSlidesGrid = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
      }
      snapGrid.splice(0, snapGrid.length);
      snapGrid.push(...newSlidesGrid);
    }
  };
  const onInit = () => {
    wasMultiRow = swiper.params.grid && swiper.params.grid.rows > 1;
  };

  const onUpdate = () => {
    const { params, el } = swiper;
    const isMultiRow = params.grid && params.grid.rows > 1;

    if (wasMultiRow && !isMultiRow) {
      el.classList.remove(
        `${params.containerModifierClass}grid`,
        `${params.containerModifierClass}grid-column`,
      );
      numFullColumns = 1;
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add(`${params.containerModifierClass}grid`);
      if (params.grid.fill === 'column') {
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
}
