/*=========================
  Observer
  ===========================*/
s.observers = [];
function initObserver(target, options) {
    options = options || {};
    // create an observer instance
    var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
    var observer = new ObserverFunc(function (mutations) {
        mutations.forEach(function (mutation) {
            s.onResize();
        });
    });
     
    observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData
    });

    s.observers.push(observer);
}
s.initObservers = function () {
    if (s.params.observeParents) {
        var containerParents = s.container.parents();
        for (var i = 0; i < containerParents.length; i++) {
            initObserver(containerParents[i]);
        }
    }

    // Observe container
    initObserver(s.container[0], {childList: false});

    // Observe wrapper
    initObserver(s.wrapper[0], {attributes: false});
};
s.disconnectObservers = function () {
    for (var i = 0; i < s.observers.length; i++) {
        s.observers[i].disconnect();
    }
};

