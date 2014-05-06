# Change Log

## Swiper 2.6.1 - Updated on May 6, 2014

  * Fix for fireCallback function when it is called externally

## Swiper 2.6.0 - Updated on April 9, 2014

  * New methods to enable/disable mousewheel control: enableMousewheeControl/disableMousewheeControl
  * Minor fixes

## Swiper 2.5.5 - Updated on March 23, 2014

  * New API parameter: roundLengths
  * Lot of minor fixes

## Swiper 2.5.0 - Updated on March 6, 2014

  * New API parameter: slidesPerViewFit
  * New API methods: disableKeyboardControl, enableKeyboardControl
  * Require JS support
  * JS Hinted
  * Lot of minor fixes

## Swiper 2.4.3 - Updated on January 29, 2014

  * Fix loop and autoplay bug

## Swiper 2.4.2 - Updated on January 19, 2014

  * New [api][1] parameters: autoplayStopOnLast, longSwipesRatio, eventTarger, preventLinksPropagation
  * Now "looped" slides have additional "swiper-slide-duplicate" class
  * Updated onProgressChange callback to work with new Callbacks API
  * Minor fixes

## Swiper 2.4.1 - Updated on December 15, 2013

  * Mousewheel fixes, new **mousewheelForceToAxis** parameter
  * Improved old IE animation timings
  * Updated Swiper's CSS with content-box property on .swiper-wrapper

## Swiper 2.4.0 - Updated on December 6, 2013

  * New callbacks onSlideNext, onSlidePrev
  * New additive callbacks API
  * Highly improved mouse wheel behavior, especially for OSX inertia scrolling in usual mode, and now it returns page scrolling for edge positions in scrollContainer mode
  * Fully reworked autoplay with new ability to restart it using new autoplayDisableOnInteraction parameter
  * Updated [Scrollbar][2] plugin, fix for centeredSlides mode
  * A bit of IE fixes

## Swiper 2.3.0 - Updated on November 2, 2013

  * Small fixes and code improvements
  * New callbacks onSetWrapperTransition, onSetWrapperTransform, onSwiperCreated
  * Updated [Scrollbar][3] plugin, now scrollbar will be invisible when it is not required
  * New amazing [Smooth Progress][3] plugin.
  * New [Hash Navigation][4] plugin.

## Swiper 2.2.0 - Updated on September 15, 2013

  * Many fixes and code improvements
  * Updated [Scrollbar][2] plugin
  * Fixed links and events in loop mode
  * A bit improved freeMode logic
  * Improved "noSwiping" logic
  * Other minor fixes

## Swiper 2.1.0 - Updated on August 22, 2013

  * Many fixes and improvements
  * Updated [Scrollbar][2] plugin with new onScrollbarDrag callback
  * New [API][1] inFirstInit and onInit callbacks
  * New [Pull To Refresh][5] demo
  * Improved "noSwiping" logic
  * Fixed clickedSlideIndex for IE7-8
  * Fixed "calculateHeight" logic
  * Other minor fixes

## Swiper 2.0.0 - Updated on June 22, 2013

  * Many new features, new functionality, new core, new API
  * Better old IE support, now it supports even IE 7 (jQuery required)
  * Lot of major and minor fixes

## Swiper 1.9.4 - Updated on May 23, 2013

  * Fixed Autoplay in non loop mode with slidesPerSlide more than 1
  * Ability to enable/disable callback queues to get more control over the callbacks
  * Minor Fixes

## Swiper 1.9.3 - Updated on April 30, 2013

  * Few important fixes including IE8 improvements
  * Updated [Scrollbar][6] plugin to be compatible with IE8

## Swiper 1.9.2 - Updated on April 19, 2013

  * New [API][1] features:
    * New feature to enable 100% resitance with `nopeek` parameter
    * New feature to disable "swiping" on some slide with additional `NoSwiping` element's class
    * `.activeSlide` became `.activeIndex`
    * `.previousSlide` became `.previousIndex`
  * IE9 fix for with in percents
  * Other minor fixes and improvements

## Swiper 1.9.1 - Updated on April 6, 2013

  * New [API][1] features:
    * New feature to disable short swipes with `shortSwipes` parameter
    * New feature to add "start" threshold `moveStartThreshold` parameter
    * New feature to use left/top wrapper position offset instead of use of css3 transforms `useCSS3Transforms` parameter
  * Updates CSS file
  * Minor fixes and improvements

## Swiper 1.9 - Updated on March 16, 2013

  * Added support for devices that can use both mouse and touch "pointers" at the same time, like many of Windows 8 tablets and notebooks
  * New [API][1] features:
    * New feature to set "group sliding" with `slidesPerGroup` parameter
    * Now you can hardcode resize event (for example "resize" instead of "orientationchange" for mobiles) with `resizeEvent` parameter
  * Fixes:
    * Fixed situation when slider can get stuck between slides when tapped during transition
    * Now clickedSlide will return correct slide in loop mode
  * Minor fixes

## Swiper 1.8.8 - Updated on March 4, 2013

  * Improved cursors usablity with autmatic grab cursors for container and drag cursor for scrollbar
  * Improved mousewheel control for scroll container/free mode to have more native scrolling behavior
  * Snap functionality for scrollbar
  * [Scrollbar][2] plugin updated to version 1.2
  * Minor fixes

## Swiper 1.8.7 - Updated on February 22, 2013

  * Fixed initialSlide/resize issue
  * New ability to use slides with fixed width in fluid container with a `slidesPerSlide:'auto'`
  * Pagination switch that appropriate to active slide index has additional "swiper-activeslide-switch"
  * Other minor fixes

## Swiper 1.8.5 - Updated on February 5, 2013

  * New [API][1] features:
    * New keyboard arrows navigation with "keyboardControl" option
    * New mousewheel navigation with "mousewheelControl" option
  * Now it is possible to pass HTMLElement on initialization, not only css selector like before
  * Updated [3D Flow][7]
  * Updated [Scrollbar][2]
  * Fixed small Android and IE8 bugs
  * Improved "scrollContainer" to be more responsive
  * Other minor core fixes

## Swiper 1.8 - Updated on January 18, 2013

  * New huge and awesome [Slides API][8]
  * New [API][1] features:
    * New initialization option "initialSlide"
    * New methods: ".reInit()", ".currentSlide()", ".clickedSlide"
    * New callbacks: "onSlideClick" and "onSlideTouch"
  * Update [3D Flow][7] plugin to work with new features
  * Lot of minor and few major core fixes

## Swiper 1.7 - Updated on December 19, 2012

  * New API features
  * Scroll Container Improvements
  * Reworked internal plugins API
  * Windows Phone 8 Support
  * Minor fixes

## Swiper 1.6 - Updated on December 11, 2012

  * New Scroll Container mode to use like simple scrollable area!
  * New API features
  * Highly improved nested behavior to create multi dimensional apps
  * Fixed auto play in loop mode
  * Fixed initialization "delay" in loop mode
  * New internal plugins API (beta). It allows to create own Swiper plugins
  * Improved Internet Explorer 8 support
  * Minor fixes

## Swiper 1.5.5 - Updated on October 20, 2012

  * Internet Explorer 8 support (without animation)
  * FireFox below 11 support

## Swiper 1.5 - Updated on October 6, 2012

  * A lot of major and minor fixes, core optimization
  * Now it works in Internet Explorer 9 (without animation) and Internet Explorer 10
  * Improved perfomance
  * New "loop" mode with infinite scroll (see demo below)
  * New carousel mode, now you can show few slides per slider container (see demo below)
  * New "smart" pagination, looks fun with loop and carousel modes
  * Now Swipers can be easily nested one into another (see demo below)
  * Added ability to disable automatic slider resize on windows resize
  * Updated CSS

## Swiper 1.3 - Updated on April 15, 2012

  * External functions swipeNext, swipePrev, swipeTo now return true or false.
  * **.previousSlide** property returns the index of previously displayed slide
  * Added **onSlideInitialize** callback

## Swiper 1.3 - Updated on April 2, 2012

  * Added **onSlideChangeStart** callback
  * Added **onSlideReset** callback
  * **onSlideChange** is renamed to **onSlideChangeEnd**
  * Now **.swipeTo()** method accepts 3 parameters - index _(number)_, speed _(number)_ and runCallbacks _(boolean)_
  * Now **.swipeTo()** method will produce 'onSlideChangeStart' and 'onSlideChangeEnd' callback functions (if "runCallbacks" is not equal to "false")
  * New **mySwiper.destroy()** method to release all events assigned by Swiper
  * Fixed serious bug when using fluid (responsive) Swiper to re-calculate slides' position on window resize

## Swiper 1.2 - Updated on March 31, 2012

  * Improved mouse events to get the same behaviour as on touch devices

## Swiper 1.1 - Updated on March 18, 2012

  * Added **autoPlay** parameter to enable auto play
  * **mySwiper.startAutoPlay()** \- external function to start auto play
  * **mySwiper.startAutoPlay()** \- external function to stop auto play
  * Optimized for usage as a fallback for upcoming **["iDangero.us S6"**][9] 3D slider
  * Added small plugin to use Swiper with [Zepto.js][10]

## Swiper 1.0 - Initial release on March 15, 2012

   [1]: http://www.idangero.us/sliders/swiper/api.php
   [2]: http://www.idangero.us/sliders/swiper/plugins/scrollbar.php
   [3]: http://www.idangero.us/sliders/swiper/plugins/progress.php
   [4]: http://www.idangero.us/sliders/swiper/plugins/hashnav.php
   [5]: http://www.idangero.us/sliders/swiper/demos.php
   [6]: https://raw.github.com/plugins/scrollbar.php
   [7]: http://www.idangero.us/sliders/swiper/plugins/3dflow.php
   [8]: http://www.idangero.us/sliders/swiper/api.php#slidesapi
   [9]: http://www.idangero.us/sliders/s6/
   [10]: http://zeptojs.com
