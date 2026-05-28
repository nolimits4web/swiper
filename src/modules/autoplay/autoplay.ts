/* eslint no-underscore-dangle: "off" */
/* eslint no-use-before-define: "off" */
import type { Swiper, SwiperModule } from '../../core/core';

export interface AutoplayOptions {
  /**
   * Delay between transitions (in ms). If this parameter is not specified, auto play will be disabled
   *
   * If you need to specify different delay for specific slides you can do it by using
   * `data-swiper-autoplay` (in ms) attribute on slide.
   *
   * @example
   * ```html
   * <!-- hold this slide for 2 seconds -->
   * <div class="swiper-slide" data-swiper-autoplay="2000">
   * ```
   *
   * @default 3000
   */
  delay?: number;

  /**
   * Enable this parameter and autoplay will be stopped when it reaches last slide (has no effect in loop mode)
   *
   * @default false
   */
  stopOnLastSlide?: boolean;

  /**
   * Set to `false` and autoplay will not be disabled after user interactions (swipes),
   * it will be restarted every time after interaction
   *
   * @default true
   */
  disableOnInteraction?: boolean;

  /**
   * Enables autoplay in reverse direction
   *
   * @default false
   */
  reverseDirection?: boolean;

  /**
   * When enabled autoplay will wait for wrapper transition to continue.
   * Can be disabled in case of using Virtual Translate when your
   * slider may not have transition
   *
   * @default true
   */
  waitForTransition?: boolean;

  /**
   * When enabled autoplay will be paused on pointer (mouse) enter over Swiper container.
   *
   * @default false
   */
  pauseOnMouseEnter?: boolean;

  /**
   * !INTERNAL Toggled by the runtime so other modules can read whether autoplay
   * is registered without re-deriving from the boolean/object union.
   */
  enabled?: boolean;
}

export interface AutoplayMethods {
  /**
   * Whether autoplay enabled and running
   */
  running: boolean;

  /**
   * Whether autoplay is paused
   */
  paused: boolean;

  /**
   * If autoplay is paused, it contains time left (in ms) before transition to next slide
   */
  timeLeft: number;

  /**
   * Pause autoplay
   */
  pause(): void;

  /**
   * Resume autoplay
   */
  resume(): void;

  /**
   * Start autoplay
   */
  start(): boolean;

  /**
   * Stop autoplay
   */
  stop(): boolean;
}

export interface AutoplayEvents {
  /**
   * Event will be fired in when autoplay started
   */
  autoplayStart: (swiper: Swiper) => void;
  /**
   * Event will be fired when autoplay stopped
   */
  autoplayStop: (swiper: Swiper) => void;
  /**
   * Event will be fired on autoplay pause
   */
  autoplayPause: (swiper: Swiper) => void;
  /**
   * Event will be fired on autoplay resume
   */
  autoplayResume: (swiper: Swiper) => void;
  /**
   * Event triggers continuously while autoplay is enabled. It contains time left (in ms) before transition to next slide and percentage of that time related to autoplay delay
   */
  autoplayTimeLeft: (swiper: Swiper, timeLeft: number, percentage: number) => void;
  /**
   * Event will be fired when slide changed with autoplay
   */
  autoplay: (swiper: Swiper) => void;
}

// All AutoplayOptions fields are optional in the public type, but extendParams
// fills them in at module init time. Use this view internally to access defaults
// without proliferating `!` non-null assertions through the module.
type AutoplayParamsRuntime = Required<AutoplayOptions>;

declare module '../../core/core' {
  interface Swiper {
    autoplay: AutoplayMethods;
  }
  interface SwiperOptions {
    /**
     * Object with autoplay parameters or boolean `true` to enable with default settings
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   autoplay: {
     *     delay: 5000,
     *   },
     * });
     * ```
     */
    autoplay?: AutoplayOptions | boolean;
  }
  interface SwiperParams {
    autoplay?: AutoplayOptions;
  }
  interface SwiperEvents extends AutoplayEvents {}
}

const Autoplay: SwiperModule = ({ swiper, extendParams, on, emit, params }) => {
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0,
  } as AutoplayMethods;

  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false,
    },
  });

  function getParams(): AutoplayParamsRuntime {
    return swiper.params.autoplay as AutoplayParamsRuntime;
  }

  // params here is the user-supplied passedParams; extendParams hasn't yet
  // merged the defaults into swiper.params.autoplay at this point.
  const initialAutoplayDelay =
    typeof params.autoplay === 'object' &&
    params.autoplay &&
    typeof params.autoplay.delay === 'number'
      ? params.autoplay.delay
      : 3000;

  let timeout: ReturnType<typeof setTimeout> | undefined;
  let raf: number | undefined;
  let autoplayDelayTotal = initialAutoplayDelay;
  let autoplayDelayCurrent = initialAutoplayDelay;
  let autoplayTimeLeft = 0;
  let autoplayStartTime = new Date().getTime();
  let wasPaused = false;
  let isTouched = false;
  let pausedByTouch = false;
  let touchStartTimeout: ReturnType<typeof setTimeout> | undefined;
  let slideChanged = false;
  let pausedByInteraction = false;
  let pausedByPointerEnter = false;

  function onTransitionEnd(e: Event): void {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
    if (e.target !== swiper.wrapperEl) return;

    swiper.wrapperEl.removeEventListener('transitionend', onTransitionEnd);
    const detail = (e as CustomEvent<{ bySwiperTouchMove?: boolean }>).detail;
    if (pausedByPointerEnter || (detail && detail.bySwiperTouchMove)) {
      return;
    }
    resume();
  }

  const calcTimeLeft = (): void => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    const timeLeft = swiper.autoplay.paused
      ? autoplayTimeLeft
      : autoplayStartTime + autoplayDelayCurrent - new Date().getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit('autoplayTimeLeft', timeLeft, timeLeft / autoplayDelayTotal);
    raf = requestAnimationFrame(() => {
      calcTimeLeft();
    });
  };

  const getSlideDelay = (): number | undefined => {
    let activeSlideEl: HTMLElement | undefined;
    const virtualEnabled = !!(swiper.params.virtual as { enabled?: boolean } | undefined)?.enabled;
    if (swiper.virtual && virtualEnabled) {
      activeSlideEl = swiper.slides.find((slideEl) =>
        slideEl.classList.contains('swiper-slide-active'),
      );
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl) return undefined;
    const attr = activeSlideEl.getAttribute('data-swiper-autoplay');
    if (attr == null) return undefined;
    return parseInt(attr, 10);
  };

  const getTotalDelay = (): number => {
    let totalDelay = getParams().delay;
    const currentSlideDelay = getSlideDelay();
    if (
      typeof currentSlideDelay === 'number' &&
      !Number.isNaN(currentSlideDelay) &&
      currentSlideDelay > 0
    ) {
      totalDelay = currentSlideDelay;
    }
    return totalDelay;
  };

  const run = (delayForce?: number): number => {
    if (swiper.destroyed || !swiper.autoplay.running) return 0;
    if (raf !== undefined) cancelAnimationFrame(raf);
    calcTimeLeft();

    let delay = delayForce;
    if (typeof delay === 'undefined') {
      delay = getTotalDelay();
      autoplayDelayTotal = delay;
      autoplayDelayCurrent = delay;
    }

    autoplayTimeLeft = delay;
    const speed = swiper.params.speed;
    const proceed = (): void => {
      if (!swiper || swiper.destroyed) return;
      const autoplayParams = getParams();
      if (autoplayParams.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit('autoplay');
        } else if (!autoplayParams.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit('autoplay');
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit('autoplay');
        } else if (!autoplayParams.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit('autoplay');
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = new Date().getTime();
        requestAnimationFrame(() => {
          run();
        });
      }
    };
    if (delay > 0) {
      if (timeout !== undefined) clearTimeout(timeout);
      timeout = setTimeout(() => {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(() => {
        proceed();
      });
    }

    // eslint-disable-next-line
    return delay;
  };

  const start = (): boolean => {
    autoplayStartTime = new Date().getTime();
    swiper.autoplay.running = true;
    run();
    emit('autoplayStart');
    return true;
  };

  const stop = (): boolean => {
    swiper.autoplay.running = false;
    if (timeout !== undefined) clearTimeout(timeout);
    if (raf !== undefined) cancelAnimationFrame(raf);
    emit('autoplayStop');
    return true;
  };

  const pause = (internal?: boolean, reset?: boolean): void => {
    if (swiper.destroyed || !swiper.autoplay.running) return;

    if (timeout !== undefined) clearTimeout(timeout);
    if (!internal) {
      pausedByInteraction = true;
    }

    const proceed = (): void => {
      emit('autoplayPause');
      if (getParams().waitForTransition) {
        swiper.wrapperEl.addEventListener('transitionend', onTransitionEnd);
      } else {
        resume();
      }
    };

    swiper.autoplay.paused = true;
    if (reset) {
      slideChanged = false;
      proceed();
      return;
    }
    const delay = autoplayTimeLeft || getParams().delay;
    autoplayTimeLeft = delay - (new Date().getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
    if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
    proceed();
  };

  const resume = (): void => {
    if (
      (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) ||
      swiper.destroyed ||
      !swiper.autoplay.running
    )
      return;
    autoplayStartTime = new Date().getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit('autoplayResume');
  };

  const onVisibilityChange = (): void => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (document.visibilityState === 'hidden') {
      pausedByInteraction = true;
      pause(true);
    }
    if (document.visibilityState === 'visible') {
      resume();
    }
  };

  const onPointerEnter = (e: PointerEvent): void => {
    if (e.pointerType !== 'mouse') return;
    pausedByInteraction = true;
    pausedByPointerEnter = true;
    if (swiper.animating || swiper.autoplay.paused) return;
    pause(true);
  };

  const onPointerLeave = (e: PointerEvent): void => {
    if (e.pointerType !== 'mouse') return;
    pausedByPointerEnter = false;
    if (swiper.autoplay.paused) {
      resume();
    }
  };

  const attachMouseEvents = (): void => {
    if (getParams().pauseOnMouseEnter) {
      swiper.el.addEventListener('pointerenter', onPointerEnter);
      swiper.el.addEventListener('pointerleave', onPointerLeave);
    }
  };

  const detachMouseEvents = (): void => {
    if (swiper.el && typeof swiper.el !== 'string') {
      swiper.el.removeEventListener('pointerenter', onPointerEnter);
      swiper.el.removeEventListener('pointerleave', onPointerLeave);
    }
  };

  const attachDocumentEvents = (): void => {
    document.addEventListener('visibilitychange', onVisibilityChange);
  };

  const detachDocumentEvents = (): void => {
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };

  on('init', () => {
    if (getParams().enabled) {
      attachMouseEvents();
      attachDocumentEvents();

      start();
    }
  });

  on('destroy', () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });

  on('_freeModeStaticRelease', () => {
    if (pausedByTouch || pausedByInteraction) {
      resume();
    }
  });
  on('_freeModeNoMomentumRelease', () => {
    if (!getParams().disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on('beforeTransitionStart', (_s, _speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (internal || !getParams().disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });

  on('sliderFirstMove', () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;

    if (getParams().disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(() => {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });

  on('touchEnd', () => {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
    if (touchStartTimeout !== undefined) clearTimeout(touchStartTimeout);
    if (timeout !== undefined) clearTimeout(timeout);

    if (getParams().disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }

    if (pausedByTouch && swiper.params.cssMode) resume();
    pausedByTouch = false;
    isTouched = false;
  });

  on('slideChange', () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    slideChanged = true;

    if (swiper.autoplay.paused) {
      autoplayTimeLeft = getTotalDelay();
      autoplayDelayTotal = getTotalDelay();
    }
  });

  Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume,
  });
};

export default Autoplay;
