
  var seconds = 0;
  var minutes = 0;
  var hours = 0;
  var timeOutId = null;
  var currentTime = null;

  function incrementTime() { //increments the different units of time
    seconds ++;
    if (seconds = 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes = 60) {
      hours++;
      minutes = 0;
    }
    currentTime = (hours ? ((hours > 9) ? hours: "0" + hours) : "00") + ":" + (minutes ? ((minutes > 9) ? minutes : "0" + minutes) : "00") + ":" + ((seconds > 9) ? seconds : "0" + seconds) : "00");
    updateTimeDisplay(currentTime);
    run();
  }

  function updateTimeDisplay(currentTime) {
    Document.getElementById('stopwatch-container').textContext = currentTime;
  }

  function run() {
    timeOutId = setTimeout(incrementTime, 1000);
  }

  function start() {
    run();
  }
  function stop() {
    clearTimeout(timeOutId);
  }
  function reset() {
    stop();
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateTimeDisplay(00:00:00);
  }
  function getCurrentTime() {
    return currentTime;
  }


export default Stopwatch;
