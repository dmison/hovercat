const {connect} = require('react-redux');
const EditorList = require('./EditorList.jsx');

const {updateContent} = require('../Content/actions.js');
const {updateTemplate} = require('../Template/actions.js');
const {setSaved} = require('../UIState/actions.js');

const mapStateToProps = (state) => {
  return {
    templates: state.templates,
    content: state.content,
    height: state.uistate.height,
    consoleHeight: state.uistate.consoleHeight,
    editorWrap: state.config.editor.wrapEnabled
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateContent: (content) => { dispatch(updateContent(content)); },
    updateTemplate: (id, name, type, template) => { dispatch(updateTemplate(id, name, type, template)); },
    setSaved: (saved) => { dispatch(setSaved(saved)); }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(EditorList);
