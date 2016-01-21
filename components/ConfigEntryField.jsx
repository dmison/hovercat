(function() {
  var React = require('react');

  var ConfigEntryField = React.createClass({

    render: function() {
      var element;

      if(this.props.type === 'text'){
        element = (
          <div className='form-group'>
            <label className='col-sm-3 control-label'>{this.props.label}</label>
            <div className='col-sm-4'>
              <input className='form-control' onChange={this.valueChanged} value={this.props.configValue}/>
            </div>
            <div className='col-sm-5 helptext'>
              <p>
                {this.props.description}
              </p>
            </div>
          </div>

        );
      }

      if(this.props.type === 'boolean'){
        element = (
          <div className='form-group'>
            <label className='col-sm-4 col-sm-offset-3 control-label pull-left'>
                <input  type='checkbox' className='pull-left'
                        label={this.props.label}
                        checked={this.props.configValue}
                        onChange={this.valueChanged} /> <span className='pull-left' style={{marginLeft: 5}}>{this.props.label}</span>
              </label>
            <div className='col-sm-5 helptext'>
              <p>
                {this.props.description}
              </p>
            </div>
          </div>

        );
      }

      return element;
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
