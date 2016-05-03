const React = require('react');
const {Tab, Tabs, TabList, TabPanel} = require('react-tabs');
const Editor = require('./Editor.jsx');

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
        <Tabs>
          <TabList>{EditorTabs}</TabList>
          {EditorTabPanels}
        </Tabs>
    </div>
  );

};

EditorList.propTypes = {
  content: React.PropTypes.string,
  templates: React.PropTypes.array,
  updateTemplate: React.PropTypes.func,
  updateContent: React.PropTypes.func
};

module.exports = EditorList;
