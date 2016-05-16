var React = require('react');

const {compile} = require('../Compiler');
const {parseYAML} = require('../Compiler');

var Previewer = React.createClass({

  propTypes: function(){
    return {
      template: React.PropTypes.object,
      content: React.PropTypes.string,
      addError: React.PropTypes.func,
      clearError: React.PropTypes.func
    };
  },

  getInitialState: function(){
    return {
      previewHeight: window.innerHeight/2,
      output: ''
    };
  },

  handleResize: function(){
    this.setState({
      previewHeight: window.innerHeight/2
    });
    this.forceUpdate();
  },

  componentWillMount: function(){
    this.setState( { output: this.compileOutput(this.props.template, this.props.content, this.props.addError, this.props.clearError) } );
  },

  componentWillReceiveProps: function(nextProps){
    this.setState( { output: this.compileOutput(nextProps.template, nextProps.content, nextProps.addError, this.props.clearError) } );
  },

  componentDidMount: function(){
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function(){
    window.removeEventListener('resize', this.handleReize);
  },

  render: function(){

    var style = { height: this.state.previewHeight, margin: 12 };

    if (this.props.template.type === 'markdown'){
      let frameContent = `<html>
        <head>
          <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
          <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap-theme.min.css">
          <style>html { overflow-x: wrap; overflow-y: scroll; } </style>
        </head>
        <body>
          <pre style="overflow: wrap; word-break: auto;"><code>${this.state.output}</code></pre>
        </body>
      </html>`;
      return (
        <iframe style={style} className="previewer textpreview" scrolling="yes" srcDoc={frameContent}></iframe>
      );
    }

    if (this.props.template.type === 'html'){
      let frameContent = `<html>
        <head>
          <style>html { overflow-x: wrap; overflow-y: scroll; } </style>
        </head>
        <body>
          <div>${this.state.output}</div>
        </body>
      </html>`;
      return (
        <iframe style={style} className="previewer htmlpreview" scrolling="yes" srcDoc={frameContent}></iframe>
      );
    }
  },

  compileOutput: function(template, content, addError, clearError){

    let preview = '';
    let output = {};
    let data = parseYAML(content);

    if (data.error){
      let message = `Line: ${data.error.parsedLine}: ${data.error.message}, \"${data.error.snippet}\"`;
      addError(message, 'YAML', template.name);
    } else {
      clearError('YAML', template.name);
      output = compile(data.data, template.content);
    }

    if (output.error){
      // console.log(output.error);
      addError('output.error', template.type, template.name);
    } else {
      clearError(template.type, template.name);
      preview = output.output;
    }

    return preview;

  }

});

module.exports = Previewer;
