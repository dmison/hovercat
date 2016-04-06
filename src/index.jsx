const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const store = require('./Store');

ReactDOM.render(<Provider store={store}>
  <EditorListContainer />
</Provider>, document.getElementById('app'));


// <PreviewListContainer />
