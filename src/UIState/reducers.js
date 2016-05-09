const uistate_reducer = (state = {}, action) => {

  switch(action.type){
  case 'SET_SAVED':
    return Object.assign( state, { saved: action.saved } );
  case 'SET_WRAP':
    return Object.assign( state, { wrap: action.enabled } );
  case 'SET_FILENAME':
    return Object.assign( state, { filename: action.filename } );
  case 'SET_RESOURCES_PATH':
    return Object.assign( state, { resourcesPath: action.path } );
  default:
    return state;
  }

};


module.exports = {
  uistate_reducer: uistate_reducer
};
