const default_config = {
  'editor':{
    'wrapEnabled': true,
    'enableLiveAutoCompletion': false,
    'enableBasicAutoCompletion': false
  },
  'bitlyAccessToken': '',
  'email': {
    'gmail': {
      'username': '',
      'appPassword': ''
    },
    'smtp': {
      'sender': '',
      'host': '',
      'port': 25,
      'tls': {
        'rejectUnauthorized': true
      }
    }
  }
};
const config_reducer = (state = default_config, action) => {

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
  config_reducer: config_reducer,
  default_config: default_config
};
