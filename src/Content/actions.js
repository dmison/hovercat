
const updateContent = (content) => {
  return {
    type: 'UPDATE_CONTENT',
    content: content
  };
};

module.exports = {
  updateContent: updateContent
};
