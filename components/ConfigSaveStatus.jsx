var React = require('react');

var ConfigSaveStatus = (props) => {

  var element = <label></label>;

  if(props.status === 'unsaved'){
    element = <label>You have unsaved changes.</label>;
  }

  return element;

};

module.exports = ConfigSaveStatus;
