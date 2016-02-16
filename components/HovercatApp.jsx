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

  var dialog = require('remote').require('dialog');
  var ipc = require('ipc-renderer');

  var EmailModal = require('./EmailModal.jsx');
  var ConfigModal = require('./ConfigModal.jsx');

  var BitlyView = require('./BitlyView.jsx');
  var HCBitly = require('./HCBitly.js');

  var getURLs = require('get-urls');
  var escapeStringRegExp = require('escape-string-regexp');

  var HovercatApp = React.createClass({

    getInitialState: function () {
      return {
        content: '',
        urls: [],
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
        resourcesPath: '',
        config: {
          editor: {
            wrapEnabled: true
          },
          bitlyAccessToken: '',
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
                rejectUnauthorized: true
              }
            }
          }
        },
        showConfigDialog: false,
        showEmailDialog: false,
        activeEditorTab: 1,
        activePreviewTab: 1
      };
    },


    componentDidMount: function(){

      //listen to messages from app menu
      ipc.on('send-menu',function(event, message){

        switch(message){

        case 'newFile':
          this.new();
          break;

        case 'openFile':
          this.openFileDialog();
          break;

        case 'saveFile':
          this.openSaveDialog();
          break;

        case 'exportFile':
          this.openExportDialog();
          break;

        case 'sendEmail':
          this.showEmailDialog();
          break;

        case 'openConfig':
          this.showConfigDialog();
          break;

        default:
          alert('unknown message sent from menu, "'+message+'"');
        }

      }.bind(this));

      //wait to get resourcesPath from main process
      ipc.on('send-resourcesPath',function(event, message){
        this.setState({ resourcesPath: message});
      }.bind(this));

      //wait to get home directory path from main process
      ipc.on('send-homedir', function(event, message) {
        message = message + '/.hovercraft/config.yaml';
        this.setState({ homeDir: message });

        //load config into state
        HCFiles.readConfigFile(this.state.config, message, function(config){
          this.setState({ config: config });
        }.bind(this));

      }.bind(this));

    },

    showEmailDialog: function(){
      if (HCBitly.invalidURLsfromSet(this.state.urls).length>0) {
        if (!window.alert('Some of your shortened URLs will break non-shortened ones.  You need to fix that before sending.')) {
          this.setState({ activeEditorTab: 2 });
          return;
        }
      }

      this.setState({showEmailDialog: true});
    },

    closeEmailDialog: function(){
      this.setState({showEmailDialog: false});
    },

    showConfigDialog: function(){
      this.setState( { showConfigDialog: true } );
    },

    closeConfigDialog: function(){
      this.setState( { showConfigDialog: false } );
    },

    saveUpdatedConfig: function(config){
      this.setState( { config: config } );

      HCFiles.writeConfigFile(config, this.state.homeDir, function(){
        var myNotification = new Notification('Hovercat', {
          body: 'Successfully saved configuration'
        });
      });

    },

    _handleEditorTabSelect: function(key){
      this.setState({ activeEditorTab: key });
    },

    _handlePreviewTabSelect: function(key){
      this.setState({ activePreviewTab: key });
    },

    render: function () {

      var textOutput = this.state.textOutput;
      var htmlOutput = this.state.htmlOutput;

      var thefilename = this.state.filename;
      var saving = this.state.saving;
      var unsaved = this.state.unsaved;

      return (
        <div>

          <MainMenu
            new={this.new}
            save={this.openSaveDialog}
            open={this.openFileDialog}
            export={this.openExportDialog}
            filename={thefilename}
            saving={saving}
            unsaved={unsaved}
            showConfigDialog={this.showConfigDialog}
            showEmailDialog={this.showEmailDialog} />

          <div className="row console">
            <div className="col-sm-12">
              <ErrorConsole html={this.state.errorsHTML} text={this.state.errorsTEXT} yaml={this.state.errorsYAML}/>
            </div>
          </div>

          <div className="row main">
            <div className="col-sm-6">
              <Tabs animation={false} activeKey={this.state.activeEditorTab} onSelect={this._handleEditorTabSelect}>
                <Tab eventKey={1} title='Content'>
                  <Editor content={this.state.content}
                          mode='yaml'
                          onChange={this.contentUpdated}
                          theme='tomorrow'
                          wrapEnabled={this.state.config.editor.wrapEnabled} />
                </Tab>
                <Tab eventKey={2} title='URLs'>
                  <BitlyView urls={this.state.urls} restoreURL={this.restoreURL} setShortURL={this.setShortURL} authToken={this.state.config.bitlyAccessToken} />
                </Tab>
                <Tab eventKey={3} title='Text Template'>
                  <Editor content={this.state.textTemplate}
                          mode='markdown'
                          onChange={this.textTemplateUpdated}
                          theme='tomorrow'
                          wrapEnabled={this.state.config.editor.wrapEnabled} />
                </Tab>
                <Tab eventKey={4} title='HTML Template'>
                  <Editor content={this.state.htmlTemplate}
                          mode='html'
                          onChange={this.htmlTemplateUpdated}
                          theme='tomorrow'
                          wrapEnabled={this.state.config.editor.wrapEnabled} />
                </Tab>
              </Tabs>
            </div>
            <div className="col-sm-6">
              <Tabs animation={false} activeKey={this.state.activePreviewTab} onSelect={this._handlePreviewTabSelect}>
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

          <ConfigModal  config={this.state.config}
                        show={this.state.showConfigDialog}
                        onHide={this.closeConfigDialog}
                        save={this.saveUpdatedConfig} />

        </div>
      );
    },

    contentUpdated: function (text) {
      this.setState({unsaved: true});
      this.setState({content: text});
      this.updateURLs(text);
      this.updateOutput('all');
    },

    restoreURL: function(longURL){
      var urls = this.state.urls.map((url)=>{
        if (url.url === longURL){
          url.shortened = false;
          url.shortURL = '';
        }
        return url;
      });

      this.setState( { urls: urls});
      this.updateOutput('all');
    },

    setShortURL: function(longURL, shortURL){
      var urls = this.state.urls.map((url)=>{
        if (url.url === longURL){
          url.shortened = true;
          url.shortURL = shortURL;
        }
        return url;
      });
      this.setState( { urls: urls});
      this.updateOutput('all');
    },

    updateURLs: function(text){

      var listURLsFromText = getURLs(text);

      if(listURLsFromText === null){
        listURLsFromText = [];
      }

      var newURLs = listURLsFromText.map(function(url){
        return {
          url: url,
          shortened: false,
          shortURL: ''
        };
      });

      // copy objects from state if found there
      newURLs = newURLs.map((thisURL)=>{
        var result = thisURL;
        // yep this is a shit bit
        this.state.urls.forEach((url)=>{
          if(url.url === thisURL.url){
            result = url;
          }
        });
        return result;
      });

      this.setState( {urls: newURLs} );
      this.updateOutput('all');
    },

    doURLReplace: function(content, urls){

      var sortedURLs = urls.sort(function(a,b){
        if (a.url.length < b.url.length){
          return 1;
        }
        if (a.url.length > b.url.length){
          return -1;
        }
        return 0;
      });

      var urlsToReplace = sortedURLs.filter((url)=>{
        return url.shortened;
      });

      urlsToReplace.forEach((url)=>{
        var urlRegex = new RegExp(escapeStringRegExp(url.url),'g');
        content = content.replace(urlRegex, url.shortURL);
      });
      return content;
    },

    updateOutput: function(type){
      var content = {};
      var processedContent = this.doURLReplace(this.state.content, this.state.urls);
      var contentData = HCCompiler.parseYAML(processedContent);

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
          if(input.urls){
            this.setState({ urls: input.urls});
          }
          this.setState({ textTemplate: input.gfmTemplate});
          this.setState({ htmlTemplate: input.htmlTemplate});
          this.setState({ filename: filename});
          this.setState({unsaved: false});
          this.updateURLs(input.content);
          this.updateOutput('all');
        }

      }.bind(this));

    },

    save: function(filename){
      this.setState({ saving: true});

      var fileout = {
        content: this.state.content,
        urls: this.state.urls,
        gfmTemplate: this.state.textTemplate,
        htmlTemplate: this.state.htmlTemplate
      };

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

    new: function(){

      if(this.state.unsaved){
        if (!window.confirm('You have unsaved changes that will be lost if you create a new file.  Continue?')) {
          return;
        }
      }

      var newPath = this.state.resourcesPath + '/app/newfile.hovercat';

      HCFiles.openFile(newPath, function(input) {
        this.setState({ content: input.content});
        this.setState({ textTemplate: input.gfmTemplate});
        this.setState({ htmlTemplate: input.htmlTemplate});
        this.setState({ filename: ''});
        this.setState({unsaved: true});
        this.updateOutput('all');
        this.updateURLs(input.content);
      }.bind(this));

    },

    openExportDialog: function(){
      if (HCBitly.invalidURLsfromSet(this.state.urls).length>0) {
        if (!window.alert('Some of your shortened URLs will break non-shortened ones.  You need to fix that before exporting.')) {
          this.setState({ activeEditorTab: 2 });
          return;
        }
      }
      var exportName = dialog.showSaveDialog();

      if(exportName){
        this.export(exportName);
      }

    },

    openFileDialog: function(){
      if(this.state.unsaved){
        if (!window.confirm('You have unsaved changes that will be lost if you open a new file.  Continue?')) {
          return;
        }
      }

      var filenames = dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
          {
            name: 'Hovercat',
            extensions: ['hovercat']
          },
          {
            name: 'Hovercraft (legacy)',
            extensions: ['hovercraft']
          }]
      });

      // if no file selected, ie cancelled, then we are done here
      if (typeof filenames === 'undefined') {
        return;
      }

      // otherwise continue
      var filename = filenames[0];
      this.open(filename);
    },

    openSaveDialog: function(){
      var filenameToUse = this.state.filename;
      if (filenameToUse === ''){
        filenameToUse = dialog.showSaveDialog({filters: [{
          name: 'Hovercat',
          extensions: ['hovercat']
        }]});

        if (typeof filenameToUse === 'undefined'){
          return;
        }
      }
      this.save(filenameToUse);

    }


  });



  module.exports = HovercatApp;

})();

//  <Editor onChange={this.textTemplateUpdated}/>
