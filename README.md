<h1>Swiper - Mobile touch slider with hardware accelerated transitions</h1>
<h2>About</h2>
<p><strong>Swiper</strong> - is the <strong>free and ultra lightweight</strong> mobile touch slider with hardware accelerated transitions (where supported) and amazing native behavior. It is intended to use in mobile websites, mobile web apps, and mobile native apps. Designed mostly for iOS, but also works on Android and latest Desktop browsers. <strong>Swiper</strong> is created by <a href="http://www.idangero.us">iDangero.us</a></p>
<h2>Demos</h2>
<p><a href="http://www.idangero.us/sliders/swiper/">http://www.idangero.us/sliders/swiper/</a></p>
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
	<li><p><strong>Any HTML</strong>. You can put any HTML content inside of slide, not only images</p></li>
	<li><p><strong>Rich API</strong>. Swiper comes with very rich API. It allows to create your own pagination, "next" and "previous" buttons and comes with 4 callbacks - onTouchStart, onTouchMove, onTouchEnd, onSlideSwitch </p></li>
	<li><p><strong>Flexible configuration</strong>. Swiper accepts a lot of parameters on initialization to make it much flexible as possible. You can configure animation speed, mode (vertical or horizontal), free mode, enable/disable pagination, touch ratio, etc.</p></li>
	<li><p><strong>Good compatibility</strong>. Swiper compatible and tested with: Mobile Safari (tested on iOS5), Android 2.1+, latest desktop versions of Google Chrome, Safari, Firefox and Opera</p></li>
	<li><p><strong>Standalone</strong>. Swiper doesn't require any JavaScript libraries like jQuery, it makes Swiper much more smaller and faster. </p></li>
	<li><p><strong>Ultra lightweight</strong>. Only 2.3 KB minified and gzipped</p></li>
</ul>
<h2>Usage</h2>
<p>1. Download the latest version of Swiper from GitHub here.</p>
<p>2. Add to HEAD <strong>Swiper's CSS and JS</strong>:</p>
<pre>
&lt;head&gt;
  ....
  &lt;link rel=&quot;stylesheet&quot; href=&quot;path_to_css/<strong>idangerous.swiper-1.0.css</strong>&quot;&gt;
  &lt;script defer src=&quot;path_to_js/<strong>idangerous.swiper-1.0.js</strong>&quot;&gt;&lt;/script&gt;
  ....
&lt;/head&gt;
</pre>
<p>3. Use the following <strong>HTML</strong> layout: </p>
<pre>
&lt;div class=&quot;swiper-container&quot;&gt;
  &lt;div class=&quot;swiper-wrapper&quot;&gt;
      <strong>&lt;!--First Slide--&gt;</strong>
      &lt;div class=&quot;swiper-slide&quot;&gt;
        <em>&lt;!-- Any HTML content of the first slide goes here --&gt;</em>
      &lt;/div&gt;
      
      <strong>&lt;!--Second Slide--&gt;</strong>
      &lt;div class=&quot;swiper-slide&quot;&gt;
        <wm>&lt;!-- Any HTML content of the second slide goes here --&gt;</wm>
      &lt;/div&gt;
      
      <strong>&lt;!--Third Slide--&gt;</strong>
      &lt;div class=&quot;swiper-slide&quot;&gt;
        <em>&lt;!-- Any HTML content of the third slide goes here --&gt;</em>
      &lt;/div&gt;
      &lt;!--Etc..--&gt;
  &lt;/div&gt;
&lt;/div&gt;

</pre>
<p>4. Open <strong>idangerous.swiper-1.0.css</strong> and set the Swiper's width and height (in the end of the file):</p>
<pre>
...
/* Specify Swiper's Size: */
.swiper-container, .swiper-slide {
	width: 500px;
	height: 200px;
}
</pre>
<p>5. <strong>Initialize</strong> Swiper on document ready (or when window is loaded):</p>
<pre>
&lt;script type=&quot;text/javascript&quot;&gt;
<em>//Use document ready or window load events
// For example:
// With jQuery: $(function() { ...code here... })
// Or window.onload = function() { ...code here ...}
// Or document.addEventListener('DOMContentLoaded', function(){ ...code here... }, false)</em>

window.onload = function() {
  var mySwiper = new Swiper('.slider-container',options);
  <em>//Or with jQuery</em>
  var mySwiper = $('.slider-container').swiper(options);
}
&lt;/script&gt;

</pre>
<h2>API</h2>
<h3>new Swiper(container, options)</h3>
<ul>
  <li><p><strong>container</strong> - <em>string</em>, <em>required</em>. CSS selector of Swiper's container. In the HTML code above it should be equal to '.swiper-container'</p></li>
  <li><p><strong>options</strong> - <em>object</em>, <em>optional</em>. Swiper parameters, see bellow</p></li>
</ul>
<h4>Usage:</h4>
<code>
var <strong>mySwiper</strong> = new Swiper('.swiper-container')
</code>
<p>Returns the object with couple of useful functions and methods:</p>
<ul>
	<li><p><strong>mySwiper.swipeNext()</strong> - run transition to next slide</p></li>
	<li><p><strong>mySwiper.swipePrev()</strong> - run transition to previous slide</p></li>
	<li><p><strong>mySwiper.swipeTo(index)</strong> - run transition to the slide with index number equal to number argument</p></li>
	<li><p><strong>mySwiper.isSupportTouch()</strong> - returns <em>true</em> if browser supports Touch events</p></li>
	<li><p><strong>mySwiper.isSupport3D()</strong> - returns <em>true</em> if browser supports CSS3 3D transforms</p></li>
	<li><p><strong>mySwiper.activeSlide</strong> - returns the index number of currently active slide</p></li>
</ul>

<h3>"options"</h3>
<p>Swiper support the following list of parameters on initialization:</p>
<table>
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
			<td>mode</td>
			<td>string</td>
			<td>'horizontal'</td>
			<td>'vertical'</td>
			<td>slides will be positioned horizontally (for horizontal swipes) or vertically (for vertical swipes)</td>
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
			<td>If true, then if you release the slide it will keep moving for a while</td>
		</tr>
		<tr>
			<td>ratio</td>
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
			<td>If true, Swiper will accept mouse events like touch events (click and drag to change slides)</td>
		</tr>
		<tr>
			<td>onlyExternal</td>
			<td>boolean</td>
			<td>false</td>
			<td>true</td>
			<td>If true, then the only way to switch the slide is use of external API functions like swipeRight or swipeLeft. Useful for tabs like in example above</td>
		</tr>
		<tr>
			<td>followFinger</td>
			<td>boolean</td>
			<td>true</td>
			<td>false</td>
			<td>If false, then slider will be animated only when you release it, it will not move while you hold your finger on it</td>
		</tr>
		<tr>
			<td>pagination</td>
			<td>string</td>
			<td>-</td>
			<td>'.my-pagination'</td>
			<td>CSS selector of the container with pagination.</td>
		</tr>
		<tr>
			<td>createPagination</td>
			<td>boolean</td>
			<td>true</td>
			<td>false</td>
			<td>if true, then Swiper will create as many SPAN element as many slides in slider. All these spans will be created in the container specified in the "pagination" parameter. Every SPAN will have a 'swiper-pagination-switch' class, active span (of the current slide) will have a 'swiper-active-switch' class. They will be useful for styling them.</td>
		</tr>
		<tr>
			<td>followFinger</td>
			<td>boolean</td>
			<td>true</td>
			<td>false</td>
			<td>If false, then slider will be animated only when you release it, it will not move while you hold your finger on it</td>
		</tr>
		<tr>
			<td>wrapperClass</td>
			<td>string</td>
			<td>'swiper-wrapper'</td>
			<td>'my-wrapper'</td>
			<td>CSS class of the Swiper's wrapper. See the HTML demo above</td>
		</tr>
		<tr>
			<td>paginationClass</td>
			<td>string</td>
			<td>'swiper-pagination-switch'</td>
			<td>'my-switch'</td>
			<td>CSS class of the Swiper's pagination switch</td>
		</tr>
		<tr>
			<td>paginationActiveClass</td>
			<td>string</td>
			<td>'swiper-active-switch'</td>
			<td>'my-wrapper'</td>
			<td>CSS class of the active Swiper's pagination switch</td>
		</tr>
		<tr>
			<td>onTouchStart</td>
			<td>function</td>
			<td>-</td>
			<td>function(){ do something }</td>
			<td>Callback function, will be executed when you touch the slider</td>
		</tr>
		<tr>
			<td>onTouchMove</td>
			<td>function</td>
			<td>-</td>
			<td>function(){ do something }</td>
			<td>Callback function, will be executed when you touch and move finger over the slider</td>
		</tr>
		<tr>
			<td>onTouchEnd</td>
			<td>function</td>
			<td>-</td>
			<td>function(){ do something }</td>
			<td>Callback function, will be executed when you release the slider</td>
		</tr>
		<tr>
			<td>onSlideSwitch</td>
			<td>function</td>
			<td>-</td>
			<td>function(){ do something }</td>
			<td>Callback function, will be executed after the animation to other slide (next or previous). Don't work with freeMode</td>
		</tr>
		
		
	</tbody>

</table>
<h3>Example</h3>
<pre>
&lt;script type=&quot;text/javascript&quot;&gt;
$(function(){
  var mySwiper = new Swiper('.swiper-container', {
    mode : 'vertical', <em>//Switch to vertical mode</em>
    speed : 500, <em>//Set animation duration to 500ms</em>
    freeMode : true, <em>//Enable free mode</em>
    freeModeFluid : true, <em>//Enable 'fluid' free mode</em>
    onTouchStart : function() {
      alert('OMG you touch the slide!') <em>//Do something when you touch the slide</em>
    }
  }
})
&lt;/script&gt;
</pre>

<h2>License</h2>
<p>Swiper is licensed under GPL & MIT</p>
