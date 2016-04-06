const content_reducer = (content = '', action) => {

  switch(action.type){
  case 'ADD_CONTENT':
    return action.content;
  default:
    return content;
  }

};

module.exports = {
  content_reducer: content_reducer
};
