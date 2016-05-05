var React = require('react');

// bundling a build of react-ace from https://github.com/dmison/react-ace
// until wrap mode updating is supported in the NPM react-ace
// see PR: https://github.com/securingsincity/react-ace/pull/80
var AceEditor  = require('./react-ace.min.js'); //('react-ace');

require('brace/mode/markdown');
require('brace/mode/yaml');
require('brace/mode/html');

require('brace/theme/tomorrow');

var Editor = React.createClass({

  getInitialState: function(){
    return {
      editorHeight: window.innerHeight/2
    };
  },

  propTypes: function(){
    return {
      content: React.PropTypes.string,
      onChange: React.PropTypes.func,
      mode: React.PropTypes.string,
      theme: React.PropTypes.string,
      wrapEnabled: React.PropTypes.bool
    };
  },

  handleResize: function(){
    // this.setState({
    //   editorHeight: window.innerHeight/2
    // });
    // this.forceUpdate();
  },

  componentDidMount: function(){
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function(){
    window.removeEventListener('resize', this.handleReize);
  },

  shouldComponentUpdate: function(nextProps) {
    return ( (nextProps.content !== this.props.content) ||
      (nextProps.wrapEnabled !== this.props.wrapEnabled) );
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
          wrapEnabled={this.props.wrapEnabled}
          showPrintMargin={false}
        />
    );
  }

});

module.exports = Editor;