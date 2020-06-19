# Swiper API



## Swiper Full HTML Layout

    <!-- Slider main container -->
    <div class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
            ...
        </div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>

        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- If we need scrollbar -->
        <div class="swiper-scrollbar"></div>
    </div>

## Initialize Swiper

Now, when we have Swiper's HTML, we need to initialize it using the following function:

<div class="method-wrap">

<span class="method">new Swiper(<span>swiperContainer</span>, <span>parameters</span>)</span><span>- initialize swiper with options</span>

*   <span class="parameter">swiperContainer</span> - <span class="parameter-type">HTMLElement</span> or <span class="parameter-type">string</span> (with CSS Selector) of swiper container HTML element. Required.
*   <span class="parameter">parameters</span> - <span class="parameter-type">object</span> - object with Swiper parameters. Optional.
*   **Method returns initialized Swiper instance**

</div>

For example:

    var mySwiper = new Swiper('.swiper-container', {
        speed: 400,
        spaceBetween: 100
    });

**After** you initialize Swiper it is possible to access to Swiper's instance on its HTMLElement. It is `swiper` property of Swiper's HTML container element:

    var mySwiper = document.querySelector('.swiper-container').swiper

    // Now you can use all slider methods like
    mySwiper.slideNext();

## Swiper Parameters

Let's look on list of all available parameters:

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>init</td>

<td>boolean</td>

<td>true</td>

<td>Whether Swiper should be initialised automatically when you create an instance. If disabled, then you need to init it manually by calling `mySwiper.init()`</td>

</tr>

<tr>

<td>updateOnWindowResize</td>

<td>boolean</td>

<td>true</td>

<td>Swiper will recalculate slides position on window resize (orientationchange)</td>

</tr>

<tr>

<td>initialSlide</td>

<td>number</td>

<td>0</td>

<td>Index number of initial slide.</td>

</tr>

<tr>

<td>direction</td>

<td>string</td>

<td>'horizontal'</td>

<td>Could be 'horizontal' or 'vertical' (for vertical slider).</td>

</tr>

<tr>

<td>speed</td>

<td>number</td>

<td>300</td>

<td>Duration of transition between slides (in ms)</td>

</tr>

<tr>

<td>setWrapperSize</td>

<td>boolean</td>

<td>false</td>

<td>Enabled this option and plugin will set width/height on swiper wrapper equal to total size of all slides. Mostly should be used as compatibility fallback option for browser that don't support flexbox layout well</td>

</tr>

<tr>

<td>virtualTranslate</td>

<td>boolean</td>

<td>false</td>

<td>Enabled this option and swiper will be operated as usual except it will not move, real translate values on wrapper will not be set. Useful when you may need to create custom slide transition</td>

</tr>

<tr>

<td>width</td>

<td>number</td>

<td></td>

<td>Swiper width (in px). Parameter allows to force Swiper width. Useful **only** if you initialize Swiper when it is hidden.

<div class="important-note">Setting this parameter will make Swiper not responsive</div>

</td>

</tr>

<tr>

<td>height</td>

<td>number</td>

<td></td>

<td>Swiper height (in px). Parameter allows to force Swiper height. Useful **only** if you initialize Swiper when it is hidden.

<div class="important-note">Setting this parameter will make Swiper not responsive</div>

</td>

</tr>

<tr>

<td>autoHeight</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** and slider wrapper will adopt its height to the height of the currently active slide</td>

</tr>

<tr>

<td>roundLengths</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** to round values of slides width and height to prevent blurry texts on usual resolution screens (if you have such)</td>

</tr>

<tr>

<td>nested</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** on nested Swiper for correct touch events interception. Use only on nested swipers that use same direction as the parent one</td>

</tr>

<tr>

<td>uniqueNavElements</td>

<td>boolean</td>

<td>true</td>

<td>If enabled (by default) and navigation elements' parameters passed as a string (like `".pagination"`) then Swiper will look for such elements through child elements first. Applies for pagination, prev/next buttons and scrollbar elements</td>

</tr>

<tr>

<td>effect</td>

<td>string</td>

<td>'slide'</td>

<td>Tranisition effect. Could be "slide", "fade", "cube", "coverflow" or "flip"</td>

</tr>

<tr>

<td>runCallbacksOnInit</td>

<td>boolean</td>

<td>true</td>

<td>Fire [Transition/SlideChange][Start/End] events on swiper initialization. Such events will be fired on initialization in case of your initialSlide is not 0, or you use loop mode</td>

</tr>

<tr>

<td>watchOverflow</td>

<td>boolean</td>

<td>false</td>

<td>When enabled Swiper will be disabled and hide navigation buttons on case there are not enough slides for sliding</td>

</tr>

<tr>

<td>on</td>

<td>object</td>

<td></td>

<td>Register event handlers</td>

</tr>

<tr>

<th colspan="4">CSS Scroll Snap</th>

</tr>

<tr>

<td>cssMode</td>

<td>boolean</td>

<td>false</td>

<td>

When enabled it will use modern CSS Scroll Snap API. It doesn't support all of Swiper's features, but potentially should bring a much better performance in simple configurations.

This is what is not supported when it is enabled:

*   All effects (Fade, Coverflow, Flip, Cube)
*   Zoom
*   Virtual Slides
*   `speed` parameter will have no effect
*   All transition start/end related events (use `slideChange` instead)
*   `slidesPerGroup` has limited support
*   `centeredSlides` is not supported
*   Changing slides with with anything except touch/swipe and mousewheel will happen without transition in browsers without `scrollTo.behaviour = 'smooth'` support (e.g. in desktop and iOS Safari)
*   `simulateTouch` doesn't have effect and "dragging" with mouse doesn't work
*   `resistance` doesn't have any effect
*   `allowSlidePrev/Next`
*   `swipeHandler`
*   `freeMode` and all relevant features

</td>

</tr>

<tr>

<th colspan="4">Slides grid</th>

</tr>

<tr>

<td>spaceBetween</td>

<td>number</td>

<td>0</td>

<td>

Distance between slides in px.

If you use "margin" css property to the elements which go into Swiper in which you pass "spaceBetween" into, **navigation** might not work property.

</td>

</tr>

<tr>

<td>slidesPerView</td>

<td>number or 'auto'</td>

<td>1</td>

<td>

Number of slides per view (slides visible at the same time on slider's container).

If you use it with "auto" value and along with **loop: true** then you need to specify **loopedSlides** parameter with amount of slides to loop (duplicate)

**slidesPerView: 'auto'** is currently not compatible with multirow mode, when **slidesPerColumn** > 1

</td>

</tr>

<tr>

<td>slidesPerColumn</td>

<td>number</td>

<td>1</td>

<td>Number of slides per column, for multirow layout

**slidesPerColumn > 1** is currently not compatible with loop mode (**loop: true**)

</td>

</tr>

<tr>

<td>slidesPerColumnFill</td>

<td>string</td>

<td>'column'</td>

<td>Could be 'column' or 'row'. Defines how slides should fill rows, by column or by row. When 'column' it uses `flex-direction: column` layout which requires specified height on swiper-container.</td>

</tr>

<tr>

<td>slidesPerGroup</td>

<td>number</td>

<td>1</td>

<td>Set numbers of slides to define and enable group sliding. Useful to use with slidesPerView > 1</td>

</tr>

<tr>

<td>slidesPerGroupSkip</td>

<td>number</td>

<td>0</td>

<td>The parameter works in the following way:

If `slidesPerGroupSkip` equals `0` (default), no slides are excluded from grouping, and the resulting behaviour is the same as without this change.

If `slidesPerGroupSkip` is equal or greater than `1` the first X slides are treated as single groups, whereas all following slides are grouped by the `slidesPerGroup` value.

</td>

</tr>

<tr>

<td>centeredSlides</td>

<td>boolean</td>

<td>false</td>

<td>If true, then active slide will be centered, not always on the left side.</td>

</tr>

<tr>

<td>centeredSlidesBounds</td>

<td>boolean</td>

<td>false</td>

<td>If true, then active slide will be centered without adding gaps at the beginning and end of slider. Required `centeredSlides: true`. Not intended to be used with `loop` or `pagination`</td>

</tr>

<tr>

<td>slidesOffsetBefore</td>

<td>number</td>

<td>0</td>

<td>Add (in px) additional slide offset in the beginning of the container (before all slides)</td>

</tr>

<tr>

<td>slidesOffsetAfter</td>

<td>number</td>

<td>0</td>

<td>Add (in px) additional slide offset in the end of the container (after all slides)</td>

</tr>

<tr>

<td>normalizeSlideIndex</td>

<td>boolean</td>

<td>true</td>

<td>Normalize slide index. See [#1766](https://github.com/nolimits4web/Swiper/pull/1766)</td>

</tr>

<tr>

<td>centerInsufficientSlides</td>

<td>boolean</td>

<td>false</td>

<td>When enabled it center slides if the amount of slides less than `slidesPerView`. Not intended to be used `loop` mode and `slidesPerColumn`</td>

</tr>

<tr>

<th colspan="4">Grab Cursor</th>

</tr>

<tr>

<td>grabCursor</td>

<td>boolean</td>

<td>false</td>

<td>This option may a little improve desktop usability. If **true**, user will see the "grab" cursor when hover on Swiper</td>

</tr>

<tr>

<th colspan="4">Touches</th>

</tr>

<tr>

<td>touchEventsTarget</td>

<td>string</td>

<td>'wrapper'</td>

<td>Target element to listen touch events on. Can be **'container'** (to listen for touch events on swiper-container) or **'wrapper'** (to listen for touch events on swiper-wrapper)</td>

</tr>

<tr>

<td>touchRatio</td>

<td>number</td>

<td>1</td>

<td>Touch ratio</td>

</tr>

<tr>

<td>touchAngle</td>

<td>number</td>

<td>45</td>

<td>Allowable angle (in degrees) to trigger touch move</td>

</tr>

<tr>

<td>simulateTouch</td>

<td>boolean</td>

<td>true</td>

<td>If true, Swiper will accept mouse events like touch events (click and drag to change slides)</td>

</tr>

<tr>

<td>shortSwipes</td>

<td>boolean</td>

<td>true</td>

<td>Set to **false** if you want to disable short swipes</td>

</tr>

<tr>

<td>longSwipes</td>

<td>boolean</td>

<td>true</td>

<td>Set to **false** if you want to disable long swipes</td>

</tr>

<tr>

<td>longSwipesRatio</td>

<td>number</td>

<td>0.5</td>

<td>Ratio to trigger swipe to next/previous slide during long swipes</td>

</tr>

<tr>

<td>longSwipesMs</td>

<td>number</td>

<td>300</td>

<td>Minimal duration (in ms) to trigger swipe to next/previous slide during long swipes</td>

</tr>

<tr>

<td>followFinger</td>

<td>boolean</td>

<td>true</td>

<td>If disabled, then slider will be animated only when you release it, it will not move while you hold your finger on it</td>

</tr>

<tr>

<td>allowTouchMove</td>

<td>boolean</td>

<td>true</td>

<td>If false, then the only way to switch the slide is use of external API functions like `slidePrev` or `slideNext`</td>

</tr>

<tr>

<td>threshold</td>

<td>number</td>

<td>0</td>

<td>Threshold value in px. If "touch distance" will be lower than this value then swiper will not move</td>

</tr>

<tr>

<td>touchStartPreventDefault</td>

<td>boolean</td>

<td>true</td>

<td>If disabled, `touchstart` (`mousedown`) event won't be prevented</td>

</tr>

<tr>

<td>touchStartForcePreventDefault</td>

<td>boolean</td>

<td>false</td>

<td>Force to always prevent default for `touchstart` (`mousedown`) event</td>

</tr>

<tr>

<td>touchMoveStopPropagation</td>

<td>boolean</td>

<td>false</td>

<td>If enabled, then propagation of "touchmove" will be stopped</td>

</tr>

<tr>

<td>iOSEdgeSwipeDetection</td>

<td>boolean</td>

<td>false</td>

<td>Enable to release Swiper events for swipe-to-go-back work in iOS UIWebView</td>

</tr>

<tr>

<td>iOSEdgeSwipeThreshold</td>

<td>number</td>

<td>20</td>

<td>Area (in px) from left edge of the screen to release touch events for swipe-to-go-back in iOS UIWebView</td>

</tr>

<tr>

<td>touchReleaseOnEdges</td>

<td>boolean</td>

<td>false</td>

<td>Enable to release touch events on slider edge position (beginning, end) to allow for further page scrolling</td>

</tr>

<tr>

<td>passiveListeners</td>

<td>boolean</td>

<td>true</td>

<td>Passive event listeners will be used by default where possible to improve scrolling performance on mobile devices. But if you need to use `e.preventDefault` and you have conflict with it, then you should disable this parameter</td>

</tr>

<tr>

<th colspan="4">Touch Resistance</th>

</tr>

<tr>

<td>resistance</td>

<td>boolean</td>

<td>true</td>

<td>Set to **false** if you want to disable resistant bounds</td>

</tr>

<tr>

<td>resistanceRatio</td>

<td>number</td>

<td>0.85</td>

<td>This option allows you to control resistance ratio</td>

</tr>

<tr>

<th colspan="4">Swiping / No swiping</th>

</tr>

<tr>

<td>preventInteractionOnTransition</td>

<td>boolean</td>

<td>false</td>

<td>When enabled it won't allow to change slides by swiping or navigation/pagination buttons during transition</td>

</tr>

<tr>

<td>allowSlidePrev</td>

<td>boolean</td>

<td>true</td>

<td>Set to **false** to disable swiping to previous slide direction (to left or top)</td>

</tr>

<tr>

<td>allowSlideNext</td>

<td>boolean</td>

<td>true</td>

<td>Set to **false** to disable swiping to next slide direction (to right or bottom)</td>

</tr>

<tr>

<td>noSwiping</td>

<td>boolean</td>

<td>true</td>

<td>Enable/disable swiping on elements matched to class specified in `noSwipingClass`</td>

</tr>

<tr>

<td>noSwipingClass</td>

<td>string</td>

<td>'swiper-no-swiping'</td>

<td>Specify `noSwiping`'s' element css class</td>

</tr>

<tr>

<td>noSwipingSelector</td>

<td>string</td>

<td></td>

<td>Can be used instead of `noSwipingClass` to specify elements to disable swiping on. For example `'input'` will disable swiping on all inputs</td>

</tr>

<tr>

<td>swipeHandler</td>

<td>string / HTMLElement</td>

<td>null</td>

<td>String with CSS selector or HTML element of the container with pagination that will work as only available handler for swiping</td>

</tr>

<tr>

<th colspan="4">Clicks</th>

</tr>

<tr>

<td>preventClicks</td>

<td>boolean</td>

<td>true</td>

<td>Set to **true** to prevent accidental unwanted clicks on links during swiping</td>

</tr>

<tr>

<td>preventClicksPropagation</td>

<td>boolean</td>

<td>true</td>

<td>Set to **true** to stop clicks event propagation on links during swiping</td>

</tr>

<tr>

<td>slideToClickedSlide</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** and click on any slide will produce transition to this slide</td>

</tr>

<tr>

<th colspan="4">Freemode</th>

</tr>

<tr>

<td>freeMode</td>

<td>boolean</td>

<td>false</td>

<td>If **true** then slides will not have fixed positions</td>

</tr>

<tr>

<td>freeModeMomentum</td>

<td>boolean</td>

<td>true</td>

<td>If **true**, then slide will keep moving for a while after you release it</td>

</tr>

<tr>

<td>freeModeMomentumRatio</td>

<td>number</td>

<td>1</td>

<td>Higher value produces larger momentum distance after you release slider</td>

</tr>

<tr>

<td>freeModeMomentumVelocityRatio</td>

<td>number</td>

<td>1</td>

<td>Higher value produces larger momentum velocity after you release slider</td>

</tr>

<tr>

<td>freeModeMomentumBounce</td>

<td>boolean</td>

<td>true</td>

<td>Set to **false** if you want to disable momentum bounce in free mode</td>

</tr>

<tr>

<td>freeModeMomentumBounceRatio</td>

<td>number</td>

<td>1</td>

<td>Higher value produces larger momentum bounce effect</td>

</tr>

<tr>

<td>freeModeMinimumVelocity</td>

<td>number</td>

<td>0.02</td>

<td>Minimum touchmove-velocity required to trigger free mode momentum</td>

</tr>

<tr>

<td>freeModeSticky</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** to enable snap to slides positions in free mode</td>

</tr>

<tr>

<th colspan="4">Progress</th>

</tr>

<tr>

<td>watchSlidesProgress</td>

<td>boolean</td>

<td>false</td>

<td>Enable this feature to calculate each slides progress</td>

</tr>

<tr>

<td>watchSlidesVisibility</td>

<td>boolean</td>

<td>false</td>

<td>`watchSlidesProgress` should be enabled. Enable this option and slides that are in viewport will have additional visible class</td>

</tr>

<tr>

<th colspan="4">Images</th>

</tr>

<tr>

<td>preloadImages</td>

<td>boolean</td>

<td>true</td>

<td>When enabled Swiper will force to load all images</td>

</tr>

<tr>

<td>updateOnImagesReady</td>

<td>boolean</td>

<td>true</td>

<td>When enabled Swiper will be reinitialized after all inner images (<img> tags) are loaded. Required `preloadImages: true`</td>

</tr>

<tr>

<th colspan="4">Loop</th>

</tr>

<tr>

<td>loop</td>

<td>boolean</td>

<td>false</td>

<td>

Set to **true** to enable continuous loop mode

If you use it along with `slidesPerView: 'auto'` then you need to specify `loopedSlides` parameter with amount of slides to loop (duplicate)

Also, because of nature of how the loop mode works, it will add duplicated slides. Such duplicated classes will have additional classes:

*   `swiper-slide-duplicate` - represents duplicated slide
*   `swiper-slide-duplicate-active` - represents slide duplicated to the currently active slide
*   `swiper-slide-duplicate-next` - represents slide duplicated to the slide next to active
*   `swiper-slide-duplicate-prev` - represents slide duplicated to the slide previous to active

</td>

</tr>

<tr>

<td>loopAdditionalSlides</td>

<td>number</td>

<td>0</td>

<td>Addition number of slides that will be cloned after creating of loop</td>

</tr>

<tr>

<td>loopedSlides</td>

<td>number</td>

<td>null</td>

<td>If you use `slidesPerView:'auto'` with loop mode you should tell to Swiper how many slides it should loop (duplicate) using this parameter</td>

</tr>

<tr>

<td>loopFillGroupWithBlank</td>

<td>boolean</td>

<td>false</td>

<td>Enable and loop mode will fill groups with insufficient number of slides with blank slides. Good to be used with `slidesPerGroup` parameter</td>

</tr>

<tr>

<th colspan="4">Breakpoints</th>

</tr>

<tr>

<td>breakpoints</td>

<td>object</td>

<td></td>

<td>

Allows to set different parameter for different responsive breakpoints (screen sizes). Not all parameters can be changed in breakpoints, only those which are not required different layout and logic, like `slidesPerView`, `slidesPerGroup`, `spaceBetween`, `slidesPerColumn`. Such parameters like `loop` and `effect` won't work. For example:

    var swiper = new Swiper('.swiper-container', {
      // Default parameters
      slidesPerView: 1,
      spaceBetween: 10,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      }
    })

Since version 5.3.0 it also supports "ratio" (width/height) breakpoints:

    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        '@0.75': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '@1.00': {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        '@1.50': {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }
    });

</td>

</tr>

<tr>

<th colspan="4">Observer</th>

</tr>

<tr>

<td>observer</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** to enable Mutation Observer on Swiper and its elements. In this case Swiper will be updated (reinitialized) each time if you change its style (like hide/show) or modify its child elements (like adding/removing slides)</td>

</tr>

<tr>

<td>observeParents</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** if you also need to watch Mutations for Swiper parent elements</td>

</tr>

<tr>

<td>observeSlideChildren</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** if you also need to watch Mutations for Swiper slide children elements</td>

</tr>

<tr>

<th colspan="4">Namespace</th>

</tr>

<tr>

<td>containerModifierClass</td>

<td>string</td>

<td>'swiper-container-'</td>

<td>The beginning of the modifier CSS class that can be added to swiper container depending on different parameters</td>

</tr>

<tr>

<td>slideClass</td>

<td>string</td>

<td>'swiper-slide'</td>

<td>CSS class name of slide</td>

</tr>

<tr>

<td>slideActiveClass</td>

<td>string</td>

<td>'swiper-slide-active'</td>

<td>CSS class name of currently active slide</td>

</tr>

<tr>

<td>slideDuplicateActiveClass</td>

<td>string</td>

<td>'swiper-slide-duplicate-active'</td>

<td>CSS class name of duplicated slide which represents the currently active slide</td>

</tr>

<tr>

<td>slideVisibleClass</td>

<td>string</td>

<td>'swiper-slide-visible'</td>

<td>CSS class name of currently visible slide</td>

</tr>

<tr>

<td>slideDuplicateClass</td>

<td>string</td>

<td>'swiper-slide-duplicate'</td>

<td>CSS class name of slide duplicated by loop mode</td>

</tr>

<tr>

<td>slideNextClass</td>

<td>string</td>

<td>'swiper-slide-next'</td>

<td>CSS class name of slide which is right after currently active slide</td>

</tr>

<tr>

<td>slideDuplicateNextClass</td>

<td>string</td>

<td>'swiper-slide-duplicate-next'</td>

<td>CSS class name of duplicated slide which represents the slide next to active slide</td>

</tr>

<tr>

<td>slidePrevClass</td>

<td>string</td>

<td>'swiper-slide-prev'</td>

<td>CSS class name of slide which is right before currently active slide</td>

</tr>

<tr>

<td>slideDuplicatePrevClass</td>

<td>string</td>

<td>'swiper-slide-duplicate-prev'</td>

<td>CSS class name of duplicated slide which represents the slide previous to active slide</td>

</tr>

<tr>

<td>wrapperClass</td>

<td>string</td>

<td>'swiper-wrapper'</td>

<td>CSS class name of slides' wrapper</td>

</tr>

</tbody>

</table>

## Slider Methods & Properties

After we initialize Slider we have its initialized instance in variable (like `mySwiper` variable in example above) with helpful methods and properties:

<table class="methods-table">

<tbody>

<tr>

<th colspan="2">Properties</th>

</tr>

<tr>

<td>mySwiper.params</td>

<td>Object with passed initialization parameters</td>

</tr>

<tr>

<td>mySwiper.$el</td>

<td>Dom7 element with slider container HTML element. To get vanilla HTMLElement use `mySwiper.el`</td>

</tr>

<tr>

<td>mySwiper.$wrapperEl</td>

<td>Dom7 element with slider wrapper HTML element. To get vanilla HTMLElement use `mySwiper.wrapperEl`</td>

</tr>

<tr>

<td>mySwiper.slides</td>

<td>Dom7 array-like collection of slides HTML elements. To get specific slide HTMLElement use `mySwiper.slides[1]`</td>

</tr>

<tr>

<td>mySwiper.width</td>

<td>Width of container</td>

</tr>

<tr>

<td>mySwiper.height</td>

<td>Height of container</td>

</tr>

<tr>

<td>mySwiper.translate</td>

<td>Current value of wrapper translate</td>

</tr>

<tr>

<td>mySwiper.progress</td>

<td>Current progress of wrapper translate (from 0 to 1)</td>

</tr>

<tr>

<td>mySwiper.activeIndex</td>

<td>

Index number of currently active slide

Note, that in loop mode active index value will be always shifted on a number of looped/duplicated slides

</td>

</tr>

<tr>

<td>mySwiper.realIndex</td>

<td>

Index number of currently active slide considering duplicated slides in loop mode

</td>

</tr>

<tr>

<td>mySwiper.previousIndex</td>

<td>Index number of previously active slide</td>

</tr>

<tr>

<td>mySwiper.isBeginning</td>

<td>**true** if slider on most "left"/"top" position</td>

</tr>

<tr>

<td>mySwiper.isEnd</td>

<td>**true** if slider on most "right"/"bottom" position</td>

</tr>

<tr>

<td>mySwiper.animating</td>

<td>**true** if swiper is in transition</td>

</tr>

<tr>

<td>mySwiper.touches</td>

<td>Object with the following touch event properties:

*   mySwiper.touches.startX
*   mySwiper.touches.startY
*   mySwiper.touches.currentX
*   mySwiper.touches.currentY
*   mySwiper.touches.diff

</td>

</tr>

<tr>

<td>mySwiper.clickedIndex</td>

<td>Index number of last clicked slide</td>

</tr>

<tr>

<td>mySwiper.clickedSlide</td>

<td>Link to last clicked slide (_HTMLElement_)</td>

</tr>

<tr>

<td>mySwiper.allowSlideNext</td>

<td>Disable / enable ability to slide to the next slides by assigning `false`/`true` to this property</td>

</tr>

<tr>

<td>mySwiper.allowSlidePrev</td>

<td>Disable / enable ability to slide to the previous slides by assigning `false`/`true` to this property</td>

</tr>

<tr>

<td>mySwiper.allowTouchMove</td>

<td>Disable / enable ability move slider by grabbing it with mouse or by touching it with finger (on touch screens) by assigning `false`/`true` to this property</td>

</tr>

<tr>

<th colspan="2">Methods</th>

</tr>

<tr>

<td>mySwiper.slideNext(<span>speed</span>, <span>runCallbacks</span>);</td>

<td>Run transition to next slide

*   <span class="parameter">speed</span> - <span class="parameter-type">number</span> - transition duration (in ms). _Optional_
*   <span class="parameter">runCallbacks</span> - <span class="parameter-type">boolean</span> - Set it to `false` (by default it is `true`) and transition will not produce transition events. _Optional_

</td>

</tr>

<tr>

<td>mySwiper.slidePrev(<span>speed</span>, <span>runCallbacks</span>);</td>

<td>Run transition to previous slide

*   <span class="parameter">speed</span> - <span class="parameter-type">number</span> - transition duration (in ms). _Optional_
*   <span class="parameter">runCallbacks</span> - <span class="parameter-type">boolean</span> - Set it to `false` (by default it is `true`) and transition will not produce transition events. _Optional_

</td>

</tr>

<tr>

<td>mySwiper.slideTo(<span>index</span>, <span>speed</span>, <span>runCallbacks</span>);</td>

<td>Run transition to the slide with index number equal to 'index' parameter for the duration equal to 'speed' parameter.

*   <span class="parameter">index</span> - <span class="parameter-type">number</span> - index number of slide
*   <span class="parameter">speed</span> - <span class="parameter-type">number</span> - transition duration (in ms). _Optional_
*   <span class="parameter">runCallbacks</span> - <span class="parameter-type">boolean</span> - Set it to `false` (by default it is `true`) and transition will not produce transition events. _Optional_

</td>

</tr>

<tr>

<td>mySwiper.slideToLoop(<span>index</span>, <span>speed</span>, <span>runCallbacks</span>);</td>

<td>Does the same as .slideTo but for the case when used with enabled `loop`. So this method will slide to slides with `realIndex` matching to passed `index`

*   <span class="parameter">index</span> - <span class="parameter-type">number</span> - index number of original slide
*   <span class="parameter">speed</span> - <span class="parameter-type">number</span> - transition duration (in ms). _Optional_
*   <span class="parameter">runCallbacks</span> - <span class="parameter-type">boolean</span> - Set it to `false` (by default it is `true`) and transition will not produce transition events. _Optional_

</td>

</tr>

<tr>

<td>mySwiper.slideReset(<span>speed</span>, <span>runCallbacks</span>);</td>

<td>Reset swiper position to currently active slide for the duration equal to 'speed' parameter.

*   <span class="parameter">speed</span> - <span class="parameter-type">number</span> - transition duration (in ms). _Optional_
*   <span class="parameter">runCallbacks</span> - <span class="parameter-type">boolean</span> - Set it to `false` (by default it is `true`) and transition will not produce transition events. _Optional_

</td>

</tr>

<tr>

<td>mySwiper.slideToClosest(<span>speed</span>, <span>runCallbacks</span>);</td>

<td>Reset swiper position to closest slide/snap point for the duration equal to 'speed' parameter.

*   <span class="parameter">speed</span> - <span class="parameter-type">number</span> - transition duration (in ms). _Optional_
*   <span class="parameter">runCallbacks</span> - <span class="parameter-type">boolean</span> - Set it to `false` (by default it is `true`) and transition will not produce transition events. _Optional_

</td>

</tr>

<tr>

<td>mySwiper.updateAutoHeight(<span>speed</span>);</td>

<td>Force swiper to update its height (when autoHeight enabled) for the duration eqaul to 'speed' parameter

*   <span class="parameter">speed</span> - <span class="parameter-type">number</span> - transition duration (in ms). _Optional_
*   <span class="parameter">runCallbacks</span> - <span class="parameter-type">boolean</span> - Set it to `false` (by default it is `true`) and transition will not produce transition events. _Optional_

</td>

</tr>

<tr>

<td>mySwiper.update();</td>

<td>

You should call it after you add/remove slides manually, or after you hide/show it, or do any custom DOM modifications with Swiper

This method also includes subcall of the following methods which you can use separately:

*   mySwiper.updateSize() - recalculate size of swiper container
*   mySwiper.updateSlides() - recalculate number of slides and their offsets. Useful after you add/remove slides with JavaScript
*   mySwiper.updateProgress() - recalculate swiper progress
*   mySwiper.updateSlidesClasses() - update active/prev/next classes on slides and bullets

</td>

</tr>

<tr>

<td>mySwiper.changeDirection(<span>direction</span>);</td>

<td>

Changes slider direction from horizontal to vertical and back.

*   <span class="parameter">direction</span> - <span class="parameter-type">string</span> - new direction, e.g. `horizontal` or `vertical`. _Optional_. If not specified, then will automatically changed to opposite direction

</td>

</tr>

<tr>

<td>mySwiper.detachEvents();</td>

<td>Detach all events listeners</td>

</tr>

<tr>

<td>mySwiper.attachEvents();</td>

<td>Atach all events listeners again</td>

</tr>

<tr>

<td>mySwiper.destroy(<span>deleteInstance</span>, <span>cleanStyles</span>);</td>

<td>Destroy slider instance and detach all events listeners, where

*   <span class="parameter">deleteInstance</span> - <span class="parameter-type">boolean</span> - Set it to `false` (by default it is `true`) to not to delete Swiper instance
*   <span class="parameter">cleanStyles</span> - <span class="parameter-type">boolean</span> - Set it to `true` (by default it is `true`) and all custom styles will be removed from slides, wrapper and container. Useful if you need to destroy Swiper and to init again with new options or in different direction

</td>

</tr>

<tr>

<td>mySwiper.appendSlide(<span>slides</span>);</td>

<td>Add new slides to the end. `slides` could be HTMLElement or HTML string with new slide or array with such slides, for example:

    mySwiper.appendSlide('<div class="swiper-slide">Slide 10"</div>')
    mySwiper.appendSlide([
       '<div class="swiper-slide">Slide 10"</div>',
       '<div class="swiper-slide">Slide 11"</div>'
    ]);

</td>

</tr>

<tr>

<td>mySwiper.prependSlide(<span>slides</span>);</td>

<td>Add new slides to the beginning. `slides` could be HTMLElement or HTML string with new slide or array with such slides, for example:

    mySwiper.prependSlide('<div class="swiper-slide">Slide 0"</div>')
    mySwiper.prependSlide([
       '<div class="swiper-slide">Slide 1"</div>',
       '<div class="swiper-slide">Slide 2"</div>'
    ]);

</td>

</tr>

<tr>

<td>mySwiper.addSlide(<span>index</span>, <span>slides</span>);</td>

<td>Add new slides to the required index. `slides` could be HTMLElement or HTML string with new slide or array with such slides, for example:

    mySwiper.addSlide(1, '<div class="swiper-slide">Slide 10"</div>')
    mySwiper.addSlide(1, [
       '<div class="swiper-slide">Slide 10"</div>',
       '<div class="swiper-slide">Slide 11"</div>'
    ]);

</td>

</tr>

<tr>

<td>mySwiper.removeSlide(<span>slideIndex</span>);</td>

<td>Remove selected slides. `slideIndex` could be a number with slide index to remove or array with indexes, for example:

    mySwiper.removeSlide(0); //remove first slide
    mySwiper.removeSlide([0, 1]); //remove first and second slides

</td>

</tr>

<tr>

<td>mySwiper.removeAllSlides();</td>

<td>Remove all slides</td>

</tr>

<tr>

<td>mySwiper.setTranslate(<span>translate</span>);</td>

<td>Set custom css3 transform's translate value for swiper wrapper</td>

</tr>

<tr>

<td>mySwiper.getTranslate();</td>

<td>Get current value of swiper wrapper css3 transform translate</td>

</tr>

<tr>

<td>mySwiper.translateTo(<span>translate</span>, <span>speed</span>, <span>runCallbacks</span>, <span>translateBounds</span>);</td>

<td>Animate custom css3 transform's translate value for swiper wrapper

*   <span class="parameter">translate</span> - <span class="parameter-type">number</span> - translate value (in px).
*   <span class="parameter">speed</span> - <span class="parameter-type">number</span> - transition duration (in ms).
*   <span class="parameter">runCallbacks</span> - <span class="parameter-type">boolean</span> - Set it to `false` (by default it is `true`) and transition will not produce transition events. _Optional_
*   <span class="parameter">translateBounds</span> - <span class="parameter-type">boolean</span> - Set it to `false` (by default it is `true`) and transition value can extend beyond min and max translate. _Optional_

</td>

</tr>

<tr>

<td>mySwiper.on(<span>event</span>, <span>handler</span>)</td>

<td>Add event listener</td>

</tr>

<tr>

<td>mySwiper.once(<span>event</span>, <span>handler</span>)</td>

<td>Add event listener that will be executed only once</td>

</tr>

<tr>

<td>mySwiper.off(<span>event</span>, <span>handler</span>)</td>

<td>Remove event listener for specified event</td>

</tr>

<tr>

<td>mySwiper.off(<span>event</span>)</td>

<td>Remove all listeners for specified event</td>

</tr>

<tr>

<td>mySwiper.unsetGrabCursor();</td>

<td>Unset grab cursor</td>

</tr>

<tr>

<td>mySwiper.setGrabCursor();</td>

<td>Set grab cursor</td>

</tr>

</tbody>

</table>

## Events

Swiper comes with a bunch of useful events you can listen. Events can be assigned in two ways:

1.  Using `on` parameter on swiper initialization:

        var mySwiper = new Swiper('.swiper-container', {
          // ...
          on: {
            init: function () {
              console.log('swiper initialized');
            },
          },
        };

2.  Using `on` method after swiper initialization.

        var mySwiper = new Swiper('.swiper-container', {
          // ...
        };
        mySwiper.on('slideChange', function () {
          console.log('slide changed');
        });

<div class="important-note">

Please note, that `this` keyword within event handler always points to Swiper instance

</div>

<table class="events-table">

<thead>

<tr>

<th>Event name</th>

<th>Arguments</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>init</td>

<td></td>

<td>

Event will be fired right after Swiper initialization. Note that with `swiper.on('init')` syntax it will work only in case you set `init: false` parameter:

    var swiper = new Swiper('.swiper-container', {
      init: false,
      // other parameters
    })
    swiper.on('init', function() { /* do something */ });
    // init Swiper
    swiper.init();

Otherwise use it as the parameter:

    var swiper = new Swiper('.swiper-container', {
      // other parameters
      on: {
        init: function () {
          /* do something */
        },
      }
    });

</td>

</tr>

<tr>

<td>beforeDestroy</td>

<td></td>

<td>Event will be fired right before Swiper destroyed</td>

</tr>

<tr>

<td>slideChange</td>

<td></td>

<td>Event will be fired when currently active slide is changed</td>

</tr>

<tr>

<td>slideChangeTransitionStart</td>

<td></td>

<td>Event will be fired in the beginning of animation to other slide (next or previous).</td>

</tr>

<tr>

<td>slideChangeTransitionEnd</td>

<td></td>

<td>Event will be fired after animation to other slide (next or previous).</td>

</tr>

<tr>

<td>slideNextTransitionStart</td>

<td></td>

<td>Same as "slideChangeTransitionStart" but for "forward" direction only</td>

</tr>

<tr>

<td>slideNextTransitionEnd</td>

<td></td>

<td>Same as "slideChangeTransitionEnd" but for "forward" direction only</td>

</tr>

<tr>

<td>slidePrevTransitionStart</td>

<td></td>

<td>Same as "slideChangeTransitionStart" but for "backward" direction only</td>

</tr>

<tr>

<td>slidePrevTransitionEnd</td>

<td></td>

<td>Same as "slideChangeTransitionEnd" but for "backward" direction only</td>

</tr>

<tr>

<td>transitionStart</td>

<td></td>

<td>Event will be fired in the beginning of transition.</td>

</tr>

<tr>

<td>transitionEnd</td>

<td></td>

<td>Event will be fired after transition.</td>

</tr>

<tr>

<td>touchStart</td>

<td>event</td>

<td>Event will be fired when user touch Swiper. Receives 'touchstart' event as an arguments.</td>

</tr>

<tr>

<td>touchMove(event)</td>

<td>event</td>

<td>Event will be fired when user touch and move finger over Swiper. Receives 'touchmove' event as an arguments.</td>

</tr>

<tr>

<td>touchMoveOpposite</td>

<td>event</td>

<td>Event will be fired when user touch and move finger over Swiper in direction opposite to `direction` parameter. Receives 'touchmove' event as an arguments.</td>

</tr>

<tr>

<td>sliderMove</td>

<td>event</td>

<td>Event will be fired when user touch and move finger over Swiper and move it. Receives 'touchmove' event as an arguments.</td>

</tr>

<tr>

<td>touchEnd</td>

<td>event</td>

<td>Event will be fired when user release Swiper. Receives 'touchend' event as an arguments.</td>

</tr>

<tr>

<td>click</td>

<td>event</td>

<td>Event will be fired when user click/tap on Swiper. Receives 'touchend' event as an arguments.</td>

</tr>

<tr>

<td>tap</td>

<td>event</td>

<td>Event will be fired when user click/tap on Swiper. Receives 'touchend' event as an arguments.</td>

</tr>

<tr>

<td>doubleTap</td>

<td>event</td>

<td>Event will be fired when user double tap on Swiper's container. Receives 'touchend' event as an arguments</td>

</tr>

<tr>

<td>imagesReady</td>

<td></td>

<td>Event will be fired right after all inner images are loaded. `updateOnImagesReady` should be also enabled</td>

</tr>

<tr>

<td>progress</td>

<td>progress</td>

<td>Event will be fired when Swiper progress is changed, as an arguments it receives **progress** that is always from 0 to 1</td>

</tr>

<tr>

<td>reachBeginning</td>

<td></td>

<td>Event will be fired when Swiper reach its beginning (initial position)</td>

</tr>

<tr>

<td>reachEnd</td>

<td></td>

<td>Event will be fired when Swiper reach last slide</td>

</tr>

<tr>

<td>fromEdge</td>

<td></td>

<td>Event will be fired when Swiper goes from `beginning` or `end` position</td>

</tr>

<tr>

<td>setTranslate</td>

<td>translate</td>

<td>Event will be fired when swiper's wrapper change its position. Receives current translate value as an arguments</td>

</tr>

<tr>

<td>setTransition</td>

<td>transition</td>

<td>Event will be fired everytime when swiper starts animation. Receives current transition duration (in ms) as an arguments</td>

</tr>

<tr>

<td>resize</td>

<td></td>

<td>Event will be fired on window resize right before swiper's onresize manipulation</td>

</tr>

<tr>

<td>observerUpdate</td>

<td></td>

<td>Event will be fired if observer is enabled and it detects DOM mutations</td>

</tr>

<tr>

<td>beforeLoopFix</td>

<td></td>

<td>Event will be fired right before "loop fix"</td>

</tr>

<tr>

<td>loopFix</td>

<td></td>

<td>Event will be fired after "loop fix"</td>

</tr>

</tbody>

</table>

## Components

### Navigation



#### Navigation Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>navigation</td>

<td>object</td>

<td></td>

<td>

Object with navigation parameters. For example:

    var mySwiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>nextEl</td>

<td>string / HTMLElement</td>

<td>null</td>

<td>String with CSS selector or HTML element of the element that will work like "next" button after click on it</td>

</tr>

<tr class="subparam-row">

<td>prevEl</td>

<td>string / HTMLElement</td>

<td>null</td>

<td>String with CSS selector or HTML element of the element that will work like "prev" button after click on it</td>

</tr>

<tr class="subparam-row">

<td>hideOnClick</td>

<td>boolean</td>

<td>false</td>

<td>Toggle navigation buttons visibility after click on Slider's container</td>

</tr>

<tr class="subparam-row">

<td>disabledClass</td>

<td>string</td>

<td>'swiper-button-disabled'</td>

<td>CSS class name added to navigation button when it becomes disabled</td>

</tr>

<tr class="subparam-row">

<td>hiddenClass</td>

<td>string</td>

<td>'swiper-button-hidden'</td>

<td>CSS class name added to navigation button when it becomes hidden</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

#### Navigation Methods & Properties

<table class="methods-table">

<tbody>

<tr>

<th colspan="2">Properties</th>

</tr>

<tr>

<td>mySwiper.navigation.nextEl</td>

<td>HTMLElement of "next" navigation button</td>

</tr>

<tr>

<td>mySwiper.navigation.prevEl</td>

<td>HTMLElement of "previous" navigation button</td>

</tr>

<tr>

<th colspan="2">Methods</th>

</tr>

<tr>

<td>mySwiper.navigation.update();</td>

<td>Update navigation buttons state (enabled/disabled)</td>

</tr>

</tbody>

</table>

#### Navigation Events

<table class="events-table">

<thead>

<tr>

<th>Event name</th>

<th>Arguments</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>navigationHide</td>

<td></td>

<td>Event will be fired on navigation hide</td>

</tr>

<tr>

<td>navigationShow</td>

<td></td>

<td>Event will be fired on navigation show</td>

</tr>

</tbody>

</table>

### Pagination



#### Pagination Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>pagination</td>

<td>object</td>

<td></td>

<td>

Object with navigation parameters. For example:

    var mySwiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>el</td>

<td>string</td>

<td>null</td>

<td>String with CSS selector or HTML element of the container with pagination</td>

</tr>

<tr class="subparam-row">

<td>type</td>

<td>string</td>

<td>'bullets'</td>

<td>String with type of pagination. Can be "bullets", "fraction", "progressbar" or "custom"</td>

</tr>

<tr class="subparam-row">

<td>bulletElement</td>

<td>string</td>

<td>'span'</td>

<td>Defines which HTML tag will be use to represent single pagination bullet. Only for **bullets** pagination type.</td>

</tr>

<tr class="subparam-row">

<td>dynamicBullets</td>

<td>boolean</td>

<td>false</td>

<td>Good to enable if you use bullets pagination with a lot of slides. So it will keep only few bullets visible at the same time.</td>

</tr>

<tr class="subparam-row">

<td>dynamicMainBullets</td>

<td>number</td>

<td>1</td>

<td>The number of main bullets visible when **dynamicBullets** enabled.</td>

</tr>

<tr class="subparam-row">

<td>hideOnClick</td>

<td>boolean</td>

<td>true</td>

<td>Toggle (hide/true) pagination container visibility after click on Slider's container</td>

</tr>

<tr class="subparam-row">

<td>clickable</td>

<td>boolean</td>

<td>false</td>

<td>If **true** then clicking on pagination button will cause transition to appropriate slide. Only for **bullets** pagination type</td>

</tr>

<tr class="subparam-row">

<td>progressbarOpposite</td>

<td>boolean</td>

<td>false</td>

<td>Makes pagination progressbar opposite to Swiper's `direction` parameter, means vertical progressbar for horizontal swiper direction and horizontal progressbar for vertical swiper direction</td>

</tr>

<tr class="subparam-row">

<td>formatFractionCurrent</td>

<td>function(number)</td>

<td>number => number</td>

<td>Custom format fraction pagination current number. Function receives current number, and you need to return formatted value</td>

</tr>

<tr class="subparam-row">

<td>formatFractionTotal</td>

<td>function(number)</td>

<td>number => number</td>

<td>Custom format fraction pagination total number. Function receives total number, and you need to return formatted value</td>

</tr>

<tr class="subparam-row">

<td>renderBullet</td>

<td>function(index, className)</td>

<td>null</td>

<td>This parameter allows totally customize pagination bullets, you need to pass here a function that accepts **index** number of pagination bullet and required element class name (**className**). Only for **bullets** pagination type

For example, with this code, we can add slide number into pagination bullet:

    var swiper = new Swiper('.swiper-container', {
      //...
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      }
    });

</td>

</tr>

<tr class="subparam-row">

<td>renderFraction</td>

<td>function(currentClass, totalClass)</td>

<td>null</td>

<td>This parameter allows to customize "fraction" pagination html. Only for **fraction** pagination type

For example:

    var swiper = new Swiper('.swiper-container', {
      //...
      renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' +
                  ' of ' +
                  '<span class="' + totalClass + '"></span>';
      }
    });

</td>

</tr>

<tr class="subparam-row">

<td>renderProgressbar</td>

<td>function(progressbarFillClass)</td>

<td>null</td>

<td>This parameter allows to customize "progress" pagination. Only for **progress** pagination type

For example:

    var swiper = new Swiper('.swiper-container', {
      //...
      renderProgressbar: function (progressbarFillClass) {
          return '<span class="' + progressbarFillClass + '"></span>';
      }
    });

</td>

</tr>

<tr class="subparam-row">

<td>renderCustom</td>

<td>function(swiper, current, total)</td>

<td>null</td>

<td>This parameter is required for **custom** pagination type where you have to specify how it should be rendered

For example:

    var swiper = new Swiper('.swiper-container', {
      //...
      renderCustom: function (swiper, current, total) {
          return current + ' of ' + total;
      }
    });

</td>

</tr>

<tr class="subparam-row">

<td>bulletClass</td>

<td>string</td>

<td>'swiper-pagination-bullet'</td>

<td>CSS class name of single pagination bullet</td>

</tr>

<tr class="subparam-row">

<td>bulletActiveClass</td>

<td>string</td>

<td>'swiper-pagination-bullet-active'</td>

<td>CSS class name of currently active pagination bullet</td>

</tr>

<tr class="subparam-row">

<td>modifierClass</td>

<td>string</td>

<td>'swiper-pagination-'</td>

<td>The beginning of the modifier CSS class name that will be added to pagination depending on parameters</td>

</tr>

<tr class="subparam-row">

<td>currentClass</td>

<td>string</td>

<td>'swiper-pagination-current'</td>

<td>CSS class name of the element with currently active index in "fraction" pagination</td>

</tr>

<tr class="subparam-row">

<td>totalClass</td>

<td>string</td>

<td>'swiper-pagination-total'</td>

<td>CSS class name of the element with total number of "snaps" in "fraction" pagination</td>

</tr>

<tr class="subparam-row">

<td>hiddenClass</td>

<td>string</td>

<td>'swiper-pagination-hidden'</td>

<td>CSS class name of pagination when it becomes inactive</td>

</tr>

<tr class="subparam-row">

<td>progressbarFillClass</td>

<td>string</td>

<td>'swiper-pagination-progressbar-fill'</td>

<td>CSS class name of pagination progressbar fill element</td>

</tr>

<tr class="subparam-row">

<td>clickableClass</td>

<td>string</td>

<td>'swiper-pagination-clickable'</td>

<td>CSS class name set to pagination when it is clickable</td>

</tr>

<tr class="subparam-row">

<td>lockClass</td>

<td>string</td>

<td>'swiper-pagination-lock'</td>

<td>CSS class name set to pagination when it is disabled</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

#### Pagination Methods & Properties

<table class="methods-table">

<tbody>

<tr>

<th colspan="2">Properties</th>

</tr>

<tr>

<td>mySwiper.pagination.el</td>

<td>HTMLElement of pagination container element</td>

</tr>

<tr>

<td>mySwiper.pagination.bullets</td>

<td>Dom7 array-like collection of pagination bullets HTML elements. To get specific slide HTMLElement use `mySwiper.pagination.bullets[1]`</td>

</tr>

<tr>

<th colspan="2">Methods</th>

</tr>

<tr>

<td>mySwiper.pagination.render();</td>

<td>Render pagination layout</td>

</tr>

<tr>

<td>mySwiper.pagination.update();</td>

<td>Update pagination state (enabled/disabled/active)</td>

</tr>

</tbody>

</table>

#### Pagination Events

<table class="events-table">

<thead>

<tr>

<th>Event name</th>

<th>Arguments</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>paginationRender</td>

<td>swiper, paginationEl</td>

<td>Event will be fired after pagination rendered</td>

</tr>

<tr>

<td>paginationUpdate</td>

<td>swiper, paginationEl</td>

<td>Event will be fired when pagination updated</td>

</tr>

<tr>

<td>paginationHide</td>

<td></td>

<td>Event will be fired on pagination hide</td>

</tr>

<tr>

<td>paginationShow</td>

<td></td>

<td>Event will be fired on pagination show</td>

</tr>

</tbody>

</table>

### Scrollbar



#### Scrollbar Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>scrollbar</td>

<td>object</td>

<td></td>

<td>

Object with scrollbar parameters. For example:

    var mySwiper = new Swiper('.swiper-container', {
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>el</td>

<td>string / HTMLElement</td>

<td>null</td>

<td>String with CSS selector or HTML element of the container with scrollbar.</td>

</tr>

<tr class="subparam-row">

<td>hide</td>

<td>boolean</td>

<td>true</td>

<td>Hide scrollbar automatically after user interaction</td>

</tr>

<tr class="subparam-row">

<td>draggable</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** to enable make scrollbar draggable that allows you to control slider position</td>

</tr>

<tr class="subparam-row">

<td>snapOnRelease</td>

<td>boolean</td>

<td>true</td>

<td>Set to **false** to unsnap slider position to slides when you release scrollbar</td>

</tr>

<tr class="subparam-row">

<td>dragSize</td>

<td>string/number</td>

<td>'auto'</td>

<td>Size of scrollbar draggable element in px</td>

</tr>

<tr class="subparam-row">

<td>lockClass</td>

<td>string</td>

<td>'swiper-scrollbar-lock'</td>

<td>Scrollbar element additional CSS class when it is disabled</td>

</tr>

<tr class="subparam-row">

<td>dragClass</td>

<td>string</td>

<td>'swiper-scrollbar-drag'</td>

<td>Scrollbar draggable element CSS class</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

#### Scrollbar Methods & Properties

<table class="methods-table">

<tbody>

<tr>

<th colspan="2">Properties</th>

</tr>

<tr>

<td>mySwiper.scrollbar.el</td>

<td>HTMLElement of Scrollbar container element</td>

</tr>

<tr>

<td>mySwiper.scrollbar.dragEl</td>

<td>HTMLElement of Scrollbar draggable handler element</td>

</tr>

<tr>

<th colspan="2">Methods</th>

</tr>

<tr>

<td>mySwiper.scrollbar.updateSize();</td>

<td>Updates scrollbar track and handler sizes</td>

</tr>

</tbody>

</table>

### Autoplay



#### Autoplay Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>autoplay</td>

<td>object/boolean</td>

<td></td>

<td>

Object with autoplay parameters or boolean **true** to enable with default settings. For example:

    var mySwiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 5000,
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>delay</td>

<td>number</td>

<td>3000</td>

<td>

Delay between transitions (in ms). If this parameter is not specified, auto play will be disabled

If you need to specify different delay for specific slides you can do it by using `data-swiper-autoplay` (in ms) attribute on slide:

    <!-- hold this slide for 2 seconds -->
    <div class="swiper-slide" data-swiper-autoplay="2000">

</td>

</tr>

<tr class="subparam-row">

<td>stopOnLastSlide</td>

<td>boolean</td>

<td>false</td>

<td>Enable this parameter and autoplay will be stopped when it reaches last slide (has no effect in loop mode)</td>

</tr>

<tr class="subparam-row">

<td>disableOnInteraction</td>

<td>boolean</td>

<td>true</td>

<td>Set to false and autoplay will not be disabled after user interactions (swipes), it will be restarted every time after interaction</td>

</tr>

<tr class="subparam-row">

<td>reverseDirection</td>

<td>boolean</td>

<td>false</td>

<td>Enables autoplay in reverse direction</td>

</tr>

<tr class="subparam-row">

<td>waitForTransition</td>

<td>boolean</td>

<td>true</td>

<td>When enabled autoplay will wait for wrapper transition to continue. Can be disabled in case of using Virtual Translate when your slider may not have transition</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

#### Autoplay Methods & Properties

<table class="methods-table">

<tbody>

<tr>

<th colspan="2">Properties</th>

</tr>

<tr>

<td>mySwiper.autoplay.running</td>

<td>Whether autoplay enabled and running</td>

</tr>

<tr>

<th colspan="2">Methods</th>

</tr>

<tr>

<td>mySwiper.autoplay.start();</td>

<td>Start autoplay</td>

</tr>

<tr>

<td>mySwiper.autoplay.stop();</td>

<td>Stop autoplay</td>

</tr>

</tbody>

</table>

#### Autoplay Events

<table class="events-table">

<thead>

<tr>

<th>Event name</th>

<th>Arguments</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>autoplayStart</td>

<td></td>

<td>Event will be fired in when autoplay started</td>

</tr>

<tr>

<td>autoplayStop</td>

<td></td>

<td>Event will be fired when autoplay stopped</td>

</tr>

<tr>

<td>autoplay</td>

<td></td>

<td>Event will be fired when slide changed with autoplay</td>

</tr>

</tbody>

</table>

### Parallax



Swiper supports parallax transition effects for swiper/slides nested elements. There are two types of parallax elements supported:

*   Direct child elements of `swiper-container`. Parallax effect for such elements will depend on total slider progress. Useful for parallax backgrounds
*   Slides child elements. Parallax effect for such elements will depend on slide progress

To enable parallax effects you need to init Swiper with passed `parallax:true` parameter and add one of the following (or mix) attributes to required elements:

*   `data-swiper-parallax` - enable transform-translate parallax transition. This attribute may accept:
    *   **number** - value in px (as for title, subtitle in example above) to move element depending on progress. In this case such element will be moved on ± this value in px depending on slide position (next or previous)
    *   **percentage** - (as for "parallax-bg") to move element depending on progress and on its size. In this case such element will be moved on ± this percentage of its size (width in horizontal direction, and height in vertical direction) depending on slide position (next or previous). So if element has 400px width and you specified data-swiper-parallax="50%" then it will be moved on ± 200px
*   `data-swiper-parallax-x` - same but for x-axis direction
*   `data-swiper-parallax-y` - same but for y-axis direction
*   `data-swiper-parallax-scale` - scale ratio of the parallax element when it is in "inactive" (not on active slide) state
*   `data-swiper-parallax-opacity` - opacity of the parallax element when it is in "inactive" (not on active slide) state
*   `data-swiper-parallax-duration` - custom transition duration for parallax elements

    <div class="swiper-container">
      <!-- Parallax background element -->
      <div class="parallax-bg" style="background-image:url(path/to/image.jpg)" data-swiper-parallax="-23%">
      </div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <!-- Each slide has parallax title -->
          <div class="title" data-swiper-parallax="-100">Slide 1</div>
          <!-- Parallax subtitle -->
          <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
          <!-- And parallax text with custom transition duration -->
          <div class="text" data-swiper-parallax="-300" data-swiper-parallax-duration="600">
            <p>Lorem ipsum dolor sit amet, ...</p>
          </div>
          <!-- Opacity parallax -->
          <div data-swiper-parallax-opacity="0.5">I will change opacity</div>
          <!-- Scale parallax -->
          <div data-swiper-parallax-scale="0.15">I will change scale</div>
        </div>
        ...
      </div>
    </div>

#### Parallax Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>parallax</td>

<td>boolean</td>

<td>false</td>

<td>Enable, if you want to use "parallaxed" elements inside of slider</td>

</tr>

</tbody>

</table>

### Lazy Loading



To enable lazy loading, first of all we need a special layout for images or elements with background in slides:

    <div class="swiper-container">
      <div class="swiper-wrapper">

        <!-- Lazy image -->
        <div class="swiper-slide">
          <img data-src="path/to/picture-1.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
        </div>

        <!-- Lazy image with srscet-->
        <div class="swiper-slide">
          <img data-src="path/to/logo-small.png" data-srcset="path/logo/logo-large.png 2x" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
        </div>

        <!-- Element with lazy background image -->
        <div class="swiper-slide">
          <div data-background="path/to/picture-2.jpg" class="swiper-lazy">
            <div class="swiper-lazy-preloader"></div>
          </div>
        </div>

        <!-- Lazy background image on slide itself -->
        <div data-background="path/to/picture-3.jpg" class="swiper-slide swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
        </div>
      </div>
    </div>

As you see:

*   Each lazy loaded image/element should have additional "swiper-lazy" class
*   Lazy image source for <img> element should be specified in "data-src" attribute instead of "src"
*   Lazy image source set for <img> element should be specified in "data-srcset" attribute instead of "srcset"
*   Lazy background image source should be specified in "data-background" attribute

You may also add animated preloader spinner to slide which will be removed automatically after image loaded:

    <div class="swiper-lazy-preloader"></div>

Or white-one for dark layout:

    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>

After that we need to enable lazy loading on Swiper initialization:

    var swiper = new Swiper('.swiper-container', {
        // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazy: true
    });

<div class="important-note">

If you use slidesPerView "auto" or slidesPerView > 1, then you should also enable **watchSlidesVisibility** and Swiper will load images in currently visible slides

</div>

#### Lazy Loading Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>lazy</td>

<td>object/boolean</td>

<td></td>

<td>

Enables images lazy loading. Object with lazy loading parameters or boolean **true** to enable with default settings. For example:

    var mySwiper = new Swiper('.swiper-container', {
      lazy: {
        loadPrevNext: true,
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>loadPrevNext</td>

<td>boolean</td>

<td>false</td>

<td>Set to "true" to enable lazy loading for the closest slides images (for previous and next slide images)</td>

</tr>

<tr class="subparam-row">

<td>loadPrevNextAmount</td>

<td>number</td>

<td>1</td>

<td>Amount of next/prev slides to preload lazy images in. Can't be less than `slidesPerView`</td>

</tr>

<tr class="subparam-row">

<td>loadOnTransitionStart</td>

<td>boolean</td>

<td>false</td>

<td>By default, Swiper will load lazy images after transition to this slide, so you may enable this parameter if you need it to start loading of new image in the beginning of transition</td>

</tr>

<tr class="subparam-row">

<td>elementClass</td>

<td>string</td>

<td>'swiper-lazy'</td>

<td>CSS class name of lazy element</td>

</tr>

<tr class="subparam-row">

<td>loadingClass</td>

<td>string</td>

<td>'swiper-lazy-loading'</td>

<td>CSS class name of lazy loading element</td>

</tr>

<tr class="subparam-row">

<td>loadedClass</td>

<td>string</td>

<td>'swiper-lazy-loaded'</td>

<td>CSS class name of lazy loaded element</td>

</tr>

<tr class="subparam-row">

<td>preloaderClass</td>

<td>string</td>

<td>'swiper-lazy-preloader'</td>

<td>CSS class name of lazy preloader</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

#### Lazy Loading Methods & Properties

<table class="methods-table">

<tbody>

<tr>

<th colspan="2">Methods</th>

</tr>

<tr>

<td>mySwiper.lazy.load();</td>

<td>Load/update lazy images based on current slider state (position)</td>

</tr>

<tr>

<td>mySwiper.lazy.loadInSlide(<span>index</span>);</td>

<td>Force to load lazy images in slide by specified index

*   <span class="parameter">index</span> - <span class="parameter-type">number</span> - index number of slide to load lazy images in

</td>

</tr>

</tbody>

</table>

#### Lazy Loading Events

<table class="events-table">

<thead>

<tr>

<th>Event name</th>

<th>Arguments</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>lazyImageLoad</td>

<td>slideEl, imageEl</td>

<td>Event will be fired in the beginning of lazy loading of image</td>

</tr>

<tr>

<td>lazyImageReady</td>

<td>slideEl, imageEl</td>

<td>Event will be fired when lazy loading image will be loaded</td>

</tr>

</tbody>

</table>

### Fade Effect



#### Fade Effect Parameters

Be sure to have the `effect` param set to `fade` in order for this to work.

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>fadeEffect</td>

<td>object</td>

<td></td>

<td>

Object with Fade-effect parameters. For example:

    var mySwiper = new Swiper('.swiper-container', {
      fadeEffect: {
        crossFade: true
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>crossFade</td>

<td>boolean</td>

<td>false</td>

<td>Enables slides cross fade</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

### Coverflow Effect



#### Coverflow Effect Parameters

Be sure to have the `effect` param set to `coverflow` in order for this to work.

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>coverflowEffect</td>

<td>object</td>

<td></td>

<td>

Object with Coverflow-effect parameters. For example:

    var mySwiper = new Swiper('.swiper-container', {
      coverflowEffect: {
        rotate: 30,
        slideShadows: false,
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>slideShadows</td>

<td>boolean</td>

<td>true</td>

<td>Enables slides shadows</td>

</tr>

<tr class="subparam-row">

<td>rotate</td>

<td>number</td>

<td>50</td>

<td>Slide rotate in degrees</td>

</tr>

<tr class="subparam-row">

<td>stretch</td>

<td>number</td>

<td>0</td>

<td>Stretch space between slides (in px)</td>

</tr>

<tr class="subparam-row">

<td>depth</td>

<td>number</td>

<td>100</td>

<td>Depth offset in px (slides translate in Z axis)</td>

</tr>

<tr class="subparam-row">

<td>modifier</td>

<td>number</td>

<td>1</td>

<td>Effect multipler</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

### Flip Effect



#### Flip Effect Parameters

Be sure to have the `effect` param set to `flip` in order for this to work.

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>flipEffect</td>

<td>object</td>

<td></td>

<td>

Object with Flip-effect parameters. For example:

    var mySwiper = new Swiper('.swiper-container', {
      flipEffect: {
        rotate: 30,
        slideShadows: false,
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>slideShadows</td>

<td>boolean</td>

<td>true</td>

<td>Enables slides shadows</td>

</tr>

<tr class="subparam-row">

<td>limitRotation</td>

<td>boolean</td>

<td>true</td>

<td>Limit edge slides rotation</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

### Cube Effect



#### Cube Effect Parameters

Be sure to have the `effect` param set to `cube` in order for this to work.

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>cubeEffect</td>

<td>object</td>

<td></td>

<td>

Object with Cube-effect parameters. For example:

    var mySwiper = new Swiper('.swiper-container', {
      cubeEffect: {
        slideShadows: false,
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>slideShadows</td>

<td>boolean</td>

<td>true</td>

<td>Enables slides shadows</td>

</tr>

<tr class="subparam-row">

<td>shadow</td>

<td>boolean</td>

<td>true</td>

<td>Enables main slider shadow</td>

</tr>

<tr class="subparam-row">

<td>shadowOffset</td>

<td>number</td>

<td>20</td>

<td>Main shadow offset in px</td>

</tr>

<tr class="subparam-row">

<td>shadowScale</td>

<td>number</td>

<td>0.94</td>

<td>Main shadow scale ratio</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

### Thumbs



In addition to [Controller](#controller) component Swiper comes with Thumbs component that is designed to work with additional thumbs swiper in a more correct way than Controller which is used for syncing two swipers.

#### Thumbs Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>thumbs</td>

<td>object</td>

<td></td>

<td>

Object with thumbs component parameters. For example:

    var mySwiper = new Swiper('.swiper-container', {
      ...
      thumbs: {
        swiper: thumbsSwiper
      }
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>swiper</td>

<td>object
Swiper</td>

<td></td>

<td>Swiper instance of swiper used as thumbs or object with Swiper parameters to initialize thumbs swiper. For example:

    var thumbsSwiper = new Swiper('.swiper-container-thumbs', {
      slidesPerView: 5,
    });

    var mySwiper = new Swiper('.swiper-container', {
      ...
      thumbs: {
        swiper: thumbsSwiper
      }
    });

or

    var mySwiper = new Swiper('.swiper-container', {
      ...
      thumbs: {
        swiper: {
          el: '.swiper-container-thumbs',
          slidesPerView: 5,
          ...
        }
      }
    });

</td>

</tr>

<tr class="subparam-row">

<td>slideThumbActiveClass</td>

<td>string</td>

<td>'swiper-slide-thumb-active'</td>

<td>Additional class that will be added to activated thumbs swiper slide</td>

</tr>

<tr class="subparam-row">

<td>thumbsContainerClass</td>

<td>string</td>

<td>'swiper-container-thumbs'</td>

<td>Additional class that will be added to thumbs swiper-container</td>

</tr>

<tr class="subparam-row">

<td>multipleActiveThumbs</td>

<td>boolean</td>

<td>true</td>

<td>When enabled multiple thumbnail slides may get activated</td>

</tr>

<tr class="subparam-row">

<td>autoScrollOffset</td>

<td>number</td>

<td>0</td>

<td>Allows to set on which thumbs active slide from edge it should automaticall move scroll thumbs. For example, if set to `1` and last visible thumb will be activated (1 from edge) it will auto scroll thumbs</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

#### Thumbs Methods & Properties

<table class="methods-table">

<tbody>

<tr>

<th colspan="2">Properties</th>

</tr>

<tr>

<td>mySwiper.thumbs.swiper</td>

<td>Swiper instance of thumbs swiper</td>

</tr>

</tbody>

</table>

### Zoom



Swiper supports zoom images functionality (similar to what you see on iOS when browsing single photo) where you can zoom-in image by pinch gesture and or by zoom-in/out by double tap on it. In this case, additional layout is required:

    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="swiper-zoom-container">
                    <img src="path/to/image1.jpg">
                </div>
            </div>
            <div class="swiper-slide">
                <div class="swiper-zoom-container">
                    <img src="path/to/image2.jpg">
                </div>
            </div>
            <div class="swiper-slide">Plain slide with text</div>
            <div class="swiper-slide">
                <!-- Override maxRatio parameter -->
                <div class="swiper-zoom-container" data-swiper-zoom="5">
                    <img src="path/to/image1.jpg">
                </div>
            </div>
        </div>
    </div>

*   All "zoomable" images should be wrapped with the div with `swiper-zoom-container` class.

*   By default it expects to zoom one of the `img`, `picture` or `canvas` element. If you want to make zoom on some other custom element, then just add `swiper-zoom-target` class to this element. For example:

        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="swiper-zoom-container">
                <!-- custom zoomable element -->
                <div class="swiper-zoom-target" style="background-image: url(...)"></div>
              </div>
            </div>
        </div>

*   You can override `maxRatio` parameter for specific slides by using `data-swiper-zoom` attribute on zoom container.

#### Zoom Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>zoom</td>

<td>object/boolean</td>

<td></td>

<td>

Enables zooming functionality. Object with zoom parameters or boolean **true** to enable with default settings. For example:

    var mySwiper = new Swiper('.swiper-container', {
      zoom: {
        maxRatio: 5,
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>maxRatio</td>

<td>number</td>

<td>3</td>

<td>Maximum image zoom multiplier</td>

</tr>

<tr class="subparam-row">

<td>minRatio</td>

<td>number</td>

<td>1</td>

<td>Minimal image zoom multiplier</td>

</tr>

<tr class="subparam-row">

<td>toggle</td>

<td>boolean</td>

<td>true</td>

<td>Enable/disable zoom-in by slide's double tap</td>

</tr>

<tr class="subparam-row">

<td>containerClass</td>

<td>string</td>

<td>'swiper-zoom-container'</td>

<td>CSS class name of zoom container</td>

</tr>

<tr class="subparam-row">

<td>zoomedSlideClass</td>

<td>string</td>

<td>'swiper-slide-zoomed'</td>

<td>CSS class name of zoomed in container</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

#### Zoom Methods & Properties

<table class="methods-table">

<tbody>

<tr>

<th colspan="2">Properties</th>

</tr>

<tr>

<td>mySwiper.zoom.enabled</td>

<td>Whether the zoom module is enabled</td>

</tr>

<tr>

<td>mySwiper.zoom.scale</td>

<td>Current image scale ratio</td>

</tr>

<tr>

<th colspan="2">Methods</th>

</tr>

<tr>

<td>mySwiper.zoom.enable();</td>

<td>Enable zoom module</td>

</tr>

<tr>

<td>mySwiper.zoom.disable();</td>

<td>Disable zoom module</td>

</tr>

<tr>

<td>mySwiper.zoom.in();</td>

<td>Zoom in image of the currently active slide</td>

</tr>

<tr>

<td>mySwiper.zoom.out();</td>

<td>Zoom out image of the currently active slide</td>

</tr>

<tr>

<td>mySwiper.zoom.toggle();</td>

<td>Toggle image zoom of the currently active slide</td>

</tr>

</tbody>

</table>

#### Zoom Events

<table class="events-table">

<thead>

<tr>

<th>Event name</th>

<th>Arguments</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>zoomChange</td>

<td>scale, imageEl, slideEl</td>

<td>Event will be fired when zoom changes</td>

</tr>

</tbody>

</table>

### Keyboard Control



#### Keyboard Control Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>keyboard</td>

<td>object/boolean</td>

<td>false</td>

<td>

Enables navigation through slides using keyboard. Object with keyboard parameters or boolean **true** to enable with default settings. For example:

    var mySwiper = new Swiper('.swiper-container', {
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>enabled</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** to enable keyboard control</td>

</tr>

<tr class="subparam-row">

<td>onlyInViewport</td>

<td>boolean</td>

<td>true</td>

<td>When enabled it will control sliders that are currently in viewport</td>

</tr>

<tr class="subparam-row">

<td>pageUpDown</td>

<td>boolean</td>

<td>true</td>

<td>When enabled it will enable keyboard navigation by Page Up and Page Down keys</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

#### Keyboard Methods & Properties

<table class="methods-table">

<tbody>

<tr>

<th colspan="2">Properties</th>

</tr>

<tr>

<td>mySwiper.keyboard.enabled</td>

<td>Whether the keyboard control is enabled</td>

</tr>

<tr>

<th colspan="2">Methods</th>

</tr>

<tr>

<td>mySwiper.keyboard.enable();</td>

<td>Enable keyboard control</td>

</tr>

<tr>

<td>mySwiper.keyboard.disable();</td>

<td>Disable keyboard control</td>

</tr>

</tbody>

</table>

### Mousewheel Control



#### Mousewheel Control Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>mousewheel</td>

<td>object/boolean</td>

<td>false</td>

<td>

Enables navigation through slides using mouse wheel. Object with mousewheel parameters or boolean **true** to enable with default settings. For example:

    var mySwiper = new Swiper('.swiper-container', {
      mousewheel: {
        invert: true,
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>forceToAxis</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** to force mousewheel swipes to axis. So in horizontal mode mousewheel will work only with horizontal mousewheel scrolling, and only with vertical scrolling in vertical mode.</td>

</tr>

<tr class="subparam-row">

<td>releaseOnEdges</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** and swiper will release mousewheel event and allow page scrolling when swiper is on edge positions (in the beginning or in the end)</td>

</tr>

<tr class="subparam-row">

<td>invert</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** to invert sliding direction</td>

</tr>

<tr class="subparam-row">

<td>sensitivity</td>

<td>number</td>

<td>1</td>

<td>Multiplier of mousewheel data, allows to tweak mouse wheel sensitivity</td>

</tr>

<tr class="subparam-row">

<td>eventsTarget</td>

<td>string / HTMLElement</td>

<td>'container'</td>

<td>String with CSS selector or HTML element of the container accepting mousewheel events. By default it is swiper-container</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

#### Mousewheel Methods & Properties

<table class="methods-table">

<tbody>

<tr>

<th colspan="2">Properties</th>

</tr>

<tr>

<td>mySwiper.mousewheel.enabled</td>

<td>Whether the mousewheel control is enabled</td>

</tr>

<tr>

<th colspan="2">Methods</th>

</tr>

<tr>

<td>mySwiper.mousewheel.enable();</td>

<td>Enable mousewheel control</td>

</tr>

<tr>

<td>mySwiper.mousewheel.disable();</td>

<td>Disable mousewheel control</td>

</tr>

</tbody>

</table>

### Virtual Slides



Virtual Slides module allows to keep just required amount of slides in DOM. It is very useful in terms in performance and memory issues if you have a lot of slides, especially slides with heavyweight DOM tree or images.

<div class="important-note">

Note that according to Virtual Slides realization it **doesn't work** with `loop` mode, `slidesPerColumn` more than 1 and `slidesPerView: 'auto'`

</div>

#### Virtual Slides Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>virtual</td>

<td>object/boolean</td>

<td></td>

<td>

Enables virtual slides functionality. Object with virtual slides parameters or boolean **true** to enable with default settings. For example:

    var mySwiper = new Swiper('.swiper-container', {
      virtual: {
        slides: ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'],
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>slides</td>

<td>array</td>

<td>[]</td>

<td>Array with slides</td>

</tr>

<tr class="subparam-row">

<td>cache</td>

<td>boolean</td>

<td>true</td>

<td>Enables DOM cache of rendering slides html elements. Once they are rendered they will be saved to cache and reused from it.</td>

</tr>

<tr class="subparam-row">

<td>renderSlide</td>

<td>function(<span>slide</span>, <span>index</span>)</td>

<td>null</td>

<td>Function to render slide. As an argument it accepts current slide item for `slides` array and index number of the current slide. Function must return an outter HTML of the swiper slide.</td>

</tr>

<tr class="subparam-row">

<td>renderExternal</td>

<td>function(data)</td>

<td>null</td>

<td>Function for external rendering (e.g. using some other library to handle DOM manipulations and state like React.js or Vue.js). As an argument it accepts data object with the following properties:

*   `offset` - slides left/top offset in px
*   `from` - index of first slide required to be rendered
*   `to` - index of last slide required to be rendered
*   `slides` - array with slide items to be rendered

</td>

</tr>

<tr class="subparam-row">

<td>addSlidesBefore</td>

<td>number</td>

<td>0</td>

<td>Increases amount of pre-rendered slides before active slide</td>

</tr>

<tr class="subparam-row">

<td>addSlidesAfter</td>

<td>number</td>

<td>0</td>

<td>Increases amount of pre-rendered slides after active slide</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

#### Virtual Slides Methods & Properties

<table class="methods-table">

<tbody>

<tr>

<th colspan="2">Properties</th>

</tr>

<tr>

<td>mySwiper.virtual.cache</td>

<td>Object with cached slides HTML elements</td>

</tr>

<tr>

<td>mySwiper.virtual.from</td>

<td>Index of first rendered slide</td>

</tr>

<tr>

<td>mySwiper.virtual.to</td>

<td>Index of last rendered slide</td>

</tr>

<tr>

<td>mySwiper.virtual.slides</td>

<td>Array with slide items passed by `virtual.slides` parameter</td>

</tr>

<tr>

<th colspan="2">Methods</th>

</tr>

<tr>

<td>mySwiper.virtual.appendSlide(<span>slides</span>);</td>

<td>Append slide. `slides` can be a single slide item or array with such slides.</td>

</tr>

<tr>

<td>mySwiper.virtual.prependSlide(<span>slides</span>);</td>

<td>Prepend slide. `slides` can be a single slide item or array with such slides.</td>

</tr>

<tr>

<td>mySwiper.virtual.removeSlide(<span>slideIndexes</span>);</td>

<td>Remove specific slide or slides. `slideIndexes` can be a number with slide index to remove or array with indexes.</td>

</tr>

<tr>

<td>mySwiper.virtual.removeAllSlides();</td>

<td>Remove all slides.</td>

</tr>

<tr>

<td>mySwiper.virtual.update();</td>

<td>Update virutal slides state.</td>

</tr>

</tbody>

</table>

#### renderExternal Example

`renderExternal` allows to bypass slides rendering to other libraries, and can be super handy with libraries like React.js and Vue.js

With **Vue.js**

    <template>
      <!-- ... -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- It is important to set "left" style prop on every slide -->
          <div class="swiper-slide"
            v-for="(slide, index) in virtualData.slides"
            :key="index"
            :style="{left: `${virtualData.offset}px`}"
          >{{slide}}</div>
        </div>
      </div>
      <!-- ... -->
    </template>
    <script>
      import Swiper from 'swiper/js/swiper.esm.bundle';

      export default {
        data() {
          return {
            // dummy slides data
            slides: (function () {
              var slides = [];
              for (var i = 0; i < 600; i += 1) {
                slides.push('Slide ' + (i + 1));
              }
              return slides;
            }()),
            // virtual data
            virtualData: {
              slides: [],
            },
          }
        },
        mounted() {
          const self = this;
          const swiper = new Swiper('.swiper-container', {
            // ...
            virtual: {
              slides: self.slides,
              renderExternal(data) {
                // assign virtual slides data
                self.virtualData = data;
              },
            },
          });
        },
      };
    </script>

With **React.js**

    import React from 'react';
    import Swiper from 'swiper/js/swiper.esm.bundle';

    export default class extends React.Component {
      constructor() {
        this.state = {
          // dummy slides data
          slides: (function () {
            var slides = [];
            for (var i = 0; i < 600; i += 1) {
              slides.push('Slide ' + (i + 1));
            }
            return slides;
          }()),
          // virtual data
          virtualData: {
            slides: [],
          },
        }
      }
      componentDidMount() {
        const self = this;
        const swiper = new Swiper('.swiper-container', {
          // ...
          virtual: {
            slides: self.state.slides,
            renderExternal(data) {
              // assign virtual slides data
              self.setState({
                virtualData: data,
              });
            }
          },
        });
      }
      render() {
        {/* ... */}
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {/* It is important to set "left" style prop on every slide */}
            {this.state.virtualData.slides.map((slide, index) => (
              <div className="swiper-slide"
                key={index}
                style={{left: `${virtualData.offset}px`}}
              >{slide}</div>
            ))}
          </div>
        </div>
        {/* ... */}
      }
    }

### Hash Navigation



Hash navigation is intended to have a link to specific slide that allows to load page with specific slide opened.

To make it work, you need to enable it by passing `hashNavigation:true` parameter and adding slides hashes in `data-hash` attribute:

    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" data-hash="slide1">Slide 1</div>
            <div class="swiper-slide" data-hash="slide2">Slide 2</div>
            <div class="swiper-slide" data-hash="slide3">Slide 3</div>
            <div class="swiper-slide" data-hash="slide4">Slide 4</div>
            <div class="swiper-slide" data-hash="slide5">Slide 5</div>
            ...
        </div>
    </div>

    var swiper = new Swiper('.swiper-container', {
      //enable hash navigation
      hashNavigation: true
    })

#### Hash Navigation Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>hashNavigation</td>

<td>object/boolean</td>

<td></td>

<td>

Enables hash url navigation to for slides. Object with hash navigation parameters or boolean **true** to enable with default settings. For example:

    var mySwiper = new Swiper('.swiper-container', {
      hashNavigation: {
        replaceState: true,
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>watchState</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** to enable also navigation through slides (when hashnav is enabled) by browser history or by setting directly hash on document location</td>

</tr>

<tr class="subparam-row">

<td>replaceState</td>

<td>boolean</td>

<td>false</td>

<td>Works in addition to hashnav to replace current url state with the new one instead of adding it to history</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

#### Hash Navigation Events

<table class="events-table">

<thead>

<tr>

<th>Event name</th>

<th>Arguments</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>hashChange</td>

<td></td>

<td>Event will be fired on window hash change</td>

</tr>

<tr>

<td>hashSet</td>

<td></td>

<td>Event will be fired when swiper updates the hash</td>

</tr>

</tbody>

</table>

### History Navigation



#### History Navigation Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>history</td>

<td>object/boolean</td>

<td></td>

<td>

Enables history push state where every slide will have its own url. In this parameter you have to specify main slides url like **"slides"** and specify every slide url using `data-history` attribute.

Object with history navigation parameters or boolean **true** to enable with default settings. For example:

    var mySwiper = new Swiper('.swiper-container', {
      history: {
        replaceState: true,
      },
    });

    <!-- will produce "slides/slide1" url in browser history -->
    <div class="swiper-slide" data-history="slide1"></div>

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>replaceState</td>

<td>boolean</td>

<td>false</td>

<td>Works in addition to hashnav or history to replace current url state with the new one instead of adding it to history</td>

</tr>

<tr class="subparam-row">

<td>key</td>

<td>string</td>

<td>'slides'</td>

<td>Url key for slides</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

### Controller



#### Controller Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>controller</td>

<td>object/boolean</td>

<td></td>

<td>

Object with controller parameters or boolean **true** to enable with default settings. For example:

    var mySwiper = new Swiper('.swiper-container', {
      controller: {
        inverse: true,
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>control</td>

<td>[Swiper Instance]</td>

<td>undefined</td>

<td>Pass here another Swiper instance or array with Swiper instances that should be controlled by this Swiper</td>

</tr>

<tr class="subparam-row">

<td>inverse</td>

<td>boolean</td>

<td>false</td>

<td>Set to **true** and controlling will be in inverse direction</td>

</tr>

<tr class="subparam-row">

<td>by</td>

<td>string</td>

<td>'slide'</td>

<td>Can be `'slide'` or `'container'`. Defines a way how to control another slider: slide by slide (with respect to other slider's grid) or depending on all slides/container (depending on total slider percentage)</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

### Accessibility (a11y)



#### Accessibility Parameters

<table class="params-table">

<thead>

<tr>

<th>Parameter</th>

<th>Type</th>

<th>Default</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>a11y</td>

<td>object/boolean</td>

<td></td>

<td>

Object with a11y parameters or boolean **true** to enable with default settings. For example:

    var mySwiper = new Swiper('.swiper-container', {
      a11y: {
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      },
    });

</td>

</tr>

<tr class="subparam-open-row">

<td colspan="4">{</td>

</tr>

<tr class="subparam-row">

<td>enabled</td>

<td>boolean</td>

<td>true</td>

<td>Enables A11y</td>

</tr>

<tr class="subparam-row">

<td>prevSlideMessage</td>

<td>string</td>

<td>'Previous slide'</td>

<td>Message for screen readers for previous button</td>

</tr>

<tr class="subparam-row">

<td>nextSlideMessage</td>

<td>string</td>

<td>'Next slide'</td>

<td>Message for screen readers for next button</td>

</tr>

<tr class="subparam-row">

<td>firstSlideMessage</td>

<td>string</td>

<td>'This is the first slide'</td>

<td>Message for screen readers for previous button when swiper is on first slide</td>

</tr>

<tr class="subparam-row">

<td>lastSlideMessage</td>

<td>string</td>

<td>'This is the last slide'</td>

<td>Message for screen readers for previous button when swiper is on last slide</td>

</tr>

<tr class="subparam-row">

<td>paginationBulletMessage</td>

<td>string</td>

<td>'Go to slide {{index}}'</td>

<td>Message for screen readers for single pagination bullet</td>

</tr>

<tr class="subparam-row">

<td>notificationClass</td>

<td>string</td>

<td>'swiper-notification'</td>

<td>CSS class name of a11y notification</td>

</tr>

<tr class="subparam-close-row">

<td colspan="4">}</td>

</tr>

</tbody>

</table>

## Custom Build



You have two options of making custom version of Swiper.

### 1\. Using ES-module

If you use bundler with ES-modules support in your project you can import only the modules you need:

    // Import Swiper and modules
    import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper/js/swiper.esm.js';

    // Install modules
    Swiper.use([Navigation, Pagination, Scrollbar]);

    // Now you can use Swiper
    var swiper = new Swiper('.swiper-container', {
      speed: 500,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // ...
    });

The following modules are exported from `swiper.esm.js`:

*   `Swiper` - core library
*   `Virtual` - Virtual Slides module
*   `Keyboard` - Keyboard Control module
*   `Mousewheel` - Mousewheel Control module
*   `Navigation` - Navigation module
*   `Pagination` - Pagination module
*   `Scrollbar` - Scrollbar module
*   `Parallax` - Parallax module
*   `Zoom` - Zoom module
*   `Lazy` - Lazy module
*   `Controller` - Controller module
*   `A11y` - Accessibility module
*   `History` - History Navigation module
*   `HashNavigation` - Hash Navigation module
*   `Autoplay` - Autoplay module
*   `EffectFade` - Fade Effect module
*   `EffectCube` - Cube Effect module
*   `EffectFlip` - Flip Effect module
*   `EffectCoverflow` - Coverflow Effect module

### 2\. Using Build Script

Swiper comes with gulp builder that allows to build custom library version where you may include only required modules. We need the following:

1.  Download and unzip Swiper GitHub repository to local folder
2.  Install Node.js (if not installed)
3.  Install Gulp (if not installed) by executing the following command in terminal:

        $ npm install --global gulp

4.  Now, we need to install required dependencies. Go to the folder with downloaded and unzipped Swiper repository and execute in terminal:

        $ npm install

5.  Open `scripts/build-config.js` file:

        module.exports = {
          // remove components you don't need
          components: [
            'virtual',
            'keyboard',
            'mousewheel',
            'navigation',
            'pagination',
            'scrollbar',
            'parallax',
            'zoom',
            'lazy',
            'controller',
            'a11y',
            'history',
            'hash-navigation',
            'autoplay',
            'effect-fade',
            'effect-cube',
            'effect-flip',
            'effect-coverflow',
          ],
          // target device, can be "desktop" or "universal"
          target: 'universal',
          // default color of navigation elements
          themeColor: '#007aff',
          // additional color to be included
          colors: {
            white: '#ffffff',
            black: '#000000',
          },
        };

6.  Now, we are ready to build custom version of Swiper:

        $ npm run build:prod

7.  That is all. Generated CSS and JS files and their minified versions will be available in `package/` folder.
