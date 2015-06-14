(function(){
var React = require('react');

var Editor = require('./Editor.jsx');
var ErrorConsole = require('./ErrorConsole.jsx');
var TextPreviewer = require('./Previewer.jsx');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

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
    this.setState({ textTemplate: text });
  },
  htmlTemplateUpdated: function(text){
    this.setState({ htmlTemplate: text});
  },

  render: function(){
    var textOut = this.state.textOutput;
    var errors = this.state.errors;

    return (
      <div>
        <h2>Hovercraft</h2>

          <TabbedArea defaultActiveKey={1}>
            <TabPane eventKey={1} tab='Content'>
              <Editor mode='yaml' theme='tomorrow' content={this.state.content} onChange={this.contentUpdated} />
            </TabPane>
            <TabPane eventKey={2} tab='Text Template'>
              <Editor mode='markdown' theme='tomorrow' content={this.state.textTemplate} onChange={this.textTemplateUpdated} />
            </TabPane>
            <TabPane eventKey={3} tab='HTML Template'>
              <Editor mode='html' theme='tomorrow' content={this.state.htmlTemplate} onChange={this.htmlTemplateUpdated} />
            </TabPane>
          </TabbedArea>

          <ErrorConsole text={this.state.errorsTEXT} yaml={this.state.errorsYAML} html={this.state.errorsHTML} />

          <TabbedArea defaultActiveKey={1}>
            <TabPane eventKey={1} tab='Text Preview'>
              <TextPreviewer content={this.state.content} type='text' template={this.state.textTemplate} returnError={this.receiveNewErrors}/>
            </TabPane>
            <TabPane eventKey={2} tab='HTML Preview'>
              <TextPreviewer content={this.state.content} type='html' template={this.state.htmlTemplate} returnError={this.receiveNewErrors}/>
            </TabPane>
          </TabbedArea>


      </div>
    )
  }

});

module.exports = HovercraftApp;

})();

//  <Editor onChange={this.textTemplateUpdated}/>
