const {connect} = require('react-redux');
const SendEmail = require('./SendEmail.jsx');

const mapStateToProps = (state) => {
  return {
    config: state.config.email,
    height: state.uistate.height-50
  };
};

module.exports = connect(mapStateToProps)(SendEmail);
