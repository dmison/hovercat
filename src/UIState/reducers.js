const uistate_reducer = (state = {}, action) => {

  switch (action.type){
  case 'SET_SAVED':
    return Object.assign( {}, state, { saved: action.saved } );
  case 'SET_SAVING':
    return Object.assign( {}, state, { saving: action.saving } );
  case 'SET_FILENAME':
    return Object.assign( {}, state, { filename: action.filename } );
  case 'SET_RESOURCES_PATH':
    return Object.assign( {}, state, { resourcesPath: action.path } );
  case 'SET_ACTIVE':
    return Object.assign( {}, state, { active: action.active } );
  case 'SET_HEIGHT':
    return Object.assign( {}, state, { height: action.height } );
  case 'SET_CONSOLE_HEIGHT':
    return Object.assign( {}, state, { consoleHeight: action.height } );
  case 'SET_HOME_DIR':
    return Object.assign( {}, state, { homeDir: action.dir } );
  default:
    return state;
  }

};


module.exports = {
  uistate_reducer: uistate_reducer
};
