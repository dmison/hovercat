var React = require('react');

var BitlyConfig = React.createClass({

  getInitialState: function(){
    return {
      username: '',
      password: ''
    };
  },

  setPassword: function(event){
    this.setState( {password: event.target.value});
  },
  setUsername: function(event){
    this.setState( {username: event.target.value});
  },

  tokenDisplay: function(){
    return (
      <div className='form-group'>
        <label className='col-sm-3 control-label'>Access Token</label>
        <div className='col-sm-3'>
          <input className='form-control' value={this.props.authToken} readOnly/>
        </div>
        <div className='col-sm-1'>
          <a className='btn btn-danger' onClick={this.clearToken}>Clear</a>
        </div>
        <div className='col-sm-5 helptext'>
          <p>
            Access token used to authenticate to Bitly.
          </p>
        </div>
      </div>
    );
  },

  usernamePasswordDisplay: function(){
    return (
      <div className='form-group'>
        <label className='col-sm-3 control-label'>Access Token</label>
        <div className='col-sm-3'>
          <input className='form-control' value={this.state.username} onChange={this.setUsername} />
        </div>
        <div className='col-sm-3'>
          <input className='form-control' value={this.state.password} onChange={this.setPassword} />
        </div>
        <div className='col-sm-3'>
          <a className='btn btn-success' onClick={this.getToken}>Get Token</a>
        </div>
        <div className='col-sm-3 helptext'>
          <p>
            Access token used to authenticate to Bitly.
          </p>
        </div>
      </div>
    );
  },

  getToken: function(){
    // POST
    // basic auth
    // Authorization Header:
    //  with the value "Basic " + base64encode(username + ":" + password)

    var url = 'https://api-ssl.bitly.com/oauth/access_token';
    var authHeader = window.btoa(`${this.state.username}:${this.state.password}`);

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`
      }
    }).then((response)=>{
      response.text().then((text)=>{
        //attempt to parse as JSON if failed then text is token
        try {
          var result = JSON.parse(text);
          alert(`Failed to get token: ${result.status_txt}`);
        } catch (e) {
          this.props.setAuthToken(text);
        }

      });
    });

  },

  clearToken: function(){
    this.props.setAuthToken('');
  },

  render: function(){
    var element;

    if (this.props.authToken === ''){
      element = this.usernamePasswordDisplay();
    } else {
      element = this.tokenDisplay();
    }

    return <div>{element}</div>;
  }

});

module.exports = BitlyConfig;
