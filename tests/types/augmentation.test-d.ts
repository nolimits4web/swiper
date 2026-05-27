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

// --- SwiperOptions.<module> accepts the boolean form (public surface) ---
const _o1: SwiperOptions = { navigation: true };
const _o2: SwiperOptions = { pagination: { el: '.p', clickable: true } };
const _o3: SwiperOptions = { a11y: false };
const _o4: SwiperOptions = { history: { key: 'slides' } };
void [_o1, _o2, _o3, _o4];

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

// .on() / .emit() against augmented event names type-check.
swiper.on('navigationShow', (s) => void s);
swiper.on('paginationRender', (s) => void s);
swiper.emit('hashChange');
