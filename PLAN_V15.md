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
const prototypes = { eventsEmitter, update, translate, transition, slide, loop, grabCursor, events, breakpoints, checkOverflow, classes };
// ...
Object.keys(prototypes).forEach((p) => Object.assign(Swiper.prototype, prototypes[p]));
```

This guarantees every method is on every instance. Bundler can't drop any of them.

**Sketch of the target shape:**

- Each sub-module exports pure functions taking a `Swiper` instance: `slideNext(swiper, ...)`, `setTranslate(swiper, ...)`, `loopFix(swiper, ...)`.
- The `Swiper` class exposes a small set of public methods. Internally those public methods call the imported functions.
- Methods only needed by certain modules (e.g., `grabCursor`) are imported lazily inside the module that actually uses them, not by the core.

The hard part is the public API: `swiper.slideNext()`, `swiper.update()`, etc. are documented and used everywhere. Two options:

**A. Keep public method surface identical.** `swiper.slideNext()` becomes a thin method that calls the imported `slideNext()` function. Tree-shaking only kicks in for *internal* helpers (e.g., `getInterpolateFunction`, internal classes/events utilities). Smaller win, zero breakage.

**B. Move some methods from "always on instance" to "imported helper".** Breaking. Probably not worth it.

**Recommendation: A**, plus aggressively splitting *internal* helpers so the core's own internal call graph can shed code. Measure first — if A alone doesn't move the needle, B isn't worth the breakage.

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

Should already mostly happen in v14 if the React JSX path moves to `tsc` + JSX. v15 confirms the cleanup.

### 4.4 Reconsider `Swiper.use([...])` static method

Used to globally register modules. Probably dead in modern usage (everyone passes `modules` to the constructor). Consider deprecating with a console warning in v15.0 and removing in v16. Low priority.

## 5. Non-goals for v15

- Custom Element refactor.
- React wrapper structural changes.
- Vue wrapper structural changes (other than dropping Vue 2 if not done in v14).
- Any new features. v15 is purely about size and architecture.

## 6. Sequencing

1. Once v14 is on `master`, take a bundle-size baseline.
2. Spike §3 approach A on a `v15-decomp` branch with one prototype module (suggest `grab-cursor` — small, optional, isolated).
3. If size moves and tests pass, expand to the rest.
4. Separately spike §4.1 (pointer-only) on its own branch.
5. Merge whichever ships clean. Don't tangle the two.

## 7. Open questions

- Is there a public method that's actually rarely used and could be moved behind a module? (Audit `swiper.*` usage across `demos/`, `playground/`, GitHub issues.) If yes, that's the easiest decomposition win.
- Do we want to formalize an "internal" API in v15 (e.g., underscore-prefixed) to give ourselves room to refactor internals in future majors without it being a breaking change?
- Should we publish bundle-size benchmarks per release going forward, to make the cost of new features visible to contributors?

---

**For a future session picking this up:** v15 work cannot start until v14 ships. When the time comes, start by re-running the bundle-size baseline from §6 step 1 and comparing against the v12 → v14 delta — that tells you whether the v14 wins were enough, or if the §3 work is critical.
