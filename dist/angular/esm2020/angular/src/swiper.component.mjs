import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostBinding, Inject, Input, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, } from '@angular/core';
// @ts-ignore
import Swiper from 'swiper';
import { of, Subject } from 'rxjs';
import { getParams } from './utils/get-params';
import { SwiperSlideDirective } from './swiper-slide.directive';
import { extend, isObject, setProperty, ignoreNgOnChanges, coerceBooleanProperty, isShowEl, isEnabled, } from './utils/utils';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SwiperComponent {
    constructor(_ngZone, elementRef, _changeDetectorRef, _platformId) {
        this._ngZone = _ngZone;
        this.elementRef = elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._platformId = _platformId;
        this.slideClass = 'swiper-slide';
        this.wrapperClass = 'swiper-wrapper';
        this.showNavigation = true;
        this.showPagination = true;
        this.showScrollbar = true;
        this.s__beforeBreakpoint = new EventEmitter();
        this.s__containerClasses = new EventEmitter();
        this.s__slideClass = new EventEmitter();
        this.s__swiper = new EventEmitter();
        this.s_activeIndexChange = new EventEmitter();
        this.s_afterInit = new EventEmitter();
        this.s_autoplay = new EventEmitter();
        this.s_autoplayStart = new EventEmitter();
        this.s_autoplayStop = new EventEmitter();
        this.s_autoplayPause = new EventEmitter();
        this.s_autoplayResume = new EventEmitter();
        this.s_beforeDestroy = new EventEmitter();
        this.s_beforeInit = new EventEmitter();
        this.s_beforeLoopFix = new EventEmitter();
        this.s_beforeResize = new EventEmitter();
        this.s_beforeSlideChangeStart = new EventEmitter();
        this.s_beforeTransitionStart = new EventEmitter();
        this.s_breakpoint = new EventEmitter();
        this.s_changeDirection = new EventEmitter();
        this.s_click = new EventEmitter();
        this.s_doubleTap = new EventEmitter();
        this.s_doubleClick = new EventEmitter();
        this.s_destroy = new EventEmitter();
        this.s_fromEdge = new EventEmitter();
        this.s_hashChange = new EventEmitter();
        this.s_hashSet = new EventEmitter();
        this.s_imagesReady = new EventEmitter();
        this.s_init = new EventEmitter();
        this.s_keyPress = new EventEmitter();
        this.s_lazyImageLoad = new EventEmitter();
        this.s_lazyImageReady = new EventEmitter();
        this.s_loopFix = new EventEmitter();
        this.s_momentumBounce = new EventEmitter();
        this.s_navigationHide = new EventEmitter();
        this.s_navigationShow = new EventEmitter();
        this.s_observerUpdate = new EventEmitter();
        this.s_orientationchange = new EventEmitter();
        this.s_paginationHide = new EventEmitter();
        this.s_paginationRender = new EventEmitter();
        this.s_paginationShow = new EventEmitter();
        this.s_paginationUpdate = new EventEmitter();
        this.s_progress = new EventEmitter();
        this.s_reachBeginning = new EventEmitter();
        this.s_reachEnd = new EventEmitter();
        this.s_realIndexChange = new EventEmitter();
        this.s_resize = new EventEmitter();
        this.s_scroll = new EventEmitter();
        this.s_scrollbarDragEnd = new EventEmitter();
        this.s_scrollbarDragMove = new EventEmitter();
        this.s_scrollbarDragStart = new EventEmitter();
        this.s_setTransition = new EventEmitter();
        this.s_setTranslate = new EventEmitter();
        this.s_slideChange = new EventEmitter();
        this.s_slideChangeTransitionEnd = new EventEmitter();
        this.s_slideChangeTransitionStart = new EventEmitter();
        this.s_slideNextTransitionEnd = new EventEmitter();
        this.s_slideNextTransitionStart = new EventEmitter();
        this.s_slidePrevTransitionEnd = new EventEmitter();
        this.s_slidePrevTransitionStart = new EventEmitter();
        this.s_slideResetTransitionStart = new EventEmitter();
        this.s_slideResetTransitionEnd = new EventEmitter();
        this.s_sliderMove = new EventEmitter();
        this.s_sliderFirstMove = new EventEmitter();
        this.s_slidesLengthChange = new EventEmitter();
        this.s_slidesGridLengthChange = new EventEmitter();
        this.s_snapGridLengthChange = new EventEmitter();
        this.s_snapIndexChange = new EventEmitter();
        this.s_tap = new EventEmitter();
        this.s_toEdge = new EventEmitter();
        this.s_touchEnd = new EventEmitter();
        this.s_touchMove = new EventEmitter();
        this.s_touchMoveOpposite = new EventEmitter();
        this.s_touchStart = new EventEmitter();
        this.s_transitionEnd = new EventEmitter();
        this.s_transitionStart = new EventEmitter();
        this.s_update = new EventEmitter();
        this.s_zoomChange = new EventEmitter();
        this.s_swiper = new EventEmitter();
        this.s_lock = new EventEmitter();
        this.s_unlock = new EventEmitter();
        this._activeSlides = new Subject();
        this.containerClasses = 'swiper';
        this.slidesChanges = (val) => {
            this.slides = val.map((slide, index) => {
                slide.slideIndex = index;
                slide.classNames = this.slideClass || '';
                return slide;
            });
            if (this.loop && !this.loopedSlides) {
                this.calcLoopedSlides();
            }
            if (!this.virtual) {
                if (this.loopedSlides) {
                    this.prependSlides = of(this.slides.slice(this.slides.length - this.loopedSlides));
                    this.appendSlides = of(this.slides.slice(0, this.loopedSlides));
                }
            }
            else if (this.swiperRef && this.swiperRef.virtual) {
                this._ngZone.runOutsideAngular(() => {
                    this.swiperRef.virtual.slides = this.slides;
                    this.swiperRef.virtual.update(true);
                });
            }
            this._changeDetectorRef.detectChanges();
        };
        this.style = null;
        this.updateVirtualSlides = (virtualData) => {
            // TODO: type virtualData
            if (!this.swiperRef ||
                (this.currentVirtualData &&
                    this.currentVirtualData.from === virtualData.from &&
                    this.currentVirtualData.to === virtualData.to &&
                    this.currentVirtualData.offset === virtualData.offset)) {
                return;
            }
            this.style = this.swiperRef.isHorizontal()
                ? {
                    [this.swiperRef.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`,
                }
                : {
                    top: `${virtualData.offset}px`,
                };
            this.currentVirtualData = virtualData;
            this._activeSlides.next(virtualData.slides);
            this._ngZone.run(() => {
                this._changeDetectorRef.detectChanges();
            });
            this._ngZone.runOutsideAngular(() => {
                this.swiperRef.updateSlides();
                this.swiperRef.updateProgress();
                this.swiperRef.updateSlidesClasses();
                if (isEnabled(this.swiperRef.params.lazy)) {
                    this.swiperRef.lazy.load();
                }
                this.swiperRef.virtual.update(true);
            });
            return;
        };
    }
    set navigation(val) {
        const currentNext = typeof this._navigation !== 'boolean' && this._navigation !== ''
            ? this._navigation?.nextEl
            : null;
        const currentPrev = typeof this._navigation !== 'boolean' && this._navigation !== ''
            ? this._navigation?.prevEl
            : null;
        this._navigation = setProperty(val, {
            nextEl: currentNext || null,
            prevEl: currentPrev || null,
        });
        this.showNavigation = !(coerceBooleanProperty(val) !== true ||
            (this._navigation &&
                typeof this._navigation !== 'boolean' &&
                this._navigation.prevEl !== this._prevElRef?.nativeElement &&
                (this._navigation.prevEl !== null || this._navigation.nextEl !== null) &&
                (typeof this._navigation.nextEl === 'string' ||
                    typeof this._navigation.prevEl === 'string' ||
                    typeof this._navigation.nextEl === 'object' ||
                    typeof this._navigation.prevEl === 'object')));
    }
    get navigation() {
        return this._navigation;
    }
    set pagination(val) {
        const current = typeof this._pagination !== 'boolean' && this._pagination !== ''
            ? this._pagination?.el
            : null;
        this._pagination = setProperty(val, {
            el: current || null,
        });
        this.showPagination = isShowEl(val, this._pagination, this._paginationElRef);
    }
    get pagination() {
        return this._pagination;
    }
    set scrollbar(val) {
        const current = typeof this._scrollbar !== 'boolean' && this._scrollbar !== '' ? this._scrollbar?.el : null;
        this._scrollbar = setProperty(val, {
            el: current || null,
        });
        this.showScrollbar = isShowEl(val, this._scrollbar, this._scrollbarElRef);
    }
    get scrollbar() {
        return this._scrollbar;
    }
    set virtual(val) {
        this._virtual = setProperty(val);
    }
    get virtual() {
        return this._virtual;
    }
    set config(val) {
        this.updateSwiper(val);
        const { params } = getParams(val);
        Object.assign(this, params);
    }
    set prevElRef(el) {
        this._prevElRef = el;
        this._setElement(el, this.navigation, 'navigation', 'prevEl');
    }
    set nextElRef(el) {
        this._nextElRef = el;
        this._setElement(el, this.navigation, 'navigation', 'nextEl');
    }
    set scrollbarElRef(el) {
        this._scrollbarElRef = el;
        this._setElement(el, this.scrollbar, 'scrollbar');
    }
    set paginationElRef(el) {
        this._paginationElRef = el;
        this._setElement(el, this.pagination, 'pagination');
    }
    get activeSlides() {
        if (this.virtual) {
            return this._activeSlides;
        }
        return of(this.slides);
    }
    get zoomContainerClass() {
        return this.zoom && typeof this.zoom !== 'boolean'
            ? this.zoom.containerClass
            : 'swiper-zoom-container';
    }
    _setElement(el, ref, update, key = 'el') {
        if (!ref || !el)
            return;
        if (el.nativeElement) {
            if (ref[key] === el.nativeElement) {
                return;
            }
            ref[key] = el.nativeElement;
        }
        const updateObj = {};
        updateObj[update] = true;
        this.updateInitSwiper(updateObj);
    }
    ngOnInit() {
        const { params } = getParams(this);
        Object.assign(this, params);
    }
    ngAfterViewInit() {
        this.childrenSlidesInit();
        this.initSwiper();
        this._changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.s_swiper.emit(this.swiperRef);
        });
    }
    childrenSlidesInit() {
        this.slidesChanges(this.slidesEl);
        this.slidesEl.changes.subscribe(this.slidesChanges);
    }
    get isSwiperActive() {
        return this.swiperRef && !this.swiperRef.destroyed;
    }
    initSwiper() {
        const { params: swiperParams, passedParams } = getParams(this);
        Object.assign(this, swiperParams);
        this._ngZone.runOutsideAngular(() => {
            swiperParams.init = false;
            if (!swiperParams.virtual) {
                swiperParams.observer = true;
            }
            swiperParams.onAny = (eventName, ...args) => {
                const emitter = this[('s_' + eventName)];
                if (emitter) {
                    emitter.emit([...args]);
                }
            };
            const _slideClasses = (_, updated) => {
                updated.forEach(({ slideEl, classNames }, index) => {
                    const dataIndex = slideEl.getAttribute('data-swiper-slide-index');
                    const slideIndex = dataIndex ? parseInt(dataIndex) : index;
                    if (this.virtual) {
                        const virtualSlide = this.slides.find((item) => {
                            return item.virtualIndex && item.virtualIndex === slideIndex;
                        });
                        if (virtualSlide) {
                            virtualSlide.classNames = classNames;
                            return;
                        }
                    }
                    if (this.slides[slideIndex]) {
                        this.slides[slideIndex].classNames = classNames;
                    }
                });
                this._changeDetectorRef.detectChanges();
            };
            const _containerClasses = (_, classes) => {
                setTimeout(() => {
                    this.containerClasses = classes;
                });
            };
            Object.assign(swiperParams.on, {
                _containerClasses,
                _slideClasses,
            });
            const swiperRef = new Swiper(swiperParams);
            swiperRef.loopCreate = () => { };
            swiperRef.loopDestroy = () => { };
            if (swiperParams.loop) {
                swiperRef.loopedSlides = this.loopedSlides;
            }
            const isVirtualEnabled = isEnabled(swiperRef.params.virtual);
            if (swiperRef.virtual && isVirtualEnabled) {
                swiperRef.virtual.slides = this.slides;
                const extendWith = {
                    cache: false,
                    slides: this.slides,
                    renderExternal: this.updateVirtualSlides,
                    renderExternalUpdate: false,
                };
                extend(swiperRef.params.virtual, extendWith);
                extend(swiperRef.originalParams.virtual, extendWith);
            }
            if (isPlatformBrowser(this._platformId)) {
                this.swiperRef = swiperRef.init(this.elementRef.nativeElement);
                const isVirtualEnabled = isEnabled(this.swiperRef.params.virtual);
                if (this.swiperRef.virtual && isVirtualEnabled) {
                    this.swiperRef.virtual.update(true);
                }
                this._changeDetectorRef.detectChanges();
            }
        });
    }
    ngOnChanges(changedParams) {
        this.updateSwiper(changedParams);
        this._changeDetectorRef.detectChanges();
    }
    updateInitSwiper(changedParams) {
        if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        this._ngZone.runOutsideAngular(() => {
            const { params: currentParams, pagination, navigation, scrollbar, virtual, thumbs, } = this.swiperRef;
            if (changedParams.pagination) {
                if (this.pagination &&
                    typeof this.pagination !== 'boolean' &&
                    this.pagination.el &&
                    pagination &&
                    !pagination.el) {
                    this.updateParameter('pagination', this.pagination);
                    pagination.init();
                    pagination.render();
                    pagination.update();
                }
                else {
                    pagination.destroy();
                    pagination.el = null;
                }
            }
            if (changedParams.scrollbar) {
                if (this.scrollbar &&
                    typeof this.scrollbar !== 'boolean' &&
                    this.scrollbar.el &&
                    scrollbar &&
                    !scrollbar.el) {
                    this.updateParameter('scrollbar', this.scrollbar);
                    scrollbar.init();
                    scrollbar.updateSize();
                    scrollbar.setTranslate();
                }
                else {
                    scrollbar.destroy();
                    scrollbar.el = null;
                }
            }
            if (changedParams.navigation) {
                if (this.navigation &&
                    typeof this.navigation !== 'boolean' &&
                    this.navigation.prevEl &&
                    this.navigation.nextEl &&
                    navigation &&
                    !navigation.prevEl &&
                    !navigation.nextEl) {
                    this.updateParameter('navigation', this.navigation);
                    navigation.init();
                    navigation.update();
                }
                else if (navigation.prevEl && navigation.nextEl) {
                    navigation.destroy();
                    navigation.nextEl = null;
                    navigation.prevEl = null;
                }
            }
            if (changedParams.thumbs && this.thumbs && this.thumbs.swiper) {
                this.updateParameter('thumbs', this.thumbs);
                const initialized = thumbs.init();
                if (initialized)
                    thumbs.update(true);
            }
            if (changedParams.controller && this.controller && this.controller.control) {
                this.swiperRef.controller.control = this.controller.control;
            }
            this.swiperRef.update();
        });
    }
    updateSwiper(changedParams) {
        this._ngZone.runOutsideAngular(() => {
            if (changedParams.config) {
                return;
            }
            if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
                return;
            }
            for (const key in changedParams) {
                if (ignoreNgOnChanges.indexOf(key) >= 0) {
                    continue;
                }
                const newValue = changedParams[key]?.currentValue ?? changedParams[key];
                this.updateParameter(key, newValue);
            }
            if (changedParams.allowSlideNext) {
                this.swiperRef.allowSlideNext = this.allowSlideNext;
            }
            if (changedParams.allowSlidePrev) {
                this.swiperRef.allowSlidePrev = this.allowSlidePrev;
            }
            if (changedParams.direction) {
                this.swiperRef.changeDirection(this.direction, false);
            }
            if (changedParams.breakpoints) {
                if (this.loop && !this.loopedSlides) {
                    this.calcLoopedSlides();
                }
                this.swiperRef.currentBreakpoint = null;
                this.swiperRef.setBreakpoint();
            }
            if (changedParams.thumbs || changedParams.controller) {
                this.updateInitSwiper(changedParams);
            }
            this.swiperRef.update();
        });
    }
    calcLoopedSlides() {
        if (!this.loop) {
            return false;
        }
        let slidesPerViewParams = this.slidesPerView;
        if (this.breakpoints) {
            const breakpoint = Swiper.prototype.getBreakpoint(this.breakpoints);
            const breakpointOnlyParams = breakpoint in this.breakpoints ? this.breakpoints[breakpoint] : undefined;
            if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
                slidesPerViewParams = breakpointOnlyParams.slidesPerView;
            }
        }
        if (slidesPerViewParams === 'auto') {
            this.loopedSlides = this.slides.length;
            return this.slides.length;
        }
        let loopedSlides = this.loopedSlides || slidesPerViewParams;
        if (!loopedSlides) {
            // ?
            return false;
        }
        if (this.loopAdditionalSlides) {
            loopedSlides += this.loopAdditionalSlides;
        }
        if (loopedSlides > this.slides.length) {
            loopedSlides = this.slides.length;
        }
        this.loopedSlides = loopedSlides;
        return true;
    }
    updateParameter(key, value) {
        if (!(this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        const _key = key.replace(/^_/, '');
        const isCurrentParamObj = isObject(this.swiperRef.params[_key]);
        if (_key === 'enabled') {
            if (value === true) {
                this.swiperRef.enable();
            }
            else if (value === false) {
                this.swiperRef.disable();
            }
            return;
        }
        if (isCurrentParamObj && isObject(value)) {
            extend(this.swiperRef.params[_key], value);
        }
        else {
            this.swiperRef.params[_key] = value;
        }
    }
    ngOnDestroy() {
        this._ngZone.runOutsideAngular(() => {
            this.swiperRef?.destroy(true, false);
        });
    }
}
SwiperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: SwiperComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
SwiperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.2", type: SwiperComponent, selector: "swiper, [swiper]", inputs: { enabled: "enabled", on: "on", direction: "direction", touchEventsTarget: "touchEventsTarget", initialSlide: "initialSlide", speed: "speed", cssMode: "cssMode", updateOnWindowResize: "updateOnWindowResize", resizeObserver: "resizeObserver", nested: "nested", focusableElements: "focusableElements", width: "width", height: "height", preventInteractionOnTransition: "preventInteractionOnTransition", userAgent: "userAgent", url: "url", edgeSwipeDetection: "edgeSwipeDetection", edgeSwipeThreshold: "edgeSwipeThreshold", freeMode: "freeMode", autoHeight: "autoHeight", setWrapperSize: "setWrapperSize", virtualTranslate: "virtualTranslate", effect: "effect", breakpoints: "breakpoints", spaceBetween: "spaceBetween", slidesPerView: "slidesPerView", maxBackfaceHiddenSlides: "maxBackfaceHiddenSlides", grid: "grid", slidesPerGroup: "slidesPerGroup", slidesPerGroupSkip: "slidesPerGroupSkip", centeredSlides: "centeredSlides", centeredSlidesBounds: "centeredSlidesBounds", slidesOffsetBefore: "slidesOffsetBefore", slidesOffsetAfter: "slidesOffsetAfter", normalizeSlideIndex: "normalizeSlideIndex", centerInsufficientSlides: "centerInsufficientSlides", watchOverflow: "watchOverflow", roundLengths: "roundLengths", touchRatio: "touchRatio", touchAngle: "touchAngle", simulateTouch: "simulateTouch", shortSwipes: "shortSwipes", longSwipes: "longSwipes", longSwipesRatio: "longSwipesRatio", longSwipesMs: "longSwipesMs", followFinger: "followFinger", allowTouchMove: "allowTouchMove", threshold: "threshold", touchMoveStopPropagation: "touchMoveStopPropagation", touchStartPreventDefault: "touchStartPreventDefault", touchStartForcePreventDefault: "touchStartForcePreventDefault", touchReleaseOnEdges: "touchReleaseOnEdges", uniqueNavElements: "uniqueNavElements", resistance: "resistance", resistanceRatio: "resistanceRatio", watchSlidesProgress: "watchSlidesProgress", grabCursor: "grabCursor", preventClicks: "preventClicks", preventClicksPropagation: "preventClicksPropagation", slideToClickedSlide: "slideToClickedSlide", preloadImages: "preloadImages", updateOnImagesReady: "updateOnImagesReady", loop: "loop", loopAdditionalSlides: "loopAdditionalSlides", loopedSlides: "loopedSlides", loopFillGroupWithBlank: "loopFillGroupWithBlank", loopPreventsSlide: "loopPreventsSlide", rewind: "rewind", allowSlidePrev: "allowSlidePrev", allowSlideNext: "allowSlideNext", swipeHandler: "swipeHandler", noSwiping: "noSwiping", noSwipingClass: "noSwipingClass", noSwipingSelector: "noSwipingSelector", passiveListeners: "passiveListeners", containerModifierClass: "containerModifierClass", slideClass: "slideClass", slideBlankClass: "slideBlankClass", slideActiveClass: "slideActiveClass", slideDuplicateActiveClass: "slideDuplicateActiveClass", slideVisibleClass: "slideVisibleClass", slideDuplicateClass: "slideDuplicateClass", slideNextClass: "slideNextClass", slideDuplicateNextClass: "slideDuplicateNextClass", slidePrevClass: "slidePrevClass", slideDuplicatePrevClass: "slideDuplicatePrevClass", wrapperClass: "wrapperClass", runCallbacksOnInit: "runCallbacksOnInit", observeParents: "observeParents", observeSlideChildren: "observeSlideChildren", a11y: "a11y", autoplay: "autoplay", controller: "controller", coverflowEffect: "coverflowEffect", cubeEffect: "cubeEffect", fadeEffect: "fadeEffect", flipEffect: "flipEffect", creativeEffect: "creativeEffect", cardsEffect: "cardsEffect", panoramaEffect: "panoramaEffect", hashNavigation: "hashNavigation", history: "history", keyboard: "keyboard", lazy: "lazy", mousewheel: "mousewheel", parallax: "parallax", thumbs: "thumbs", zoom: "zoom", class: "class", id: "id", navigation: "navigation", pagination: "pagination", scrollbar: "scrollbar", virtual: "virtual", config: "config" }, outputs: { s__beforeBreakpoint: "_beforeBreakpoint", s__containerClasses: "_containerClasses", s__slideClass: "_slideClass", s__swiper: "_swiper", s_activeIndexChange: "activeIndexChange", s_afterInit: "afterInit", s_autoplay: "autoplay", s_autoplayStart: "autoplayStart", s_autoplayStop: "autoplayStop", s_autoplayPause: "autoplayPause", s_autoplayResume: "autoplayResume", s_beforeDestroy: "beforeDestroy", s_beforeInit: "beforeInit", s_beforeLoopFix: "beforeLoopFix", s_beforeResize: "beforeResize", s_beforeSlideChangeStart: "beforeSlideChangeStart", s_beforeTransitionStart: "beforeTransitionStart", s_breakpoint: "breakpoint", s_changeDirection: "changeDirection", s_click: "click", s_doubleTap: "doubleTap", s_doubleClick: "doubleClick", s_destroy: "destroy", s_fromEdge: "fromEdge", s_hashChange: "hashChange", s_hashSet: "hashSet", s_imagesReady: "imagesReady", s_init: "init", s_keyPress: "keyPress", s_lazyImageLoad: "lazyImageLoad", s_lazyImageReady: "lazyImageReady", s_loopFix: "loopFix", s_momentumBounce: "momentumBounce", s_navigationHide: "navigationHide", s_navigationShow: "navigationShow", s_observerUpdate: "observerUpdate", s_orientationchange: "orientationchange", s_paginationHide: "paginationHide", s_paginationRender: "paginationRender", s_paginationShow: "paginationShow", s_paginationUpdate: "paginationUpdate", s_progress: "progress", s_reachBeginning: "reachBeginning", s_reachEnd: "reachEnd", s_realIndexChange: "realIndexChange", s_resize: "resize", s_scroll: "scroll", s_scrollbarDragEnd: "scrollbarDragEnd", s_scrollbarDragMove: "scrollbarDragMove", s_scrollbarDragStart: "scrollbarDragStart", s_setTransition: "setTransition", s_setTranslate: "setTranslate", s_slideChange: "slideChange", s_slideChangeTransitionEnd: "slideChangeTransitionEnd", s_slideChangeTransitionStart: "slideChangeTransitionStart", s_slideNextTransitionEnd: "slideNextTransitionEnd", s_slideNextTransitionStart: "slideNextTransitionStart", s_slidePrevTransitionEnd: "slidePrevTransitionEnd", s_slidePrevTransitionStart: "slidePrevTransitionStart", s_slideResetTransitionStart: "slideResetTransitionStart", s_slideResetTransitionEnd: "slideResetTransitionEnd", s_sliderMove: "sliderMove", s_sliderFirstMove: "sliderFirstMove", s_slidesLengthChange: "slidesLengthChange", s_slidesGridLengthChange: "slidesGridLengthChange", s_snapGridLengthChange: "snapGridLengthChange", s_snapIndexChange: "snapIndexChange", s_tap: "tap", s_toEdge: "toEdge", s_touchEnd: "touchEnd", s_touchMove: "touchMove", s_touchMoveOpposite: "touchMoveOpposite", s_touchStart: "touchStart", s_transitionEnd: "transitionEnd", s_transitionStart: "transitionStart", s_update: "update", s_zoomChange: "zoomChange", s_swiper: "swiper", s_lock: "lock", s_unlock: "unlock" }, host: { properties: { "class": "this.containerClasses" } }, queries: [{ propertyName: "slidesEl", predicate: SwiperSlideDirective }], viewQueries: [{ propertyName: "prevElRef", first: true, predicate: ["prevElRef"], descendants: true }, { propertyName: "nextElRef", first: true, predicate: ["nextElRef"], descendants: true }, { propertyName: "scrollbarElRef", first: true, predicate: ["scrollbarElRef"], descendants: true }, { propertyName: "paginationElRef", first: true, predicate: ["paginationElRef"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-content select=\"[slot=container-start]\"></ng-content>\n<ng-container *ngIf=\"navigation && showNavigation\">\n  <div class=\"swiper-button-prev\" #prevElRef></div>\n  <div class=\"swiper-button-next\" #nextElRef></div>\n</ng-container>\n<div *ngIf=\"scrollbar && showScrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\n<div *ngIf=\"pagination && showPagination\" class=\"swiper-pagination\" #paginationElRef></div>\n<div [ngClass]=\"wrapperClass\" [attr.id]=\"id\">\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: prependSlides,\n        key: 'prepend'\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: activeSlides,\n        key: ''\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: appendSlides,\n        key: 'append'\n      }\n    \"\n  ></ng-template>\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\n</div>\n<ng-content select=\"[slot=container-end]\"></ng-content>\n\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\n  <div\n    *ngFor=\"let slide of loopSlides | async\"\n    [ngClass]=\"\n      (slide.class ? slide.class + ' ' : '') +\n      slideClass +\n      (slideKey !== '' ? ' ' + slideDuplicateClass : '')\n    \"\n    [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\"\n    [attr.data-swiper-autoplay]=\"slide.autoplayDelay\"\n    [style]=\"style\"\n    [ngSwitch]=\"slide.zoom\"\n  >\n    <div *ngSwitchCase=\"true\" [ngClass]=\"zoomContainerClass\">\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </div>\n    <ng-container *ngSwitchDefault>\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </ng-container>\n  </div>\n</ng-template>\n", styles: ["swiper{display:block}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }], pipes: { "async": i1.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: SwiperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'swiper, [swiper]', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [
                        `
      swiper {
        display: block;
      }
    `,
                    ], template: "<ng-content select=\"[slot=container-start]\"></ng-content>\n<ng-container *ngIf=\"navigation && showNavigation\">\n  <div class=\"swiper-button-prev\" #prevElRef></div>\n  <div class=\"swiper-button-next\" #nextElRef></div>\n</ng-container>\n<div *ngIf=\"scrollbar && showScrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\n<div *ngIf=\"pagination && showPagination\" class=\"swiper-pagination\" #paginationElRef></div>\n<div [ngClass]=\"wrapperClass\" [attr.id]=\"id\">\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: prependSlides,\n        key: 'prepend'\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: activeSlides,\n        key: ''\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: appendSlides,\n        key: 'append'\n      }\n    \"\n  ></ng-template>\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\n</div>\n<ng-content select=\"[slot=container-end]\"></ng-content>\n\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\n  <div\n    *ngFor=\"let slide of loopSlides | async\"\n    [ngClass]=\"\n      (slide.class ? slide.class + ' ' : '') +\n      slideClass +\n      (slideKey !== '' ? ' ' + slideDuplicateClass : '')\n    \"\n    [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\"\n    [attr.data-swiper-autoplay]=\"slide.autoplayDelay\"\n    [style]=\"style\"\n    [ngSwitch]=\"slide.zoom\"\n  >\n    <div *ngSwitchCase=\"true\" [ngClass]=\"zoomContainerClass\">\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </div>\n    <ng-container *ngSwitchDefault>\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </ng-container>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { enabled: [{
                type: Input
            }], on: [{
                type: Input
            }], direction: [{
                type: Input
            }], touchEventsTarget: [{
                type: Input
            }], initialSlide: [{
                type: Input
            }], speed: [{
                type: Input
            }], cssMode: [{
                type: Input
            }], updateOnWindowResize: [{
                type: Input
            }], resizeObserver: [{
                type: Input
            }], nested: [{
                type: Input
            }], focusableElements: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], preventInteractionOnTransition: [{
                type: Input
            }], userAgent: [{
                type: Input
            }], url: [{
                type: Input
            }], edgeSwipeDetection: [{
                type: Input
            }], edgeSwipeThreshold: [{
                type: Input
            }], freeMode: [{
                type: Input
            }], autoHeight: [{
                type: Input
            }], setWrapperSize: [{
                type: Input
            }], virtualTranslate: [{
                type: Input
            }], effect: [{
                type: Input
            }], breakpoints: [{
                type: Input
            }], spaceBetween: [{
                type: Input
            }], slidesPerView: [{
                type: Input
            }], maxBackfaceHiddenSlides: [{
                type: Input
            }], grid: [{
                type: Input
            }], slidesPerGroup: [{
                type: Input
            }], slidesPerGroupSkip: [{
                type: Input
            }], centeredSlides: [{
                type: Input
            }], centeredSlidesBounds: [{
                type: Input
            }], slidesOffsetBefore: [{
                type: Input
            }], slidesOffsetAfter: [{
                type: Input
            }], normalizeSlideIndex: [{
                type: Input
            }], centerInsufficientSlides: [{
                type: Input
            }], watchOverflow: [{
                type: Input
            }], roundLengths: [{
                type: Input
            }], touchRatio: [{
                type: Input
            }], touchAngle: [{
                type: Input
            }], simulateTouch: [{
                type: Input
            }], shortSwipes: [{
                type: Input
            }], longSwipes: [{
                type: Input
            }], longSwipesRatio: [{
                type: Input
            }], longSwipesMs: [{
                type: Input
            }], followFinger: [{
                type: Input
            }], allowTouchMove: [{
                type: Input
            }], threshold: [{
                type: Input
            }], touchMoveStopPropagation: [{
                type: Input
            }], touchStartPreventDefault: [{
                type: Input
            }], touchStartForcePreventDefault: [{
                type: Input
            }], touchReleaseOnEdges: [{
                type: Input
            }], uniqueNavElements: [{
                type: Input
            }], resistance: [{
                type: Input
            }], resistanceRatio: [{
                type: Input
            }], watchSlidesProgress: [{
                type: Input
            }], grabCursor: [{
                type: Input
            }], preventClicks: [{
                type: Input
            }], preventClicksPropagation: [{
                type: Input
            }], slideToClickedSlide: [{
                type: Input
            }], preloadImages: [{
                type: Input
            }], updateOnImagesReady: [{
                type: Input
            }], loop: [{
                type: Input
            }], loopAdditionalSlides: [{
                type: Input
            }], loopedSlides: [{
                type: Input
            }], loopFillGroupWithBlank: [{
                type: Input
            }], loopPreventsSlide: [{
                type: Input
            }], rewind: [{
                type: Input
            }], allowSlidePrev: [{
                type: Input
            }], allowSlideNext: [{
                type: Input
            }], swipeHandler: [{
                type: Input
            }], noSwiping: [{
                type: Input
            }], noSwipingClass: [{
                type: Input
            }], noSwipingSelector: [{
                type: Input
            }], passiveListeners: [{
                type: Input
            }], containerModifierClass: [{
                type: Input
            }], slideClass: [{
                type: Input
            }], slideBlankClass: [{
                type: Input
            }], slideActiveClass: [{
                type: Input
            }], slideDuplicateActiveClass: [{
                type: Input
            }], slideVisibleClass: [{
                type: Input
            }], slideDuplicateClass: [{
                type: Input
            }], slideNextClass: [{
                type: Input
            }], slideDuplicateNextClass: [{
                type: Input
            }], slidePrevClass: [{
                type: Input
            }], slideDuplicatePrevClass: [{
                type: Input
            }], wrapperClass: [{
                type: Input
            }], runCallbacksOnInit: [{
                type: Input
            }], observeParents: [{
                type: Input
            }], observeSlideChildren: [{
                type: Input
            }], a11y: [{
                type: Input
            }], autoplay: [{
                type: Input
            }], controller: [{
                type: Input
            }], coverflowEffect: [{
                type: Input
            }], cubeEffect: [{
                type: Input
            }], fadeEffect: [{
                type: Input
            }], flipEffect: [{
                type: Input
            }], creativeEffect: [{
                type: Input
            }], cardsEffect: [{
                type: Input
            }], panoramaEffect: [{
                type: Input
            }], hashNavigation: [{
                type: Input
            }], history: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], lazy: [{
                type: Input
            }], mousewheel: [{
                type: Input
            }], parallax: [{
                type: Input
            }], thumbs: [{
                type: Input
            }], zoom: [{
                type: Input
            }], class: [{
                type: Input
            }], id: [{
                type: Input
            }], navigation: [{
                type: Input
            }], pagination: [{
                type: Input
            }], scrollbar: [{
                type: Input
            }], virtual: [{
                type: Input
            }], config: [{
                type: Input
            }], s__beforeBreakpoint: [{
                type: Output,
                args: ['_beforeBreakpoint']
            }], s__containerClasses: [{
                type: Output,
                args: ['_containerClasses']
            }], s__slideClass: [{
                type: Output,
                args: ['_slideClass']
            }], s__swiper: [{
                type: Output,
                args: ['_swiper']
            }], s_activeIndexChange: [{
                type: Output,
                args: ['activeIndexChange']
            }], s_afterInit: [{
                type: Output,
                args: ['afterInit']
            }], s_autoplay: [{
                type: Output,
                args: ['autoplay']
            }], s_autoplayStart: [{
                type: Output,
                args: ['autoplayStart']
            }], s_autoplayStop: [{
                type: Output,
                args: ['autoplayStop']
            }], s_autoplayPause: [{
                type: Output,
                args: ['autoplayPause']
            }], s_autoplayResume: [{
                type: Output,
                args: ['autoplayResume']
            }], s_beforeDestroy: [{
                type: Output,
                args: ['beforeDestroy']
            }], s_beforeInit: [{
                type: Output,
                args: ['beforeInit']
            }], s_beforeLoopFix: [{
                type: Output,
                args: ['beforeLoopFix']
            }], s_beforeResize: [{
                type: Output,
                args: ['beforeResize']
            }], s_beforeSlideChangeStart: [{
                type: Output,
                args: ['beforeSlideChangeStart']
            }], s_beforeTransitionStart: [{
                type: Output,
                args: ['beforeTransitionStart']
            }], s_breakpoint: [{
                type: Output,
                args: ['breakpoint']
            }], s_changeDirection: [{
                type: Output,
                args: ['changeDirection']
            }], s_click: [{
                type: Output,
                args: ['click']
            }], s_doubleTap: [{
                type: Output,
                args: ['doubleTap']
            }], s_doubleClick: [{
                type: Output,
                args: ['doubleClick']
            }], s_destroy: [{
                type: Output,
                args: ['destroy']
            }], s_fromEdge: [{
                type: Output,
                args: ['fromEdge']
            }], s_hashChange: [{
                type: Output,
                args: ['hashChange']
            }], s_hashSet: [{
                type: Output,
                args: ['hashSet']
            }], s_imagesReady: [{
                type: Output,
                args: ['imagesReady']
            }], s_init: [{
                type: Output,
                args: ['init']
            }], s_keyPress: [{
                type: Output,
                args: ['keyPress']
            }], s_lazyImageLoad: [{
                type: Output,
                args: ['lazyImageLoad']
            }], s_lazyImageReady: [{
                type: Output,
                args: ['lazyImageReady']
            }], s_loopFix: [{
                type: Output,
                args: ['loopFix']
            }], s_momentumBounce: [{
                type: Output,
                args: ['momentumBounce']
            }], s_navigationHide: [{
                type: Output,
                args: ['navigationHide']
            }], s_navigationShow: [{
                type: Output,
                args: ['navigationShow']
            }], s_observerUpdate: [{
                type: Output,
                args: ['observerUpdate']
            }], s_orientationchange: [{
                type: Output,
                args: ['orientationchange']
            }], s_paginationHide: [{
                type: Output,
                args: ['paginationHide']
            }], s_paginationRender: [{
                type: Output,
                args: ['paginationRender']
            }], s_paginationShow: [{
                type: Output,
                args: ['paginationShow']
            }], s_paginationUpdate: [{
                type: Output,
                args: ['paginationUpdate']
            }], s_progress: [{
                type: Output,
                args: ['progress']
            }], s_reachBeginning: [{
                type: Output,
                args: ['reachBeginning']
            }], s_reachEnd: [{
                type: Output,
                args: ['reachEnd']
            }], s_realIndexChange: [{
                type: Output,
                args: ['realIndexChange']
            }], s_resize: [{
                type: Output,
                args: ['resize']
            }], s_scroll: [{
                type: Output,
                args: ['scroll']
            }], s_scrollbarDragEnd: [{
                type: Output,
                args: ['scrollbarDragEnd']
            }], s_scrollbarDragMove: [{
                type: Output,
                args: ['scrollbarDragMove']
            }], s_scrollbarDragStart: [{
                type: Output,
                args: ['scrollbarDragStart']
            }], s_setTransition: [{
                type: Output,
                args: ['setTransition']
            }], s_setTranslate: [{
                type: Output,
                args: ['setTranslate']
            }], s_slideChange: [{
                type: Output,
                args: ['slideChange']
            }], s_slideChangeTransitionEnd: [{
                type: Output,
                args: ['slideChangeTransitionEnd']
            }], s_slideChangeTransitionStart: [{
                type: Output,
                args: ['slideChangeTransitionStart']
            }], s_slideNextTransitionEnd: [{
                type: Output,
                args: ['slideNextTransitionEnd']
            }], s_slideNextTransitionStart: [{
                type: Output,
                args: ['slideNextTransitionStart']
            }], s_slidePrevTransitionEnd: [{
                type: Output,
                args: ['slidePrevTransitionEnd']
            }], s_slidePrevTransitionStart: [{
                type: Output,
                args: ['slidePrevTransitionStart']
            }], s_slideResetTransitionStart: [{
                type: Output,
                args: ['slideResetTransitionStart']
            }], s_slideResetTransitionEnd: [{
                type: Output,
                args: ['slideResetTransitionEnd']
            }], s_sliderMove: [{
                type: Output,
                args: ['sliderMove']
            }], s_sliderFirstMove: [{
                type: Output,
                args: ['sliderFirstMove']
            }], s_slidesLengthChange: [{
                type: Output,
                args: ['slidesLengthChange']
            }], s_slidesGridLengthChange: [{
                type: Output,
                args: ['slidesGridLengthChange']
            }], s_snapGridLengthChange: [{
                type: Output,
                args: ['snapGridLengthChange']
            }], s_snapIndexChange: [{
                type: Output,
                args: ['snapIndexChange']
            }], s_tap: [{
                type: Output,
                args: ['tap']
            }], s_toEdge: [{
                type: Output,
                args: ['toEdge']
            }], s_touchEnd: [{
                type: Output,
                args: ['touchEnd']
            }], s_touchMove: [{
                type: Output,
                args: ['touchMove']
            }], s_touchMoveOpposite: [{
                type: Output,
                args: ['touchMoveOpposite']
            }], s_touchStart: [{
                type: Output,
                args: ['touchStart']
            }], s_transitionEnd: [{
                type: Output,
                args: ['transitionEnd']
            }], s_transitionStart: [{
                type: Output,
                args: ['transitionStart']
            }], s_update: [{
                type: Output,
                args: ['update']
            }], s_zoomChange: [{
                type: Output,
                args: ['zoomChange']
            }], s_swiper: [{
                type: Output,
                args: ['swiper']
            }], s_lock: [{
                type: Output,
                args: ['lock']
            }], s_unlock: [{
                type: Output,
                args: ['unlock']
            }], prevElRef: [{
                type: ViewChild,
                args: ['prevElRef', { static: false }]
            }], nextElRef: [{
                type: ViewChild,
                args: ['nextElRef', { static: false }]
            }], scrollbarElRef: [{
                type: ViewChild,
                args: ['scrollbarElRef', { static: false }]
            }], paginationElRef: [{
                type: ViewChild,
                args: ['paginationElRef', { static: false }]
            }], slidesEl: [{
                type: ContentChildren,
                args: [SwiperSlideDirective, { descendants: false, emitDistinctChangesOnly: true }]
            }], containerClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyL3NyYy9zd2lwZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIvc3JjL3N3aXBlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLFdBQVcsRUFDWCxNQUFNLEVBQ04sS0FBSyxFQUdMLE1BQU0sRUFDTixXQUFXLEVBR1gsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixhQUFhO0FBQ2IsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSxPQUFPLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFDUixXQUFXLEVBQ1gsaUJBQWlCLEVBQ2pCLHFCQUFxQixFQUNyQixRQUFRLEVBQ1IsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBU3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFjcEQsTUFBTSxPQUFPLGVBQWU7SUFzYzFCLFlBQ1UsT0FBZSxFQUNmLFVBQXNCLEVBQ3RCLGtCQUFxQyxFQUNoQixXQUFtQjtRQUh4QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ2hCLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBN1h6QyxlQUFVLEdBQWdDLGNBQWMsQ0FBQztRQVV6RCxp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O2dCQXVCdEUsZ0JBQWdCO3NCQUFyQyxXQUFXO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBTd2lwZXIgZnJvbSAnc3dpcGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBnZXRQYXJhbXMgfSBmcm9tICcuL3V0aWxzL2dldC1wYXJhbXMnO1xuaW1wb3J0IHsgU3dpcGVyU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuL3N3aXBlci1zbGlkZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRXZlbnRzUGFyYW1zIH0gZnJvbSAnLi9zd2lwZXItZXZlbnRzJztcbmltcG9ydCB7XG4gIGV4dGVuZCxcbiAgaXNPYmplY3QsXG4gIHNldFByb3BlcnR5LFxuICBpZ25vcmVOZ09uQ2hhbmdlcyxcbiAgY29lcmNlQm9vbGVhblByb3BlcnR5LFxuICBpc1Nob3dFbCxcbiAgaXNFbmFibGVkLFxufSBmcm9tICcuL3V0aWxzL3V0aWxzJztcbmltcG9ydCB7XG4gIFN3aXBlck9wdGlvbnMsXG4gIFN3aXBlckV2ZW50cyxcbiAgTmF2aWdhdGlvbk9wdGlvbnMsXG4gIFBhZ2luYXRpb25PcHRpb25zLFxuICBTY3JvbGxiYXJPcHRpb25zLFxuICBWaXJ0dWFsT3B0aW9ucyxcbn0gZnJvbSAnc3dpcGVyL3R5cGVzJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N3aXBlciwgW3N3aXBlcl0nLFxuICB0ZW1wbGF0ZVVybDogJy4vc3dpcGVyLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIHN3aXBlciB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFN3aXBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGVuYWJsZWQ6IFN3aXBlck9wdGlvbnNbJ2VuYWJsZWQnXTtcbiAgQElucHV0KCkgb246IFN3aXBlck9wdGlvbnNbJ29uJ107XG4gIEBJbnB1dCgpIGRpcmVjdGlvbjogU3dpcGVyT3B0aW9uc1snZGlyZWN0aW9uJ107XG4gIEBJbnB1dCgpIHRvdWNoRXZlbnRzVGFyZ2V0OiBTd2lwZXJPcHRpb25zWyd0b3VjaEV2ZW50c1RhcmdldCddO1xuICBASW5wdXQoKSBpbml0aWFsU2xpZGU6IFN3aXBlck9wdGlvbnNbJ2luaXRpYWxTbGlkZSddO1xuICBASW5wdXQoKSBzcGVlZDogU3dpcGVyT3B0aW9uc1snc3BlZWQnXTtcbiAgQElucHV0KCkgY3NzTW9kZTogU3dpcGVyT3B0aW9uc1snY3NzTW9kZSddO1xuICBASW5wdXQoKSB1cGRhdGVPbldpbmRvd1Jlc2l6ZTogU3dpcGVyT3B0aW9uc1sndXBkYXRlT25XaW5kb3dSZXNpemUnXTtcbiAgQElucHV0KCkgcmVzaXplT2JzZXJ2ZXI6IFN3aXBlck9wdGlvbnNbJ3Jlc2l6ZU9ic2VydmVyJ107XG4gIEBJbnB1dCgpIG5lc3RlZDogU3dpcGVyT3B0aW9uc1snbmVzdGVkJ107XG4gIEBJbnB1dCgpIGZvY3VzYWJsZUVsZW1lbnRzOiBTd2lwZXJPcHRpb25zWydmb2N1c2FibGVFbGVtZW50cyddO1xuICBASW5wdXQoKSB3aWR0aDogU3dpcGVyT3B0aW9uc1snd2lkdGgnXTtcbiAgQElucHV0KCkgaGVpZ2h0OiBTd2lwZXJPcHRpb25zWydoZWlnaHQnXTtcbiAgQElucHV0KCkgcHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uOiBTd2lwZXJPcHRpb25zWydwcmV2ZW50SW50ZXJhY3Rpb25PblRyYW5zaXRpb24nXTtcbiAgQElucHV0KCkgdXNlckFnZW50OiBTd2lwZXJPcHRpb25zWyd1c2VyQWdlbnQnXTtcbiAgQElucHV0KCkgdXJsOiBTd2lwZXJPcHRpb25zWyd1cmwnXTtcbiAgQElucHV0KCkgZWRnZVN3aXBlRGV0ZWN0aW9uOiBib29sZWFuIHwgc3RyaW5nO1xuICBASW5wdXQoKSBlZGdlU3dpcGVUaHJlc2hvbGQ6IG51bWJlcjtcbiAgQElucHV0KCkgZnJlZU1vZGU6IFN3aXBlck9wdGlvbnNbJ2ZyZWVNb2RlJ107XG4gIEBJbnB1dCgpIGF1dG9IZWlnaHQ6IFN3aXBlck9wdGlvbnNbJ2F1dG9IZWlnaHQnXTtcbiAgQElucHV0KCkgc2V0V3JhcHBlclNpemU6IFN3aXBlck9wdGlvbnNbJ3NldFdyYXBwZXJTaXplJ107XG4gIEBJbnB1dCgpIHZpcnR1YWxUcmFuc2xhdGU6IFN3aXBlck9wdGlvbnNbJ3ZpcnR1YWxUcmFuc2xhdGUnXTtcbiAgQElucHV0KCkgZWZmZWN0OiBTd2lwZXJPcHRpb25zWydlZmZlY3QnXTtcbiAgQElucHV0KCkgYnJlYWtwb2ludHM6IFN3aXBlck9wdGlvbnNbJ2JyZWFrcG9pbnRzJ107XG4gIEBJbnB1dCgpIHNwYWNlQmV0d2VlbjogU3dpcGVyT3B0aW9uc1snc3BhY2VCZXR3ZWVuJ107XG4gIEBJbnB1dCgpIHNsaWRlc1BlclZpZXc6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc1BlclZpZXcnXTtcbiAgQElucHV0KCkgbWF4QmFja2ZhY2VIaWRkZW5TbGlkZXM6IFN3aXBlck9wdGlvbnNbJ21heEJhY2tmYWNlSGlkZGVuU2xpZGVzJ107XG4gIEBJbnB1dCgpIGdyaWQ6IFN3aXBlck9wdGlvbnNbJ2dyaWQnXTtcbiAgQElucHV0KCkgc2xpZGVzUGVyR3JvdXA6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc1Blckdyb3VwJ107XG4gIEBJbnB1dCgpIHNsaWRlc1Blckdyb3VwU2tpcDogU3dpcGVyT3B0aW9uc1snc2xpZGVzUGVyR3JvdXBTa2lwJ107XG4gIEBJbnB1dCgpIGNlbnRlcmVkU2xpZGVzOiBTd2lwZXJPcHRpb25zWydjZW50ZXJlZFNsaWRlcyddO1xuICBASW5wdXQoKSBjZW50ZXJlZFNsaWRlc0JvdW5kczogU3dpcGVyT3B0aW9uc1snY2VudGVyZWRTbGlkZXNCb3VuZHMnXTtcbiAgQElucHV0KCkgc2xpZGVzT2Zmc2V0QmVmb3JlOiBTd2lwZXJPcHRpb25zWydzbGlkZXNPZmZzZXRCZWZvcmUnXTtcbiAgQElucHV0KCkgc2xpZGVzT2Zmc2V0QWZ0ZXI6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc09mZnNldEFmdGVyJ107XG4gIEBJbnB1dCgpIG5vcm1hbGl6ZVNsaWRlSW5kZXg6IFN3aXBlck9wdGlvbnNbJ25vcm1hbGl6ZVNsaWRlSW5kZXgnXTtcbiAgQElucHV0KCkgY2VudGVySW5zdWZmaWNpZW50U2xpZGVzOiBTd2lwZXJPcHRpb25zWydjZW50ZXJJbnN1ZmZpY2llbnRTbGlkZXMnXTtcbiAgQElucHV0KCkgd2F0Y2hPdmVyZmxvdzogU3dpcGVyT3B0aW9uc1snd2F0Y2hPdmVyZmxvdyddO1xuICBASW5wdXQoKSByb3VuZExlbmd0aHM6IFN3aXBlck9wdGlvbnNbJ3JvdW5kTGVuZ3RocyddO1xuICBASW5wdXQoKSB0b3VjaFJhdGlvOiBTd2lwZXJPcHRpb25zWyd0b3VjaFJhdGlvJ107XG4gIEBJbnB1dCgpIHRvdWNoQW5nbGU6IFN3aXBlck9wdGlvbnNbJ3RvdWNoQW5nbGUnXTtcbiAgQElucHV0KCkgc2ltdWxhdGVUb3VjaDogU3dpcGVyT3B0aW9uc1snc2ltdWxhdGVUb3VjaCddO1xuICBASW5wdXQoKSBzaG9ydFN3aXBlczogU3dpcGVyT3B0aW9uc1snc2hvcnRTd2lwZXMnXTtcbiAgQElucHV0KCkgbG9uZ1N3aXBlczogU3dpcGVyT3B0aW9uc1snbG9uZ1N3aXBlcyddO1xuICBASW5wdXQoKSBsb25nU3dpcGVzUmF0aW86IFN3aXBlck9wdGlvbnNbJ2xvbmdTd2lwZXNSYXRpbyddO1xuICBASW5wdXQoKSBsb25nU3dpcGVzTXM6IFN3aXBlck9wdGlvbnNbJ2xvbmdTd2lwZXNNcyddO1xuICBASW5wdXQoKSBmb2xsb3dGaW5nZXI6IFN3aXBlck9wdGlvbnNbJ2ZvbGxvd0ZpbmdlciddO1xuICBASW5wdXQoKSBhbGxvd1RvdWNoTW92ZTogU3dpcGVyT3B0aW9uc1snYWxsb3dUb3VjaE1vdmUnXTtcbiAgQElucHV0KCkgdGhyZXNob2xkOiBTd2lwZXJPcHRpb25zWyd0aHJlc2hvbGQnXTtcbiAgQElucHV0KCkgdG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uOiBTd2lwZXJPcHRpb25zWyd0b3VjaE1vdmVTdG9wUHJvcGFnYXRpb24nXTtcbiAgQElucHV0KCkgdG91Y2hTdGFydFByZXZlbnREZWZhdWx0OiBTd2lwZXJPcHRpb25zWyd0b3VjaFN0YXJ0UHJldmVudERlZmF1bHQnXTtcbiAgQElucHV0KCkgdG91Y2hTdGFydEZvcmNlUHJldmVudERlZmF1bHQ6IFN3aXBlck9wdGlvbnNbJ3RvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0J107XG4gIEBJbnB1dCgpIHRvdWNoUmVsZWFzZU9uRWRnZXM6IFN3aXBlck9wdGlvbnNbJ3RvdWNoUmVsZWFzZU9uRWRnZXMnXTtcbiAgQElucHV0KCkgdW5pcXVlTmF2RWxlbWVudHM6IFN3aXBlck9wdGlvbnNbJ3VuaXF1ZU5hdkVsZW1lbnRzJ107XG4gIEBJbnB1dCgpIHJlc2lzdGFuY2U6IFN3aXBlck9wdGlvbnNbJ3Jlc2lzdGFuY2UnXTtcbiAgQElucHV0KCkgcmVzaXN0YW5jZVJhdGlvOiBTd2lwZXJPcHRpb25zWydyZXNpc3RhbmNlUmF0aW8nXTtcbiAgQElucHV0KCkgd2F0Y2hTbGlkZXNQcm9ncmVzczogU3dpcGVyT3B0aW9uc1snd2F0Y2hTbGlkZXNQcm9ncmVzcyddO1xuICBASW5wdXQoKSBncmFiQ3Vyc29yOiBTd2lwZXJPcHRpb25zWydncmFiQ3Vyc29yJ107XG4gIEBJbnB1dCgpIHByZXZlbnRDbGlja3M6IFN3aXBlck9wdGlvbnNbJ3ByZXZlbnRDbGlja3MnXTtcbiAgQElucHV0KCkgcHJldmVudENsaWNrc1Byb3BhZ2F0aW9uOiBTd2lwZXJPcHRpb25zWydwcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24nXTtcbiAgQElucHV0KCkgc2xpZGVUb0NsaWNrZWRTbGlkZTogU3dpcGVyT3B0aW9uc1snc2xpZGVUb0NsaWNrZWRTbGlkZSddO1xuICBASW5wdXQoKSBwcmVsb2FkSW1hZ2VzOiBTd2lwZXJPcHRpb25zWydwcmVsb2FkSW1hZ2VzJ107XG4gIEBJbnB1dCgpIHVwZGF0ZU9uSW1hZ2VzUmVhZHk6IFN3aXBlck9wdGlvbnNbJ3VwZGF0ZU9uSW1hZ2VzUmVhZHknXTtcbiAgQElucHV0KCkgbG9vcDogU3dpcGVyT3B0aW9uc1snbG9vcCddO1xuICBASW5wdXQoKSBsb29wQWRkaXRpb25hbFNsaWRlczogU3dpcGVyT3B0aW9uc1snbG9vcEFkZGl0aW9uYWxTbGlkZXMnXTtcbiAgQElucHV0KCkgbG9vcGVkU2xpZGVzOiBTd2lwZXJPcHRpb25zWydsb29wZWRTbGlkZXMnXTtcbiAgQElucHV0KCkgbG9vcEZpbGxHcm91cFdpdGhCbGFuazogU3dpcGVyT3B0aW9uc1snbG9vcEZpbGxHcm91cFdpdGhCbGFuayddO1xuICBASW5wdXQoKSBsb29wUHJldmVudHNTbGlkZTogU3dpcGVyT3B0aW9uc1snbG9vcFByZXZlbnRzU2xpZGUnXTtcbiAgQElucHV0KCkgcmV3aW5kOiBTd2lwZXJPcHRpb25zWydyZXdpbmQnXTtcbiAgQElucHV0KCkgYWxsb3dTbGlkZVByZXY6IFN3aXBlck9wdGlvbnNbJ2FsbG93U2xpZGVQcmV2J107XG4gIEBJbnB1dCgpIGFsbG93U2xpZGVOZXh0OiBTd2lwZXJPcHRpb25zWydhbGxvd1NsaWRlTmV4dCddO1xuICBASW5wdXQoKSBzd2lwZUhhbmRsZXI6IFN3aXBlck9wdGlvbnNbJ3N3aXBlSGFuZGxlciddO1xuICBASW5wdXQoKSBub1N3aXBpbmc6IFN3aXBlck9wdGlvbnNbJ25vU3dpcGluZyddO1xuICBASW5wdXQoKSBub1N3aXBpbmdDbGFzczogU3dpcGVyT3B0aW9uc1snbm9Td2lwaW5nQ2xhc3MnXTtcbiAgQElucHV0KCkgbm9Td2lwaW5nU2VsZWN0b3I6IFN3aXBlck9wdGlvbnNbJ25vU3dpcGluZ1NlbGVjdG9yJ107XG4gIEBJbnB1dCgpIHBhc3NpdmVMaXN0ZW5lcnM6IFN3aXBlck9wdGlvbnNbJ3Bhc3NpdmVMaXN0ZW5lcnMnXTtcbiAgQElucHV0KCkgY29udGFpbmVyTW9kaWZpZXJDbGFzczogU3dpcGVyT3B0aW9uc1snY29udGFpbmVyTW9kaWZpZXJDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZUNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUNsYXNzJ10gPSAnc3dpcGVyLXNsaWRlJztcbiAgQElucHV0KCkgc2xpZGVCbGFua0NsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUJsYW5rQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVBY3RpdmVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVBY3RpdmVDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlVmlzaWJsZUNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZVZpc2libGVDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZUR1cGxpY2F0ZUNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUR1cGxpY2F0ZUNsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlTmV4dENsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZU5leHRDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZUR1cGxpY2F0ZU5leHRDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVQcmV2Q2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlUHJldkNsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlUHJldkNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUR1cGxpY2F0ZVByZXZDbGFzcyddO1xuICBASW5wdXQoKSB3cmFwcGVyQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3dyYXBwZXJDbGFzcyddID0gJ3N3aXBlci13cmFwcGVyJztcbiAgQElucHV0KCkgcnVuQ2FsbGJhY2tzT25Jbml0OiBTd2lwZXJPcHRpb25zWydydW5DYWxsYmFja3NPbkluaXQnXTtcbiAgQElucHV0KCkgb2JzZXJ2ZVBhcmVudHM6IFN3aXBlck9wdGlvbnNbJ29ic2VydmVQYXJlbnRzJ107XG4gIEBJbnB1dCgpIG9ic2VydmVTbGlkZUNoaWxkcmVuOiBTd2lwZXJPcHRpb25zWydvYnNlcnZlU2xpZGVDaGlsZHJlbiddO1xuICBASW5wdXQoKSBhMTF5OiBTd2lwZXJPcHRpb25zWydhMTF5J107XG4gIEBJbnB1dCgpIGF1dG9wbGF5OiBTd2lwZXJPcHRpb25zWydhdXRvcGxheSddO1xuICBASW5wdXQoKSBjb250cm9sbGVyOiBTd2lwZXJPcHRpb25zWydjb250cm9sbGVyJ107XG4gIEBJbnB1dCgpIGNvdmVyZmxvd0VmZmVjdDogU3dpcGVyT3B0aW9uc1snY292ZXJmbG93RWZmZWN0J107XG4gIEBJbnB1dCgpIGN1YmVFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2N1YmVFZmZlY3QnXTtcbiAgQElucHV0KCkgZmFkZUVmZmVjdDogU3dpcGVyT3B0aW9uc1snZmFkZUVmZmVjdCddO1xuICBASW5wdXQoKSBmbGlwRWZmZWN0OiBTd2lwZXJPcHRpb25zWydmbGlwRWZmZWN0J107XG4gIEBJbnB1dCgpIGNyZWF0aXZlRWZmZWN0OiBTd2lwZXJPcHRpb25zWydjcmVhdGl2ZUVmZmVjdCddO1xuICBASW5wdXQoKSBjYXJkc0VmZmVjdDogU3dpcGVyT3B0aW9uc1snY2FyZHNFZmZlY3QnXTtcbiAgQElucHV0KCkgcGFub3JhbWFFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ3Bhbm9yYW1hRWZmZWN0J107XG4gIEBJbnB1dCgpIGhhc2hOYXZpZ2F0aW9uOiBTd2lwZXJPcHRpb25zWydoYXNoTmF2aWdhdGlvbiddO1xuICBASW5wdXQoKSBoaXN0b3J5OiBTd2lwZXJPcHRpb25zWydoaXN0b3J5J107XG4gIEBJbnB1dCgpIGtleWJvYXJkOiBTd2lwZXJPcHRpb25zWydrZXlib2FyZCddO1xuICBASW5wdXQoKSBsYXp5OiBTd2lwZXJPcHRpb25zWydsYXp5J107XG4gIEBJbnB1dCgpIG1vdXNld2hlZWw6IFN3aXBlck9wdGlvbnNbJ21vdXNld2hlZWwnXTtcbiAgQElucHV0KCkgcGFyYWxsYXg6IFN3aXBlck9wdGlvbnNbJ3BhcmFsbGF4J107XG4gIEBJbnB1dCgpIHRodW1iczogU3dpcGVyT3B0aW9uc1sndGh1bWJzJ107XG4gIEBJbnB1dCgpIHpvb206IFN3aXBlck9wdGlvbnNbJ3pvb20nXTtcbiAgQElucHV0KCkgY2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KClcbiAgc2V0IG5hdmlnYXRpb24odmFsKSB7XG4gICAgY29uc3QgY3VycmVudE5leHQgPVxuICAgICAgdHlwZW9mIHRoaXMuX25hdmlnYXRpb24gIT09ICdib29sZWFuJyAmJiB0aGlzLl9uYXZpZ2F0aW9uICE9PSAnJ1xuICAgICAgICA/IHRoaXMuX25hdmlnYXRpb24/Lm5leHRFbFxuICAgICAgICA6IG51bGw7XG4gICAgY29uc3QgY3VycmVudFByZXYgPVxuICAgICAgdHlwZW9mIHRoaXMuX25hdmlnYXRpb24gIT09ICdib29sZWFuJyAmJiB0aGlzLl9uYXZpZ2F0aW9uICE9PSAnJ1xuICAgICAgICA/IHRoaXMuX25hdmlnYXRpb24/LnByZXZFbFxuICAgICAgICA6IG51bGw7XG4gICAgdGhpcy5fbmF2aWdhdGlvbiA9IHNldFByb3BlcnR5KHZhbCwge1xuICAgICAgbmV4dEVsOiBjdXJyZW50TmV4dCB8fCBudWxsLFxuICAgICAgcHJldkVsOiBjdXJyZW50UHJldiB8fCBudWxsLFxuICAgIH0pO1xuICAgIHRoaXMuc2hvd05hdmlnYXRpb24gPSAhKFxuICAgICAgY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCkgIT09IHRydWUgfHxcbiAgICAgICh0aGlzLl9uYXZpZ2F0aW9uICYmXG4gICAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvbi5wcmV2RWwgIT09IHRoaXMuX3ByZXZFbFJlZj8ubmF0aXZlRWxlbWVudCAmJlxuICAgICAgICAodGhpcy5fbmF2aWdhdGlvbi5wcmV2RWwgIT09IG51bGwgfHwgdGhpcy5fbmF2aWdhdGlvbi5uZXh0RWwgIT09IG51bGwpICYmXG4gICAgICAgICh0eXBlb2YgdGhpcy5fbmF2aWdhdGlvbi5uZXh0RWwgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICAgdHlwZW9mIHRoaXMuX25hdmlnYXRpb24ucHJldkVsID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uLm5leHRFbCA9PT0gJ29iamVjdCcgfHxcbiAgICAgICAgICB0eXBlb2YgdGhpcy5fbmF2aWdhdGlvbi5wcmV2RWwgPT09ICdvYmplY3QnKSlcbiAgICApO1xuICB9XG4gIGdldCBuYXZpZ2F0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9uYXZpZ2F0aW9uO1xuICB9XG4gIHByaXZhdGUgX25hdmlnYXRpb246IE5hdmlnYXRpb25PcHRpb25zIHwgYm9vbGVhbiB8ICcnO1xuICBzaG93TmF2aWdhdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IHBhZ2luYXRpb24odmFsKSB7XG4gICAgY29uc3QgY3VycmVudCA9XG4gICAgICB0eXBlb2YgdGhpcy5fcGFnaW5hdGlvbiAhPT0gJ2Jvb2xlYW4nICYmIHRoaXMuX3BhZ2luYXRpb24gIT09ICcnXG4gICAgICAgID8gdGhpcy5fcGFnaW5hdGlvbj8uZWxcbiAgICAgICAgOiBudWxsO1xuICAgIHRoaXMuX3BhZ2luYXRpb24gPSBzZXRQcm9wZXJ0eSh2YWwsIHtcbiAgICAgIGVsOiBjdXJyZW50IHx8IG51bGwsXG4gICAgfSk7XG4gICAgdGhpcy5zaG93UGFnaW5hdGlvbiA9IGlzU2hvd0VsKHZhbCwgdGhpcy5fcGFnaW5hdGlvbiwgdGhpcy5fcGFnaW5hdGlvbkVsUmVmKTtcbiAgfVxuICBnZXQgcGFnaW5hdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnaW5hdGlvbjtcbiAgfVxuICBwcml2YXRlIF9wYWdpbmF0aW9uOiBQYWdpbmF0aW9uT3B0aW9ucyB8IGJvb2xlYW4gfCAnJztcbiAgc2hvd1BhZ2luYXRpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzY3JvbGxiYXIodmFsKSB7XG4gICAgY29uc3QgY3VycmVudCA9XG4gICAgICB0eXBlb2YgdGhpcy5fc2Nyb2xsYmFyICE9PSAnYm9vbGVhbicgJiYgdGhpcy5fc2Nyb2xsYmFyICE9PSAnJyA/IHRoaXMuX3Njcm9sbGJhcj8uZWwgOiBudWxsO1xuICAgIHRoaXMuX3Njcm9sbGJhciA9IHNldFByb3BlcnR5KHZhbCwge1xuICAgICAgZWw6IGN1cnJlbnQgfHwgbnVsbCxcbiAgICB9KTtcbiAgICB0aGlzLnNob3dTY3JvbGxiYXIgPSBpc1Nob3dFbCh2YWwsIHRoaXMuX3Njcm9sbGJhciwgdGhpcy5fc2Nyb2xsYmFyRWxSZWYpO1xuICB9XG4gIGdldCBzY3JvbGxiYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbGJhcjtcbiAgfVxuICBwcml2YXRlIF9zY3JvbGxiYXI6IFNjcm9sbGJhck9wdGlvbnMgfCBib29sZWFuIHwgJyc7XG4gIHNob3dTY3JvbGxiYXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2aXJ0dWFsKHZhbCkge1xuICAgIHRoaXMuX3ZpcnR1YWwgPSBzZXRQcm9wZXJ0eSh2YWwpO1xuICB9XG4gIGdldCB2aXJ0dWFsKCkge1xuICAgIHJldHVybiB0aGlzLl92aXJ0dWFsO1xuICB9XG4gIHByaXZhdGUgX3ZpcnR1YWw6IFZpcnR1YWxPcHRpb25zIHwgYm9vbGVhbiB8ICcnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjb25maWcodmFsOiBTd2lwZXJPcHRpb25zKSB7XG4gICAgdGhpcy51cGRhdGVTd2lwZXIodmFsKTtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gZ2V0UGFyYW1zKHZhbCk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYXJhbXMpO1xuICB9XG4gIEBPdXRwdXQoJ19iZWZvcmVCcmVha3BvaW50Jykgc19fYmVmb3JlQnJlYWtwb2ludCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydfYmVmb3JlQnJlYWtwb2ludCddXG4gID4oKTtcblxuICBAT3V0cHV0KCdfY29udGFpbmVyQ2xhc3NlcycpIHNfX2NvbnRhaW5lckNsYXNzZXMgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snX2NvbnRhaW5lckNsYXNzZXMnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnX3NsaWRlQ2xhc3MnKSBzX19zbGlkZUNsYXNzID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ19zbGlkZUNsYXNzJ10+KCk7XG5cbiAgQE91dHB1dCgnX3N3aXBlcicpIHNfX3N3aXBlciA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydfc3dpcGVyJ10+KCk7XG5cbiAgQE91dHB1dCgnYWN0aXZlSW5kZXhDaGFuZ2UnKSBzX2FjdGl2ZUluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ2FjdGl2ZUluZGV4Q2hhbmdlJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ2FmdGVySW5pdCcpIHNfYWZ0ZXJJbml0ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2FmdGVySW5pdCddPigpO1xuXG4gIEBPdXRwdXQoJ2F1dG9wbGF5Jykgc19hdXRvcGxheSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydhdXRvcGxheSddPigpO1xuXG4gIEBPdXRwdXQoJ2F1dG9wbGF5U3RhcnQnKSBzX2F1dG9wbGF5U3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snYXV0b3BsYXlTdGFydCddPigpO1xuXG4gIEBPdXRwdXQoJ2F1dG9wbGF5U3RvcCcpIHNfYXV0b3BsYXlTdG9wID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2F1dG9wbGF5U3RvcCddPigpO1xuXG4gIEBPdXRwdXQoJ2F1dG9wbGF5UGF1c2UnKSBzX2F1dG9wbGF5UGF1c2UgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snYXV0b3BsYXlQYXVzZSddPigpO1xuXG4gIEBPdXRwdXQoJ2F1dG9wbGF5UmVzdW1lJykgc19hdXRvcGxheVJlc3VtZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydhdXRvcGxheVJlc3VtZSddPigpO1xuXG4gIEBPdXRwdXQoJ2JlZm9yZURlc3Ryb3knKSBzX2JlZm9yZURlc3Ryb3kgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snYmVmb3JlRGVzdHJveSddPigpO1xuXG4gIEBPdXRwdXQoJ2JlZm9yZUluaXQnKSBzX2JlZm9yZUluaXQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snYmVmb3JlSW5pdCddPigpO1xuXG4gIEBPdXRwdXQoJ2JlZm9yZUxvb3BGaXgnKSBzX2JlZm9yZUxvb3BGaXggPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snYmVmb3JlTG9vcEZpeCddPigpO1xuXG4gIEBPdXRwdXQoJ2JlZm9yZVJlc2l6ZScpIHNfYmVmb3JlUmVzaXplID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2JlZm9yZVJlc2l6ZSddPigpO1xuXG4gIEBPdXRwdXQoJ2JlZm9yZVNsaWRlQ2hhbmdlU3RhcnQnKSBzX2JlZm9yZVNsaWRlQ2hhbmdlU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCddXG4gID4oKTtcblxuICBAT3V0cHV0KCdiZWZvcmVUcmFuc2l0aW9uU3RhcnQnKSBzX2JlZm9yZVRyYW5zaXRpb25TdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydiZWZvcmVUcmFuc2l0aW9uU3RhcnQnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnYnJlYWtwb2ludCcpIHNfYnJlYWtwb2ludCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydicmVha3BvaW50J10+KCk7XG5cbiAgQE91dHB1dCgnY2hhbmdlRGlyZWN0aW9uJykgc19jaGFuZ2VEaXJlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snY2hhbmdlRGlyZWN0aW9uJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ2NsaWNrJykgc19jbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydjbGljayddPigpO1xuXG4gIEBPdXRwdXQoJ2RvdWJsZVRhcCcpIHNfZG91YmxlVGFwID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2RvdWJsZVRhcCddPigpO1xuXG4gIEBPdXRwdXQoJ2RvdWJsZUNsaWNrJykgc19kb3VibGVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydkb3VibGVDbGljayddPigpO1xuXG4gIEBPdXRwdXQoJ2Rlc3Ryb3knKSBzX2Rlc3Ryb3kgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snZGVzdHJveSddPigpO1xuXG4gIEBPdXRwdXQoJ2Zyb21FZGdlJykgc19mcm9tRWRnZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydmcm9tRWRnZSddPigpO1xuXG4gIEBPdXRwdXQoJ2hhc2hDaGFuZ2UnKSBzX2hhc2hDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snaGFzaENoYW5nZSddPigpO1xuXG4gIEBPdXRwdXQoJ2hhc2hTZXQnKSBzX2hhc2hTZXQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snaGFzaFNldCddPigpO1xuXG4gIEBPdXRwdXQoJ2ltYWdlc1JlYWR5Jykgc19pbWFnZXNSZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydpbWFnZXNSZWFkeSddPigpO1xuXG4gIEBPdXRwdXQoJ2luaXQnKSBzX2luaXQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snaW5pdCddPigpO1xuXG4gIEBPdXRwdXQoJ2tleVByZXNzJykgc19rZXlQcmVzcyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydrZXlQcmVzcyddPigpO1xuXG4gIEBPdXRwdXQoJ2xhenlJbWFnZUxvYWQnKSBzX2xhenlJbWFnZUxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snbGF6eUltYWdlTG9hZCddPigpO1xuXG4gIEBPdXRwdXQoJ2xhenlJbWFnZVJlYWR5Jykgc19sYXp5SW1hZ2VSZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydsYXp5SW1hZ2VSZWFkeSddPigpO1xuXG4gIEBPdXRwdXQoJ2xvb3BGaXgnKSBzX2xvb3BGaXggPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snbG9vcEZpeCddPigpO1xuXG4gIEBPdXRwdXQoJ21vbWVudHVtQm91bmNlJykgc19tb21lbnR1bUJvdW5jZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydtb21lbnR1bUJvdW5jZSddPigpO1xuXG4gIEBPdXRwdXQoJ25hdmlnYXRpb25IaWRlJykgc19uYXZpZ2F0aW9uSGlkZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWyduYXZpZ2F0aW9uSGlkZSddPigpO1xuXG4gIEBPdXRwdXQoJ25hdmlnYXRpb25TaG93Jykgc19uYXZpZ2F0aW9uU2hvdyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWyduYXZpZ2F0aW9uU2hvdyddPigpO1xuXG4gIEBPdXRwdXQoJ29ic2VydmVyVXBkYXRlJykgc19vYnNlcnZlclVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydvYnNlcnZlclVwZGF0ZSddPigpO1xuXG4gIEBPdXRwdXQoJ29yaWVudGF0aW9uY2hhbmdlJykgc19vcmllbnRhdGlvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydvcmllbnRhdGlvbmNoYW5nZSddXG4gID4oKTtcblxuICBAT3V0cHV0KCdwYWdpbmF0aW9uSGlkZScpIHNfcGFnaW5hdGlvbkhpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1sncGFnaW5hdGlvbkhpZGUnXT4oKTtcblxuICBAT3V0cHV0KCdwYWdpbmF0aW9uUmVuZGVyJykgc19wYWdpbmF0aW9uUmVuZGVyID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3BhZ2luYXRpb25SZW5kZXInXVxuICA+KCk7XG5cbiAgQE91dHB1dCgncGFnaW5hdGlvblNob3cnKSBzX3BhZ2luYXRpb25TaG93ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3BhZ2luYXRpb25TaG93J10+KCk7XG5cbiAgQE91dHB1dCgncGFnaW5hdGlvblVwZGF0ZScpIHNfcGFnaW5hdGlvblVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydwYWdpbmF0aW9uVXBkYXRlJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3Byb2dyZXNzJykgc19wcm9ncmVzcyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydwcm9ncmVzcyddPigpO1xuXG4gIEBPdXRwdXQoJ3JlYWNoQmVnaW5uaW5nJykgc19yZWFjaEJlZ2lubmluZyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydyZWFjaEJlZ2lubmluZyddPigpO1xuXG4gIEBPdXRwdXQoJ3JlYWNoRW5kJykgc19yZWFjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydyZWFjaEVuZCddPigpO1xuXG4gIEBPdXRwdXQoJ3JlYWxJbmRleENoYW5nZScpIHNfcmVhbEluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3JlYWxJbmRleENoYW5nZSddXG4gID4oKTtcblxuICBAT3V0cHV0KCdyZXNpemUnKSBzX3Jlc2l6ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydyZXNpemUnXT4oKTtcblxuICBAT3V0cHV0KCdzY3JvbGwnKSBzX3Njcm9sbCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydzY3JvbGwnXT4oKTtcblxuICBAT3V0cHV0KCdzY3JvbGxiYXJEcmFnRW5kJykgc19zY3JvbGxiYXJEcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3Njcm9sbGJhckRyYWdFbmQnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ01vdmUnKSBzX3Njcm9sbGJhckRyYWdNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3Njcm9sbGJhckRyYWdNb3ZlJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3Njcm9sbGJhckRyYWdTdGFydCcpIHNfc2Nyb2xsYmFyRHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3Njcm9sbGJhckRyYWdTdGFydCddXG4gID4oKTtcblxuICBAT3V0cHV0KCdzZXRUcmFuc2l0aW9uJykgc19zZXRUcmFuc2l0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3NldFRyYW5zaXRpb24nXT4oKTtcblxuICBAT3V0cHV0KCdzZXRUcmFuc2xhdGUnKSBzX3NldFRyYW5zbGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydzZXRUcmFuc2xhdGUnXT4oKTtcblxuICBAT3V0cHV0KCdzbGlkZUNoYW5nZScpIHNfc2xpZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snc2xpZGVDaGFuZ2UnXT4oKTtcblxuICBAT3V0cHV0KCdzbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQnKSBzX3NsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0J11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3NsaWRlTmV4dFRyYW5zaXRpb25FbmQnKSBzX3NsaWRlTmV4dFRyYW5zaXRpb25FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snc2xpZGVOZXh0VHJhbnNpdGlvbkVuZCddXG4gID4oKTtcblxuICBAT3V0cHV0KCdzbGlkZU5leHRUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlTmV4dFRyYW5zaXRpb25TdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzbGlkZU5leHRUcmFuc2l0aW9uU3RhcnQnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCcpIHNfc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzbGlkZVByZXZUcmFuc2l0aW9uRW5kJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3NsaWRlUHJldlRyYW5zaXRpb25TdGFydCcpIHNfc2xpZGVQcmV2VHJhbnNpdGlvblN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3NsaWRlUHJldlRyYW5zaXRpb25TdGFydCddXG4gID4oKTtcblxuICBAT3V0cHV0KCdzbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3NsaWRlUmVzZXRUcmFuc2l0aW9uU3RhcnQnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnc2xpZGVSZXNldFRyYW5zaXRpb25FbmQnKSBzX3NsaWRlUmVzZXRUcmFuc2l0aW9uRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3NsaWRlUmVzZXRUcmFuc2l0aW9uRW5kJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3NsaWRlck1vdmUnKSBzX3NsaWRlck1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snc2xpZGVyTW92ZSddPigpO1xuXG4gIEBPdXRwdXQoJ3NsaWRlckZpcnN0TW92ZScpIHNfc2xpZGVyRmlyc3RNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3NsaWRlckZpcnN0TW92ZSddXG4gID4oKTtcblxuICBAT3V0cHV0KCdzbGlkZXNMZW5ndGhDaGFuZ2UnKSBzX3NsaWRlc0xlbmd0aENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzbGlkZXNMZW5ndGhDaGFuZ2UnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnc2xpZGVzR3JpZExlbmd0aENoYW5nZScpIHNfc2xpZGVzR3JpZExlbmd0aENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzbGlkZXNHcmlkTGVuZ3RoQ2hhbmdlJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3NuYXBHcmlkTGVuZ3RoQ2hhbmdlJykgc19zbmFwR3JpZExlbmd0aENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzbmFwR3JpZExlbmd0aENoYW5nZSddXG4gID4oKTtcblxuICBAT3V0cHV0KCdzbmFwSW5kZXhDaGFuZ2UnKSBzX3NuYXBJbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzbmFwSW5kZXhDaGFuZ2UnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgndGFwJykgc190YXAgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1sndGFwJ10+KCk7XG5cbiAgQE91dHB1dCgndG9FZGdlJykgc190b0VkZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1sndG9FZGdlJ10+KCk7XG5cbiAgQE91dHB1dCgndG91Y2hFbmQnKSBzX3RvdWNoRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3RvdWNoRW5kJ10+KCk7XG5cbiAgQE91dHB1dCgndG91Y2hNb3ZlJykgc190b3VjaE1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1sndG91Y2hNb3ZlJ10+KCk7XG5cbiAgQE91dHB1dCgndG91Y2hNb3ZlT3Bwb3NpdGUnKSBzX3RvdWNoTW92ZU9wcG9zaXRlID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3RvdWNoTW92ZU9wcG9zaXRlJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3RvdWNoU3RhcnQnKSBzX3RvdWNoU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1sndG91Y2hTdGFydCddPigpO1xuXG4gIEBPdXRwdXQoJ3RyYW5zaXRpb25FbmQnKSBzX3RyYW5zaXRpb25FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1sndHJhbnNpdGlvbkVuZCddPigpO1xuXG4gIEBPdXRwdXQoJ3RyYW5zaXRpb25TdGFydCcpIHNfdHJhbnNpdGlvblN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3RyYW5zaXRpb25TdGFydCddXG4gID4oKTtcblxuICBAT3V0cHV0KCd1cGRhdGUnKSBzX3VwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWyd1cGRhdGUnXT4oKTtcblxuICBAT3V0cHV0KCd6b29tQ2hhbmdlJykgc196b29tQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3pvb21DaGFuZ2UnXT4oKTtcblxuICBAT3V0cHV0KCdzd2lwZXInKSBzX3N3aXBlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ2xvY2snKSBzX2xvY2sgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snbG9jayddPigpO1xuXG4gIEBPdXRwdXQoJ3VubG9jaycpIHNfdW5sb2NrID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3VubG9jayddPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3ByZXZFbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgcHJldkVsUmVmKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fcHJldkVsUmVmID0gZWw7XG4gICAgdGhpcy5fc2V0RWxlbWVudChlbCwgdGhpcy5uYXZpZ2F0aW9uLCAnbmF2aWdhdGlvbicsICdwcmV2RWwnKTtcbiAgfVxuICBfcHJldkVsUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCduZXh0RWxSZWYnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgc2V0IG5leHRFbFJlZihlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX25leHRFbFJlZiA9IGVsO1xuICAgIHRoaXMuX3NldEVsZW1lbnQoZWwsIHRoaXMubmF2aWdhdGlvbiwgJ25hdmlnYXRpb24nLCAnbmV4dEVsJyk7XG4gIH1cbiAgX25leHRFbFJlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc2Nyb2xsYmFyRWxSZWYnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgc2V0IHNjcm9sbGJhckVsUmVmKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fc2Nyb2xsYmFyRWxSZWYgPSBlbDtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLnNjcm9sbGJhciwgJ3Njcm9sbGJhcicpO1xuICB9XG4gIF9zY3JvbGxiYXJFbFJlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgncGFnaW5hdGlvbkVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBwYWdpbmF0aW9uRWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9wYWdpbmF0aW9uRWxSZWYgPSBlbDtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLnBhZ2luYXRpb24sICdwYWdpbmF0aW9uJyk7XG4gIH1cbiAgX3BhZ2luYXRpb25FbFJlZjogRWxlbWVudFJlZjtcbiAgQENvbnRlbnRDaGlsZHJlbihTd2lwZXJTbGlkZURpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogZmFsc2UsIGVtaXREaXN0aW5jdENoYW5nZXNPbmx5OiB0cnVlIH0pXG4gIHNsaWRlc0VsOiBRdWVyeUxpc3Q8U3dpcGVyU2xpZGVEaXJlY3RpdmU+O1xuICBwcml2YXRlIHNsaWRlczogU3dpcGVyU2xpZGVEaXJlY3RpdmVbXTtcblxuICBwcmVwZW5kU2xpZGVzOiBPYnNlcnZhYmxlPFN3aXBlclNsaWRlRGlyZWN0aXZlW10+O1xuICBhcHBlbmRTbGlkZXM6IE9ic2VydmFibGU8U3dpcGVyU2xpZGVEaXJlY3RpdmVbXT47XG5cbiAgc3dpcGVyUmVmOiBTd2lwZXI7XG4gIHJlYWRvbmx5IF9hY3RpdmVTbGlkZXMgPSBuZXcgU3ViamVjdDxTd2lwZXJTbGlkZURpcmVjdGl2ZVtdPigpO1xuXG4gIGdldCBhY3RpdmVTbGlkZXMoKSB7XG4gICAgaWYgKHRoaXMudmlydHVhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVNsaWRlcztcbiAgICB9XG4gICAgcmV0dXJuIG9mKHRoaXMuc2xpZGVzKTtcbiAgfVxuXG4gIGdldCB6b29tQ29udGFpbmVyQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuem9vbSAmJiB0eXBlb2YgdGhpcy56b29tICE9PSAnYm9vbGVhbidcbiAgICAgID8gdGhpcy56b29tLmNvbnRhaW5lckNsYXNzXG4gICAgICA6ICdzd2lwZXItem9vbS1jb250YWluZXInO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGNvbnRhaW5lckNsYXNzZXM6IHN0cmluZyA9ICdzd2lwZXInO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtSWQ6IE9iamVjdCxcbiAgKSB7fVxuXG4gIHByaXZhdGUgX3NldEVsZW1lbnQoZWw6IEVsZW1lbnRSZWYsIHJlZjogYW55LCB1cGRhdGU6IHN0cmluZywga2V5ID0gJ2VsJykge1xuICAgIGlmICghcmVmIHx8ICFlbCkgcmV0dXJuO1xuICAgIGlmIChlbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICBpZiAocmVmW2tleV0gPT09IGVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmVmW2tleV0gPSBlbC5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBjb25zdCB1cGRhdGVPYmo6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG4gICAgdXBkYXRlT2JqW3VwZGF0ZV0gPSB0cnVlO1xuICAgIHRoaXMudXBkYXRlSW5pdFN3aXBlcih1cGRhdGVPYmopO1xuICB9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgcGFyYW1zIH0gPSBnZXRQYXJhbXModGhpcyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYXJhbXMpO1xuICB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmNoaWxkcmVuU2xpZGVzSW5pdCgpO1xuICAgIHRoaXMuaW5pdFN3aXBlcigpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc19zd2lwZXIuZW1pdCh0aGlzLnN3aXBlclJlZik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNoaWxkcmVuU2xpZGVzSW5pdCgpIHtcbiAgICB0aGlzLnNsaWRlc0NoYW5nZXModGhpcy5zbGlkZXNFbCk7XG4gICAgdGhpcy5zbGlkZXNFbC5jaGFuZ2VzLnN1YnNjcmliZSh0aGlzLnNsaWRlc0NoYW5nZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzbGlkZXNDaGFuZ2VzID0gKHZhbDogUXVlcnlMaXN0PFN3aXBlclNsaWRlRGlyZWN0aXZlPikgPT4ge1xuICAgIHRoaXMuc2xpZGVzID0gdmFsLm1hcCgoc2xpZGU6IFN3aXBlclNsaWRlRGlyZWN0aXZlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBzbGlkZS5zbGlkZUluZGV4ID0gaW5kZXg7XG4gICAgICBzbGlkZS5jbGFzc05hbWVzID0gdGhpcy5zbGlkZUNsYXNzIHx8ICcnO1xuICAgICAgcmV0dXJuIHNsaWRlO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLmxvb3AgJiYgIXRoaXMubG9vcGVkU2xpZGVzKSB7XG4gICAgICB0aGlzLmNhbGNMb29wZWRTbGlkZXMoKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnZpcnR1YWwpIHtcbiAgICAgIGlmICh0aGlzLmxvb3BlZFNsaWRlcykge1xuICAgICAgICB0aGlzLnByZXBlbmRTbGlkZXMgPSBvZih0aGlzLnNsaWRlcy5zbGljZSh0aGlzLnNsaWRlcy5sZW5ndGggLSB0aGlzLmxvb3BlZFNsaWRlcykpO1xuICAgICAgICB0aGlzLmFwcGVuZFNsaWRlcyA9IG9mKHRoaXMuc2xpZGVzLnNsaWNlKDAsIHRoaXMubG9vcGVkU2xpZGVzKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnN3aXBlclJlZiAmJiB0aGlzLnN3aXBlclJlZi52aXJ0dWFsKSB7XG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnNsaWRlcyA9IHRoaXMuc2xpZGVzO1xuICAgICAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH07XG5cbiAgZ2V0IGlzU3dpcGVyQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLnN3aXBlclJlZiAmJiAhdGhpcy5zd2lwZXJSZWYuZGVzdHJveWVkO1xuICB9XG5cbiAgaW5pdFN3aXBlcigpIHtcbiAgICBjb25zdCB7IHBhcmFtczogc3dpcGVyUGFyYW1zLCBwYXNzZWRQYXJhbXMgfSA9IGdldFBhcmFtcyh0aGlzKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHN3aXBlclBhcmFtcyk7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN3aXBlclBhcmFtcy5pbml0ID0gZmFsc2U7XG4gICAgICBpZiAoIXN3aXBlclBhcmFtcy52aXJ0dWFsKSB7XG4gICAgICAgIHN3aXBlclBhcmFtcy5vYnNlcnZlciA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlclBhcmFtcy5vbkFueSA9IChldmVudE5hbWU6IGtleW9mIFN3aXBlckNvbXBvbmVudCwgLi4uYXJnczogYW55W10pID0+IHtcbiAgICAgICAgY29uc3QgZW1pdHRlciA9IHRoaXNbKCdzXycgKyBldmVudE5hbWUpIGFzIGtleW9mIFN3aXBlckNvbXBvbmVudF0gYXMgRXZlbnRFbWl0dGVyPGFueT47XG4gICAgICAgIGlmIChlbWl0dGVyKSB7XG4gICAgICAgICAgZW1pdHRlci5lbWl0KFsuLi5hcmdzXSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCBfc2xpZGVDbGFzc2VzOiBTd2lwZXJFdmVudHNbJ19zbGlkZUNsYXNzZXMnXSA9IChfLCB1cGRhdGVkKSA9PiB7XG4gICAgICAgIHVwZGF0ZWQuZm9yRWFjaCgoeyBzbGlkZUVsLCBjbGFzc05hbWVzIH0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YUluZGV4ID0gc2xpZGVFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XG4gICAgICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IGRhdGFJbmRleCA/IHBhcnNlSW50KGRhdGFJbmRleCkgOiBpbmRleDtcbiAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsKSB7XG4gICAgICAgICAgICBjb25zdCB2aXJ0dWFsU2xpZGUgPSB0aGlzLnNsaWRlcy5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtLnZpcnR1YWxJbmRleCAmJiBpdGVtLnZpcnR1YWxJbmRleCA9PT0gc2xpZGVJbmRleDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHZpcnR1YWxTbGlkZSkge1xuICAgICAgICAgICAgICB2aXJ0dWFsU2xpZGUuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5zbGlkZXNbc2xpZGVJbmRleF0pIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW3NsaWRlSW5kZXhdLmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH07XG4gICAgICBjb25zdCBfY29udGFpbmVyQ2xhc3NlczogU3dpcGVyRXZlbnRzWydfY29udGFpbmVyQ2xhc3NlcyddID0gKF8sIGNsYXNzZXMpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jb250YWluZXJDbGFzc2VzID0gY2xhc3NlcztcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXJQYXJhbXMub24sIHtcbiAgICAgICAgX2NvbnRhaW5lckNsYXNzZXMsXG4gICAgICAgIF9zbGlkZUNsYXNzZXMsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHN3aXBlclJlZiA9IG5ldyBTd2lwZXIoc3dpcGVyUGFyYW1zKTtcbiAgICAgIHN3aXBlclJlZi5sb29wQ3JlYXRlID0gKCkgPT4ge307XG4gICAgICBzd2lwZXJSZWYubG9vcERlc3Ryb3kgPSAoKSA9PiB7fTtcbiAgICAgIGlmIChzd2lwZXJQYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXJSZWYubG9vcGVkU2xpZGVzID0gdGhpcy5sb29wZWRTbGlkZXM7XG4gICAgICB9XG4gICAgICBjb25zdCBpc1ZpcnR1YWxFbmFibGVkID0gaXNFbmFibGVkKHN3aXBlclJlZi5wYXJhbXMudmlydHVhbCk7XG4gICAgICBpZiAoc3dpcGVyUmVmLnZpcnR1YWwgJiYgaXNWaXJ0dWFsRW5hYmxlZCkge1xuICAgICAgICBzd2lwZXJSZWYudmlydHVhbC5zbGlkZXMgPSB0aGlzLnNsaWRlcztcbiAgICAgICAgY29uc3QgZXh0ZW5kV2l0aCA9IHtcbiAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgc2xpZGVzOiB0aGlzLnNsaWRlcyxcbiAgICAgICAgICByZW5kZXJFeHRlcm5hbDogdGhpcy51cGRhdGVWaXJ0dWFsU2xpZGVzLFxuICAgICAgICAgIHJlbmRlckV4dGVybmFsVXBkYXRlOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgZXh0ZW5kKHN3aXBlclJlZi5wYXJhbXMudmlydHVhbCwgZXh0ZW5kV2l0aCk7XG4gICAgICAgIGV4dGVuZChzd2lwZXJSZWYub3JpZ2luYWxQYXJhbXMudmlydHVhbCwgZXh0ZW5kV2l0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKSkge1xuICAgICAgICB0aGlzLnN3aXBlclJlZiA9IHN3aXBlclJlZi5pbml0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgY29uc3QgaXNWaXJ0dWFsRW5hYmxlZCA9IGlzRW5hYmxlZCh0aGlzLnN3aXBlclJlZi5wYXJhbXMudmlydHVhbCk7XG4gICAgICAgIGlmICh0aGlzLnN3aXBlclJlZi52aXJ0dWFsICYmIGlzVmlydHVhbEVuYWJsZWQpIHtcbiAgICAgICAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdHlsZTogYW55ID0gbnVsbDtcbiAgY3VycmVudFZpcnR1YWxEYXRhOiBhbnk7IC8vIFRPRE86IHR5cGUgdmlydHVhbERhdGE7XG4gIHByaXZhdGUgdXBkYXRlVmlydHVhbFNsaWRlcyA9ICh2aXJ0dWFsRGF0YTogYW55KSA9PiB7XG4gICAgLy8gVE9ETzogdHlwZSB2aXJ0dWFsRGF0YVxuICAgIGlmIChcbiAgICAgICF0aGlzLnN3aXBlclJlZiB8fFxuICAgICAgKHRoaXMuY3VycmVudFZpcnR1YWxEYXRhICYmXG4gICAgICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhLmZyb20gPT09IHZpcnR1YWxEYXRhLmZyb20gJiZcbiAgICAgICAgdGhpcy5jdXJyZW50VmlydHVhbERhdGEudG8gPT09IHZpcnR1YWxEYXRhLnRvICYmXG4gICAgICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhLm9mZnNldCA9PT0gdmlydHVhbERhdGEub2Zmc2V0KVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnN0eWxlID0gdGhpcy5zd2lwZXJSZWYuaXNIb3Jpem9udGFsKClcbiAgICAgID8ge1xuICAgICAgICAgIFt0aGlzLnN3aXBlclJlZi5ydGxUcmFuc2xhdGUgPyAncmlnaHQnIDogJ2xlZnQnXTogYCR7dmlydHVhbERhdGEub2Zmc2V0fXB4YCxcbiAgICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgICAgdG9wOiBgJHt2aXJ0dWFsRGF0YS5vZmZzZXR9cHhgLFxuICAgICAgICB9O1xuICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhID0gdmlydHVhbERhdGE7XG4gICAgdGhpcy5fYWN0aXZlU2xpZGVzLm5leHQodmlydHVhbERhdGEuc2xpZGVzKTtcbiAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlU2xpZGVzKCk7XG4gICAgICB0aGlzLnN3aXBlclJlZi51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgaWYgKGlzRW5hYmxlZCh0aGlzLnN3aXBlclJlZi5wYXJhbXMubGF6eSkpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYubGF6eS5sb2FkKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlZFBhcmFtczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMudXBkYXRlU3dpcGVyKGNoYW5nZWRQYXJhbXMpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHVwZGF0ZUluaXRTd2lwZXIoY2hhbmdlZFBhcmFtczogYW55KSB7XG4gICAgaWYgKCEoY2hhbmdlZFBhcmFtcyAmJiB0aGlzLnN3aXBlclJlZiAmJiAhdGhpcy5zd2lwZXJSZWYuZGVzdHJveWVkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtczogY3VycmVudFBhcmFtcyxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgICAgbmF2aWdhdGlvbixcbiAgICAgICAgc2Nyb2xsYmFyLFxuICAgICAgICB2aXJ0dWFsLFxuICAgICAgICB0aHVtYnMsXG4gICAgICB9ID0gdGhpcy5zd2lwZXJSZWY7XG5cbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLnBhZ2luYXRpb24pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMucGFnaW5hdGlvbiAmJlxuICAgICAgICAgIHR5cGVvZiB0aGlzLnBhZ2luYXRpb24gIT09ICdib29sZWFuJyAmJlxuICAgICAgICAgIHRoaXMucGFnaW5hdGlvbi5lbCAmJlxuICAgICAgICAgIHBhZ2luYXRpb24gJiZcbiAgICAgICAgICAhcGFnaW5hdGlvbi5lbFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcigncGFnaW5hdGlvbicsIHRoaXMucGFnaW5hdGlvbik7XG4gICAgICAgICAgcGFnaW5hdGlvbi5pbml0KCk7XG4gICAgICAgICAgcGFnaW5hdGlvbi5yZW5kZXIoKTtcbiAgICAgICAgICBwYWdpbmF0aW9uLnVwZGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhZ2luYXRpb24uZGVzdHJveSgpO1xuICAgICAgICAgIHBhZ2luYXRpb24uZWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLnNjcm9sbGJhcikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5zY3JvbGxiYXIgJiZcbiAgICAgICAgICB0eXBlb2YgdGhpcy5zY3JvbGxiYXIgIT09ICdib29sZWFuJyAmJlxuICAgICAgICAgIHRoaXMuc2Nyb2xsYmFyLmVsICYmXG4gICAgICAgICAgc2Nyb2xsYmFyICYmXG4gICAgICAgICAgIXNjcm9sbGJhci5lbFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcignc2Nyb2xsYmFyJywgdGhpcy5zY3JvbGxiYXIpO1xuICAgICAgICAgIHNjcm9sbGJhci5pbml0KCk7XG4gICAgICAgICAgc2Nyb2xsYmFyLnVwZGF0ZVNpemUoKTtcbiAgICAgICAgICBzY3JvbGxiYXIuc2V0VHJhbnNsYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2Nyb2xsYmFyLmRlc3Ryb3koKTtcbiAgICAgICAgICBzY3JvbGxiYXIuZWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLm5hdmlnYXRpb24pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMubmF2aWdhdGlvbiAmJlxuICAgICAgICAgIHR5cGVvZiB0aGlzLm5hdmlnYXRpb24gIT09ICdib29sZWFuJyAmJlxuICAgICAgICAgIHRoaXMubmF2aWdhdGlvbi5wcmV2RWwgJiZcbiAgICAgICAgICB0aGlzLm5hdmlnYXRpb24ubmV4dEVsICYmXG4gICAgICAgICAgbmF2aWdhdGlvbiAmJlxuICAgICAgICAgICFuYXZpZ2F0aW9uLnByZXZFbCAmJlxuICAgICAgICAgICFuYXZpZ2F0aW9uLm5leHRFbFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcignbmF2aWdhdGlvbicsIHRoaXMubmF2aWdhdGlvbik7XG4gICAgICAgICAgbmF2aWdhdGlvbi5pbml0KCk7XG4gICAgICAgICAgbmF2aWdhdGlvbi51cGRhdGUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChuYXZpZ2F0aW9uLnByZXZFbCAmJiBuYXZpZ2F0aW9uLm5leHRFbCkge1xuICAgICAgICAgIG5hdmlnYXRpb24uZGVzdHJveSgpO1xuICAgICAgICAgIG5hdmlnYXRpb24ubmV4dEVsID0gbnVsbDtcbiAgICAgICAgICBuYXZpZ2F0aW9uLnByZXZFbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLnRodW1icyAmJiB0aGlzLnRodW1icyAmJiB0aGlzLnRodW1icy5zd2lwZXIpIHtcbiAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3RodW1icycsIHRoaXMudGh1bWJzKTtcbiAgICAgICAgY29uc3QgaW5pdGlhbGl6ZWQgPSB0aHVtYnMuaW5pdCgpO1xuICAgICAgICBpZiAoaW5pdGlhbGl6ZWQpIHRodW1icy51cGRhdGUodHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLmNvbnRyb2xsZXIgJiYgdGhpcy5jb250cm9sbGVyICYmIHRoaXMuY29udHJvbGxlci5jb250cm9sKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLmNvbnRyb2xsZXIuY29udHJvbCA9IHRoaXMuY29udHJvbGxlci5jb250cm9sO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN3aXBlclJlZi51cGRhdGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVN3aXBlcihjaGFuZ2VkUGFyYW1zOiBTaW1wbGVDaGFuZ2VzIHwgYW55KSB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLmNvbmZpZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIShjaGFuZ2VkUGFyYW1zICYmIHRoaXMuc3dpcGVyUmVmICYmICF0aGlzLnN3aXBlclJlZi5kZXN0cm95ZWQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGNoYW5nZWRQYXJhbXMpIHtcbiAgICAgICAgaWYgKGlnbm9yZU5nT25DaGFuZ2VzLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjaGFuZ2VkUGFyYW1zW2tleV0/LmN1cnJlbnRWYWx1ZSA/PyBjaGFuZ2VkUGFyYW1zW2tleV07XG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKGtleSwgbmV3VmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5hbGxvd1NsaWRlTmV4dCkge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5hbGxvd1NsaWRlTmV4dCA9IHRoaXMuYWxsb3dTbGlkZU5leHQ7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5hbGxvd1NsaWRlUHJldikge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5hbGxvd1NsaWRlUHJldiA9IHRoaXMuYWxsb3dTbGlkZVByZXY7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuY2hhbmdlRGlyZWN0aW9uKHRoaXMuZGlyZWN0aW9uLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5icmVha3BvaW50cykge1xuICAgICAgICBpZiAodGhpcy5sb29wICYmICF0aGlzLmxvb3BlZFNsaWRlcykge1xuICAgICAgICAgIHRoaXMuY2FsY0xvb3BlZFNsaWRlcygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLmN1cnJlbnRCcmVha3BvaW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuc2V0QnJlYWtwb2ludCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy50aHVtYnMgfHwgY2hhbmdlZFBhcmFtcy5jb250cm9sbGVyKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSW5pdFN3aXBlcihjaGFuZ2VkUGFyYW1zKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgY2FsY0xvb3BlZFNsaWRlcygpIHtcbiAgICBpZiAoIXRoaXMubG9vcCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgc2xpZGVzUGVyVmlld1BhcmFtcyA9IHRoaXMuc2xpZGVzUGVyVmlldztcbiAgICBpZiAodGhpcy5icmVha3BvaW50cykge1xuICAgICAgY29uc3QgYnJlYWtwb2ludCA9IFN3aXBlci5wcm90b3R5cGUuZ2V0QnJlYWtwb2ludCh0aGlzLmJyZWFrcG9pbnRzKTtcbiAgICAgIGNvbnN0IGJyZWFrcG9pbnRPbmx5UGFyYW1zID1cbiAgICAgICAgYnJlYWtwb2ludCBpbiB0aGlzLmJyZWFrcG9pbnRzID8gdGhpcy5icmVha3BvaW50c1ticmVha3BvaW50XSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChicmVha3BvaW50T25seVBhcmFtcyAmJiBicmVha3BvaW50T25seVBhcmFtcy5zbGlkZXNQZXJWaWV3KSB7XG4gICAgICAgIHNsaWRlc1BlclZpZXdQYXJhbXMgPSBicmVha3BvaW50T25seVBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2xpZGVzUGVyVmlld1BhcmFtcyA9PT0gJ2F1dG8nKSB7XG4gICAgICB0aGlzLmxvb3BlZFNsaWRlcyA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgICAgIHJldHVybiB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gICAgfVxuICAgIGxldCBsb29wZWRTbGlkZXMgPSB0aGlzLmxvb3BlZFNsaWRlcyB8fCBzbGlkZXNQZXJWaWV3UGFyYW1zO1xuICAgIGlmICghbG9vcGVkU2xpZGVzKSB7XG4gICAgICAvLyA/XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9vcEFkZGl0aW9uYWxTbGlkZXMpIHtcbiAgICAgIGxvb3BlZFNsaWRlcyArPSB0aGlzLmxvb3BBZGRpdGlvbmFsU2xpZGVzO1xuICAgIH1cbiAgICBpZiAobG9vcGVkU2xpZGVzID4gdGhpcy5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICBsb29wZWRTbGlkZXMgPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gICAgfVxuICAgIHRoaXMubG9vcGVkU2xpZGVzID0gbG9vcGVkU2xpZGVzO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdXBkYXRlUGFyYW1ldGVyKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKCEodGhpcy5zd2lwZXJSZWYgJiYgIXRoaXMuc3dpcGVyUmVmLmRlc3Ryb3llZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgX2tleSA9IGtleS5yZXBsYWNlKC9eXy8sICcnKSBhcyBrZXlvZiBTd2lwZXJPcHRpb25zO1xuICAgIGNvbnN0IGlzQ3VycmVudFBhcmFtT2JqID0gaXNPYmplY3QodGhpcy5zd2lwZXJSZWYucGFyYW1zW19rZXldKTtcblxuICAgIGlmIChfa2V5ID09PSAnZW5hYmxlZCcpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5lbmFibGUoKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzQ3VycmVudFBhcmFtT2JqICYmIGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgZXh0ZW5kKHRoaXMuc3dpcGVyUmVmLnBhcmFtc1tfa2V5XSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAodGhpcy5zd2lwZXJSZWYucGFyYW1zW19rZXldIGFzIGFueSkgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zd2lwZXJSZWY/LmRlc3Ryb3kodHJ1ZSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG59XG4iLCI8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1jb250YWluZXItc3RhcnRdXCI+PC9uZy1jb250ZW50PlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIm5hdmlnYXRpb24gJiYgc2hvd05hdmlnYXRpb25cIj5cbiAgPGRpdiBjbGFzcz1cInN3aXBlci1idXR0b24tcHJldlwiICNwcmV2RWxSZWY+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzd2lwZXItYnV0dG9uLW5leHRcIiAjbmV4dEVsUmVmPjwvZGl2PlxuPC9uZy1jb250YWluZXI+XG48ZGl2ICpuZ0lmPVwic2Nyb2xsYmFyICYmIHNob3dTY3JvbGxiYXJcIiBjbGFzcz1cInN3aXBlci1zY3JvbGxiYXJcIiAjc2Nyb2xsYmFyRWxSZWY+PC9kaXY+XG48ZGl2ICpuZ0lmPVwicGFnaW5hdGlvbiAmJiBzaG93UGFnaW5hdGlvblwiIGNsYXNzPVwic3dpcGVyLXBhZ2luYXRpb25cIiAjcGFnaW5hdGlvbkVsUmVmPjwvZGl2PlxuPGRpdiBbbmdDbGFzc109XCJ3cmFwcGVyQ2xhc3NcIiBbYXR0ci5pZF09XCJpZFwiPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD13cmFwcGVyLXN0YXJ0XVwiPjwvbmctY29udGVudD5cbiAgPG5nLXRlbXBsYXRlXG4gICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcbiAgICAgIHNsaWRlc1RlbXBsYXRlO1xuICAgICAgY29udGV4dDoge1xuICAgICAgICBsb29wU2xpZGVzOiBwcmVwZW5kU2xpZGVzLFxuICAgICAgICBrZXk6ICdwcmVwZW5kJ1xuICAgICAgfVxuICAgIFwiXG4gID48L25nLXRlbXBsYXRlPlxuICA8bmctdGVtcGxhdGVcbiAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxuICAgICAgc2xpZGVzVGVtcGxhdGU7XG4gICAgICBjb250ZXh0OiB7XG4gICAgICAgIGxvb3BTbGlkZXM6IGFjdGl2ZVNsaWRlcyxcbiAgICAgICAga2V5OiAnJ1xuICAgICAgfVxuICAgIFwiXG4gID48L25nLXRlbXBsYXRlPlxuICA8bmctdGVtcGxhdGVcbiAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxuICAgICAgc2xpZGVzVGVtcGxhdGU7XG4gICAgICBjb250ZXh0OiB7XG4gICAgICAgIGxvb3BTbGlkZXM6IGFwcGVuZFNsaWRlcyxcbiAgICAgICAga2V5OiAnYXBwZW5kJ1xuICAgICAgfVxuICAgIFwiXG4gID48L25nLXRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD13cmFwcGVyLWVuZF1cIj48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbjxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWNvbnRhaW5lci1lbmRdXCI+PC9uZy1jb250ZW50PlxuXG48bmctdGVtcGxhdGUgI3NsaWRlc1RlbXBsYXRlIGxldC1sb29wU2xpZGVzPVwibG9vcFNsaWRlc1wiIGxldC1zbGlkZUtleT1cImtleVwiPlxuICA8ZGl2XG4gICAgKm5nRm9yPVwibGV0IHNsaWRlIG9mIGxvb3BTbGlkZXMgfCBhc3luY1wiXG4gICAgW25nQ2xhc3NdPVwiXG4gICAgICAoc2xpZGUuY2xhc3MgPyBzbGlkZS5jbGFzcyArICcgJyA6ICcnKSArXG4gICAgICBzbGlkZUNsYXNzICtcbiAgICAgIChzbGlkZUtleSAhPT0gJycgPyAnICcgKyBzbGlkZUR1cGxpY2F0ZUNsYXNzIDogJycpXG4gICAgXCJcbiAgICBbYXR0ci5kYXRhLXN3aXBlci1zbGlkZS1pbmRleF09XCJzbGlkZS52aXJ0dWFsSW5kZXggPyBzbGlkZS52aXJ0dWFsSW5kZXggOiBzbGlkZS5zbGlkZUluZGV4XCJcbiAgICBbYXR0ci5kYXRhLXN3aXBlci1hdXRvcGxheV09XCJzbGlkZS5hdXRvcGxheURlbGF5XCJcbiAgICBbc3R5bGVdPVwic3R5bGVcIlxuICAgIFtuZ1N3aXRjaF09XCJzbGlkZS56b29tXCJcbiAgPlxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cInRydWVcIiBbbmdDbGFzc109XCJ6b29tQ29udGFpbmVyQ2xhc3NcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJzbGlkZS50ZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgICAgJGltcGxpY2l0OiBzbGlkZS5zbGlkZURhdGFcbiAgICAgICAgfVwiXG4gICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwic2xpZGUudGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICAgICRpbXBsaWNpdDogc2xpZGUuc2xpZGVEYXRhXG4gICAgICAgIH1cIlxuICAgICAgPjwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==