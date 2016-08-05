const React = require('react');

const ConfigEntryField = React.createClass({

  propTypes: function(){
    return {
      label: React.PropTypes.string,
      configValue: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool),
      originalValue: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool),
      type: React.PropTypes.string,
      description: React.PropTypes.string,
      onChange: React.PropTypes.func
    };
  },

  render: function() {
    var element;
    const changed = (this.props.originalValue === this.props.configValue)? '' : 'unsaved';

    if(this.props.type === 'text'){
      element = (
        <div className={'form-group config-entry-field '+changed}>
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

    if(this.props.type === 'password'){
      element = (
        <div className={'form-group config-entry-field '+changed}>
          <label className='col-sm-3 control-label'>{this.props.label}</label>
          <div className='col-sm-4'>
            <input type='password' className='form-control' onChange={this.valueChanged} value={this.props.configValue}/>
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
        <div className={'form-group config-entry-field '+changed}>
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
    if(this.props.type === 'text' || this.props.type === 'password'){
      this.props.onChange(event.target.value);
    }
  }

});

module.exports = ConfigEntryField;
