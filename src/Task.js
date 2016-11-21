import React from 'react';
import {Row, Col, Button, Glyphicon, Dropdown, MenuItem, Form, FormGroup, FormControl, Modal, ControlLabel} from 'react-bootstrap';

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
      let newDesc = document.getElementById("formTaskDescription").value || this.props.description;
      let newDur = document.getElementById("formTaskDuration").value || this.props.duration;
      this.props.onChange(newDesc, newDur, this.props.id)
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
                <Glyphicon glyph="open" /> Resume Task
              </MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    )
  },
  renderForm() { //renders the task when it is being edited
    return (
      <div id="taskEditView">
      <Modal show={this.state.editing}>
        <Modal.Header><h4>Edit Task</h4></Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup controlId="formTaskDescription">
              <Col componentClass={ControlLabel} xs={3}>Task Description</Col>
              <Col xs={7}>
                <FormControl type="text" placeholder={this.props.description} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formTaskDuration">
              <Col componentClass={ControlLabel} xs={3}>Task Duration</Col>
              <Col xs={7}>
                <FormControl type="text" placeholder={this.props.duration} />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.cancelEdit}>Cancel</Button>
          <Button onClick={this.save} bsStyle="success">OK</Button>
        </Modal.Footer>
      </Modal>

      <Row className="inline-block">
          <Col className="task" xs={10} xsOffset={1}>{this.props.description} -- {this.props.duration}
            <Dropdown id="task-options" className="options pull-right" disabled>
              <Dropdown.Toggle>Options</Dropdown.Toggle>
              <Dropdown.Menu />
            </Dropdown>
          </Col>
      </Row>
    </div>
    )
  },
  render() { //React component render function.
    return ((this.state.editing) ? this.renderForm()
                                  : this.renderDisplay())
  }
});

export default Task;
