(function() {
  var React = require('react');

  var ConfigEntryField = React.createClass({

    render: function() {
      var element;

      if(this.props.type === 'text'){
        element = <input className='form-control' onChange={this.valueChanged} value={this.props.configValue}/>;
      }

      if(this.props.type === 'boolean'){
        element = <input
                    type='checkbox'
                    label={this.props.label}
                    checked={this.props.configValue}
                    onChange={this.valueChanged} />;
      }

      return (
        <div className='form-group'>
          <label className='col-sm-2 control-label'>{this.props.label}</label>
          <div className='col-sm-4'>
            {element}
          </div>
          <div className='col-sm-6 helptext'>
          <p>
            {this.props.description}
          </p>
        </div>
        </div>
      );
    },

    valueChanged: function(event) {
      if(this.props.type === 'boolean'){
        this.props.onChange(event.target.checked);
      }
      if(this.props.type === 'text'){
        this.props.onChange(event.target.value);
      }
    }

  });

  module.exports = ConfigEntryField;

})();

// <div className="form-group" id="gitRepo_grp">
//   <label for="gitRepo" className="col-sm-2 control-label">Github Repo</label>
//   <div className="col-sm-4">
//     <input type="text" id="gitRepo" className="form-control">
//   </div>
//   <div className="col-sm-6 helptext">
//     The name of the repository with your Jekyll site source
//   </div>
// </div>


// <Input  type='checkbox'
//         label='HTML'
//         checked={this.state.includeHTML}
//         onChange={this.checkIncludeHTML} />
