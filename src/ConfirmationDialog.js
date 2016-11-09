import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class ClassificationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    //bind functions
    this.render = this.render.bind(this);
  }

  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header><h3>Are you sure?</h3></Modal.Header>
        <Modal.Body>{this.props.message}</Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.cancel}>Cancel</Button>
          <Button onClick={this.props.confirm} bsStyle="info">OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ClassificationDialog;
