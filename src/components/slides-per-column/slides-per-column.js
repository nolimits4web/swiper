import { bindModuleMethods } from '../../utils/utils';

const SlidesPerColumn = {
  getSlidesNumberEvenToRows(slidesLength) {
    const swiper = this;
    const { params } = swiper;
    if (params.slidesPerColumn <= 1) {
      return null;
    }
    const slidesNumberEvenToRows =
      Math.floor(slidesLength / params.slidesPerColumn) ===
      slidesLength / swiper.params.slidesPerColumn
        ? slidesLength
        : Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;

    if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
      return Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
    }
    return slidesNumberEvenToRows;
  },
  updateSlides(slidesLength) {
    const swiper = this;
    const { params } = swiper;

    swiper.slidesPerColumn.slidesNumberEvenToRows =
      swiper.slidesPerColumn.getSlidesNumberEvenToRows(slidesLength);
    swiper.slidesPerColumn.slidesPerRow =
      swiper.slidesPerColumn.slidesNumberEvenToRows / params.slidesPerColumn;
    swiper.slidesPerColumn.numFullColumns = Math.floor(slidesLength / params.slidesPerColumn);
  },
  updateSlidesLoop(i, slide, slidesLength, getDirectionLabel) {
    const swiper = this;
    const { params } = swiper;
    const { slidesNumberEvenToRows, slidesPerRow, numFullColumns } = swiper.slidesPerColumn;
    // Set slides order
    let newSlideOrderIndex;
    let column;
    let row;
    if (params.slidesPerColumnFill === 'row' && params.slidesPerGroup > 1) {
      const groupIndex = Math.floor(i / (params.slidesPerGroup * params.slidesPerColumn));
      const slideIndexInGroup = i - params.slidesPerColumn * params.slidesPerGroup * groupIndex;
      const columnsInGroup =
        groupIndex === 0
          ? params.slidesPerGroup
          : Math.min(
              Math.ceil(
                (slidesLength - groupIndex * params.slidesPerColumn * params.slidesPerGroup) /
                  params.slidesPerColumn,
              ),
              params.slidesPerGroup,
            );
      row = Math.floor(slideIndexInGroup / columnsInGroup);
      column = slideIndexInGroup - row * columnsInGroup + groupIndex * params.slidesPerGroup;

      newSlideOrderIndex = column + (row * slidesNumberEvenToRows) / params.slidesPerColumn;
      slide.css({
        '-webkit-box-ordinal-group': newSlideOrderIndex,
        '-moz-box-ordinal-group': newSlideOrderIndex,
        '-ms-flex-order': newSlideOrderIndex,
        '-webkit-order': newSlideOrderIndex,
        order: newSlideOrderIndex,
      });
    } else if (params.slidesPerColumnFill === 'column') {
      column = Math.floor(i / params.slidesPerColumn);
      row = i - column * params.slidesPerColumn;
      if (
        column > numFullColumns ||
        (column === numFullColumns && row === params.slidesPerColumn - 1)
      ) {
        row += 1;
        if (row >= params.slidesPerColumn) {
          row = 0;
          column += 1;
        }
      }
    } else {
      row = Math.floor(i / slidesPerRow);
      column = i - row * slidesPerRow;
    }
    slide.css(
      getDirectionLabel('margin-top'),
      row !== 0 ? params.spaceBetween && `${params.spaceBetween}px` : '',
    );
  },
  updateSlidesLoop2(slideSize, snapGrid, newSlidesGrid, getDirectionLabel) {
    const swiper = this;
    const { params, $wrapperEl } = swiper;
    swiper.virtualSize =
      (slideSize + params.spaceBetween) * swiper.slidesPerColumn.slidesNumberEvenToRows;
    swiper.virtualSize =
      Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
    $wrapperEl.css({
      [getDirectionLabel('width')]: `${swiper.virtualSize + params.spaceBetween}px`,
    });
    if (params.centeredSlides) {
      newSlidesGrid = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
      }
      return newSlidesGrid;
    }
    return snapGrid;
  },
};

export default {
  name: 'slides-per-column',
  params: {
    slidesPerColumn: 1,
    slidesPerColumnFill: 'column',
  },
  create() {
    const swiper = this;

    bindModuleMethods(swiper, { slidesPerColumn: SlidesPerColumn });
  },
  on: {},
};
