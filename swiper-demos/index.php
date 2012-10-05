<?php 
define("gears",true);
require_once ("../../configuration.php");
require_once ("../../includes/db-connect.php");
require_once ("../../includes/login.php");
require_once ("../../includes/functions.php");
?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>iDangero.us Swiper - Mobile Touch Slider With Hardware Accelerated Transitions</title>
  <meta name="description" content="Swiper - is the free and ultra lightweight mobile touch slider with hardware accelerated transitions">
  <meta name="keywords" content="swiper, mobile slider, touch slider, ios slider, android slider, touch gallery, jquery slider, jquery mobile slider, web app slider, native app slider, free slider, swipe slider">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href='http://fonts.googleapis.com/css?family=Lobster+Two:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/idangerous.swiper-1.5.css">
  <link rel="stylesheet" href="http://www.idangero.us/api/menu/idangerous.menu.css">
  <link rel="stylesheet" href="css/style.css">
  <script  src="js/libs/jquery-1.7.1.min.js"></script>
  <script  src="js/idangerous.swiper-1.5.min.js"></script>
  <script  src="http://www.idangero.us/api/menu/"></script>
  <script  src="js/script.js"></script>
</head>

<body>
<div id="idangerous-menu" data-width="700" data-index="1000"></div>
  <header class="lobster">
  	<div class="logo-big">Swiper</div>
  	<div class="slogan">Mobile touch slider with hardware accelerated transitions</div>
  	<div class="logo-by">by iDangero.us</div>
  </header>
  <div role="main" class="main">
    <div class="swiper-main">
    	<div class="sm-shadow"></div>
    	<div class="sm-free"></div>
    	<div class="swiper-container swiper1">
    		<div class="swiper-wrapper">
    	    	<div class="swiper-slide">
    	    		<img src="img/slider1-1.png">
    	    	</div>
    	        <div class="swiper-slide">
    	        	<img src="img/slider1-2.png">
    	        </div>
    	        <div class="swiper-slide">
    	        	<div class="content-slide">
    	        		<h2 style="margin-top: 0;">Slide with HTML</h2>
    	        		<p>You can put any HTML inside of slide with any layout, not only images!</p> 
    	        	</div>
    	        	<div class="content-slide cs-1">
    	        		<p style="margin: 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur tortor vitae neque luctus a tempor lacus pretium. Mauris eget ligula at justo molestie cursus. In vitae sem id neque pharetra luctus non vel felis.</p>
    	        	</div>
    	        	<div class="content-slide cs-2">
    	        		<p style="margin: 0;">Aliquam ut laoreet ligula. Quisque vehicula lectus nec orci viverra porttitor. Donec sodales lectus sit amet nunc congue ut mattis augue rhoncus.</p>
    	        	</div>
    	        	<div class="clearfix"></div>
    	        	<div class="content-slide">
    	        		Checkout more demos bellow 
    	        	</div>
    	        </div>
                
                
    	    </div>
    	</div>
    </div>
	
    <div class="pagination pagination1"></div>
    <div class="sw-content" style="margin-top: 20px; padding: 10px 0 5px;">
	    <div class="social-share">
	    	<!-- AddThis Button BEGIN -->
	    	<div class="addthis_toolbox addthis_default_style ">
	    	<a class="addthis_button_facebook_like" fb:like:layout="button_count"></a>
	    	<a class="addthis_button_tweet"></a>
	    	<a class="addthis_button_google_plusone" g:plusone:size="medium"></a>
	    	<a class="addthis_counter addthis_pill_style"></a>
	    	</div>
	    	<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4de6301a33cf4d3e"></script>
	    	<!-- AddThis Button END -->
	    </div>
    </div>
    <h2 class="sw-title">About</h2>
    <div class="sw-content">
    	<p style="margin-top: 0;"><strong>Swiper</strong> - is the <strong>free and ultra lightweight</strong> mobile touch slider with hardware accelerated transitions (where supported) and amazing native behavior. It is intended to use in mobile websites, mobile web apps, and mobile native apps. Designed mostly for iOS, but also works on Android and latest Desktop browsers. <strong>Swiper</strong> is created by <a href="http://www.idangero.us">iDangero.us</a></p>
    </div>
    <h2 class="sw-title">Change log</h2>
    <div class="sw-content">
    	<h3>Swiper 1.5 - Updated on October 6, 2012</h3>
        <ul>
    		<li>A lot of major and minor fixes, core optimization</li>
            <li>Not it works in Internet Explorer 9 (without animation) and Internet Explorer 10</li>
            <li>Improved perfomance</li>
            <li>New "loop" mode with infinite scroll (see demo below)</li>
            <li>New carousel mode, now you can show few slides per slider container (see demo below)</li>
            <li>New "smart" pagination, looks fun with loop and carousel modes</li>
            <li>Now Swipers can be easily nested one into another (see demo below)</li>
            <li>Added ability to disable automatic slider resize on windows resize</li>
            <li>Updated CSS</li>
    	</ul>
        
    	<h3>Swiper 1.3 - Updated on April 2, 2012</h3>
    	<ul>
    		<li>New and Reworked callbacks:
    			<ul>
    				<li>Added <strong>onSlideChangeStart</strong> callback</li>
    				<li>Added <strong>onSlideReset</strong> callback</li>
    				<li><strong>onSlideChange</strong> is renamed to <strong>onSlideChangeEnd</strong></li>
    			</ul>
    		</li>
    	    <li>Updated <strong>mySwiper.swipeTo()</strong> method:
    	    	<ul>
    	    		<li>Now it accepts 3 parameters - index <em>(number)</em>, speed <em>(number)</em> and runCallbacks <em>(boolean)</em></li>
    	    		<li>Now it will produce 'onSlideChangeStart' and 'onSlideChangeEnd' callback functions (if "runCallbacks" is not equal to "false")</li>
    	    	</ul>
    	    </li>
    	    <li>New <strong>mySwiper.destroy()</strong> method to release all events assigned by Swiper</li>
    	    <li>Fixed serious bug when using fluid (responsive) Swiper to re-calculate slides' position on window resize</li>
    	</ul>
    	<h3>Swiper 1.2 - Updated on March 31, 2012</h3>
    	<ul>
    		<li>Improved mouse events to get the same behavior as on touch devices</li>
    	</ul>
    	<h3>Swiper 1.1 - Updated on March 18, 2012</h3>
        <ul>
        	<li>Added <strong>autoPlay</strong> parameter to enable auto play</li>
            <li><strong>mySwiper.startAutoPlay()</strong> - external function to start auto play</li>
            <li><strong>mySwiper.stopAutoPlay()</strong> - external function to stop auto play</li>
            <li>Optimized for usage as a fallback for upcoming <strong>"iDangero.us S6"</strong> 3D slider</li>
            <li>Added small plugin to use Swiper with <a href="http://zeptojs.com" target="_blank">Zepto.js</a></li>
        </ul>
        <h3>Swiper 1.0 - Initial release on March 15, 2012</h3>
    	
    </div>
    <h2 class="sw-title">Features</h2>
    <div class="sw-content">
    	<ul style="margin: 0;">
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
    	
    </div>
    
    <h2 class="sw-title">Demos</h2>
    <p class="demo-title">Vertical mode:</p>
    <div class="swiper-container swiper-v">
    	<div class="pagination-v"></div>
    	<div class="swiper-wrapper lobster">
            <div class="swiper-slide blue-slide">
        		<h2>Vertical Mode</h2>
        		<p>Swipe to the Top or to the Bottom</p>
            </div>
            <div class="swiper-slide red-slide">
            	<h2>Slide 2</h2>
            	<p>Keep swiping</p>
            </div>
            <div class="swiper-slide orange-slide">
            	<h2>Slide 3</h2>
            	<p>The last one</p>
            </div>
        </div>
    </div>
    
    <p class="demo-title">Free mode:</p>
    <div class="swiper-container swiper-free">
    	<div class="pagination-free"></div>
    	<div class="swiper-wrapper lobster">
            <div class="swiper-slide red-slide">
        		<h2>Free Mode</h2>
        		<p>has no fixed positions</p>
            </div>
            <div class="swiper-slide blue-slide">
            	<h2>Fluid-Mode Enabled</h2>
            	<p>When you release the slide, it keep moving for a while</p>
            </div>
            <div class="swiper-slide orange-slide">
            	<h2>Slide 3</h2>
            	<p>Keep swiping</p>
            </div>
            <div class="swiper-slide green-slide">
            	<h2>Slide 4</h2>
            	<p>Keep swiping</p>
            </div>
            <div class="swiper-slide pink-slide">
            	<h2>Slide 5</h2>
            	<p>The last one</p>
            </div>
        </div>
    </div>
    
    <p class="demo-title">Carousel mode:</p>
    <div class="swiper-container swiper-car">
    	<div class="pagination-car"></div>
    	<div class="swiper-wrapper lobster">
            <div class="swiper-slide red-slide">
        		Slide 1
            </div>
            <div class="swiper-slide blue-slide">
            	Slide 2
            </div>
            <div class="swiper-slide orange-slide">
            	Slide 3
            </div>
            <div class="swiper-slide green-slide">
            	Slide 4
            </div>
            <div class="swiper-slide pink-slide">
            	Slide 5
            </div>
            <div class="swiper-slide orange-slide">
            	Slide 6
            </div>
            <div class="swiper-slide green-slide">
            	Slide 7
            </div>
            <div class="swiper-slide pink-slide">
            	Slide 8
            </div>
        </div>
    </div>
    
    <p class="demo-title">Carousel & Loop mode. Infinite Scrolling:</p>
    <div class="swiper-container swiper-loop">
    	<div class="pagination-loop"></div>
    	<div class="swiper-wrapper lobster">
            <div class="swiper-slide red-slide">
        		Slide 1
            </div>
            <div class="swiper-slide blue-slide">
            	Slide 2
            </div>
            <div class="swiper-slide orange-slide">
            	Slide 3
            </div>
            <div class="swiper-slide green-slide">
            	Slide 4
            </div>
            <div class="swiper-slide pink-slide">
            	Slide 5
            </div>
            <div class="swiper-slide orange-slide">
            	Slide 6
            </div>
            <div class="swiper-slide green-slide">
            	Slide 7
            </div>
            <div class="swiper-slide pink-slide">
            	Slide 8
            </div>
        </div>
    </div>
    
    <p class="demo-title">Nested Swipers. Vertical Swiper inside of horizontal:</p>
    <div class="swiper-container swiper-nested1 swiper-n1">
    	<div class="pagination-nested1 pagination-n1"></div>
    	<div class="swiper-wrapper lobster">
            <div class="swiper-slide red-slide">
        		Slide 1
            </div>
            <div class="swiper-slide">
            	<div class="swiper-container swiper-nested2 swiper-n2">
                	<div class="pagination-nested2 pagination-n2"></div>
                	<div class="swiper-wrapper">
                    	<div class="swiper-slide green-slide">Vertical Slide 1</div>
                        <div class="swiper-slide blue-slide">Vertical Slide 2</div>
                        <div class="swiper-slide pink-slide">Vertical Slide 3</div>
                        <div class="swiper-slide green-slide">Vertical Slide 4</div>
                        <div class="swiper-slide blue-slide">Vertical Slide 5</div>
                        <div class="swiper-slide pink-slide">Vertical Slide 6</div>
                    </div>
                </div>
            </div>
            <div class="swiper-slide orange-slide">
            	Slide 3
            </div>
            <div class="swiper-slide green-slide">
            	Slide 4
            </div>
            <div class="swiper-slide pink-slide">
            	Slide 5
            </div>
            <div class="swiper-slide orange-slide">
            	Slide 6
            </div>
            <div class="swiper-slide green-slide">
            	Slide 7
            </div>
            <div class="swiper-slide pink-slide">
            	Slide 8
            </div>
        </div>
    </div>
    
    <p class="demo-title">More complex. Nested Swipers + Carousel Mode + Loop Mode:</p>
    <div class="swiper-container swiper-nested1 swiper-n11">
    	<div class="pagination-nested1 pagination-n11"></div>
    	<div class="swiper-wrapper lobster">
            <div class="swiper-slide red-slide">
        		Slide 1
            </div>
            <div class="swiper-slide orange-slide">
            	Slide 2
            </div>
            <div class="swiper-slide red-slide">
            	Slide 3
            </div>
            <div class="swiper-slide">
            	<div class="swiper-container swiper-nested2 swiper-n22">
                	<div class="pagination-nested2 pagination-n22"></div>
                	<div class="swiper-wrapper">
                    	<div class="swiper-slide green-slide">Vertical Slide 1</div>
                        <div class="swiper-slide blue-slide">Vertical Slide 2</div>
                        <div class="swiper-slide pink-slide">Vertical Slide 3</div>
                        <div class="swiper-slide green-slide">Vertical Slide 4</div>
                        <div class="swiper-slide blue-slide">Vertical Slide 5</div>
                        <div class="swiper-slide pink-slide">Vertical Slide 6</div>
                    </div>
                </div>
            </div>
            <div class="swiper-slide pink-slide">
            	Slide 5
            </div>
            <div class="swiper-slide orange-slide">
            	Slide 6
            </div>
            <div class="swiper-slide green-slide">
            	Slide 7
            </div>
            <div class="swiper-slide pink-slide">
            	Slide 8
            </div>
        </div>
    </div>
    
    <p class="demo-title">Tabs (only external control):</p>
    <div class="tabs lobster">
    	<a href="#" class="active">Tab 1</a>
    	<a href="#" style="margin:0 17px">Tab 2</a>
    	<a href="#">Tab 3</a>
    </div>
    <div class="clearfix"></div>
    <div class="swiper-container swiper-tabs">
    	<div class="swiper-wrapper">
            <div class="swiper-slide">
        		<div class="content-slide2">
        		<h2>Tabs Example</h2>
        		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc interdum tempus turpis ut tempus. Mauris dictum blandit lectus, a dictum erat dictum non. Etiam ultrices convallis interdum. Curabitur varius auctor enim, quis dictum nibh fringilla ut. Sed vel lacus ac odio molestie sodales quis sit amet lacus. Curabitur id porta eros. Fusce in varius nisi.</p>
        		</div>
            </div>
            <div class="swiper-slide">
            	<div class="content-slide2">
            	<h2>Tab 2</h2>
            	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc interdum tempus turpis ut tempus. Mauris dictum blandit lectus, a dictum erat dictum non. Etiam ultrices convallis interdum. Curabitur varius auctor enim, quis dictum nibh fringilla ut. Sed vel lacus ac odio molestie sodales quis sit amet lacus. Curabitur id porta eros. Fusce in varius nisi.</p>
            	</div>
            </div>
            <div class="swiper-slide">
            	<div class="content-slide2">
            	<h2>Tab 3</h2>
            	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc interdum tempus turpis ut tempus. Mauris dictum blandit lectus, a dictum erat dictum non. Etiam ultrices convallis interdum. Curabitur varius auctor enim, quis dictum nibh fringilla ut. Sed vel lacus ac odio molestie sodales quis sit amet lacus. Curabitur id porta eros. Fusce in varius nisi.</p>
            	</div>
            </div>
        </div>
    </div>
    <p class="demo-title">Puzzle:</p>
    <div class="puzzle">
    	<div class="swiper-container  p1">
    		<div class="swiper-wrapper">
    			<div class="swiper-slide"><img src="img/p/p1-1.jpg"></div>
    			<div class="swiper-slide"><img src="img/p/p2-1.jpg"></div>
    			<div class="swiper-slide"><img src="img/p/p1-1.jpg"></div>
    		</div>
    	</div>
    	
    	<div class="swiper-container  p2">
    		<div class="swiper-wrapper">
    			<div class="swiper-slide"><img src="img/p/p2-2.jpg"></div>
    			<div class="swiper-slide"><img src="img/p/p1-2.jpg"></div>
    			<div class="swiper-slide"><img src="img/p/p2-2.jpg"></div>
    		</div>
    	</div>
    	
    	<div class="swiper-container  p3">
    		<div class="swiper-wrapper">
    			<div class="swiper-slide"><img src="img/p/p1-3.jpg"></div>
    			<div class="swiper-slide"><img src="img/p/p2-3.jpg"></div>
    			<div class="swiper-slide"><img src="img/p/p1-3.jpg"></div>
    		</div>
    	</div>
    	
    	<div class="swiper-container  p4">
    		<div class="swiper-wrapper">
    			<div class="swiper-slide"><img src="img/p/p2-4.jpg"></div>
    			<div class="swiper-slide"><img src="img/p/p1-4.jpg"></div>
    			<div class="swiper-slide"><img src="img/p/p2-4.jpg"></div>
    		</div>
    	</div>
    	
    	<div class="swiper-container  p5">
    		<div class="swiper-wrapper">
    			<div class="swiper-slide"><img src="img/p/p1-5.jpg"></div>
    			<div class="swiper-slide"><img src="img/p/p2-5.jpg"></div>
    			<div class="swiper-slide"><img src="img/p/p1-5.jpg"></div>
    		</div>
    	</div>
    	
    	<div class="swiper-container  p6">
    		<div class="swiper-wrapper">
    			<div class="swiper-slide"><img src="img/p/p2-6.jpg"></div>
    			<div class="swiper-slide"><img src="img/p/p1-6.jpg"></div>
    			<div class="swiper-slide"><img src="img/p/p2-6.jpg"></div>
    		</div>
    	</div>
    </div>
    <p class="demo-title">More complex:</p>
    <div class="mc1">
    	<div class="swiper-container mc-posters">
    		<div class="swiper-wrapper">
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
	    	    		<img src="img/m/1.jpg">
	    	    		<div class="m-right">
	    	    			<h3>Movie 1</h3>
	    	    			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	    	    		</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/2.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 2</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/3.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 3</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/4.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 4</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/5.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 5</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/6.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 6</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/7.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 7</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/8.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 8</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/1.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 9</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/2.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 10</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/3.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 11</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/4.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 12</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/5.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 13</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/6.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 14</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/7.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 15</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<div class="m-content">
    	    			<img src="img/m/8.jpg">
    	    			<div class="m-right">
    	    				<h3>Movie 16</h3>
    	    				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia vulputate hendrerit. Suspendisse potenti. Etiam rutrum egestas massa, ut facilisis magna tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    	    			</div>
    	    		</div>
    	    	</div>
    	    	
    	    </div>
    	</div>
    </div>
    <div class="mc2">
    	<div class="swiper-container mc-control">
    		<div class="swiper-wrapper">
    	    	<div class="swiper-slide">
    	    		<img src="img/m/1.jpg">
    	    		<img src="img/m/2.jpg">
    	    		<img src="img/m/3.jpg">
    	    		<img src="img/m/4.jpg">
    	    		<img src="img/m/5.jpg">
    	    		<img src="img/m/6.jpg">
    	    		<img src="img/m/7.jpg">
    	    		<img src="img/m/8.jpg">
    	    	</div>
    	    	<div class="swiper-slide">
    	    		<img src="img/m/1.jpg">
    	    		<img src="img/m/2.jpg">
    	    		<img src="img/m/3.jpg">
    	    		<img src="img/m/4.jpg">
    	    		<img src="img/m/5.jpg">
    	    		<img src="img/m/6.jpg">
    	    		<img src="img/m/7.jpg">
    	    		<img src="img/m/8.jpg">
    	    	</div>
    	    </div>
    	</div>
    </div>
    <h2 class="sw-title">Usage</h2>
    <div class="sw-content">
    	<p>1. Download the latest version of Swiper from GitHub <a href="https://github.com/nolimits4web/Swiper" target="_blank"><strong>here</strong></a>.</p>
    	<p>2. Add to HEAD <strong>Swiper's CSS and JS</strong>:</p>
    	<pre>
&lt;head&gt;
  ....
  &lt;link rel=&quot;stylesheet&quot; href=&quot;path_to_css/<strong>idangerous.swiper-1.x.css</strong>&quot;&gt;
  &lt;script defer src=&quot;path_to_js/<strong>idangerous.swiper-1.x.min.js</strong>&quot;&gt;&lt;/script&gt;
  ....
&lt;/head&gt;</pre>
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
  var mySwiper = new Swiper('.swiper-container',options);
  <em>//Or with jQuery or Zepto</em>
  var mySwiper = $('.swiper-container').swiper(options);
}
&lt;/script&gt;

</pre>
    </div> 
    <h2 class="sw-title">API</h2>
        <div class="sw-content">
        	<h2>new Swiper(container, options)</h2>
        	<ul>
        		<li><p><strong>container</strong> - <em>string</em>, <em>required</em>. CSS selector of Swiper's container. In the HTML code above it should be equal to '.swiper-container'</p></li>
        		<li><p><strong>options</strong> - <em>object</em>, <em>optional</em>. Swiper parameters, see bellow</p></li>
        	</ul>
        	<h4>Usage:</h4>
<pre>
var <strong>mySwiper</strong> = new Swiper('.swiper-container', { 
	speed:750, 
	mode:'vertical'
})
</pre>
			<p>Returns the object with couple of useful functions and methods:</p>
			<ul>
				<li><p><strong>mySwiper.swipeNext()</strong> - run transition to next slide</p></li>
				<li><p><strong>mySwiper.swipePrev()</strong> - run transition to previous slide</p></li>
				<li><p><strong>mySwiper.swipeTo(index, speed, runCallbacks)</strong> - run transition to the slide with index number equal to 'index' parameter for the speed equal to 'speed' parameter. You can set 'runCallbacks' to false (by default it is 'true') and transition will not produce onSlideChange callback functions.</p></li>
				<li><p><strong>mySwiper.isSupportTouch()</strong> - returns <em>true</em> if browser supports Touch events</p></li>
				<li><p><strong>mySwiper.isSupport3D()</strong> - returns <em>true</em> if browser supports CSS3 3D transforms</p></li>
				<li><p><strong>mySwiper.activeSlide</strong> - returns the index number of currently active slide</p></li>
                <li><p><strong>mySwiper.startAutoPlay()</strong> - start auto play. It may be useful for custom "Play" and "Pause" buttons.</p></li>
                <li><p><strong>mySwiper.stopAutoPlay()</strong> - stop auto play. It may be useful for custom "Play" and "Pause" buttons.</p></li>
                <li><p><strong>mySwiper.stopAutoPlay()</strong> - stop auto play. It may be useful for custom "Play" and "Pause" buttons.</p></li>
                <li><p><strong>mySwiper.destroy(<em>removeResizeEvent</em>)</strong> - will remove all attached event listeners (resize event on window (if <em>removeResizeEvent</em> not equal to 'false') , touch events on wrapper, and mouse events on document). Useful if you add/remove swiper(s) to document dynamically to release browser's memory.</p></li>
			</ul>
			
			<h2>Options</h2>
			<p>Swiper support the following list of parameters on initialization:</p>
			<table class="params" style="width: 100%;">
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
						<td>autoPlay</td>
						<td>number</td>
						<td>5000</td>
						<td>-</td>
						<td>delay between transitions (in ms). If this parameter is not specified, auto play will be disabled</td>
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
						<td>'my-active-switch'</td>
						<td>CSS class of the Swiper's active pagination switch</td>
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
						<td>onSlideReset</td>
						<td>function</td>
						<td>-</td>
						<td>function(){ do something }</td>
						<td>Callback function, will be executed when you release the slide and it going to be reseted to currently active slide. Don't work with freeMode.</td>
					</tr>
					<tr>
						<td>onSlideChangeStart</td>
						<td>function</td>
						<td>-</td>
						<td>function(){ do something }</td>
						<td>Callback function, will be executed in the beginning of animation to other slide (next or previous). Don't work with freeMode.</td>
					</tr>
					<tr>
						<td>onSlideChangeEnd</td>
						<td>function</td>
						<td>-</td>
						<td>function(){ do something }</td>
						<td>Callback function, will be executed after animation to other slide (next or previous). Don't work with freeMode.</td>
					</tr>
                    
                    <tr>
						<td>loop</td>
						<td>boolean</td>
						<td>false</td>
						<td>true</td>
						<td>Set to <strong><em>true</em></strong> to enable loop mode. <span class="new-in">New in 1.5</span></td>
					</tr>
                    
                    <tr>
						<td>slidesPerSlide</td>
						<td>number</td>
						<td>1</td>
						<td>2</td>
						<td>Set numbers of slides you want to display at the same time on slider's container for <em><strong>carousel mode</strong></em>. <span class="new-in">New in 1.5</span></td>
					</tr>
                    
                    <tr>
						<td>disableAutoResize</td>
						<td>boolean</td>
						<td>false</td>
						<td>true</td>
						<td>Set to <strong><em>true</em></strong> if you want to  disable automatic slider resize on window resize. <span class="new-in">New in 1.5</span></td>
					</tr>
					
					
				</tbody>
			
			</table>
			<h2>Example</h2>
<pre>
&lt;script type=&quot;text/javascript&quot;&gt;
$(document).ready(function(){
  var mySwiper = new Swiper('.swiper-container', {
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
        </div> 
        <h2 class="sw-title">Download &amp; Share</h2>
        <div class="sw-content">
        	<p style="text-align: center; margin-top:0"><a class="gh-button" onClick="_gaq.push(['_trackEvent', 'Download Swiper', 'Clicked'])" href="https://github.com/nolimits4web/Swiper">Download on GitHub</a></p>
        	<div class="social-share">
        		<!-- AddThis Button BEGIN -->
        		<div class="addthis_toolbox addthis_default_style ">
        		<a class="addthis_button_facebook_like" fb:like:layout="button_count"></a>
        		<a class="addthis_button_tweet"></a>
        		<a class="addthis_button_google_plusone" g:plusone:size="medium"></a>
        		<a class="addthis_counter addthis_pill_style"></a>
        		</div>
        		<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4de6301a33cf4d3e"></script>
        		<!-- AddThis Button END -->
        	</div>
        </div>
        
  </div>
  <footer>
	<p style="text-align: center;">2012 &copy; Swiper by <a href="http://www.idangero.us/sliders/swiper/">iDangero.us</a></p>
  </footer>
  <script>
    var _gaq=[['_setAccount','UA-13289120-5'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>

  
</body>
</html>
