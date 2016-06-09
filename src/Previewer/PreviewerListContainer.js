const {connect} = require('react-redux');
const PreviewerList = require('./PreviewerList.jsx');

const mapStateToProps = (state) => {
  return {
    outputs: state.output,
    height: state.uistate.height,
    consoleHeight: state.uistate.consoleHeight
  };
};

module.exports = connect(mapStateToProps, null)(PreviewerList);
