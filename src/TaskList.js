import React from 'react';
import './App.css';
import Task from './Task';
import Timer from './Timer';

class TaskList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {tasks: [], isCounting: false, seconds: 0};

    //functions
    this.nextId = this.nextId.bind(this);
    // this.newTask = this.newTask.bind(this);
    // this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    // this.eachTask = this.eachTask.bind(this);
    this.startCount = this.startCount.bind(this);
    this.stopCount = this.stopCount.bind(this);
    this.resetCount = this.resetCount.bind(this);
    this.timer = new Timer();
  }
  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }
  newTask() {
    if (confirm("Are you sure you want to stop tracking this task and log it to today's task list?")) {
            // TODO: implement adding of new task.
            // this.add(description, duration);
        }
  }
  add(description, duration) {
    var tasks = [
      ...this.state.tasks,
      {
        id: this.nextId(),
        description: description,
        duration: duration
      }
    ];
    this.setState({tasks});
  }
  update(description, duration, id) {
  }
  eachTask(task) {
    return (
      <Task key={task.id}
            id={task.id}
            onChange={this.update}
            onRemove={this.remove}>
            {task.task}
      </Task>
    )
  }
  startCount() {
    console.log(this.state.isCounting);
    console.log(this.state.seconds);
    var secs = this.state.seconds
    setInterval(function() {
      secs++;
      console.log(secs);
    },1000);
    this.setState({isCounting: true, seconds: secs});
  }
  stopCount() {
    this.setState({isCounting: false})
    console.log(this.state.seconds);
  }
  resetCount() {
  }
  renderNotCounting() {
    return (
      <div className="row">
        <button className="btn btn-success col-xs-4"
        onClick={this.startCount}>Start</button>
        <button className="btn btn-danger col-xs-4"
        onClick={this.resetCount}>Reset</button>
        <button className="btn btn-warning col-xs-4"
        onClick={this.newTask}>New Task</button>
      </div>
    )
  }
  renderCounting() {
    return (
      <div className="row">
        <button className="btn btn-primary col-xs-4"
        onClick={this.stopCount}>Pause</button>
        <button className="btn btn-danger col-xs-4"
        onClick={this.resetCount}>Reset</button>
        <button className="btn btn-warning col-xs-4"
        onClick={this.newTask}>New Task</button>
      </div>
    )
  }
  render() {
    return (
        <div className="taskList">
          {(this.state.isCounting) ? this.renderCounting() : this.renderNotCounting()}
            {this.state.tasks.map(this.eachTask)}
        </div>
    )
  }
}

export default TaskList;
