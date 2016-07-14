const {connect} = require('react-redux');
const EditorList = require('./EditorList.jsx');

const {updateContent} = require('../Content/actions.js');
const {updateTemplate} = require('../Template/actions.js');
const {setSaved} = require('../UIState/actions.js');
const {buildAll} = require('../Compiler/actions.js');
const {setURLs} = require('../Bitly/actions.js');

const mapStateToProps = (state) => {
  return {
    templates: state.templates,
    content: state.content,
    urls: state.urls,
    height: state.uistate.height,
    consoleHeight: state.uistate.consoleHeight,
    editorWrap: state.config.editor.wrapEnabled,
    authToken: state.config.bitlyAccessToken,
    enableBasicAutoCompletion: state.config.editor.enableBasicAutoCompletion,
    enableLiveAutoCompletion: state.config.editor.enableLiveAutoCompletion
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buildAll: () => { dispatch(buildAll()); },
    updateContent: (content) => { dispatch(updateContent(content)); },
    updateTemplate: (id, name, type, template) => { dispatch(updateTemplate(id, name, type, template)); },
    setSaved: (saved) => { dispatch(setSaved(saved)); },
    setURLs: (urls) => { dispatch(setURLs(urls)); }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(EditorList);
