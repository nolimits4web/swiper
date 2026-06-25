/**
 * `swiper/core` — the bare core entry (same surface as the main `swiper`
 * entry; no modules auto-registered). It resolves through the `exports` map
 * only (no `typesVersions` / sibling `.d.ts`), so node16/bundler resolve it but
 * classic `node` does not — same as v12. Hence this lives in `fixtures-modern/`
 * (excluded from the classic-`node` config).
 *
 * Module options on the bare core require a separate `swiper/modules` import by
 * design; that path is covered by `fixtures/core.ts`. The auto-registering
 * `swiper/bundle` entry — which must accept module options without that import
 * — is covered by `fixtures/bundle.ts`.
 */
import SwiperCore, { Swiper as SwiperCoreNamed } from 'swiper/core';

new SwiperCore('.b', { slidesPerView: 1, spaceBetween: 10 });
void SwiperCoreNamed;
