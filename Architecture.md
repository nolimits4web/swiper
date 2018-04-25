# Swiper Architecture  

Swiper allows you to swipe between “HTML pages”.
The “pages” can be swapped by swiping left to right, right to left or up and down.  How does it do this?

  
Swiper is a mix of javascript, css and div definitions. 

Actually each “page” is a separate HTML div.  
You create a single web page application.  It includes a list (div) of what looks like HTML pages, but are actually also each just a div.  

The outermost container div takes up 100% of the screen.  Inside that is the swiper div.  This gets animated to move left to right or up to down.  The 
variable aSlider.progress tells you how far this slider div has moved.  From 0 to 1.  And inside the slider div are the slide divs.  There is the active slide div, and possibly a previous and a next slide div.   The previous and next slide divs get moved just off of the screen, so that there is no delay in animating moving them onto the screen.  The other slide divs are set {visibility:hidden} to save on browser resources. 

When a move is detected, animation takes over,  and the slider div is moved to the next slide.  when
a move is done a javascript callback is issued.  Some slides get set to hidden, others get moved off screen, and some are set to display.  It all just works. 

So how does it do animation?  Well in each direction there is a list of slides.  There is one active slide, and a next and previous slide.  The next and previous are set to visible, but moved  off of the screen, and then they are animated to slide onto the screenThe progress variable, between 0 and 1 tells you how far the original slide has moved.  And when they are all the way off the screen you get the slideChange event activated.  And the other events are triggered at the approapriate time. 

So let us take a look at some code.  And i will put in lots of comments. (Without comment signs).
```
<div class="swiper-container">
    This is the container which takes up the whole viewport (window).  There is a Javascript swiper object that looks for this div.      You could also do container-h and container-v if you have
horizontal and vertical containers.    

    <div class="swiper-wrapper">
        This wrapper which is actually animated to move divs across the screen. 

        Next you have some slides.  At startup all the slides are set to style {visibility: hidden}.  Then once the javascript is loaded, a single slide is made visible.  By moving or animating the wrapper div, the neighboring divs can be made isible. 

        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        ...
    </div>
  
</div>
```

What if you want to be ale to swipe left right up or down?  Well then you will need one slider inside of another one.  (You can also have one set inside another one, both going the same direction. )
```
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-container">
      <div class="swiper-wrapper">

      </div>
     </div>

  </div>
</div>
```
And of course you have to put the slides into the above html
in the right places.  

## Virtual Slides
Now let us talk about virtual slides. 

First if you are using virtual slides, then do not include any slides in the HTML.  Or you will get a mumbled display.  Or else use the removeAllSlides() function before 
generating the HTML from virtual slides. 

To create virtual slides, you first
create an array of slide objects, and a function to render them, to turn them into HTML.  

Okay, so how do we do left right up or down using virtual slides?   For left right up and down, you can have two virtual arrays, one in either direction. 

Their virtual demo talks about a long list of 500 slides, but in many cases, the slides change every time the user swipes.  So you want to do two orthogonal 3 item arrays of slides.  That allows the user to swipe in any direction.  Each time the user swipes, one should modify the virtual arrays.   How does one do that?

The documentation supports appending or prepending a slide to a virtual array.  While Swiper supports deleting slides from the DOM, sadly it does not support deleting a slide from a virtual array. A different approach is needed.

The different approach is to create completely new arrays, and use the true argument  when updating the display. 

```
aSwiper.virtual.update(true);
```

Doing this is a bit tricky because you do not want to suddenly jump the user display.  So there are two parts to it. 
When you receive the event slideChange, you can go ahead and create the two new virtual arrays. But do 
not update the DOM yet, it would jump the display.  We will return to the update method shortly.  And 
remember that the user may swipe back to the old slide.  But there is another problem to first pay attention to. 

You have to be a  bit careful when creating new arrays because the virtual objects have a cache of the slides.  This can cause problems. aSwiper.virtual.cache is a dictionary indexed by slide index number.   The simplest solution is to set 
aSwiper.virtual.cache = false;
And then caching is not used. 

But the cache does speed performance.  So good to allow the caches, but then you have to deal with 
`aSwiper.virtual.from` and `aSwiper.virtual.to`.

These are indexes of which slides have already been rendered and cached.  If you set 
`aSwiper.virtual.from = 0;` and `aSwiper.virtual.to = -1;`

Also good to delete the old cache. 
```
aSwiper.virtual.cache = {};
```

Now all should be well.  Although I have not tested it yet. 

Okay, so now you know what it takes to just create 
the new virtual arrays. But we still have to display them. Meaning we still have to  update the DOM. 

In principal, all you have to do is to say 
```
aSwiper.virtual.update(force);
```
and everything will be redisplayed.  

Actually it is a bit harder than that.  In fact, there are two arrays.  While we see the arrays as orthogonal, the HTML sees them as nested.  So first update the outer array, then the inner one. If you do it the other way around, it will not generate the correct html.


Just to state the obvious, the function for generating the outer virtual array should also generate the following lines. 
```
    <div class="swiper-container-h“>
      <div class="swiper-wrapper">

      </div>
     </div>
```
Or if the inner array is vertical it should use the line: 
```
    <div class="swiper-container-v“>
```

The next problem is that updating the DOM will probably cause what the user see to jump.  So you really need to wait until the animation ends, and then call the `aSliderOUTER.virtual.update(force);` and `aSliderINNER.virtual.update(force);`
commands.

All of this sounds reasonably easy to do, but it gets harder when working in the vertical direction.  The problem is that pages have different lengths, and may often overflow the screen.  The software cannot tell when you are swiping to the next vertical slide, and when you re just trying to scroll down. So you have to set 
`
freeMode = true;
`
And then it will not animate to the next screen, when all you want to do is scroll down. And yet you still get the callbacks on slideChange event, so one can update things. 

One more complication. Sometimes one loads content from a server using AJAX. Or whatever the newest version of AJAX is called. Then the page size changes.  So in the callback, you have to notify the Swiper that the page size has changed, and that it should recalculate the page sizes and possibly recalculate the progress variable.  

I hope that this document helps beginners better understand this wonderful software package. 
Christopher Lozinski
PythonLinks.info



