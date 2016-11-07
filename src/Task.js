import React from 'react';
import {Row, Col, ButtonGroup, Button, Glyphicon, Dropdown, MenuItem} from 'react-bootstrap';

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
      <Row className="inline-block">
        <Col className="task" xs={10} xsOffset={1}>{this.props.description} -- {this.props.duration}
          <Dropdown id="task-options" className="options pull-right">
            <Dropdown.Toggle>Options</Dropdown.Toggle>
            <Dropdown.Menu>
              <MenuItem onClick={this.delete}>
                <Glyphicon glyph="trash" /> Delete
              </MenuItem>
              <MenuItem onClick={this.edit}>
                <Glyphicon glyph="pencil" /> Edit
              </MenuItem>
              <MenuItem onClick={this.load}>
                <Glyphicon glyph="open" /> Load Task
              </MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    )
  },
  renderForm() { //renders the task when it is being edited
    return (
      <Row>
        <Col className="task" xs={10} xsOffset={1}>
        <textarea ref="newDescription" defaultValue={this.props.description} rows="1"></textarea>
        <textarea ref="newTime" defaultValue={this.props.duration} rows="1"></textarea>
        <span className="buttons">
          <ButtonGroup className="pull-right">
            <Button onClick={this.cancelEdit}>X</Button>
            <Button  onClick={this.save}>
              <Glyphicon glyph="floppy-save" />
            </Button>
          </ButtonGroup>
        </span>
        </Col>
      </Row>
    )
  },
  render() { //React component render function.
    return ((this.state.editing) ? this.renderForm()
                                  : this.renderDisplay())
  }
});

export default Task;
