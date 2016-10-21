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
    this.newTask = this.newTask.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.eachTask = this.eachTask.bind(this);
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
    if (confirm("Are you sure you want to stop tracking this task and `log` it to today's task list?")) {
            var description = document.getElementById("task-input").value;
            var duration = this.timer.getTimeString();
            this.add(description, duration);
            this.timer.resetTimer();
            this.setState({isCounting: false});
            document.getElementById("task-input").value = '';

        }
  }
  add(desc, dur) {
    var tasks = [
      ...this.state.tasks,
      {
        id: this.nextId(),
        description: desc,
        duration: dur
      }
    ];
    this.setState({tasks});
  }
  update(newDescription, id) {
    var tasks = this.state.tasks.map(
      task => (task.id !== id) ?
      task :
      {
        ...task,
        description: newDescription
        // duration: newDuration
      }
    )
    this.setState({tasks});
  }
  eachTask(task) {
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
  remove(id) {
    var tasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({tasks});
  }
  startCount() {
    this.timer.startTimer();
    this.setState({isCounting: true});
  }
  stopCount() {
    this.timer.stopTimer();
    this.setState({isCounting: false});
  }
  resetCount() {
    if (confirm("Are you sure you want to reset the timer? You will lose your current task's time!")) {
      this.timer.resetTimer();
      document.getElementById("task-input").value = '';
      this.setState({isCounting: false});
    }

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
