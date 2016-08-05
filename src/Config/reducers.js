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

const makeConfig = (state) => {
  let newState = JSON.parse(JSON.stringify(state));
  if (!newState.hasOwnProperty('editor'))newState.editor={};
  if (!newState.hasOwnProperty('email'))newState.email={};
  if (!newState.email.hasOwnProperty('gmail'))newState.email.gmail={};
  if (!newState.email.hasOwnProperty('smtp'))newState.email.smtp={};
  if (!newState.email.smtp.hasOwnProperty('tls'))newState.email.smtp.tls={};
  return newState;
};

const ifDef = (something)=>{
  return (typeof something !== 'undefined');
};

const config_reducer = (state = default_config, action) => {
  let newState = makeConfig(state);

  switch (action.type){

  case 'IMPORT_CONFIG':{
    let actionConfig = makeConfig(action.config);
    if(ifDef(actionConfig.editor.wrapEnabled)) newState.editor.wrapEnabled = actionConfig.editor.wrapEnabled;
    if(ifDef(actionConfig.bitlyAccessToken)) newState.bitlyAccessToken = actionConfig.bitlyAccessToken;

    if(ifDef(actionConfig.email.gmail.username)) newState.email.gmail.username = actionConfig.email.gmail.username;
    if(ifDef(actionConfig.email.gmail.appPassword)) newState.email.gmail.appPassword = actionConfig.email.gmail.appPassword;

    if(ifDef(actionConfig.email.smtp.sender)) newState.email.smtp.sender = actionConfig.email.smtp.sender;
    if(ifDef(actionConfig.email.smtp.host)) newState.email.smtp.host = actionConfig.email.smtp.host;
    if(ifDef(actionConfig.email.smtp.port)) newState.email.smtp.port = actionConfig.email.smtp.port;
    if(ifDef(actionConfig.email.smtp.tls.rejectUnauthorized)) newState.email.smtp.tls.rejectUnauthorized = actionConfig.email.smtp.tls.rejectUnauthorized;

    return newState;
  }


  case 'SET_WRAP':{
    newState.editor.wrapEnabled = action.enabled;
    return newState;
  }

  case 'SET_BITLY_TOKEN':{
    newState.bitlyAccessToken = action.token;
    return newState;
  }

  case 'SET_GMAIL_USERNAME':{
    newState.email.gmail.username = action.username;
    return newState;
  }

  case 'SET_GMAIL_APP_PASSWORD':{
    newState.email.gmail.appPassword = action.appPassword;
    return newState;
  }

  case 'SET_SMTP_SENDER':{
    newState.email.smtp.sender = action.sender;
    return newState;
  }

  case 'SET_SMTP_HOST':{
    newState.email.smtp.host = action.host;
    return newState;
  }


  case 'SET_SMTP_PORT':{
    newState.email.smtp.port = action.port;
    return newState;
  }


  case 'SET_SMTP_TLS_REJECT_UNAUTHORIZED':{
    newState.email.smtp.tls.rejectUnauthorized = action.enabled;
    return newState;
  }


  default:
    return state;
  }

};


module.exports = {
  config_reducer: config_reducer,
  default_config: default_config
};
