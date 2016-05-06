const addTemplate = (name, type, template ) => {
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

const deleteTemplate = (id) => {
  return {
    type: 'DEL_TEMPLATE',
    id: id
  };
};

const clearTemplates = () => {
  return {
    type: 'CLEAR_TEMPLATES'
  };
};

const importTemplates = (templates) => {
  return {
    type: 'IMPORT_TEMPLATES',
    templates: templates
  };
};

module.exports = {
  addTemplate: addTemplate,
  updateTemplate: updateTemplate,
  deleteTemplate: deleteTemplate,
  clearTemplates: clearTemplates,
  importTemplates: importTemplates
};
