
$(document).ready(function() {
    // timeCircles = init(); //initialize the timeCircles
    document.body.addEventListener("timer", function (e) {
        $('#timer').text(e.detail.time);
    }, false);

    //bind the enter key to the start/pause button
    $(document).bind('keypress', function(e) {
        if (event.keyCode == 13) {
            $(".start,.pause").click();
        }
    });

    //prompt the user to make sure they've logged their hours before closing the window
    window.onbeforeunload = function(e) {
        saveTasks();
        if (!devMode) { //only show the prompt if this is not the version in development
            return 'Have you logged your time to EDIHours?';
        }
    };
});
