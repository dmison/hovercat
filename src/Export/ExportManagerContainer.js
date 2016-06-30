const {connect} = require('react-redux');
const ExportManager = require('./ExportManager.jsx');

const mapStateToProps = (state) => {
  return {
    templates: state.templates,
    output: state.output,
    homeDir: state.uistate.homeDir,
    height: state.uistate.height-50
  };
};

module.exports = connect(mapStateToProps)(ExportManager);
