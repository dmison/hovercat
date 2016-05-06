const setFilename = (filename) => {
  return {
    type: 'SET_FILENAME',
    filename: filename
  };
};

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
  setFilename: setFilename,
  setSaved: setSaved,
  setEditorWrap: setEditorWrap
};
