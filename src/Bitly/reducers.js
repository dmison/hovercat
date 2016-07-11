const urls_reducer = (state=[], action) => {
  switch(action.type){
  case 'SET_URLS':{
    return action.urls;
  }
  case 'CLEAR_URLS':{
    return [];
  }
  default:{
    return state;
  }
  }
};

module.exports = urls_reducer;
