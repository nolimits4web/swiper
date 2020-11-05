import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import Swiper, { SwiperOptions } from 'build/core';
import { A11yOptions } from 'build/types/components/a11y';
import { AutoplayOptions } from 'build/types/components/autoplay';
import { ControllerOptions } from 'build/types/components/controller';
import { CoverflowEffectOptions } from 'build/types/components/effect-coverflow';
import { CubeEffectOptions } from 'build/types/components/effect-cube';
import { FadeEffectOptions } from 'build/types/components/effect-fade';
import { FlipEffectOptions } from 'build/types/components/effect-flip';
import { HashNavigationOptions } from 'build/types/components/hash-navigation';
import { HistoryOptions } from 'build/types/components/history';
import { KeyboardOptions } from 'build/types/components/keyboard';
import { LazyOptions } from 'build/types/components/lazy';
import { MousewheelOptions } from 'build/types/components/mousewheel';
import { NavigationOptions } from 'build/types/components/navigation';
import { PaginationOptions } from 'build/types/components/pagination';
import { ScrollbarOptions } from 'build/types/components/scrollbar';
import { ThumbsOptions } from 'build/types/components/thumbs';
import { VirtualData, VirtualOptions } from 'build/types/components/virtual';
import { ZoomOptions } from 'build/types/components/zoom';
import { SwiperEvents } from 'build/types/swiper-events';
import { Observable, of, Subject } from 'rxjs';
import { getParams } from '../get-params';
import { SwiperSlideComponent } from '../swiper-slide/swiper-slide.component';
import {
  extend,
  isObject,
  uniqueClasses,
  coerceBooleanProperty,
  setProperty,
  ignoreNgOnChanges,
} from '../utils';
@Component({
  selector: 'swiper, [swiper]',
  templateUrl: './swiper.component.html',
  host: {
    class: 'swiper-container',
  },
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
  @Input() touchEventsTarget: String;
  @Input() initialSlide: Number;
  @Input() speed: Number;
  @Input() cssMode: boolean;
  @Input() updateOnWindowResize: boolean;
  @Input() nested: boolean;
  @Input() width: Number;
  @Input() height: Number;
  @Input() preventInteractionOnTransition: boolean;
  @Input() userAgent: String;
  @Input() url: String;
  @Input() edgeSwipeDetection: boolean;
  @Input() edgeSwipeThreshold: Number;
  @Input() freeMode: boolean;
  @Input() freeModeMomentum: boolean;
  @Input() freeModeMomentumRatio: Number;
  @Input() freeModeMomentumBounce: boolean;
  @Input() freeModeMomentumBounceRatio: Number;
  @Input() freeModeMomentumVelocityRatio: Number;
  @Input() freeModeSticky: boolean;
  @Input() freeModeMinimumVelocity: Number;
  @Input() autoHeight: boolean;
  @Input() setWrapperSize: boolean;
  @Input() virtualTranslate: boolean;
  @Input() effect: String;
  @Input() breakpoints: Object;
  @Input() spaceBetween: Number;
  @Input() slidesPerView: number | 'auto';
  @Input() slidesPerColumn: Number;
  @Input() slidesPerColumnFill: String;
  @Input() slidesPerGroup: Number;
  @Input() slidesPerGroupSkip: Number;
  @Input() centeredSlides: boolean;
  @Input() centeredSlidesBounds: boolean;
  @Input() slidesOffsetBefore: Number;
  @Input() slidesOffsetAfter: Number;
  @Input() normalizeSlideIndex: boolean;
  @Input() centerInsufficientSlides: boolean;
  @Input() watchOverflow: boolean;
  @Input() roundLengths: boolean;
  @Input() touchRatio: Number;
  @Input() touchAngle: Number;
  @Input() simulateTouch: boolean;
  @Input() shortSwipes: boolean;
  @Input() longSwipes: boolean;
  @Input() longSwipesRatio: Number;
  @Input() longSwipesMs: Number;
  @Input() followFinger: boolean;
  @Input() allowTouchMove: boolean;
  @Input() threshold: Number;
  @Input() touchMoveStopPropagation: boolean;
  @Input() touchStartPreventDefault: boolean;
  @Input() touchStartForcePreventDefault: boolean;
  @Input() touchReleaseOnEdges: boolean;
  @Input() uniqueNavElements: boolean;
  @Input() resistance: boolean;
  @Input() resistanceRatio: Number;
  @Input() watchSlidesProgress: boolean;
  @Input() watchSlidesVisibility: boolean;
  @Input() grabCursor: boolean;
  @Input() preventClicks: boolean;
  @Input() preventClicksPropagation: boolean;
  @Input() slideToClickedSlide: boolean;
  @Input() preloadImages: boolean;
  @Input() updateOnImagesReady: boolean;
  @Input() loop: boolean;
  @Input() loopAdditionalSlides: Number;
  @Input() loopedSlides: Number;
  @Input() loopFillGroupWithBlank: boolean;
  @Input() loopPreventsSlide: boolean;
  @Input() allowSlidePrev: boolean;
  @Input() allowSlideNext: boolean;
  @Input() swipeHandler: boolean;
  @Input() noSwiping: boolean;
  @Input() noSwipingClass: String;
  @Input() noSwipingSelector: String;
  @Input() passiveListeners: boolean;
  @Input() containerModifierClass: String;
  @Input() slideClass: String;
  @Input() slideBlankClass: String;
  @Input() slideActiveClass: String;
  @Input() slideDuplicateActiveClass: String;
  @Input() slideVisibleClass: String;
  @Input() slideDuplicateClass: String;
  @Input() slideNextClass: String;
  @Input() slideDuplicateNextClass: String;
  @Input() slidePrevClass: String;
  @Input() slideDuplicatePrevClass: String;
  @Input() wrapperClass: String;
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
    if (this.navigation !== false) {
      this.navigation.prevEl = el.nativeElement;
    }
    this.updateInitSwiper({ navigation: true });
  }
  @ViewChild('nextElRef', { static: false })
  set nextElRef(el: ElementRef) {
    if (this.navigation !== false) {
      this.navigation.nextEl = el.nativeElement;
    }
    this.updateInitSwiper({ navigation: true });
  }
  @ViewChild('scrollbarElRef', { static: false })
  set scrollbarElRef(el: ElementRef) {
    if (this.scrollbar !== false) {
      this.scrollbar.el = el.nativeElement;
    }
    this.updateInitSwiper({ scrollbar: true });
  }
  @ViewChild('paginationElRef', { static: false })
  set paginationElRef(el: ElementRef) {
    if (this.pagination !== false) {
      this.pagination.el = el.nativeElement;
    }
    this.updateInitSwiper({ pagination: true });
  }
  @ContentChildren(SwiperSlideComponent, { descendants: true }) slides: QueryList<
    SwiperSlideComponent
  >;
  swiperRef: Swiper;
  readonly _activeSlides = new Subject<SwiperSlideComponent[]>();
  get activeSlides() {
    if (this.virtual) {
      return this._activeSlides;
    }
    return of(this.slides?.toArray());
  }
  constructor(
    private zone: NgZone,
    private elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.init !== false) {
      this.initSwiper();
      this._changeDetectorRef.detectChanges();
    }
  }

  initSwiper() {
    const { params: swiperParams, passedParams } = getParams(this);
    swiperParams.onAny = (event, ...args) => {
      const emitter = this[`s_${event}`] as EventEmitter<any>;
      if (emitter) {
        emitter.emit(...args);
      }
    };

    Object.assign(swiperParams.on, {
      // _containerClasses(swiper, classes) {
      //   containerClasses.value = classes;
      // },
      _swiper: (swiper) => {
        this.swiperRef = swiper;
        this.s_swiper.emit(this.swiperRef);
        swiper.loopCreate = () => {};
        swiper.loopDestroy = () => {};
        // if (swiperParams.loop) {
        //   swiper.loopedSlides = calcLoopedSlides(slidesRef.value, swiperParams);
        // }
        if (swiper.virtual && swiper.params.virtual.enabled) {
          swiper.virtual.slides = this.slides.toArray();
          swiper.params.virtual.cache = false;
          swiper.params.virtual.renderExternal = (data) => {
            this.updateVirtualSlides(data);
            // virtualData.value = data;
          };
          swiper.params.virtual.renderExternalUpdate = false;
        }
        this._changeDetectorRef.detectChanges();
      },
    });
    new Swiper(this.elementRef.nativeElement, swiperParams);
  }

  style: any = null;
  private _prevVirtualSlide: VirtualData;
  private updateVirtualSlides(virtualData: VirtualData) {
    if (
      !this.swiperRef ||
      (this._prevVirtualSlide &&
        this._prevVirtualSlide.from === virtualData.from &&
        this._prevVirtualSlide.to === virtualData.to &&
        this._prevVirtualSlide.offset === virtualData.offset)
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
    this._prevVirtualSlide = virtualData;
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

    // if (changedParams.children && virtual && currentParams.virtual.enabled) {
    //   virtual.slides = slides;
    //   virtual.update(true);
    // }

    if (changedParams.allowSlideNext) {
      this.swiperRef.allowSlideNext = this.allowSlideNext;
    }
    if (changedParams.allowSlidePrev) {
      this.swiperRef.allowSlidePrev = this.allowSlidePrev;
    }
    if (changedParams.direction) {
      this.swiperRef.changeDirection(this.direction, false);
    }
    this.swiperRef.update();
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

  uniqueClasses(str) {
    uniqueClasses(str);
  }
}
