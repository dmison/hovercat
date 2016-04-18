const React = require('react');

const TemplateDetailsForm = (props) => {
  return (
    <span>
      <input  type='text'
              value={props.name}
              onChange={ (event)=>{ props.onNameChange(event.target.value); } } />
            <select value={props.type}
              onChange={ (event)=>{ props.onTypeChange(event.target.value); } }>
        <option value="markdown">Markdown</option>
        <option value="html">HTML</option>
      </select>
    </span>

  );
};

TemplateDetailsForm.propTypes = {
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  onNameChange: React.PropTypes.func,
  onTypeChange: React.PropTypes.func
};

module.exports = TemplateDetailsForm;
