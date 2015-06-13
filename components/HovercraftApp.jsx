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
      errors: []
    }
  },

  contentUpdated: function(text){
    this.setState({ content: text });

  },

  receiveNewErrors: function(errorText){
    var allErrors = this.state.errors;
    allErrors.push(errorText);
    this.setState({ errors: allErrors });
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
        <ErrorConsole errors={errors} />
      </div>
    )
  }

});

module.exports = HovercraftApp;

})();

//  <TextTemplateEditor onChange={this.textTemplateUpdated}/>
