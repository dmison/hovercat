const React = require('react');

const EditorListContainer = require('../Editor/EditorListContainer.js');
const PreviewerListContainer = require('../Previewer/PreviewerListContainer.js');
const ErrorConsoleContainer = require('../Errors/ErrorConsoleContainer.js');

const WorkSpace = () => {
  return (
    <div>
      <div className='row hovercat-workspace'>
        <div className='col col-left'>
          <EditorListContainer />
        </div>
        <div className='col col-right'>
          <PreviewerListContainer />
        </div>
        <ErrorConsoleContainer />
      </div>
    </div>

  );
};

module.exports = WorkSpace;
