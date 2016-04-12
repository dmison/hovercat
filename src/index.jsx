const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');

const MainMenuContainer = require('./MainMenu/MainMenuContainer.js');
const EditorListContainer = require('./Editor/EditorListContainer.js');
const PreviewerListContainer = require('./Previewer/PreviewerListContainer.js');

const store = require('./Store');

ReactDOM.render(<Provider store={store}>
  <div>
    <MainMenuContainer />
    <div className='row hovercat'>
      <div className='col col-left'>
        <EditorListContainer />
      </div>
      <div className='col col-right'>
        <PreviewerListContainer />
      </div>
    </div>
  </div>
</Provider>, document.getElementById('app'));


// <PreviewListContainer />
