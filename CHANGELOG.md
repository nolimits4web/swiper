# Change Log

## [Swiper 4.5.0](https://github.com/nolimits4web/swiper/compare/v4.5.0...v4.5.0) - Released on February 22, 2019
  * Core
    * New `swiper.changeDirection()` method to change direction from horizontal to vertical (and back) dynamically
    * `direction` parameter can be used in breakpoints
  * Virtual Slides
    * `swiper.virtual.appendSlide` now accepts array of slides to add
    * `swiper.virtual.prependSlide` now accepts array of slides to prepend
    * New `swiper.virtual.removeSlide(indexes)` to remove virtual selected slides
    * New `swiper.virtual.removeAllSlides()` to remove all virtual slides
  * Navigation
    * Now it emits `navigationHide` and `navigationShow` events when on nav hide/show
  * Pagination
    * Now it emits `paginationHide` and `paginationShow` events when on pagination hide/show
  * Dom7 updated to latest 2.1.3
    * Fixed issue when `.once` bound event could still be there after unbinding it with `.off`
  * Source
    * Source styles are now available in SCSS in addition to LESS
  * Minor fixes and improvements

## [Swiper 4.4.6](https://github.com/nolimits4web/swiper/compare/v4.4.5...v4.4.6) - Released on December 19, 2018
  * Core
    * Fixed issue with wrong slide size calculation in some cases

## [Swiper 4.4.5](https://github.com/nolimits4web/swiper/compare/v4.4.2...v4.4.5) - Released on December 14, 2018
  * Core
    * New `observeSlideChildren` parameter to enable auto update on slide children update
    * Fixed issue when slide padding was not considered when calculating sizes
    * Fixed issue with wrong touch support detection on Windows Chrome
    * Fixed some issues with wrong slides grid calculation in multi row mode
  * Zoom
    * Now it emits `zoomChange` event with `scale`, `imageEl` and `slideEl` arguments
  * Minor fixes

## [Swiper 4.4.2](https://github.com/nolimits4web/swiper/compare/v4.4.1...v4.4.2) - Released on November 1, 2018
  * New `touchStartForcePreventDefault` parameter to force touch start event prevent default
  * Breakpoints fix when breakpoint keys are strings
  * Fixed issue when draggable scrollbar may not work on desktop Safari
  * Fixed issue with wrong sort of Virtual Slides
  * Minor fixes

## [Swiper 4.4.1](https://github.com/nolimits4web/swiper/compare/v4.4.0...v4.4.1) - Released on September 14, 2018
  * Fixed issue with preventing touchstart event

## [Swiper 4.4.0](https://github.com/nolimits4web/swiper/compare/v4.3.5...v4.4.0) - Released on September 14, 2018
  * Core
    * New `centerInsufficientSlides` parameter to center slides if the amount of slides less than `slidesPerView`
    * New `breakpointsInverse` parameter (boolean), if enabled then it will count breakpoints in reversed direction, e.g. will override parameters if window width is more than specified breakpoint
  * Virtual Slides
    * New `addSlidesBefore` and `addSlidesAfter` parameters to increase amount of pre-rendered slides
  * Thumbs
    * All new "Thumbs" module/component designed to control slider thumbnails, in more logical and correct way than with Controller module.
  * Lots of minor fixes

## [Swiper 4.3.5](https://github.com/nolimits4web/swiper/compare/v4.3.3...v4.3.5) - Released on July 31, 2018
  * Core
    * `iOSEdgeSwipeThreshold` parameter renamed to just `edgeSwipeThreshold`. Old `iOSEdgeSwipeThreshold` name is still supported
    * Improved observer performance if there are many mutations at a time. Thanks to @rayvincent-bsd
  * Controller
    * Fixed issue with wrong auto height resizing
  * Scrollbar
    * Fixed issue when it was using active event listeners instead of passive. Thanks to @nyon
  * Minor fixes

## [Swiper 4.3.3](https://github.com/nolimits4web/swiper/compare/v4.3.2...v4.3.3) - Released on June 5, 2018
  * Core
    * Fixed issue when slidePrev goes to wrong slide #2650
    * Fixed issue when roundLength was not considered for grids calculation #2656
    * Fixed typo in API #2659

## [Swiper 4.3.2](https://github.com/nolimits4web/swiper/compare/v4.3.0...v4.3.2) - Released on June 1, 2018
  * Core
    * Added `addSlide(index, slide)` method to add slide at required position. Thanks to @kochizufan
    * Fixed issue with loop #2647. Thanks to @kochizufan
  * Pagination
    * New `formatFractionCurrent(number)` parameter to format current number in Fraction pagination
    * New `formatFractionTotal(number)` parameter to format total number in Fraction pagination
  * Minor fixes

## [Swiper 4.3.0](https://github.com/nolimits4web/swiper/compare/v4.2.6...v4.3.0) - Released on May 27, 2018
  * Core
    * Fixed issue when `swipeBack` sometimes slides to wrong slide
    * Fixed issue when window resizing can break Coverflow effect layout
    * Fixed issue with wrong detection of `iOSEdgeSwipeDetection`.  Thanks to @langjun
  * Dom7 update to latest v2.0.6:
    * Fixed issue with remove event listeners when they was not added
  * Minor fixes

## [Swiper 4.2.6](https://github.com/nolimits4web/swiper/compare/v4.2.5...v4.2.6) - Released on May 1, 2018
  * `console.log` cleanup

## [Swiper 4.2.5](https://github.com/nolimits4web/swiper/compare/v4.2.2...v4.2.5) - Released on April 29, 2018
  * Core
    * Prevent apply grab cursor when swiper is locked
    * Fixed breakpoint with loop getting wrong realIndex when on init
    * Fixed "transformed" slides sizes calculation that could cause issues in with Coverflow effect
  * Autoplay
    * Fixed issue that can cause memory leak
  * Dom7 update to latest
    *Imporved internal events proxies logic for better memory management
  * Minor fixes

## [Swiper 4.2.2](https://github.com/nolimits4web/swiper/compare/v4.2.0...v4.2.2) - Released on April 1, 2018
  * Core
    * Respect and update breakpoints when calling Swiper's `.update()` method
  * Pagination
    * New `progressbarOpposite` parameter to make pagination progressbar opposite to `direction` parameter, means vertical progressbar for horizontal swiper direction and horizontal progressbar for vertical swiper direction
  * Mousewheel
    * Fixed issue in `loop` + `freeMode` for loop not being set correctly
  * Minor fixes

## [Swiper 4.2.0](https://github.com/nolimits4web/swiper/compare/v4.1.6...v4.2.0) - Released on March 16, 2018
  * Core
    * `swiper.updateAutoHeight(speed)` now supports `speed` parameter to resize swiper wrapper with duration
    * Fixed issues in free mode with `freeModeSticky` not being able to snap to closest snap point
    * New `swiper.slideToClosest()` method to slide to closest snap point when it is somewhere in between
  * A11y (Accessibility)
    * It is now enabled by default (if installed)
  * Controller
    * Fixed RTL issue when vertical swiper controls horizontal one
  * Lazy
    * Fixed issue when lazy loading not always triggered on window resize
  * Minor fixes

## [Swiper 4.1.6](https://github.com/nolimits4web/swiper/compare/v4.1.5...v4.1.6) - Released on February 11, 2018
  * Fixed onTouchMoveOpposite event on touch devices

## [Swiper 4.1.5](https://github.com/nolimits4web/swiper/compare/v4.1.0...v4.1.5) - Released on February 10, 2018
  * Improved touch events support on desktop Windows devices with touch screen
  * Improved "loop fix" when slider is in the free mode
  * New `noSwipingSelector` parameter that can be used instead of `noSwipingClass`
  * New `preventIntercationOnTransition` parameter to prevent interaction during slice change transition
  * New `.slideToLoop` method to be used in loop mode
  * Fixed issue with `slideChange` events being fired when slide wasn't actually changed
  * Scrollbar
    * Now doesn't require to enable `simulateTouch` for desktops when it is `draggable`
  * Keyboard
    * Fixed detection statement whether a swiper is in the viewport
  * Pagination
    * Added new multiple main bullets support for dynamic bullets pagination
  * Zoom
    * Now supports Virtual Slides
  * Minor fixes

## [Swiper 4.1.0](https://github.com/nolimits4web/swiper/compare/v4.0.7...v4.1.0) - Released on January 13, 2018
  * Improved IE 10 support. But it is recommended to use [__proto__ polyfill](https://www.npmjs.com/package/proto-polyfill)
  * Improved touch support for Edge
  * New `watchOverflow` (disabled by default). When enabled Swiper will be disabled and hide navigation buttons on case there are not enough slides for sliding
  * Autoplay
    * New `reverseDirection` to enable autoplay in reverse direction
    * New `waitForTransition` parameter when autoplay will wait for wrapper transition to continue (enabled by default). Can be disabled in case of using Virtual Translate when your slider may not have transition
  * Keyboard
    * New `onlyInViewport` parameter (enabled by default). When enabled it will control sliders that are currently in viewport

## [Swiper 4.0.7](https://github.com/nolimits4web/swiper/compare/v4.0.6...v4.0.7) - Released on November 28, 2017
  * Fixed issue with not working correctly `touchReleaseOnEdges` on iOS
  * Fixed issue with not working allowSlideNext/Prev change on Breakpoints
  * Fixed wrong scrollbar dragging when using custom `dragSize`
  * Minor fixes

## [Swiper 4.0.6](https://github.com/nolimits4web/swiper/compare/v4.0.5...v4.0.6) - Released on November 13, 2017
  * Fixed Coverflow effect issue using with breakpoints
  * `iOSEdgeSwipeDetection` will also be in consideration with right-edge swipe
  * Fixed `freeModeSticky` behavior in RTL mode
  * Swiper now emits `breakpoint` event on breakpoint change
  * Minor fixes

## [Swiper 4.0.5](https://github.com/nolimits4web/swiper/compare/v4.0.3...v4.0.5) - Released on November 7, 2017
  * Fixed issue with not working `noSwiping` parameter
  * Parallax now considers `slidesPerGroup` parameter
  * Zoom: imporved gestures handling
  * Pagination: fixed issues with wrong positioned dynamic-bullets when there are not enough slides
  * Fixed issues with some effects being broken with enabled `breakpoints`
  * Minor fixes

## [Swiper 4.0.3](https://github.com/nolimits4web/swiper/compare/v4.0.2...v4.0.3) - Released on October 27, 2017
  * Fixed Parallax opacity and scale transitions
  * Better compatability with SSR by using dummy `document` object
  * Fixed styles for dynamic pagination buttons in RTL mode
  * Fixed issue with last pagination button not being active with `slidesPerView: 'auto'`
  * Renamed build tasks: `build-dev` -> `build:dev`, `build-prod` -> `build:prod`

## [Swiper 4.0.2](https://github.com/nolimits4web/swiper/compare/v4.0.1...v4.0.2) - Released on October 18, 2017
  * Lazy loading support for Virtual slides
  * Added `beforeResize` event
  * Minor fixes

## [Swiper 4.0.1](https://github.com/nolimits4web/swiper/compare/v4.0.0...v4.0.1) - Released on October 11, 2017
  * Fixed issue with pagination being broken with loop mode
  * Reworked `realIndex` calculation ordering
  * ES-module files renamed (**possible breaking change**):
    * `swiper.module.js` -> `swiper.esm.bundle.js` (exported by default)
    * `swiper.modular.js` -> `swiper.esm.js`
  * Minor fixes

## [Swiper 4.0.0](https://github.com/nolimits4web/swiper/compare/v3.4.2...v4.0.0) - Released on October 4, 2017 🎉
  * New API (check [Documentation](http://idangero.us/swiper/api/))
  * Virtual Slides - new module that keeps in DOM just required amount of slides
  * Source code has been fully rewritten in ES-next syntax
  * Dist package contains additional ES-next modules:
    * `swiper.module.js` - swiper bundle for `import Swiper from 'swiper'`
    * `swiper.modular.js` - modular version for using Swiper with required components only
  * New `scripts/build-config.js` for creating custom Swiper build with required components and custom color theme
  * jQuery version of Swiper has been removed
  * Imporved compatibility with server-side rendering
  * Hundreds of improvements and fixes

## Swiper 4.0.0-beta.4 - Released on September 20, 2017
  * Fixed issue with draggable Scrollbar in RTL layout
  * Minor fixes

## Swiper 4.0.0-beta.3 - Released on September 13, 2017
  * Dom7 update to latest version
  * Small core refactoring to get better results within tree-shaking bundles

## Swiper 4.0.0-beta.2 - Released on September 2, 2017
  * Disable a11y by default
  * Fixed issue with events sharing between multiple swipers
  * Fixed issue with resize handling after destroy
  * Few minor fixes

## Swiper 4.0.0-beta.1 - Released on August 30, 2017
  * Initial 4.0.0 release

## Swiper 3.4.2 - Released on March 10, 2017
  * Fixed an issue with lazy loading callbacks when swiper is destroyed
  * New `onAfterResize` and `onBeforeResize` callbacks
  * New `onKeyPress` callback when keyboard control is used
  * Fixed Chrome+Windows issue with not clickable links that have "title" attribute
  * Minor fixes

## Swiper 3.4.1 - Released on December 13, 2016
  * Fixed Zoom for RTL
  * Improved slideToClickedSlide behavior when loop is enabled
  * Minor fixes

## Swiper 3.4.0 - Released on October 16, 2016
  * **Custom build** available. Now you can create custom swiper build using the folowing modules: effects, lazy-load, scrollbar, controller, hashnav, history, keyboard, mousewheel, parallax, zoom, a11y. Using cli `gulp custom -zoom,effects,lazy-loading`
  * New **zoom** functionality that enables double tap and pinch to zoom slide's inner image:
    * Required slide layout for zoom:
      ```
      <div class="swiper-slide">
        <div class="swiper-zoom-container">
          <img src="path/to/image">
        </div>
      </div>
      ```
    * New zoom parameters:
      * `zoom` - enable zoom functionality
      * `zoomMax` - maximum image zoom multiplier, by default is `3`
      * `zoomMin` - minimum image zoom multiplier, by default is `1`
      * `zoomToggle` - enable/disable zoom-in by slide's double tap
    * `zoomMax` can be also overridden for specific slide by using `data-swiper-zoom` attribute
  * New `swiper.enableTouchControl()` and `swiper.disableTouchControl()` methods to enable disable touch control (it toggles `onlyExternal` parameter)
  * New `swiper.realIndex` property in addition to `swiper.activeIndex` that returns index of active slide considering loop
  * New **History API** with new `history` parameter. It uses history pushState to set active slide URL
  * New `hashnavWatchState` parameter to navigate through slides (when hashnav is enabled) by browser history or by setting directly hash on document location
  * New `replaceState` parameter that work in addition to hashnav or history to replace current url state with the new one instead of adding it to history
  * New methods `s.unsetGrabCursor()` and `s.setGrabCursor()` to enable/disable grab cursor
  * Draggable Scrollbar now works when `simulateTouch:false `
  * New `normalizeSlideIndex` parameter to improve work of controller (see #1766)
  * `lazyLoadingInPrevNextAmount` now works with `slidesPerView: 'auto'`
  * New `passiveListeners` parameter to use passive event listeners to improve scrolling performance on mobile devices. Enabled by default
  * New `freeModeMomentumVelocityRatio` parameter to control moment velocity
  * Now it is possible to specify autoplay delay for every (or specific) slides by using `data-swiper-autoplay` attribute on them
  * Lazy loading now also respects `sizes` responsive images attribute
  * Improved mousewheel cross browser behavior (see #1797)
  * New `mousewheelEventsTarged` parameter (by default 'container') where you can specify mousewheel events target
  * New `onScroll` event/callback that triggers when swiping/scrolling happens with mousewheel
  * New `touchReleaseOnEdges` parameter to release touch events on slider edge position (beginning, end) and allow for further page scrolling
  * Multirow (slidesPerColumn) support for vertical direction, which is in this case becomes multicolumn
  * `paginationBulletRender` now accepts `swiper` instance as a first argument, `paginationBulletRender(index, className)` -> `paginationBulletRender(swiper, index, className)`
  * New "swiper-slide-duplicate-active", "swiper-slide-duplicate-next", "swiper-slide-duplicate-prev" classes that will be added in loop mode to the slides representing duplicated looped slides
  * All css classes are now configurable via new parameters: lazyLoadingClass, notificationClass, containerModifierClass, paginationClickableClass, paginationModifierClass, lazyStatusLoadingClass, lazyStatusLoadedClass, lazyPreloaderClass, notificationClass, preloaderClass, zoomContainerClass, slideDuplicateActiveClass, slideDuplicateNextClass, slideDuplicatePrevClass

## Swiper 3.3.1 - Released on February 7, 2016
  * New `uniqueNavElements` parameter. If enabled (by default) and navigation elements' parameters passed as the string (like `.pagination`) then Swiper will look for such elements through child elements first. Applies for pagination, prev/next buttons and scrollbar
  * New `onPaginationRendered` callback. Will be fired after pagination elements generated and added to DOM
  * New `.reLoop()` method, which combines `.destroyLoop()` + `.createLoop()` methods with additional positioning fixes. Useful to call after you have changed `slidesPerView` parameter, it will dynamically recreate duplicated slides required for loop
  * New `.nextButton` and `.prevButton` properties with Dom7/jQuery element with next/prev button HTML element
  * Fixed not working mousewheel control in IE 11
  * Fixed issue with lazy loading images not being recalculated after window resize
  * Fixed issues when using loop with breakpoints changing `slidesPerView/Group` parameters
  * Numerous minor fixes

## Swiper 3.3.0 - Released on January 10, 2016
  * New 3D Flip effect. Can be enabled with `effect: 'flip' parameter
  * New types of pagination with new parameters:
    * `paginationType` - type of pagination. Can be `'bullets'` (default) or `'fraction'` or `'progress'` or `'custom'`
    * `paginationFractionRender(swiper, currentClass, totalClass)` - custom function to render "fraction" type pagination
    * `paginationProgressRender(swiper, progressbarClass)` - custom function to render "progress" type pagination
    * `paginationCustomRender(swiper, current, total)` - custom function to render "custom" type pagination
  * New `lazyLoadingInPrevNextAmount` parameter allows to lazy load images in specified amount of next/prev slides
  * New `autoplayStopOnLast` parameter (`true` by default) tells to autoplay should it stop on last slide or start from first slide
  * New `onAutoplay(swiper)` callback
  * Minor fixes

## Swiper 3.2.7 - Released on December 7, 2015
  * Fixed issue with using HTMLElements for next/prevButton parameters with breakpoints
  * Fixed issue with not working Auto Height when using Controller

## Swiper 3.2.6 - Released on November 28, 2015
  * Fixed issue in RTL layout using `mousewheelControl`
  * Fixed issue in RTL layout using Parallax

## Swiper 3.2.5 - Released on November 21, 2015
  * New "Auto Height" mode when container/wrapper adopts to the height of currently active slide. Can be enabled with `autoHeight: true` parameter
  * Fixed issue with break points in FireFox
  * Fixed issue with wrong slides position when using effects
  * Fixed issue with none-updated scroll bar after using `setWrapperTranslate`
  * Minor fixes

## Swiper 3.2.0 - Released on November 7, 2015
  * Added responsive breakpoints support using new `breakpoints` parameter. Now you can specify different `slidesPerView` and other similar parameters for different sizes:
    ```js
    slidesPerView: 5,
    spaceBetween: 50,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
    ```

  * New callbacks: `onSlideNextStart`, `onSlideNextEnd`, `onSlidePrevStart`, `onSlidePrevEnd`
  * Added Meteor package `meteor add nolimits4web:swiper`
  * Fixed issue with mouse touchMove/End callbacks firing all the time
  * Fixed issue with mousewheel in Chrome
  * Minor fixes

## Swiper 3.1.7 - Released on October 10, 2015
  * Fixed issue with lazy loading trying to download `undefined`-src images
  * Fixed lazy loading on slides using jQuery version
  * Fixed issue with `slideToClickedSlide` with `loop` and `centeredSlides`
  * Fixed issue with wrong slides fill when number of slides less than `slidesPerView * slidesPerColumn` with `slidesPerColumnFill: 'row'`
  * Minor fixes

## Swiper 3.1.5 - Released on September 28, 2015
  * Added support for images `srcset` with lazy loading using `data-srcset` attribute
  * Fixed new Chrome errors with `WebkitCSSMatrix`
  * Fixed issue with `slideToClickedSlide` with `loop` and `centeredSlides`
  * New `freeModeMinimumVelocity` parameter to set minimum required touch velocity to trigger free mode momentum
  * Ability to make the Scrollbar draggable using new paramaters:
    * `scrollbarDraggable` - (boolean) by default is `false`. Allows to enable draggable scrollbar
    * `scrollbarSnapOnRelease` - (boolean) by default is `false`. Control slider snap on scrollbar release
  * Minor fixes

## Swiper 3.1.2 - Released on August 22, 2015
  * Fixed issues with loop and mousewheel when swiper stopped on last slide
  * Imporved mouse wheel behavior in latest Chrome
  * Fixed issue with `slidesPerView: 'auto'` and enabled `loop:true` mode to set `loopedSlides` to the amount of slides by default (if not specified)
  * New `mousewheelSensitivity: 1` parameter allows to tweak mouse wheel sensitivity
  * Fixed issue with updating swiper when swiping is locked (with `allowSwipeToNext`/`allowSwipeToPrev`)
  * Fixed issue with wrong calculating of "visible" slides with enabled `centeredSlides`
  * CSS fixes for 3D effects
  * New options to release Swiper events for swipe-to-go-back work in iOS UIWebView with two options:
    * `iOSEdgeSwipeDetection` (by default is `false`) - enable ios edge detection and release Swiper events
    * `iOSEdgeSwipeThreshold` (default value is `20`) - area in `px` from left edge of screen to release events
  * Improved source maps
  * Minor fixes

## Swiper 3.1.0 - Released on July 14, 2015
  * Accessibility (a11y)
    * Fixed issue with wrong buttons labels
    * Added support for pagination bullets
    * New accessibility parameter for pagination label `paginationBulletMessage: 'Go to slide {{index}}'`
  * Controler
    * New parameter `controlBy` which can be 'slide' (by default) or 'container'. Defines a way how to control another slider: slide by slide or depending on all slides/container (like before)
    * Now controllers in `controlBy: 'slide'` (default) mode will respect grid of each other
  * Pagination
    * New `paginationElement` parameter defines which HTML tag will be use to represent single pagination bullet. By default it is `span`
  * New `roundLengths` parameter (by default is `false`) to round values of slides width and height to prevent blurry texts on usual resolution screens
  * New `slidesOffsetBefore: 0` and `slidesOffsetAfter: 0` (in px) parameters to add additional slide offset within a container
  * Correct calculation for slides size when use CSS padding on `.swiper-container`
  * Fixed issue with not working onResize handler when swipes are locked
  * Fixed issue with "jumping" effect when you disable `onlyExternal` during touchmove
  * Fixed issue when slider goes to previos slide from last slide after window resize
  * Added new `swiper.jquery.umd.js` version for the environment where both Swiper and jQuery included as modules
  * Minor fixes

## Swiper 3.0.8 - Released on June 14, 2015
  * Fixed issue with wrong active index and callbacks in Fade effect
  * New mousewheel parameters:
    * `mousewheelReleaseOnEdges` - will release mousewheel event and allow page scrolling when swiper is on edge positions (in the beginning or in the end)
    * `mousewheelInvert` - option to invert mousewheel slides
  * Fixed issue with lazy loading in next slides when `slidesPerView` > 1
  * Fixed issue with resistance bounds when swiping is locked
  * Fixed issue with wrong slides order in multi-row mode (when `slidesPerColumn` > 1)
  * Fixed issue with not working keyboard control in RTL mode
  * Fixed issue with nested fade-effect swipers
  * Minor fixes

## Swiper 3.0.7 - Released on April 25, 2015
  * New `width` and `height` parameters to force Swiper size, useful when it is hidden on intialization
  * Better support for "Scroll Container". So now Swiper can be used as a scroll container with one single "scrollable"/"swipeable" slide
  * Added lazy loading for background images with `data-background` attribute on required elements
  * New "Sticky Free Mode" (with `freeModeSticky` parameter) which will snap to slides positions in free mode
  * Fixed issues with lazy loading
  * Fixed slide removing when loop mode is enabled
  * Fixed issues with Autoplay and Fade effect
  * Minor fixes

## Swiper 3.0.6 - Released on March 27, 2015
  * Fixed sometimes wrong slides position when using "Fade" effect
  * `.destroy(deleteInstance, cleanupStyles)` method now has second `cleanupStyles` argument, when passed - all custom styles will be removed from slides, wrapper and container. Useful if you need to destroy Swiper and to init again with new options or in different direction
  * Minor fixes

## Swiper 3.0.5 - Released on March 21, 2015
  * New Keyboard accessibility module to provide foucsable navigation buttons and basic ARIA for screen readers with new parameters:
    * `a11y: false` - enable accessibility
    * `prevSlideMessage: 'Previous slide'` - message for screen readers for previous button
    * `nextSlideMessage: 'Next slide'` - message for screen readers for next button
    * `firstSlideMessage: 'This is the first slide'` - message for screen readers for previous button when swiper is on first slide
    * `lastSlideMessage: 'This is the last slide'` - message for screen readers for next button when swiper is on last slide
  * New Emitter module. It allows to work with callbacks like with events, even adding them after initialization with new methods:
    * `.on(event, handler)` - add event/callback
    * `.off(event, handler)` - remove this event/callback
    * `.once(event, handler)` - add event/callback that will be executed only once
  * Plugins API is back. It allows to write custom Swiper plugins
  * Better support for browser that don't support flexbox layout
  * New parameter `setWrapperSize` (be default it is `false`) to provide better compatibility with browser without flexbox support. Enabled this option and plugin will set width/height on swiper wrapper equal to total size of all slides
  * New `virtualTranslate` parameter. When it is enabled swiper will be operated as usual except it will not move. Useful when you may need to create custom slide transition
  * Added support for multiple Pagination containers
  * Fixed `onLazyImage...` callbacks
  * Fixed issue with not accessible links inside of Slides on Android < 4.4
  * Fixed pagination bullets behavior in loop mode with specified `slidesPerGroup`
  * Fixed issues with clicks on IE 10+ touch devices
  * Fixed issues with Coverflow support on IE 10+
  * Hashnav now will update document hash after transition to prevent browsers UI lags, not in the beginning like before
  * Super basic support for IE 9 with swiper.jquery version. No animation and transitions, but basic stuff like switching slides/pagination/scrollbars works


## Swiper 3.0.4 - Released on March 6, 2015
  * New Images Lazy Load component
    * With new parameters `lazyLoading`, `lazyLoadingInPrevNext`, `lazyLoadingOnTransitionStart` (all disabled by default)
    * With new callbacks `onLazyImageLoad` and `onLazyImageReady`
  * `updateOnImages` ready split into 2 parameters:
    * `preloadImages` (by default is true) - to preload all images on swiper init
    * `updateOnImages` (by default is true) - update swiper when all images loaded
  * Fixed issues with touchmove on fouces form elements
  * New `onObserverUpdate` callback function to be called after updates by ovserver
  * Fixed issue with not working inputs with keyboard control for jQuery version
  * New `paginationBulletRender` parameter that accepts function which allow custom pagination elements layout
  * Hash Navigation will run callback dpending on `runCallbacksOnInit` parameter
  * `watchVisibility` parameter renamed to `watchSlidesVisibility`

## Swiper 3.0.3 - Released on March 1, 2015
  * Fixed issue with not firing onSlideChangeEnd callback after calling .slideTo with
runCallbacks=false
  * Fixed values of isBeginning/isEnd when there is only one slide
  * New `crossFade` option for fade effect
  * Improved support for devices with both touch and mouse inputs, not yet on IE
  * Fixed not correctly working mousewheel and keyobard control in swiper.jquery version
  * New parallax module for transitions with parallax effects on internal elements
  * Improved .update and .onResize methods
  * Minor fixes

## Swiper 3.0.2 - Released on February 22, 2015
  * Fixed issue with keyboard events not cleaned up with Swiper.destroy
  * Encoded inline SVG images for IE support
  * New callbacks
    * onInit (swiper)
    * onTouchMoveOpposite (swiper, e)
  * Fixed free mode momentum in RTL layout
  * `.update` method improved to fully cover what `onResize` do for full and correct update
  * Exposed `swiper.touches` object with the following properties: `startX`, `startY`, `currentX`, `currentY`, `diff`
  * New methods to remove slides
    * `.removeSlide(index)` or `.removeSlide([indexes])` - to remove selected slides
    * `.removeAllSlides()` - to remove all slides

## Swiper 3.0.1 - Released on February 13, 2015
  * Fixed issue with navigation buttons in Firefox in loop mode
  * Fixed issue with image dragging in IE 10+

## Swiper 3.0.0 - Released on February 11, 2015
  * Initial release of all new Swiper 3
  * Removed features
    * Dropped support for old browsers. Now it is compatible with:
      * iOS 7+
      * Android 4+ (multirow mode only for Android 4.4+)
      * Latest Chrome, Safari, Firefox and Opera desktop browsers
      * WP 8+, IE 10+ (3D effects may not work correctly on IE because of wrong nested 3D transform support)
    * Scroll Container. Removed in favor of pure CSS `overflow: auto` with `-webkit-overflow-scrolling: touch`
  * New features
    * Swiper now uses modern flexbox layout, which by itself give more features and advantages
    * Such Swiper 2.x plugins as Hash Navigation, Smooth Progress, 3D Flow and Scrollbar are now incorporated into Swiper 3.x core
    * Full RTL support
    * Built-in navigation buttons/arrows
    * Controller. Now one Swiper could be controlled (or control itself) by another Swiper
    * Multi row slides layout with `slidesPerColumn` option
    * Better support for nested Swipers, now it is possible to use same-direction nested Swipers, like horizontal in horizontal
    * Space between slides
    * New transition effects: 3D Coverflow, 3D Cube and Fade transitions
    * Slides are `border-box` now, so it is possible to use borders and paddings directly on slides
    * Auto layout mode (`slidesPerView: 'auto'`) now gives more freedom, you can even specify slides sizes in % and use margins on them
    * Mutation Observers. If enabled, Swiper will watch for changes in Dom and update its layout automatically
    * Better clicks prevention during swiping
  * Many of API methods, parameters and callbacks are changed
  * Added a bit lightweight jQuery/Zepto version of Swiper that can be used if you use jQuery/Zepto in your project


