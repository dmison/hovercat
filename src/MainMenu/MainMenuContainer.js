const {connect} = require('react-redux');
const MainMenu = require('./MainMenu.jsx');

const {clearTemplates, importTemplates} = require('../Template/actions.js');
const {updateContent} = require('../Content/actions.js');
const {importConfig} = require('../Config/actions.js');
const {buildAll} = require('../Compiler/actions.js');
const {setURLs} = require('../Bitly/actions.js');

const {setSaved, setSaving, setFilename, setResourcesPath, setHomeDir} = require('../UIState/actions.js');

const mapStateToProps = (state) => {
  return {
    uistate: state.uistate,
    content: state.content,
    urls: state.urls,
    templates: state.templates,
    config: state.config
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buildAll: () => { dispatch(buildAll()); },
    clearTemplates: () => { dispatch(clearTemplates()); },
    updateContent: (content) => { dispatch(updateContent(content)); },
    setSaved: (saved) => { dispatch(setSaved(saved)); },
    setSaving: (saving) => { dispatch(setSaving(saving)); },
    setFilename: (filename) => { dispatch(setFilename(filename)); },
    importTemplates: (templates) => { dispatch(importTemplates(templates)); },
    setResourcesPath: (path) => { dispatch(setResourcesPath(path)); },
    setHomeDir: (dir) => { dispatch(setHomeDir(dir));  },
    importConfig: (config) => { dispatch(importConfig(config)); },
    setURLs: (urls) => { dispatch(setURLs(urls)); }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(MainMenu);
