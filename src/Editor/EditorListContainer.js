const {connect} = require('react-redux');
const EditorList = require('./EditorList.jsx');

const {updateContent} = require('../Content/actions.js');
const {updateTemplate} = require('../Template/actions.js');
const {addTemplate} = require('../Template/actions.js');
const {deleteTemplate} = require('../Template/actions.js');

const mapStateToProps = (state) => {
  return {
    templates: state.templates,
    content: state.content
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateContent: (content) => { dispatch(updateContent(content)); },
    updateTemplate: (id, name, type, template) => { dispatch(updateTemplate(id, name, type, template)); },
    addTemplate: (name, type, template) => { dispatch(addTemplate(name, type, template)); },
    deleteTemplate: (id) => { dispatch(deleteTemplate(id)); }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(EditorList);
