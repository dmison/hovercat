const React = require('react');
const {Tab, Tabs, TabList, TabPanel} = require('react-tabs');
const Previewer = require('./Previewer.jsx');

const PreviewerList = (props) => {

  const mergedoutputs = props.templates.map((template)=>{
    return Object.assign({}, template, (typeof props.outputs === 'undefined'? [] : props.outputs).find((output)=>{
      return template.id === output.id;
    }));
  }).sort((a,b)=>{
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
  });

  return mergedoutputs.length > 0 ?  (
    <Tabs>
      <TabList>
        {mergedoutputs.map((template, index)=>{
          return <Tab key={index}>{template.name} - {template.type}</Tab>;
        })}
      </TabList>

      {mergedoutputs.map((output, index)=>{
        return <TabPanel key={index}>
          <Previewer key={index} content={output.output} height={props.height - props.consoleHeight} templateName={output.name} templateType={output.type} />
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
  outputs: React.PropTypes.array,
  templates: React.PropTypes.array
};

module.exports = PreviewerList;
