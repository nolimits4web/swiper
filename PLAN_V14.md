# Swiper v14 — TypeScript rewrite + bundle slim-down

> **Status:** planning. Not started. Current released version: 12.2.0 (`master`).
> **Target version:** v14 (skipping 13).
> **Companion doc:** [`PLAN_V15.md`](./PLAN_V15.md) — work explicitly deferred from v14.

This is the working plan for the next major release. It is intentionally detailed so a future session can pick up cold without re-litigating decisions already made.

---

## 1. Goals

1. Rewrite the entire `src/` tree from `.mjs` + parallel hand-written `.d.ts` to a single TypeScript source of truth.
2. Eliminate `src/types/` as a separate hand-maintained tree — types are emitted from `.ts` sources.
3. Reduce minified bundle size by removing legacy DOM-compat helpers and feature-detect code that is no longer needed at v14's baseline.
4. Zero changes to the public runtime API. A v12 user upgrading to v14 should change nothing in their code (only their type errors might tighten).

## 2. Non-goals (deferred to v15)

- **Core decomposition.** The current `Object.assign(Swiper.prototype, prototypes)` pattern in `src/core/core.mjs` stays. Tree-shaking the core's own sub-modules (`translate`, `transition`, `loop`, `grabCursor`, etc.) into opt-in pieces is v15. See [`PLAN_V15.md`](./PLAN_V15.md).
- **Generic `Swiper<TModules>` types.** Decided against — see §5.
- **Collapsing the dual touch+pointer event path** into pointer-only. Possible win, but behavior-risky on iOS WebView and worth its own dedicated cycle. Note it here, reconsider in v15.
- **Effect-module refactors.** Already factored out into `swiper-effect-utils`; don't churn them.
- **Framework wrapper API changes.** Migrate them to TS, but keep their public API identical.

## 3. Baseline browsers

**Policy: last 2 years of evergreen browsers.** Concretely (as of 2026-05):

- Chrome / Edge: 110+
- Safari: 16.4+ (iOS 16.4+)
- Firefox: 110+
- No legacy Android WebView, no IE, no pre-16 iOS.

**What this unlocks (use freely, no detection needed):**

- `ResizeObserver`, `MutationObserver`, `IntersectionObserver`
- Pointer Events
- `scroll-behavior: smooth` (drop `support.smoothScroll`)
- `element.scrollIntoView({ behavior })`
- `classList.add/remove(...multi)`
- `Element.closest`, `Element.matches`
- Optional chaining, nullish coalescing in source (no transpile needed for runtime targets)
- `globalThis`

**What still needs runtime detection:**

- `support.touch` — kept, but simplified to a single inline expression (no `DocumentTouch` legacy check).
- `device.ios` / `device.android` — kept. iOS-specific quirks (rubber-band scrolling, momentum, 3D transform glitches) still differ. Simplify the detection — drop the iPad-on-MacIntel screen-size table if Safari on iPadOS now reports correctly under modern Safari, otherwise keep but trim.
- `browser.need3dFix` for iOS WebView — keep. iOS WebView still misrenders certain 3D transforms; this is a real bug, not a vintage one.
- `browser.needPerspectiveFix` (Safari < 16.2) — **delete.** Below baseline.

## 4. TS migration strategy

### 4.1 Build setup

- Replace Babel transpile in `scripts/build.js` with `tsc` (or `rollup-plugin-typescript2`/`@rollup/plugin-typescript`). Verify decision early — Babel handles JSX for the React wrapper today.
- `tsconfig.json` at repo root with:
  - `target: "es2022"` (matches baseline)
  - `module: "esnext"`, `moduleResolution: "bundler"`
  - `strict: true`
  - `declaration: true`, `declarationMap: true`
  - `noUncheckedIndexedAccess: true` (good hygiene for the array-heavy slide code)
- Keep `.mjs` extension on emitted runtime files for ecosystem compat.
- The `dist/` shape (`swiper.mjs`, `swiper-bundle.mjs`, `swiper-element.mjs`, `swiper-react.mjs`, `swiper-vue.mjs` plus their `.d.ts`) must stay byte-for-byte identical in surface. Tests should snapshot the export list.

### 4.2 The module augmentation pattern (locked: option A from discussion)

Decided. Every module declares its own augmentation of the central `Swiper` interface and `SwiperOptions`. Example shape:

```ts
// src/modules/navigation/navigation.ts
import type { Swiper, SwiperOptions, SwiperEvents } from '../../core/swiper';

export interface NavigationOptions {
  /* ... */
}
export interface NavigationMethods {
  /* ... */
}
export interface NavigationEvents {
  navigationHide: (swiper: Swiper) => void;
  navigationShow: (swiper: Swiper) => void;
  // ...
}

declare module '../../core/swiper' {
  interface Swiper {
    navigation: NavigationMethods;
  }
  interface SwiperOptions {
    navigation?: NavigationOptions;
  }
  interface SwiperEvents extends NavigationEvents {}
}

export function Navigation(/* ModuleContext */) {
  /* runtime */
}
```

User-facing code does not change. As long as a user imports `{ Navigation } from 'swiper/modules'` (which they already must, to register at runtime), the augmentation comes with it. Confirmed trade-off: augmentations are global per-process, not per-instance. Acceptable.

### 4.3 Canonical `Swiper` shape

Decision: `Swiper` is declared as both an `interface` and a `class`, in that order, in `src/core/swiper.ts`:

```ts
export interface Swiper {
  /* properties + method signatures */
}
export class Swiper {
  /* runtime — implements the interface */
}
```

This lets module files target the **interface** with `declare module '../../core/swiper' { interface Swiper { ... } }`, which merges cleanly with the class. Without this split, the class declaration would collide with augmentation.

### 4.4 Handling prototype-mixin during the migration

The core's `prototypes` object (lines ~36–49 of `src/core/core.mjs`) merges runtime methods onto `Swiper.prototype`. For v14 we keep the runtime pattern but type it explicitly: each prototype sub-module (`update`, `translate`, etc.) exports an object whose method signatures are added to `interface Swiper` via the same augmentation mechanism. The runtime `Object.assign` stays. This is intentionally a no-op refactor — decomposition is v15.

### 4.5 SSR

Replace `ssr-window` with inline guards. Pattern:

```ts
const isBrowser = typeof document !== 'undefined';
// at the few places that legitimately need window/document, just reference them
// (TS knows the type via lib.dom.d.ts)
```

Audit and delete `getWindow()` / `getDocument()` call sites — there are ~dozens, but most are reflexive. The few that matter are in `get-support`, `get-device`, `get-browser`, and event handlers.

## 5. Why not generic `Swiper<TModules>`

Considered and rejected. Trade-off was: precise per-instance types, at the cost of requiring `as const` on `modules: [...]` at every call site, and far worse error messages once `SwiperOptions` (also module-augmented) flows through the generic. Augmentation matches what the JS ecosystem (Vue plugins, Pinia, Three.js loaders, Fastify) does. Re-evaluate if there's user demand, but not in v14.

## 6. Migration order

Each phase should land as its own PR/commit on a `v14` branch. Build + size snapshot run after each.

**Phase 0 — infra**

- Add `tsconfig.json`, switch build pipeline, set up CI for `tsc --noEmit`.
- Add a public-API contract test: `tests/dist-contract.test.ts` that imports from `dist/` and exercises every public method/property/event name.
- Snapshot current minified bundle sizes. Track per-phase deltas.

**Phase 1 — shared utils**

- `src/shared/utils.mjs` → `utils.ts`. Inline the helpers being deleted (see §7).
- `get-support.ts`, `get-device.ts`, `get-browser.ts` — convert + simplify per §3.
- Delete `ssr-window` dependency.

**Phase 2 — core**

- `src/core/*.mjs` → `.ts`. Declare `interface Swiper` + `class Swiper`. Re-type `params`, `el`, `wrapperEl`, `slides`, the event emitter, `touchEventsData`, etc.
- Validate the augmentation pattern by typing one tiny core sub-module first (e.g., `grab-cursor`).
- Keep `Object.assign(Swiper.prototype, prototypes)` working — just typed.

**Phase 3 — modules (in this order)**

1. Easy state-only modules: `a11y`, `keyboard`, `mousewheel`, `hash-navigation`, `history`.
2. DOM-heavy stable modules: `navigation`, `pagination`, `scrollbar`.
3. Behavior modules: `autoplay`, `free-mode`, `controller`, `thumbs`, `parallax`, `zoom`.
4. Grid/Virtual/Manipulation.
5. Effects: `effect-fade`, `effect-cube`, `effect-coverflow`, `effect-flip`, `effect-creative`, `effect-cards`. Effects share `src/swiper-effect-utils.mjs` — migrate that first.

Migrate one module at a time. After each, the augmentation should produce correct autocomplete and no TS errors against a tiny demo file.

**Phase 4 — framework wrappers**

- `src/react/` → TS + JSX (React types already a devDep).
- `src/vue/` → TS. Trickiest because of Vue's macros around emits/props — may need `defineComponent` shape audit.
- `src/element/` (Custom Element) → TS. Should be a clean translation.

**Phase 5 — cleanup + release**

- Delete `src/types/`. Sources are now canonical.
- Update `package.json` `exports` map if anything shifted.
- Regenerate `CHANGELOG.md`. Note in migration guide: "no source code changes required; types may surface latent issues."

**Phase 6 — tsc declaration emission (close the augmentation gap) — DONE 2026-05-28**

Phase 5 relocated `src/types/*` to the top level but the per-module `.d.ts` files (`src/modules/<name>.d.ts`) still hand-duplicated the `*Options` / `*Methods` / `*Events` interfaces that the runtime `.ts` already exports. They existed because the build only _copied_ `.d.ts` files; it did not emit them from `.ts` sources.

That hand-duplication also masked a real shipping gap: each runtime module's `declare module '../../core/core' { interface SwiperOptions { navigation?: ... } }` block never reached consumers. The runtime `core/core`'s `SwiperOptions` was a separate interface from the public `swiper-options.d.ts`'s `SwiperOptions`, so augmentations landed on the wrong one. Reproduced before the fix as `error TS2353: 'navigation' does not exist in type 'SwiperOptions'` against shipped `dist/` types.

**Resolution: consolidate canonical types into `core/core`**, keep the locked §4.2 augmentation pattern unchanged, and emit declarations via `tsc --emitDeclarationOnly` so users hit the augmented type. The structural choice was between (A) retargeting `declare module` paths in 23 modules to point at the hand-maintained public `.d.ts`, or (B) consolidating type declarations into `core/core` and re-exporting them through thin shims. Picked (B) — single source of truth, modules unchanged.

Done:

- **`src/types/` folder** holds the four type-only files renamed from `.d.ts` to `.ts` so tsc emits them: `options.ts`, `events.ts`, `shared.ts`, `public.ts` (the `swiper/types` aggregator). Keeps `src/` root limited to entry-point `.ts`/`.tsx` + framework-wrapper `.d.ts` + CSS.
- **JSDoc migration**: ~500 lines of `Swiper`-interface JSDoc moved from the deleted `src/swiper.d.ts` into `src/core/core.ts`'s existing `interface Swiper` block and class methods. The runtime signatures (which were more accurate than the hand-maintained ones — `getTranslate(): number` vs the old `getTranslate(): any`) stayed; only the docstrings migrated. `core/core.ts` grew from ~1100 → ~1600 lines.
- **`src/swiper.d.ts` deleted**. tsc emits `dist/swiper.d.ts` from `src/swiper.ts`'s `export { default as Swiper, default } from './core/core'` — a thin re-export that pulls in the canonical (augmented) types.
- **`src/modules/<name>.d.ts` × 23 deleted**. Each module's `*Options`/`*Methods`/`*Events` interfaces are the runtime declarations in `src/modules/<name>/<name>.ts`; tsc emits them to `dist/modules/<name>/<name>.d.ts` with the `declare module '../../core/core'` augmentation block intact.
- **`src/modules.d.ts` deleted**. `dist/modules/index.d.ts` is now generated by `scripts/build-modules.js` alongside the existing `index.mjs` (same module list, parallel `export { default as Navigation } from './navigation/navigation';` lines). Importing from `swiper/modules` loads each module's emitted `.d.ts`, which runs the augmentation block.
- **`SwiperModuleFn` → `SwiperModule` unified**. The two near-duplicate types (`SwiperModule` in `swiper-shared.d.ts`, `SwiperModuleFn` in `core/core.ts`) collapsed into one canonical `SwiperModule` in `src/types/shared.ts`. Project-wide rename across all 30+ runtime files. `core/core.ts` re-exports it for ergonomic `from '../../core/core'` imports.
- **`scripts/emit-types.js`** runs `npx tsc -p ./tsconfig.emit.json` (a standalone config with `emitDeclarationOnly: true`, `outDir: ./dist`, `rootDir: ./src`). Wired into `scripts/build.js` as the first step before `buildModules`.
- **`scripts/build-types.js` trimmed** from ~150 lines to ~125. Dropped the file-copy logic entirely (tsc handles it). Kept only the framework-wrapper substitution markers (`// CORE_EVENTS`, `// MODULES_EVENTS` in `swiper-{react,vue,element}.d.ts`) and the CSS typing shims. Module events are now extracted directly from `src/modules/*/*.ts` source (instead of the deleted per-module `.d.ts`) — more reliable, works in watch mode regardless of emit timing.
- **`package.json` exports updated**: `./modules` → `./modules/index.d.ts` (was `./modules.d.ts`), `./types` → `./types/public.d.ts` (was `./swiper-types.d.ts`).
- **`tests/dist-types/augmentation.test-d.ts`** (+ dedicated `tsconfig.dist-types.json`) asserts that `new Swiper('.x', { navigation: { nextEl: '.n' } })` type-checks against shipped `dist/` types after only `import { Navigation } from 'swiper/modules'`. Wired into `npm test` after `build:prod`. Kept separate from `tests/types/` (which compiles against source) because it depends on the build output existing.

Hand-maintained files that remain in `src/` root:

- Framework wrappers (`swiper-element.d.ts`, `swiper-react.d.ts`, `swiper-vue.d.ts`) — they carry build-time substitution markers that tsc can't template.
- Their paired `.ts`/`.tsx` runtime files.

Verified:

- Augmentation reaches `dist/` consumers (Phase 6's primary goal). The pre-fix `TS2353` shipping-gap repro now type-checks.
- `npm test` green: validate + build:prod + contract-test (10/10) + dist-types-test + bundle-size.
- Bundle size **byte-identical** before vs after Phase 6 (verified by stashing the Phase 6 diff and re-running `bundle-size`; both report `-16985 B (-2.2%) / -2839 B (-1.3%)` vs the Phase 0 baseline). All accumulated savings are from Phases 1–5.

**Babel fully removed (follow-up, 2026-05-28).** Initially scoped out of Phase 6 ("emit step only generates `.d.ts`; runtime still uses Babel"). Revisited and dropped entirely: at the v14 baseline `@babel/preset-env` is a no-op (all targets are full ES2022), and `@babel/preset-react`'s only job — the JSX transform in `src/react/*.tsx` — is now handled by `@rollup/plugin-typescript` with `jsx: 'react'`. Removed `babel.config.json` and all 5 Babel deps (`@babel/cli`, `@babel/core`, `@babel/preset-env`, `@babel/preset-react`, `@rollup/plugin-babel`). Verified: runtime bundles byte-identical, React output marginally smaller (TS emits native `{ ...spread }` instead of Babel's `_extends` helper), zero Babel helpers anywhere in `dist/`, `validate` + contract + dist-types all green.

**Phase 7 — pre-release type-compat hardening (DONE 2026-06-25)**

Goal: prove the v14 type rewrite ships **no type-level breaking changes** vs published v12, across every public entry point and every `moduleResolution` mode real users run.

Built **`tests/consumer-types/`** — a consumer simulation that links `node_modules/swiper → dist/` (the publish root; `npm publish` runs from `dist/`) and type-checks fixtures importing by their real public names (`swiper`, `swiper/modules`, `swiper/react`, `swiper/vue`, `swiper/element`, `swiper/types`, `swiper/css`, `swiper/bundle`) under three configs: classic `node` (node10), `node16`/`nodenext`, and `bundler`. Unlike `tests/dist-types/` (bundler-only, raw `../../dist/...` imports), this exercises the real `exports` / `typesVersions` resolution a downstream project hits. Fixtures carry a few `@ts-expect-error` lines so the test also fails if option/prop types silently degrade to `any`. Wired into `npm test` as `consumer-types-test`. (The Web Component **is** fully typed — `register`, `SwiperContainer`/`SwiperSlide`, the `HTMLElementTagNameMap` global augmentation; the harness exercises it.)

The export _surface_ was byte-identical to v12 (no dropped subpaths), but type _resolution_ had two regressions the bundler-only test could never see:

1. **`swiper/types` under classic `node`.** v12 shipped `types/index.d.ts`; Phase 6 renamed the aggregator to `types/public.d.ts` and listed it only in `exports` (classic resolution ignores `exports`). Fix: added a `types` entry to `typesVersions` in `src/copy/package.json` — restores v12 parity.

2. **node16/nodenext, package-wide.** tsc emits declarations carrying the extensionless relative specifiers from the `.ts` sources (`export * from '../core/core'`, `declare module '../../core/core'`). node16/nodenext require explicit extensions, so consumers silently failed to follow internal re-exports and `declare module` augmentation blocks: option/event types collapsed to `any`, `swiper/types` lost its named re-exports, and per-module augmentations (`navigation`, `autoplay`, …) never attached. v12 was immune because its hand-written `.d.ts` carried `.d.ts` extensions; the Phase 6 switch to tsc emit (extensionless source imports) opened the gap. Fix: **`scripts/fix-dts-extensions.js`**, a post-emit build step (runs last in `scripts/build.js`, after every `.d.ts` is written) that appends `.js` to each relative specifier in `import`/`export … from`, inline `import('…')`, and `declare module '…'`. node16 resolves the `.js` to the sibling `.d.ts`; bundler and classic `node` are unaffected.

3. **`swiper/bundle` module options (added to Phase 7, 2026-06-25).** The bundle build registers every module at runtime, but `exports['./bundle'].types` pointed at the bare `swiper.d.ts` (same as core), so `new Swiper(..., { navigation, pagination, … })` errored even though the modules are live at runtime. v12 didn't hit this — it inlined all module options into one `SwiperOptions`; v14's per-module augmentations only load when `swiper/modules` is imported. Fix: `scripts/build-modules.js` now emits a dedicated `dist/swiper-bundle.d.ts` that side-effect-imports `./modules/index.js` (pulling in every module's `declare module` augmentation) and re-exports `Swiper`; `exports['./bundle'].types` and a new `typesVersions` `bundle` entry point at it. `swiper/core` stays bare by design (no auto-registration; module options require an explicit `swiper/modules` import, same as the main `swiper` entry).

Verified: all three resolution modes type-check cleanly; runtime bundles unaffected (only `.d.ts` + `package.json` `exports`/`typesVersions` changed); full `npm test` green.

**Phase 8 — SSR runtime parity (DONE 2026-06-26)**

Dropping `ssr-window` (§4.5) replaced its mock `window`/`document`/`HTMLElement` objects with inline `typeof` guards — but the guards only landed in the obvious feature-detect spots (`get-support`/`get-device`/`get-browser`, `swiper-element`). The **instantiation path** still carried unguarded global references, so constructing Swiper in a non-DOM env threw where v12 silently no-op'd (the ssr-window mocks had made those references resolve to harmless stubs).

Important scope note: this was **not** a Next.js/React/Vue SSR break. The framework wrappers only call `new Swiper()` inside a mount/layout effect, which never runs server-side — so server rendering just emits static markup and was always fine. The regression only affected _imperatively_ calling `new Swiper(...)` in pure Node (an unusual but previously-safe pattern).

Three unguarded references, all fixed with `typeof` guards (zero runtime cost on the browser path):

1. **`core.ts` constructor** — `document.querySelectorAll(params.el)` in the multi-element branch (hit when `el` is a string). Guarded with `typeof document !== 'undefined' &&`.
2. **`core.ts` `mount()`** — `initialEl instanceof HTMLElement` (`HTMLElement` is an unguarded global) fired on _every_ instantiation since `init: true` is the default. Fixed with an early `if (typeof document === 'undefined') return false;` at the top of `mount()`, which also covers the sibling `document.querySelector`.
3. **`virtual.ts`** — `const tempDOM = document.createElement('div')` ran eagerly at module init (so it threw as soon as Virtual was registered, including via the bundle's auto-registration). Made lazy via a `getTempDOM()` helper. Audited all 23 modules — Virtual was the only one with an init-time DOM reference.

New **`tests/ssr/ssr.test.mjs`** (wired into `npm test` as `ssr-test`, between `consumer-types-test` and `bundle-size`) is the regression guard — the rest of the suite is type-level only and can't catch a runtime SSR throw. It runs in pure Node (asserting `window`/`document` are genuinely undefined) and covers: bare imports; every `new Swiper()` form no-ops gracefully; the bundle-with-all-modules constructor; a per-module loop asserting none touch the DOM at init (`init: false`); React + Vue `renderToString`; and web-component `register()` as a server no-op. No new deps (React/Vue are existing devDeps; `@vue/server-renderer` ships as a hard dependency of `vue`). `.mjs` so it's excluded from `tsc` type-check, matching `dist-contract.test.mjs`.

Verified: full `npm test` green (SSR test 8/8); runtime bundles still net smaller (the guards are tiny and `swiper-core` actually shrank).

## 7. Bundle-size cleanups (locked for v14)

Confidence: H = high (just do it), M = medium (verify with a small spike), L = low (leave a TODO, do in v15).

| #   | Cleanup                                                                                                               | File(s)                                 | Confidence | Notes                                                                                                                                                                                                                                                                                                                                   |
| --- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Remove `ssr-window` dependency                                                                                        | everywhere                              | H          | Replace with `typeof document !== 'undefined'` guards. Deletes one runtime dep entirely.                                                                                                                                                                                                                                                |
| 2   | Drop `support.smoothScroll`                                                                                           | `src/shared/get-support.mjs`            | H          | Universal at baseline.                                                                                                                                                                                                                                                                                                                  |
| 3   | Simplify `support.touch` to inline `'ontouchstart' in window`                                                         | `src/shared/get-support.mjs`            | H          | `DocumentTouch` was removed from browsers years ago. May not even need a separate util — inline at the 2–3 call sites.                                                                                                                                                                                                                  |
| 4   | Delete `browser.needPerspectiveFix` (Safari < 16.2 workaround)                                                        | `src/shared/get-browser.mjs`            | H          | Below baseline. Also lets the file shrink significantly.                                                                                                                                                                                                                                                                                |
| 5   | Keep `browser.need3dFix` for iOS WebView                                                                              | same                                    | —          | Still a real bug on iOS WebView.                                                                                                                                                                                                                                                                                                        |
| 6   | Trim iPad-on-MacIntel screen-size table                                                                               | `src/shared/get-device.mjs`             | M          | Verify whether Safari on modern iPadOS reports correctly now. If yes, delete the 12-entry screen-size array. If not, keep but document why.                                                                                                                                                                                             |
| 7   | Replace custom DOM helpers in `src/shared/utils.mjs`                                                                  | `utils.mjs` (~408 lines)                | H          | `elementChildren` → `[...el.children].filter(c => c.matches(sel))`. `elementOffset` → `getBoundingClientRect()`. `elementIndex` → `[...parent.children].indexOf(el)`. `elementStyle` → inline `getComputedStyle(el).getPropertyValue(prop)`. `elementOuterSize` → `getBoundingClientRect()` + computed margins. Likely halves the file. |
| 8   | Audit `nextTick` / `now` / `extend` / `deleteProps` helpers                                                           | `utils.mjs`                             | M          | `Date.now()` is universal. `Object.assign` covers `extend` for shallow cases. `nextTick` is a `setTimeout(fn, delay)` wrapper — keep or inline depending on call-site count.                                                                                                                                                            |
| 9   | Verify `core/modules/resize` and `core/modules/observer` are thin wrappers over `ResizeObserver` / `MutationObserver` | `src/core/modules/{resize,observer}/`   | M          | Both ~67 lines. Already plausible they're modern; just confirm no dead polyfill paths.                                                                                                                                                                                                                                                  |
| 10  | Collapse dual touch+pointer event registration                                                                        | `src/core/events/index.mjs` lines 19–30 | L          | **Defer to v15.** Currently registers both `touchstart`+`pointerdown` etc. with runtime guards in `onTouchStart`/`onTouchMove`. Pointer-only would shrink three handlers significantly but iOS WebView edge cases need their own investigation cycle.                                                                                   |
| 11  | `process-lazy-preloader` modernization                                                                                | `src/shared/process-lazy-preloader.mjs` | M          | Check if it can use `loading="lazy"` + `IntersectionObserver` natively.                                                                                                                                                                                                                                                                 |
| 12  | Audit `create-shadow.mjs` and `create-element-if-not-defined.mjs`                                                     | `src/shared/`                           | M          | Custom element helpers — may have grown legacy branches.                                                                                                                                                                                                                                                                                |

**Out-of-scope cleanups** (named so future-me doesn't accidentally drag them in):

- Any refactor of the touch event state machine itself.
- Any change to CSS class naming or DOM structure.
- Any change to the public options surface.

## 8. Breaking-change policy

**Zero runtime breaking changes for v14.** This is non-negotiable. Constraints:

- Every option name, default, and shape stays the same.
- Every event name, payload, and timing stays the same.
- Every public method signature stays the same.
- Module imports (`swiper/modules`, `swiper/react`, etc.) resolve identically.

**Type-level breaking changes are allowed but should be minimized.** If a user had `any`-typed access to internals, they may get a new error. Document these in the migration guide.

If during migration we discover a runtime bug that requires a behavior change to fix, file it separately and ship it as a minor on v12 first if possible. Don't tangle bug fixes into the rewrite.

## 9. Testing strategy

- **Contract test** (Phase 0): imports compiled `dist/` and exercises full public API. Should pass on v12 today; should keep passing through every v14 phase.
- **Type tests**: a `tests/types/` directory with `.ts` files that import Swiper + modules and assert that `swiper.navigation.update()` etc. type-check. Use `tsd` or `expect-type`. Critical for validating the augmentation pattern works at the user surface.
- **Consumer type-resolution tests** (Phase 7): `tests/consumer-types/` imports the built package by its public subpath names and type-checks fixtures (core, `swiper/types`, React, Vue, Web Component) under classic `node`, `node16`/`nodenext`, and `bundler`. Catches `exports`/`typesVersions` resolution regressions the bundler-only `dist-types` test misses. Part of `npm test`.
- **SSR runtime test** (Phase 8): `tests/ssr/ssr.test.mjs` runs in pure Node (no DOM) and asserts imports + every `new Swiper()` form + React/Vue `renderToString` + web-component `register()` never throw. The only _runtime_ test in the suite (everything else is type-level); guards the `ssr-window` removal against reintroduced unguarded `document`/`HTMLElement` references. Part of `npm test`.
- **Visual regression**: run the existing `demos/` against v12 dist and v14 dist; diff screenshots. Catches subtle CSS/DOM regressions.
- **No new unit tests required** for the rewrite itself — the goal is no behavior change.

## 10. Phase ordering with rough estimates

The user has flagged that this likely spans multiple sessions. Rough ordering:

1. Phase 0 (infra) — 1 session
2. Phase 1 (shared) — 1 session
3. Phase 2 (core) — 2–3 sessions (largest single piece)
4. Phase 3 (modules) — 1 session per ~5 modules ≈ 5 sessions
5. Phase 4 (wrappers) — 1 session each = 3 sessions
6. Phase 5 (cleanup/release) — 1 session
7. Phase 6 (tsc declaration emission) — 1 session

Realistic total: **~13–16 working sessions.** Keep `v14` branch alive across sessions; never merge to `master` until all phases land.

## 11. Decisions log

Captured so future-me doesn't re-litigate. Each entry: date — decision — reason.

- **2026-05-27** — TS pattern is **declaration merging (option A)**, not generic `Swiper<TModules>`. Reason: better DX at call sites, matches ecosystem conventions.
- **2026-05-27** — Baseline is **last 2 years evergreen**. iOS/Android detection kept but simplified.
- **2026-05-27** — Core decomposition (prototype → composition) is **deferred to v15**. v14 keeps `Object.assign(Swiper.prototype, ...)` intact.
- **2026-05-27** — Skip v13 ("unlucky number"). Next major is v14.
- **2026-05-27** — `ssr-window` is removed in v14. SSR support continues via inline `typeof` guards.
- **2026-05-27** — Phase 6 added. Phase 5's relocated per-module `.d.ts` files duplicate runtime-`.ts` interfaces and silently mask the module-augmentation shipping gap; Phase 6 enables `tsc --emitDeclarationOnly` to make TS sources truly canonical for shipped types.
- **2026-05-28** — Phase 6 close-the-gap strategy is **consolidate, don't retarget**. Module augmentations stay on `declare module '../../core/core'` (per §4.2); the user-facing `Swiper`/`SwiperOptions`/`SwiperEvents` are now re-exported from `core/core` rather than being separate hand-maintained interfaces. Reason: single source of truth, modules unchanged, simpler `dist/` shape. The alternative (retarget 23 modules' `declare module` paths to `'../../swiper-options.d.ts'` etc.) would have preserved more files unchanged at the cost of two parallel `SwiperOptions` identities and per-target augmentation overhead.
- **2026-05-28** — Hand-maintained type-only files moved into **`src/types/`** (`options.ts`, `events.ts`, `shared.ts`, `public.ts`), renamed `.d.ts` → `.ts` so tsc emits them. Keeps `src/` root limited to entry points + framework-wrapper substitution `.d.ts` + CSS. Did NOT split `Swiper`-interface JSDoc out of `core/core.ts` — interface and class belong together; the file growth to ~1600 lines is acceptable.
- **2026-05-28** — `src/modules.d.ts` **eliminated entirely**, replaced by `dist/modules/index.d.ts` generated alongside `dist/modules/index.mjs` in `scripts/build-modules.js` (same module list, parallel re-export lines). Reason: the hand-maintained list duplicates the build config; auto-generation eliminates drift risk.
- **2026-05-28** — `SwiperModuleFn` (internal, in `core/core.ts`) and `SwiperModule` (public, in `swiper-shared.d.ts`) **unified to `SwiperModule`** project-wide. They were structurally identical; the dual naming was historical drift.
- **2026-05-28** — tsc emit strategy is **emit everything to `dist/`, hand-maintained files overwrite after**. `scripts/build-types.js` writes the framework-wrapper substituted `.d.ts` files at the same `dist/swiper-{react,vue,element}.d.ts` paths AFTER tsc emit; later writes win. Simpler than maintaining a tsconfig `exclude` list of wrapper entry files.
- **2026-05-28** — `tests/dist-types/` is a **separate test directory** with its own `tsconfig.dist-types.json`, excluded from the main `tsconfig.json`. Reason: it imports from `dist/` so it must run AFTER `build:prod`; including it in the main type-check would fail on a clean tree.
- **2026-06-25** — Added **Phase 7 consumer type-resolution tests** (`tests/consumer-types/`), checking every public entry point under classic `node` / `node16` / `bundler`. Reason: the existing `dist-types` test only covers `bundler` via raw `dist/` paths and missed two real regressions. Same exclusion rationale as `tests/dist-types/` — its own per-mode tsconfigs, excluded from the main `tsconfig.json`.
- **2026-06-25** — Ship `.d.ts` with **explicit `.js` extensions on relative specifiers**, applied via a post-emit rewrite (`scripts/fix-dts-extensions.js`) rather than changing source import style. Reason: node16/nodenext require extensions; rewriting at emit avoids churning every source import to `.js` and keeps source ergonomic. Also added `types` to `typesVersions` to restore `swiper/types` resolution under classic `node`. Both restore v12 parity; neither touches runtime bundles.
- **2026-06-25** — `swiper/bundle` gets **dedicated augmentation-loading types** (`dist/swiper-bundle.d.ts`, generated in `scripts/build-modules.js`) instead of reusing the bare `swiper.d.ts`. Reason: the bundle auto-registers every module at runtime, so its types must expose module options/events/methods without a `swiper/modules` import — the v14 augmentation split broke that. `swiper/core` deliberately stays bare (it mirrors the main entry's no-auto-register semantics).
- **2026-06-26** — Phase 8 restores **SSR runtime parity** lost when `ssr-window` was removed. The instantiation path (`new Swiper(...)` in pure Node) threw on unguarded `document`/`HTMLElement` globals where v12's ssr-window mocks had made it a silent no-op. Fixed with `typeof` guards in `core.ts` (constructor + `mount()`) and lazy DOM creation in `virtual.ts`. **Framework SSR (Next.js/React/Vue) was never affected** — wrappers instantiate only in client mount effects. Added `tests/ssr/ssr.test.mjs` as the suite's only runtime test, since the type-level tests can't catch a runtime throw. Reason: "didn't throw in Node" is part of the implicit v12 contract; restore it and lock it with a test.

## 12. Open questions (resolve before starting Phase 0)

1. **Build pipeline**: stay on Rollup with `@rollup/plugin-typescript`, or switch to `tsc` + `rollup` two-step? React JSX handling is the main wrinkle. Recommendation: keep Rollup, add `@rollup/plugin-typescript`, drop Babel except for JSX in the React wrapper.
2. **`tsconfig.json` `target`**: confirmed `es2022`? Lets us keep `?.`, `??`, top-level `await` (not used today), class fields. Aligns with the browser baseline.
3. **Module pre-bundle for `swiper/modules`**: today every module is a separate file. With TS we might want to also offer a tree-shake-friendly barrel. Confirm `package.json` `exports` shape stays the same.
4. **Vue version support**: are we Vue 3-only, or does the Vue wrapper still need Vue 2 codepaths? (Currently checking `src/vue/` deferred to Phase 4.)
5. **Custom Element TS**: any decision on whether to ship `.d.ts` for the custom element's attribute names (e.g., for IDE attribute autocomplete in HTML)? Out of scope but worth tracking.

---

**For a future session picking this up:** start by re-reading §3 (baseline), §4.2 (the locked pattern), and §11 (decisions). Then check the current state of `master` against this plan — what's been done, what's next. The phase ordering in §6 is the entry point.
