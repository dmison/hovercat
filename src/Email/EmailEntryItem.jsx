const React = require('react');

const EmailEntryItem = (props) => {
  return (
    <div className='form-group row'>
      <label className='col-sm-2 control-label'>{props.label}:</label>
      <div className='col-sm-5'>
        <input  className='form-control'
                value={props.value}
                onChange={ (event)=>{props.onChange(event.target.value);} }
                disabled={props.disabled}
                />
      </div>
      <div className='col-sm-5 helptext'>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

EmailEntryItem.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  description: React.PropTypes.string,
  onChange: React.PropTypes.func
};

module.exports = EmailEntryItem;
