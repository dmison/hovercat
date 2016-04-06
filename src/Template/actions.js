const addTemplate = (template, name, type) => {
  return {
    type: 'ADD_TEMPLATE',
    template: template,
    templateName: name,
    templateType: type
  };
};

const updateTemplate = (id, name, type, template) => {
  return {
    type: 'UPDATE_TEMPLATE',
    id: id,
    template: template,
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

module.exports = {
  addTemplate: addTemplate,
  updateTemplate: updateTemplate,
  deleteTemplate: deleteTemplate
};
