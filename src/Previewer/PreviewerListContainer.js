const {connect} = require('react-redux');
const PreviewerList = require('./PreviewerList.jsx');
const {addError} = require('../Errors/actions.js');
const {clearError} = require('../Errors/actions.js');

const mapStateToProps = (state) => {
  return {
    templates: state.templates,
    content: state.content
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addError: (error, type, name) => { dispatch(addError(error, type, name)); },
    clearError: (type,name) => { dispatch(clearError(type,name)); }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(PreviewerList);
