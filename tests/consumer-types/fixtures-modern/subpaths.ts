/**
 * Additional value entry points that resolve through the `exports` map:
 * `swiper/bundle` and `swiper/core`. Both map to the same `swiper.d.ts` surface
 * as the main `swiper` entry. Like CSS, these are `exports`-only (no
 * `typesVersions` / physical sibling `.d.ts`), so they resolve under
 * `node16`/`bundler` but not classic `node` — matching v12. Excluded from the
 * classic-`node` config.
 */
import SwiperBundle, { Swiper as SwiperBundleNamed } from 'swiper/bundle';
import SwiperCore, { Swiper as SwiperCoreNamed } from 'swiper/core';

new SwiperBundle('.a', { slidesPerView: 1 });
new SwiperCore('.b', { slidesPerView: 1 });
void [SwiperBundleNamed, SwiperCoreNamed];
