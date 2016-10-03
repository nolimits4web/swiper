/*=========================
  Fullscreen
  ===========================*/
s.fullscreen = {
    methods: (function (){
        var requests = ('mozRequestFullScreen webkitRequestFullscreen requestFullscreen').split(' ');
        var cancels = ('mozCancelFullScreen webkitCancelFullScreen cancelFullScreen').split(' ');
        var request, cancel, i;
        for (i = 0; i < requests.length; i++) {
            if (s.container[0][requests[i]]) {
                request = requests[i];
            }
        }
        for (i = 0; i < cancels.length; i++) {
            if (document[cancels[i]]) {
                cancel = cancels[i];
            }
        }
        return {
            request: request,
            cancel: cancel
        };
    })(),
    request: function () {
        if (!s.fullscreen.methods.request) return;
        s.container[0][s.fullscreen.methods.request]();
    },
    cancel: function () {
        if (!s.fullscreen.methods.cancel) return;
        document[s.fullscreen.methods.cancel]();
    }
};