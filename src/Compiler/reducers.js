const output_reducer = (state = [], action) =>{

  switch (action.type){

  case 'UPDATE_RESULTS': {
    return state.filter((item) => {
      return item.id !== action.templateID;
    }).concat({
      id: action.templateID,
      output: action.output
    });
  }

  case 'CLEAR_AN_OUTPUT': {
    return state.filter((item) => {
      return item.id !== action.templateID;
    });
  }

  case 'CLEAR_ALL_OUTPUTS': {
    return [];
  }


  default:
    return state;
  }

};

module.exports = output_reducer;
