import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class ClassificationDialog extends React.Component {
  constructor(props) {
    super(props);
    //bind functions
    this.render = this.render.bind(this);
    this.cancel = this.cancel.bind(this);
    this.confirm = this.confirm.bind(this);
  }
  cancel() { //close the dialog
    this.props.close();
  }
  confirm() { //execute the callback function and close the dialog
    this.props.callback();
    this.props.close();
  }
  render() { //render the component
    return (
      <Modal show={this.props.show}>
        {(this.props.displayHeader)
        ? <Modal.Header><h4>Are you sure?</h4></Modal.Header>
        : null}
        <Modal.Body>{this.props.message}</Modal.Body>
        <Modal.Footer>
          {(this.props.displayCancelButton)
            ? <Button onClick={this.cancel}>Cancel</Button>
          : null
          }
          <Button onClick={this.confirm} bsStyle="success">OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ClassificationDialog;
