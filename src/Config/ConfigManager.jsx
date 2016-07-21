const React = require('react');
const {hashHistory} = require('react-router');
const {writeConfigFile} = require('./index.js');

// lets use the config actions and reducer to maintain the
// updatedConfig object independant of the store
const {setEditorWrap, setBitlyToken} = require('./actions.js');
const {config_reducer} = require('./reducers.js');

const ConfigPanel = require('./ConfigPanel.jsx');
const ConfigEntryField = require('./ConfigEntryField.jsx');
const BitlyAccessTokenFormField = require('./BitlyAccessTokenFormField.jsx');

const ConfigManager = React.createClass({

  getInitialState: function(){
    return {
      originalConfig: {},
      updatedConfig: {}
    };
  },

  propTypes: function(){
    return {
      config: React.PropTypes.object
    };
  },

  componentWillReceiveProps: function(newProps){
    if(this._unsavedChanges('componentWillReceiveProps', newProps.config, this.state.originalConfig)){
      this.setState( { originalConfig: newProps.config, updatedConfig: newProps.config } );
    }
  },

  componentWillMount: function(){
    this.setState( { originalConfig: this.props.config, updatedConfig: this.props.config } );
  },

  render: function(){
    const unsavedChanges = this._unsavedChanges(this.state.updatedConfig, this.state.originalConfig);

    var style = {
      height: this.props.height,
      marginTop: 12,
      marginLeft: 12,
      marginRight: 12,
      paddingLeft: 12,
      paddingRight:12,
      overflowY: 'scroll'
    };

    return (

      <div className='container' style={{paddingTop:15}}>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h3 className='panel-title pull-left'>Configuration</h3>
              <button className='btn btn-info pull-right'
                disabled={unsavedChanges}
                onClick={()=>{hashHistory.push('/');}} >Close</button>
              <button className='btn btn-default pull-right'
                disabled={!unsavedChanges} style={{marginRight: 10}}
                onClick={this._discardChanges} >Discard Changes</button>
              <button className='btn btn-default pull-right'
                disabled={!unsavedChanges} style={{marginRight: 10}}
                onClick={this._saveConfig}>Save Changes</button>
              <div className='clearfix'></div>
            </div>
            <div className='panel-body'>
              <div style={style}>
                <form className='form-horizontal'>

                  <ConfigPanel title='Editor Configuration'>
                    <ConfigEntryField
                      type='boolean'
                      label='Word wrap'
                      configValue={this.state.updatedConfig.editor.wrapEnabled}
                      originalValue={this.state.originalConfig.editor.wrapEnabled}
                      description='Enable word wrap in editors.'
                      onChange={(enabled) => {
                        this.setState( {updatedConfig: config_reducer(this.state.updatedConfig, setEditorWrap(enabled)) });
                      } } />
                  </ConfigPanel>

                  <ConfigPanel title='Bitly Configuration'>
                    <BitlyAccessTokenFormField
                      token={this.state.updatedConfig.bitlyAccessToken}
                      originalToken={this.state.originalConfig.bitlyAccessToken}
                      onTokenChange={(token) => {
                        this.setState( {updatedConfig: config_reducer(this.state.updatedConfig, setBitlyToken(token)) });
                      } } />
                  </ConfigPanel>

                  <ConfigPanel title='Email Configuration'>



                  </ConfigPanel>

                </form>

            </div>
          </div>
        </div>
      </div>

    );
  },


  _saveConfig: function(){
    writeConfigFile(this.state.updatedConfig, this.props.homeDir, (err, config)=>{
      if(err){
        alert(`Save failed:\n\n${err}`);
      } else {
        this.props.importConfig(config);
      }
    });
  },

  _discardChanges: function(){
    this.setState({ updatedConfig: this.state.originalConfig});
  },

  // this is pretty fragile way of comparing objects,
  // but should work consistently in this case because the order of
  // properties shouldn't change and there are no methods
  _unsavedChanges: function(one, two){
    return JSON.stringify(one) !== JSON.stringify(two);
  }

});


// <ConfigEntryField
//   type='text'
//   label='Default sender'
//   configValue={this.state.defaultSender}
//   description='Default From: address'
//   onChange={this.setDefaultSender} />
//
// <hr/>
// <h4>GMail</h4>
// <ConfigEntryField
//   type='text'
//   label='Username'
//   configValue={this.state.gmailUsername}
//   description='Gmail Username'
//   onChange={this.setGmailUsername} />
//
// <ConfigEntryField
//   type='text'
//   label='App Password'
//   configValue={this.state.gmailAppPassword}
//   description='GMail App Password'
//   onChange={this.setGmailAppPassword} />
//
// <hr/>
// <h4>SMTP</h4>
// <ConfigEntryField
//   type='text'
//   label='Host'
//   configValue={this.state.smtpHost}
//   description='SMTP Hostname'
//   onChange={this.setSmtpHost} />
//
// <ConfigEntryField
//   type='text'
//   label='Port'
//   configValue={this.state.smtpPort}
//   description='SMTP Port'
//   onChange={this.setSmtpPort} />
//
// <ConfigEntryField
//   type='boolean'
//   label='Reject Unauthorized'
//   configValue={this.state.smtpTlsRejectUnauthorized}
//   description='Require valid SSL certificate from server.'
//   onChange={this.setSmtpTlsRejectUnauthorized} />

module.exports = ConfigManager;
