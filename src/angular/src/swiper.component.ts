import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnInit,
  Output,
  PLATFORM_ID,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
// @ts-ignore
import Swiper from 'swiper';
import { Observable, of, Subject } from 'rxjs';
import { getParams } from './utils/get-params';
import { SwiperSlideDirective } from './swiper-slide.directive';
import {
  extend,
  isObject,
  setProperty,
  ignoreNgOnChanges,
  coerceBooleanProperty,
  isShowEl,
} from './utils/utils';
import {
  SwiperOptions,
  SwiperEvents,
  NavigationOptions,
  PaginationOptions,
  ScrollbarOptions,
  VirtualOptions,
} from 'swiper/types';
import { isPlatformBrowser } from '@angular/common';
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
  @Input() direction: SwiperOptions['direction'];
  @Input() touchEventsTarget: SwiperOptions['touchEventsTarget'];
  @Input() initialSlide: SwiperOptions['initialSlide'];
  @Input() speed: SwiperOptions['speed'];
  @Input() cssMode: SwiperOptions['cssMode'];
  @Input() updateOnWindowResize: SwiperOptions['updateOnWindowResize'];
  @Input() resizeObserver: SwiperOptions['resizeObserver'];
  @Input() nested: SwiperOptions['nested'];
  @Input() focusableElements: SwiperOptions['focusableElements'];
  @Input() width: SwiperOptions['width'];
  @Input() height: SwiperOptions['height'];
  @Input() preventInteractionOnTransition: SwiperOptions['preventInteractionOnTransition'];
  @Input() userAgent: SwiperOptions['userAgent'];
  @Input() url: SwiperOptions['url'];
  @Input() edgeSwipeDetection: boolean | string;
  @Input() edgeSwipeThreshold: number;
  @Input() freeMode: SwiperOptions['freeMode'];
  @Input() autoHeight: SwiperOptions['autoHeight'];
  @Input() setWrapperSize: SwiperOptions['setWrapperSize'];
  @Input() virtualTranslate: SwiperOptions['virtualTranslate'];
  @Input() effect: SwiperOptions['effect'];
  @Input() breakpoints: SwiperOptions['breakpoints'];
  @Input() spaceBetween: SwiperOptions['spaceBetween'];
  @Input() slidesPerView: SwiperOptions['slidesPerView'];
  @Input() grid: SwiperOptions['grid'];
  @Input() slidesPerGroup: SwiperOptions['slidesPerGroup'];
  @Input() slidesPerGroupSkip: SwiperOptions['slidesPerGroupSkip'];
  @Input() centeredSlides: SwiperOptions['centeredSlides'];
  @Input() centeredSlidesBounds: SwiperOptions['centeredSlidesBounds'];
  @Input() slidesOffsetBefore: SwiperOptions['slidesOffsetBefore'];
  @Input() slidesOffsetAfter: SwiperOptions['slidesOffsetAfter'];
  @Input() normalizeSlideIndex: SwiperOptions['normalizeSlideIndex'];
  @Input() centerInsufficientSlides: SwiperOptions['centerInsufficientSlides'];
  @Input() watchOverflow: SwiperOptions['watchOverflow'];
  @Input() roundLengths: SwiperOptions['roundLengths'];
  @Input() touchRatio: SwiperOptions['touchRatio'];
  @Input() touchAngle: SwiperOptions['touchAngle'];
  @Input() simulateTouch: SwiperOptions['simulateTouch'];
  @Input() shortSwipes: SwiperOptions['shortSwipes'];
  @Input() longSwipes: SwiperOptions['longSwipes'];
  @Input() longSwipesRatio: SwiperOptions['longSwipesRatio'];
  @Input() longSwipesMs: SwiperOptions['longSwipesMs'];
  @Input() followFinger: SwiperOptions['followFinger'];
  @Input() allowTouchMove: SwiperOptions['allowTouchMove'];
  @Input() threshold: SwiperOptions['threshold'];
  @Input() touchMoveStopPropagation: SwiperOptions['touchMoveStopPropagation'];
  @Input() touchStartPreventDefault: SwiperOptions['touchStartPreventDefault'];
  @Input() touchStartForcePreventDefault: SwiperOptions['touchStartForcePreventDefault'];
  @Input() touchReleaseOnEdges: SwiperOptions['touchReleaseOnEdges'];
  @Input() uniqueNavElements: SwiperOptions['uniqueNavElements'];
  @Input() resistance: SwiperOptions['resistance'];
  @Input() resistanceRatio: SwiperOptions['resistanceRatio'];
  @Input() watchSlidesProgress: SwiperOptions['watchSlidesProgress'];
  @Input() grabCursor: SwiperOptions['grabCursor'];
  @Input() preventClicks: SwiperOptions['preventClicks'];
  @Input() preventClicksPropagation: SwiperOptions['preventClicksPropagation'];
  @Input() slideToClickedSlide: SwiperOptions['slideToClickedSlide'];
  @Input() preloadImages: SwiperOptions['preloadImages'];
  @Input() updateOnImagesReady: SwiperOptions['updateOnImagesReady'];
  @Input() loop: SwiperOptions['loop'];
  @Input() loopAdditionalSlides: SwiperOptions['loopAdditionalSlides'];
  @Input() loopedSlides: SwiperOptions['loopedSlides'];
  @Input() loopFillGroupWithBlank: SwiperOptions['loopFillGroupWithBlank'];
  @Input() loopPreventsSlide: SwiperOptions['loopPreventsSlide'];
  @Input() allowSlidePrev: SwiperOptions['allowSlidePrev'];
  @Input() allowSlideNext: SwiperOptions['allowSlideNext'];
  @Input() swipeHandler: SwiperOptions['swipeHandler'];
  @Input() noSwiping: SwiperOptions['noSwiping'];
  @Input() noSwipingClass: SwiperOptions['noSwipingClass'];
  @Input() noSwipingSelector: SwiperOptions['noSwipingSelector'];
  @Input() passiveListeners: SwiperOptions['passiveListeners'];
  @Input() containerModifierClass: SwiperOptions['containerModifierClass'];
  @Input() slideClass: SwiperOptions['slideClass'] = 'swiper-slide';
  @Input() slideBlankClass: SwiperOptions['slideBlankClass'];
  @Input() slideActiveClass: SwiperOptions['slideActiveClass'];
  @Input() slideDuplicateActiveClass: SwiperOptions['slideDuplicateActiveClass'];
  @Input() slideVisibleClass: SwiperOptions['slideVisibleClass'];
  @Input() slideDuplicateClass: SwiperOptions['slideDuplicateClass'];
  @Input() slideNextClass: SwiperOptions['slideNextClass'];
  @Input() slideDuplicateNextClass: SwiperOptions['slideDuplicateNextClass'];
  @Input() slidePrevClass: SwiperOptions['slidePrevClass'];
  @Input() slideDuplicatePrevClass: SwiperOptions['slideDuplicatePrevClass'];
  @Input() wrapperClass: SwiperOptions['wrapperClass'] = 'swiper-wrapper';
  @Input() runCallbacksOnInit: SwiperOptions['runCallbacksOnInit'];
  @Input() observeParents: SwiperOptions['observeParents'];
  @Input() observeSlideChildren: SwiperOptions['observeSlideChildren'];
  @Input() a11y: SwiperOptions['a11y'];
  @Input() autoplay: SwiperOptions['autoplay'];
  @Input() controller: SwiperOptions['controller'];
  @Input() coverflowEffect: SwiperOptions['coverflowEffect'];
  @Input() cubeEffect: SwiperOptions['cubeEffect'];
  @Input() fadeEffect: SwiperOptions['fadeEffect'];
  @Input() flipEffect: SwiperOptions['flipEffect'];
  @Input() creativeEffect: SwiperOptions['creativeEffect'];
  @Input() cardsEffect: SwiperOptions['cardsEffect'];
  @Input() hashNavigation: SwiperOptions['hashNavigation'];
  @Input() history: SwiperOptions['history'];
  @Input() keyboard: SwiperOptions['keyboard'];
  @Input() lazy: SwiperOptions['lazy'];
  @Input() mousewheel: SwiperOptions['mousewheel'];
  @Input() parallax: SwiperOptions['parallax'];
  @Input() thumbs: SwiperOptions['thumbs'];
  @Input() zoom: SwiperOptions['zoom'];
  @Input() class: string;
  @Input() id: string;
  @Input()
  set navigation(val) {
    const currentNext =
      typeof this._navigation !== 'boolean' && this._navigation !== ''
        ? this._navigation?.nextEl
        : null;
    const currentPrev =
      typeof this._navigation !== 'boolean' && this._navigation !== ''
        ? this._navigation?.prevEl
        : null;
    this._navigation = setProperty(val, {
      nextEl: currentNext || null,
      prevEl: currentPrev || null,
    });
    this.showNavigation = !(
      coerceBooleanProperty(val) !== true ||
      (this._navigation &&
        typeof this._navigation !== 'boolean' &&
        this._navigation.prevEl !== this._prevElRef?.nativeElement &&
        (this._navigation.prevEl !== null || this._navigation.nextEl !== null) &&
        (typeof this._navigation.nextEl === 'string' ||
          typeof this._navigation.prevEl === 'string' ||
          typeof this._navigation.nextEl === 'object' ||
          typeof this._navigation.prevEl === 'object'))
    );
  }
  get navigation() {
    return this._navigation;
  }
  private _navigation: NavigationOptions | boolean | '';
  showNavigation: boolean = true;

  @Input()
  set pagination(val) {
    const current =
      typeof this._pagination !== 'boolean' && this._pagination !== ''
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
  private _pagination: PaginationOptions | boolean | '';
  showPagination: boolean = true;

  @Input()
  set scrollbar(val) {
    const current =
      typeof this._scrollbar !== 'boolean' && this._scrollbar !== '' ? this._scrollbar?.el : null;
    this._scrollbar = setProperty(val, {
      el: current || null,
    });
    this.showScrollbar = isShowEl(val, this._scrollbar, this._scrollbarElRef);
  }
  get scrollbar() {
    return this._scrollbar;
  }
  private _scrollbar: ScrollbarOptions | boolean | '';
  showScrollbar: boolean = true;

  @Input()
  set virtual(val) {
    this._virtual = setProperty(val);
  }
  get virtual() {
    return this._virtual;
  }
  private _virtual: VirtualOptions | boolean | '';

  @Input()
  set index(index: number) {
    this.setIndex(index);
  }
  @Input()
  set config(val: SwiperOptions) {
    this.updateSwiper(val);
    const { params } = getParams(val);
    Object.assign(this, params);
  }
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

  @Output() indexChange = new EventEmitter<number>();

  @ViewChild('prevElRef', { static: false })
  set prevElRef(el: ElementRef) {
    this._prevElRef = el;
    this._setElement(el, this.navigation, 'navigation', 'prevEl');
  }
  _prevElRef: ElementRef;
  @ViewChild('nextElRef', { static: false })
  set nextElRef(el: ElementRef) {
    this._nextElRef = el;
    this._setElement(el, this.navigation, 'navigation', 'nextEl');
  }
  _nextElRef: ElementRef;
  @ViewChild('scrollbarElRef', { static: false })
  set scrollbarElRef(el: ElementRef) {
    this._scrollbarElRef = el;
    this._setElement(el, this.scrollbar, 'scrollbar');
  }
  _scrollbarElRef: ElementRef;
  @ViewChild('paginationElRef', { static: false })
  set paginationElRef(el: ElementRef) {
    this._paginationElRef = el;
    this._setElement(el, this.pagination, 'pagination');
  }
  _paginationElRef: ElementRef;
  @ContentChildren(SwiperSlideDirective, { descendants: false, emitDistinctChangesOnly: true })
  slidesEl: QueryList<SwiperSlideDirective>;
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

  get zoomContainerClass() {
    return this.zoom && typeof this.zoom !== 'boolean'
      ? this.zoom.containerClass
      : 'swiper-zoom-container';
  }

  @HostBinding('class') containerClasses: string = 'swiper';
  constructor(
    private _ngZone: NgZone,
    private elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) {}

  private _setElement(el: ElementRef, ref: any, update: string, key = 'el') {
    if (!el || !ref) {
      return;
    }
    if (ref && el.nativeElement) {
      if (ref[key] === el.nativeElement) {
        return;
      }
      ref[key] = el.nativeElement;
    }
    const updateObj: { [key: string]: boolean } = {};
    updateObj[update] = true;
    this.updateInitSwiper(updateObj);
  }
  ngOnInit(): void {
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

  private childrenSlidesInit() {
    this.slidesChanges(this.slidesEl);
    this.slidesEl.changes.subscribe(this.slidesChanges);
  }

  private slidesChanges = (val: QueryList<SwiperSlideDirective>) => {
    this.slides = val.map((slide: SwiperSlideDirective, index: number) => {
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
    } else if (this.swiperRef && this.swiperRef.virtual) {
      this._ngZone.runOutsideAngular(() => {
        this.swiperRef.virtual.slides = this.slides;
        this.swiperRef.virtual.update(true);
      });
    }
    this._changeDetectorRef.detectChanges();
  };

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

      swiperParams.onAny = (eventName: keyof SwiperComponent, ...args: any[]) => {
        const emitter = this[('s_' + eventName) as keyof SwiperComponent] as EventEmitter<any>;
        if (emitter) {
          emitter.emit(...args);
        }
      };
      const _slideClasses: SwiperEvents['_slideClasses'] = (_, updated) => {
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
      const _containerClasses: SwiperEvents['_containerClasses'] = (_, classes) => {
        setTimeout(() => {
          this.containerClasses = classes;
        });
      };
      Object.assign(swiperParams.on, {
        _containerClasses,
        _slideClasses,
      });
      const swiperRef = new Swiper(swiperParams);
      swiperRef.loopCreate = () => {};
      swiperRef.loopDestroy = () => {};
      if (swiperParams.loop) {
        swiperRef.loopedSlides = this.loopedSlides;
      }
      const isVirtualEnabled =
        typeof swiperRef.params.virtual !== 'undefined' &&
        typeof swiperRef.params.virtual !== 'boolean' &&
        swiperRef.params.virtual.enabled;
      if (swiperRef.virtual && isVirtualEnabled) {
        swiperRef.virtual.slides = this.slides;
        const extendWith = {
          cache: false,
          renderExternal: this.updateVirtualSlides,
          renderExternalUpdate: false,
        };
        extend(swiperRef.params.virtual, extendWith);
        extend(swiperRef.originalParams.virtual, extendWith);
      }

      if (isPlatformBrowser(this._platformId)) {
        this.swiperRef = swiperRef.init(this.elementRef.nativeElement);
        const isEnabled =
          typeof this.swiperRef.params.virtual !== 'undefined' &&
          typeof this.swiperRef.params.virtual !== 'boolean' &&
          this.swiperRef.params.virtual.enabled;
        if (this.swiperRef.virtual && isEnabled) {
          this.swiperRef.virtual.update(true);
        }
        this._changeDetectorRef.detectChanges();
        swiperRef.on('slideChange', () => {
          this.indexChange.emit(this.swiperRef.realIndex);
        });
      }
    });
  }

  style: any = null;
  currentVirtualData: any; // TODO: type virtualData;
  private updateVirtualSlides = (virtualData: any) => {
    // TODO: type virtualData
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
    this._ngZone.run(() => {
      this._changeDetectorRef.detectChanges();
    });
    this._ngZone.runOutsideAngular(() => {
      this.swiperRef.updateSlides();
      this.swiperRef.updateProgress();
      this.swiperRef.updateSlidesClasses();
      if (this.swiperRef.lazy && this.swiperRef.params.lazy['enabled']) {
        this.swiperRef.lazy.load();
      }
      this.swiperRef.virtual.update(true);
    });
    return;
  };

  ngOnChanges(changedParams: SimpleChanges) {
    this.updateSwiper(changedParams);
    this._changeDetectorRef.detectChanges();
  }

  updateInitSwiper(changedParams: any) {
    if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
      return;
    }

    this._ngZone.runOutsideAngular(() => {
      const {
        params: currentParams,
        pagination,
        navigation,
        scrollbar,
        virtual,
        thumbs,
      } = this.swiperRef;

      if (changedParams.pagination) {
        if (
          this.pagination &&
          typeof this.pagination !== 'boolean' &&
          this.pagination.el &&
          pagination &&
          !pagination.el
        ) {
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
        if (
          this.scrollbar &&
          typeof this.scrollbar !== 'boolean' &&
          this.scrollbar.el &&
          scrollbar &&
          !scrollbar.el
        ) {
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
          typeof this.navigation !== 'boolean' &&
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
    });
  }

  updateSwiper(changedParams: SimpleChanges | any) {
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
    if (!loopedSlides) {
      // ?
      return;
    }

    if (this.loopAdditionalSlides) {
      loopedSlides += this.loopAdditionalSlides;
    }
    if (loopedSlides > this.slides.length) {
      loopedSlides = this.slides.length;
    }
    this.loopedSlides = loopedSlides;
    return loopedSlides;
  }

  updateParameter(key: string, value: any) {
    if (!(this.swiperRef && !this.swiperRef.destroyed)) {
      return;
    }
    const _key = key.replace(/^_/, '');
    const isCurrentParamObj = isObject(this.swiperRef.params[_key]);

    if (Object.keys(this.swiperRef.modules).indexOf(_key) >= 0) {
      const defaultParams = this.swiperRef.modules[_key].params[_key];
      if (isCurrentParamObj) {
        extend(this.swiperRef.params[_key], defaultParams);
      } else {
        this.swiperRef.params[_key] = defaultParams;
      }
    }

    if (isCurrentParamObj && isObject(value)) {
      extend(this.swiperRef.params[_key], value);
    } else {
      this.swiperRef.params[_key] = value;
    }
  }

  setIndex(index: number, speed?: number, silent?: boolean): void {
    if (!this.isSwiperActive) {
      this.initialSlide = index;
      return;
    }
    if (index === this.swiperRef.activeIndex) {
      return;
    }
    this._ngZone.runOutsideAngular(() => {
      if (this.loop) {
        this.swiperRef.slideToLoop(index, speed, !silent);
      } else {
        this.swiperRef.slideTo(index, speed, !silent);
      }
    });
  }

  ngOnDestroy() {
    this._ngZone.runOutsideAngular(() => {
      this.swiperRef?.destroy(true, false);
    });
  }
}
