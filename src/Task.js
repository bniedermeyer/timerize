import React from 'react';
import './App.css';

var Task = React.createClass({
  getInitialState() {
    return ( {
      editing: false
    })
  },
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.description !== nextProps.description || this.props.duration !== nextProps.duration || this.state !== nextState;
  },
  edit() {
    this.setState({editing: true})
  },
  cancelEdit() {
    this.setState({editing: false});
  },
  save() {
        this.props.onChange(this.refs.newDescription.value, this.refs.newTime.value, this.props.id)
        this.setState({editing: false})
  },
  delete() {
    this.props.onRemove(this.props.id)
  },
  renderDisplay() {
    return (
      <div className="row">
          <div className="task col-xs-10">{this.props.description} -- {this.props.duration}</div>
          <div className="col-xs-1 task-button">
              <button className="btn btn-default-outline" onClick={this.delete}><span className="glyphicon glyphicon-trash"></span>
              </button>
          </div>
          <div className="col-xs-1 task-button">
              <button className="btn btn-default-outline" onClick={this.edit}><span className="glyphicon glyphicon-pencil"></span></button>
          </div>
      </div>
    )
  },
  renderForm() {
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
  render() {
    return ((this.state.editing) ? this.renderForm()
                                  : this.renderDisplay())
  }
});

export default Task;
