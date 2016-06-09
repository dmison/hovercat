const {compile} = require('./index.js');
const {parseYAML} = require('./index.js');

const {addError} = require('../Errors/actions.js');
const {clearError} = require('../Errors/actions.js');

const updateOutput = (output, templateType, templateName) => {
  return {
    type: 'UPDATE_RESULTS',
    templateType: templateType,
    templateName: templateName,
    output: output
  };
};

const buildAll = () => {

  return (dispatch, getStore) => {
    const yaml = getStore().content;
    const templates = getStore().templates;

    parseYAML(yaml, (err, data)=>{
      if(err){
        let message = `Line: ${err.parsedLine}: ${err.message}, \"${err.snippet}\"`;
        dispatch(addError(message, 'YAML'));
      } else {
        dispatch(clearError('YAML'));
        templates.forEach((template)=>{
          compile(data, template.content, (err, output)=>{
            if (err){
              dispatch(addError(err, template.type, template.name));
            } else {
              dispatch(clearError(template.type, template.name));
              dispatch(updateOutput(output, template.type, template.name));
            }
          });

        });
      }
    });
  };

};


module.exports = {
  buildAll: buildAll,
  updateOutput: updateOutput
};
