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

const setSaving = (saving) => {
  return {
    type: 'SET_SAVING',
    saving: saving
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

const setActive = (active) => {
  return {
    type: 'SET_ACTIVE',
    active: active
  };
};

module.exports = {
  setFilename: setFilename,
  setSaved: setSaved,
  setSaving: setSaving,
  setEditorWrap: setEditorWrap,
  setResourcesPath: setResourcesPath,
  setActive: setActive
};
