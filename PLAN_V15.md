# Swiper v15 — core decomposition + deeper bundle wins

> **Status:** planning. **Blocked on v14 shipping.** See [`PLAN_V14.md`](./PLAN_V14.md).
> **Target version:** v15.

This doc captures the work explicitly carved out of v14 because it carries behavioral risk or requires user-visible churn. None of it should start until v14 is on `master` and the TS migration has settled.

---

## 1. Context

After v14, the codebase is TypeScript-native and ~15–25% smaller, but the **core itself** still ships every prototype method (`translate`, `transition`, `loop`, `grabCursor`, etc.) on every Swiper instance, whether the user's options touch them or not. That's the next big lever.

v15 is about pulling those levers without breaking users.

## 2. Goals

1. Make the **core** itself tree-shakeable. Today, importing `Swiper` pulls in the full prototype-mixin set. After v15, an instance that doesn't use loop/grab-cursor/etc. shouldn't carry that code.
2. Reduce minimum bundle (Swiper + 0 modules) by an additional 20–40% beyond v14.
3. Possibly: collapse the dual touch+pointer event path to pointer-only.

## 3. Approach sketch: composition over prototype

The current pattern in `src/core/core.ts` (post-v14):

```ts
const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events,
  breakpoints,
  checkOverflow,
  classes,
};
// ...
Object.keys(prototypes).forEach((p) => Object.assign(Swiper.prototype, prototypes[p]));
```

This guarantees every method is on every instance. Bundler can't drop any of them.

**Sketch of the target shape:**

- Each sub-module exports pure functions taking a `Swiper` instance: `slideNext(swiper, ...)`, `setTranslate(swiper, ...)`, `loopFix(swiper, ...)`.
- The `Swiper` class exposes a small set of public methods. Internally those public methods call the imported functions.
- Methods only needed by certain modules (e.g., `grabCursor`) are imported lazily inside the module that actually uses them, not by the core.

The hard part is the public API: `swiper.slideNext()`, `swiper.update()`, etc. are documented and used everywhere. Two options:

**A. Keep public method surface identical.** `swiper.slideNext()` becomes a thin method that calls the imported `slideNext()` function. Tree-shaking only kicks in for _internal_ helpers (e.g., `getInterpolateFunction`, internal classes/events utilities). Smaller win, zero breakage.

**B. Move some methods from "always on instance" to "imported helper".** Breaking. Probably not worth it.

**Recommendation: A**, plus aggressively splitting _internal_ helpers so the core's own internal call graph can shed code. Measure first — if A alone doesn't move the needle, B isn't worth the breakage.

### 3.1 Spike results — `grab-cursor` (run 2026-05-28, on `v14` pre-merge, reverted)

Ran the §6 step-2 spike early as a throwaway measurement: converted `grab-cursor` from a prototype-mixin group to a closure-style feature `grabCursor(swiper)` that captures `swiper` lexically and `Object.assign`s `setGrabCursor`/`unsetGrabCursor` onto the instance (same contract modules already use), removed it from the `prototypes` object, and installed it unconditionally in the constructor. Build stayed green (type-check, lint, contract 10/10, dist-types). Hard numbers:

| File                         | gzipped before | after    | Δ         |
| ---------------------------- | -------------- | -------- | --------- |
| `shared/swiper-core.min.mjs` | 19,657 B       | 19,632 B | **−25 B** |
| `swiper.min.js` (IIFE core)  | 19,936 B       | 19,935 B | **−1 B**  |
| `swiper-bundle.min.js`       | 43,310 B       | 43,305 B | **−5 B**  |

**Conclusions (these refine §2 and §3):**

1. **The class→closure conversion is NOT a size lever.** ~25 B gzipped per feature; extrapolated across all ~11 core groups ≈ 100–300 B total — noise against a 19.6 KB core. The boilerplate (`const swiper = this`, destructuring) already minifies to ~nothing, and public method names can't be mangled regardless of class vs closure. **Do not frame the decomposition as a size optimization.** Its payoff is DX + maintainability + establishing the composition seam.

2. **Tree-shaking needs the opt-in step, not the closure step.** The spike installs `grabCursor(swiper)` unconditionally → bundler always includes it → zero savings. The bytes in Goal §2 only materialize if `loop`/`grabCursor`/`breakpoints` become **opt-in** (moved to the `modules` array). That is approach **B-lite** and is mildly breaking — `grabCursor: true` / `loop: true` users would need the feature registered. Needs a compat shim (e.g. auto-inject when the corresponding param is set) to stay non-breaking, which itself re-bloats the default bundle. **The size win and the no-break constraint are in direct tension; resolve this before committing.**

3. **Public methods must stay on the prototype.** Moving a method to a per-instance closure makes `Swiper.prototype.<method>` `undefined` and breaks anyone reading or monkey-patching the prototype. The spike confirmed `slideNext` (untouched) stays on the prototype while `setGrabCursor` moved to per-instance. So the core partitions cleanly: **internal helpers → closure-style OK; public API methods → stay on prototype** (this is exactly approach A). Per-instance closures also re-allocate on every `new Swiper()` — fine for a few sliders, a minor memory cost at scale.

**Net:** approach A is the right call for DX, but it alone yields ~nothing in bytes. If size is the priority, the real levers are §4.1 (pointer-only) and the opt-in-feature step above — not the closure refactor.

## 4. Other v15 candidates

### 4.1 Collapse dual touch + pointer event registration

`src/core/events/index.mjs` registers both `touchstart`/`pointerdown` (and move/end variants). Modern Safari/iOS supports Pointer Events fully. Going pointer-only would:

- Delete `onDocumentTouchStart`.
- Simplify `onTouchStart` / `onTouchMove` (no more `e.type === 'touchstart'` branches, no more `targetTouches`/`changedTouches` finding).
- Shed the `touchId` vs `pointerId` reconciliation.

**Risks to validate before committing:**

- iOS WebView (in-app browsers like Instagram, Facebook, TikTok) — does Pointer Events fire correctly under all viewport/scroll modes?
- Android Chrome over `<iframe>` boundaries — edge cases with capture.
- The `passive: false` + `preventDefault()` interaction (for `edgeSwipeDetection`) — pointer events have subtly different cancellation semantics.

Plan: spike one branch that converts to pointer-only, test against every demo on a real iOS device + Android device + iOS WebView (e.g., the SwiperJS demo embedded in Instagram in-app browser). Only ship if visual + interaction parity holds.

### 4.2 Per-module CSS

Today the user imports `swiper/css` and optionally per-effect CSS. Investigate whether more of the core CSS can be split per-module so a navigation-less, pagination-less Swiper pulls less CSS too. Lower priority; design lift bigger than payoff.

### 4.3 Drop `@babel` from devDeps entirely

**Done in v14 (2026-05-28).** All 5 Babel deps + `babel.config.json` removed; `@rollup/plugin-typescript` handles the React JSX transform via `jsx: 'react'`, and `@babel/preset-env` was a no-op at the v14 baseline. Nothing left for v15 here.

### 4.4 Reconsider `Swiper.use([...])` static method

Used to globally register modules. Probably dead in modern usage (everyone passes `modules` to the constructor). Consider deprecating with a console warning in v15.0 and removing in v16. Low priority.

### 4.5 Drag-path compute — forced-layout & O(n)-over-all-slides (investigated 2026-05-28)

Investigated whether the touch/mouse drag path needs a perf intervention. Started from a hypothesis — _move events fire more often than rAF, so batch DOM writes through a per-element rAF queue and apply only the last pending value per frame._ **Measured and audited; the hypothesis is wrong for the v14 baseline, and the queue is rejected.** What the investigation _did_ surface is two real (but bounded, slow-device-only) levers worth a careful v15 look.

**Tooling:** `playground/core/profile.html` (added this session) — generates N slides, toggles `watchSlidesProgress`/`freeMode`/`parallax`/`loop` via query params, and shows a live HUD: median-calibrated display Hz, per-drag avg/worst/dropped frames, per-method self-times (`setTranslate`, `updateProgress`, `updateSlidesProgress`, `updateSlidesClasses`, `updateActiveIndex`, `loopFix`, `recalcSlides`, `updateSlides`, `updateSlidesOffset`, `slideTo`), and a long-task counter. Re-run it to re-measure. Raw event-vs-frame frequency was measured separately with a throwaway console snippet (a passive `pointermove`/`touchmove` capture listener counting events per rAF frame + `getCoalescedEvents().length` per dispatch) — trivial to recreate if needed.

**Measurements (120Hz display, 8.30ms budget):**

- **Input frequency (the original premise):** on a 120Hz touch device, both `pointermove` and `touchmove` fire **≤1 per active frame** (99.6% of active frames had _exactly_ 1; max 2). `getCoalescedEvents()` returned **exactly 1 every time** — the browser isn't even buffering sub-frame samples. Dispatch ran ~85Hz on the 120Hz panel, i.e. input is _slower_ than rAF, not faster. Modern browsers already rAF-align input dispatch; there is nothing to debounce.
- **Steady-state per-event compute** (100 slides + `watchSlidesProgress`, desktop): every instrumented method **≤0.3ms**; drag held **8.33ms avg, 0 dropped**.
- **`loopFix` (loop on):** the no-shift call is 0.2–0.4ms; the **slide-rearrange call (wrapping past an edge) is ~4–5ms** on desktop — a real spike, but it fits inside the 8.3ms budget, so it drops nothing.
- **12× CPU throttle** (pathological — harsher than any real device, and pairs slow-CPU with a fast-refresh budget): avg **~9.5–10.5ms** → ~20% over the 8.3ms budget → ~1 frame in 5 dropped. On the realistic low-tier combo (**60Hz / 16.6ms budget + ~4–6× CPU**) the same work sits comfortably under budget. So today Swiper holds native refresh on any modern device; the pressure is slow-CPU + big-slider + loop, only.

**The two levers (both behavioral-risk → v15, both optional / slow-device-only):**

1. **Window steady-state slide loops to the visible range.** `updateSlidesProgress` and `updateSlidesClasses` each loop **all** slides every frame (each ~0.2–0.3ms desktop → ~2–4ms at 12×; scales with slide count). They could operate on the visible range + a margin instead of the full list. **Risk:** an off-screen slide that legitimately needs a class toggle (or whose `progress` a consumer reads) must not be skipped — `swiper.slides[i].progress` and the visible/fully-visible class contract are public-ish surface. Needs an exact-parity check across effects, `controller`, `parallax`, and virtual.
2. **`loopFix`: skip the slide-_size_ re-measure on a pure reorder.** On a shift, `loopFix` → `recalcSlides()` → `updateSlides()` (100× `getComputedStyle` + `offsetWidth`) → `updateSlidesOffset()` (100× `offsetLeft`) — a full forced-layout sweep. But a pure DOM reorder of the _same_ slides doesn't change their **sizes**, only their **offsets**. Reuse cached sizes and recompute only offsets on the reorder path. **Risk:** `updateSlides` is load-bearing in many contexts; the size cache must be invalidated correctly on real resize/`update()`/breakpoint changes. This is the bigger single spike (~50ms at 12× on a wrap frame), so it's the higher-value of the two on slow hardware.

**Rejected — move-event debounce / rAF write-coalescing queue.** Reasons: (a) input already arrives ≤1/frame (measured), so a queue never reduces the write count — it only defers the write to the next frame, adding up to a full frame of finger-to-pixel latency; (b) `onTouchMove` emits `sliderMove`/`setTranslate`/`progress`/`reachEnd` **synchronously**, in order, with payloads tied to the current translate — deferring the write either desyncs events from the DOM or changes observable event timing/frequency, which is a behavior change (would violate even v14 §8). The cost that _does_ exist is a one-shot forced-layout burst (lever 2) and per-frame O(n) loops (lever 1) — neither is helped by batching. If slow-device drag perf ever becomes a priority, pursue levers 1–2, not a queue.

**Validation before committing either lever:** re-run `playground/core/profile.html` under DevTools CPU throttle (6× and 12×) and at 60Hz, with `count` at 100/300/500, `loop` on, and `watchSlidesProgress` on. Confirm a measurable avg/dropped improvement _and_ exact visual + class parity against the un-optimized build. Don't ship on theory.

## 5. Non-goals for v15

- Custom Element refactor.
- React wrapper structural changes.
- Vue wrapper structural changes (other than dropping Vue 2 if not done in v14).
- Any new features. v15 is purely about size and architecture.

## 6. Sequencing

1. Once v14 is on `master`, take a bundle-size baseline.
2. ~~Spike §3 approach A on a `v15-decomp` branch with one prototype module (suggest `grab-cursor` — small, optional, isolated).~~ **Done — see §3.1.** Verdict: closure conversion gives ~nothing in bytes; it's a DX/seam play, and tree-shaking requires a separate opt-in step that's in tension with the no-break constraint.
3. **Before expanding:** decide whether v15's headline is _size_ or _DX_. If size, lead with §4.1 (pointer-only) + the opt-in-feature step (§3.1 conclusion 2), not the closure refactor. If DX, the closure refactor stands on its own but should be sold as such.
4. Separately spike §4.1 (pointer-only) on its own branch.
5. Merge whichever ships clean. Don't tangle the two.

## 7. Open questions

- Is there a public method that's actually rarely used and could be moved behind a module? (Audit `swiper.*` usage across `demos/`, `playground/`, GitHub issues.) If yes, that's the easiest decomposition win.
- Do we want to formalize an "internal" API in v15 (e.g., underscore-prefixed) to give ourselves room to refactor internals in future majors without it being a breaking change?
- Should we publish bundle-size benchmarks per release going forward, to make the cost of new features visible to contributors?

---

**For a future session picking this up:** v15 work cannot start until v14 ships. When the time comes, start by re-running the bundle-size baseline from §6 step 1 and comparing against the v12 → v14 delta — that tells you whether the v14 wins were enough, or if the §3 work is critical.
