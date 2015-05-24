(function(){
  var React = require('react');

  var AceEditor  = require('react-ace');
  var brace  = require('brace');

  require('brace/mode/markdown');
  require('brace/theme/github');

  var TextTemplateEditor = React.createClass({

    render: function() {

      return (
        <AceEditor
            mode="markdown"
            theme="github"
            name="MarkdownEditor"
            height="200px"
            width="450px"
          />
      )
    }

  });

  module.exports = TextTemplateEditor;

})()
