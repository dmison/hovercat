const uuid = require('node-uuid');

const template_reducer = (templates = [], action) => {

  switch(action.type){
  case 'ADD_TEMPLATE':
    return templates.concat({
      id: uuid.v1(),
      content: action.content,
      name: action.templateName,
      type: action.templateType
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
  default:
    return templates;
  }

};



module.exports = {
  template_reducer: template_reducer
};
