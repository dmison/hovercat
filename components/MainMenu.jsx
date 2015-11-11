(function () {

  var React = require('react');
  var ModalConfig = require('./ModalConfig.jsx');

  var MainMenu = React.createClass({

    getInitialState: function(){
      return ({ showConfig: false});
    },

    openConfig: function(){
      this.setState({showConfig: true});
    },
    closeConfig: function(){
      this.setState({showConfig: false});
    },

    save: function(){

      var filenameToUse = this.props.filename;

      if (this.props.filename === ''){
        var filenameToUse = dialog.showSaveDialog({filters: [{
          name: 'Hovercraft',
          extensions: ['hovercraft']
        },
        {
          name: 'JSON',
          extensions: ['json']
        }]});

        if (typeof filenameToUse === 'undefined'){
          return;
        }
      }
      this.props.save(filenameToUse);
    },

    open: function(){
      if(this.props.unsaved){
        if (!window.confirm("You have unsaved changes that will be lost if you open a new file.  Continue?")) {
          return;
        }
      }

      var filenames = dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{
          name: 'Hovercraft',
          extensions: ['hovercraft']
        },
        {
          name: 'JSON',
          extensions: ['json']
        }]
      });

      // if no file selected, ie cancelled, then we are done here
      if (typeof filenames === 'undefined') {
        return;
      }

      // otherwise continue
      var filename = filenames[0];
      this.props.open(filename);
    },

    export: function(){
      var exportName = dialog.showSaveDialog();

      if(exportName){
        this.props.export(exportName);
      }
    },

    showEmailDialog: function(){
      this.props.showEmailDialog();
    },

    render: function () {

      var fileSaveState = this.props.unsaved? (<span className='label label-warning'>unsaved</span>): (<span/>);
      var filenameToShow = this.props.filename === ''? 'untitled':this.props.filename;
      var style = { paddingRight: 12};
      return (

        <nav className='navbar navbar-default navbar-static-top'>
          <span className='navbar-brand'>Hovercat</span>
          <ul className='nav navbar-nav'>

            <li><a className='menuLink' onClick={this.open}>Open</a></li>
            <li><a className='menuLink' onClick={this.save}>Save</a></li>
            <li><a className='menuLink' onClick={this.export}>Export</a></li>
            <li><a className='menuLink' onClick={this.showEmailDialog}>Send Email</a></li>
          </ul>
          <div className="navbar-right">
            <span style={style} className="navbar-left navbar-text">{fileSaveState} {filenameToShow}</span>
          </div>

          <ModalConfig show={this.state.showConfig} onHide={this.closeConfig} />

        </nav>

      );

    }

  });

  module.exports = MainMenu;

})();
