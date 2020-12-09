import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import Swiper from 'swiper/core';
import {
  A11yOptions,
  AutoplayOptions,
  ControllerOptions,
  CoverflowEffectOptions,
  CubeEffectOptions,
  FadeEffectOptions,
  FlipEffectOptions,
  HashNavigationOptions,
  HistoryOptions,
  KeyboardOptions,
  LazyOptions,
  MousewheelOptions,
  NavigationOptions,
  PaginationOptions,
  ScrollbarOptions,
  ThumbsOptions,
  VirtualData,
  VirtualOptions,
  ZoomOptions,
  SwiperEvents,
} from 'swiper/swiper-types';
import { Observable, of, Subject } from 'rxjs';
import { getParams } from './utils/get-params';
import { SwiperSlideDirective } from './swiper-slide.directive';
import { extend, isObject, setProperty, ignoreNgOnChanges } from './utils/utils';
@Component({
  selector: 'swiper, [swiper]',
  templateUrl: './swiper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      swiper {
        display: block;
      }
    `,
  ],
})
export class SwiperComponent implements OnInit {
  @Input() init: boolean = true;
  @Input() direction: 'horizontal' | 'vertical';
  @Input() touchEventsTarget: string;
  @Input() initialSlide: number;
  @Input() speed: number;
  @Input() cssMode: boolean;
  @Input() updateOnWindowResize: boolean;
  @Input() nested: boolean;
  @Input() width: number;
  @Input() height: number;
  @Input() preventInteractionOnTransition: boolean;
  @Input() userAgent: string;
  @Input() url: string;
  @Input() edgeSwipeDetection: boolean;
  @Input() edgeSwipeThreshold: number;
  @Input() freeMode: boolean;
  @Input() freeModeMomentum: boolean;
  @Input() freeModeMomentumRatio: number;
  @Input() freeModeMomentumBounce: boolean;
  @Input() freeModeMomentumBounceRatio: number;
  @Input() freeModeMomentumVelocityRatio: number;
  @Input() freeModeSticky: boolean;
  @Input() freeModeMinimumVelocity: number;
  @Input() autoHeight: boolean;
  @Input() setWrapperSize: boolean;
  @Input() virtualTranslate: boolean;
  @Input() effect: string;
  @Input() breakpoints: Object;
  @Input() spaceBetween: number;
  @Input() slidesPerView: number | 'auto';
  @Input() slidesPerColumn: number;
  @Input() slidesPerColumnFill: string;
  @Input() slidesPerGroup: number;
  @Input() slidesPerGroupSkip: number;
  @Input() centeredSlides: boolean;
  @Input() centeredSlidesBounds: boolean;
  @Input() slidesOffsetBefore: number;
  @Input() slidesOffsetAfter: number;
  @Input() normalizeSlideIndex: boolean;
  @Input() centerInsufficientSlides: boolean;
  @Input() watchOverflow: boolean;
  @Input() roundLengths: boolean;
  @Input() touchRatio: number;
  @Input() touchAngle: number;
  @Input() simulateTouch: boolean;
  @Input() shortSwipes: boolean;
  @Input() longSwipes: boolean;
  @Input() longSwipesRatio: number;
  @Input() longSwipesMs: number;
  @Input() followFinger: boolean;
  @Input() allowTouchMove: boolean;
  @Input() threshold: number;
  @Input() touchMoveStopPropagation: boolean;
  @Input() touchStartPreventDefault: boolean;
  @Input() touchStartForcePreventDefault: boolean;
  @Input() touchReleaseOnEdges: boolean;
  @Input() uniqueNavElements: boolean;
  @Input() resistance: boolean;
  @Input() resistanceRatio: number;
  @Input() watchSlidesProgress: boolean;
  @Input() watchSlidesVisibility: boolean;
  @Input() grabCursor: boolean;
  @Input() preventClicks: boolean;
  @Input() preventClicksPropagation: boolean;
  @Input() slideToClickedSlide: boolean;
  @Input() preloadImages: boolean;
  @Input() updateOnImagesReady: boolean;
  @Input() loop: boolean;
  @Input() loopAdditionalSlides: number;
  @Input() loopedSlides: number;
  @Input() loopFillGroupWithBlank: boolean;
  @Input() loopPreventsSlide: boolean;
  @Input() allowSlidePrev: boolean;
  @Input() allowSlideNext: boolean;
  @Input() swipeHandler: boolean;
  @Input() noSwiping: boolean;
  @Input() noSwipingClass: string;
  @Input() noSwipingSelector: string;
  @Input() passiveListeners: boolean;
  @Input() containerModifierClass: string;
  @Input() slideClass: string = 'swiper-slide';
  @Input() slideBlankClass: string;
  @Input() slideActiveClass: string;
  @Input() slideDuplicateActiveClass: string;
  @Input() slideVisibleClass: string;
  @Input() slideDuplicateClass: string;
  @Input() slideNextClass: string;
  @Input() slideDuplicateNextClass: string;
  @Input() slidePrevClass: string;
  @Input() slideDuplicatePrevClass: string;
  @Input() wrapperClass: string = 'swiper-wrapper';
  @Input() runCallbacksOnInit: boolean;
  @Input() a11y: A11yOptions;
  @Input() autoplay: AutoplayOptions | boolean;
  @Input() controller: ControllerOptions;
  @Input() coverflowEffect: CoverflowEffectOptions;
  @Input() cubeEffect: CubeEffectOptions;
  @Input() fadeEffect: FadeEffectOptions;
  @Input() flipEffect: FlipEffectOptions;
  @Input() hashNavigation: HashNavigationOptions | boolean;
  @Input() history: HistoryOptions | boolean;
  @Input() keyboard: KeyboardOptions | boolean;
  @Input() lazy: LazyOptions | boolean;
  @Input() mousewheel: MousewheelOptions | boolean;
  @Input()
  set navigation(val) {
    this._navigation = setProperty(val, {
      nextEl: null,
      prevEl: null,
    });
  }
  get navigation() {
    return this._navigation;
  }
  private _navigation: NavigationOptions | false;

  @Input()
  set pagination(val) {
    this._pagination = setProperty(val, {
      el: null,
    });
  }
  get pagination() {
    return this._pagination;
  }
  private _pagination: PaginationOptions | false;
  @Input() parallax: boolean;

  @Input()
  set scrollbar(val) {
    this._scrollbar = setProperty(val, {
      el: null,
    });
  }
  get scrollbar() {
    return this._scrollbar;
  }
  private _scrollbar: ScrollbarOptions | false;

  @Input()
  set virtual(val) {
    this._virtual = setProperty(val);
  }
  get virtual() {
    return this._virtual;
  }
  private _virtual: VirtualOptions | false;
  @Input() thumbs: ThumbsOptions;
  @Input() zoom: ZoomOptions | boolean;
  // prettier-ignore
  @Output('_beforeBreakpoint') s__beforeBreakpoint: EventEmitter<SwiperEvents['_beforeBreakpoint']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('_containerClasses') s__containerClasses: EventEmitter<SwiperEvents['_containerClasses']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('_slideClass') s__slideClass: EventEmitter<SwiperEvents['_slideClass']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('_swiper') s__swiper: EventEmitter<SwiperEvents['_swiper']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('activeIndexChange') s_activeIndexChange: EventEmitter<SwiperEvents['activeIndexChange']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('afterInit') s_afterInit: EventEmitter<SwiperEvents['afterInit']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('autoplay') s_autoplay: EventEmitter<SwiperEvents['autoplay']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('autoplayStart') s_autoplayStart: EventEmitter<SwiperEvents['autoplayStart']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('autoplayStop') s_autoplayStop: EventEmitter<SwiperEvents['autoplayStop']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('beforeDestroy') s_beforeDestroy: EventEmitter<SwiperEvents['beforeDestroy']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('beforeInit') s_beforeInit: EventEmitter<SwiperEvents['beforeInit']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('beforeLoopFix') s_beforeLoopFix: EventEmitter<SwiperEvents['beforeLoopFix']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('beforeResize') s_beforeResize: EventEmitter<SwiperEvents['beforeResize']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('beforeSlideChangeStart') s_beforeSlideChangeStart: EventEmitter<SwiperEvents['beforeSlideChangeStart']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('beforeTransitionStart') s_beforeTransitionStart: EventEmitter<SwiperEvents['beforeTransitionStart']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('breakpoint') s_breakpoint: EventEmitter<SwiperEvents['breakpoint']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('changeDirection') s_changeDirection: EventEmitter<SwiperEvents['changeDirection']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('click') s_click: EventEmitter<SwiperEvents['click']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('doubleTap') s_doubleTap: EventEmitter<SwiperEvents['doubleTap']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('doubleClick') s_doubleClick: EventEmitter<SwiperEvents['doubleClick']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('destroy') s_destroy: EventEmitter<SwiperEvents['destroy']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('fromEdge') s_fromEdge: EventEmitter<SwiperEvents['fromEdge']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('hashChange') s_hashChange: EventEmitter<SwiperEvents['hashChange']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('hashSet') s_hashSet: EventEmitter<SwiperEvents['hashSet']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('imagesReady') s_imagesReady: EventEmitter<SwiperEvents['imagesReady']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('init') s_init: EventEmitter<SwiperEvents['init']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('keyPress') s_keyPress: EventEmitter<SwiperEvents['keyPress']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('lazyImageLoad') s_lazyImageLoad: EventEmitter<SwiperEvents['lazyImageLoad']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('lazyImageReady') s_lazyImageReady: EventEmitter<SwiperEvents['lazyImageReady']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('loopFix') s_loopFix: EventEmitter<SwiperEvents['loopFix']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('momentumBounce') s_momentumBounce: EventEmitter<SwiperEvents['momentumBounce']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('navigationHide') s_navigationHide: EventEmitter<SwiperEvents['navigationHide']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('navigationShow') s_navigationShow: EventEmitter<SwiperEvents['navigationShow']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('observerUpdate') s_observerUpdate: EventEmitter<SwiperEvents['observerUpdate']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('orientationchange') s_orientationchange: EventEmitter<SwiperEvents['orientationchange']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('paginationHide') s_paginationHide: EventEmitter<SwiperEvents['paginationHide']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('paginationRender') s_paginationRender: EventEmitter<SwiperEvents['paginationRender']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('paginationShow') s_paginationShow: EventEmitter<SwiperEvents['paginationShow']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('paginationUpdate') s_paginationUpdate: EventEmitter<SwiperEvents['paginationUpdate']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('progress') s_progress: EventEmitter<SwiperEvents['progress']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('reachBeginning') s_reachBeginning: EventEmitter<SwiperEvents['reachBeginning']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('reachEnd') s_reachEnd: EventEmitter<SwiperEvents['reachEnd']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('realIndexChange') s_realIndexChange: EventEmitter<SwiperEvents['realIndexChange']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('resize') s_resize: EventEmitter<SwiperEvents['resize']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('scroll') s_scroll: EventEmitter<SwiperEvents['scroll']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('scrollbarDragEnd') s_scrollbarDragEnd: EventEmitter<SwiperEvents['scrollbarDragEnd']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('scrollbarDragMove') s_scrollbarDragMove: EventEmitter<SwiperEvents['scrollbarDragMove']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('scrollbarDragStart') s_scrollbarDragStart: EventEmitter<SwiperEvents['scrollbarDragStart']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('setTransition') s_setTransition: EventEmitter<SwiperEvents['setTransition']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('setTranslate') s_setTranslate: EventEmitter<SwiperEvents['setTranslate']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('slideChange') s_slideChange: EventEmitter<SwiperEvents['slideChange']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('slideChangeTransitionEnd') s_slideChangeTransitionEnd: EventEmitter<SwiperEvents['slideChangeTransitionEnd']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('slideChangeTransitionStart') s_slideChangeTransitionStart: EventEmitter<SwiperEvents['slideChangeTransitionStart']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('slideNextTransitionEnd') s_slideNextTransitionEnd: EventEmitter<SwiperEvents['slideNextTransitionEnd']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('slideNextTransitionStart') s_slideNextTransitionStart: EventEmitter<SwiperEvents['slideNextTransitionStart']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('slidePrevTransitionEnd') s_slidePrevTransitionEnd: EventEmitter<SwiperEvents['slidePrevTransitionEnd']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('slidePrevTransitionStart') s_slidePrevTransitionStart: EventEmitter<SwiperEvents['slidePrevTransitionStart']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('slideResetTransitionStart') s_slideResetTransitionStart: EventEmitter<SwiperEvents['slideResetTransitionStart']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('slideResetTransitionEnd') s_slideResetTransitionEnd: EventEmitter<SwiperEvents['slideResetTransitionEnd']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('sliderMove') s_sliderMove: EventEmitter<SwiperEvents['sliderMove']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('sliderFirstMove') s_sliderFirstMove: EventEmitter<SwiperEvents['sliderFirstMove']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('slidesLengthChange') s_slidesLengthChange: EventEmitter<SwiperEvents['slidesLengthChange']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('slidesGridLengthChange') s_slidesGridLengthChange: EventEmitter<SwiperEvents['slidesGridLengthChange']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('snapGridLengthChange') s_snapGridLengthChange: EventEmitter<SwiperEvents['snapGridLengthChange']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('snapIndexChange') s_snapIndexChange: EventEmitter<SwiperEvents['snapIndexChange']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('tap') s_tap: EventEmitter<SwiperEvents['tap']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('toEdge') s_toEdge: EventEmitter<SwiperEvents['toEdge']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('touchEnd') s_touchEnd: EventEmitter<SwiperEvents['touchEnd']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('touchMove') s_touchMove: EventEmitter<SwiperEvents['touchMove']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('touchMoveOpposite') s_touchMoveOpposite: EventEmitter<SwiperEvents['touchMoveOpposite']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('touchStart') s_touchStart: EventEmitter<SwiperEvents['touchStart']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('transitionEnd') s_transitionEnd: EventEmitter<SwiperEvents['transitionEnd']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('transitionStart') s_transitionStart: EventEmitter<SwiperEvents['transitionStart']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('update') s_update: EventEmitter<SwiperEvents['update']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('zoomChange') s_zoomChange: EventEmitter<SwiperEvents['zoomChange']> = new EventEmitter<any>();
  // prettier-ignore
  @Output('swiper') s_swiper: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('prevElRef', { static: false })
  set prevElRef(el: ElementRef) {
    this._setElement(el, this.navigation, 'navigation', 'prevEl');
  }
  @ViewChild('nextElRef', { static: false })
  set nextElRef(el: ElementRef) {
    this._setElement(el, this.navigation, 'navigation', 'nextEl');
  }
  @ViewChild('scrollbarElRef', { static: false })
  set scrollbarElRef(el: ElementRef) {
    this._setElement(el, this.scrollbar, 'scrollbar');
  }
  @ViewChild('paginationElRef', { static: false })
  set paginationElRef(el: ElementRef) {
    this._setElement(el, this.pagination, 'pagination');
  }
  @ContentChildren(SwiperSlideDirective, { descendants: true })
  set slidesEl(val: QueryList<SwiperSlideDirective>) {
    this.slides = val.map((slide: SwiperSlideDirective, index: number) => {
      slide.slideIndex = index;
      slide.classNames = this.slideClass;
      return slide;
    });
    if (this.loop && !this.loopedSlides) {
      this.calcLoopedSlides();
    }
    if (!this.virtual) {
      this.prependSlides = of(this.slides.slice(this.slides.length - this.loopedSlides));
      this.appendSlides = of(this.slides.slice(0, this.loopedSlides));
    }
  }
  private slides: SwiperSlideDirective[];

  prependSlides: Observable<SwiperSlideDirective[]>;
  appendSlides: Observable<SwiperSlideDirective[]>;

  swiperRef: Swiper;
  readonly _activeSlides = new Subject<SwiperSlideDirective[]>();

  get activeSlides() {
    if (this.virtual) {
      return this._activeSlides;
    }
    return of(this.slides);
  }

  @HostBinding('class') containerClasses = 'swiper-container';
  constructor(private elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {}

  private _setElement(el: ElementRef, ref: any, update: string, key = 'el') {
    if (!el && !ref) {
      return;
    }
    if (ref) {
      if (ref[key] === el.nativeElement) {
        return;
      }
      ref[key] = el.nativeElement;
    }
    const updateObj = {};
    updateObj[update] = true;
    this.updateInitSwiper(updateObj);
  }
  ngOnInit(): void {
    const { params } = getParams(this);
    Object.assign(this, params);
  }

  ngAfterViewInit() {
    if (this.init) {
      this.initSwiper();
      this._changeDetectorRef.detectChanges();
    }
  }

  initSwiper() {
    const { params: swiperParams, passedParams } = getParams(this);
    Object.assign(this, swiperParams);
    swiperParams.onAny = (event, ...args) => {
      const emitter = this[`s_${event}`] as EventEmitter<any>;
      if (emitter) {
        emitter.emit(...args);
      }
    };

    Object.assign(swiperParams.on, {
      _containerClasses(swiper, classes) {
        this.containerClasses = classes;
      },
      _swiper: (swiper) => {
        this.swiperRef = swiper;
        this.s_swiper.emit(this.swiperRef);
        swiper.loopCreate = () => {};
        swiper.loopDestroy = () => {};
        if (swiperParams.loop) {
          swiper.loopedSlides = this.loopedSlides;
        }
        if (swiper.virtual && swiper.params.virtual.enabled) {
          swiper.virtual.slides = this.slides;
          swiper.params.virtual.cache = false;
          swiper.params.virtual.renderExternal = (data) => {
            this.updateVirtualSlides(data);
          };
          swiper.params.virtual.renderExternalUpdate = false;
        }
        this._changeDetectorRef.detectChanges();
      },
      _slideClass: (_, el: HTMLElement, classNames) => {
        const slideIndex = parseInt(el.dataset.swiperSlideIndex);
        if (this.virtual) {
          const virtualSlide = this.slides.find((item) => {
            return item.virtualIndex && item.virtualIndex === slideIndex;
          });
          if (virtualSlide) {
            virtualSlide.classNames = classNames;
            return;
          }
        }
        this.slides[slideIndex].classNames = classNames;
        this._changeDetectorRef.detectChanges();
      },
    });
    new Swiper(this.elementRef.nativeElement, swiperParams);
  }

  style: any = null;
  currentVirtualData: VirtualData;
  private updateVirtualSlides(virtualData: VirtualData) {
    if (
      !this.swiperRef ||
      (this.currentVirtualData &&
        this.currentVirtualData.from === virtualData.from &&
        this.currentVirtualData.to === virtualData.to &&
        this.currentVirtualData.offset === virtualData.offset)
    ) {
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
    this._changeDetectorRef.detectChanges();
    this.swiperRef.updateSlides();
    this.swiperRef.updateProgress();
    this.swiperRef.updateSlidesClasses();
    if (this.swiperRef.lazy && this.swiperRef.params.lazy['enabled']) {
      this.swiperRef.lazy.load();
    }
    this.swiperRef.virtual.update(true);
    return;
  }

  ngOnChanges(changedParams: SimpleChanges) {
    this.updateSwiper(changedParams);
    this._changeDetectorRef.detectChanges();
  }

  updateInitSwiper(changedParams) {
    if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
      return;
    }
    const {
      params: currentParams,
      pagination,
      navigation,
      scrollbar,
      virtual,
      thumbs,
    } = this.swiperRef;

    if (changedParams.pagination) {
      if (this.pagination && this.pagination.el && pagination && !pagination.el) {
        this.updateParameter('pagination', this.pagination);
        pagination.init();
        pagination.render();
        pagination.update();
      } else {
        pagination.destroy();
        pagination.el = null;
      }
    }

    if (changedParams.scrollbar) {
      if (this.scrollbar && this.scrollbar.el && scrollbar && !scrollbar.el) {
        this.updateParameter('scrollbar', this.scrollbar);
        scrollbar.init();
        scrollbar.updateSize();
        scrollbar.setTranslate();
      } else {
        scrollbar.destroy();
        scrollbar.el = null;
      }
    }

    if (changedParams.navigation) {
      if (
        this.navigation &&
        this.navigation.prevEl &&
        this.navigation.nextEl &&
        navigation &&
        !navigation.prevEl &&
        !navigation.nextEl
      ) {
        this.updateParameter('navigation', this.navigation);
        navigation.init();
        navigation.update();
      } else if (navigation.prevEl && navigation.nextEl) {
        navigation.destroy();
        navigation.nextEl = null;
        navigation.prevEl = null;
      }
    }
    if (changedParams.thumbs && this.thumbs && this.thumbs.swiper) {
      this.updateParameter('thumbs', this.thumbs);
      const initialized = thumbs.init();
      if (initialized) thumbs.update(true);
    }

    if (changedParams.controller && this.controller && this.controller.control) {
      this.swiperRef.controller.control = this.controller.control;
    }

    this.swiperRef.update();
  }

  updateSwiper(changedParams: SimpleChanges) {
    if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
      return;
    }
    for (const key in changedParams) {
      if (ignoreNgOnChanges.indexOf(key) >= 0) {
        continue;
      }
      this.updateParameter(key, changedParams[key].currentValue);
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
    this.swiperRef.update();
  }

  calcLoopedSlides() {
    if (!this.loop) {
      return;
    }
    let slidesPerViewParams = this.slidesPerView;
    if (this.breakpoints) {
      const breakpoint = Swiper.prototype.getBreakpoint(this.breakpoints);
      const breakpointOnlyParams =
        breakpoint in this.breakpoints ? this.breakpoints[breakpoint] : undefined;
      if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
        slidesPerViewParams = breakpointOnlyParams.slidesPerView;
      }
    }
    if (slidesPerViewParams === 'auto') {
      this.loopedSlides = this.slides.length;
      return this.slides.length;
    }
    let loopedSlides = this.loopedSlides || slidesPerViewParams;

    loopedSlides += this.loopAdditionalSlides;

    if (loopedSlides > this.slides.length) {
      loopedSlides = this.slides.length;
    }
    this.loopedSlides = loopedSlides;
    return loopedSlides;
  }

  updateParameter(key, value) {
    if (!(this.swiperRef && !this.swiperRef.destroyed)) {
      return;
    }
    const _key = key.replace(/^_/, '');
    if (Object.keys(this.swiperRef.modules).indexOf(_key) >= 0) {
      extend(value, this.swiperRef.modules[_key].params[_key]);
    }
    if (isObject(this.swiperRef.params[_key]) && isObject(value)) {
      extend(this.swiperRef.params[_key], value);
    } else {
      this.swiperRef.params[_key] = value;
    }
  }

  ngOnDestroy() {
    this.swiperRef.destroy();
  }
}
