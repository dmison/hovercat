const {connect} = require('react-redux');
const FileStatus = require('./FileStatus.jsx');

const mapStateToProps = (state) => {
  return {
    uistate: state.uistate
  };
};

module.exports = connect(mapStateToProps, null)(FileStatus);
