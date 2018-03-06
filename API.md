# Swiper API

## Swiper Full HTML Layout

<pre><code>
&lt;!-- Slider main container --&gt;
  &lt;div class="swiper-container"&gt;
  &lt;!-- Additional required wrapper --&gt;
  &lt;div class="swiper-wrapper"&gt;
    &lt;!-- Slides --&gt;
    &lt;div class="swiper-slide"&gt;Slide 1&lt;/div&gt;
    &lt;div class="swiper-slide"&gt;Slide 2&lt;/div&gt;
    &lt;div class="swiper-slide"&gt;Slide 3&lt;/div&gt;
    ...
  &lt;/div&gt;
  &lt;!-- If we need pagination --&gt;
  &lt;div class="swiper-pagination"&gt;&lt;/div&gt;

  &lt;!-- If we need navigation buttons --&gt;
  &lt;div class="swiper-button-prev"&gt;&lt;/div&gt;
  &lt;div class="swiper-button-next"&gt;&lt;/div&gt;

  &lt;!-- If we need scrollbar --&gt;
  &lt;div class="swiper-scrollbar"&gt;&lt;/div&gt;
&lt;/div&gt;
</code></pre>

## Initialize Swiper

<p>Now, when we have Swiper's HTML, we need to initialize it using the following function:</p>
<div class="method-wrap">
  <p><span class="method">new Swiper(<span>swiperContainer</span>, <span>parameters</span>) </span><span>- initialize swiper with options</span></p>
  <ul class="method-parameters">
    <li><span class="parameter">swiperContainer</span> - <span class="parameter-type">HTMLElement</span> or <span class="parameter-type">string</span> (with CSS Selector) of swiper container HTML element. Required.</li>
    <li><span class="parameter">parameters</span> - <span class="parameter-type">object</span> - object with Swiper parameters. Optional.</li>
    <li class="method-returns"><strong>Method returns initialized Swiper instance</strong></li>
  </ul>
</div>
<p>For example:</p>
<pre><code>var mySwiper = new Swiper('.swiper-container', {
  speed: 400,
  spaceBetween: 100
});   </code></pre>

## Swiper Parameters

<p>Let's look on list of all available parameters:</p>
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
      <td> </td>
      <td>Swiper width (in px). Parameter allows to force Swiper width. Useful <b>only</b> if you initialize Swiper when it is hidden.
        <div class="important-note">Setting this parameter will make Swiper not responsive</div>
      </td>
    </tr>
    <tr>
      <td>height</td>
      <td>number</td>
      <td> </td>
      <td>Swiper height (in px). Parameter allows to force Swiper height. Useful <b>only</b> if you initialize Swiper when it is hidden.
        <div class="important-note">Setting this parameter will make Swiper not responsive</div>
      </td>
    </tr>
    <tr>
      <td>autoHeight</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> and slider wrapper will adopt its height to the height of the currently active slide</td>
    </tr>
    <tr>
      <td>roundLengths</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> to round values of slides width and height to prevent blurry texts on usual resolution screens (if you have such)</td>
    </tr>
    <tr>
      <td>nested</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> on nested Swiper for correct touch events interception. Use only on nested swipers that use same direction as the parent one</td>
    </tr>
    <tr>
      <th colspan="4">Autoplay</th>
    </tr>
    <tr>
      <td>autoplay</td>
      <td>number</td>
      <td>-</td>
      <td>
        <p>Delay between transitions (in ms). If this parameter is not specified, auto play will be disabled</p>
        <p>If you need to specify different delay for specifi slides you can do it by using <code>data-swiper-autoplay</code> (in ms) attribute on slide:</p>
        <pre><code>&lt;!-- hold this slide for 2 seconds --&gt;
&lt;div class="swiper-slide" data-swiper-autoplay="2000"&gt;</code></pre>
      </td>
    </tr>
    <tr>
      <td>autoplayStopOnLast</td>
      <td>boolean</td>
      <td>false</td>
      <td>Enable this parameter and autoplay will be stopped when it reaches last slide (has no effect in loop mode)</td>
    </tr>
    <tr>
      <td>autoplayDisableOnInteraction</td>
      <td>boolean</td>
      <td>true</td>
      <td>Set to false and autoplay will not be disabled after user interactions (swipes), it will be restarted every time after interaction</td>
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
      <td><code>watchSlidesProgress</code> should be enabled. Enable this option and slides that are in viewport will have additional visible class</td>
    </tr>
    <tr>
      <th colspan="4">Freemode</th>
    </tr>
    <tr>
      <td>freeMode</td>
      <td>boolean</td>
      <td>false</td>
      <td>If <b>true</b> then slides will not have fixed positions</td>
    </tr>
    <tr>
      <td>freeModeMomentum</td>
      <td>boolean</td>
      <td>true</td>
      <td>If <b>true</b>, then slide will keep moving for a while after you release it</td>
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
      <td>Set to <b>false</b> if you want to disable momentum bounce in free mode</td>
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
      <td>Set to <b>true</b> to enable snap to slides positions in free mode</td>
    </tr>
    <tr>
      <th colspan="4">Effects</th>
    </tr>
    <tr>
      <td>effect</td>
      <td>string</td>
      <td>'slide'</td>
      <td>Could be "slide", "fade", "cube", "coverflow" or "flip"</td>
    </tr>
    <tr>
      <td>fade</td>
      <td>object</td>
      <td>
        <pre><code>fade: {
crossFade: false
}</code></pre>
      </td>
      <td>Fade effect parameters</td>
    </tr>
    <tr>
      <td>cube</td>
      <td>object</td>
      <td>
        <pre><code>cube: {
slideShadows: true,
shadow: true,
shadowOffset: 20,
shadowScale: 0.94
}</code></pre>
      </td>
      <td>Cube effect parameters. For better performance you may disable shadows</td>
    </tr>
    <tr>
      <td>coverflow</td>
      <td>object</td>
      <td>
        <pre><code>coverflow: {
rotate: 50,
stretch: 0,
depth: 100,
modifier: 1,
slideShadows : true
}</code></pre>
      </td>
      <td>Coverflow effect parameters. For better performance you may disable shadows</td>
    </tr>
    <tr>
      <td>flip</td>
      <td>object</td>
      <td>
        <pre><code>flip: {
slideShadows : true
limitRotation: true
}</code></pre>
      </td>
      <td>Flip effect parameters. <code>limitRotation</code> (when enabled) limits slides rotation angle to 180deg maximum. It allows to quickly "flip" between different slides. If you use "slow" transitions then it is better to disable it.</td>
    </tr>
    <tr>
      <th colspan="4">Parallax</th>
    </tr>
    <tr>
      <td>parallax</td>
      <td>boolean</td>
      <td>false</td>
      <td>Enable, if you want to use "parallaxed" elements inside of slider</td>
    </tr>
    <tr>
      <th colspan="4">Slides grid</th>
    </tr>
    <tr>
      <td>spaceBetween</td>
      <td>number</td>
      <td>0</td>
      <td>Distance between slides in px.</td>
    </tr>
    <tr>
      <td>slidesPerView</td>
      <td>number or 'auto'</td>
      <td>1</td>
      <td>
        <p>Number of slides per view (slides visible at the same time on slider's container).</p>
        <p class="important-note">If you use it with "auto" value and along with <b>loop: true</b> then you need to specify <b>loopedSlides</b> parameter with amount of slides to loop (duplicate)</p>
        <p class="important-note"><b>slidesPerView: 'auto'</b> is currently not compatible with multirow mode, when <b>slidesPerColumn</b> > 1 </p>
      </td>
    </tr>
    <tr>
      <td>slidesPerColumn</td>
      <td>number</td>
      <td>1</td>
      <td>Number of slides per column, for multirow layout</td>
    </tr>
    <tr>
      <td>slidesPerColumnFill</td>
      <td>string</td>
      <td>'column'</td>
      <td>Could be 'column' or 'row'. Defines how slides should fill rows, by column or by row</td>
    </tr>
    <tr>
      <td>slidesPerGroup</td>
      <td>number</td>
      <td>1</td>
      <td>Set numbers of slides to define and enable group sliding. Useful to use with slidesPerView &gt; 1</td>
    </tr>
    <tr>
      <td>centeredSlides</td>
      <td>boolean</td>
      <td>false</td>
      <td>If true, then active slide will be centered, not always on the left side.</td>
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
      <th colspan="4">Grab Cursor</th>
    </tr>
    <tr>
      <td>grabCursor</td>
      <td>boolean</td>
      <td>false</td>
      <td>This option may a little improve desktop usability. If <b>true</b>, user will see the "grab" cursor when hover on Swiper</td>
    </tr>
    <tr>
      <th colspan="4">Touches</th>
    </tr>
    <tr>
      <td>touchEventsTarget</td>
      <td>string</td>
      <td>'container'</td>
      <td>Target element to listen touch events on. Can be <b>'container'</b> (to listen for touch events on swiper-container) or <b>'wrapper'</b> (to listen for touch events on swiper-wrapper)</td>
    </tr>
    <tr>
      <td>touchRatio</td>
      <td>number</td>
      <td>1</td>
      <td>Touch ration</td>
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
      <td>Set to <b>false</b> if you want to disable short swipes</td>
    </tr>
    <tr>
      <td>longSwipes</td>
      <td>boolean</td>
      <td>true</td>
      <td>Set to <b>false</b> if you want to disable long swipes</td>
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
      <td>onlyExternal</td>
      <td>boolean</td>
      <td>false</td>
      <td>If true, then the only way to switch the slide is use of external API functions like slidePrev or slideNext</td>
    </tr>
    <tr>
      <td>threshold</td>
      <td>number</td>
      <td>0</td>
      <td>Threshold value in px. If "touch distance" will be lower than this value then swiper will not move</td>
    </tr>
    <tr>
      <td>touchMoveStopPropagation</td>
      <td>boolean</td>
      <td>true</td>
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
      <td>Set to <b>false</b> if you want to disable resistant bounds</td>
    </tr>
    <tr>
      <td>resistanceRatio</td>
      <td>number</td>
      <td>0.85</td>
      <td>This option allows you to control resistance ratio</td>
    </tr>
    <tr>
      <th colspan="4">Clicks</th>
    </tr>
    <tr>
      <td>preventClicks</td>
      <td>boolean</td>
      <td>true</td>
      <td>Set to <b>true</b> to prevent accidental unwanted clicks on links during swiping</td>
    </tr>
    <tr>
      <td>preventClicksPropagation</td>
      <td>boolean</td>
      <td>true</td>
      <td>Set to <b>true</b> to stop clicks event propagation on links during swiping</td>
    </tr>
    <tr>
      <td>slideToClickedSlide</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> and click on any slide will produce transition to this slide</td>
    </tr>
    <tr>
      <th colspan="4">Swiping / No swiping</th>
    </tr>
    <tr>
      <td>allowSwipeToPrev</td>
      <td>boolean</td>
      <td>true</td>
      <td>Set to <b>false</b> to disable swiping to previous slide direction (to left or top)</td>
    </tr>
    <tr>
      <td>allowSwipeToNext</td>
      <td>boolean</td>
      <td>true</td>
      <td>Set to <b>false</b> to disable swiping to next slide direction (to right or bottom)</td>
    </tr>
    <tr>
      <td>noSwiping</td>
      <td>boolean</td>
      <td>true</td>
      <td>Will disable swiping on elements matched to class specified in <code>noSwipingClass</code></td>
    </tr>
    <tr>
      <td>noSwipingClass</td>
      <td>string</td>
      <td>'swiper-no-swiping'</td>
      <td>If <b>true</b>, then you can add <code>noSwipingClass</code> class to swiper's slide to prevent/disable swiping on this element</td>
    </tr>
    <tr>
      <td>swipeHandler</td>
      <td>string / HTMLElement</td>
      <td>null</td>
      <td>String with CSS selector or HTML element of the container with pagination that will work as only available handler for swiping</td>
    </tr>
    <tr>
      <th colspan="4">Navigation Controls</th>
    </tr>
    <tr>
      <td>uniqueNavElements</td>
      <td>boolean</td>
      <td>true</td>
      <td>If enabled (by default) and navigation elements' parameters passed as a string (like <code>".pagination"</code>) then Swiper will look for such elements through child elements first. Applies for pagination, prev/next buttons and scrollbar elements</td>
    </tr>
    <tr>
      <th colspan="4">Pagination</th>
    </tr>
    <tr>
      <td>pagination</td>
      <td>string / HTMLElement</td>
      <td>null</td>
      <td>String with CSS selector or HTML element of the container with pagination</td>
    </tr>
    <tr>
      <td>paginationType</td>
      <td>string</td>
      <td>'bullets'</td>
      <td>String with type of pagination. Can be "bullets", "fraction", "progress" or "custom"</td>
    </tr>
    <tr>
      <td>paginationHide</td>
      <td>boolean</td>
      <td>true</td>
      <td>Toggle (hide/true) pagination container visibility when click on Slider's container</td>
    </tr>
    <tr>
      <td>paginationClickable</td>
      <td>boolean</td>
      <td>false</td>
      <td>If <b>true</b> then clicking on pagination button will cause transition to appropriate slide. Only for <b>bullets</b> pagination type</td>
    </tr>
    <tr>
      <td>paginationElement</td>
      <td>string</td>
      <td>'span'</td>
      <td>Defines which HTML tag will be use to represent single pagination bullet. . Only for <b>bullets</b> pagination type</td>
    </tr>
    <tr>
      <td>paginationBulletRender(swiper, index, className)</td>
      <td>function</td>
      <td>null</td>
      <td>This parameter allows totally customize pagination bullets, you need to pass here a function that accepts <b>index</b> number of pagination bullet and required element class name (<b>className</b>). Only for <b>bullets</b> pagination type
        <p>For example, with this code, we can add slide number into pagination bullet:</p>
        <pre><code class="js">var swiper = new Swiper('.swiper-container', {
//...
paginationBulletRender: function (swiper, index, className) {
return '&lt;span class="' + className + '"&gt;' + (index + 1) + '&lt;/span&gt;';
}
});</code></pre>
      </td>
    </tr>
    <tr>
      <td>paginationFractionRender(swiper, currentClassName, totalClassName)</td>
      <td>function</td>
      <td>null</td>
      <td>This parameter allows to customize "fraction" pagination html. Only for <b>fraction</b> pagination type
        <p>For example:</p>
        <pre><code class="js">var swiper = new Swiper('.swiper-container', {
//...
paginationFractionRender: function (swiper, currentClassName, totalClassName) {
return '&lt;span class="' + currentClassName + '"&gt;&lt;/span&gt;' +
       ' of ' +
       '&lt;span class="' + totalClassName + '"&gt;&lt;/span&gt;';
}
});</code></pre>
      </td>
    </tr>
    <tr>
      <td>paginationProgressRender(swiper, progressbarClass)</td>
      <td>function</td>
      <td>null</td>
      <td>This parameter allows to customize "progress" pagination. Only for <b>progress</b> pagination type
        <p>For example:</p>
        <pre><code class="js">var swiper = new Swiper('.swiper-container', {
//...
paginationProgressRender: function (swiper, progressbarClass) {
return '&lt;span class="' + progressbarClass + '"&gt;&lt;/span&gt;';
}
});</code></pre>
      </td>
    </tr>
    <tr>
      <td>paginationCustomRender(swiper, current, total)</td>
      <td>function</td>
      <td>null</td>
      <td>This parameter is required for <b>custom</b> pagination type where you have to specify how it should be rendered
        <p>For example:</p>
        <pre><code class="js">var swiper = new Swiper('.swiper-container', {
//...
paginationCustomRender: function (swiper, current, total) {
return current + ' of ' + total;
}
});</code></pre>
      </td>
    </tr>
    <tr>
      <th colspan="4">Navigation Buttons</th>
    </tr>
    <tr>
      <td>nextButton</td>
      <td>string / HTMLElement</td>
      <td>null</td>
      <td>String with CSS selector or HTML element of the element that will work like "next" button after click on it</td>
    </tr>
    <tr>
      <td>prevButton</td>
      <td>string / HTMLElement</td>
      <td>null</td>
      <td>String with CSS selector or HTML element of the element that will work like "prev" button after click on it</td>
    </tr>
    <tr>
      <th colspan="4">Scollbar</th>
    </tr>
    <tr>
      <td>scrollbar</td>
      <td>string / HTMLElement</td>
      <td>null</td>
      <td>String with CSS selector or HTML element of the container with scrollbar.</td>
    </tr>
    <tr>
      <td>scrollbarHide</td>
      <td>boolean</td>
      <td>true</td>
      <td>Hide scrollbar automatically after user interaction</td>
    </tr>
    <tr>
      <td>scrollbarDraggable</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> to enable make scrollbar draggable that allows you to control slider position</td>
    </tr>
    <tr>
      <td>scrollbarSnapOnRelease</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> to snap slider position to slides when you release scrollbar</td>
    </tr>
    <tr>
      <th colspan="4">Accessibility</th>
    </tr>
    <tr>
      <td>a11y</td>
      <td>boolean</td>
      <td>false</td>
      <td>Option to enable keyboard accessibility to provide foucsable navigation buttons and basic ARIA for screen readers</td>
    </tr>
    <tr>
      <td>prevSlideMessage</td>
      <td>string</td>
      <td>'Previous slide'</td>
      <td>Message for screen readers for previous button</td>
    </tr>
    <tr>
      <td>nextSlideMessage</td>
      <td>string</td>
      <td>'Next slide'</td>
      <td>Message for screen readers for next button</td>
    </tr>
    <tr>
      <td>firstSlideMessage</td>
      <td>string</td>
      <td>'This is the first slide'</td>
      <td>Message for screen readers for previous button when swiper is on first slide</td>
    </tr>
    <tr>
      <td>lastSlideMessage</td>
      <td>string</td>
      <td>'This is the last slide'</td>
      <td>Message for screen readers for previous button when swiper is on last slide</td>
    </tr>
    <tr>
      <td>paginationBulletMessage</td>
      <td>string</td>
      <td>'Go to slide {{index}}'</td>
      <td>Message for screen readers for single pagination bullet</td>
    </tr>
    <tr>
      <th colspan="4">Keyboard / Mousewheel</th>
    </tr>
    <tr>
      <td>keyboardControl</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> to enable navigation through slides using keyboard right and left (for horizontal mode), top and borrom (for vertical mode) keyboard arrows</td>
    </tr>
    <tr>
      <td>mousewheelControl</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> to enable navigation through slides using mouse wheel</td>
    </tr>
    <tr>
      <td>mousewheelForceToAxis</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> to force mousewheel swipes to axis. So in horizontal mode mousewheel will work only with horizontal mousewheel scrolling, and only with vertical scrolling in vertical mode.</td>
    </tr>
    <tr>
      <td>mousewheelReleaseOnEdges</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> and swiper will release mousewheel event and allow page scrolling when swiper is on edge positions (in the beginning or in the end)</td>
    </tr>
    <tr>
      <td>mousewheelInvert</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> to invert sliding direction</td>
    </tr>
    <tr>
      <td>mousewheelSensitivity</td>
      <td>number</td>
      <td>1</td>
      <td>Multiplier of mousewheel data, allows to tweak mouse wheel sensitivity</td>
    </tr>
    <tr>
      <td>mousewheelEventsTarged</td>
      <td>string / HTMLElement</td>
      <td>'container'</td>
      <td>String with CSS selector or HTML element of the container accepting mousewheel events. By default it is swiper-container</td>
    </tr>
    <tr>
      <th colspan="4">Hash/History Navigation</th>
    </tr>
    <tr>
      <td>hashnav</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> to enable hash url navigation to for slides</td>
    </tr>
    <tr>
      <td>hashnavWatchState</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> to enable also navigation through slides (when hashnav is enabled) by browser history or by setting directly hash on document location</td>
    </tr>
    <tr>
      <td>history</td>
      <td>string</td>
      <td> </td>
      <td>Enables history push state where every slide will have its own url. In this parameter you have to specify main slides url like <b>"slides"</b> and specify every slide url using <code>data-history</code> attribute.
        <pre><code>&lt;!-- will produce "slides/slide1" url in browser history --&gt;
&lt;div class="swiper-slide" data-history="slide1"&gt;&lt;/div&gt;</code></pre>
      </td>
    </tr>
    <tr>
      <td>replaceState</td>
      <td>boolean</td>
      <td>false</td>
      <td>Works in addition to hashnav or history to replace current url state with the new one instead of adding it to history</td>
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
      <td>When enabled Swiper will be reinitialized after all inner images (&lt;img&gt; tags) are loaded. Required <code>preloadImages: true</code></td>
    </tr>
    <tr>
      <td>lazyLoading</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to "true" to enable images lazy loading. Note that <code>preloadImages</code> should be disabled</td>
    </tr>
    <tr>
      <td>lazyLoadingInPrevNext</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to "true" to enable lazy loading for the closest slides images (for previous and next slide images)</td>
    </tr>
    <tr>
      <td>lazyLoadingInPrevNextAmount</td>
      <td>number</td>
      <td>1</td>
      <td>Amount of next/prev slides to preload lazy images in. Can't be less than <code>slidesPerView</code></td>
    </tr>
    <tr>
      <td>lazyLoadingOnTransitionStart</td>
      <td>boolean</td>
      <td>false</td>
      <td>By default, Swiper will load lazy images after transition to this slide, so you may enable this parameter if you need it to start loading of new image in the beginning of transition</td>
    </tr>
    <tr>
      <th colspan="4">Loop</th>
    </tr>
    <tr>
      <td>loop</td>
      <td>boolean</td>
      <td>false</td>
      <td>
        <p>Set to <b>true</b> to enable continuous loop mode</p>
        <p class="important-note">If you use it along with <code>slidesPerView: 'auto'</code> then you need to specify <code>loopedSlides</code> parameter with amount of slides to loop (duplicate)</p>
        <p>Also, because of nature of how the loop mode works, it will add duplicated slides. Such duplicated classes will have additional classes:</p>
        <ul>
          <li><code>swiper-slide-duplicate</code> - represents duplicated slide
          <li><code>swiper-slide-duplicate-active</code> - represents slide duplicated to the currently active slide
          <li><code>swiper-slide-duplicate-next</code> - represents slide duplicated to the slide next to active
          <li><code>swiper-slide-duplicate-prev</code> - represents slide duplicated to the slide previous to active
        </ul>
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
      <td>If you use <code>slidesPerView:'auto'</code> with loop mode you should tell to Swiper how many slides it should loop (duplicate) using this parameter</td>
    </tr>
    <tr>
      <th colspan="4">Zoom</th>
    </tr>
    <tr>
      <td>zoom</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> to enable zooming functionality</td>
    </tr>
    <tr>
      <td>zoomMax</td>
      <td>number</td>
      <td>3</td>
      <td>Maximum image zoom multiplier</td>
    </tr>
    <tr>
      <td>zoomMin</td>
      <td>number</td>
      <td>1</td>
      <td>Minimal image zoom multiplier</td>
    </tr>
    <tr>
      <td>zoomToggle</td>
      <td>boolean</td>
      <td>true</td>
      <td>Enable/disable zoom-in by slide's double tap</td>
    </tr>
    <tr>
      <th colspan="4">Controller</th>
    </tr>
    <tr>
      <td>control</td>
      <td>[Swiper Instance]</td>
      <td>undefined</td>
      <td>Pass here another Swiper instance or array with Swiper instances that should be controlled by this Swiper</td>
    </tr>
    <tr>
      <td>controlInverse</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> and controlling will be in inverse direction</td>
    </tr>
    <tr>
      <td>controlBy</td>
      <td>string</td>
      <td>'slide'</td>
      <td>Can be <code>'slide'</code> or <code>'container'</code>. Defines a way how to control another slider: slide by slide (with respect to other slider's grid) or depending on all slides/container (depending on total slider percentage)</td>
    </tr>
    <tr>
      <td>normalizeSlideIndex</td>
      <td>boolean</td>
      <td>true</td>
      <td>Normalize slide index in control mode. See <a href="https://github.com/nolimits4web/Swiper/pull/1766" target="_blank">#1766</a></td>
    </tr>
    <tr>
      <th colspan="4">Observer</th>
    </tr>
    <tr>
      <td>observer</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> to enable Mutation Observer on Swiper and its elements. In this case Swiper will be updated (reinitialized) each time if you change its style (like hide/show) or modify its child elements (like adding/removing slides)</td>
    </tr>
    <tr>
      <td>observeParents</td>
      <td>boolean</td>
      <td>false</td>
      <td>Set to <b>true</b> if you also need to watch Mutations for Swiper parent elements</td>
    </tr>
    <tr>
      <th colspan="4">Breakpoints</th>
    </tr>
    <tr>
      <td>breakpoints</td>
      <td>object</td>
      <td> </td>
      <td>Allows to set different parameter for different responsive breakpoints (screen sizes). Not all parameters can be changed in breakpoints, only those which are not required different layout and logic, like <code>slidesPerView</code>, <code>slidesPerGroup</code>, <code>spaceBetween</code>. Such parameters like <code>slidesPerColumn</code>, <code>loop</code>, <code>direction</code>, <code>effect</code> won't work. For example:
        <pre><code class="js">var swiper = new Swiper('.swiper-container', {
// Default parameters
slidesPerView: 4,
spaceBetween: 40,
// Responsive breakpoints
breakpoints: {
// when window width is &lt;= 320px
320: {
slidesPerView: 1,
spaceBetween: 10
},
// when window width is &lt;= 480px
480: {
slidesPerView: 2,
spaceBetween: 20
},
// when window width is &lt;= 640px
640: {
slidesPerView: 3,
spaceBetween: 30
}
}
})</code></pre>
      </td>
    </tr>
    <tr>
      <th colspan="4">Callbacks</th>
    </tr>
    <tr>
      <td>runCallbacksOnInit</td>
      <td>boolean</td>
      <td>true</td>
      <td>Run on[Transition/SlideChange][Start/End] callbacks on swiper initialization. Such callbacks will be fired on initialization in case of your initialSlide is not 0, or you use loop mode</td>
    </tr>
    <tr>
      <td>onInit(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed right after Swiper initialization</td>
    </tr>
    <tr>
      <td>onSlideChangeStart(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed in the beginning of animation to other slide (next or previous). Receives swiper instance as an argument.</td>
    </tr>
    <tr>
      <td>onSlideChangeEnd(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed after animation to other slide (next or previous). Receives slider instance as an argument.</td>
    </tr>
    <tr>
      <td>onSlideNextStart(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Same as "onSlideChangeStart" but for "forward" direction only</td>
    </tr>
    <tr>
      <td>onSlideNextEnd(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Same as "onSlideChangeEnd" but for "forward" direction only</td>
    </tr>
    <tr>
      <td>onSlidePrevStart(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Same as "onSlideChangeStart" but for "backward" direction only</td>
    </tr>
    <tr>
      <td>onSlidePrevEnd(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Same as "onSlideChangeEnd" but for "backward" direction only</td>
    </tr>
    <tr>
      <td>onTransitionStart(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed in the beginning of transition. Receives swiper instance as an argument.</td>
    </tr>
    <tr>
      <td>onTransitionEnd(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed after transition. Receives slider instance as an argument.</td>
    </tr>
    <tr>
      <td>onTouchStart(swiper, event)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when user touch Swiper. Receives swiper instance and 'touchstart' event as an arguments.</td>
    </tr>
    <tr>
      <td>onTouchMove(swiper, event)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when user touch and move finger over Swiper. Receives swiper instance and 'touchmove' event as an arguments.</td>
    </tr>
    <tr>
      <td>onTouchMoveOpposite(swiper, event)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when user touch and move finger over Swiper in direction opposite to <code>direction</code> parameter. Receives swiper instance and 'touchmove' event as an arguments.</td>
    </tr>
    <tr>
      <td>onSliderMove(swiper, event)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when user touch and move finger over Swiper and move it. Receives swiper instance and 'touchmove' event as an arguments.</td>
    </tr>
    <tr>
      <td>onTouchEnd(swiper, event)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when user release Swiper. Receives swiper instance and 'touchend' event as an arguments.</td>
    </tr>
    <tr>
      <td>onClick(swiper, event)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when user click/tap on Swiper after 300ms delay. Receives swiper instance and 'touchend' event as an arguments.</td>
    </tr>
    <tr>
      <td>onTap(swiper, event)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when user click/tap on Swiper. Receives swiper instance and 'touchend' event as an arguments.</td>
    </tr>
    <tr>
      <td>onDoubleTap(swiper, event)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when user double tap on Swiper's container. Receives swiper instance and 'touchend' event as an arguments</td>
    </tr>
    <tr>
      <td>onImagesReady(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed right after all inner images are loaded. <code>updateOnImagesReady</code> should be also enabled</td>
    </tr>
    <tr>
      <td>onProgress(swiper, progress)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when Swiper progress is changed, as second arguments it receives <b>progress</b> that is always from 0 to 1</td>
    </tr>
    <tr>
      <td>onReachBeginning(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when Swiper reach its beginning (initial position)</td>
    </tr>
    <tr>
      <td>onReachEnd(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when Swiper reach last slide</td>
    </tr>
    <tr>
      <td>onDestroy(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when you destroy Swiper</td>
    </tr>
    <tr>
      <td>onSetTranslate(swiper, translate)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when swiper's wrapper change its position. Receives swiper instance and current translate value as an arguments</td>
    </tr>
    <tr>
      <td>onSetTransition(swiper, transition)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed everytime when swiper starts animation. Receives swiper instance and current transition duration (in ms) as an arguments</td>
    </tr>
    <tr>
      <td>onAutoplay(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Same as <code>onSlideChangeStart</code> but caused by autoplay</td>
    </tr>
    <tr>
      <td>onAutoplayStart(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when when autoplay started</td>
    </tr>
    <tr>
      <td>onAutoplayStop(swiper)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when when autoplay stopped</td>
    </tr>
    <tr>
      <td>onLazyImageLoad(swiper, slide, image)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed in the beginning of lazy loading of image</td>
    </tr>
    <tr>
      <td>onLazyImageReady(swiper, slide, image)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed when lazy loading image will be loaded</td>
    </tr>
    <tr>
      <td>onPaginationRendered(swiper, paginationContainer)</td>
      <td>function</td>
      <td> </td>
      <td>Callback function, will be executed after pagination elements generated and added to DOM</td>
    </tr>
    <tr>
      <td>onScroll(swiper, e)</td>
      <td>function</td>
      <td></td>
      <td>Callback function, will be executed when slider sliding or scrolling happens with mousehweel control</td>
    </tr>
    <tr>
      <td>onBeforeResize(swiper)</td>
      <td>function</td>
      <td></td>
      <td>Callback function, will be executed on window resize right before swiper's onresize manipulation</td>
    </tr>
    <tr>
      <td>onAfterResize(swiper)</td>
      <td>function</td>
      <td></td>
      <td>Callback function, will be executed on window resize right after swiper's onresize manipulation</td>
    </tr>
    <tr>
      <td>onKeyPress(swiper, kc)</td>
      <td>function</td>
      <td></td>
      <td>Callback function, will be executed on "keydown" event when keyboard control is enabled</td>
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
      <td>slideDuplicatedActiveClass</td>
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
      <td>slideDuplicatedNextClass</td>
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
      <td>slideDuplicatedPrevClass</td>
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
    <tr>
      <td>bulletClass</td>
      <td>string</td>
      <td>'swiper-pagination-bullet'</td>
      <td>CSS class name of single pagination bullet</td>
    </tr>
    <tr>
      <td>bulletActiveClass</td>
      <td>string</td>
      <td>'swiper-pagination-bullet-active'</td>
      <td>CSS class name of currently active pagination bullet</td>
    </tr>
    <tr>
      <td>paginationHiddenClass</td>
      <td>string</td>
      <td>'swiper-pagination-hidden'</td>
      <td>CSS class name of pagination when it becomes inactive</td>
    </tr>
    <tr>
      <td>paginationCurrentClass</td>
      <td>string</td>
      <td>'swiper-pagination-current'</td>
      <td>CSS class name of the element with currently active index in "fraction" pagination</td>
    </tr>
    <tr>
      <td>paginationTotalClass</td>
      <td>string</td>
      <td>'swiper-pagination-total'</td>
      <td>CSS class name of the element with total number of "snaps" in "fraction" pagination</td>
    </tr>
    <tr>
      <td>paginationProgressbarClass</td>
      <td>string</td>
      <td>'swiper-pagination-progressbar'</td>
      <td>CSS class name of pagination progressbar</td>
    </tr>
    <tr>
      <td>paginationClickableClass</td>
      <td>string</td>
      <td>'swiper-pagination-clickable'</td>
      <td>CSS class name set to pagination when it is clickable</td>
    </tr>
    <tr>
      <td>paginationModifierClass</td>
      <td>string</td>
      <td>'swiper-pagination-'</td>
      <td>The beginning of the modifier CSS class name that will be added to pagination depending on parameters</td>
    </tr>
    <tr>
      <td>buttonDisabledClass</td>
      <td>string</td>
      <td>'swiper-button-disabled'</td>
      <td>CSS class name of next/prev button when it becomes disabled</td>
    </tr>
    <tr>
      <td>lazyLoadingClass</td>
      <td>string</td>
      <td>'swiper-lazy'</td>
      <td>CSS class name of lazy element</td>
    </tr>
    <tr>
      <td>lazyStatusLoadingClass</td>
      <td>string</td>
      <td>'swiper-lazy-loading'</td>
      <td>CSS class name of lazy loading element</td>
    </tr>
    <tr>
      <td>lazyStatusLoadedClass</td>
      <td>string</td>
      <td>'swiper-lazy-loaded'</td>
      <td>CSS class name of lazy loaded element</td>
    </tr>
    <tr>
      <td>lazyPreloaderClass</td>
      <td>string</td>
      <td>'swiper-lazy-preloader'</td>
      <td>CSS class name of lazy preloader</td>
    </tr>
    <tr>
      <td>preloaderClass</td>
      <td>string</td>
      <td>'preloader'</td>
      <td>CSS class name of additional lazy preloader</td>
    </tr>
    <tr>
      <td>zoomContainerClass</td>
      <td>string</td>
      <td>'swiper-zoom-container'</td>
      <td>CSS class name of zoom container</td>
    </tr>
    <tr>
      <td>notificationClass</td>
      <td>string</td>
      <td>'swiper-notification'</td>
      <td>CSS class name of a11 notification</td>
    </tr>
  </tbody>
</table>

## Slider Methods & Properties

<p>After we initialize Slider we have its initialized instance in variable (like <code>mySwiper</code> variable in example above) with helpful methods and properties:</p>
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
      <td>mySwiper.container</td>
      <td>Dom7/jQuery element with slider container HTML element. To get vanilla HTMLElement use <code>mySwiper.container[0]</code></td>
    </tr>
    <tr>
      <td>mySwiper.wrapper</td>
      <td>Dom7/jQuery element with slider wrapper HTML element. To get vanilla HTMLElement use <code>mySwiper.wrapper[0]</code></td>
    </tr>
    <tr>
      <td>mySwiper.slides</td>
      <td>Dom7/jQuery array-like collection of slides HTML elements. To get specific slide HTMLElement use <code>mySwiper.slides[1]</code></td>
    </tr>
    <tr>
      <td>mySwiper.nextButton</td>
      <td>Dom7/jQuery element with next button HTML element. To get vanilla HTMLElement use <code>mySwiper.nextButton[0]</code></td>
    </tr>
    <tr>
      <td>mySwiper.prevButton</td>
      <td>Dom7/jQuery element with prev button HTML element. To get vanilla HTMLElement use <code>mySwiper.prevButton[0]</code></td>
    </tr>
    <tr>
      <td>mySwiper.bullets</td>
      <td>Dom7/jQuery collection of pagination buttons HTML elements. To get specific slide HTMLElement use <code>mySwiper.bullets[1]</code></td>
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
        <p>Index number of currently active slide</p>
        <p class="important-note">Note, that in loop mode active index value will be always shifted on a number of looped/duplicated slides</p>
      </td>
    </tr>
    <tr>
      <td>mySwiper.realIndex</td>
      <td>
        <p>Index number of currently active slide considering duplicated slides in loop mode</p>
      </td>
    </tr>
    <tr>
      <td>mySwiper.previousIndex</td>
      <td>Index number of previously active slide</td>
    </tr>
    <tr>
      <td>mySwiper.isBeginning</td>
      <td><b>true</b> if slider on most "left"/"top" position</td>
    </tr>
    <tr>
      <td>mySwiper.isEnd</td>
      <td><b>true</b> if slider on most "right"/"bottom" position</td>
    </tr>
    <tr>
      <td>mySwiper.autoplaying</td>
      <td><b>true</b> if autoplay is enabled</td>
    </tr>
    <tr>
      <td>mySwiper.animating</td>
      <td><b>true</b> if swiper is in transition</td>
    </tr>
    <tr>
      <td>mySwiper.touches</td>
      <td>Object with the following touch event properties:
        <ul>
          <li>mySwiper.touches.startX</li>
          <li>mySwiper.touches.startY</li>
          <li>mySwiper.touches.currentX</li>
          <li>mySwiper.touches.currentY</li>
          <li>mySwiper.touches.diff</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>mySwiper.clickedIndex</td>
      <td>Index number of last clicked slide</td>
    </tr>
    <tr>
      <td>mySwiper.clickedSlide</td>
      <td>Link to last clicked slide (<i>HTMLElement</i>)</td>
    </tr>
    <tr>
      <th colspan="2">Methods</th>
    </tr>
    <tr>
      <td>mySwiper.slideNext(<span>runCallbacks</span>, <span>speed</span>);</td>
      <td>
        Run transition to next slide
        <ul class="method-parameters">
          <li><span class="parameter">runCallbacks</span> - <span class="parameter-type">boolean</span> - Set it to <code>false</code> (by default it is <code>true</code>) and transition will not produce onSlideChange callback functions. <em>Optional</em></li>
          <li><span class="parameter">speed</span> - <span class="parameter-type">number</span> - transition duration (in ms). <em>Optional</em></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>mySwiper.slidePrev(<span>runCallbacks</span>, <span>speed</span>);</td>
      <td>
        Run transition to previous slide
        <ul class="method-parameters">
          <li><span class="parameter">runCallbacks</span> - <span class="parameter-type">boolean</span> - Set it to <code>false</code> (by default it is <code>true</code>) and transition will not produce onSlideChange callback functions. <em>Optional</em></li>
          <li><span class="parameter">speed</span> - <span class="parameter-type">number</span> - transition duration (in ms). <em>Optional</em></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>mySwiper.slideTo(<span>index</span>, <span>speed</span>, <span>runCallbacks</span>);</td>
      <td>
        Run transition to the slide with index number equal to 'index' parameter for the duration equal to 'speed' parameter.
        <ul class="method-parameters">
          <li><span class="parameter">index</span> - <span class="parameter-type">number</span> - index number of slide</li>
          <li><span class="parameter">speed</span> - <span class="parameter-type">number</span> - transition duration (in ms). <em>Optional</em></li>
          <li><span class="parameter">runCallbacks</span> - <span class="parameter-type">boolean</span> - Set it to <code>false</code> (by default it is <code>true</code>) and transition will not produce onSlideChange callback functions. <em>Optional</em></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>mySwiper.update(updateTranslate);</td>
      <td>
        <p>This method includes updateContainerSize, updateSlidesSize, updateProgress, updatePagination and updateClasses methods </p>
        <p>You should call it after you add/remove slides manually, or after you hide/show it, or do any custom DOM modifications with Swiper</p>
        <ul class="method-parameters">
          <li><span class="parameter">updateTranslate</span> - <span class="parameter-type">boolean</span> - Set it to <code>true</code> (by default it is <code>false</code>) to hard set/reset/update Swiper wrapper translate. It is useful if you use not default effect or scrollbar. <em>Optional</em></li>
        </ul>
        <p>This method also includes subcall of the following methods which you can use separately:</p>
        <ul>
          <li>mySwiper.updateContainerSize() - recalculate size of swiper container</li>
          <li>mySwiper.updateSlidesSize() - recalculate number of slides and their offsets. Useful after you add/remove slides with JavaScript</li>
          <li>mySwiper.updateProgress() - recalculate swiper progress</li>
          <li>mySwiper.updatePagination() - updates pagination layout and re-render bullets</li>
          <li>mySwiper.updateClasses() - update active/prev/next classes on slides and bullets</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>mySwiper.onResize();</td>
      <td>Swiper executes this method when you resize browser. It is almost the same as <code>.update()</code> but a bit softer, without hard setting translate</td>
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
      <td>mySwiper.startAutoplay();</td>
      <td>start auto play. It may be useful for custom "Play" and "Pause" buttons</td>
    </tr>
    <tr>
      <td>mySwiper.stopAutoplay();</td>
      <td>stop auto play. It may be useful for custom "Play" and "Pause" buttons</td>
    </tr>
    <tr>
      <td>mySwiper.destroy(deleteInstance, cleanupStyles);</td>
      <td>

        Destroy slider instance and detach all events listeners, where<br>
        <ul class="method-parameters">
          <li><span class="parameter">deleteInstance</span> - <span class="parameter-type">boolean</span> - Set it to <code>false</code> (by default it is <code>true</code>) to not to delete Swiper instance</li>
          <li><span class="parameter">cleanupStyles</span> - <span class="parameter-type">boolean</span> - Set it to <code>true</code> (by default it is <code>false</code>) and all custom styles will be removed from slides, wrapper and container. Useful if you need to destroy Swiper and to init again with new options or in different direction</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>mySwiper.appendSlide(slides);</td>
      <td>Add new slides to the end. <code>slides</code> could be HTMLElement or HTML string with new slide or array with such slides, for example:
        <pre><code>mySwiper.appendSlide('&lt;div class="swiper-slide"&gt;Slide 10"&lt;/div&gt;')
mySwiper.appendSlide([
'&lt;div class="swiper-slide"&gt;Slide 10"&lt;/div&gt;',
'&lt;div class="swiper-slide"&gt;Slide 11"&lt;/div&gt;'
]);</code></pre>
      </td>
    </tr>
    <tr>
      <td>mySwiper.prependSlide(slides);</td>
      <td>Add new slides to the beginning. <code>slides</code> could be HTMLElement or HTML string with new slide or array with such slides, for example:
        <pre><code>mySwiper.prependSlide('&lt;div class="swiper-slide"&gt;Slide 0"&lt;/div&gt;')
mySwiper.prependSlide([
'&lt;div class="swiper-slide"&gt;Slide 1"&lt;/div&gt;',
'&lt;div class="swiper-slide"&gt;Slide 2"&lt;/div&gt;'
]);</code></pre>
      </td>
    </tr>
    <tr>
      <td>mySwiper.removeSlide(slideIndex);</td>
      <td>Remove selected slides. <code>slideIndex</code> could be a number with slide index to remove or array with indexes, for example:
        <pre><code class="js">mySwiper.removeSlide(0); //remove first slide
mySwiper.removeSlide([0, 1]); //remove first and second slides</code></pre>
      </td>
    </tr>
    <tr>
      <td>mySwiper.removeAllSlides();</td>
      <td>Remove all slides</td>
    </tr>
    <tr>
      <td>mySwiper.setWrapperTranslate(translate);</td>
      <td>Set custom css3 transform's translate value for swiper wrapper</td>
    </tr>
    <tr>
      <td>mySwiper.getWrapperTranslate();</td>
      <td>Get current value of swiper wrapper css3 transform translate</td>
    </tr>
    <tr>
      <td>mySwiper.on(callback, handler)</td>
      <td>Add callback/event handler</td>
    </tr>
    <tr>
      <td>mySwiper.once(callback, handler)</td>
      <td>Add event/callback that will be executed only once</td>
    </tr>
    <tr>
      <td>mySwiper.off(callback)</td>
      <td>Remove all handlers for specified callback/event </td>
    </tr>
    <tr>
      <td>mySwiper.lockSwipeToNext()<br>mySwiper.unlockSwipeToNext()</td>
      <td>Disable (lock) / enable (unlock) ability to slide to the next slides</td>
    </tr>
    <tr>
      <td>mySwiper.lockSwipeToPrev()<br>mySwiper.unlockSwipeToPrev()</td>
      <td>Disable (lock) / enable (unlock) ability to slide to the previous slides</td>
    </tr>
    <tr>
      <td>mySwiper.lockSwipes()<br>mySwiper.unlockSwipes()</td>
      <td>Disable (lock) / enable (unlock) ability to change slides</td>
    </tr>
    <tr>
      <td>mySwiper.disableMousewheelControl();</td>
      <td>Disable mousewheel control</td>
    </tr>
    <tr>
      <td>mySwiper.enableMousewheelControl();</td>
      <td>Enable mousewheel control</td>
    </tr>
    <tr>
      <td>mySwiper.disableKeyboardControl();</td>
      <td>Disable keyboard control</td>
    </tr>
    <tr>
      <td>mySwiper.enableKeyboardControl();</td>
      <td>Enable keyboard control</td>
    </tr>
    <tr>
      <td>mySwiper.disableTouchControl();</td>
      <td>Disable touch control</td>
    </tr>
    <tr>
      <td>mySwiper.enableTouchControl();</td>
      <td>Enable touch control</td>
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

## Hash Navigation

<p>Hash navigation is intended to have a link to specific slide that allows to load page with specific slide opened.</p>
<p>To make it work, you need to enable it by passing <code>hashnav:true</code> parameter and adding slides hashes in <code>data-hash</code> attribute:</p>
<pre><code>&lt;div class="swiper-container"&gt;
&lt;div class="swiper-wrapper"&gt;
  &lt;div class="swiper-slide" data-hash="slide1"&gt;Slide 1&lt;/div&gt;
  &lt;div class="swiper-slide" data-hash="slide2"&gt;Slide 2&lt;/div&gt;
  &lt;div class="swiper-slide" data-hash="slide3"&gt;Slide 3&lt;/div&gt;
  &lt;div class="swiper-slide" data-hash="slide4"&gt;Slide 4&lt;/div&gt;
  &lt;div class="swiper-slide" data-hash="slide5"&gt;Slide 5&lt;/div&gt;
  ...
&lt;/div&gt;
&lt;/div&gt;</code></pre>
<pre><code>var swiper = new Swiper('.swiper-container', {
  //enable hash navigation
  hashnav: true
})</code></pre>

## Parallax

<p>Since version 3.0.3 Swiper supports parallax transition effects for swiper/slides nested elements. There are two types of parallax elements supported:</p>
<ul>
  <li>Direct child elements of <code>swiper-container</code>. Parallax effect for such elements will depend on total slider progress. Useful for parallax backgrounds</li>
  <li>Slides child elements. Parallax effect for such elements will depend on slide progress</li>
</ul>
<p>To enable parallax effects you need to init Swiper with passed <code>parallax:true</code> parameter and add <code>data-swiper-parallax</code> attribute on required elements</p>
<pre><code>&lt;div class="swiper-container"&gt;
&lt;!-- Parallax background element --&gt;
&lt;div
  class="parallax-bg"
  style="background-image:url(http://lorempixel.com/900/600/nightlife/2/)"
  data-swiper-parallax="-23%"&gt;
&lt;/div&gt;
&lt;div class="swiper-wrapper"&gt;
  &lt;div class="swiper-slide"&gt;
      &lt;!-- Each slide has parallax title --&gt;
      &lt;div class="title" data-swiper-parallax="-100"&gt;Slide 1&lt;/div&gt;
      &lt;!-- Parallax subtitle --&gt;
      &lt;div class="subtitle" data-swiper-parallax="-200"&gt;Subtitle&lt;/div&gt;
      &lt;!-- And parallax text with custom transition duration --&gt;
      &lt;div class="text" data-swiper-parallax="-300" data-swiper-parallax-duration="600"&gt;
        &lt;p&gt;Lorem ipsum dolor sit amet, ...&lt;/p&gt;
      &lt;/div&gt;
  &lt;/div&gt;
  ...
&lt;/div&gt;
&lt;/div&gt;</code></pre>
<p>All elements with specified <code>data-swiper-parallax</code> attribute will have parallax transition. This attribute may accept: </p>
<ul>
  <li><b>number</b> - value in px (as for title, subtitle in example above) to move element depending on progress. In this case such element will be moved on ± this value in px depending on slide position (next or previous)</li>
  <li><b>percentage</b> - (as for "parallax-bg") to move element depending on progress and on its size. In this case such element will be moved on ± this percentage of its size (width in horizontal direction, and height in vertical direction) depending on slide position (next or previous). So if element has 400px width and you specified data-swiper-parallax="50%" then it will be moved on ± 200px</li>
</ul>
<p>It is possible to overwrite parallax direction by using <code>data-swiper-parallax-x</code> and <code>data-swiper-parallax-y</code> attributes with same rules</p>
<p>You can also pass custom transition duration for parallax elements by adding <code>data-swiper-parallax-duration</code> attribute.</p>

## Lazy Loading

<p>To enable lazy loading, first of all we need special layout for images or elements with backround in slides:</p>
<pre>
&lt;div class="swiper-container"&gt;
&lt;div class="swiper-wrapper"&gt;

  &lt;!-- Lazy image --&gt;
  &lt;div class="swiper-slide"&gt;
      &lt;img data-src="path/to/picture-1.jpg" class="swiper-lazy"&gt;
      &lt;div class="swiper-lazy-preloader"&gt;&lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- Lazy image with srscet--&gt;
  &lt;div class="swiper-slide"&gt;
      &lt;img data-src="path/to/logo-small.png" data-srcset="path/logo/logo-large.png 2x" class="swiper-lazy"&gt;
      &lt;div class="swiper-lazy-preloader"&gt;&lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- Element with lazy background image --&gt;
  &lt;div class="swiper-slide"&gt;
      &lt;div data-background="path/to/picture-2.jpg" class="swiper-lazy"&gt;
          &lt;div class="swiper-lazy-preloader"&gt;&lt;/div&gt;
      &lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- Lazy background image on slide itself --&gt;
  &lt;div data-background="path/to/picture-3.jpg" class="swiper-slide swiper-lazy"&gt;
      &lt;div class="swiper-lazy-preloader"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;/div&gt;
</pre>
<p>As you see:</p>
<ul>
  <li>Each lazy loaded image/element should have additional "swiper-lazy" class</li>
  <li>Lazy image source for &lt;img&gt; element should be specified in "data-src" attribute instead of "src"</li>
  <li>Lazy image source set for &lt;img&gt; element should be specified in "data-srcset" attribute instead of "srcset"</li>
  <li>Lazy background image source should be specified in "data-background" attribute</li>
</ul>
<p>You may also add animated preloader spinner to slide which will be removed automatically after image loaded:</p>
<pre><code>&lt;div class="swiper-lazy-preloader"&gt;&lt;/div&gt;</code></pre>
<p>Or white-one for dark layout:</p>
<pre><code>&lt;div class="swiper-lazy-preloader swiper-lazy-preloader-white"&gt;&lt;/div&gt;</code></pre>
<p>After that we need to enable lazy loading on Swiper initialization:</p>
<pre><code>var swiper = new Swiper('.swiper-container', {
// Disable preloading of all images
preloadImages: false,
// Enable lazy loading
lazyLoading: true
});    </code></pre>
<div class="important-note">
  <p>If you use slidesPerView "auto" or slidesPerView &gt; 1, then you should also enable <b>watchSlidesVisibility</b> and Swiper will load images in currently visible slides</p>
</div>

## Zoom

<p>Swiper supports zoom images functionality (similar to what you see on iOS when browsing single photo) where you can zoom-in image by pinch gesture and or by zoom-in/out by double tap on it. In this case, additional layout is required:</p>
<pre><code>&lt;div class="swiper-container"&gt;
  &lt;div class="swiper-wrapper"&gt;
    &lt;div class="swiper-side"&gt;
        &lt;div class="swiper-zoom-container"&gt;
            &lt;img src="path/to/image1.jpg"&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="swiper-side"&gt;
        &lt;div class="swiper-zoom-container"&gt;
            &lt;img src="path/to/image2.jpg"&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="swiper-side"&gt;Plain slide with text&lt;/div&gt;
    &lt;div class="swiper-side"&gt;
        &lt;!-- Override maxZoom parameter --&gt;
        &lt;div class="swiper-zoom-container" data-swiper-zoom="5"&gt;
            &lt;img src="path/to/image1.jpg"&gt;
        &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p>All "zoomable" images should be wrapped with the div with <code>swiper-zoom-container</code> class. Note, it doesn't support to zoom anything else except single image.</p>
<p>You can override <code>maxZoom</code> parameter for specific slides by using <code>data-swiper-zoom</code> attribute on zoom container.</p>

## Emitter API / Events

<p>Emitter API allows to you add events/callbacks to Swiper like usual events, even after Swiper initialization:</p>
<pre><code>// Init Swiper
var mySwiper = new Swiper('.swiper-container');

// Later add callback
mySwiper.on('slideChangeStart', function () {
console.log('slide change start');
});

// Add one more handler for this event
mySwiper.on('slideChangeStart', function () {
console.log('slide change start 2');
});

// Add handler that will be executed only once
mySwiper.once('sliderMove', function () {
console.log('slider moved');
});

// Somewhen later, remove all slideChangeStart handlers
mySwiper.off('slideChangeStart');  </code></pre>
<div class="important-note">
  <p>Note, that callback/event name in this case is the same as usual callback name but without "on" and with lowercase first character, so "onTouchMove" becames just "touchMove"</p>
</div>

## Access to Swiper's Instance

<p>If you initialize Swiper using HTML it is still possible to access to Swiper's instance. It is <code>swiper</code> property of Swiper's HTML container element:</p>
<pre><code class="js">var mySwiper = $('.swiper-container')[0].swiper;

// Now you can use all slider methods like
mySwiper.slideNext();</code></pre>

## Custom Build

<p>Since version 3.4.0 Swiper comes with Gulp builder that allows to build custom library version where you may include only required modules. We need the following:</p>
<ol>
  <li>Download and unzip Swiper GitHub repository to local folder</li>
  <li>Install Node.js (if not installed)</li>
  <li>Install Gulp (if not installed) by executing the following command in terminal:
    <pre><code>$ npm install --global gulp</code></pre>
  </li>
  <li>Now, we need to install required dependencies. Go to the folder with downloaded and unzipped Swiper repository and execute in terminal:
    <pre><code>$ npm install</code></pre>
  </li>
  <li>Now, we are ready to build custom version of Framework7. We need to execute gulp custom command and pass components/modules that we want to include as argument. For example, if we want to include just Accordion and Tabs:
    <pre><code>$ gulp custom -zoom,lazy-loading,effects</code></pre>
    <div class="important-note">Note, that there shouldn't be spaces between comma and components name</div>
  </li>
  <li>That is all. Now you should see new custom/ folder that will contain custom JS and CSS files and their minified versions</li>
</ol>
<p>Following modules are available:</p>
<ul>
  <li><code>effects</code></li>
  <li><code>lazy-load</code></li>
  <li><code>scrollbar</code></li>
  <li><code>controller</code></li>
  <li><code>hashnav</code></li>
  <li><code>history</code></li>
  <li><code>keyboard</code></li>
  <li><code>mousewheel</code></li>
  <li><code>parallax</code></li>
  <li><code>zoom</code></li>
  <li><code>a11y</code></li>
</ul>
