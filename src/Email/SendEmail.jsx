const React = require('react');
const {hashHistory} = require('react-router');
const {send} = require('./EmailUtils.js');

class SendEmail extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      useGmail: true,
      useSmtp: false,
      sendTo: '',
      from: '',
      replyTo: '',
      subject: '',
      html: true,
      text: true,
      htmlSource: '',
      textSource: ''
    };
  }

  // on initial mount
  // set state to match if gmail is selected
  componentWillMount(){
    this.setState({
      from: this.props.config.gmail.username,
      replyTo: this.props.config.gmail.username
    });
  }

  render(){

    const style = {
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
              <h3 className='panel-title pull-left'>Send Email</h3>
              <button className='btn btn-default pull-right' onClick={()=>{hashHistory.push('/');}} >Close</button>
              <button className='btn btn-info pull-right' style={{marginRight: 10}} >Send</button>
              <div className='clearfix'></div>
            </div>
            <div className='panel-body'>
              <div style={style}>


                <div className='form-group row'>
                  <label className='col-sm-2 control-label'>Account:</label>
                  <div className='col-sm-5'>
                      <label className="checkbox-inline">
                        <input type="radio" label="GMAIL" checked={this.state.useGmail} />
                        {' '} GMAIL
                      </label>
                      <label className="checkbox-inline">
                        <input type="radio" label="SMTP" checked={this.state.useSmtp} />
                         {' '} SMTP
                      </label>
                  </div>
                  <div className='col-sm-5 helptext'>
                    <p>Use Gmail or SMTP to send.</p>
                  </div>
                </div>
                <hr/>
                <div className='form-group row'>
                  <label className='col-sm-2 control-label'>Send To:</label>
                  <div className='col-sm-5'>
                    <input className='form-control' value={this.state.sendTo}/>
                  </div>
                  <div className='col-sm-5 helptext'>
                    <p>Address to send to.</p>
                  </div>
                </div>

                <div className='form-group row'>
                  <label className='col-sm-2 control-label'>From:</label>
                  <div className='col-sm-5'>
                    <input className='form-control' value={this.state.sendTo}/>
                  </div>
                  <div className='col-sm-5 helptext'>
                    <p>From</p>
                  </div>
                </div>


                <div className='form-group row'>
                  <label className='col-sm-2 control-label'>Reply To:</label>
                  <div className='col-sm-5'>
                    <input className='form-control' value={this.state.sendTo}/>
                  </div>
                  <div className='col-sm-5 helptext'>
                    <p>Reply To</p>
                  </div>
                </div>

                <div className='form-group row'>
                  <label className='col-sm-2 control-label'>Subject:</label>
                  <div className='col-sm-5'>
                    <input className='form-control' value={this.state.sendTo}/>
                  </div>
                  <div className='col-sm-5 helptext'>
                    <p>Subject</p>
                  </div>
                </div>

                <hr />

                <div className='form-group row'>
                  <label className='col-sm-2 control-label'>Formats:</label>

                  <div className='col-sm-5'>
                    <div className='col-sm-3'><input  type='checkbox' checked={this.state.html} />{' '}HTML</div>
                    <div className='col-sm-9 form-group'>
                      <select className='form-control'>
                        <option>something</option>
                        <option>something</option>
                        <option>something</option>
                      </select>
                    </div>

                    <div className='col-sm-3'><input  type='checkbox' checked={this.state.html} />{' '}HTML</div>
                    <div className='col-sm-9 form-group'>
                      <select className='form-control'>
                        <option>something</option>
                        <option>something</option>
                        <option>something</option>
                      </select>
                    </div>
                  </div>

                  <div className='col-sm-5'>
                  What content to send
                  </div>


                </div> {/* end row */}
              </div>

        </div>
      </div>
    </div>

    );
  }
}

SendEmail.propTypes = {
  config: React.PropTypes.object,
  height: React.PropTypes.number
};


module.exports = SendEmail;
