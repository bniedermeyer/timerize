import React from 'react';
import './App.css';
import Task from './Task';

varTaskList = React.createClass({
  getInitialState() {
    return {
      tasks: []
    }
  },
  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
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
  render() {
    return (
      <div className="taskList">{this.state.tasks.map(this.eachTask)}</div>
    )
  }

});

export default TaskList;
