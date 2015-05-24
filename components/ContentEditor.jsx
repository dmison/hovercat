(function(){
  var React = require('react');

  var AceEditor  = require('react-ace');
  var brace  = require('brace');

  require('brace/mode/yaml');
  require('brace/theme/github');

  var ContentEditor = React.createClass({

    shouldComponentUpdate: function(nextProps) {
      return (nextProps.newContent == true);
    },

    onChange: function (content) {
      this.props.onChange(content);
    },

    render: function() {

      return (
        <AceEditor
            mode="yaml"
            theme="github"
            name="ContentEditor"
            height="200px"
            width="450px"
            onChange={this.onChange}
            value={this.props.content}
          />
      )
    }

  });

  module.exports = ContentEditor;

})()
