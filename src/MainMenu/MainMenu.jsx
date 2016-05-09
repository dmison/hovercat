const React = require('react');
const {Link} = require('react-router');
const {openFile} = require('../Files/open.js');
const ipc = require('electron').ipcRenderer;

const dialog = require('electron').remote.require('dialog');

const MainMenu = React.createClass({

  propTypes: function(){
    return {
      uistate: React.PropTypes.object,
      updateContent: React.PropTypes.func,
      clearTemplates: React.PropTypes.func,
      setFilename: React.PropTypes.string,
      importTemplates: React.PropTypes.func
    };
  },

  componentDidMount: function(){

    //wait to get resourcesPath from main process
    ipc.on('send-resourcesPath',function(event, message){
      this.props.setResourcesPath(message);
    }.bind(this));

  },

  render: function(){
    return (
      <nav className='navbar navbar-default navbar-static-top'>
          <span className='navbar-brand'>Hovercat</span>
          <ul className='nav navbar-nav'>
            <li><a className='menuLink' onClick={this.new}>New</a></li>
            <li><a className='menuLink' onClick={this.open}>Open</a></li>
            <li><a className='menuLink' >Save</a></li>
            <li><a className='menuLink' >Export</a></li>
            <li><a className='menuLink' >Send Email</a></li>
            <li><Link to='/manage-templates' >Manage Templates</Link></li>
            <li><Link to='/configure' >Configure</Link></li>
          </ul>
      </nav>
    );
  },

  refreshForLoadedFile: function(content, filename, templates){
    this.props.clearTemplates();
    this.props.updateContent(content);
    this.props.setSaved(false);
    this.props.setFilename(filename);
    this.props.importTemplates(templates);
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
        this.refreshForLoadedFile(input.content, filename, input.templates);
      }
    });

  },

  new: function(){
    if(!this.props.uistate.saved){
      if (!window.confirm('You have unsaved changes that will be lost if you create a new file.  Continue?')) {
        return;
      }
    }

    var newPath = `${this.props.uistate.resourcesPath}/app/newfile.hovercat`;

    openFile(newPath, (err, input)=>{
      if(err){
        window.alert(`An error occurred opening the example file: ${err}`);
      } else {
        this.refreshForLoadedFile(input.content, 'untitled', input.templates);
      }
    });

  }

});



module.exports = MainMenu;
