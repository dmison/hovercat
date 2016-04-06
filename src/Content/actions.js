const addContent = (content) => {
  return {
    type: 'ADD_CONTENT',
    content: content
  };
};

module.exports = {
  addContent: addContent
};
