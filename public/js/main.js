var timeCircles;
var devMode = false;

// function Task(description, duration) {
//     this.description = description;
//     this.duration = duration;
// }

// initializes the time circles objec, sets it's visible state and returns it
function init() {
    // var tc = $('.time-container').TimeCircles({
    //     start: false,
    //     time: {
    //         Days: {
    //             show: false
    //         }
    //     }
    // });
    // tc.visible = true;
    // loadTasks();
    // return tc;
}

//handles the various button clicks
function handleButton(button) {
    if /* ($(button).hasClass('start')) { //handles the start button click
        timeCircles.start();
        timeCircles.state = 'started';
        $(button).removeClass('btn-success start').addClass('btn-primary pause').text('Pause');
    } else if ($(button).hasClass("btn-primary")) { //handles the pause button click
        timeCircles.stop();
        timeCircles.state = 'stopped';
        $(button).removeClass('btn-primary pause').addClass('btn-success start').text('Start');
    } else if ($(button).hasClass("btn-danger")) { //handles the Reset button click
        if (confirm("Are you sure you want to STOP tracking this task? It won't be recorded for you!")) {
            resetTimer();
            $('#task-input').val('');
        }
    } else if ($(button).hasClass("btn-warning")) { //adds the current task to the task list
        if (confirm("Are you sure you want to stop tracking this task and log it to today's task list?")) {
            let duration = calculateTime(timeCircles.getTime());
            let task = new Task($('#task-input').val(), duration);

            addTaskToList(task);
            resetTimer();
        }
    } else if ($(button).hasClass("delete-task")) { //handles the delete button on all each task
        if (confirm('Are you sure you want to delete this task?')) {
            $(button).parentsUntil('#task-container').remove();
        }
    } else if */ ($(button).hasClass("timer-hide")) { //hides or shows the timer
        if (timeCircles.visible === true) {
            $('.time-container').hide('slow', function() {
                $('.timer-hide').text('Show Timer');
                timeCircles.visible = false;
            });
        } else if (timeCircles.visible === false) {
            $('.time-container').show('slow', function() {
                $('.timer-hide').text('Hide Timer');
                timeCircles.visible = true;
            });
        }
    } /*else if ($(button).hasClass("edit-task")) {
        var newName = prompt("Please Enter the new task name:");
        if (newName !== null) {
            console.log(">>>>>>" + $(button).prevAll(".task:first").attr("class"));
            // $(button).parentsUntil('#row', '.task').attr("taskDescription", newName);
            // $(button).parentsUntil('#row', '.task').text(newName);
        }
    }*/
}

//resets the timer, changes its state to stopped, clears the text box, and enables the start button.
/*function resetTimer() {
    timeCircles.restart().stop();
    $('#task-input').val('');
    timeCircles.state = 'stopped';
    $('.btn-primary').removeClass('btn-primary pause').addClass('btn-success start').text('Start');
}*/

// //returns a formatted time from the supplied seconds from the timeCircles
// function calculateTime(seconds) {
//     seconds = seconds * -1; //timeCircles return the duration in negative seconds since it was started. Make the nubmer positive
//     return seconds.toString().toHHMMSS();
// }
//
// //add new function to String prototype to format an amount of seconds to the time output
// String.prototype.toHHMMSS = function() {
//     var sec_num = parseInt(this, 10);
//     var hours = Math.floor(sec_num / 3600);
//     var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
//     var seconds = sec_num - (hours * 3600) - (minutes * 60);
//
//     if (hours < 10) {
//         hours = "0" + hours;
//     }
//     if (minutes < 10) {
//         minutes = "0" + minutes;
//     }
//     if (seconds < 10) {
//         seconds = "0" + seconds;
//     }
//     return hours + ':' + minutes + ':' + seconds;
// }

//handles the button clicks
// $(document).on('click', '.btn', function(event) {
//     event.preventDefault();
//     handleButton(this);
// });

//makes the timer responsive to window size
$(window).resize(_.throttle(function() {
    let seconds = timeCircles.getTime();
    timeCircles.stop();
    timeCircles.rebuild();
    if (timeCircles.state === 'started') {
        timeCircles.start();
    }
}, 500));

//Takes the current task elements and stores their data as a cookie
// function saveTasks() {
//     //get the current day to store in the tasks data in cache
//     let currentDay = new Date().getDate();
//     let tasks = buildTaskList();
//     console.log(tasks);
//     lscache.set('tasks', {'date': currentDay, 'tasks': tasks});
// }
//
// //retrieves any taks stored as cookies and repopulates the task list.
// function loadTasks() {
//
//     let storedTasks = lscache.get('tasks');
//     console.log('LOADING TASKS!!>>>>>>>>>>> ' + storedTasks);
//     if (storedTasks !== null) {
//         console.log(storedTasks);
//         let currentDay = new Date().getDate();
//         //check to make sure the dates were stored today
//         if (currentDay === storedTasks.date) {
//             let taskList = storedTasks.tasks;
//             for (var task in taskList) {
//                 console.log('current task >>>>>>' + JSON.stringify(task));
//                 addTaskToList(task);
//             }
//         } else {
//             //if not stored today remove the stored tasks from local storage
//             // lscache.remove('tasks');
//         }
//     }
// }

//adds the given task to the list of displayed tasks
/*function addTaskToList(task) {
    //lodash template for task html
    const taskTemplate = _.template('<div class="row"><div class="task col-xs-10" taskDescription="<%= desc %>" taskDuration="<%= duration %>"><span id="description">' +
        '<%= desc %></span><span id="duration"><%= duration %></span>' +
        '</div><div class="col-xs-1 task-delete"><button class="btn btn-default-outline delete-task"><span class="glyphicon glyphicon-trash"></span></button></div>' +
        '<div class="col-xs-1 task-edit"><button class="btn btn-default-outline edit-task"><span class="glyphicon glyphicon-pencil"></span></button></div></div>');

    let taskRow = taskTemplate({
        "desc": task.description,
        "duration": task.duration
    });
    //append the task to the list of tasks
    $('#task-container').append(taskRow);

}*/

//gets the current tasks in the list and builds them in an array of Task objects
// function buildTaskList() {
//     let taskArray = [];
//     $('.task').each(function() {
//         taskArray.push(new Task($(this).attr('taskDescription'), $(this).attr('taskDuration')));
//     });
//     conole.log(taskArray);
//     return taskArray;
// }
//
// $(document).ready(function() {
//     // timeCircles = init(); //initialize the timeCircles
//
//     //bind the enter key to the start/pause button
//     $(document).bind('keypress', function(e) {
//         if (event.keyCode == 13) {
//             $(".start,.pause").click();
//         }
//     });

    //prompt the user to make sure they've logged their hours before closing the window
    // window.onbeforeunload = function(e) {
    //     saveTasks();
    //     if (!devMode) { //only show the prompt if this is not the version in development
    //         return 'Have you logged your time to EDIHours?';
    //     }
    // };
// });
