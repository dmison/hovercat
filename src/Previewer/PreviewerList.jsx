const React = require('react');
const Previewer = require('./Previewer.jsx');
const {compile} = require('../Compiler');
const {parseYAML} = require('../Compiler');

const PreviewerList = (props) => {

  return (
    <div className='row'>
      {props.templates.map((template)=>{
        let output = '';
        let data = parseYAML(props.content);

        if (data.error){
          console.log(data.error);
        } else {
          data = compile(data.data, template.content);
        }
        if (data.error){
          console.log(data.error);
        } else {
          output = data.output;
        }


        return (
          <div key={template.id} className='col-md-3'>
            <Previewer  content={output} type={template.type}/>
          </div>
        );

      })}

    </div>
  );
};

module.exports = PreviewerList;
