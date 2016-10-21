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

});
