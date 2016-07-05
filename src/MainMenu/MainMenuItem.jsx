const React = require('react');
const {Link} = require('react-router');

const MainMenuItem = (props) => {
  let style = {};
  // if I'm not in workspace:
  if(props.currentPath !== '/') {
    // then menu items are disabled with normal arrow cursor
    // current item is bolded
    style = {
      color: props.currentPath === props.link ? 'black': 'lightgrey',
      cursor: 'default',
      fontWeight: props.currentPath === props.link ? 900 : 500
    };
    return <a className='menuLink' style={style}>{props.label}</a>;
  }

  if(props.action){
    return <a className='menuLink' style={style} onClick={props.action}>{props.label}</a>;
  }

  if(props.link){
    return <Link to={props.link} style={style}>{props.label}</Link>;
  }

};

MainMenuItem.propTypes = {
  action: React.PropTypes.func,
  label: React.PropTypes.string,
  link: React.PropTypes.string,
  enabled: React.PropTypes.bool,
  currentPath: React.PropTypes.string
};

module.exports = MainMenuItem;
