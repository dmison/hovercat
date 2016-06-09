const React = require('react');
const {Tab, Tabs, TabList, TabPanel} = require('react-tabs');
const Previewer = require('./Previewer.jsx');

const PreviewerList = (props) => {

  return props.outputs.length > 0 ?  (
    <Tabs>
      <TabList>
        {props.outputs.map((template, index)=>{
          return <Tab key={index}>{template.name} - {template.type}</Tab>;
        })}
      </TabList>

      {props.outputs.map((output, index)=>{
        return <TabPanel key={index}>
          <Previewer content={output.output} height={props.height - props.consoleHeight} templateName={output.name} templateType={output.type} />
        </TabPanel>;
      })}
    </Tabs>
  ) : (
    <div>
      <h3>No templates</h3>
      <p>Maybe you should add one. </p>
    </div>
  );
};

PreviewerList.propTypes = {
  height: React.PropTypes.number,
  consoleHeight: React.PropTypes.number,
  outputs: React.PropTypes.array
};


module.exports = PreviewerList;
