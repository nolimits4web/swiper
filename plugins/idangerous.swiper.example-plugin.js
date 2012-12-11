/*
	Swiper example plugin, it is do nothing :)
	To use it just attach this file after Swiper to your project:
	<script src="path/to/this/file.js"></script>

	!!! Please name your plugin file according to this rule:
	[myName].swiper.[nameOfMyPlugin]-[version].js
	For example:
	idangerous.swiper.scrollbar-1.0.js
*/

Swiper.prototype.plugins.myPluginName = {
	
	/* 
		Here is a list of all methods that called by Swiper's core hooks
		Of course, use only those methods that you need, just remove other ones.
		Need more hooks? Suppose them on GitHub
	*/
	onFirstInit : function(args){
		/*
		Inside of every plugin method:
		
		this - access to swiper object with all its parameters and methods
		pluginVars - see Internal Variables bellow
		args - object with parameters that passed by plugin hook from core
		
		--------------
		Plugin Parameters:
		--------------
		var swiper = new Swiper('.swiper-container', {
			.... some default Swiper parameters ....
			//And your plugin parameters:
			myPlugin : {
				option1: 'Hello',
				option2: 'World!'
			}
		})
		access to your plugin options that you can request on Swiper initialization:
		var myPluginOptions = this.params.myPluig
		alert(myPluginOptions.option1) -> 'Hello'
		alert(myPluginOptions.option2) -> 'World'

		
		---------------
		Internal Variables
		--------------
		You can also use your custom options/variables to use it between your internal methods.
		This object is already created when plugin attached and available through: 
			- this._p.myPluginName
		
		For example:
			var customVars = this._p.myPluginName;
			customVars.name = "Hello!"
		

		---------------
		Internal Methods
		--------------
		
		You can call methods manually, for example:

		this.plugins.myPluginName.onSlideChangeStart()
		*/
	},
	onInit : function(args) {
		/*
		---------------
		Internal Variables
		--------------
		You can access here to the custom variable "name" defined in previous method
			var customVars = this._p.myPluginName;
			alert(customVars.name) -> 'Hello!'
		*/
	},
	onCreatePagination : function(args) {

	},
	beforeResizeFix : function(args) {

	},
	afterResizeFix : function(args) {

	},
	onAutoPlayStart : function(args) {

	},
	onAutoPlayStop : function(args) {

	},
	onDestroy : function(args) {

	},
	onTouchStartBegin : function(args) {

	},
	onTouchStartEnd : function(args) {

	},
	onTouchMoveStart : function(args) {

	},
	onTouchMoveEnd : function(args) {

	},
	onTouchEnd : function(args) {

	},
	onSwipeNext : function(args) {

	},
	onSwipePrev : function(args) {

	},
	onSwipeReset : function(args) {

	},
	onSwipeTo : function(args) {

	},
	
	onSlideChangeStart: function(args){
		
	}
}
