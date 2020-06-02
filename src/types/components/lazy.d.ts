export interface LazyMethods {
  /**
   * Load/update lazy images based on current slider state (position)
   */
  load(): void;

  /**
   * Force to load lazy images in slide by specified index
   * @param number index number of slide to load lazy images in
   */
  loadInSlide(index: number): void;
}

export interface LazyOptions {
  /** Set to "true" to enable lazy loading for the closest slides images (for previous and next slide images) */
  loadPrevNext?: boolean;
  /** Amount of next/prev slides to preload lazy images in. Can't be less than slidesPerView */
  loadPrevNextAmount?: number;
  /** By default, Swiper will load lazy images after transition to this slide, so you may enable this parameter if you need it to start loading of new image in the beginning of transition */
  loadOnTransitionStart?: boolean;
  /** CSS class name of lazy element */
  elementClass?: string;
  /** CSS class name of lazy loading element */
  loadingClass?: string;
  /** CSS class name of lazy loaded element */
  loadedClass?: string;
  /** CSS class name of lazy preloader */
  preloaderClass?: string;
}
