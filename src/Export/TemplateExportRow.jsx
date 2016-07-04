const React = require('react');

const TemplateExportRow = (props) => {

  const rowStyle = {
    cursor: 'pointer'
  };

  let status = '';
  switch(props.error){
  case '': {
    status = '';
    break;
  }
  case 'success': {
    status = <span className='label label-success'>Exported successfully</span>;
    break;
  }
  default: {
    status = <span><span className='label label-danger'>Error</span> {props.error}</span>;
  }
  }

  return (
    <tr style={rowStyle} key={props.key} onClick={()=>{props.onClick(props.id, !props.selected);}}>
      <td><input type='checkbox' checked={props.selected} readOnly /></td>
      <td>{props.name}</td>
      <td>{props.type}</td>
      <td>{status}</td>
    </tr>
  );

};

TemplateExportRow.propTypes = {
  key: React.PropTypes.number,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  error: React.PropTypes.string,
  selected: React.PropTypes.bool
};

module.exports = TemplateExportRow;
