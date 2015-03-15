/*=========================
  Events/Callbacks/Plugins Trigger
  ===========================*/
s.triggerEventListeners = {

};
s.trigger = function (eventName) {
    // Trigger callbacks
    if (s.params[eventName]) {
        s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
    }
    var i;
    // Trigger events
    if (s.triggerEventListeners[eventName]) {
        for (i = 0; i < s.triggerEventListeners[eventName].length; i++) {
            s.triggerEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
    }
    // Trigger plugins
    if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
};
s.on = function (eventName, handler) {
    if (!s.triggerEventListeners[eventName]) s.triggerEventListeners[eventName] = [];
    s.triggerEventListeners[eventName].push(handler);
    return s;
};
s.off = function (eventName, handler) {
    var i;
    if (typeof handler === 'undefined') {
        // Remove all handlers for such event
        s.triggerEventListeners[eventName] = [];
        return s;
    }
    if (!s.triggerEventListeners[eventName] || s.triggerEventListeners[eventName].length === 0) return;
    for (i = 0; i < s.triggerEventListeners[eventName].length; i++) {
        if(s.triggerEventListeners[eventName][i] === handler) s.triggerEventListeners[eventName].splice(i, 1);
    }
    return s;
};
s.once = function (eventName, handler) {
    var _handler = function () {
        handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
        s.off(eventName, _handler);
    };
    s.on(eventName, _handler);
    return s;
};


