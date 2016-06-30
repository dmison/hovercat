const React = require('react');

const TemplateExportRow = (props) => {

  const rowStyle = {
    cursor: 'pointer'
  };

  return (
    <tr style={rowStyle} key={props.key} onClick={()=>{props.onClick(props.template.id, !props.selected);}}>
      <td><input type='checkbox' checked={props.selected} readOnly /></td>
      <td>{props.template.name}</td>
      <td>{props.template.type}</td>
    </tr>
  );

};

TemplateExportRow.propTypes = {
  key: React.PropTypes.number,
  template: React.PropTypes.object,
  selected: React.PropTypes.bool
};

module.exports = TemplateExportRow;
