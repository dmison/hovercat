const setEditorWrap = (enabled) => {
  return {
    type: 'SET_WRAP',
    enabled: enabled
  };
};

const importConfig = (config) => {
  return {
    type: 'IMPORT_CONFIG',
    config: config
  };
};

const setBitlyToken = (token) => {
  return {
    type: 'SET_BITLY_TOKEN',
    token: token
  };
};


module.exports = {
  setEditorWrap: setEditorWrap,
  importConfig: importConfig,
  setBitlyToken: setBitlyToken
};
