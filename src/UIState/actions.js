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

const setHeight = (height) => {
  return {
    type: 'SET_HEIGHT',
    height: height
  };
};

const setConsoleHeight = (height) => {
  return {
    type: 'SET_CONSOLE_HEIGHT',
    height: height
  };
};

const setHomeDir = (dir) => {
  return {
    type: 'SET_HOME_DIR',
    dir: dir
  };
};


module.exports = {
  setFilename: setFilename,
  setSaved: setSaved,
  setSaving: setSaving,
  setActive: setActive,
  setHeight: setHeight,
  setConsoleHeight: setConsoleHeight,
  setResourcesPath: setResourcesPath,
  setHomeDir: setHomeDir
};
