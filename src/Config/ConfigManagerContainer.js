const {connect} = require('react-redux');
const ConfigManager = require('./ConfigManager.jsx');
const {importConfig} = require('./actions.js');


const mapStateToProps = (state) => {
  return {
    config: state.config,
    homeDir: state.uistate.homeDir,
    height: state.uistate.height-50
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    importConfig: (config) => { dispatch(importConfig(config)); }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConfigManager);
