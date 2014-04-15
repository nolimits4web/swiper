/*=========================
  Plugins API
  ===========================*/
var _plugins = [];
for (var plugin in swiper.plugins) {
    if (params[plugin]) {
        var p = swiper.plugins[plugin](swiper, params[plugin]);
        if (p) _plugins.push(p);
    }
}
swiper.callPlugins = function (method, args) {
    if (!args) args = {};
    for (var i = 0; i < _plugins.length; i++) {
        if (method in _plugins[i]) {
            _plugins[i][method](args);
        }
    }
};