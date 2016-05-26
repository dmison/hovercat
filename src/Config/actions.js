const setEditorWrap = (enabled) => {
  return {
    type: 'SET_WRAP',
    enabled: enabled
  };
};

module.exports = {
  setEditorWrap: setEditorWrap
};
