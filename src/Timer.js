var seconds = 0;
var counting = false;
var timerId;

export default class Timer {
  constructor() {
  }

  function resetTimer() {
    seconds = 0;
    counting = false;
  }

  function startTimer() {
    timerId = window.setInterval(function () {
      seconds++;
      var event = new CustomEvent("timer", {time: this.convertToTimeStamp(seconds)});
      document.dispatchEvent(event);
    }, 1000);
  }

  function stopTimer() {
    window.clearInterval(timerId);
  }

  function convertToTimeStamp(secs) {
    var outHours = secs/3600;
    var outMinutes = (secs/3600) / 60;
    var outSeconds = secs % 60;

    return (outHours ? ((outHours > 9) ? outHours: "0" + outHours) : "00") + ":" + (outMinutes ? ((outMinutes > 9) ? outMinutes : "0" + outMinutes) : "00") + ":" + ((outSeconds > 9) ? outSeconds : "0" + outSeconds) : "00");

  }

}
