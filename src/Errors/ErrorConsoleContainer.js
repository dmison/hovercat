const {connect} = require('react-redux');
const ErrorConsole = require('./ErrorConsole.jsx');

const mapStateToProps = (state) => {
  return {
    errors: state.errors
  };
};

module.exports = connect(mapStateToProps, null)(ErrorConsole);
