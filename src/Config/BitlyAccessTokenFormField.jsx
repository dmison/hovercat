const React = require('react');
const {APIKeyLookup} = require('../Bitly/Bitly.js');

const BitlyAccessTokenFormField = React.createClass({

  getInitialState: function(){
    return {
      username: '',
      password: '',
      getting: false
    };
  },

  render: function() {

    const getTokenForm = (
      <div>
        <div className='col-sm-2'>
          <input className='form-control' placeholder='username' value={this.state.username}
            onChange={(event)=>{ this.setState({ username: event.target.value}); }} />
        </div>
        <div className='col-sm-2'>
          <input className='form-control' placeholder='password' type='password' value={this.state.password}
            onChange={(event)=>{ this.setState({ password: event.target.value}); }}  />
        </div>
        <div className='col-sm-2'>
          <button
            className='btn btn-success'
            disabled={this._disableButton()}
            onClick={this._getToken}>{this.state.getting?<i className="fa fa-spinner fa-pulse fa-fw"></i>:''} Get Token</button>
        </div>
      </div>
    );

    const resetTokenForm = (
      <div>
        <div className='col-sm-4'>
          <input className='form-control' value={this.props.token} disabled />
        </div>
        <div className='col-sm-2'>
          <button className='btn btn-success' onClick={this._resetToken}>Reset Token</button>
        </div>
      </div>
    );


    return (
        <div className='form-group form-horizontal'>
          <label className='col-sm-2 control-label'>Access Token</label>

          {this.props.token === ''? getTokenForm:resetTokenForm}

          <div className='col-sm-4 helptext'>

            <p>
              { (this.props.token === this.props.originalToken)? '' : <span>*</span> } 
              Used to authenticate to Bitly.
            </p>
          </div>
        </div>
      );

  },

  _resetToken: function(){
    this.props.onTokenChange('');
  },

  _getToken: function(){
    this.setState({getting: true});
    APIKeyLookup(this.state.username, this.state.password, (error,token)=>{
      this.setState({getting: false});
      if(error){
        alert(`Error retreiving Access Token:\n\n${error.status_txt}`);
      } else {
        this.setState({ username:'', password:'' });
        this.props.onTokenChange(token);
      }
    });
  },

  _disableButton: function(){
    return this.state.password === '' || this.state.username === '' || this.state.getting;
  },

  propTypes: function(){
    return {
      token: React.PropTypes.string,
      originalToken: React.PropTypes.string,
      onTokenChange: React.PropTypes.func
    };
  }

});

module.exports = BitlyAccessTokenFormField;
