const YAML = require('yamljs');
// var Styliner = require('styliner');
const Handlebars = require('handlebars');
const HandleBarsHelpers = require('./HandleBarsHelpers.js');
const getURLs = require('get-urls');

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

const extractURLs = (text) => {
  let listURLsFromText = getURLs(text);
  if(listURLsFromText === null){
    listURLsFromText = [];
  }
  return listURLsFromText;
};

const matchURLs = (list, urls) => {

  return list.map((item)=>{
    const matchingURL = urls.find((url)=>{
      return url.long === item;
    });
    return (typeof matchingURL === 'undefined') ? {long:item,short:''} : matchingURL;
  });
};



  // .map(function(url){
  //   return {
  //     long: url,
  //     short: ''
  //   };
  // })

  //   // copy objects from state if found there
  //   newURLs = newURLs.map((thisURL)=>{
  //     var result = thisURL;
  //     // yep this is a shit bit
  //     this.state.urls.forEach((url)=>{
  //       if(url.url === thisURL.url){
  //         result = url;
  //       }
  //     });
  //     return result;
  //   });
  //
  //   this.setState( {urls: newURLs} );
  //   this.updateOutput('all');
  // },


// };

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
  extractURLs: extractURLs,
  matchURLs: matchURLs,
//   processCSS: processCSS,
  compile: compile
};
