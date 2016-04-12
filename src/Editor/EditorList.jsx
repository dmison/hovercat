const React = require('react');
const {Tab, Tabs, TabList, TabPanel} = require('react-tabs');
const Editor = require('./Editor.jsx');
const AddTemplate = require('../Template/AddTemplate.jsx');


const EditorList = (props) => {

  const EditorTabPanels = [
    <TabPanel key={0}>
      <h2>Content</h2>
      <Editor content={props.content}
              mode='yaml'
              theme='tomorrow'
              onChange={(content)=>{
                props.updateContent(content);
              } } />
    </TabPanel>
  ].concat( props.templates.map((template, index) => {
    return (
      <TabPanel key={index+1}>
        <h3>{template.name} <small>{template.type}</small></h3>
        <button className='btn btn-danger' onClick={ ()=>{ props.deleteTemplate(template.id); } }>x</button>
        <Editor content={template.content}
                mode={template.type}
                theme='tomorrow'
                onChange={(content)=>{
                  props.updateTemplate(template.id, template.name, template.type, content);
                } } />
            </TabPanel>
    );
  }));

  const EditorTabs = [<Tab key={0}>Content</Tab>].concat(props.templates.map((template, index) => {
    return <Tab key={index+1}>{template.name} - {template.type}</Tab>;
  }));

  return (
    <div >
        <AddTemplate  onAdd={(name, type)=>{ props.addTemplate(name, type, ''); }} />
        <Tabs>
          <TabList>{EditorTabs}</TabList>
          {EditorTabPanels}
        </Tabs>
    </div>
  );

};

module.exports = EditorList;
