(function () {

  var React = require('react');
  var Navbar = require('react-bootstrap/lib/Navbar');
  var NavItem = require('react-bootstrap/lib/NavItem');
  var Nav = require('react-bootstrap/lib/Nav');

  var MainMenu = React.createClass({

    render: function () {

      return (
        <Navbar brand='Hovercat'>
          <Nav>
            <NavItem eventKey={1} href='#'>link</NavItem>
          </Nav>
        </Navbar>
      );

    }

  });

  module.exports = MainMenu;

})();
