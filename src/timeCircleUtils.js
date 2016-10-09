

//returns a formatted time from the supplied seconds from the timeCircles
function calculateTime(seconds) {
    seconds = seconds * -1; //timeCircles return the duration in negative seconds since it was started. Make the nubmer positive
    return seconds.toString().toHHMMSS();
}

//add new function to String prototype to format an amount of seconds to the time output
String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
}

export default timeCircleUtils;
