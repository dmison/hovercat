const React = require('react');
const Editor = require('./Editor.jsx');

const EditorList = (props) => {

  return (
    <div className='row'>
      <div className='col-md-3'>
        <h2>Content</h2>
        <Editor content={props.content}
                mode='yaml'
                theme='tomorrow'
                onChange={(content)=>{
                  props.updateContent(content);
                } } />

      </div>

      { props.templates.map((template)=>{

        return (
          <div key={template.id} className='col-md-3'>
            <h2>{template.name} <small>{template.type} - {template.id}</small></h2>

            <Editor content={template.content}
                    mode={template.type}
                    theme='tomorrow'
                    onChange={(content)=>{
                      props.updateTemplate(template.id, template.name, template.type, content);
                    } } />

          </div>
        );
      }) }

    </div>
  );
};

module.exports = EditorList;
