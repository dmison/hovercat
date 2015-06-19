(function () {
  var React = require('react');

  var Editor = require('./Editor.jsx');
  var ErrorConsole = require('./ErrorConsole.jsx');
  var TextPreviewer = require('./Previewer.jsx');
  var TabbedArea = require('react-bootstrap/lib/TabbedArea');
  var TabPane = require('react-bootstrap/lib/TabPane');
  var MainMenu = require('./MainMenu.jsx');

  var HovercraftApp = React.createClass({

    getInitialState: function () {
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

    contentUpdated: function (text) {
      this.setState({
        content: text
      });

    },

    receiveNewErrors: function (type, errorText) {

      if (type === 'yaml') {
        this.setState({
          errorsYAML: errorText
        });
      }
      if (type === 'text') {
        this.setState({
          errorsTEXT: errorText
        });
      }
      if (type === 'html') {
        this.setState({
          errorsHTML: errorText
        });
      }
    },

    textTemplateUpdated: function (text) {
      this.setState({
        textTemplate: text
      });
    },
    htmlTemplateUpdated: function (text) {
      this.setState({
        htmlTemplate: text
      });
    },

    render: function () {
      var textOut = this.state.textOutput;
      var errors = this.state.errors;

      return (
        <div>
          <MainMenu />
          <div className="row">
            <div className="col-sm-6">
              <TabbedArea defaultActiveKey={1}>
                <TabPane eventKey={1} tab='Content'>
                  <Editor content={this.state.content} mode='yaml' onChange={this.contentUpdated} theme='tomorrow'/>
                </TabPane>
                <TabPane eventKey={2} tab='Text Template'>
                  <Editor content={this.state.textTemplate} mode='markdown' onChange={this.textTemplateUpdated} theme='tomorrow'/>
                </TabPane>
                <TabPane eventKey={3} tab='HTML Template'>
                  <Editor content={this.state.htmlTemplate} mode='html' onChange={this.htmlTemplateUpdated} theme='tomorrow'/>
                </TabPane>
              </TabbedArea>
              <ErrorConsole html={this.state.errorsHTML} text={this.state.errorsTEXT} yaml={this.state.errorsYAML}/>
            </div>
            <div className="col-sm-6">
              <TabbedArea defaultActiveKey={1}>
                <TabPane eventKey={1} tab='Text Preview'>
                  <TextPreviewer content={this.state.content} returnError={this.receiveNewErrors} template={this.state.textTemplate} type='text'/>
                </TabPane>
                <TabPane eventKey={2} tab='HTML Preview'>
                  <TextPreviewer content={this.state.content} returnError={this.receiveNewErrors} template={this.state.htmlTemplate} type='html'/>
                </TabPane>
              </TabbedArea>
            </div>
          </div>
        </div>
      )
    }

  });

  module.exports = HovercraftApp;

})();

//  <Editor onChange={this.textTemplateUpdated}/>
