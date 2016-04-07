const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');

const EditorListContainer = require('./Editor/EditorListContainer.js');
const PreviewerListContainer = require('./Previewer/PreviewerListContainer.js');

const store = require('./Store');

const {addTemplate} = require('./Template/actions.js');
store.dispatch(addTemplate('TXT email thing', 'markdown', '{{title}} some template text'));
store.dispatch(addTemplate('HTML email thing', 'html', 'some <h2>template</h2> text'));

ReactDOM.render(<Provider store={store}>
  <div>
    <EditorListContainer />
    <PreviewerListContainer />
  </div>
</Provider>, document.getElementById('app'));


// <PreviewListContainer />
