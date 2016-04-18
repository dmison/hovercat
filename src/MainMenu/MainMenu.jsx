const React = require('react');
const {Link} = require('react-router');

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
          <li><Link to='/manage-templates' >Manage Templates</Link></li>
          <li><Link to='/configure' >Configure</Link></li>
        </ul>
    </nav>

  );
};

module.exports = MainMenu;
