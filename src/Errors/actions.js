const addError = (message, sourceType, templateName) => {
  return {
    type: 'ADD_ERROR',
    message: message,
    sourceType: sourceType,
    templateName: typeof templateName === 'undefined'? '':templateName
  };
};

const clearError = (sourceType, templateName) => {
  return {
    type: 'CLEAR_ERROR',
    sourceType: sourceType,
    templateName: typeof templateName === 'undefined'? '':templateName
  };
};

module.exports = {
  addError: addError,
  clearError: clearError
};
