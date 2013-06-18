<?php 
$dev = false;
?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Swiper Ready To Use Mobile Apps</title>
<meta name="description" content="Ready To Use Mobile Apps for iDangero.us Swiper">
<meta name="keywords" content="swiper, mobile slider, touch slider, ios slider, android slider, touch gallery, jquery slider, jquery mobile slider, web app slider, native app slider, free slider, swipe slider">
<link rel="shortcut icon" href="../img/favicon.png">
<link href='http://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="../css/idangerous.swiper.css">
<?php if(!$dev) { ?>
<link rel="stylesheet" href="http://www.idangero.us/api/menu/idangerous.menu.css">
<?php } ?>
<link rel="stylesheet" href="../css/style.css">
<script  src="../js/libs/jquery-1.8.3.min.js"></script>
<script  src="../js/idangerous.swiper.js"></script>
<?php if(!$dev) { ?>
<script  src="http://www.idangero.us/api/menu/"></script>
<?php } ?>
<script  src="../js/script.js"></script>
</head>

<body>
<?php if(!$dev) { ?>
<div id="idangerous-menu" data-width="900" data-index="1000"></div>
<?php } ?>
<header class="lato">
  <div class="center">
    <div class="logo-big"><img src="../img/logo.png" width="356" height="185" alt="Swiper"></div>
    <div class="slogan"><span>Mobile touch slider & framework with hardware accelerated transitions</span></div>
    <div class="logo-by">by iDangero.us</div>
  </div>
</header>
<div role="main" class="main">
  
  <div class="sw-content" style="margin:-30px 0 30px">
    <div class="social-share">
      <?php if(!$dev) { ?>
      <!-- AddThis Button BEGIN -->
      <div class="addthis_toolbox addthis_default_style "> <a class="addthis_button_facebook_like" fb:like:layout="button_count"></a> <a class="addthis_button_tweet"></a> <a class="addthis_button_google_plusone" g:plusone:size="medium"></a> <a class="addthis_button_pinterest_pinit"></a> <a class="addthis_counter addthis_pill_style"></a> </div>
      <script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4de6301a33cf4d3e"></script> 
      <script>
var addthis_share =
{
   url:"http://www.idangero.us/sliders/swiper/"
}
</script>
      <!-- AddThis Button END -->
      <?php } ?>
    </div>
  </div>
  <nav>
  	<div>
        <a href="../contest.php" style="color:green">Win $100</a>
        <a href="../">Overview</a>
        <a href="../demos.php">Demos</a>
        <a href="index.php" class="active">Ready To Use Apps</a>
        <a href="../plugins/index.php" >Swiper Plugins</a>
        <a href="../api.php">Usage & API</a>
        <a href="https://github.com/nolimits4web/Swiper" target="_blank">Download</a>
    </div>
  </nav>
  
  
  
  
  
  <h2 class="sw-title">Apps</h2>
  <p>Coming soon...</p>
  
</div>
<footer>
  <p style="text-align: center;">2012-2013 &copy; Swiper by <a href="http://www.idangero.us/">iDangero.us</a></p>
</footer>
<?php if(!$dev) { ?>
<script>
    var _gaq=[['_setAccount','UA-13289120-5'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>
<?php } ?>

</body>
</html>
