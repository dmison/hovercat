(function(){
  var React = require('react');

  var AceEditor  = require('react-ace');
  var brace  = require('brace');

  require('brace/mode/markdown');
  require('brace/theme/tomorrow');

  var Editor = React.createClass({

    shouldComponentUpdate: function(nextProps) {
      return (nextProps.newContent == true);
    },

    onChange: function (content) {
      this.props.onChange(content);
    },

    render: function() {
      var name = this.props.mode+'Editor';

      return (
        <AceEditor
            mode={this.props.mode}
            theme={this.props.theme}
            name={name}
            height='200px'
            width='450px'
            onChange={this.onChange}
            value={this.props.content}
          />
      )
    }

  });

  module.exports = Editor;

})()
