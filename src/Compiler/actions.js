const {compile, extractURLs, matchURLs, parseYAML, replaceURLs} = require('./index.js');
const {addError, clearError} = require('../Errors/actions.js');
const {setURLs} = require('../Bitly/actions.js');

const updateOutput = (output, template) => {
  return {
    type: 'UPDATE_RESULTS',
    template: template,
    output: output
  };
};

const clearAnOutput = (id) => {
  return {
    type: 'CLEAR_AN_OUTPUT',
    templateID: id
  };
};

const clearAllOutputs = () => {
  return {
    type: 'CLEAR_ALL_OUTPUTS'
  };
};

const buildAll = () => {

  return (dispatch, getStore) => {
    const yaml = getStore().content;
    const urls = getStore().urls;
    const templates = getStore().templates;

    const newUrls = matchURLs(extractURLs(yaml), urls);
    dispatch(setURLs(newUrls));
    const URLProcessedYAML = replaceURLs(yaml, newUrls);

    parseYAML(URLProcessedYAML, (err, data)=>{
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
              dispatch(updateOutput(output, template));
            }
          });
        });
      }
    });
  };

};


module.exports = {
  buildAll: buildAll,
  updateOutput: updateOutput,
  clearAnOutput: clearAnOutput,
  clearAllOutputs: clearAllOutputs
};
