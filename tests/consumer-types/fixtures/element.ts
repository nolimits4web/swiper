/**
 * Web Component (custom element) consumer surface: `swiper/element` and
 * `swiper/element/bundle`.
 *
 * Verifies the element wrapper is fully typed: `register`, the exported element
 * interfaces, the global `HTMLElementTagNameMap` augmentation (so
 * `document.querySelector('swiper-container')` is typed), the `SwiperOptions`
 * properties on the element, the `.swiper` instance accessor, and the typed
 * `addEventListener` event map.
 */
import { register } from 'swiper/element';
import type { SwiperContainer, SwiperSlide } from 'swiper/element';

register();

// Global augmentation: querySelector resolves to the typed custom element.
const container = document.querySelector('swiper-container');
if (container) {
  // SwiperOptions are exposed as element properties.
  container.slidesPerView = 3;
  container.navigation = true;
  container.pagination = { clickable: true };
  // The live Swiper instance is reachable through `.swiper`.
  void container.swiper.activeIndex;
  container.initialize();
  // Typed event map: the CustomEvent detail is the event's argument tuple.
  container.addEventListener('autoplaytimeleft', (e) => {
    void (e.detail[1] * 1);
  });
}

const slide: SwiperSlide | null = document.querySelector('swiper-slide');
void slide;

// The bundle entry exposes the same `register`.
import { register as registerBundle } from 'swiper/element/bundle';
void registerBundle;

// Keep the named type import referenced.
declare const c: SwiperContainer;
void c;
