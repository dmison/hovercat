(function(){
var React = require('react');
var ContentEditor = require('./ContentEditor.jsx');
var TextTemplateEditor = require('./TextTemplateEditor.jsx');

var HovercraftApp = React.createClass({

  getInitialState: function(){
    return {
      content: '',
      htmlTemplate: '',
      textTemplate: '',
      htmlOutput: '',
      textOutput: ''
    }
  },

  contentUpdated: function(text){
    console.log(text);
    this.setState({ textOutput: text });
    this.setState({ content: text });
  },

  textTemplateUpdated: function(template){
    console.log('textTemplateUpdated');
  },

  render: function(){
    var textOut = this.state.textOutput;

    return (
      <div>
        <h2>Hovercraft</h2>
        <ContentEditor content={this.state.content} onChange={this.contentUpdated} />
        <hr/>
        <code><pre>{textOut}</pre></code>
      </div>
    )
  }

});

module.exports = HovercraftApp;

})();

//  <TextTemplateEditor onChange={this.textTemplateUpdated}/>
