const YAML = require('yamljs');
// var Styliner = require('styliner');
const Handlebars = require('handlebars');
const HandleBarsHelpers = require('./HandleBarsHelpers.js');

for (var key in HandleBarsHelpers) {
  const helper = HandleBarsHelpers[key];
  Handlebars.registerHelper(helper.helper_name, helper);
}

const parseYAML = (content, callback) => {
  if (content) {
    try {
      callback(null, YAML.parse(content));
    } catch (e){
      callback(e, null);
    }
  } else callback(null, {});
};

const compile = (content, template, callback) => {
  try {
    const builder = Handlebars.compile(template);
    const output = builder(content);
    callback(null, output);
  } catch (e){
    callback(`${e}`, null);
  }
};

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
