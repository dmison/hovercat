const React = require('react');
const {hashHistory} = require('react-router');
const {writeConfigFile} = require('./index.js');

// lets use the config actions and reducer to maintain the
// config object independant of the store
const {
  setEditorWrap,
  setBitlyToken,
  setGmailUsername,
  setGmailPassword,
  setSMTPSender,
  setSMTPHost,
  setSMTPPort,
  setSMTPTLSRejectUnauthorized
} = require('./actions.js');

const {config_reducer} = require('./reducers.js');

const ConfigPanel = require('./ConfigPanel.jsx');
const ConfigEntryField = require('./ConfigEntryField.jsx');
const BitlyAccessTokenFormField = require('./BitlyAccessTokenFormField.jsx');

const ConfigManager = React.createClass({

  getInitialState: function(){
    return {
      config: {}
    };
  },

  propTypes: function(){
    return {
      config: React.PropTypes.object,
      homeDir: React.PropTypes.string,
      height: React.PropTypes.number
    };
  },

  // componentWillReceiveProps: function(newProps){
  //   if(!this._unsavedChanges(newProps.config, this.props.config)){
  //     this.setState( { config: newProps.config } );
  //   }
  // },

  componentWillMount: function(){
    this.setState( { config: this.props.config });   },

  render: function(){
    const unsavedChanges = this._unsavedChanges(this.state.config, this.props.config);

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
              <button className='btn btn-info pull-right' disabled={unsavedChanges} onClick={()=>{hashHistory.push('/');}} >Close</button>
              <button className='btn btn-default pull-right' disabled={!unsavedChanges} style={{marginRight: 10}} onClick={this._discardChanges} >Discard Changes</button>
              <button className='btn btn-default pull-right' disabled={!unsavedChanges} style={{marginRight: 10}} onClick={this._saveConfig}>Save Changes</button>
              <div className='clearfix'></div>
            </div>

            <div className='panel-body'>
              <div style={style}>
                <form className='form-horizontal'>

                  <ConfigPanel title='Editor Configuration'>

                    <ConfigEntryField
                      type='boolean'
                      label='Word wrap'
                      configValue={this.state.config.editor.wrapEnabled}
                      originalValue={this.props.config.editor.wrapEnabled}
                      description='Enable word wrap in editors.'
                      onChange={(enabled) => {
                        const newState = config_reducer(this.state.config, setEditorWrap(enabled));
                        this.setState( { config: newState } );
                      } } />
                  </ConfigPanel>

                  <ConfigPanel title='Bitly Configuration'>
                    <BitlyAccessTokenFormField
                      token={this.state.config.bitlyAccessToken}
                      originalToken={this.props.config.bitlyAccessToken}
                      onTokenChange={(token) => {
                        this.setState( { config: config_reducer(this.state.config, setBitlyToken(token)) } );
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
    writeConfigFile(this.state.config, this.props.homeDir, (err, config)=>{
      if(err){
        alert(`Save failed:\n\n${err}`);
      } else {
        this.props.importConfig(config);
      }
    });
  },

  _discardChanges: function(){
    this.setState({ config: this.props.config});
  },



  // this is pretty fragile way of comparing objects,
  // but should work consistently in this case because the order of
  // properties shouldn't change and there are no methods
  _unsavedChanges: function(one, two){
    return JSON.stringify(one) !== JSON.stringify(two);

  }

});


module.exports = ConfigManager;
