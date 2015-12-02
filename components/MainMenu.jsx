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

    showSaveDialog: function(){
      this.props.save();
    },

    new: function(){
        this.props.new();
    },

    showOpenDialog: function(){
      this.props.open();
    },

    showExportDialog: function(){
      this.props.export();
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
            <li><a className='menuLink' onClick={this.new}>New</a></li>
            <li><a className='menuLink' onClick={this.showOpenDialog}>Open</a></li>
            <li><a className='menuLink' onClick={this.showSaveDialog}>Save</a></li>
            <li><a className='menuLink' onClick={this.showExportDialog}>Export</a></li>
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
