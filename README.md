<h1>Swiper - Mobile touch slider with hardware accelerated transitions</h1>
<h2>About</h2>
<p><strong>Swiper</strong> - is the <strong>free and ultra lightweight</strong> mobile touch slider with hardware accelerated transitions (where supported) and amazing native behavior. It is intended to use in mobile websites, mobile web apps, and mobile native apps. Designed mostly for iOS, but also works on Android and latest Desktop browsers. <strong>Swiper</strong> is created by <a href="http://www.idangero.us">iDangero.us</a></p>
<h2>Change Log</h2>
<h3>Swiper 2.1.0 - Updated on August 22, 2013</h3>
<ul>
  <li>Many fixes and improvements</li>
  <li>Updated <a href="http://www.idangero.us/sliders/swiper/plugins/scrollbar.php">Scrollbar</a> plugin with new onScrollbarDrag callback</li> 
  <li>New <a href="http://www.idangero.us/sliders/swiper/api.php">API</a> inFirstInit and onInit callbacks</li>
  <li>New <a href="http://www.idangero.us/sliders/swiper/demos.php">Pull To Refresh</a> demo</li>
  <li>Improved "noSwiping" logic</li>
  <li>Fixed clickedSlideIndex for IE7-8</li>
  <li>Fixed "calculateHeight" logic</li>
  <li>Other minor fixes</li>
</ul>
<h3>Swiper 2.0.0 - Updated on June 22, 2013</h3>
<ul>
  <li>Many new features, new functionality, new core, new API</li>
  <li>Better old IE support, now it supports even IE 7 (jQuery required)</li>
  <li>Lot of major and minor fixes</li>
</ul>
<h3>Swiper 1.9.4 - Updated on May 23, 2013</h3>
<ul>
  <li>Fixed Autoplay in non loop mode with slidesPerSlide more than 1</li>
  <li>Ability to enable/disable callback queues to get more control over the callbacks</li>
  <li>Minor Fixes</li>
</ul>
<h3>Swiper 1.9.3 - Updated on April 30, 2013</h3>
<ul>
  <li>Few important fixes including IE8 improvements</li>
  <li>Updated <a href="plugins/scrollbar.php">Scrollbar</a> plugin to be compatible with IE8</li> 
</ul>
<h3>Swiper 1.9.2 - Updated on April 19, 2013</h3>
<ul>
  <li>New <a href="http://www.idangero.us/sliders/swiper/api.php">API</a> features:
    <ul>
      <li>New feature to enable 100% resitance with <code>nopeek</code> parameter</li>
      <li>New feature to disable "swiping" on some slide with additional <code>NoSwiping</code> element's class</li>
      <li><code>.activeSlide</code> became <code>.activeIndex</code></li>
      <li><code>.previousSlide</code> became <code>.previousIndex</code></li>
    </ul>
  </li> 
  <li>IE9 fix for with in percents</li>
  <li>Other minor fixes and improvements</li>
</ul> 
<h3>Swiper 1.9.1 - Updated on April 6, 2013</h3>
<ul>
  <li>New <a href="http://www.idangero.us/sliders/swiper/api.php">API</a> features:
    <ul>
      <li>New feature to disable short swipes with <code>shortSwipes</code> parameter</li>
      <li>New feature to add "start" threshold <code>moveStartThreshold</code> parameter</li>
      <li>New feature to use left/top wrapper position offset instead of use of css3 transforms <code>useCSS3Transforms</code> parameter</li>
    </ul>
  </li> 
  <li>Updates CSS file</li>
  <li>Minor fixes and improvements</li>
</ul>
<h3>Swiper 1.9 - Updated on March 16, 2013</h3>
<ul>
  <li>Added support for devices that can use both mouse and touch "pointers" at the same time, like many of Windows 8 tablets and notebooks</li>
  <li>New <a href="http://www.idangero.us/sliders/swiper/api.php">API</a> features:
    <ul>
      <li>New feature to set "group sliding" with <code>slidesPerGroup</code> parameter</li>
      <li>Now you can hardcode resize event (for example "resize" instead of "orientationchange" for mobiles) with <code>resizeEvent</code> parameter</li>
    </ul>
  </li> 
  <li>Fixes:
    <ul>
      <li>Fixed situation when slider can get stuck between slides when tapped during transition</li>
      <li>Now clickedSlide will return correct slide in loop mode</li>
    </ul>
  </li> 
  <li>Minor fixes</li>
</ul>
<h3>Swiper 1.8.8 - Updated on March 4, 2013</h3>
<ul>
  <li>Improved cursors usablity with autmatic grab cursors for container and drag cursor for scrollbar</li> 
  <li>Improved mousewheel control for scroll container/free mode to have more native scrolling behavior</li> 
  <li>Snap functionality for scrollbar</li>
  <li><a href="http://www.idangero.us/sliders/swiper/plugins/scrollbar.php">Scrollbar</a> plugin updated to version 1.2</li>
  <li>Minor fixes</li>
</ul>
<h3>Swiper 1.8.7 - Updated on February 22, 2013</h3>
<ul>
  <li>Fixed initialSlide/resize issue</li> 
  <li>New ability to use slides with fixed width in fluid container with a <code>slidesPerSlide:'auto'</code></li>
  <li>Pagination switch that appropriate to active slide index has additional "swiper-activeslide-switch"</li>
  <li>Other minor fixes</li>
</ul>
<h3>Swiper 1.8.5 - Updated on February 5, 2013</h3>
<ul>
  <li>
    New <a href="http://www.idangero.us/sliders/swiper/api.php">API</a> features:
    <ul>
      <li>New keyboard arrows navigation with "keyboardControl" option</li>
      <li>New mousewheel navigation with "mousewheelControl" option</li>
    </ul>
  </li>
  <li>Now it is possible to pass HTMLElement on initialization, not only css selector like before</li>
  <li>Updated <a href="http://www.idangero.us/sliders/swiper/plugins/3dflow.php">3D Flow</a></li>
  <li>Updated <a href="http://www.idangero.us/sliders/swiper/plugins/scrollbar.php">Scrollbar</a></li>
  <li>Fixed small Android and IE8 bugs</li>
  <li>Improved "scrollContainer" to be more responsive</li>
  <li>Other minor core fixes</li>
</ul>
<h3>Swiper 1.8 - Updated on January 18, 2013</h3>
<ul>
  <li>New huge and awesome <a href="http://www.idangero.us/sliders/swiper/api.php#slidesapi">Slides API</a></li>
  <li>
    New <a href="http://www.idangero.us/sliders/swiper/api.php">API</a> features:
    <ul>
      <li>New initialization option "initialSlide"</li>
      <li>New methods: ".reInit()", ".currentSlide()", ".clickedSlide"</li>
      <li>New callbacks: "onSlideClick" and "onSlideTouch"</li>
    </ul>
  </li>
  <li>Update <a href="http://www.idangero.us/sliders/swiper/plugins/3dflow.php">3D Flow</a> plugin to work with new features</li>
  <li>Lot of minor and few major core fixes</li>
</ul>
<h3>Swiper 1.7 - Updated on December 19, 2012</h3>
<ul>
	<li>New API features</li>
	<li>Scroll Container Improvements</li>
	<li>Reworked internal plugins API</li>
	<li>Windows Phone 8 Support</li>
	<li>Minor fixes</li>
</ul>
<h3>Swiper 1.6 - Updated on December 11, 2012</h3>
<ul>
	<li>New Scroll Container mode to use like simple scrollable area!</li>
	<li>New API features</li>
	<li>Highly improved nested behavior to create multi dimensional apps</li>
	<li>Fixed auto play in loop mode</li>
	<li>Fixed initialization "delay" in loop mode</li>
	<li>New internal plugins API (beta). It allows to create own Swiper plugins</li>
	<li>Improved Internet Explorer 8 support</li>
	<li>Minor fixes</li>
</ul>
<h3>Swiper 1.5.5 - Updated on October 20, 2012</h3>
<ul>
	<li>Internet Explorer 8 support (without animation)</li>
	<li>FireFox below 11 support</li>
</ul>
<h3>Swiper 1.5 - Updated on October 6, 2012</h3>
<ul>
	<li>A lot of major and minor fixes, core optimization</li>
	<li>Now it works in Internet Explorer 9 (without animation) and Internet Explorer 10</li>
	<li>Improved perfomance</li>
	<li>New "loop" mode with infinite scroll (see demo below)</li>
	<li>New carousel mode, now you can show few slides per slider container (see demo below)</li>
	<li>New "smart" pagination, looks fun with loop and carousel modes</li>
	<li>Now Swipers can be easily nested one into another (see demo below)</li>
	<li>Added ability to disable automatic slider resize on windows resize</li>
	<li>Updated CSS</li>
</ul>
<h3>Swiper 1.3 - Updated on April 15, 2012</h3>
<ul>
	<li>External functions swipeNext, swipePrev, swipeTo now return true or false.</li>
	<li><strong>.previousSlide</strong> property returns the index of previously displayed slide</li>
	<li>Added <strong>onSlideInitialize</strong> callback</li>
</ul>
<h3>Swiper 1.3 - Updated on April 2, 2012</h3>
<ul>
	<li>Added <strong>onSlideChangeStart</strong> callback</li>
	<li>Added <strong>onSlideReset</strong> callback</li>
	<li><strong>onSlideChange</strong> is renamed to <strong>onSlideChangeEnd</strong></li>
	<li>Now <strong>.swipeTo()</strong> method accepts 3 parameters - index <em>(number)</em>, speed <em>(number)</em> and runCallbacks <em>(boolean)</em></li>
	<li>Now <strong>.swipeTo()</strong> method will produce 'onSlideChangeStart' and 'onSlideChangeEnd' callback functions (if "runCallbacks" is not equal to "false")</li>
	<li>New <strong>mySwiper.destroy()</strong> method to release all events assigned by Swiper</li>
	<li>Fixed serious bug when using fluid (responsive) Swiper to re-calculate slides' position on window resize</li>
</ul>
<h3>Swiper 1.2 - Updated on March 31, 2012</h3>
<ul>
	<li>Improved mouse events to get the same behaviour as on touch devices</li>
</ul>
<h3>Swiper 1.1 - Updated on March 18, 2012</h3>
<ul>
	<li>Added <strong>autoPlay</strong> parameter to enable auto play</li>
    <li><strong>mySwiper.startAutoPlay()</strong> - external function to start auto play</li>
    <li><strong>mySwiper.startAutoPlay()</strong> - external function to stop auto play</li>
    <li>Optimized for usage as a fallback for upcoming <a href="http://www.idangero.us/sliders/s6/" target="_blank"><strong>"iDangero.us S6"</strong></a> 3D slider</li>
    <li>Added small plugin to use Swiper with <a href="http://zeptojs.com" target="_blank">Zepto.js</a></li>
</ul>
<h3>Swiper 1.0 - Initial release on March 15, 2012</h3>

<h2>Features</h2>
<ul>
	<li><p><strong>1:1 Touch movement</strong>. But this ratio can be configured</p></li>
	<li><p><strong>Touch emulation</strong>. This function will be useful if you are going to use Swiper on desktop sites. In this case Swiper will accept mouse events like touch events (click and drag to change slides)</p></li>
	<li><p><strong>Vertical/Horizontal</strong>. Swiper comes with 2 main modes - horizontal (for horizontal animation and horizontal swipes) and vertical (for vertical animation and vertical swipes)</p></li>
	<li><p><strong>Free Mode</strong>. When this mode enabled slides will not have fixed positions, like usual scroller (see demos bellow)</p></li>
	<li><p><strong>Rotation/resize adjustment</strong>. Swiper will be reinitialized after rotation of device</p></li>
	<li><p><strong>Responsive</strong>. Can be used with a width or/and height defined in percents, not fixed. Useful for usage on devices with a different resolutions</p></li>
	<li><p><strong>Scroll prevention</strong>. Swiper will prevent vertical scroll when you touch it in "horizontal" mode, and horizontal scroll in "vertical" mode</p></li>
	<li><p><strong>Resistant bounds</strong>. Swiper will increase resistance when you try to swipe it over than most left and most right positions (most top and most bottom for "vertical" mode)</p></li>
	<li><p><strong>Built-in pagination control</strong>. Can be disabled</p></li>
	<li><p><strong>Auto Play</strong>. Just set the delay and Swiper will change the slides automatically untill you touch it.</p></li>
	<li><p><strong>Loop mode</strong>. In this mode you will get infinite scrolling and first slides will repeat after last ones. <span class="new-in">New in 1.5</span></p></li>
	<li><p><strong>Carousel mode</strong>. Swiper allows you to set numbers of slides you want to display at the same time on slider's container. <span class="new-in">New in 1.5</span></p></li>
	<li><p><strong>Nested Swipers.</strong> You can insert one Swiper into slide of different Swiper, for example vertical into horizontal. <span class="new-in">New in 1.5</span></p></li>
	<li><p><strong>Any HTML</strong>. You can put any HTML content inside of slide, not only images</p></li>
	<li><p><strong>Rich API</strong>. Swiper comes with very rich API. It allows to create your own pagination, "next" and "previous" buttons and comes with 4 callbacks - onTouchStart, onTouchMove, onTouchEnd, onSlideSwitch </p></li>
	<li><p><strong>Flexible configuration</strong>. Swiper accepts a lot of parameters on initialization to make it much flexible as possible. You can configure animation speed, mode (vertical or horizontal), free mode, enable/disable pagination, touch ratio, etc.</p></li>
	<li><p><strong>Hardware accelerated</strong>. Swiper uses hardware accelerated technics (where supported) to achive ultra smooth animation and perfomance, especially on iOS devices.</p></li>
	<li><p><strong>Awesome compatibility</strong>. Swiper compatible and tested with: Mobile Safari (tested on iOS5), Android 2.1+, latest desktop versions of Google Chrome, Safari, Firefox, Internet Explorer 10 and Opera. It also works in Internet Explorer 9 but without animation.</p></li>
	<li><p><strong>Standalone</strong>. Swiper doesn't require any JavaScript libraries like jQuery, it makes Swiper much more smaller and faster. So it can be safely used with such libraries as jQuery, jQuery Mobile, jQTouch, etc.</p></li>
	<li><p><strong>Ultra lightweight</strong>. Only 3.2 KB minified and gzipped</p></li>
</ul>
<p><em><strong>With all these features you can build amazing touch interfaces and apps with awesome native behavior.</strong></em></p>

<h2>Demos & Usage</h2>
<p><a href="http://www.idangero.us/sliders/swiper/">http://www.idangero.us/sliders/swiper/</a></p>

<h2>License</h2>
<p>Swiper is licensed under GPL & MIT</p>
