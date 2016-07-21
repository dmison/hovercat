const React = require('react');

const ConfigPanel = (props) => {
  return (
    <div className='panel panel-default'>
      <div className='panel-heading'>
        <h3 className='panel-title'>{props.title}</h3>
      </div>
      <div className='panel-body'>
        {props.children}
      </div>
    </div>

  );
};

ConfigPanel.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node
};

module.exports = ConfigPanel;
