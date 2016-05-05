
const setSaved = (saved) => {
  return {
    type: 'SET_SAVED',
    saved: saved
  };
};

const setEditorWrap = (enabled) => {
  return {
    type: 'SET_WRAP',
    enabled: enabled
  };
};

module.exports = {
  setSaved: setSaved,
  setEditorWrap: setEditorWrap
};
