(function(){
var React = require('react');
var ContentEditor = require('./ContentEditor.jsx');
var TextTemplateEditor = require('./TextTemplateEditor.jsx');
var ErrorConsole = require('./ErrorConsole.jsx');
var TextPreviewer = require('./TextPreviewer.jsx');

var HovercraftApp = React.createClass({

  getInitialState: function(){
    return {
      content: '',
      htmlTemplate: '',
      textTemplate: '',
      htmlOutput: '',
      textOutput: '',
      errorsYAML: '',
      errorsTEXT: '',
      errorsHTML: ''
    }
  },

  contentUpdated: function(text){
    this.setState({ content: text });

  },

  receiveNewErrors: function(type, errorText){

    if (type === 'yaml'){
      this.setState({errorsYAML: errorText});
    }
    if (type === 'text'){
      this.setState({errorsTEXT: errorText});
    }
    if (type === 'html'){
      this.setState({errorsHTML: errorText});
    }
  },

  textTemplateUpdated: function(text){
    this.setState({ textTemplate: text});
  },

  render: function(){
    var textOut = this.state.textOutput;
    var errors = this.state.errors;

    return (
      <div>
        <h2>Hovercraft</h2>
        <ContentEditor content={this.state.content} onChange={this.contentUpdated} />
        <hr />
        <TextTemplateEditor content={this.state.textTemplate} onChange={this.textTemplateUpdated} />
        <hr/>
        <TextPreviewer content={this.state.content} template={this.state.textTemplate} />
        <hr/>
          <ErrorConsole text={this.state.errorsTEXT} yaml={this.state.errorsYAML} html={this.state.errorsHTML} />
      </div>
    )
  }

});

module.exports = HovercraftApp;

})();

//  <TextTemplateEditor onChange={this.textTemplateUpdated}/>
