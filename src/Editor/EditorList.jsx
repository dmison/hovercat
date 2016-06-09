const React = require('react');
const {Tab, Tabs, TabList, TabPanel} = require('react-tabs');
const Editor = require('./Editor.jsx');

const EditorList = (props) => {

  const EditorTabPanels = [
    <TabPanel key={0}>
      <Editor content={props.content}
              mode='yaml'
              theme='tomorrow'
              height={props.height-props.consoleHeight}
              wrapEnabled={props.editorWrap}
              enableBasicAutoCompletion={props.enableBasicAutoCompletion}
              enableLiveAutoCompletion={props.enableLiveAutoCompletion}
              onChange={(content)=>{
                props.setSaved(false);
                props.updateContent(content);
                props.buildAll();
              } } />
    </TabPanel>
  ].concat( props.templates.map((template, index) => {
    return (
      <TabPanel key={index+1}>
        <Editor content={template.content}
                mode={template.type}
                theme='tomorrow'
                height={props.height-props.consoleHeight}
                wrapEnabled={props.editorWrap}
                enableBasicAutoCompletion={props.enableBasicAutoCompletion}
                enableLiveAutoCompletion={props.enableLiveAutoCompletion}
                onChange={(content)=>{
                  props.setSaved(false);
                  props.updateTemplate(template.id, template.name, template.type, content);
                  props.buildAll();
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
  height: React.PropTypes.number,
  editorWrap: React.PropTypes.bool,
  enableBasicAutoCompletion: React.PropTypes.bool,
  enableLiveAutoCompletion: React.PropTypes.bool,
  consoleHeight: React.PropTypes.number,
  templates: React.PropTypes.array,
  updateTemplate: React.PropTypes.func,
  updateContent: React.PropTypes.func,
  compileData: React.PropTypes.func,
  compileOutput: React.PropTypes.func,
  setSaved: React.PropTypes.func,
  buildAll: React.PropTypes.func
};

module.exports = EditorList;
