import React from 'react';

var Task = React.createClass({
  getInitialState() {
    return ( {
      editing: false
    })
  },
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.description !== nextProps.description || this.props.duration !== nextProps.duration || this.state !== nextState;
  },
  edit() { //updates the state so changes can be made to the task
    this.setState({editing: true})
  },
  cancelEdit() { //cancels the editing of the task
    this.setState({editing: false});
  },
  save() { //saves changes to the task
        this.props.onChange(this.refs.newDescription.value, this.refs.newTime.value, this.props.id)
        this.setState({editing: false})
  },
  delete() { //removes the task from the list, calling the parents delete function
    this.props.onRemove(this.props.id);
  },
  load() {
    this.props.onLoad(this.props.id);
  },
  renderDisplay() { //renders the task when no editing is taking place
    return (
      <div className="row">
          <div className="task col-xs-9">{this.props.description} -- {this.props.duration}</div>
          <div className="col-xs-1 task-button">
              <button className="btn btn-default-outline" onClick={this.delete}><span className="glyphicon glyphicon-trash"></span>
              </button>
          </div>
          <div className="col-xs-1 task-button">
              <button className="btn btn-default-outline" onClick={this.edit}><span className="glyphicon glyphicon-pencil"></span></button>
          </div>
          <div className="col-xs-1 task-button">
            <button className="btn btn-default-outline" onClick={this.load}><span className="glyphicon glyphicon-open"></span></button>
          </div>
      </div>
    )
  },
  renderForm() { //renders the task when it is being edited
    return (
        <div className="row">
          <div className="task col-xs-10">
            <textarea ref="newDescription" defaultValue={this.props.description} rows="1"></textarea>
            <textarea ref="newTime" defaultValue={this.props.duration} rows="1"></textarea>
          </div>
          <div className="col-xs-1 task-button">
            <button className="btn btn-default-outline" onClick={this.cancelEdit}>X</button>
          </div>
          <div className="col-xs-1 task-button">
            <button className="btn btn-default-outline" onClick={this.save}><span className="glyphicon glyphicon-floppy-save"></span></button>
          </div>
        </div>
    )
  },
  render() { //React component render function.
    return ((this.state.editing) ? this.renderForm()
                                  : this.renderDisplay())
  }
});

export default Task;
