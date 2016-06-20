const {clearAnOutput} = require('../Compiler/actions.js');
const {updateOutput} = require('../Compiler/actions.js');
const {clearAllOutputs} = require('../Compiler/actions.js');

const addNewTemplate = (name, type, template ) => {
  return {
    type: 'ADD_TEMPLATE',
    content: template,
    templateName: name,
    templateType: type
  };
};

const updateTemplate = (id, name, type, template) => {
  return {
    type: 'UPDATE_TEMPLATE',
    id: id,
    content: template,
    templateName: name,
    templateType: type
  };
};

const importTemplates = (templates) => {
  return {
    type: 'IMPORT_TEMPLATES',
    templates: templates
  };
};

// ==============================================================
const deleteTemplate = (id) => {
  return {
    type: 'DEL_TEMPLATE',
    id: id
  };
};

const clearATemplate = (id) => {
  return (dispatch) => {
    dispatch(deleteTemplate(id));
    dispatch(clearAnOutput(id));
  };
};


// ==============================================================
const clearTemplates = () => {
  return (dispatch) => {
    dispatch(clearOnlyTemplates());
    dispatch(clearAllOutputs());
  };
};

const clearOnlyTemplates = () => {
  return {
    type: 'CLEAR_TEMPLATES'
  };
};


// ==============================================================
const addTemplate = (name, type, template) => {
  return (dispatch, getState) => {
    dispatch(addNewTemplate(name, type, template));
    const tempID = getState().templates.find((template)=>{
      return template.name === name && template.type === type;
    }).id;
    dispatch(updateOutput('',tempID));
  };
};

module.exports = {
  addTemplate: addTemplate,
  addNewTemplate: addNewTemplate,
  updateTemplate: updateTemplate,
  deleteTemplate: deleteTemplate,
  clearTemplates: clearTemplates,
  importTemplates: importTemplates,
  clearATemplate: clearATemplate,
  clearOnlyTemplates: clearOnlyTemplates
};
