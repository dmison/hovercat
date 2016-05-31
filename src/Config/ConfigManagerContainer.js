const {connect} = require('react-redux');
const ConfigManager = require('./ConfigManager.jsx');
const {setEditorWrap} = require('./actions.js');
const {importConfig} = require('./actions.js');

const mapStateToProps = (state) => {
  return {
    config: state.config,
    homeDir: state.uistate.homeDir,
    height: state.uistate.height
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEditorWrap: (enabled) => { dispatch(setEditorWrap(enabled)); },
    importConfig: (config) => { dispatch(importConfig(config)); }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConfigManager);
