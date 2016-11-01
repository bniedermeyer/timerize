import React from 'react';
import './App.css';
import Task from './Task';
import Timer from './Timer';
import {Modal, Button} from 'react-bootstrap'

class TaskList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {tasks: [], isCounting: false, showLocalStateModal: false, showTaskLogConfirmDialog: false, showResetCountDialog: false};

    //binding functions to the react component
    this.nextId = this.nextId.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.logTask = this.logTask.bind(this);
    this.eachTask = this.eachTask.bind(this);
    this.closeModals = this.closeModals.bind(this);
    this.startCount = this.startCount.bind(this);
    this.stopCount = this.stopCount.bind(this);
    this.resetCount = this.resetCount.bind(this);
    this.persistState = this.persistState.bind(this);
    this.loadLocalState = this.loadLocalState.bind(this);
    this.deleteLocalState = this.deleteLocalState.bind(this);
    this.promptForTaskLog = this.promptForTaskLog.bind(this);
    this.promptForCountReset = this.promptForCountReset.bind(this);

    //objects
    this.timer = new Timer();
  }
  componentDidMount() {
    var localState = JSON.parse(localStorage.getItem('TaskListState'));
    if (localState !== null) {
      this.setState({showLocalStateModal: true});
    }
  }
  persistState() { //stores the current state in local storage
    var state = this.state;
    localStorage.setItem('TaskListState', JSON.stringify(state));
  }
  loadLocalState() {
    var localState = JSON.parse(localStorage.getItem('TaskListState'));
    console.log(localState);
    this.setState(localState);
  }
  deleteLocalState() {
    localStorage.removeItem('TaskListState');
    this.setState({showLocalStateModal: false});
  }
  nextId() { //generate a new id for a new task
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }
  promptForTaskLog() {
    this.setState({showTaskLogConfirmDialog: true});
  }
  closeModals() {
    this.setState({showLocalStateModal: false, showTaskLogConfirmDialog: false, showResetCountDialog: false});
  }
  logTask() {
    var description = document.getElementById("task-input").value;
    var duration = this.timer.getTimeString();
    this.add(description, duration);
    this.timer.resetTimer();
    this.setState({isCounting: false, showTaskLogConfirmDialog: false});
    document.getElementById("task-input").value = '';
  }
  add(desc, dur) {//adds a new task to the list
    var tasks = [
      ...this.state.tasks,
      {
        id: this.nextId(),
        description: desc,
        duration: dur
      }
    ];
    this.setState({tasks}, this.persistState);
  }
  update(newDescription, newDuration, id) { //update a task that has been edited
    var tasks = this.state.tasks.map(
      task => (task.id !== id) ?
      task :
      {
        ...task,
        description: newDescription,
        duration: newDuration
      }
    )
    this.setState({tasks}, this.persistState);
  }
  eachTask(task) {//creates task components in the list
    return (
      <Task key={task.id}
            id={task.id}
            description={task.description}
            duration={task.duration}
            onChange={this.update}
            onRemove={this.remove}>
            {task.task}
      </Task>
    )
  }
  remove(id) {//removes a task from the list
    var tasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({tasks}, this.persistState);
  }
  startCount() {//starts the timer counting
    this.timer.startTimer();
    this.setState({isCounting: true});
  }
  stopCount() {//stops the timer counting
    this.timer.stopTimer();
    this.setState({isCounting: false});
  }
  promptForCountReset() {
    this.setState({showResetCountDialog: true});
  }
  resetCount() { //resets the timer and clears the description box
    this.timer.resetTimer();
    document.getElementById("task-input").value = '';
    this.setState({isCounting: false, showResetCountDialog: false});
  }
  renderNotCounting() { //the way the buttons should display if the timer is not currently running
    return (
      <div className="row">
        <button className="btn btn-success col-xs-4 toggle-timer"
        onClick={this.startCount}>Start</button>
        <button className="btn btn-danger col-xs-4"
        onClick={this.promptForCountReset}>Reset Timer</button>
        <button className="btn btn-warning col-xs-4"
        onClick={this.promptForTaskLog}>Log Current Task</button>
      </div>
    )
  }
  renderCounting() { //the way the buttons should display if the timer is currently counting
    return (
      <div className="row">
        <button className="btn btn-primary col-xs-4 toggle-timer"
        onClick={this.stopCount}>Pause</button>
        <button className="btn btn-danger col-xs-4"
        onClick={this.promptForCountReset}>Reset Timer</button>
        <button className="btn btn-warning col-xs-4"
        onClick={this.promptForTaskLog}>Log Current Task</button>
      </div>
    )
  }
  render() {//React render function. Renders the list and buttons
    return (
        <div className="taskList">
          <div id="modals">
            <Modal show={this.state.showLocalStateModal} autoFocus={true}>
              <Modal.Body>
                <p>Would you like to load your previous tasks you had saved? You will not be able to load them after clicking No.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.deleteLocalState}     bsStyle="danger">No</Button>
                <Button onClick={this.loadLocalState}   bsStyle="success">Yes</Button>
              </Modal.Footer>
            </Modal>
            <Modal show={this.state.showTaskLogConfirmDialog} autoFocus={true}>
              <Modal.Header>
                <h4>Are you sure?</h4>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to stop tracking this task and log it to today's task list?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeModals}>Cancel</Button>
                <Button onClick={this.logTask} bsStyle="success">OK</Button>
              </Modal.Footer>
            </Modal>
            <Modal show={this.state.showResetCountDialog} autoFocus={true}>
              <Modal.Header>
                <h4>Are you sure?</h4>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to reset the timer? You will lose your current task's time!</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeModals}>Cancel</Button>
                <Button onClick={this.resetCount} bsStyle="success">OK</Button>
              </Modal.Footer>
            </Modal>
          </div>

          {(this.state.isCounting) ? this.renderCounting() : this.renderNotCounting()}
            {this.state.tasks.map(this.eachTask)}
        </div>
    )
  }
}

export default TaskList;
