const {connect} = require('react-redux');
const EditorList = require('./EditorList.jsx');

const updateContent = require('../Content/actions.js').updateContent;
const updateTemplate = require('../Template/actions.js').updateTemplate;

const mapStateToProps = (state) => {
  return {
    templates: state.templates,
    content: state.content
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateContent: (content) => { dispatch(updateContent(content)); },
    updateTemplate: (id, name, type, template) => { dispatch(updateTemplate(id, name, type, template)); }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(EditorList);
