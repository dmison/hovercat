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
module.exports = {
  setEditorWrap: setEditorWrap,
  importConfig: importConfig
};
