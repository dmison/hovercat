const uuid = require('node-uuid');

const template_reducer = (templates = [], action) => {

  switch (action.type){

  case 'ADD_TEMPLATE':
    return templates.concat({
      id: uuid.v1(),
      content: action.content,
      name: action.templateName,
      type: action.templateType,
      order: getMaxOrder(templates)+1
    });

  case 'UPDATE_TEMPLATE':
    return templates.map((template)=>{
      if (action.id === template.id){
        template.name = (typeof action.templateName !== 'undefined')? action.templateName: template.name;
        template.type = (typeof action.templateType !== 'undefined')? action.templateType: template.type;
        template.content = (typeof action.content !== 'undefined')? action.content: template.content;
      }
      return template;
    });

  case 'DEL_TEMPLATE':
    return templates.filter((template)=>{
      return template.id !== action.id;
    });

  case 'CLEAR_TEMPLATES':
    return [];

  case 'IMPORT_TEMPLATES':
    var nextOrder = getMaxOrder(templates);
    return templates.concat(sortTemplatesAlphabetical(action.templates).map((template)=>{
      return Object.assign({}, template, {
        id: typeof template.id === 'undefined'? uuid.v1() : template.id,
        order: typeof template.order === 'undefined'? nextOrder=nextOrder+1 : template.order
      });
    }));

  default:
    return templates;
  }

};

const getMaxOrder = (templates) => {
  return templates.reduce((prev, curr)=>{
    return curr.order > prev ? curr.order : prev;
  }, 0);
};

const sortTemplatesAlphabetical = (templates) => {
  return templates.sort((a,b)=>{
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
  });

};

module.exports = {
  template_reducer: template_reducer
};
