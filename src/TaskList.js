import React from 'react';
import './App.css';
import Task from './Task';
import Timer from './Timer';

class TaskList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {tasks: [], isCounting: false};
    //load previous state if present
    var localState = JSON.parse(localStorage.getItem('TaskListState'));
    if (localState !== null) {
      if (confirm("Would you like to load your previous tasks you had saved? (Choosing cancel will delete them and you won't be able to recover)")) {
        this.state = localState;
      } else {
        localStorage.removeItem('TaskListState');
      }
    }
    //binding functions to the react component
    this.nextId = this.nextId.bind(this);
    this.newTask = this.newTask.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.eachTask = this.eachTask.bind(this);
    this.startCount = this.startCount.bind(this);
    this.stopCount = this.stopCount.bind(this);
    this.resetCount = this.resetCount.bind(this);
    this.persistState = this.persistState.bind(this);
    //objects
    this.timer = new Timer();
  }
  persistState() { //stores the current state in local storage
    var state = this.state;
    localStorage.setItem('TaskListState', JSON.stringify(state));
  }
  nextId() { //generate a new id for a new task
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }
  newTask() { //logs the current task to the task list and resets the form
    if (confirm("Are you sure you want to stop tracking this task and `log` it to today's task list?")) {
            var description = document.getElementById("task-input").value;
            var duration = this.timer.getTimeString();
            this.add(description, duration);
            this.timer.resetTimer();
            this.setState({isCounting: false});
            document.getElementById("task-input").value = '';
        }
  }
  add(desc, dur) {//adds a new task to the list
    var tasks = [
      ...this.state.tasks,
      {
        id: this.nextId(),
        description: desc,
        duration: dur
      }
    ];
    this.setState({tasks}, this.persistState);
  }
  update(newDescription, newDuration, id) { //update a task that has been edited
    var tasks = this.state.tasks.map(
      task => (task.id !== id) ?
      task :
      {
        ...task,
        description: newDescription,
        duration: newDuration
      }
    )
    this.setState({tasks}, this.persistState);
  }
  eachTask(task) {//creates task components in the list
    return (
      <Task key={task.id}
            id={task.id}
            description={task.description}
            duration={task.duration}
            onChange={this.update}
            onRemove={this.remove}>
            {task.task}
      </Task>
    )
  }
  remove(id) {//removes a task from the list
    var tasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({tasks}, this.persistState);
  }
  startCount() {//starts the timer counting
    this.timer.startTimer();
    this.setState({isCounting: true});
  }
  stopCount() {//stops the timer counting
    this.timer.stopTimer();
    this.setState({isCounting: false});
  }
  resetCount() { //resets the timer and clears the description box
    if (confirm("Are you sure you want to reset the timer? You will lose your current task's time!")) {
      this.timer.resetTimer();
      document.getElementById("task-input").value = '';
      this.setState({isCounting: false});
    }

  }
  renderNotCounting() { //the way the buttons should display if the timer is not currently running
    return (
      <div className="row">
        <button className="btn btn-success col-xs-4 toggle-timer"
        onClick={this.startCount}>Start</button>
        <button className="btn btn-danger col-xs-4"
        onClick={this.resetCount}>Reset Timer</button>
        <button className="btn btn-warning col-xs-4"
        onClick={this.newTask}>Log Current Task</button>
      </div>
    )
  }
  renderCounting() { //the way the buttons should display if the timer is currently counting
    return (
      <div className="row">
        <button className="btn btn-primary col-xs-4 toggle-timer"
        onClick={this.stopCount}>Pause</button>
        <button className="btn btn-danger col-xs-4"
        onClick={this.resetCount}>Reset Timer</button>
        <button className="btn btn-warning col-xs-4"
        onClick={this.newTask}>Log Current Task</button>
      </div>
    )
  }
  render() {//React render function. Renders the list and buttons
    return (
        <div className="taskList">
          {(this.state.isCounting) ? this.renderCounting() : this.renderNotCounting()}
            {this.state.tasks.map(this.eachTask)}
        </div>
    )
  }
}

export default TaskList;
