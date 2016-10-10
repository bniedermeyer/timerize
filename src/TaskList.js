import React from 'react';
import './App.css';
import timeCircleUtils from './TimeCircleUtils';
import Task from './Task';
import $ from 'jquery';

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
    if (confirm("Are you sure you want to stop tracking this task and log it to today's task list?")) {
            var duration = timeCircleUtils.calculateTime($('.time-container').TimeCircles().getTime());
            var description = $('#task-input').val();
            this.add(description, duration);
        }
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
  // update(description, duration, id) { //TODO: implement logic for editing
  //   var tasks = this.state.tasks.map(
  //     task => (this.task.id !== id) ?
  //         task :
  //         {
  //           ...task,
  //           description: description,
  //           duration: duration
  //         }
  //   );
  //   this.setState({tasks});
  // },
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
    ('.time-container').TimeCircles().stop();
    this.setState({counting: false});
  },
  resetCount() {
    $('.time-container').TimeCircles().restart().stop();
    $('#task-input').val('');
    this.setState({counting: false});
  },
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
  },
  renderCounting() {
    return (
      <div className="row">
        <button className="btn btn-success col-xs-4" oncClick={this.stopCount}>Pause</button>
        <button className="btn btn-danger col-xs-4"
        onClick={this.resetCount}>Reset</button>
        <button className="btn btn-warning col-xs-4"
        onClick={this.newTask}>New Task</button>
      </div>
    )
  },
  render() {
    return (
        <div className="taskList">
          {(this.state.counting) ? this.renderCounting() : this.renderNotCounting()}
            {this.state.tasks.map(this.eachTask)}
        </div>
    )
  }
});

export default TaskList;
