import type { SwiperModuleFn } from '../../core/core';
import { elementTransitionEnd, now } from '../../shared/utils';

export interface FreeModeOptions {
  /**
   * Whether the free mode is enabled
   *
   * @default false
   */
  enabled?: boolean;

  /**
   * If enabled, then slide will keep moving for a while after you release it
   *
   * @default true
   */
  momentum?: boolean;

  /**
   * Higher value produces larger momentum distance after you release slider
   *
   * @default 1
   */
  momentumRatio?: number;

  /**
   * Higher value produces larger momentum velocity after you release slider
   *
   * @default 1
   */
  momentumVelocityRatio?: number;

  /**
   * Set to `false` if you want to disable momentum bounce in free mode
   *
   * @default true
   */
  momentumBounce?: boolean;

  /**
   * Higher value produces larger momentum bounce effect
   *
   * @default 1
   */
  momentumBounceRatio?: number;

  /**
   * Minimum touchmove-velocity required to trigger free mode momentum
   *
   * @default 0.02
   */
  minimumVelocity?: number;

  /**
   * Set to enabled to enable snap to slides positions in free mode
   *
   * @default false
   */
  sticky?: boolean;
}

export interface FreeModeMethods {
  onTouchMove(): void;
  onTouchEnd(): void;
}

export interface FreeModeEvents {}

// Runtime-only signatures attached to swiper.freeMode beyond the published API.
// The published *Methods interface keeps the legacy zero-arg surface; the
// runtime accepts an argument on onTouchEnd and exposes onTouchStart, both of
// which are called internally from core/events.
interface FreeModeInternals {
  onTouchStart(): void;
  onTouchMove(): void;
  onTouchEnd(args: { currentPos: number }): void;
}

// All FreeModeOptions fields are optional in the public type, but extendParams
// fills them in at module init time. Use this view internally to access defaults
// without proliferating `!` non-null assertions through the module.
type FreeModeParamsRuntime = Required<FreeModeOptions>;

declare module '../../core/core' {
  interface Swiper {
    freeMode: FreeModeInternals;
  }
  interface SwiperOptions {
    /**
     * Enables free mode functionality. Object with free mode parameters or boolean `true` to enable with default settings.
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   freeMode: true,
     * });
     *
     * const swiper = new Swiper('.swiper', {
     *   freeMode: {
     *     enabled: true,
     *     sticky: true,
     *   },
     * });
     * ```
     */
    freeMode?: FreeModeOptions | boolean;
  }
  interface SwiperParams {
    freeMode?: FreeModeOptions;
  }
  interface SwiperEvents extends FreeModeEvents {
    /**
     * !INTERNAL: Event will be fired on free mode touch end (release) and there will be no momentum and no bounce
     */
    _freeModeStaticRelease?: () => void;
  }
}

const FreeMode: SwiperModuleFn = ({ swiper, extendParams, emit, once }) => {
  extendParams({
    freeMode: {
      enabled: false,
      momentum: true,
      momentumRatio: 1,
      momentumBounce: true,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: false,
      minimumVelocity: 0.02,
    },
  });

  function getParams(): FreeModeParamsRuntime {
    return swiper.params.freeMode as FreeModeParamsRuntime;
  }

  function onTouchStart(): void {
    if (swiper.params.cssMode) return;
    const translate = swiper.getTranslate();
    swiper.setTranslate(translate);
    swiper.setTransition(0);
    swiper.touchEventsData.velocities.length = 0;
    swiper.freeMode.onTouchEnd({ currentPos: swiper.rtl ? swiper.translate : -swiper.translate });
  }

  function onTouchMove(): void {
    if (swiper.params.cssMode) return;
    const { touchEventsData: data, touches } = swiper;
    // Velocity
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime ?? now(),
      });
    }
    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: now(),
    });
  }

  function onTouchEnd({ currentPos }: { currentPos: number }): void {
    if (swiper.params.cssMode) return;
    const { wrapperEl, rtlTranslate: rtl, snapGrid, touchEventsData: data } = swiper;
    const params = swiper.params;
    const freeModeParams = getParams();
    // Time diff
    const touchEndTime = now();
    const timeDiff = touchEndTime - (data.touchStartTime ?? touchEndTime);

    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }
      return;
    }

    if (freeModeParams.momentum) {
      if (data.velocities.length > 1) {
        const lastMoveEvent = data.velocities.pop()!;
        const velocityEvent = data.velocities.pop()!;

        const distance = lastMoveEvent.position - velocityEvent.position;
        const time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;
        if (Math.abs(swiper.velocity) < freeModeParams.minimumVelocity) {
          swiper.velocity = 0;
        }
        // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.
        if (time > 150 || now() - lastMoveEvent.time > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }
      swiper.velocity *= freeModeParams.momentumVelocityRatio;

      data.velocities.length = 0;
      let momentumDuration = 1000 * freeModeParams.momentumRatio;
      const momentumDistance = swiper.velocity * momentumDuration;

      let newPosition = swiper.translate + momentumDistance;
      if (rtl) newPosition = -newPosition;

      let doBounce = false;
      let afterBouncePosition: number | undefined;
      const bounceAmount = Math.abs(swiper.velocity) * 20 * freeModeParams.momentumBounceRatio;
      let needsLoopFix = false;
      if (newPosition < swiper.maxTranslate()) {
        if (freeModeParams.momentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (newPosition > swiper.minTranslate()) {
        if (freeModeParams.momentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }
          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (freeModeParams.sticky) {
        let nextSlide = 0;
        for (let j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j]! > -newPosition) {
            nextSlide = j;
            break;
          }
        }

        if (
          Math.abs(snapGrid[nextSlide]! - newPosition) <
            Math.abs((snapGrid[nextSlide - 1] ?? snapGrid[nextSlide]!) - newPosition) ||
          swiper.swipeDirection === 'next'
        ) {
          newPosition = snapGrid[nextSlide]!;
        } else {
          newPosition = snapGrid[nextSlide - 1]!;
        }
        newPosition = -newPosition;
      }
      if (needsLoopFix) {
        once('transitionEnd', () => {
          swiper.loopFix();
        });
      }
      // Fix duration
      if (swiper.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }
        if (freeModeParams.sticky) {
          // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
          // event, then durations can be 20+ seconds to slide one (or zero!) slides.
          // It's easy to see this when simulating touch with mouse events. To fix this,
          // limit single-slide swipes to the default slide duration. This also has the
          // nice side effect of matching slide speed if the user stopped moving before
          // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
          // For faster swipes, also apply limits (albeit higher ones).
          const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
          const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex]!;
          const speed = params.speed!;
          if (moveDistance < currentSlideSize) {
            momentumDuration = speed;
          } else if (moveDistance < 2 * currentSlideSize) {
            momentumDuration = speed * 1.5;
          } else {
            momentumDuration = speed * 2.5;
          }
        }
      } else if (freeModeParams.sticky) {
        swiper.slideToClosest();
        return;
      }

      if (freeModeParams.momentumBounce && doBounce && afterBouncePosition !== undefined) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        swiper.animating = true;
        elementTransitionEnd(wrapperEl, () => {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
          emit('momentumBounce');
          swiper.setTransition(params.speed!);
          setTimeout(() => {
            swiper.setTranslate(afterBouncePosition!);
            elementTransitionEnd(wrapperEl, () => {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }, 0);
        });
      } else if (swiper.velocity) {
        emit('_freeModeNoMomentumRelease');
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        if (!swiper.animating) {
          swiper.animating = true;
          elementTransitionEnd(wrapperEl, () => {
            if (!swiper || swiper.destroyed) return;
            swiper.transitionEnd();
          });
        }
      } else {
        swiper.updateProgress(newPosition);
      }

      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    } else if (freeModeParams.sticky) {
      swiper.slideToClosest();
      return;
    } else {
      emit('_freeModeNoMomentumRelease');
    }

    if (!freeModeParams.momentum || timeDiff >= params.longSwipesMs!) {
      emit('_freeModeStaticRelease');
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }

  swiper.freeMode = {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

export default FreeMode;
