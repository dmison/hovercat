const React = require('react');

const MainMenu = (props) => {
  return (
    <nav className='navbar navbar-default navbar-static-top'>
        <span className='navbar-brand'>Hovercat</span>
        <ul className='nav navbar-nav'>
          <li><a className='menuLink' >New</a></li>
          <li><a className='menuLink' >Open</a></li>
          <li><a className='menuLink' >Save</a></li>
          <li><a className='menuLink' >Export</a></li>
          <li><a className='menuLink' >Send Email</a></li>
          <li><a className='menuLink' >Manage Templates</a></li>
          <li><a className='menuLink' >Configure</a></li>
        </ul>
    </nav>

  );
};

module.exports = MainMenu;
