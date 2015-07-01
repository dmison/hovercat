(function(){
  var React = require('react');

  var AceEditor  = require('react-ace');
  var brace  = require('brace');

  require('brace/mode/markdown');
  require('brace/mode/yaml');
  require('brace/mode/html');

  require('brace/theme/tomorrow');

  var Editor = React.createClass({

    getInitialState: function(){
      return {
        editorHeight: window.innerHeight-170
      }
    },

    handleResize: function(e){
      this.setState({
        editorHeight: window.innerHeight-170
      });
      this.forceUpdate();
    },

    componentDidMount: function(){
      window.addEventListener('resize', this.handleResize);
    },

    componentDidUnmount: function(){
      window.removeEventListener('resize', this.handleReize);
    },

    shouldComponentUpdate: function(nextProps) {
      return (nextProps.content !== this.props.content);
    },

    onChange: function (content) {
      this.props.onChange(content);
    },

    render: function() {
      var name = this.props.mode+'Editor';
      var height = this.state.editorHeight+'px';
      return (
        <AceEditor
            mode={this.props.mode}
            theme={this.props.theme}
            name={name}
            height={height}
            width='90%'
            onChange={this.onChange}
            value={this.props.content}
          />
      )
    }

  });

  module.exports = Editor;

})()
