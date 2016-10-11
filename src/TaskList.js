import React from 'react';
import './App.css';
import Task from './Task';
import Timer from 'timer-machine';

var timer;
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
  componentDidMount() {
    timer = new Timer();
  },
  newTask() {
    if (confirm("Are you sure you want to stop tracking this task and log it to today's task list?")) {
            // TODO: implement adding of new task.
            // this.add(description, duration);
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
    timer.on('time', function (time) {
        console.log('Current time: ' + time + 'ms');
        document.getElementsByClassName('time-container').innerHTML = time;
    })
    timer.toggle()
    setInterval(timer.emitTime.bind(timer), 1000)
    this.setState({counting: true});
  },
  stopCount() {
    timer.stop();
    alert('pause clicked!');
    this.setState({counting: false});
  },
  resetCount() {
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
        <button className="btn btn-primary col-xs-4"
        onClick={this.stopCount}>Pause</button>
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
