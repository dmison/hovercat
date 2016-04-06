const EditorList = (props) => {
  return (
    <div>
      <div>
        <h2>Content</h2>
        <Editor content={props.content} onChange={props.updateContent} />
      </div>

      { props.templates.map((template)=>{
        return (
          <div>
            <h2>{template.name}</h2>
            <Editor content={template.content}
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
