(function(){
  var React = require('react');
  var Modal = require('react-bootstrap/lib/Modal');
  var Button = require('react-bootstrap/lib/Button');

  var  ModalConfig = React.createClass({

    render: function() {
      return (
        <Modal dialogClassName='custom-modal' show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-lg'>Configuration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Wrapped Text</h4>
            <p>Ipsum molestiae natequuntur perspiciatis cumque dolorem.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            <Button onClick={this.saveConfig}>Save</Button>

          </Modal.Footer>
        </Modal>
      );
    }
  });

  module.exports = ModalConfig;

}())


// <Modal show={this.state.showConfig} onHide={this.closeConfig}>
//
//   <Modal.Header closeButton><Modal.Title>Configuration</Modal.Title></Modal.Header>
//   <Modal.Body>
//     <p>blah blah blah.</p>
//   </Modal.Body>
//   <Modal.Footer>
//     <p>footer here</p>
//   </Modal.Footer>
//
//
// </Modal>
