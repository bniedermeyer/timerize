var seconds = 0;
var timerId;

export default class Timer {
   resetTimer() {
    this.stopTimer();
    seconds = 0;
    var event = new CustomEvent("timer", {
      detail: {
        time: '00:00:00'
      }
    });
    document.body.dispatchEvent(event);
  }

   startTimer() {
    timerId = window.setInterval(function () {
      seconds++;
      var event = new CustomEvent("timer", {
        detail: {
          time: Timer.convertToTimeStamp(seconds)
        }
      });
      document.body.dispatchEvent(event);
    }, 1000);
  }

   stopTimer() {
    window.clearInterval(timerId);
  }

  getTimeString() {
    var time =  Timer.convertToTimeStamp(seconds);
    return time;
  }

  setTime(duration) {
    this.stopTimer();
    var splitDuration = duration.split(':');
    var newSeconds = (splitDuration[0] * 3600) + (splitDuration[1] * 60) + (Number.parseInt(splitDuration[2], 10));
    seconds = newSeconds;
    var event = new CustomEvent("timer", {
      detail: {
        time: duration
      }
    });
    document.body.dispatchEvent(event);
  }

   static convertToTimeStamp(secs) {
    var outHours = Math.floor(secs / 3600);
    var outMinutes = Math.floor((Math.floor(secs % 3600)) / 60);
    var outSeconds = secs % 60;

    outHours = outHours ? ((outHours > 9) ? outHours: "0" + outHours) : "00";
    outMinutes = outMinutes ? ((outMinutes > 9) ? outMinutes : "0" + outMinutes) : "00";
    outSeconds = outSeconds ? ((outSeconds > 9) ? outSeconds : "0" + outSeconds) : "00";

    return outHours + ":" + outMinutes + ":" + outSeconds;
  }

}
