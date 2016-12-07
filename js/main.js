$(document).ready(function() {
    // timeCircles = init(); //initialize the timeCircles
    document.body.addEventListener("timer", function (e) {
        $('#timer').text(e.detail.time);
    }, false);

    //bind the enter key to the start/pause button
    $(document).bind('keypress', function(e) {
        if (event.keyCode == 13) {
            $(".toggle-timer").click();
        }
    });
    //polyfill for custom events so IE can handle them
    (function () {
      function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
       }

      CustomEvent.prototype = window.Event.prototype;

      window.CustomEvent = CustomEvent;
    })();
});
