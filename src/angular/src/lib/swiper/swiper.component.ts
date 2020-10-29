import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
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
import { VirtualOptions } from 'build/types/components/virtual';
import { ZoomOptions } from 'build/types/components/zoom';
import { SwiperEvents } from 'build/types/swiper-events';
import { getParams } from '../get-params';
import { uniqueClasses } from '../utils';
@Component({
  selector: 'swiper, [swiper]',
  templateUrl: './swiper.component.html',
  host: {
    class: 'swiper-container',
  },
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
  @Input() init: Boolean;
  @Input() direction: String;
  @Input() touchEventsTarget: String;
  @Input() initialSlide: Number;
  @Input() speed: Number;
  @Input() cssMode: Boolean;
  @Input() updateOnWindowResize: Boolean;
  @Input() nested: Boolean;
  @Input() width: Number;
  @Input() height: Number;
  @Input() preventInteractionOnTransition: Boolean;
  @Input() userAgent: String;
  @Input() url: String;
  @Input() edgeSwipeDetection: Boolean;
  @Input() edgeSwipeThreshold: Number;
  @Input() freeMode: Boolean;
  @Input() freeModeMomentum: Boolean;
  @Input() freeModeMomentumRatio: Number;
  @Input() freeModeMomentumBounce: Boolean;
  @Input() freeModeMomentumBounceRatio: Number;
  @Input() freeModeMomentumVelocityRatio: Number;
  @Input() freeModeSticky: Boolean;
  @Input() freeModeMinimumVelocity: Number;
  @Input() autoHeight: Boolean;
  @Input() setWrapperSize: Boolean;
  @Input() virtualTranslate: Boolean;
  @Input() effect: String;
  @Input() breakpoints: Object;
  @Input() spaceBetween: Number;
  @Input() slidesPerView: [Number, String];
  @Input() slidesPerColumn: Number;
  @Input() slidesPerColumnFill: String;
  @Input() slidesPerGroup: Number;
  @Input() slidesPerGroupSkip: Number;
  @Input() centeredSlides: Boolean;
  @Input() centeredSlidesBounds: Boolean;
  @Input() slidesOffsetBefore: Number;
  @Input() slidesOffsetAfter: Number;
  @Input() normalizeSlideIndex: Boolean;
  @Input() centerInsufficientSlides: Boolean;
  @Input() watchOverflow: Boolean;
  @Input() roundLengths: Boolean;
  @Input() touchRatio: Number;
  @Input() touchAngle: Number;
  @Input() simulateTouch: Boolean;
  @Input() shortSwipes: Boolean;
  @Input() longSwipes: Boolean;
  @Input() longSwipesRatio: Number;
  @Input() longSwipesMs: Number;
  @Input() followFinger: Boolean;
  @Input() allowTouchMove: Boolean;
  @Input() threshold: Number;
  @Input() touchMoveStopPropagation: Boolean;
  @Input() touchStartPreventDefault: Boolean;
  @Input() touchStartForcePreventDefault: Boolean;
  @Input() touchReleaseOnEdges: Boolean;
  @Input() uniqueNavElements: Boolean;
  @Input() resistance: Boolean;
  @Input() resistanceRatio: Number;
  @Input() watchSlidesProgress: Boolean;
  @Input() watchSlidesVisibility: Boolean;
  @Input() grabCursor: Boolean;
  @Input() preventClicks: Boolean;
  @Input() preventClicksPropagation: Boolean;
  @Input() slideToClickedSlide: Boolean;
  @Input() preloadImages: Boolean;
  @Input() updateOnImagesReady: Boolean;
  @Input() loop: Boolean;
  @Input() loopAdditionalSlides: Number;
  @Input() loopedSlides: Number;
  @Input() loopFillGroupWithBlank: Boolean;
  @Input() loopPreventsSlide: Boolean;
  @Input() allowSlidePrev: Boolean;
  @Input() allowSlideNext: Boolean;
  @Input() swipeHandler: Boolean;
  @Input() noSwiping: Boolean;
  @Input() noSwipingClass: String;
  @Input() noSwipingSelector: String;
  @Input() passiveListeners: Boolean;
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
  @Input() navigation: NavigationOptions | boolean;
  @Input() pagination: PaginationOptions | boolean;
  @Input() parallax: boolean;
  @Input() scrollbar: ScrollbarOptions | boolean;
  @Input() thumbs: ThumbsOptions;
  @Input() virtual: VirtualOptions | boolean;
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

  @ViewChild('prevElRef', { static: false }) prevElRef?: ElementRef;
  @ViewChild('nextElRef', { static: false }) nextElRef?: ElementRef;
  @ViewChild('scrollbarElRef', { static: false }) scrollbarElRef?: ElementRef;
  @ViewChild('paginationElRef', { static: false }) paginationElRef?: ElementRef;
  swiperRef: Swiper;
  constructor(private zone: NgZone, private elementRef: ElementRef) {}
  ngOnInit(): void {}

  get needsScrollbar() {
    return (
      typeof this.scrollbar !== 'undefined' &&
      ((typeof this.scrollbar === 'boolean' && this.scrollbar !== false) ||
        (typeof this.scrollbar !== 'boolean' && typeof this.scrollbar.el === 'undefined'))
    );
  }
  get needsNavigation() {
    return (
      typeof this.navigation !== 'undefined' &&
      ((typeof this.navigation === 'boolean' && this.navigation !== false) ||
        (typeof this.navigation !== 'boolean' &&
          typeof this.navigation.nextEl === 'undefined' &&
          typeof this.navigation.prevEl === 'undefined'))
    );
  }
  get needsPagination() {
    return (
      typeof this.pagination !== 'undefined' &&
      ((typeof this.pagination === 'boolean' && this.pagination !== false) ||
        (typeof this.pagination !== 'boolean' && typeof this.pagination.el === 'undefined'))
    );
  }
  ngAfterViewInit() {
    const { params: swiperParams, passedParams } = getParams(this);
    swiperParams.onAny = (event, ...args) => {
      const emitter = this[`s_${event}`] as EventEmitter<any>;
      emitter.emit(...args);
    };
    this.swiperRef = this.initSwiper(
      {
        el: this.elementRef.nativeElement,
        nextEl: this.nextElRef.nativeElement,
        prevEl: this.prevElRef.nativeElement,
        paginationEl: this.paginationElRef.nativeElement,
        scrollbarEl: this.scrollbarElRef.nativeElement,
      },
      swiperParams,
    );
    this.s_swiper.emit(this.swiperRef);
  }

  initSwiper({ el, nextEl, prevEl, paginationEl, scrollbarEl }, swiperParams: SwiperOptions) {
    if (this.needsNavigation && nextEl && prevEl) {
      if (swiperParams.navigation === true) {
        swiperParams.navigation = {};
      }
      if (swiperParams.navigation !== false) {
        swiperParams.navigation.nextEl = nextEl;
        swiperParams.navigation.prevEl = prevEl;
      }
    }
    if (this.needsPagination && paginationEl) {
      if (swiperParams.pagination === true) {
        swiperParams.pagination = {};
      }
      if (swiperParams.pagination !== false) {
        swiperParams.pagination.el = paginationEl;
      }
    }
    if (this.needsScrollbar && scrollbarEl) {
      if (swiperParams.scrollbar === true) {
        swiperParams.scrollbar = {};
      }
      if (swiperParams.scrollbar !== false) {
        swiperParams.scrollbar.el = scrollbarEl;
      }
    }
    return new Swiper(el, swiperParams);
  }

  ngOnDestroy() {
    this.swiperRef.destroy();
  }

  uniqueClasses(str) {
    uniqueClasses(str);
  }
}
