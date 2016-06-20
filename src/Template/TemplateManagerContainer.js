const {connect} = require('react-redux');
const TemplateManager = require('./TemplateManager.jsx');

const {updateTemplate} = require('./actions.js');
const {addTemplate} = require('./actions.js');
const {clearATemplate} = require('./actions.js');

const mapStateToProps = (state) => {
  return {
    templates: state.templates
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTemplate: (name, type, template) => { dispatch(addTemplate(name, type, template)); },
    deleteTemplate: (id) => { dispatch(clearATemplate(id)); },
    updateTemplate: (id, name, type) => { dispatch(updateTemplate(id, name, type)); }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(TemplateManager);
