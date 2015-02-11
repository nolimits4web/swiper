<h2>Usage</h2>
      <p> 1. Download the latest version of Swiper from GitHub <a href="https://github.com/nolimits4web/Swiper" target="_blank"> <strong>here</strong> </a> . </p>
      <p> 2. Add to HEAD <strong>Swiper's CSS and JS</strong> : </p>
      <pre>
&lt;head&gt;
  ....
  &lt;link rel=&quot;stylesheet&quot; href=&quot;path_to_css/<strong>idangerous.swiper.css</strong>&quot;&gt;
  &lt;script defer src=&quot;path_to_js/<strong>idangerous.swiper-2.x.min.js</strong>&quot;&gt;&lt;/script&gt;
  ....
&lt;/head&gt;
      </pre>
      <p> 3. Use the following <strong>HTML</strong> layout: </p>
      <pre>
&lt;div class=&quot;swiper-container&quot;&gt;
  &lt;div class=&quot;swiper-wrapper&quot;&gt;
      <strong>&lt;!--First Slide--&gt;</strong>
      &lt;div class=&quot;swiper-slide&quot;&gt; 
        <em>&lt;!-- Any HTML content of the first slide goes here --&gt;</em>
      &lt;/div&gt;
      
      <strong>&lt;!--Second Slide--&gt;</strong>
      &lt;div class=&quot;swiper-slide&quot;&gt;
        <em>&lt;!-- Any HTML content of the second slide goes here --&gt;</em>
      &lt;/div&gt;
      
      <strong>&lt;!--Third Slide--&gt;</strong>
      &lt;div class=&quot;swiper-slide&quot;&gt; 
        <em>&lt;!-- Any HTML content of the third slide goes here --&gt;</em>
      &lt;/div&gt;
      <em>&lt;!--Etc..--&gt;</em>
  &lt;/div&gt;
&lt;/div&gt;

    </pre>
      <p> 4. Open <strong>idangerous.swiper.css</strong> and set the Swiper's width and height (in the end of the file): </p>
      <pre>
...
/* Specify Swiper's Size: */
.swiper-container, .swiper-slide {
  width: 500px;
  height: 200px;
}
    </pre>
      <p> 5. <strong>Initialize</strong> Swiper on document ready (or when window is loaded): </p>
      <pre>
&lt;script type=&quot;text/javascript&quot;&gt;
<em>/*======
Use document ready or window load events
For example:
With jQuery: $(function() { ...code here... })
Or window.onload = function() { ...code here ...}
Or document.addEventListener('DOMContentLoaded', function(){ ...code here... }, false)</em>
=======*/

window.onload = function() {
  var mySwiper = new Swiper('.swiper-container',{
    <em>//Your options here:</em>
    mode:'horizontal',
    loop: true
    <em>//etc..</em>
  });  
}

<em>/*
Or with jQuery/Zepto
*/</em>
$(function(){
  var mySwiper = $('.swiper-container').swiper({
    <em>//Your options here:</em>
    mode:'horizontal',
    loop: true
    <em>//etc..</em>
  });
})

&lt;/script&gt;

    </pre>
      <h2>API</h2>
      <h2>new Swiper(container, options)</h2>
      <ul>
        <li>
          <p> <strong>container</strong> - <em>string</em> , <em>required</em> . CSS selector of Swiper's container. In the HTML code above it should be equal to '.swiper-container' </p>
        </li>
        <li>
          <p> <strong>options</strong> - <em>object</em> , <em>optional</em> . Swiper parameters, see bellow </p>
        </li>
      </ul>
      <p>OR:</p>
      <ul>
        <li>
          <p> <strong>container</strong> - <em>HTML Element</em> , <em>required</em> . HTML Element that is a Swiper's container. In the HTML code above it could be equal to <code>document.querySelector('.swiper-container')</code> or (with jQuery) to <code>$('.swiper-container')[0]</code>. </p>
        </li>
        <li>
          <p> <strong>options</strong> - <em>object</em> , <em>optional</em> . Swiper parameters, see bellow </p>
        </li>
      </ul>
      <h4>Usage:</h4>
      <pre>
var <strong>mySwiper</strong> = new Swiper('.swiper-container', { 
  speed:750, 
  mode:'vertical'
})
    </pre>
      <p> Returns the object with couple of useful functions and methods: </p>
      <ul>
        <li>
          <p> <strong>mySwiper.disableMousewheelControl()</strong>- disable mousewheel control on the fly</p>
        </li>
        <li>
          <p> <strong>mySwiper.enableMousewheelControl()</strong>- enable mousewheel control that was disabled with <strong>disableMousewheelControl</strong> </p>
        </li>
        <li>
          <p> <strong>mySwiper.enableKeyboardControl()</strong>- enable keyboard control on the fly </p>
        </li>
        <li>
          <p> <strong>mySwiper.disableKeyboardControl()</strong>- disable keyboard control on the fly </p>
        </li>
        <li>
          <p> <strong>mySwiper.swipeNext(runCallbacks)</strong>- run transition to next slide. Set 'runCallbacks' to false (by default it is 'true') and transition will not produce onSlideChange callback functions.</p>
        </li>
        <li>
          <p> <strong>mySwiper.swipePrev(runCallbacks)</strong> - run transition to previous slide. Set 'runCallbacks' to false (by default it is 'true') and transition will not produce onSlideChange callback functions.</p>
        </li>
        <li>
          <p> <strong>mySwiper.swipeTo(index, speed, runCallbacks)</strong> - run transition to the slide with index number equal to 'index' parameter for the speed equal to 'speed' parameter. You can set 'runCallbacks' to false (by default it is 'true') and transition will not produce onSlideChange callback functions. </p>
        </li>
        <li>
          <p> <strong>mySwiper.browser.ie10</strong> - returns "true" if browser is Internet Explorer 10 </p>
        </li>
        <li>
          <p> <strong>mySwiper.browser.ie8</strong> - returns "true" if browser is Internet Explorer 8 </p>
        </li>
        <li>
          <p> <strong>mySwiper.support.touch</strong> - returns "true" if browser supports touch events </p>
        </li>
        <li>
          <p> <strong>mySwiper.support.transforms</strong> - returns "true"  if browser supports CSS3 transforms </p>
        </li>
        <li>
          <p> <strong>mySwiper.support.transforms3d</strong> - returns "true"  if browser supports CSS3 3D transforms </p>
        </li>
        <li>
          <p> <strong>mySwiper.support.transitions</strong> - returns "true"  if browser supports CSS3 transitions </p>
        </li>
        <li>
          <p> <strong>mySwiper.activeSlide()</strong> - returns the currently active slide (slide instance, HTMLElement) </p>
        </li>
        <li>
          <p> <strong>mySwiper.clickedSlideIndex</strong> - returns the index number of touched/clicked slide. For use only with "onSlideTouch" and "onSlideClick" callbacks. </p>
        </li>
        <li>
          <p> <strong>mySwiper.clickedSlide</strong> - returns the touched/clicked slide (slide instance, HTMLElement). For use only with "onSlideTouch" and "onSlideClick" callbacks. </p>
        </li>
        <li>
          <p> <strong>mySwiper.activeIndex</strong> - returns the index number of currently active slide.</p>
        </li>
        <li>
          <p> <strong>mySwiper.activeLoopIndex</strong> - returns the index number of currently active slide in loop mode.  </p>
        </li>
        <li>
          <p> <strong>mySwiper.activeLoaderIndex</strong> - returns the index number of currently active slide in loader mode.  </p>
        </li>
        <li>
          <p> <strong>mySwiper.previousIndex</strong> - returns the index number of previously active slide.</p>
        </li>
        <li>
          <p> <strong>mySwiper.startAutoplay()</strong> - start auto play. It may be useful for custom "Play" and "Pause" buttons. </p>
        </li>
        <li>
          <p> <strong>mySwiper.stopAutoplay()</strong> - stop auto play. It may be useful for custom "Play" and "Pause" buttons. </p>
        </li>
        
        <li>
          <p> <strong>mySwiper.destroy( <em>removeResizeEvent</em> )</strong> - will remove all attached event listeners (resize event on window (if <em>removeResizeEvent</em> not equal to 'false') , touch events on wrapper, and mouse events on document). Useful if you add/remove swiper(s) to document dynamically to release browser's memory. </p>
        </li>
        <li>
          <p> <strong>mySwiper.resizeFix()</strong> - call this function after you change Swiper's size without resizing of window. </p>
        </li>
        <li>
          <p> <strong>mySwiper.reInit()</strong> - reintialize Swiper. Useful to use after you dynamically add/remove slides. </p>
        </li>
        <li>
          <p> <strong>mySwiper.width</strong> - returns width of Swiper container </p>
        </li>
        <li>
          <p> <strong>mySwiper.height</strong> - returns height of Swiper container </p>
        </li>
        <li>
          <p> <strong>mySwiper.isTouched</strong> - returns 'true' while 'touching' the slider </p>
        </li>
        <li>
          <p> <strong>mySwiper.positions</strong> - returns object that contains x and y position of wrapper </p>
        </li>
        <li>
          <p> <strong>mySwiper.touches</strong> - returns object with information about touches </p>
        </li>
        <li>
          <p> <strong>mySwiper.params</strong> - access to object with parameters passed on initialization. You can also rewrite/change parameters after initialization, like <code>mySwiper.params.speed=500</code> </p>
        </li>
        <li>
          <p> <strong>mySwiper.getWrapperTranslate(axis)</strong> - returns current wrapper's "translate"/offset (in px). "axis" - should be a string "x"(for horizontal mode) or "y" (for vertical mode) </p>
        </li>
        <li>
          <p> <strong>mySwiper.setWrapperTranslate(x,y,z)</strong> - you can set css3 transform's translate value for wrapper manually. x,y and z - numbers (in px) </p>
        </li>
        <li>
          <p> <strong>mySwiper.wrapperTransitionEnd(callback,permanent)</strong> - with this method you can custom callback function when "transitionEnd" event occurs on Swiper (after swipeNext, swipePrev, swipeTo and swipeReset functions): <br>
          </p>
          <ul>
            <li> <em>callback</em> - function. By default (if permanent equal to "false") will run only once after first of mentioned above transitions <br>
            </li>
            <li> <em>permanent</em> - boolean. By default equal to false. Set to "true" if you want to make this callback function permanent. </li>
          </ul>
        </li>
      </ul>
      <h2>Options</h2>
      <p> Swiper support the following list of parameters on initialization: </p>
      <table style="width: 100%;">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Default Value</th>
            <th>Example</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>speed</td>
            <td>number</td>
            <td>300</td>
            <td>600</td>
            <td>duration of animation between slides (in ms)</td>
          </tr>
          <tr>
            <td>eventTarget</td>
            <td>string</td>
            <td>'wrapper'</td>
            <td>'container'</td>
            <td>Event target for swipes, by default all touch events are used on wrapper. Useful to switch it to 'container' if you have some other elements inside of container and you want to keep swipes on them. </td>
          </tr>
          <tr>
            <td>autoplay</td>
            <td>number</td>
            <td>5000</td>
            <td>-</td>
            <td> delay between transitions (in ms). If this parameter is not specified, auto play will be disabled </td>
          </tr>
          <tr>
            <td>autoplayDisableOnInteraction</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td>Set to false and autoplay will not be disabled after user interactions(swipes, arrow and pagination clicks), it will be restarted every time after interaction. </td>
          </tr>
          <tr>
            <td>autoplayStopOnLast</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td>Set to false and autoplay will be disabled on last slide (works only with disabled loop). </td>
          </tr>
          
          <tr>
            <td>mode</td>
            <td>string</td>
            <td>'horizontal'</td>
            <td>'vertical'</td>
            <td> slides will be positioned horizontally (for horizontal swipes) or vertically (for vertical swipes) </td>
          </tr>
          <tr>
            <td>loop</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> Set to <strong><em>true</em></strong> to enable loop mode.</td>
          </tr>
          <tr>
            <td>loopAdditionalSlides</td>
            <td>number</td>
            <td>0</td>
            <td>2</td>
            <td> Addition number of slides that will be cloned after creating of loop.</td>
          </tr>
          <tr>
            <td>loopedSlides</td>
            <td>number</td>
            <td>1</td>
            <td>2</td>
            <td>If you use <b>slidesPerView:'auto'</b> with loop mode you should tell to Swiper how many slides it should "loop" using this parameter. </td>
          </tr>
          
          <tr>
            <td>slidesPerView</td>
            <td>number<br>or<br>'auto'</td>
            <td>1</td>
            <td>4</td>
            <td> Set numbers of slides you want to display at the same time on slider's container for <em><strong>carousel mode</strong></em>. Also supports for 'auto' value, in this case it will fit slides depending on container's width. 'auto' mode doesn't compatible with loop mode.</td>
          </tr>
          
          <tr>
            <td>slidesPerViewFit</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td> Will make effect only with slidesPerView:'auto' and if you have slides that are wider than container. When true (by default) then large slide transition will be divided on two part on its edge positions. When false - slide transition will be divided as many parts as slide larger than container. </td>
          </tr>

          <tr>
            <td>slidesPerGroup</td>
            <td>number</td>
            <td>1</td>
            <td>2</td>
            <td> Set numbers of slides to define and enable group sliding. Useful to use with <em><strong>carousel mode</strong></em>.</td>
          </tr>
          <tr>
            <td>calculateHeight</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> Set to <strong> <em>true</em> </strong> and Swiper will calculate container's height depending on slides content. Useful in repsonsive layout or when you don't know height of your slides (like with responsive images).</td>
          </tr>
          <tr>
            <td>roundLengths</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> Set to <strong> <em>true</em> </strong> and Swiper will round width/height values, may be useful if you have rounding errors (like 833.48px width) in responsive swiper. </td>
          </tr>
          <tr>
            <td>cssWidthAndHeight</td>
            <td>boolean/string</td>
            <td>false</td>
            <td>true<br>'width'<br>'height'</td>
            <td> Set to <strong> <em>true</em> </strong> and Swiper will not set width and height to container, wrapper and slides. You can also set only 'width' or 'height' and Swiper will not set related size</td>
          </tr>
          
          <tr>
            <td>updateOnImagesReady</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td> When enabled Swiper will be reinitialized after all inner images (&lt;img&gt; tags) are loaded. .</td>
          </tr>
          <tr>
            <td>releaseFormElements</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td> This option allows to use form elements in Swiper and disable swiping on them. .</td>
          </tr>
          <tr>
            <td>watchActiveIndex</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> If enabled the Swipe recalculates activeIndex dynamically during touch interactions .</td>
          </tr>
          <tr>
            <td>visibilityFullFit</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td>If enabled then "visible" slides will be only those slides that are entirely fit to the container's view. .</td>
          </tr>
          <tr>
            <td>autoResize</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td> Set to <strong> <em>false</em> </strong> if you want to disable automatic slider resize on window resize. .</td>
          </tr>
          <tr>
            <td>resizeReInit</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td>If "true" then Swiper will be always reinitialized with window resize. .</td>
          </tr>
          <tr>
            <td>DOMAnimation</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td>Enable/disable custom DOM animation in browsers that don't support css transitions (like IE7-9). .</td>
          </tr>
          <tr>
            <td>resistance</td>
            <td>boolean<br> or<br> '100%'</td>
            <td>true</td>
            <td>false</td>
            <td> Set to <strong> <em>false</em> </strong> if you want to disable resistant bounds. Set to '100%' to enable nopeek resistance mode. .</td>
          </tr>
          
          <tr>
            <td>noSwiping</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> If true, then you can add "noSwipingClass" class to swiper's slide to prevent/disable swiping on this element. .</td>
          </tr>
          <tr>
            <td>preventLinks</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td> When enabled Swiper will prevent clicks on links (&lt;a&gt;) while slider is "touching". </td>
          </tr>
          <tr>
            <td>preventLinksPropagation</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> Set to true if you want to do stopPropagation along with preventLinks during swipes. </td>
          </tr>
          
          
          <tr>
            <td>initialSlide</td>
            <td>number</td>
            <td>2</td>
            <td>0</td>
            <td>Index number of initial slide.</td>
          </tr>
          <tr>
            <td>useCSS3Transforms</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td> Set to false if you don't want to use css3 transforms for slides offset (could improve quality, but could reduce performance) to use wrapper's left/top properties instead.</td>
          </tr>
          <tr>
            <td colspan="5">Free Mode and Scroll Container</td>
          </tr>
          <tr>
            <td>freeMode</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td>If 'true' then slides will not have fixed positions</td>
          </tr>
          <tr>
            <td>freeModeFluid</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> If true, then if you release the slide it will keep moving for a while </td>
          </tr>
          <tr>
            <td>scrollContainer</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> Set to <strong> <em>true</em> </strong> if you want to use Swiper like a scrollable area. </td>
          </tr>
          <tr>
            <td>momentumRatio</td>
            <td>number</td>
            <td>1</td>
            <td>2</td>
            <td> Higher value produces larger momentum distance after you release slider. </td>
          </tr>
          <tr>
            <td>momentumBounce</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td> Set to <strong> <em>false</em> </strong> if you want to disable momentum bounce in free mode. </td>
          </tr>
          <tr>
            <td>momentumBounceRatio</td>
            <td>number</td>
            <td>1</td>
            <td>2</td>
            <td> Higher value produces larger momentum bounce effect. </td>
          </tr>
          <tr>
            <td colspan="5">Slides offset</td>
          </tr>
          <tr>
            <td>centeredSlides</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> If true, then active slide will be centered, not always on the left side. .</td>
          </tr>
          <tr>
            <td>offsetPxBefore</td>
            <td>number</td>
            <td>0</td>
            <td>100</td>
            <td> Slides will have specified offset value from the left "border" of wrapper .</td>
          </tr>
          <tr>
            <td>offsetPxAfter</td>
            <td>number</td>
            <td>0</td>
            <td>100</td>
            <td> Slides will have specified offset value from the right "border" of wrapper .</td>
          </tr>
          <tr>
            <td>offsetSlidesBefore</td>
            <td>number</td>
            <td>0</td>
            <td>2</td>
            <td> Slides will have offset from the left "border" of wrapper that equal to the specified number of slides' widths. Useful in responsive layouts when you don't know slide's width .</td>
          </tr>
          <tr>
            <td>offsetSlidesAfter</td>
            <td>number</td>
            <td>0</td>
            <td>2</td>
            <td> Slides will have offset from the right "border" of wrapper that equal to the specified number of slides' widths. Useful in responsive layouts when you don't know slide's width .</td>
          </tr>
          <tr>
            <td colspan="5">Touch/mouse interactions</td>
          </tr>
          <tr>
            <td>touchRatio</td>
            <td>number</td>
            <td>1</td>
            <td>0.8</td>
            <td>Touch ratio</td>
          </tr>
          <tr>
            <td>simulateTouch</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td> If true, Swiper will accept mouse events like touch events (click and drag to change slides) </td>
          </tr>
          <tr>
            <td>onlyExternal</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> If true, then the only way to switch the slide is use of external API functions like swipeRight or swipeLeft. Useful for tabs like in example above </td>
          </tr>
          <tr>
            <td>followFinger</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td> If false, then slider will be animated only when you release it, it will not move while you hold your finger on it </td>
          </tr>
          <tr>
            <td>grabCursor</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> This option may a little improve usability of your swiper users. If true, user will see the "grab" cursor when hover on Swiper. </td>
          </tr>
          <tr>
            <td>shortSwipes</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td> Set to false if you want to disable short swipes. </td>
          </tr>
          <tr>
            <td>longSwipesRatio</td>
            <td>number</td>
            <td>0.5</td>
            <td>0.3</td>
            <td>Ratio to trigger swipe to next/previous slide during long swipes.</td>
          </tr>
          <tr>
            <td>moveStartThreshold</td>
            <td>number</td>
            <td>false</td>
            <td>100</td>
            <td> Threshold value in px. If "touch distance" will be lower than this value then swiper will not move. </td>
          </tr>
          
          <tr>
            <td>swipeToNext</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td>Set to false to disable swiping to next direction (to right or bottom)<span>New in 2.7.0</span></td>
          </tr>
          <tr>
            <td>swipeToPrev</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td>Set to false to disable swiping to prev direction (to left or top)<span>New in 2.7.0</span></td>
          </tr>
          <tr>
            <td colspan="5">Navigation</td>
          </tr>
          <tr>
            <td>keyboardControl</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> Set to <em>true</em> to enable navigation through slides using keyboard right and left (for horizontal mode), top and borrom (for vertical mode) keyboard arrows </td>
          </tr>
          <tr>
            <td>mousewheelControl</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> Set to <em>true</em> to enable navigation through slides using mouse wheel. </td>
          </tr>
          <tr>
            <td>mousewheelControlForceToAxis</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td> Set to <em>true</em> to force mousewheel swipes to axis. So in horizontal mode mousewheel will work only with horizontal mousewheel scrolling, and only with vertical scrolling in vertical mode. </td>
          </tr>
          <tr>
            <td colspan="5">Pagination</td>
          </tr>
          <tr>
            <td>pagination</td>
            <td>string or HTML Element</td>
            <td>-</td>
            <td>'.my-pagination'</td>
            <td>CSS selector of the container with pagination. Or HTML element of pagination element. </td>
          </tr>
          <tr>
            <td>paginationClickable</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td>If true then clicking on pagination button will cause transition to appropriate slide. .</td>
          </tr>
          <tr>
            <td>paginationAsRange</td>
            <td>boolean</td>
            <td>true</td>
            <td></td>
            <td>If true then pagination buttons that are related to visible slides will have additional css class. Useful when using slidesPerView more than 1. .</td>
          </tr>
          <tr>
            <td>createPagination</td>
            <td>boolean</td>
            <td>true</td>
            <td>false</td>
            <td> if true, then Swiper will create as many SPAN elements as many slides in slider. All these spans will be created in the container specified in the "pagination" parameter. Every SPAN will have a 'swiper-pagination-switch' class, active span (of the current slide) will have a 'swiper-active-switch' class. They will be useful for styling them. </td>
          </tr>
          <tr>
            <td colspan="5">Namespace</td>
          </tr>
          <tr>
            <td>wrapperClass</td>
            <td>string</td>
            <td>'swiper-wrapper'</td>
            <td>'my-wrapper'</td>
            <td>CSS class of the Swiper's wrapper. See the HTML demo above</td>
          </tr>
          <tr>
            <td>slideClass</td>
            <td>string</td>
            <td>'swiper-slide'</td>
            <td>'my-slide'</td>
            <td>CSS class of the Swiper's slide. See the HTML demo above</td>
          </tr>
          
          <tr>
            <td>slideActiveClass</td>
            <td>string</td>
            <td>'swiper-slide-active'</td>
            <td>'my-active-slide'</td>
            <td>CSS class of the Swiper's active slide. .</td>
          </tr>
          <tr>
            <td>slideVisibleClass</td>
            <td>string</td>
            <td>'swiper-slide-visible'</td>
            <td>'my-visible-slide'</td>
            <td>CSS class of the Swiper's visible slide. .</td>
          </tr>
          <tr>
            <td>slideElement</td>
            <td>string</td>
            <td>'div'</td>
            <td>'li'</td>
            <td> Name of tag that you use for single slide. </td>
          </tr>
          <tr>
            <td>noSwipingClass</td>
            <td>string</td>
            <td>'swiper-no-swiping'</td>
            <td>'stop-swiping'</td>
            <td> CSS class of html element that will be used to prevent swiping when "noSwiping" parameter is set to true. .</td>
          </tr>
          <tr>
            <td>paginationElement</td>
            <td>string</td>
            <td>'span'</td>
            <td>'div'</td>
            <td> Name of tag that you use for single pagination button. </td>
          </tr>
          <tr>
            <td>paginationElementClass</td>
            <td>string</td>
            <td>'swiper-pagination-switch'</td>
            <td>'my-switch'</td>
            <td>CSS class of the Swiper's pagination switch. .</td>
          </tr>
          <tr>
            <td>paginationActiveClass</td>
            <td>string</td>
            <td>'swiper-active-switch'</td>
            <td>'my-active-switch'</td>
            <td>CSS class of the Swiper's active pagination switch.</td>
          </tr>
          <tr>
            <td>paginationVisibleClass</td>
            <td>string</td>
            <td>'swiper-visible-switch'</td>
            <td>'my-visible-switch'</td>
            <td>CSS class of the Swiper's visible pagination switch. .</td>
          </tr>
          <tr>
            <td colspan="5">Callbacks</td>
          </tr>
          <tr>
            <td>queueStartCallbacks</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td>Set to "true" if you want to queue "slideChangeStart" callbacks. In this case callback will be fired only once during fast multiple swipes/transitions. .</td>
          </tr>
          <tr>
            <td>queueEndCallbacks</td>
            <td>boolean</td>
            <td>false</td>
            <td>true</td>
            <td>Set to "true" if you want to queue "slideChangeEnd" callbacks. In this case callback will be fired only once after fast multiple swipes/transitions. .</td>
          </tr>
          <tr>
            <td>onFirstInit</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td> Callback function, will be executed right after first initialization. </td>
          </tr>
          <tr>
            <td>onInit</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td> Callback function, will be executed right after all others initializations/re-intializations.  </td>
          </tr>
          <tr>
            <td>onSwiperCreated</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td>Callback function, when Swiper is fully initialized, after creation of loop, pagination, etc.</td>
          </tr>
          <tr>
            <td>onTouchStart</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td> Callback function, will be executed when you touch the slider </td>
          </tr>
          <tr>
            <td>onTouchMove</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td> Callback function, will be executed when you touch and move finger over the slider </td>
          </tr>
          <tr>
            <td>onTouchEnd</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td> Callback function, will be executed when you release the slider </td>
          </tr>
          <tr>
            <td>onSlideReset</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td> Callback function, will be executed when you release the slide and it going to be reseted to currently active slide. Don't work with freeMode. </td>
          </tr>
          <tr>
            <td>onSlideChangeStart</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper, direction){ do something }</td>
            <td> Callback function, will be executed in the beginning of animation to other slide (next or previous). Don't work with freeMode. </td>
          </tr>
          <tr>
            <td>onSlideChangeEnd</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper, direction){ do something }</td>
            <td> Callback function, will be executed after animation to other slide (next or previous). Don't work with freeMode. </td>
          </tr>
          <tr>
            <td>onSlideNext</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td> Callback function, the same as onSlideChangeStart but only for forward direction. </td>
          </tr>
          <tr>
            <td>onSlidePrev</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td> Callback function, the same as onSlideChangeStart but only for backward direction. </td>
          </tr>
          <tr>
            <td>onSlideClick</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td> Callback function, will be executed after you click any slide. </td>
          </tr>
          <tr>
            <td>onSlideTouch</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td> Callback function, will be executed right after you touch any slide. Almost the same as <em>onTouchStart</em> , but also returns <strong>.clickedSlide</strong> and <strong>.clikedSlideIndex</strong> values. </td>
          </tr>
          <tr>
            <td>onImagesReady</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td>Callback function, will be executed right after all inner images are loaded. "updateOnImagesReady" should be also set to "true". .</td>
          </tr>
          <tr>
            <td>onMomentumBounce</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper){ do something }</td>
            <td>Callback function, will be executed on momentum bounce. .</td>
          </tr>
          <tr>
            <td>onResistanceBefore</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper,p){ do something }</td>
            <td>Callback function, will be executed during negative resistance. <strong>p</strong> - returns resistance distance. .</td>
          </tr>
          
          <tr>
            <td>onResistanceAfter</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper,p){ do something }</td>
            <td>Callback function, will be executed during positive resistance. <strong>p</strong> - returns resistance distance. .</td>
          </tr>
          <tr>
            <td>onSetWrapperTransition</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper, duration){ do something }</td>
            <td>Callback function, will be executed everytime when swiper starts animation.</td>
          </tr>
          <tr>
            <td>onSetWrapperTransform</td>
            <td>function</td>
            <td>-</td>
            <td>function(swiper, transform){ do something }</td>
            <td>Callback function, will be executed when swiper's wrapper change its position. <strong>p</strong> - returns object with current transform offset.</td>
          </tr>
          
        </tbody>
      </table>
      <h2>Example</h2>
      <pre>
&lt;script type=&quot;text/javascript&quot;&gt;
$(document).ready(function(){
  var mySwiper = $('.swiper-container').swiper({
    mode : 'vertical', <em>//Switch to vertical mode</em>
    speed : 500, <em>//Set animation duration to 500ms</em>
    freeMode : true, <em>//Enable free mode</em>
    freeModeFluid : true, <em>//Enable 'fluid' free mode</em>
    onTouchStart : function() {
      <em>//Do something when you touch the slide</em>
      alert('OMG you touch the slide!') 
    }
  }
})
&lt;/script&gt;
    </pre>
      <h2>Callbacks API</h2>
      <p>Since version 2.4 Swiper comes with improved additive callbacks, now you can add functions to the same callback.</p>
      <p>When you initialize Swiper you specify callbacks in old way:</p>
      <pre>
$(document).ready(function(){
  var mySwiper = new Swiper('.swiper-container',{
    mode:'vertical',
    speed: 600,
    <b>onSlideChangeStart</b>: function(swiper){
      alert('Hello 1');
    }
  });  
});
      </pre>
      <p>And now you can add new function to the callback instead of rewriting onSlideChangeStart parameter entirely:</p>
      <pre>
mySwiper.addCallback('<b>SlideChangeStart</b>', function(swiper){
  alert('Hello 2');
})        
      </pre>
      <p>And now you will see two alerts "Hello 1" and "Hello 2" in the beginning of transition. In this <b>addCallback</b> method you should specify callback name without "on".</p>
      <p>If you need to fire your callback function externally you may use:</p>
      <pre>
mySwiper.fireCallback('SlideChangeEnd', mySwiper);
      </pre>
      <p>If you need to remove callbacks you need to use:</p>
      <pre>
mySwiper.removeCallbacks('SlideChangeEnd');
      </pre>
      <h2>Slides API</h2>
      <p> Swiper comes with powerful Slides API that is intended for dynamic slides creation/deletion/manupilation. </p>
      <h2>Slide Instance</h2>
      <p> Swiper's Slide instance is the simple HTMLElement but extended with usefull methods </p>
      <p> According to the following example mySwiper variable contains Swiper's object with options and methods </p>
      <pre>
&lt;script type=&quot;text/javascript&quot;&gt;
$(document).ready(function(){
  var mySwiper = $('.swiper-container').swiper({
    mode : 'vertical', <em>//Switch to vertical mode</em>
    speed : 500, <em>//Set animation duration to 500ms</em>
    freeMode : true, <em>//Enable free mode</em>
    freeModeFluid : true, <em>//Enable 'fluid' free mode</em>
    onTouchStart : function() {
      <em>//Do something when you touch the slide</em>
      alert('OMG you touch the slide!') 
    }
  }
})
&lt;/script&gt;
    </pre>
      <p>You can create swiper's slide instance by calling:</p>
      <p> <strong>mySwiper.createSlide(html, slideClassList, element)</strong> where: </p>
      <ul>
        <li> <strong>html</strong> <em>(string, required)</em> - inner HTML of created slide </li>
        <li> <strong>slideClassList</strong> <em>(string, optional)</em> - "class" attribute of created slide. By default equal to "slideClass" option which by default equal to "swiper-slide" </li>
        <li> <strong>element</strong> <em>(string, optional)</em> - html tag of created slide, by default equal to "div" </li>
      </ul>
      <pre>
var mySwiper = $('.swiper-container').swiper({...some options...})

<em>//Create new instance of slide:</em>

var newSlide = mySwiper.createSlide('&lt;p&gt;Here is my new slide&lt;/p&gt;');
<em>// This will generate the following HTML slide: '&lt;div class="swiper-slide"&gt; &lt;p&gt;Here is my new slide&lt;/p&gt; &lt;/div&gt;'</em>

var newSlide = mySwiper.createSlide('&lt;p&gt;Hello&lt;/p&gt;', 'swiper-slide red-slide', 'span');
<em>// This will generate the following HTML slide: '&lt;span class="swiper-slide red-slide"&gt; &lt;p&gt;Hello&lt;/p&gt; &lt;/span&gt;'</em>

    </pre>
      <p> After that " <strong>newSlide</strong> " variable contains just created new instance of Slide, but at the moment it still in the memory, not inside of slider. To add it to slider we can use some of the following <strong>chainable</strong> methods available on swiper's Slide instance: </p>
      <ul>
        <li>
          <p> <strong>newSlide.append()</strong> - add new slide as the last slide of slider. Returns Slide instance </p>
        </li>
        <li>
          <p> <strong>newSlide.prepend()</strong> - add new slide as the first slide of slider before other slides. Returns Slide instance </p>
        </li>
        <li>
          <p> <strong>newSlide.remove()</strong> - remove slide </p>
        </li>
        <li>
          <p> <strong>newSlide.getWidth()</strong> - returns slide's width .</p>
        </li>
        <li>
          <p> <strong>newSlide.getHeight()</strong> - return slide's height .</p>
        </li>
        <li>
          <p> <strong>newSlide.getOffset()</strong> - returns object with slide's left and top offsets .</p>
        </li>
        <li>
          <p> <strong>newSlide.insertAfter(index)</strong> [index - <em>number</em> ] - insert new slide right after the slide with index number equal to <em>index</em> . Returns Slide instance </p>
        </li>
        <li>
          <p> <strong>newSlide.clone()</strong> - clone slide to new slide instance that you can append/prepend/etc. Returns new cloned Slide instance </p>
        </li>
      </ul>
      <pre>
<em>//Examples</em>

var mySwiper = $('.swiper-container').swiper({...some options...})

<em>//Create new instance of slide:</em>
var newSlide = mySwiper.createSlide('&lt;p&gt;Here is my new slide&lt;/p&gt;');
newSlide.append() <em>// - new slide will be added as the last slide of slider after all existing slides</em>

var newSlide = mySwiper.createSlide('&lt;p&gt;Here is my new slide&lt;/p&gt;');
newSlide.prepend() <em>// - new slide will be added as the first slide of slider before all existing slides</em>

<em>//Clone Slide and append</em>
var clonedSlide = newSlide.clone()
clonedSlide.append()

<em>//Crazy Chaining</em>
var newSlide = mySwiper.createSlide('&lt;p&gt;Here is my new slide&lt;/p&gt;');
newSlide.prepend().clone().append().clone().insertAfter(2) <em>// - new slide will be added as the first slide of slider before all existing slides, then cloned to new slide that will be added as the last slide of slider after all existing slides, then cloned again to new slide that will be added after the slide with index number equal to 2</em>
    </pre>
      <p>There are also several helpers methods:</p>
      <ul>
        <li>
          <p> <strong>slide.html(innerHTML)</strong> [innerHTML - <em>string</em> ] - works similar to jQuery/Zepto .html() function. If you specify <em>innerHTML</em> then it will replace slide's inner html and function will return slide instance. If <em>innerHTML</em> is not specified then this function will return slide's inner html. </p>
        </li>
        <li>
          <p> <strong>slide.index()</strong> - returns index number of slide </p>
        </li>
        <li>
          <p> <strong>slide.isActive()</strong> - returns true if slide is currently active </p>
        </li>
        <li>
          <p> <strong>slide.setData(name,value)</strong> [name - <em>string</em> ] - function to store data in slide. You can store any type of variables - arrays, objects, numbers, strings, etc. </p>
        </li>
        <li>
          <p> <strong>slide.getData(name)</strong> [name - <em>string</em> ] returns value of variable stored with .setData() </p>
        </li>
        <li>
          <p> <strong>slide.data(name,value)</strong> [name - <em>string</em> , value - <em>string</em> ] - save string values in data-[name] attributes. </p>
        </li>
        <li>
          <p> <strong>slide.data(name)</strong> [name - <em>string</em> ] - returns value of slide's data-[name] attribute. </p>
        </li>
      </ul>
      <pre>
<em>//Examples</em>

var mySwiper = $('.swiper-container').swiper({...some options...})

<em>//Create new instance of slide:</em>
var newSlide = mySwiper.createSlide('&lt;p&gt;Here is my new slide&lt;/p&gt;');
newSlide.append().clone().html('&lt;p&gt;New HTML&lt;/p&gt;').prepend() <em>
// new slide will be added as the last slide of slider after all existing slides, then cloned to new slide with other inner html and that will be added as a first slide</em>

var newSlide = mySwiper.createSlide('&lt;p&gt;Here is my new slide&lt;/p&gt;');
alert(newSlide.html()) <em>// -> &lt;p&gt;Here is my new slide&lt;/p&gt;</em>

<em>Store/Get data:</em>
newSlide.prepend().setData('apples',['iMac', 'MacBook Pro', 'iPhone', 'iPad'])
newSlide.getData('apples') <em>// -> ['iMac', 'MacBook Pro', 'iPhone', 'iPad']</em>

newSlide.data('apple','iPad');
newSlide.data('apple') <em>// ->'iPad'</em>

    </pre>
      <h2>Swiper Slides</h2>
      <p> Ok, let's look on swiper methods on how to manage existing slides or add/remove slides from "other side": </p>
      <ul>
        <li>
          <p> <strong>mySwiper.slides</strong> - array with slides (slides instances) </p>
        </li>
        <li>
          <p> <strong>mySwiper.appendSlide(innerHTML, slideClassList, element)</strong> - create new slide and insert it as the last slide of slider. Returns Slide instance. Where: </p>
          <ul>
            <li> <strong>html</strong> <em>(string, required)</em> - inner HTML of created slide </li>
            <li> <strong>slideClassList</strong> <em>(string, optional)</em> - "class" attribute of created slide. By default equal to "slideClass" option which by default equal to "swiper-slide" </li>
            <li> <strong>element</strong> <em>(string, optional)</em> - html tag of created slide, by default equal to "div" </li>
          </ul>
        </li>
        <li>
          <p> <strong>mySwiper.appendSlide(slideInstance)</strong> [slideInstance - <em>HTMLElement</em> ] - insert slideInstance as the last slide of slider. Returns Slide instance. </p>
        </li>
        <li>
          <p> <strong>mySwiper.prependSlide(innerHTML, slideClassList, element)</strong> - create new slide and insert it as the first slide of slider. Returns Slide instance. </p>
        </li>
        <li>
          <p> <strong>mySwiper.prependSlide(slideInstance)</strong> [slideInstance - <em>HTMLElement</em> ] - insert slideInstance as the first slide of slider. Returns Slide instance. </p>
        </li>
        <li>
          <p> <strong> mySwiper.insertSlideAfter(index, innerHTML, slideClassList, element) </strong> - create new slide and insert it after the slide with index number equal to index. Returns Slide instance. </p>
        </li>
        <li>
          <p> <strong>mySwiper.insertSlideAfter(index, slideInstance)</strong> - insert slideInstance after the slide with index number equal to index. Returns Slide instance. </p>
        </li>
        <li>
          <p> <strong>mySwiper.removeSlide(index)</strong> [index - <em>number</em> ] - remove slide with index number equal to index </p>
        </li>
        <li>
          <p> <strong>mySwiper.removeLastSlide()</strong> - remove last slide </p>
        </li>
        <li>
          <p> <strong>mySwiper.removeAllSlides()</strong> - remove all slider slides </p>
        </li>
        <li>
          <p> <strong>mySwiper.getSlide(index)</strong> [index - <em>number</em> ] - returns slide (slide instance) with the index number equal to index </p>
        </li>
        <li>
          <p> <strong>mySwiper.getLastSlide()</strong> - returns last slider slide (slide instance) </p>
        </li>
        <li>
          <p> <strong>mySwiper.getFirstSlide()</strong> - returns first slider slide (slide instance) </p>
        </li>
      </ul>
      <pre>
<em>//Examples:</em>

<em>//Create new slide and append</em>
mySwiper.appendSlide('Hello World')
<em>//OR:</em>
var newSlide = mySwiper.createSlide('Hello World')
mySwiper.appendSlide(newSlide)
<em>//OR:</em>
mySwiper.appendSlide( mySwiper.createSlide('Hello World') )

<em>//Clone first slide and insert to the end</em>
mySwiper.getFirstSlide().clone().append();
<em>//OR:</em>
mySwiper.appendSlide( mySwiper.getSlide(0).clone() )

<em>//Clone second slide with other HTML and insert to the end</em>
mySwiper.getSlide(1).clone().html('Hello New World!').append();

<em>//Remove Last slide</em>
mySwiper.removeLastSlide()

<em>//Remove second slide</em>
mySwiper.removeSlide(1)

<em>//Trick: Swap first and second slides</em>
mySwiper.getSlide(0).insertAfter(1)

<em>//Trick: Move first slide to last postion</em>
mySwiper.getFirstSlide().append()

<em>//Number of slides in slider</em>
alert(mySwiper.slides.length)

<em>//Change HTML of each slide</em>
for (var i = 0; i &lt; mySwiper.slides.length; i++) {
  var slide = mySwiper.slides[i]
  slide.html('&lt;p&gt; My index number is '+i+' &lt;/p&gt;')
}
    </pre>
      <h2>Important Notes</h2>
      <p> When using functions that change number of slides (like append, prepend, remove, etc.), .reInit() function will be called and number of slides will be recalculated automatically. So it is highly don't recommended to add/remove slides dynamically using "slides.length" in "for" loop becausie it may produce infinite loop. </p>