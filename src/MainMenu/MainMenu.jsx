const React = require('react');
const {openFile} = require('../Files/open.js');
const {saveFile} = require('../Files/save.js');
const {readConfigFile} = require('../Config');
const MainMenuItem = require('./MainMenuItem.jsx');

const ipc = require('electron').ipcRenderer;
const {hashHistory} = require('react-router');


const {dialog} = require('electron').remote;
const MainMenu = React.createClass({

  propTypes: function(){
    return {
      uistate: React.PropTypes.object,
      content: React.PropTypes.string,
      urls: React.PropTypes.array,
      setSaving: React.PropTypes.func,
      setSaved: React.PropTypes.func,
      templates: React.PropTypes.array,
      updateContent: React.PropTypes.func,
      clearTemplates: React.PropTypes.func,
      setFilename: React.PropTypes.string,
      importTemplates: React.PropTypes.func,
      setURLs: React.PropTypes.func,
      setHomeDir: React.PropTypes.func,
      importConfig: React.PropTypes.func,
      location: React.PropTypes.string
    };
  },

  componentDidMount: function(){

    //listen to messages from app menu
    ipc.on('send-menu',function(event, message){
      if(this.props.location === '/'){
        switch(message){

        case 'newFile':
          this.new();
          break;

        case 'loadSampleFile':
          this.loadSampleFile();
          break;

        case 'openFile':
          this.open();
          break;

        case 'saveFile':
          this._save();
          break;

        case 'saveAsFile':
          this._saveAs();
          break;

        case 'exportFile':
          hashHistory.push('export');
          break;

        case 'sendEmail':
          hashHistory.push('email');
          break;

        case 'openTemplateManager':
          hashHistory.push('manage-templates');
          break;

        case 'openConfig':
          hashHistory.push('configure');
          break;

        default:
          alert('unknown message sent from menu, "'+message+'"');
        }
      }
    }.bind(this));

    //wait to get homedir path from main process
    ipc.on('send-homedir',function(event, message){
      this.props.setHomeDir(message);
      readConfigFile(this.props.config, `${message}`, (err, config)=>{
        if(err){
          alert(`Failed to load configuration:\n\n${err}`);
        } else {
          this.props.importConfig(config);
        }
      });
    }.bind(this));


    //wait to get resourcesPath from main process
    ipc.on('send-resourcesPath',function(event, message){
      this.props.setResourcesPath(message);
    }.bind(this));

  },

  render: function(){

    return (
      <nav className='navbar navbar-default navbar-static-top'>
          <span className='navbar-brand'>Hovercat</span>
          <ul className='nav navbar-nav' >
            <li><MainMenuItem currentPath={this.props.location} label='New' action={this.new}/></li>
            <li><MainMenuItem currentPath={this.props.location} label='Open' action={this.open}/></li>
            <li><MainMenuItem currentPath={this.props.location} label='Save' action={this._save} disabled={this.props.uistate.saved}/></li>
            <li><MainMenuItem currentPath={this.props.location} label='Export' link='/export'/></li>
            <li><MainMenuItem currentPath={this.props.location} label='Send Email' link='/email'/></li>
            <li><MainMenuItem currentPath={this.props.location} label='Manage Templates' link='/manage-templates'/></li>
            <li><MainMenuItem currentPath={this.props.location} label='Configure' link='/configure'/></li>
          </ul>
      </nav>
    );
  },

  refreshForLoadedFile: function(content, filename, templates, urls=[], newfile){
    this.props.setFilename(filename);
    this.setTitle(filename===''?'untitled':filename);
    this.props.setSaved(!newfile);
    this.props.updateContent(content);
    this.props.clearTemplates();
    this.props.importTemplates(templates);
    this.props.setURLs(urls);
    this.props.buildAll();
  },

  open: function(){
    if(!this.props.uistate.saved){
      if (!window.confirm('You have unsaved changes that will be lost if you open another file.  Continue?')) {
        return;
      }
    }

    // show open dialog
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

    openFile(filename, (err, input)=>{
      if(err){
        window.alert(`An error occurred opening ${filename}:\n\n ${err}`);
      } else {
        this.refreshForLoadedFile(input.content, filename, input.templates, input.urls, false);
      }
    });

  },
  // =================================================================== NEW
  new: function(){
    if(!this.props.uistate.saved){
      if (!window.confirm('You have unsaved changes that will be lost if you create a new file.  Continue?')) {
        return;
      }
    }

    this.refreshForLoadedFile('', '', [], [], true);

  },

  loadSampleFile: function(){
    if(!this.props.uistate.saved){
      if (!window.confirm('You have unsaved changes that will be lost if you create a new file.  Continue?')) {
        return;
      }
    }

    var newPath = `${this.props.uistate.resourcesPath}/app/samplefile.hovercat`;

    openFile(newPath, (err, input)=>{
      if(err){
        window.alert(`An error occurred opening the example file: ${err}`);
      } else {
        this.refreshForLoadedFile(input.content, '', input.templates, input.urls, true);
      }
    });

  },

  save: function(filename){
    this.props.setSaving(true);
    const fileout = {
      content: this.props.content,
      urls: this.props.urls.filter((url)=>{ return url.short !== ''; }),
      templates: this.props.templates
    };
    saveFile(filename, fileout, (err, finalFilename) => {
      if(err){
        alert(err);
        this.props.setSaving(false);
      } else {
        this.props.setFilename(finalFilename);
        this.props.setSaved(true);
        this.setTitle(finalFilename);
        setTimeout(()=>{
          this.props.setSaving(false);
        }, 1000);
      }
    });
  },

  _save: function(){
    if(!this.props.uistate.saved){
      this.openSaveDialog(this.props.uistate.filename);
    }
  },

  _saveAs: function(){
    this.openSaveDialog('');
  },


  openSaveDialog: function(filenameToUse){
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
  },

  setTitle: function(filename) {
    ipc.send('setTitle', filename);
  }


});



module.exports = MainMenu;
