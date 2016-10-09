import React from 'react';
import './App.css';
import Task from './Task';

var TaskList = React.createClass({
  getInitialState() {
    return {
      tasks: [],
      counting: false
    }
  },
  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  },
  newTask() {
    
  },
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
  },
  update(description, duration, id) {
    var tasks = this.state.tasks.map(
      task => (this.task.id !== id) ?
          task :
          {
            ...task,
            description: description,
            duration: duration
          }
    );
    this.setState({tasks});
  },
  eachTask(task) {
    return (
      <Task key={task.id}
            id={task.id}
            onChange={this.update}
            onRemove={this.remove}>
            {task.task}
      </Task>
    )
  },
  startCount() {
    $('.time-container').TimeCircles().start();
    this.setState({counting: true});
  },
  stopCount() {
    $('.time-container').TimeCircles().stop();
    this.setState({counting: false});
  },
  resetCount() {
    $('.time-container').TimeCircles().restart().stop();
    $('#task-input').val('');
    this.setState({counting: false});
  },
  renderNotCounting() {
    return (
      <div class="row">
        <button class="btn btn-success col-xs-4"
        onClick={this.startCount}>Start</button>
        <button class="btn btn-danger col-xs-4"
        onClick={this.resetCount}>Reset</button>
        <button class="btn btn-warn col-xs-4"
        onClick={this.newTask}>New Task</button>
      </div>
    )
  },
  renderCounting() {
    return (
      <div class="row">
        <button class="btn btn-success col-xs-4" oncClick={this.stopCount}>Pause</button>
        <button class="btn btn-danger col-xs-4"
        onClick={this.resetCount}>Reset</button>
        <button class="btn btn-warn col-xs-4"
        onClick={this.newTask}>New Task</button>
      </div>
    )
  },
  render() {
    return (
      <div className="taskList">
        if (counting) ? renderCounting() : renderNotCounting()
        {this.state.tasks.map(this.eachTask)}</div>
    )
  }
});

export default TaskList;
