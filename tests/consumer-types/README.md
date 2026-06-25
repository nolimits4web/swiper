# Consumer type-resolution tests

Verifies that an existing user's TypeScript code keeps compiling against the
**built** package — that the v14 type rewrite introduces **no type-level
breaking changes** — across every public entry point and every `moduleResolution`
mode real users run.

Run it:

```sh
npm run build            # produces dist/ (the package under test)
npm run consumer-types-test
```

It is also part of `npm test`.

## How it works

`run.mjs` links `tests/consumer-types/node_modules/swiper → ../../../dist` (which
**is** the published package root — `npm publish` runs from `dist/`), so the
fixtures import the package by its real public names (`swiper`, `swiper/modules`,
`swiper/react`, `swiper/vue`, `swiper/element`, `swiper/types`, `swiper/css`, …)
and resolve through the actual `exports` / `typesVersions` tables — exactly like
a downstream project. React / Vue / `@types/react` resolve from the repo's own
`node_modules`.

Each fixture is type-checked under three configs that differ **only** in module
resolution:

| Config                       | `moduleResolution`  | Who runs it                           | Resolves via                                |
| ---------------------------- | ------------------- | ------------------------------------- | ------------------------------------------- |
| `tsconfig.classic-node.json` | `node` (node10)     | Legacy / older CRA / ts-node configs  | `typings`, `typesVersions`, sibling `.d.ts` |
| `tsconfig.node16.json`       | `node16`/`nodenext` | Modern Node ESM (TS's recommendation) | `exports` map, **extensions required**      |
| `tsconfig.bundler.json`      | `bundler`           | Vite / webpack / esbuild              | `exports` map                               |

The three modes resolve types very differently, so a package can pass one and
break another — which is why all three are checked.

## Fixtures

- `fixtures/` — entries that must resolve under **all** modes:
  `core.ts`, `types.ts`, `react.tsx`, `vue.ts`, `element.ts`.
- `fixtures-modern/` — `exports`-map-only entries (`css.ts`, `subpaths.ts` for
  `swiper/bundle` + `swiper/core`). These never resolved under classic `node`
  (true in v12 too — bundlers handle CSS, not `tsc`), so they're excluded from
  the classic-`node` config.

Fixtures include a few `// @ts-expect-error` lines on genuinely-wrong usage so
the test also fails if the option/prop types silently degrade to `any`.

Vue note: full SFC template type-checking needs `vue-tsc` (out of scope here —
the Vue playground covers runtime). The Vue fixture checks that the wrapper's
declarations resolve and the composables are shaped correctly.

## Regressions this caught (and the fixes)

1. **`swiper/types` under classic `node`** — v12 shipped `types/index.d.ts`;
   v14 renamed the aggregator to `types/public.d.ts` and only listed it in
   `exports` (which classic resolution ignores). Fix: added a `types` entry to
   `typesVersions` in `src/copy/package.json`.
2. **node16 / nodenext, package-wide** — `tsc` emits declarations with the
   extensionless relative specifiers from the `.ts` sources
   (`export * from '../core/core'`). `node16`/`nodenext` require explicit
   extensions, so consumers silently failed to follow internal re-exports and
   `declare module` augmentations: option/event types collapsed to `any`,
   `swiper/types` lost its named exports, and per-module augmentations
   (`navigation`, `autoplay`, …) never attached. Fix:
   `scripts/fix-dts-extensions.js`, a post-emit build step that appends `.js`
   (which node16 resolves to the sibling `.d.ts`) to every relative specifier.
