const config_reducer = (state = {}, action) => {

  switch (action.type){
  case 'SET_WRAP':
    return Object.assign( {}, state, { editor: { wrapEnabled: action.enabled } } );
  case 'IMPORT_CONFIG':
    return Object.assign( {}, state, action.config );
  case 'SET_BITLY_TOKEN':
    return Object.assign( {}, state, { bitlyAccessToken: action.token } );
  default:
    return state;
  }

};


module.exports = {
  config_reducer: config_reducer
};
