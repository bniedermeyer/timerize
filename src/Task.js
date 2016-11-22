import React from 'react';
import {
    Row,
    Col,
    Button,
    Glyphicon,
    Dropdown,
    MenuItem,
    Form,
    FormGroup,
    FormControl,
    Modal,
    ControlLabel,
    HelpBlock
} from 'react-bootstrap';

class Task extends React.Component{
  constructor(props) {
    super(props);
    this.state = {editing: false, validDurationFormat: null};
    //bind functions
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.edit = this.edit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.load = this.load.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.render = this.render.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.description !== nextProps.description || this.props.duration !== nextProps.duration || this.state !== nextState;
  }

  edit() { //updates the state so changes can be made to the task
    this.setState({editing: true})
  }

  cancelEdit() { //cancels the editing of the task
    this.setState({editing: false});
  }

  save() { //saves changes to the task
      let newDesc = document.getElementById("formTaskDescription").value || this.props.description;
      let newDur = document.getElementById("formTaskDuration").value || this.props.duration;
      this.props.onChange(newDesc, newDur, this.props.id)
      this.setState({editing: false})
  }

  delete() { //removes the task from the list, calling the parents delete function
    this.props.onRemove(this.props.id);
  }

  load() {
    this.props.onLoad(this.props.id);
  }

  handleChange(e) {
    let newVal = e.target.value;
    if (!newVal.match(/(\d{2}:?){3}/)) {
      this.setState({validDurationFormat: 'error'});
    } else {
      this.setState({validDurationFormat: null});
    }
  }

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
  }

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
            <FormGroup controlId="formTaskDuration" validationState={this.state.validDurationFormat}>
              <Col componentClass={ControlLabel} xs={3}>Task Duration</Col>
              <Col xs={7}>
                <FormControl type="text"
                  placeholder={this.props.duration}
                  onChange={this.handleChange} />
                <FormControl.Feedback />
                { /*if the new duration doesn't fit the expected format provide a help bubble*/
                  (this.state.validDurationFormat === 'error') ?
                  <HelpBlock>Expected Format is HH:MM:SS</HelpBlock>
                : <HelpBlock />}
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.cancelEdit}>Cancel</Button>
          {/*enable or disable the ok button based on the format of duration*/
            (this.state.validDurationFormat === null) ?
            <Button onClick={this.save} bsStyle="success">OK</Button>
          : <Button onClick={this.save} bsStyle="success" disabled>OK</Button>}
        </Modal.Footer>
      </Modal>

      <Row className="inline-block">
          <Col className="task" xs={10} xsOffset={1}>{this.props.description} -- {this.props.duration}
            <Dropdown id="task-options" className="options pull-right" disabled>
              <Dropdown.Toggle>Options</Dropdown.Toggle>
              <Dropdown.Menu /> {/* only including the meneu here because the options will never be visible*/}
            </Dropdown>
          </Col>
      </Row>
    </div>
    )
  }

  render() { //React component render function.
    return ((this.state.editing) ? this.renderForm()
                                  : this.renderDisplay())
  }
}

export default Task;
