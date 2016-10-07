import React from 'react';
import './App.css';
import Task from './Task';

varTaskList = React.createClass({
  getInitialState() {
    return {
      tasks: []
    }
  },
  add(description, duration) {
    var tasks = [
      ...{this.tasks},
      {
        id: this.nextId,
        description: description,
        duration: duration
      }
    ]
    this.setState(tasks);
  },
  eachTask(task) {
    return (
      <Task key={note.id}
            id={note.id}
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
