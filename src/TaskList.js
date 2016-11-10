import React from 'react';
import Task from './Task';
import Timer from './Timer';
import ConfirmationDialog from './ConfirmationDialog';
import {Modal, ButtonGroup, Button, Row} from 'react-bootstrap'

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isCounting: false,
            showLocalStateModal: false,
            showConfirmationDialog: false,
            displayConfirmaitonCancelButton: true,
            displayConfirmationHeader: true,
            confirmationDialogMessage: '',
            loadedTaskId: ''
        };

        //binding functions to the react component
        this.add = this.add.bind(this);
        this.nextId = this.nextId.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.logTask = this.logTask.bind(this);
        this.eachTask = this.eachTask.bind(this);
        this.loadTask = this.loadTask.bind(this);
        this.startCount = this.startCount.bind(this);
        this.stopCount = this.stopCount.bind(this);
        this.resetCount = this.resetCount.bind(this);
        this.persistState = this.persistState.bind(this);
        this.loadLocalState = this.loadLocalState.bind(this);
        this.deleteLocalState = this.deleteLocalState.bind(this);
        this.promptForTaskLog = this.promptForTaskLog.bind(this);
        this.validateDescription = this.validateDescription.bind(this);
        this.promptForCountReset = this.promptForCountReset.bind(this);
        this.openConfirmationDialog = this.openConfirmationDialog.bind(this);
        this.closeConfirmatiionDialog = this.closeConfirmatiionDialog.bind(this);


        //objects
        this.timer = new Timer();
        this.confirmationCallback = null;
        //local state from browser
        this.localState = JSON.parse(localStorage.getItem('TaskListState'));
    }
    componentDidMount() {
        //if there exists any previous state, prompt to see if it should be loaded
        // var localState = JSON.parse(localStorage.getItem('TaskListState'));
        if (this.localState !== null) {
            this.setState({showLocalStateModal: true});
        }
    }
    persistState() { //stores the current state in local storage
        var state = this.state;
        localStorage.setItem('TaskListState', JSON.stringify(state));
    }
    loadLocalState() { //loads the previous state of the task list from the browser's local storage
        this.setState(this.localState);
    }
    deleteLocalState() { //deletes the stored state from the browser's local storage
        localStorage.removeItem('TaskListState');
        this.setState({showLocalStateModal: false});
    }
    nextId() { //generate a new id for a new task
        this.uniqueId = this.uniqueId || this.state.tasks.length;
        return this.uniqueId++;
    }
    logTask() { //logs the current task to the task list and clears input for another
        var description = document.getElementById("task-input").value;
        var duration = this.timer.getTimeString();
        this.add(description, duration);
        this.timer.resetTimer();
        this.setState({isCounting: false, showTaskLogConfirmDialog: false});
        document.getElementById("task-input").value = '';
    }
    add(desc, dur) { //adds a new task to the list
        var tasks;
        var loadedId = this.state.loadedTaskId;
        if (this.state.loadedTaskId !== '') { //update the task that was loaded
            tasks = this.state.tasks.filter(function(tsk) {
                return tsk.id !== loadedId;
            });
            tasks.push({id: this.state.loadedTaskId, description: desc, duration: dur});
        } else { //new task, add it to the list
            tasks = [
                ...this.state.tasks, {
                    id: this.nextId(),
                    description: desc,
                    duration: dur
                }
            ];
        }
        //sort the tasks so that they appear in the same order they were displayed in
        tasks = tasks.sort(function(a, b) {
            return a.id - b.id;
        });
        //set the state of the tasks and clear the lodaded id. Save the current state to local storage
        this.setState({
            tasks,
            loadedTaskId: ''
        }, this.persistState);
    }
    update(newDescription, newDuration, id) { //update a task that has been edited
        var tasks = this.state.tasks.map(task => (task.id !== id)
            ? task
            : {
                ...task,
                description: newDescription,
                duration: newDuration
            })
        this.setState({
            tasks
        }, this.persistState);
    }
    loadTask(id) {
        var task = this.state.tasks.find(function(tsk) {
            return tsk.id === id;
        });
        this.timer.setTime(task.duration);
        document.getElementById("task-input").value = task.description;
        this.setState({isCounting: false, loadedTaskId: id});
    }
    eachTask(task) { //creates task components in the list
        return (
            <Task key={task.id} id={task.id} description={task.description} duration={task.duration} onChange={this.update} onRemove={this.remove} onLoad={this.loadTask}>
                {task.task}
            </Task>
        )
    }
    remove(id) { //removes a task from the list
        var tasks = this.state.tasks.filter(task => task.id !== id);
        this.setState({
            tasks
        }, this.persistState);
    }
    startCount() { //starts the timer counting
        this.timer.startTimer();
        this.setState({isCounting: true});
    }
    stopCount() { //stops the timer counting
        this.timer.stopTimer();
        this.setState({isCounting: false});
    }
    resetCount() { //resets the timer and clears the description box
        this.timer.resetTimer();
        document.getElementById("task-input").value = '';
        this.setState({isCounting: false, showResetCountDialog: false, loadedTaskId: ''});
    }
    validateDescription() {
        if (document.getElementById("task-input").value === '') {
            this.openConfirmationDialog("Please enter a task description before loggin the task", false, false, this.closeConfirmatiionDialog);
            return false;
        } else  {
            return true;
        }

    }
    promptForCountReset() { //displays the modal to reset the count
        this.openConfirmationDialog("Are you sure you want to reset the timer? You will lose your current task's time!", true, true, this.resetCount);
    }
    promptForTaskLog() { //displays the modal to confirm the logging of a task
        // this.setState({showTaskLogConfirmDialog: true});
        if (this.validateDescription()) {
            this.openConfirmationDialog("Are you sure you want to stop tracking this task and log it to today's task list?", true, true,  this.logTask);
        }

    }
    openConfirmationDialog(message, displayHeader, displayCancelButton, callback) {
        this.confirmationCallback = callback;
        this.setState({showConfirmationDialog: true, displayConfirmaitonCancelButton: displayCancelButton, displayConfirmationHeader: displayHeader,  confirmationDialogMessage: message});
    }
    closeConfirmatiionDialog() {
        this.setState({showConfirmationDialog: false});
    }
    renderNotCounting() { //the way the buttons should display if the timer is not currently running
        return (
            <Row>
                <ButtonGroup className="col-xs-12">
                    <Button className="col-xs-4 toggle-timer" bsStyle="success" onClick={this.startCount}>Start</Button>
                    <Button className="col-xs-4" bsStyle="danger" onClick={this.promptForCountReset}>Reset Timer</Button>
                    <Button className="col-xs-4" bsStyle="warning" onClick={this.promptForTaskLog}>Log Current Task</Button>
                </ButtonGroup>
            </Row>
        )
    }
    renderCounting() { //the way the buttons should display if the timer is currently counting
        return (
            <Row>
                <ButtonGroup className="col-xs-12">
                    <Button className="col-xs-4 toggle-timer" bsStyle="primary" onClick={this.stopCount}>Pause</Button>
                    <Button className="col-xs-4" bsStyle="danger" onClick={this.promptForCountReset}>Reset Timer</Button>
                    <Button className="col-xs-4" bsStyle="warning" onClick={this.promptForTaskLog}>Log Current Task</Button>
                </ButtonGroup>
            </Row>
        )
    }
    render() { //React render function. Renders the list and buttons
        return (
            <div className="taskList">
                <div id="modals">
                    <Modal show={this.state.showLocalStateModal} autoFocus={true}>
                        <Modal.Body>
                            <p>Would you like to load your previous tasks you had saved? You will not be able to load them after clicking No.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.deleteLocalState} bsStyle="danger">No</Button>
                            <Button onClick={this.loadLocalState} bsStyle="success">Yes</Button>
                        </Modal.Footer>
                    </Modal>
                    <ConfirmationDialog
                        show={this.state.showConfirmationDialog}
                        displayCancelButton={this.state.displayConfirmaitonCancelButton}
                        displayHeader={this.state.displayConfirmationHeader}
                        close={this.closeConfirmatiionDialog}
                        callback={this.confirmationCallback}
                        message={this.state.confirmationDialogMessage}>
                    </ConfirmationDialog>
                </div>

                {(this.state.isCounting)
                    ? this.renderCounting()
                    : this.renderNotCounting()}
                {this.state.tasks.map(this.eachTask)}
            </div>
        )
    }
}

export default TaskList;
