const {connect} = require('react-redux');
const ErrorConsole = require('./ErrorConsole.jsx');
const {setConsoleHeight} = require('../UIState/actions.js');

const mapStateToProps = (state) => {
  return {
    errors: state.errors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConsoleHeight: (height) => { dispatch(setConsoleHeight(height)); }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ErrorConsole);
