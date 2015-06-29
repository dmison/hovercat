(function () {

  var React = require('react');

  // var Navbar = require('react-bootstrap/lib/Navbar');
  // var NavItem = require('react-bootstrap/lib/NavItem');
  // var Nav = require('react-bootstrap/lib/Nav');

  var MainMenu = React.createClass({

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

    render: function () {

      var fileSaveState = this.props.unsaved? (<span className='label label-warning'>unsaved</span>): (<span/>);
      var filenameToShow = this.props.filename === ''? 'untitled':this.props.filename;
      var style = { paddingRight: 12};
      return (

        <nav className='navbar navbar-default navbar-static-top'>
          <span className='navbar-brand'>Hovercat</span>
          <ul className='nav navbar-nav'>
            <li><a href=''>New</a>
            </li>
            <li><a href=''>Open</a>
            </li>
            <li><a className='menuLink' onClick={this.save}>Save</a>
            </li>
            <li><a href=''>Export</a>
            </li>
          </ul>
          <div className="navbar-right">
            <span style={style} className="navbar-left navbar-text">{fileSaveState} {filenameToShow}</span>
          </div>
        </nav>

      );

    }

  });

  module.exports = MainMenu;

})();


// <Nav>
//   <NavItem eventKey={1} href='#'>link</NavItem>
// </Nav>
