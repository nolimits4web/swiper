/*=========================
  Zoom
  ===========================*/
s.zoom = {
    // "Global" Props
    scale: 1,
    currentScale: 1,
    isScaling: false,
    gesture: {
        slide: undefined,
        slideWidth: undefined,
        slideHeight: undefined,
        image: undefined,
        imageWrap: undefined,
        zoomMax: s.params.zoomMax
    },
    image: {
        isTouched: undefined,
        isMoved: undefined,
        currentX: undefined,
        currentY: undefined,
        minX: undefined,
        minY: undefined,
        maxX: undefined,
        maxY: undefined,
        width: undefined,
        height: undefined,
        startX: undefined,
        startY: undefined,
        touchesStart: {},
        touchesCurrent: {}
    },
    velocity: {
        x: undefined,
        y: undefined,
        prevPositionX: undefined,
        prevPositionY: undefined,
        prevTime: undefined
    },
    // Calc Scale From Multi-touches
    getDistanceBetweenTouches: function (e) {
        if (e.targetTouches.length < 2) return 1;
        var x1 = e.targetTouches[0].pageX,
            y1 = e.targetTouches[0].pageY,
            x2 = e.targetTouches[1].pageX,
            y2 = e.targetTouches[1].pageY;
        var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        return distance;
    },
    // Events
    onGestureStart: function (e) {
        var z = s.zoom;
        if (!s.support.gestures) {
            if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
                return;
            }
            z.gesture.scaleStart = z.getDistanceBetweenTouches(e);
        }
        if (!z.gesture.slide || !z.gesture.slide.length) {
            z.gesture.slide = $(this);
            if (z.gesture.slide.length === 0) z.gesture.slide = s.slides.eq(s.activeIndex);
            z.gesture.image = z.gesture.slide.find('img, svg, canvas');
            z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
            z.gesture.zoomMax = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax ;
            if (z.gesture.imageWrap.length === 0) {
                z.gesture.image = undefined;
                return;
            }
        }
        z.gesture.image.transition(0);
        z.isScaling = true;
    },
    onGestureChange: function (e) {
        var z = s.zoom;
        if (!s.support.gestures) {
            if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
                return;
            }
            z.gesture.scaleMove = z.getDistanceBetweenTouches(e);
        }
        if (!z.gesture.image || z.gesture.image.length === 0) return;
        if (s.support.gestures) {
            z.scale = e.scale * z.currentScale;
        }
        else {
            z.scale = (z.gesture.scaleMove / z.gesture.scaleStart) * z.currentScale;
        }
        if (z.scale > z.gesture.zoomMax) {
            z.scale = z.gesture.zoomMax - 1 + Math.pow((z.scale - z.gesture.zoomMax + 1), 0.5);
        }
        if (z.scale < s.params.zoomMin) {
            z.scale =  s.params.zoomMin + 1 - Math.pow((s.params.zoomMin - z.scale + 1), 0.5);
        }
        z.gesture.image.transform('translate3d(0,0,0) scale(' + z.scale + ')');
    },
    onGestureEnd: function (e) {
        var z = s.zoom;
        if (!s.support.gestures) {
            if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2) {
                return;
            }
        }
        if (!z.gesture.image || z.gesture.image.length === 0) return;
        z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin);
        z.gesture.image.transition(s.params.speed).transform('translate3d(0,0,0) scale(' + z.scale + ')');
        z.currentScale = z.scale;
        z.isScaling = false;
        if (z.scale === 1) z.gesture.slide = undefined;
    },
    onTouchStart: function (s, e) {
        var z = s.zoom;
        if (!z.gesture.image || z.gesture.image.length === 0) return;
        if (z.image.isTouched) return;
        if (s.device.os === 'android') e.preventDefault();
        z.image.isTouched = true;
        z.image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        z.image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    },
    onTouchMove: function (e) {
        var z = s.zoom;
        if (!z.gesture.image || z.gesture.image.length === 0) return;
        s.allowClick = false;
        if (!z.image.isTouched || !z.gesture.slide) return;

        if (!z.image.isMoved) {
            z.image.width = z.gesture.image[0].offsetWidth;
            z.image.height = z.gesture.image[0].offsetHeight;
            z.image.startX = s.getTranslate(z.gesture.imageWrap[0], 'x') || 0;
            z.image.startY = s.getTranslate(z.gesture.imageWrap[0], 'y') || 0;
            z.gesture.slideWidth = z.gesture.slide[0].offsetWidth;
            z.gesture.slideHeight = z.gesture.slide[0].offsetHeight;
            z.gesture.imageWrap.transition(0);
            if (s.rtl) z.image.startX = -z.image.startX;
            if (s.rtl) z.image.startY = -z.image.startY;
        }
        // Define if we need image drag
        var scaledWidth = z.image.width * z.scale;
        var scaledHeight = z.image.height * z.scale;

        if (scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight) return;

        z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
        z.image.maxX = -z.image.minX;
        z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
        z.image.maxY = -z.image.minY;

        z.image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        z.image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

        if (!z.image.isMoved && !z.isScaling) {
            if (s.isHorizontal() &&
                (Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x) ||
                (Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x)
                ) {
                z.image.isTouched = false;
                return;
            }
            else if (!s.isHorizontal() &&
                (Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y) ||
                (Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y)
                ) {
                z.image.isTouched = false;
                return;
            }
        }
        e.preventDefault();
        e.stopPropagation();

        z.image.isMoved = true;
        z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX;
        z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY;

        if (z.image.currentX < z.image.minX) {
            z.image.currentX =  z.image.minX + 1 - Math.pow((z.image.minX - z.image.currentX + 1), 0.8);
        }
        if (z.image.currentX > z.image.maxX) {
            z.image.currentX = z.image.maxX - 1 + Math.pow((z.image.currentX - z.image.maxX + 1), 0.8);
        }

        if (z.image.currentY < z.image.minY) {
            z.image.currentY =  z.image.minY + 1 - Math.pow((z.image.minY - z.image.currentY + 1), 0.8);
        }
        if (z.image.currentY > z.image.maxY) {
            z.image.currentY = z.image.maxY - 1 + Math.pow((z.image.currentY - z.image.maxY + 1), 0.8);
        }

        //Velocity
        if (!z.velocity.prevPositionX) z.velocity.prevPositionX = z.image.touchesCurrent.x;
        if (!z.velocity.prevPositionY) z.velocity.prevPositionY = z.image.touchesCurrent.y;
        if (!z.velocity.prevTime) z.velocity.prevTime = Date.now();
        z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2;
        z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2;
        if (Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2) z.velocity.x = 0;
        if (Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2) z.velocity.y = 0;
        z.velocity.prevPositionX = z.image.touchesCurrent.x;
        z.velocity.prevPositionY = z.image.touchesCurrent.y;
        z.velocity.prevTime = Date.now();

        z.gesture.imageWrap.transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
    },
    onTouchEnd: function (s, e) {
        var z = s.zoom;
        if (!z.gesture.image || z.gesture.image.length === 0) return;
        if (!z.image.isTouched || !z.image.isMoved) {
            z.image.isTouched = false;
            z.image.isMoved = false;
            return;
        }
        z.image.isTouched = false;
        z.image.isMoved = false;
        var momentumDurationX = 300;
        var momentumDurationY = 300;
        var momentumDistanceX = z.velocity.x * momentumDurationX;
        var newPositionX = z.image.currentX + momentumDistanceX;
        var momentumDistanceY = z.velocity.y * momentumDurationY;
        var newPositionY = z.image.currentY + momentumDistanceY;

        //Fix duration
        if (z.velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x);
        if (z.velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y);
        var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

        z.image.currentX = newPositionX;
        z.image.currentY = newPositionY;

        // Define if we need image drag
        var scaledWidth = z.image.width * z.scale;
        var scaledHeight = z.image.height * z.scale;
        z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
        z.image.maxX = -z.image.minX;
        z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
        z.image.maxY = -z.image.minY;
        z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX);
        z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY);

        z.gesture.imageWrap.transition(momentumDuration).transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
    },
    onTransitionEnd: function (s) {
        var z = s.zoom;
        if (z.gesture.slide && s.previousIndex !== s.activeIndex) {
            z.gesture.image.transform('translate3d(0,0,0) scale(1)');
            z.gesture.imageWrap.transform('translate3d(0,0,0)');
            z.gesture.slide = z.gesture.image = z.gesture.imageWrap = undefined;
            z.scale = z.currentScale = 1;
        }
    },
    // Toggle Zoom
    toggleZoom: function (s, e) {
        var z = s.zoom;
        if (!z.gesture.slide) {
            z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex);
            z.gesture.image = z.gesture.slide.find('img, svg, canvas');
            z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
        }
        if (!z.gesture.image || z.gesture.image.length === 0) return;

        var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;

        if (typeof z.image.touchesStart.x === 'undefined' && e) {
            touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
            touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
        }
        else {
            touchX = z.image.touchesStart.x;
            touchY = z.image.touchesStart.y;
        }

        if (z.scale && z.scale !== 1) {
            // Zoom Out
            z.scale = z.currentScale = 1;
            z.gesture.imageWrap.transition(300).transform('translate3d(0,0,0)');
            z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(1)');
            z.gesture.slide = undefined;
        }
        else {
            // Zoom In
            z.scale = z.currentScale = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
            if (e) {
                slideWidth = z.gesture.slide[0].offsetWidth;
                slideHeight = z.gesture.slide[0].offsetHeight;
                offsetX = z.gesture.slide.offset().left;
                offsetY = z.gesture.slide.offset().top;
                diffX = offsetX + slideWidth/2 - touchX;
                diffY = offsetY + slideHeight/2 - touchY;

                imageWidth = z.gesture.image[0].offsetWidth;
                imageHeight = z.gesture.image[0].offsetHeight;
                scaledWidth = imageWidth * z.scale;
                scaledHeight = imageHeight * z.scale;

                translateMinX = Math.min((slideWidth / 2 - scaledWidth / 2), 0);
                translateMinY = Math.min((slideHeight / 2 - scaledHeight / 2), 0);
                translateMaxX = -translateMinX;
                translateMaxY = -translateMinY;

                translateX = diffX * z.scale;
                translateY = diffY * z.scale;

                if (translateX < translateMinX) {
                    translateX =  translateMinX;
                }
                if (translateX > translateMaxX) {
                    translateX = translateMaxX;
                }

                if (translateY < translateMinY) {
                    translateY =  translateMinY;
                }
                if (translateY > translateMaxY) {
                    translateY = translateMaxY;
                }
            }
            else {
                translateX = 0;
                translateY = 0;
            }
            z.gesture.imageWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
            z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(' + z.scale + ')');
        }
    },
    // Attach/Detach Events
    attachEvents: function (detach) {
        var action = detach ? 'off' : 'on';

        if (s.params.zoom) {
            var target = s.slides;
            var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
            // Scale image
            if (s.support.gestures) {
                s.slides[action]('gesturestart', s.zoom.onGestureStart, passiveListener);
                s.slides[action]('gesturechange', s.zoom.onGestureChange, passiveListener);
                s.slides[action]('gestureend', s.zoom.onGestureEnd, passiveListener);
            }
            else if (s.touchEvents.start === 'touchstart') {
                s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener);
                s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener);
                s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener);
            }

            // Move image
            s[action]('touchStart', s.zoom.onTouchStart);
            s.slides.each(function (index, slide){
                if ($(slide).find('.' + s.params.zoomContainerClass).length > 0) {
                    $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove);
                }
            });
            s[action]('touchEnd', s.zoom.onTouchEnd);

            // Scale Out
            s[action]('transitionEnd', s.zoom.onTransitionEnd);
            if (s.params.zoomToggle) {
                s.on('doubleTap', s.zoom.toggleZoom);
            }
        }
    },
    init: function () {
        s.zoom.attachEvents();
    },
    destroy: function () {
        s.zoom.attachEvents(true);
    }
};
