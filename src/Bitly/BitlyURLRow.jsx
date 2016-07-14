const React = require('react');

const BitlyURLRow = (props) => {
  const style={
    cursor: 'pointer',
    backgroundColor: props.invalid ? 'rgba(204, 0, 0, 0.62)': ''
  };

  const error_or_short = props.url.error_msg === ''? <span>{props.url.short}</span> : <span className='label label-warning'>{props.url.error_msg}</span>;

  return (
    <tr key={props.key} style={style} onClick={()=>{props.onClick(props.url.long, !props.url.selected);}}>
      <td><input type='checkbox' checked={props.url.selected} readOnly/></td>
      <td>{props.url.long}</td>
      <td>{error_or_short}</td>
    </tr>
  );
};

BitlyURLRow.propTypes = {
  url: React.PropTypes.object,
  onClick: React.PropTypes.func,
  key: React.PropTypes.number,
  invalid: React.PropTypes.bool
};

module.exports = BitlyURLRow;
