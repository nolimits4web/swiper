# Change Log

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
      * Android 4+, multirow mode only for Android 4.4+
      * Latest Chrome, Safari, Firefox and Opera desktop browsers
      * WP 8+, IE 10+, 3D effects may not work correctly on IE 10 because of wrong nested 3D transform support
    * Scroll Container. Removed in favor of pure CSS `overflow: auto` with `-webkit-overflow-scrolling: touch`
  * New features
    * Swiper now uses modern flexbox layout, which by itself give more features and advantages
    * Such Swiper 2.x plugins as Hash Navigation, Smooth Progress, 3D Flow and Scrollbar are now incoroporated into Swiper 3.x core
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


