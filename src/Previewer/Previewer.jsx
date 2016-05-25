var React = require('react');

const {compile} = require('../Compiler');
const {parseYAML} = require('../Compiler');

var Previewer = React.createClass({

  propTypes: function(){
    return {
      template: React.PropTypes.object,
      height: React.PropTypes.number,
      content: React.PropTypes.string,
      addError: React.PropTypes.func,
      clearError: React.PropTypes.func
    };
  },

  getInitialState: function(){
    return {
      output: ''
    };
  },

  componentWillMount: function(){
    this.compilePreview( this.props.template, this.props.content, (err, output)=>{
      if (err) {
        this.props.addError(err.message, err.type, err.template);
      } else {
        this.props.clearError(this.props.template.type, this.props.template.name);
        this.setState( { output: output } );
      }
    });

  },

  componentWillReceiveProps: function(nextProps){
    this.compilePreview( nextProps.template, nextProps.content, (err, output)=>{
      if (err) {
        this.props.addError(err.message, err.type, err.template);
      } else {
        this.props.clearError(nextProps.template.type, nextProps.template.name);
        this.setState( { output: output } );
      }
    });
  },

  render: function(){

    var style = {
      height: this.props.height,
      marginTop: 12,
      marginLeft: 12,
      marginRight: 12
    };
    // console.log(style);
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

  compilePreview: function(template, content, callback){
    parseYAML(content, (err, data)=>{
      if(err){
        let message = `Line: ${err.parsedLine}: ${err.message}, \"${err.snippet}\"`;
        callback({ message: message, type: 'YAML', template: '' }, null);
      } else {

        compile(data, template.content, (err, output)=>{
          if (err) {
            callback({ message: err, type: template.type, template: template.name }, null);
          } else {
            callback(null, output);
          }
        });
      }
    });
  }

});

module.exports = Previewer;
