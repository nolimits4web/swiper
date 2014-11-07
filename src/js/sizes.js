/*=========================
  Slider/slides sizes
  ===========================*/
s.updateContainerSize = function () {
    s.width = s.container[0].clientWidth;
    s.height = s.container[0].clientHeight;
    s.size = isH() ? s.width : s.height;
};

s.updateSlidesSize = function () {
    s.slides = s.wrapper.children('.' + s.params.slideClass);
    s.snapGrid = [];
    s.slidesGrid = [];
    s.slidesSizesGrid = [];
    
    var spaceBetween = s.params.spaceBetween,
        slidePosition = 0,
        i,
        prevSlideSize = 0,
        index = 0;
    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
        spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
    }

    s.virtualWidth = -spaceBetween;
    // reset margins
    if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
    else s.slides.css({marginRight: '', marginBottom: ''});

    var slidesNumberEvenToRows;
    if (s.params.slidesPerColumn > 1) {
        if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
            slidesNumberEvenToRows = s.slides.length;
        }
        else {
            slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
        }
    }

    // Calc slides
    var slideSize;
    for (i = 0; i < s.slides.length; i++) {
        slideSize = 0;
        var slide = s.slides.eq(i);
        if (s.params.slidesPerColumn > 1 && s.params.slidesPerColumnFill === 'column') {
            // Set slides order
            var newSlideOrderIndex;
            var column, row;
            var slidesPerColumn = s.params.slidesPerColumn;
            column = Math.floor(i / slidesPerColumn);
            row = i - column * s.params.slidesPerColumn;
            newSlideOrderIndex = column + row * slidesNumberEvenToRows / s.params.slidesPerColumn;
            slide
                .css({
                    '-webkit-box-ordinal-group': newSlideOrderIndex,
                    '-moz-box-ordinal-group': newSlideOrderIndex,
                    '-ms-flex-order': newSlideOrderIndex,
                    '-webkit-order': newSlideOrderIndex,
                    'order': newSlideOrderIndex
                })
                .attr('data-swiper-column', column)
                .attr('data-swiper-row', row);
        }
        if (slide.css('display') === 'none') continue;
        if (s.params.slidesPerView === 'auto') {
            slideSize = isH() ? slide.outerWidth(true) : slide.outerHeight(true);
        }
        else {
            slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
            if (isH()) {
                s.slides[i].style.width = slideSize + 'px';
            }
            else {
                s.slides[i].style.height = slideSize + 'px';
            }
        }
        s.slides[i]._swiperSlideSize = slideSize;
        s.slidesSizesGrid.push(slideSize);
        
        
        if (s.params.centeredSlides) {
            slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
            if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
            if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
            if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
            s.slidesGrid.push(slidePosition);
        }
        else {
            if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
            s.slidesGrid.push(slidePosition);
            slidePosition = slidePosition + slideSize + spaceBetween;
        }

        s.virtualWidth += slideSize + spaceBetween;

        prevSlideSize = slideSize;

        index ++;
    }
    s.virtualWidth = Math.max(s.virtualWidth, s.size);

    var newSlidesGrid;

    if (s.params.slidesPerColumn > 1) {
        s.virtualWidth = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
        s.virtualWidth = Math.ceil(s.virtualWidth / s.params.slidesPerColumn) - s.params.spaceBetween;
        s.wrapper.css({width: s.virtualWidth + s.params.spaceBetween + 'px'});
        if (s.params.centeredSlides) {
            newSlidesGrid = [];
            for (i = 0; i < s.snapGrid.length; i++) {
                if (s.snapGrid[i] < s.virtualWidth + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
            }
            s.snapGrid = newSlidesGrid;
        }
    }

    // Remove last grid elements depending on width
    if (!s.params.centeredSlides) {
        newSlidesGrid = [];
        for (i = 0; i < s.snapGrid.length; i++) {
            if (s.snapGrid[i] <= s.virtualWidth - s.size) {
                newSlidesGrid.push(s.snapGrid[i]);
            }
        }
        s.snapGrid = newSlidesGrid;
        if (Math.floor(s.virtualWidth - s.size) > Math.floor(s.snapGrid[s.snapGrid.length - 1])) {
            s.snapGrid.push(s.virtualWidth - s.size);
        }
    }
    if (s.snapGrid.length === 0) s.snapGrid = [0];
        
    if (s.params.spaceBetween !== 0) {
        if (isH()) {
            if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
            else s.slides.css({marginRight: spaceBetween + 'px'});
        }
        else s.slides.css({marginBottom: spaceBetween + 'px'});
    }
    if (s.params.watchSlidesProgress) {
        s.updateSlidesOffset();
    }
};
s.updateSlidesOffset = function () {
    for (var i = 0; i < s.slides.length; i++) {
        s.slides[i]._swiperSlideOffset = isH() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
    }
};

s.update = function () {
    s.updateContainerSize();
    s.updateSlidesSize();
    s.updatePagination();
    s.updateClasses();
};

// Min/max translates
s.minTranslate = function () {
    return (-s.snapGrid[0]);
};
s.maxTranslate = function () {
    return (-s.snapGrid[s.snapGrid.length - 1]);
};
