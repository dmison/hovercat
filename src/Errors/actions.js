const addError = (error, sourceType, templateName) => {
  return {
    type: 'ADD_ERROR',
    error: error,
    sourceType: sourceType,
    templateName: templateName
  };
};

module.exports = {
  addError: addError
};
