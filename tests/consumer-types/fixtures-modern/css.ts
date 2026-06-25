/**
 * CSS side-effect imports.
 *
 * These resolve through the package `exports` map's `types` condition (the
 * `.css.d.ts` shims), so they only type-check under `node16`/`nodenext` and
 * `bundler` resolution. Classic `node` resolution does not read `exports`, so
 * `import 'swiper/css'` never resolved a declaration there — true in v12 as
 * well. Bundlers handle the actual CSS; tsc only needs the shim. This fixture
 * is therefore excluded from the classic-`node` config.
 */
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
