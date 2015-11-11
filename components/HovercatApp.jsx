(function () {
  var React = require('react');
  var Editor = require('./Editor.jsx');
  var ErrorConsole = require('./ErrorConsole.jsx');
  var TextPreviewer = require('./Previewer.jsx');
  var Tabs = require('react-bootstrap/lib/Tabs');
  var Tab = require('react-bootstrap/lib/Tab');
  var MainMenu = require('./MainMenu.jsx');
  var HCFiles = require('./HCFiles.js');
  var HCCompiler = require('./HCCompiler.js');

  var EmailModal = require('./EmailModal.jsx');

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
        saving: false,
        homeDir: '',
        config: {
          email: {
            defaultSender: '',
            gmail: {
              username: '',
              appPassword: ''
            },
            smtp: {
              host: '',
              port: 25,
              tls: {
                rejectUnauthorized: false
              }
            }
          }
        },
        showEmailDialog: false
      }
    },


    componentDidMount: function(){
      //wait to get home directory path from main process
      ipc.on('send-homedir', function(message) {
        message = message + '/.hovercraft/config.yaml';
        this.setState({ homeDir: message });

        //load config into state
        HCFiles.readConfigFile(this.state.config, message, function(config){
          this.setState({ config: config });
        }.bind(this));

      }.bind(this));

      //load config into state
      HCFiles.readConfigFile(this.state.config, this.state.homeDir, function(config){
        this.setState({ config: config });
      }.bind(this));


    },

    showEmailDialog: function(){
      this.setState({showEmailDialog: true});


    },

    closeEmailDialog: function(){
        this.setState({showEmailDialog: false});
    },

    render: function () {
      console.log('render: %s', JSON.stringify(this.state.config));

      var textOutput = this.state.textOutput;
      var htmlOutput = this.state.htmlOutput;

      var errors = this.state.errors;
      var thefilename = this.state.filename;
      var saving = this.state.saving;
      var unsaved = this.state.unsaved;

      return (
        <div>

          <MainMenu
            save={this.save}
            open={this.open}
            export={this.export}
            filename={thefilename}
            saving={saving}
            unsaved={unsaved}
            showEmailDialog={this.showEmailDialog} />

          <div className="row console">
            <div className="col-sm-12">
              <ErrorConsole html={this.state.errorsHTML} text={this.state.errorsTEXT} yaml={this.state.errorsYAML}/>
            </div>
          </div>

          <div className="row main">
            <div className="col-sm-6">
              <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title='Content'>
                  <Editor content={this.state.content} mode='yaml' onChange={this.contentUpdated} theme='tomorrow'/>
                </Tab>
                <Tab eventKey={2} title='Text Template'>
                  <Editor content={this.state.textTemplate} mode='markdown' onChange={this.textTemplateUpdated} theme='tomorrow'/>
                </Tab>
                <Tab eventKey={3} title='HTML Template'>
                  <Editor content={this.state.htmlTemplate} mode='html' onChange={this.htmlTemplateUpdated} theme='tomorrow'/>
                </Tab>
              </Tabs>
            </div>
            <div className="col-sm-6">
              <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title='Text Preview'>
                  <TextPreviewer content={textOutput} type='text'/>
                </Tab>
                <Tab eventKey={2} title='HTML Preview'>
                  <TextPreviewer content={htmlOutput} type='html'/>
                </Tab>
              </Tabs>
            </div>
          </div>

          <EmailModal htmlOutput={this.state.htmlOutput}
                      textOutput={this.state.textOutput}
                      config={this.state.config}
                      show={this.state.showEmailDialog}
                      onHide={this.closeEmailDialog} />
        </div>
      )
    },

    saveNewConfig: function(config){

    },

    contentUpdated: function (text) {
      this.setState({unsaved: true});
      this.setState({content: text});
      this.updateOutput('all');
    },

    updateOutput: function(type){
      var content = {};
      var contentData = HCCompiler.parseYAML(this.state.content);
      if (contentData.error){
          var e = contentData.error;
          var message = '"'+e.message+'" Line:'+e.parsedLine+' "'+e.snippet+'"';
          this.updateErrors('yaml', message);
          return;
      } else {
        content = contentData.data;
        this.updateErrors('yaml', '');
      }

      //stupid repetition of code
      if (type === 'text' || type === 'all'){
        var result = HCCompiler.compile(content, this.state.textTemplate);
        if (result.error){
          var e = result.error;
          var message = e.message;
          this.updateErrors('text', message);
          return;
        } else {
          this.setState({ textOutput: result.output});
          this.updateErrors('text', '');
        }
      }
      if (type === 'html' || type === 'all'){
        var result = HCCompiler.compile(content, this.state.htmlTemplate);
        if (result.error){
          var e = result.error;
          var message = e.message;
          this.updateErrors('html', message);
          return;
        } else {
          this.setState({ htmlOutput: result.output});
          this.updateErrors('html', '');
          // inline the CSS
          HCCompiler.processCSS(result.output, function(html){
            console.log('css done');
            this.setState({ htmlOutput: html});
          }.bind(this));
        }
      }
      //stupid repetition ends

    },


    updateErrors: function (type, errorText) {

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
      this.setState({textTemplate: text});
      this.updateOutput('text');
    },
    htmlTemplateUpdated: function (text) {
      this.setState({unsaved: true});
      this.setState({htmlTemplate: text});
      this.updateOutput('html');

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
          this.updateOutput('all');
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

    export: function(exportName){
      var htmlOutput = this.state.htmlOutput;
      var textOutput = this.state.textOutput;

      HCFiles.exportFiles(exportName, textOutput, htmlOutput, function(error){
        if (error) {
          alert('Export failed: '+error);
        } else {
          alert('Export done.');
        }
      });

    },

    openSendEmailDialog: function(){

    }


  });



  module.exports = HovercatApp;

})();

//  <Editor onChange={this.textTemplateUpdated}/>
