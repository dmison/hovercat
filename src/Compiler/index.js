const YAML = require('yamljs');
const Styliner = require('styliner');
const Handlebars = require('handlebars');
const HandleBarsHelpers = require('./HandleBarsHelpers.js');
const getURLs = require('get-urls');
const escapeStringRegExp = require('escape-string-regexp');

for (var key in HandleBarsHelpers) {
  const helper = HandleBarsHelpers[key];
  Handlebars.registerHelper(helper.helper_name, helper);
}

// ========================================================================
// parseYAML:(content: string, callback:function(error:{},result:{}))
//
// ========================================================================
const parseYAML = (content, callback) => {
  if (content) {
    try {
      callback(null, YAML.parse(content));
    } catch (e){
      callback(e, null);
    }
  } else callback(null, {});
};

// ========================================================================
// extractURLs: (text:string)
//
// ========================================================================
const extractURLs = (text) => {
  let listURLsFromText = getURLs(text);
  if(listURLsFromText === null){
    listURLsFromText = [];
  }
  return listURLsFromText;
};

// ========================================================================
// matchURLs: (list:[string], urls:[{long:string,short:string}])
//
// ========================================================================
const matchURLs = (list, urls) => {
  return list.map((item)=>{
    const matchingURL = urls.find((url)=>{
      return url.long === item;
    });
    return (typeof matchingURL === 'undefined') ? {long:item,short:''} : matchingURL;
  });
};

// ========================================================================
// compile:(conent:{}, template:string, callback:function(error:{}, result:string))
//
// ========================================================================
const compile = (content, template, callback) => {
  try {
    const builder = Handlebars.compile(template);
    const output = builder(content);
    callback(null, output);
  } catch (e){
    callback(`${e}`, null);
  }
};

// ========================================================================
// replaceURLs:(yaml:string, urls:[{long:string, short:string}])
// replace long urls with short versions in yaml string
// ========================================================================
const replaceURLs = (yaml, urls) => {
  let result = yaml;

  urls.filter((url)=>{
    return url.short !== '';
  }).forEach((url)=>{
    let urlRegex = new RegExp(escapeStringRegExp(url.long),'g');
    result = result.replace(urlRegex, url.short);
  });
  return result;
};

// ========================================================================
// inlineCSS: (html:string, callback:function(error:{}, result:string))
// inline CSS contained in HTML into style attributes on elements
// ========================================================================
const inlineCSS = function(html, callback){
  const liner = new Styliner('', {
    noCSS: false
  });
  liner.processHTML(html)
    .then(function(result) {
      callback(null, result);
    });
};

// ========================================================================
module.exports = {
  parseYAML: parseYAML,
  extractURLs: extractURLs,
  matchURLs: matchURLs,
  replaceURLs: replaceURLs,
  inlineCSS: inlineCSS,
  compile: compile
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
