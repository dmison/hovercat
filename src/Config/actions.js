const importConfig = (config) => {
  return {
    type: 'IMPORT_CONFIG',
    config: config
  };
};

const setEditorWrap = (enabled) => {
  return {
    type: 'SET_WRAP',
    enabled: enabled
  };
};

const setBitlyToken = (token) => {
  return {
    type: 'SET_BITLY_TOKEN',
    token: token
  };
};

const setGmailUsername = (username) => {
  return {
    type: 'SET_GMAIL_USERNAME',
    username: username
  };
};

const setGmailPassword = (appPassword) => {
  return {
    type: 'SET_GMAIL_APP_PASSWORD',
    appPassword: appPassword
  };
};

const setSMTPSender = (sender) => {
  return {
    type: 'SET_SMTP_SENDER',
    sender: sender
  };
};

const setSMTPHost = (host) => {
  return {
    type: 'SET_SMTP_HOST',
    host: host
  };
};

const setSMTPPort = (port) => {
  return {
    type: 'SET_SMTP_PORT',
    port: port
  };
};

const setSMTPTLSRejectUnauthorized = (enabled) => {
  return {
    type: 'SET_SMTP_TLS_REJECT_UNAUTHORIZED',
    enabled: enabled
  };
};

module.exports = {
  importConfig: importConfig,
  setEditorWrap: setEditorWrap,
  setBitlyToken: setBitlyToken,
  setGmailUsername: setGmailUsername,
  setGmailPassword: setGmailPassword,
  setSMTPSender: setSMTPSender,
  setSMTPHost: setSMTPHost,
  setSMTPPort: setSMTPPort,
  setSMTPTLSRejectUnauthorized: setSMTPTLSRejectUnauthorized
};
