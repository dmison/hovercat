var Handlebars = require('handlebars');
var entities = require('entities');
var markdown = require('node-markdown').Markdown;

// ================ setup some handlebars helpers
let markdown_helper = function(context) {
  return new Handlebars.SafeString(markdown(context));
};
markdown_helper.helper_name = 'markdown';


let line_helper = function(string, replacement) {
  return new Handlebars.SafeString(string.replace(/./g, replacement));
};
line_helper.helper_name = 'line';


let unentity_helper = function(content) {
  return new Handlebars.SafeString(entities.decodeHTML(content));
};
unentity_helper.helper_name = 'unentity';


let spanner_helper = function(content) {
  var words = content.split(' ');
  words = words.map(function(word) {
    return '<span>' + word[0] + '</span>' + word.substring(1);
  });
  return words.join(' ');
};
spanner_helper.helper_name = 'spanner';


let if_even_helper = function(conditional, options) {
  //if(conditional === 0) return options.inverse(this);
  conditional += 1;
  if ((conditional % 2) == 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
if_even_helper.helper_name = 'if_even';


let firsthalf_helper = function(context, options) {
  var ret = '';
  for (var i = 0, j = Math.ceil(context.length / 2); i < j; i++) {
    ret = ret + options.fn(context[i]);
  }
  return ret;
};
firsthalf_helper.helper_name = 'firsthalf';


let secondhalf_helper = function(context, options) {
  var ret = '';
  for (var i = Math.ceil(context.length / 2), j = context.length; i < j; i++) {
    ret = ret + options.fn(context[i]);
  }
  return ret;
};
secondhalf_helper.helper_name = 'secondhalf';

module.exports = {
  markdown_helper: markdown_helper,
  line_helper: line_helper,
  unentity_helper: unentity_helper,
  spanner_helper: spanner_helper,
  if_even_helper: if_even_helper,
  firsthalf_helper: firsthalf_helper,
  secondhalf_helper: secondhalf_helper
};
