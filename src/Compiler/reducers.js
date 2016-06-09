const output_reducer = (state = [], action) =>{

  switch (action.type){

  case 'UPDATE_RESULTS': {
    return state.filter((item) => {
      return item.name !== action.templateName &&
             item.type !== action.templateType;
    }).concat({
      name: action.templateName,
      type: action.templateType,
      output: action.output
    });
  }

  default:
    return state;
  }

};

module.exports = output_reducer;
