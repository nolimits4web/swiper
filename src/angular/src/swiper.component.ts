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
  @Input() enabled: SwiperOptions['enabled'];
  @Input() on: SwiperOptions['on'];
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
    console.warn('`[(index)]` prop is deprecated and will be removed in upcoming versions');
    this.setIndex(index);
  }
  @Input()
  set config(val: SwiperOptions) {
    this.updateSwiper(val);
    const { params } = getParams(val);
    Object.assign(this, params);
  }
  @Output('_beforeBreakpoint') s__beforeBreakpoint = new EventEmitter<
    Parameters<SwiperEvents['_beforeBreakpoint']>
  >();

  @Output('_containerClasses') s__containerClasses = new EventEmitter<
    Parameters<SwiperEvents['_containerClasses']>
  >();

  @Output('_slideClass') s__slideClass = new EventEmitter<
    Parameters<SwiperEvents['_slideClass']>
  >();

  @Output('_swiper') s__swiper = new EventEmitter<Parameters<SwiperEvents['_swiper']>>();

  @Output('activeIndexChange') s_activeIndexChange = new EventEmitter<
    Parameters<SwiperEvents['activeIndexChange']>
  >();

  @Output('afterInit') s_afterInit = new EventEmitter<Parameters<SwiperEvents['afterInit']>>();

  @Output('autoplay') s_autoplay = new EventEmitter<Parameters<SwiperEvents['autoplay']>>();

  @Output('autoplayStart') s_autoplayStart = new EventEmitter<
    Parameters<SwiperEvents['autoplayStart']>
  >();

  @Output('autoplayStop') s_autoplayStop = new EventEmitter<
    Parameters<SwiperEvents['autoplayStop']>
  >();

  @Output('beforeDestroy') s_beforeDestroy = new EventEmitter<
    Parameters<SwiperEvents['beforeDestroy']>
  >();

  @Output('beforeInit') s_beforeInit = new EventEmitter<Parameters<SwiperEvents['beforeInit']>>();

  @Output('beforeLoopFix') s_beforeLoopFix = new EventEmitter<
    Parameters<SwiperEvents['beforeLoopFix']>
  >();

  @Output('beforeResize') s_beforeResize = new EventEmitter<
    Parameters<SwiperEvents['beforeResize']>
  >();

  @Output('beforeSlideChangeStart') s_beforeSlideChangeStart = new EventEmitter<
    Parameters<SwiperEvents['beforeSlideChangeStart']>
  >();

  @Output('beforeTransitionStart') s_beforeTransitionStart = new EventEmitter<
    Parameters<SwiperEvents['beforeTransitionStart']>
  >();

  @Output('breakpoint') s_breakpoint = new EventEmitter<Parameters<SwiperEvents['breakpoint']>>();

  @Output('changeDirection') s_changeDirection = new EventEmitter<
    Parameters<SwiperEvents['changeDirection']>
  >();

  @Output('click') s_click = new EventEmitter<Parameters<SwiperEvents['click']>>();

  @Output('doubleTap') s_doubleTap = new EventEmitter<Parameters<SwiperEvents['doubleTap']>>();

  @Output('doubleClick') s_doubleClick = new EventEmitter<
    Parameters<SwiperEvents['doubleClick']>
  >();

  @Output('destroy') s_destroy = new EventEmitter<Parameters<SwiperEvents['destroy']>>();

  @Output('fromEdge') s_fromEdge = new EventEmitter<Parameters<SwiperEvents['fromEdge']>>();

  @Output('hashChange') s_hashChange = new EventEmitter<Parameters<SwiperEvents['hashChange']>>();

  @Output('hashSet') s_hashSet = new EventEmitter<Parameters<SwiperEvents['hashSet']>>();

  @Output('imagesReady') s_imagesReady = new EventEmitter<
    Parameters<SwiperEvents['imagesReady']>
  >();

  @Output('init') s_init = new EventEmitter<Parameters<SwiperEvents['init']>>();

  @Output('keyPress') s_keyPress = new EventEmitter<Parameters<SwiperEvents['keyPress']>>();

  @Output('lazyImageLoad') s_lazyImageLoad = new EventEmitter<
    Parameters<SwiperEvents['lazyImageLoad']>
  >();

  @Output('lazyImageReady') s_lazyImageReady = new EventEmitter<
    Parameters<SwiperEvents['lazyImageReady']>
  >();

  @Output('loopFix') s_loopFix = new EventEmitter<Parameters<SwiperEvents['loopFix']>>();

  @Output('momentumBounce') s_momentumBounce = new EventEmitter<
    Parameters<SwiperEvents['momentumBounce']>
  >();

  @Output('navigationHide') s_navigationHide = new EventEmitter<
    Parameters<SwiperEvents['navigationHide']>
  >();

  @Output('navigationShow') s_navigationShow = new EventEmitter<
    Parameters<SwiperEvents['navigationShow']>
  >();

  @Output('observerUpdate') s_observerUpdate = new EventEmitter<
    Parameters<SwiperEvents['observerUpdate']>
  >();

  @Output('orientationchange') s_orientationchange = new EventEmitter<
    Parameters<SwiperEvents['orientationchange']>
  >();

  @Output('paginationHide') s_paginationHide = new EventEmitter<
    Parameters<SwiperEvents['paginationHide']>
  >();

  @Output('paginationRender') s_paginationRender = new EventEmitter<
    Parameters<SwiperEvents['paginationRender']>
  >();

  @Output('paginationShow') s_paginationShow = new EventEmitter<
    Parameters<SwiperEvents['paginationShow']>
  >();

  @Output('paginationUpdate') s_paginationUpdate = new EventEmitter<
    Parameters<SwiperEvents['paginationUpdate']>
  >();

  @Output('progress') s_progress = new EventEmitter<Parameters<SwiperEvents['progress']>>();

  @Output('reachBeginning') s_reachBeginning = new EventEmitter<
    Parameters<SwiperEvents['reachBeginning']>
  >();

  @Output('reachEnd') s_reachEnd = new EventEmitter<Parameters<SwiperEvents['reachEnd']>>();

  @Output('realIndexChange') s_realIndexChange = new EventEmitter<
    Parameters<SwiperEvents['realIndexChange']>
  >();

  @Output('resize') s_resize = new EventEmitter<Parameters<SwiperEvents['resize']>>();

  @Output('scroll') s_scroll = new EventEmitter<Parameters<SwiperEvents['scroll']>>();

  @Output('scrollbarDragEnd') s_scrollbarDragEnd = new EventEmitter<
    Parameters<SwiperEvents['scrollbarDragEnd']>
  >();

  @Output('scrollbarDragMove') s_scrollbarDragMove = new EventEmitter<
    Parameters<SwiperEvents['scrollbarDragMove']>
  >();

  @Output('scrollbarDragStart') s_scrollbarDragStart = new EventEmitter<
    Parameters<SwiperEvents['scrollbarDragStart']>
  >();

  @Output('setTransition') s_setTransition = new EventEmitter<
    Parameters<SwiperEvents['setTransition']>
  >();

  @Output('setTranslate') s_setTranslate = new EventEmitter<
    Parameters<SwiperEvents['setTranslate']>
  >();

  @Output('slideChange') s_slideChange = new EventEmitter<
    Parameters<SwiperEvents['slideChange']>
  >();

  @Output('slideChangeTransitionEnd') s_slideChangeTransitionEnd = new EventEmitter<
    Parameters<SwiperEvents['slideChangeTransitionEnd']>
  >();

  @Output('slideChangeTransitionStart') s_slideChangeTransitionStart = new EventEmitter<
    Parameters<SwiperEvents['slideChangeTransitionStart']>
  >();

  @Output('slideNextTransitionEnd') s_slideNextTransitionEnd = new EventEmitter<
    Parameters<SwiperEvents['slideNextTransitionEnd']>
  >();

  @Output('slideNextTransitionStart') s_slideNextTransitionStart = new EventEmitter<
    Parameters<SwiperEvents['slideNextTransitionStart']>
  >();

  @Output('slidePrevTransitionEnd') s_slidePrevTransitionEnd = new EventEmitter<
    Parameters<SwiperEvents['slidePrevTransitionEnd']>
  >();

  @Output('slidePrevTransitionStart') s_slidePrevTransitionStart = new EventEmitter<
    Parameters<SwiperEvents['slidePrevTransitionStart']>
  >();

  @Output('slideResetTransitionStart') s_slideResetTransitionStart = new EventEmitter<
    Parameters<SwiperEvents['slideResetTransitionStart']>
  >();

  @Output('slideResetTransitionEnd') s_slideResetTransitionEnd = new EventEmitter<
    Parameters<SwiperEvents['slideResetTransitionEnd']>
  >();

  @Output('sliderMove') s_sliderMove = new EventEmitter<Parameters<SwiperEvents['sliderMove']>>();

  @Output('sliderFirstMove') s_sliderFirstMove = new EventEmitter<
    Parameters<SwiperEvents['sliderFirstMove']>
  >();

  @Output('slidesLengthChange') s_slidesLengthChange = new EventEmitter<
    Parameters<SwiperEvents['slidesLengthChange']>
  >();

  @Output('slidesGridLengthChange') s_slidesGridLengthChange = new EventEmitter<
    Parameters<SwiperEvents['slidesGridLengthChange']>
  >();

  @Output('snapGridLengthChange') s_snapGridLengthChange = new EventEmitter<
    Parameters<SwiperEvents['snapGridLengthChange']>
  >();

  @Output('snapIndexChange') s_snapIndexChange = new EventEmitter<
    Parameters<SwiperEvents['snapIndexChange']>
  >();

  @Output('tap') s_tap = new EventEmitter<Parameters<SwiperEvents['tap']>>();

  @Output('toEdge') s_toEdge = new EventEmitter<Parameters<SwiperEvents['toEdge']>>();

  @Output('touchEnd') s_touchEnd = new EventEmitter<Parameters<SwiperEvents['touchEnd']>>();

  @Output('touchMove') s_touchMove = new EventEmitter<Parameters<SwiperEvents['touchMove']>>();

  @Output('touchMoveOpposite') s_touchMoveOpposite = new EventEmitter<
    Parameters<SwiperEvents['touchMoveOpposite']>
  >();

  @Output('touchStart') s_touchStart = new EventEmitter<Parameters<SwiperEvents['touchStart']>>();

  @Output('transitionEnd') s_transitionEnd = new EventEmitter<
    Parameters<SwiperEvents['transitionEnd']>
  >();

  @Output('transitionStart') s_transitionStart = new EventEmitter<
    Parameters<SwiperEvents['transitionStart']>
  >();

  @Output('update') s_update = new EventEmitter<Parameters<SwiperEvents['update']>>();

  @Output('zoomChange') s_zoomChange = new EventEmitter<Parameters<SwiperEvents['zoomChange']>>();

  @Output('swiper') s_swiper = new EventEmitter<any>();

  @Output('unlock') s_unlock = new EventEmitter<Parameters<SwiperEvents['unlock']>>();

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
          emitter.emit([...args]);
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
          slides: this.slides,
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
    if (_key === 'enabled') {
      if (value === true) {
        this.swiperRef.enable();
      } else if (value === false) {
        this.swiperRef.disable();
      }
      return;
    }
    if (isCurrentParamObj && isObject(value)) {
      extend(this.swiperRef.params[_key], value);
    } else {
      this.swiperRef.params[_key] = value;
    }
  }
  /**
   * @deprecated will be removed in upcoming versions
   */
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
