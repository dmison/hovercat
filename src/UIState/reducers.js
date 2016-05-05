const ui_state_reducer = (state = [], action) => {

  switch(action.type){
  case 'SET_SAVED':
    return state.filter(item=>{
      return item.key === 'saved';
    }).concat({'saved': action.saved});
  case 'SET_WRAP':
    return state.filter(item=>{
      return item.key === 'wrap';
    }).concat({'wrap': action.enabled});

  default:
    return state;
  }

};


module.exports = {
  ui_state_reducer: ui_state_reducer
};
