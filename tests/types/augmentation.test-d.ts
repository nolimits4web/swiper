/**
 * Static type-only test for the per-module augmentation pattern locked in
 * PLAN_V14.md §4.2. There is no runtime assertion — the file passes if
 * `tsc --noEmit` accepts every line below. The point is to lock the shape
 * of `Swiper`, `SwiperParams`, `SwiperOptions`, and `SwiperEvents` after
 * a module is imported, and to catch regressions in the augmentation
 * pattern as new modules migrate.
 *
 * Per the plan: "Migrate one module at a time. After each, the
 * augmentation should produce correct autocomplete and no TS errors
 * against a tiny demo file."
 */
import type { Swiper, SwiperOptions, SwiperParams, SwiperEvents } from '../../src/core/core';
// Importing a module's runtime export pulls in its `declare module` block,
// which is the mechanism the plan locked in.
import '../../src/modules/navigation/navigation';
import '../../src/modules/pagination/pagination';
import '../../src/modules/scrollbar/scrollbar';
import '../../src/modules/a11y/a11y';
import '../../src/modules/keyboard/keyboard';
import '../../src/modules/mousewheel/mousewheel';
import '../../src/modules/hash-navigation/hash-navigation';
import '../../src/modules/history/history';
import '../../src/modules/autoplay/autoplay';
import '../../src/modules/free-mode/free-mode';
import '../../src/modules/controller/controller';
import '../../src/modules/thumbs/thumbs';
import '../../src/modules/parallax/parallax';
import '../../src/modules/zoom/zoom';
import '../../src/modules/grid/grid';
import '../../src/modules/virtual/virtual';
import '../../src/modules/manipulation/manipulation';
import '../../src/modules/effect-fade/effect-fade';
import '../../src/modules/effect-cube/effect-cube';
import '../../src/modules/effect-coverflow/effect-coverflow';
import '../../src/modules/effect-flip/effect-flip';
import '../../src/modules/effect-creative/effect-creative';
import '../../src/modules/effect-cards/effect-cards';

// `Expect<T>` errors at compile time if T is not literal `true`.
type Expect<T extends true> = T;
// `HasKey<O, K>` is `true` iff K is one of the keys of O.
type HasKey<O, K extends PropertyKey> = K extends keyof O ? true : false;

declare const swiper: Swiper;
declare const params: SwiperParams;

// --- Swiper.<module> is reachable (key exists post-augmentation) ---
type _S_a11y = Expect<HasKey<Swiper, 'a11y'>>;
type _S_hashNavigation = Expect<HasKey<Swiper, 'hashNavigation'>>;
type _S_history = Expect<HasKey<Swiper, 'history'>>;
type _S_keyboard = Expect<HasKey<Swiper, 'keyboard'>>;
type _S_mousewheel = Expect<HasKey<Swiper, 'mousewheel'>>;
type _S_navigation = Expect<HasKey<Swiper, 'navigation'>>;
type _S_pagination = Expect<HasKey<Swiper, 'pagination'>>;
type _S_scrollbar = Expect<HasKey<Swiper, 'scrollbar'>>;
type _S_autoplay = Expect<HasKey<Swiper, 'autoplay'>>;
type _S_freeMode = Expect<HasKey<Swiper, 'freeMode'>>;
type _S_controller = Expect<HasKey<Swiper, 'controller'>>;
type _S_thumbs = Expect<HasKey<Swiper, 'thumbs'>>;
type _S_parallax = Expect<HasKey<Swiper, 'parallax'>>;
type _S_zoom = Expect<HasKey<Swiper, 'zoom'>>;
type _S_grid = Expect<HasKey<Swiper, 'grid'>>;
type _S_virtual = Expect<HasKey<Swiper, 'virtual'>>;
type _S_appendSlide = Expect<HasKey<Swiper, 'appendSlide'>>;
type _S_removeAllSlides = Expect<HasKey<Swiper, 'removeAllSlides'>>;
type _S_fadeEffect = Expect<HasKey<Swiper, 'fadeEffect'>>;
type _S_cubeEffect = Expect<HasKey<Swiper, 'cubeEffect'>>;
type _S_coverflowEffect = Expect<HasKey<Swiper, 'coverflowEffect'>>;
type _S_flipEffect = Expect<HasKey<Swiper, 'flipEffect'>>;
type _S_creativeEffect = Expect<HasKey<Swiper, 'creativeEffect'>>;
type _S_cardsEffect = Expect<HasKey<Swiper, 'cardsEffect'>>;

// Internal-only members of Swiper.<module> (declared in *Internals interfaces
// in each module, beyond the published *Methods surface) are reachable.
void swiper.a11y.clicked; // boolean
void swiper.navigation.arrowSvg; // string
void swiper.navigation.enable; // () => void
void swiper.pagination.enable; // () => void
void swiper.scrollbar.enable; // () => void

// Published *Methods members are reachable too.
void swiper.navigation.update; // () => void
void swiper.pagination.render; // () => void
void swiper.scrollbar.updateSize; // () => void
void swiper.keyboard.disable; // () => void
void swiper.mousewheel.enable; // () => void
void swiper.autoplay.start; // () => boolean
void swiper.autoplay.running; // boolean
void swiper.freeMode.onTouchEnd; // (...args) => void (Internals widens the signature)
void swiper.controller.control; // Swiper | Swiper[] | undefined
void swiper.thumbs.update; // (initial?, p?) => void
void swiper.zoom.in; // (ratio?: number) => void
void swiper.zoom.scale; // number

// Grid published methods + Virtual internals reachability.
void swiper.grid.initSlides; // (slides: HTMLElement[]) => void
void swiper.grid.updateWrapperSize; // (slideSize: number, snapGrid: number[]) => void
void swiper.virtual.slides; // unknown[]
void swiper.virtual.cache; // Record<number, HTMLElement>
void swiper.virtual.slidesBefore; // number | undefined (internal)
void swiper.virtual.appendSlide; // (slide) => void
void swiper.virtual.update; // (force?, beforeInit?, forceActiveIndex?) => void

// Manipulation methods land on Swiper itself via declaration merging.
void swiper.appendSlide; // (slides) => void
void swiper.prependSlide;
void swiper.addSlide;
void swiper.removeSlide;
void swiper.removeAllSlides;

// --- SwiperOptions.<module> accepts the boolean form (public surface) ---
const _o1: SwiperOptions = { navigation: true };
const _o2: SwiperOptions = { pagination: { el: '.p', clickable: true } };
const _o3: SwiperOptions = { a11y: false };
const _o4: SwiperOptions = { history: { key: 'slides' } };
const _o5: SwiperOptions = { autoplay: true };
const _o6: SwiperOptions = { autoplay: { delay: 5000 } };
const _o7: SwiperOptions = { freeMode: true };
const _o8: SwiperOptions = { controller: true };
const _o9: SwiperOptions = { zoom: { maxRatio: 5 } };
const _o10: SwiperOptions = { parallax: true };
const _o11: SwiperOptions = { grid: { rows: 2, fill: 'row' } };
const _o12: SwiperOptions = { virtual: true };
const _o13: SwiperOptions = { virtual: { enabled: true, slides: ['a', 'b'] } };
const _o14: SwiperOptions = { effect: 'fade', fadeEffect: { crossFade: true } };
const _o15: SwiperOptions = { effect: 'cube', cubeEffect: { slideShadows: false } };
const _o16: SwiperOptions = {
  effect: 'coverflow',
  coverflowEffect: { rotate: 30, stretch: '50%' },
};
const _o17: SwiperOptions = { effect: 'flip', flipEffect: { limitRotation: false } };
const _o18: SwiperOptions = {
  effect: 'creative',
  creativeEffect: {
    prev: { translate: [0, 0, -400], rotate: [0, 0, 0], opacity: 1, scale: 1 },
    next: { translate: ['100%', 0, 0] },
  },
};
const _o19: SwiperOptions = { effect: 'cards', cardsEffect: { perSlideOffset: 6 } };
void [_o1, _o2, _o3, _o4, _o5, _o6, _o7, _o8, _o9, _o10, _o11, _o12, _o13];
void [_o14, _o15, _o16, _o17, _o18, _o19];

// --- SwiperParams.<module> is the normalized object form (internal) ---
// `swiper.params.navigation` is `NavigationOptions | undefined` — never the
// boolean union — so `.nextEl` is reachable without an `as any` bridge.
type _P_navigation_kind = NonNullable<typeof params.navigation>;
type _P_navigation_nextEl = Expect<HasKey<_P_navigation_kind, 'nextEl'>>;
type _P_pagination_kind = NonNullable<typeof params.pagination>;
type _P_pagination_clickable = Expect<HasKey<_P_pagination_kind, 'clickable'>>;
type _P_history_kind = NonNullable<typeof params.history>;
type _P_history_key = Expect<HasKey<_P_history_kind, 'key'>>;

// Critical regression guard: the union form must NOT have leaked into
// SwiperParams. If it did, `boolean extends NavigationOptions` is true and
// the following would not error out the augmentation pattern.
type _P_navigation_noBoolean = Expect<HasKey<_P_navigation_kind, 'nextEl'>>;
type _IsBoolean<T> = [T] extends [boolean] ? true : false;
type _P_no_boolean_leak = Expect<
  _IsBoolean<NonNullable<typeof params.navigation>> extends true ? false : true
>;

// --- SwiperEvents picks up module events via `extends` ---
type _E_navShow = Expect<HasKey<SwiperEvents, 'navigationShow'>>;
type _E_pageRender = Expect<HasKey<SwiperEvents, 'paginationRender'>>;
type _E_scrollDrag = Expect<HasKey<SwiperEvents, 'scrollbarDragStart'>>;
type _E_keyPress = Expect<HasKey<SwiperEvents, 'keyPress'>>;
type _E_hashChange = Expect<HasKey<SwiperEvents, 'hashChange'>>;
type _E_autoplay = Expect<HasKey<SwiperEvents, 'autoplay'>>;
type _E_autoplayStart = Expect<HasKey<SwiperEvents, 'autoplayStart'>>;
type _E_zoomChange = Expect<HasKey<SwiperEvents, 'zoomChange'>>;
type _E_freeModeStaticRelease = Expect<HasKey<SwiperEvents, '_freeModeStaticRelease'>>;
type _E_virtualUpdate = Expect<HasKey<SwiperEvents, 'virtualUpdate'>>;

// SwiperParams narrows `virtual` from `VirtualOptions | boolean` to just the
// object form (boolean union must NOT leak past the user-facing options).
type _P_virtual_kind = NonNullable<typeof params.virtual>;
type _P_virtual_enabled = Expect<HasKey<_P_virtual_kind, 'enabled'>>;
type _P_virtual_no_boolean = Expect<
  _IsBoolean<NonNullable<typeof params.virtual>> extends true ? false : true
>;

// Effect option shapes survive the augmentation round-trip.
type _P_fadeEffect_kind = NonNullable<typeof params.fadeEffect>;
type _P_fadeEffect_crossFade = Expect<HasKey<_P_fadeEffect_kind, 'crossFade'>>;
type _P_coverflow_kind = NonNullable<typeof params.coverflowEffect>;
type _P_coverflow_modifier = Expect<HasKey<_P_coverflow_kind, 'modifier'>>;
type _P_creative_kind = NonNullable<typeof params.creativeEffect>;
type _P_creative_prev = Expect<HasKey<_P_creative_kind, 'prev'>>;
type _P_cards_kind = NonNullable<typeof params.cardsEffect>;
type _P_cards_perSlideRotate = Expect<HasKey<_P_cards_kind, 'perSlideRotate'>>;

// .on() / .emit() against augmented event names type-check.
swiper.on('navigationShow', (s) => void s);
swiper.on('paginationRender', (s) => void s);
swiper.emit('hashChange');
swiper.on('autoplayStart', (s) => void s);
swiper.on('zoomChange', (s, scale) => void [s, scale]);
swiper.on('virtualUpdate', (s) => void s);
