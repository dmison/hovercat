const {connect} = require('react-redux');
const MainMenu = require('./MainMenu.jsx');
const {clearTemplates} = require('../Template/actions.js');
const {importTemplates} = require('../Template/actions.js');
const {updateContent} = require('../Content/actions.js');
const {setSaved} = require('../UIState/actions.js');
const {setFilename} = require('../UIState/actions.js');
const {setResourcesPath} = require('../UIState/actions.js');

const mapStateToProps = (state) => {
  return {
    uistate: state.uistate
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearTemplates: () => { dispatch(clearTemplates()); },
    updateContent: (content) => { dispatch(updateContent(content)); },
    setSaved: (saved) => { dispatch(setSaved(saved)); },
    setFilename: (saved) => { dispatch(setFilename(saved)); },
    importTemplates: (templates) => { dispatch(importTemplates(templates)); },
    setResourcesPath: (path) => { dispatch(setResourcesPath(path)); }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(MainMenu);
