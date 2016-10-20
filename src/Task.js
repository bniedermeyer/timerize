import React from 'react';
import './App.css';

var Task = React.createClass({
  getInitialState() {
    return ( {
      editing: false,
      /*taskDescription: '',
      taskDuration: ''
      //commenting out because these will probably be set by the container
      */
    })
  },
  componentDidUpdate() {
      if (this.state.editing) {
          this.refs.newText.focus()
          this.refs.newText.select()
      }
  },
  edit() {
    this.setState({editing: true})
  },
  save() {
        this.props.onChange(this.refs.newText.value, this.props.id)
        this.setState({editing: false})
  },
  delete() {
    this.props.onRemove(this.props.id)
  },
  renderDisplay() {
    return (
      <div className="row">
          <div className="task col-xs-10"></div>
          <div className="col-xs-1 task-delete">
              <button className="btn btn-default-outline" onClick={this.delete}><span className="glyphicon glyphicon-trash"></span>
              </button>
          </div>
          <div className="col-xs-1 task-edit">
              <button className="btn btn-default-outline" onClick={this.edit}><span className="glyphicon glyphicon-pencil"></span></button>
          </div>
      </div>
    )
  },
  renderForm() {
    return (
        <div className="row">
          <div className="task col-xs-10">
            <textarea ref="newText" defaultValue={this.props.children}></textarea>
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
