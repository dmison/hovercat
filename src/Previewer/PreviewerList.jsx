const React = require('react');
const {Tab, Tabs, TabList, TabPanel} = require('react-tabs');
const Previewer = require('./Previewer.jsx');
const {compile} = require('../Compiler');
const {parseYAML} = require('../Compiler');

const PreviewerList = (props) => {

  return props.templates.length > 0 ?  (
      <Tabs>
        <TabList>
          {props.templates.map((template, index)=>{
            return <Tab key={index}>{template.name} - {template.type}</Tab>;
          })}
        </TabList>

        {props.templates.map((template, index)=>{
          let output = '';
          let data = parseYAML(props.content);

          if (data.error){
            // console.log(data.error);
          } else {
            data = compile(data.data, template.content);
          }
          if (data.error){
            // console.log(data.error);
          } else {
            output = data.output;
          }

          return <TabPanel key={index}>
            <Previewer  content={output} type={template.type}/>
          </TabPanel>;
        })}


      </Tabs>
    ) : (
      <div>
        <h3>No templates</h3>
        <p>Maybe you should add one.</p>
      </div>
    );
 
};

module.exports = PreviewerList;


//
//   return (
//     <div key={template.id} className='col-md-3'>
//       <Previewer  content={output} type={template.type}/>
//     </div>
//   );
//
// })}
//
// </div>
