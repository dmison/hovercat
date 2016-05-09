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

const setResourcesPath = (path) => {
  return {
    type: 'SET_RESOURCES_PATH',
    path: path
  };
};

module.exports = {
  setFilename: setFilename,
  setSaved: setSaved,
  setEditorWrap: setEditorWrap,
  setResourcesPath: setResourcesPath
};
