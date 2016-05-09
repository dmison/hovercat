const YAML = require('yamljs');
// var Styliner = require('styliner');
const Handlebars = require('handlebars');
const HandleBarsHelpers = require('./HandleBarsHelpers.js');

for(var key in HandleBarsHelpers) {
  const helper = HandleBarsHelpers[key];
  Handlebars.registerHelper(helper.helper_name, helper);
}

var parseYAML = function(content){
  var data = {};
  var yamlError = '';
  try {
    data = YAML.parse(content);
    yamlError = '';
  } catch(e){
    yamlError = e;
  }
  return { data: data, error: yamlError };
};

var compile = function(content, template){
  var output = '';
  var error = '';
  try {
    var builder = Handlebars.compile(template);
    output = builder(content);
    error = '';
  } catch(e){
    error = e;
  }
  return { output:output, error: error };
};
//
// var processCSS = function(input, callback){
//   var styliner = new Styliner('', {
//     noCSS: false
//   });
//   styliner.processHTML(input)
//     .then(function(html) {
//       callback(html);
//     });
// };
//
module.exports = {
  parseYAML: parseYAML,
//   processCSS: processCSS,
  compile: compile
};
