
const error_reducer = (error = [], action) => {

  switch (action.type){
  case 'ADD_ERROR': {
    return error.filter((error)=>{
      return error.type === action.sourceType && error.templateName === action.templateName;
    }).concat({
      type: action.sourceType,
      message: action.message,
      template: typeof action.templateName === 'undefined'? '' : action.templateName
    });
  }
  case 'CLEAR_ERROR': {
    return error.filter((error)=>{
      return error.type === action.sourceType && error.templateName === action.templateName;
    });
  }
  default:{
    return error;
  }
  }

};

module.exports = {
  error_reducer: error_reducer
};
