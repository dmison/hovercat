const React = require('react');

const EditorListContainer = require('../Editor/EditorListContainer.js');
const PreviewerListContainer = require('../Previewer/PreviewerListContainer.js');

const WorkSpace = () => {
  return (
    <div>
      <div className='row hovercat'>
        <div className='col col-left'>
          <EditorListContainer />
        </div>
        <div className='col col-right'>
          <PreviewerListContainer />
        </div>
      </div>
    </div>

  );
};

module.exports = WorkSpace;
