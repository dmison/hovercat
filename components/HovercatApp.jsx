(function () {
  var React = require('react');

  var Editor = require('./Editor.jsx');
  var ErrorConsole = require('./ErrorConsole.jsx');
  var TextPreviewer = require('./Previewer.jsx');
  var TabbedArea = require('react-bootstrap/lib/TabbedArea');
  var TabPane = require('react-bootstrap/lib/TabPane');
  var MainMenu = require('./MainMenu.jsx');
  var HCFiles = require('./HCFiles.js');

  var HovercatApp = React.createClass({

    getInitialState: function () {
      return {
        content: '',
        htmlTemplate: '',
        textTemplate: '',
        htmlOutput: '',
        textOutput: '',
        errorsYAML: '',
        errorsTEXT: '',
        errorsHTML: '',
        filename: '',
        unsaved: false,
        saving: false
      }
    },

    contentUpdated: function (text) {
      this.setState({unsaved: true});
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
      this.setState({unsaved: true});
      this.setState({
        textTemplate: text
      });
    },
    htmlTemplateUpdated: function (text) {
      this.setState({unsaved: true});
      this.setState({
        htmlTemplate: text
      });
    },

    open: function(filename){

      HCFiles.openFile(filename, function(input) {
        var invalid = false;

        if (input.error) {
          alert('ERROR: '+filename+' contains Invalid JSON Content: ' + input.error);
          invalid = true;
        } else {
          if ((typeof input.content === 'undefined') ||
            (typeof input.gfmTemplate === 'undefined') ||
            (typeof input.htmlTemplate === 'undefined')) {
            alert('ERROR: '+filename+' doesn\'t seem to be a valid hovercraft file.');
            invalid = true;
          }
        }

        if (!invalid) {
          this.setState({ content: input.content});
          this.setState({ textTemplate: input.gfmTemplate});
          this.setState({ htmlTemplate: input.htmlTemplate});
          this.setState({ filename: filename});
          this.setState({unsaved: false});
        }

      }.bind(this));

    },

    save: function(filename){
      this.setState({ saving: true});

      var fileout = {
        content: this.state.content,
        gfmTemplate: this.state.textTemplate,
        htmlTemplate: this.state.htmlTemplate
      }

      HCFiles.saveFile(filename, fileout, function(err){
        if(err){
          alert(err);
        } else {
          this.setState({ unsaved: false});
          this.setState({ filename: filename });
        }
        this.setState({saving: false});
      }.bind(this));

    },

    render: function () {
      var textOut = this.state.textOutput;
      var errors = this.state.errors;
      var thefilename = this.state.filename;
      var saving = this.state.saving;
      var unsaved = this.state.unsaved;

      return (
        <div>

          <MainMenu save={this.save} open={this.open} filename={thefilename} saving={saving} unsaved={unsaved} />

          <div className="row main">
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

  module.exports = HovercatApp;

})();

//  <Editor onChange={this.textTemplateUpdated}/>
