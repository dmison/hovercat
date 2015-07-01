(function(){

  var entities = require('entities');
  var markdown = require('node-markdown').Markdown;
  var YAML = require('yamljs');

  // ================ setup some handlebars helpers
  Handlebars.registerHelper('markdown', function(context) {
    return new Handlebars.SafeString(markdown(context));
  });

  Handlebars.registerHelper('line', function(string, replacement) {
    return new Handlebars.SafeString(string.replace(/./g, replacement));
  });

  Handlebars.registerHelper('unentity', function(content) {
    return new Handlebars.SafeString(entities.decodeHTML(content));
  });

  Handlebars.registerHelper('spanner', function(content) {
    var words = content.split(' ');
    words = words.map(function(word) {
      return "<span>" + word[0] + "</span>" + word.substring(1);
    })
    return words.join(' ');
  });

  Handlebars.registerHelper('if_even', function(conditional, options) {
    //if(conditional === 0) return options.inverse(this);
    conditional += 1;
    if ((conditional % 2) == 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('firsthalf', function(context, options) {
    var ret = "";
    for (var i = 0, j = Math.ceil(context.length / 2); i < j; i++) {
      ret = ret + options.fn(context[i]);
    }
    return ret;
  });

  Handlebars.registerHelper('secondhalf', function(context, options) {
    var ret = "";
    for (var i = Math.ceil(context.length / 2), j = context.length; i < j; i++) {
      ret = ret + options.fn(context[i]);
    }
    return ret;
  });

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
  }

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
  }

  var processCSS = function(input, callback){
    var styliner = new Styliner('', {
      noCSS: false
    });
    styliner.processHTML(input)
      .then(function(html) {
          callback(html)
      });
  }

  module.exports = {
    parseYAML: parseYAML,
    processCSS: processCSS,
    compile: compile
  }

})();
