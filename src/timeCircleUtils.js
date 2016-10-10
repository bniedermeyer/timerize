class TimeCircleUtils {
//returns a formatted time from the supplied seconds from the timeCircles
    static calculateTime(seconds) {
        var sec = seconds * -1; //timeCircles return the duration in negative seconds since it was started. Make the nubmer positive
        return this.toHHMMSS(sec);
    }

//add new function to String prototype to format an amount of seconds to the time output
    static toHHMMSS(seconds) {
        // var sec_num = parseInt(seconds, 10);
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds - (hours * 3600)) / 60);
        var secs = seconds - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (secs < 10) {
            secs = "0" + seconds;
        }
        return hours + ':' + minutes + ':' + secs;
    }
}
export default TimeCircleUtils;
