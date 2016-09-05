const React = require('react');
const {hashHistory} = require('react-router');
const EmailEntryItem = require('./EmailEntryItem.jsx');
const EmailFormatSelector = require('./EmailFormatSelector.jsx');
const {send} = require('./EmailUtils.js');
const {inlineCSS} = require('../Compiler');

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
      html: false,
      text: false,
      htmlSelection: '',
      textSelection: '',
      sending: false
    };

    this._sendEmail = this._sendEmail.bind(this);

    this._getContentForName = this._getContentForName.bind(this);
    this._getOutputForType = this._getOutputForType.bind(this);
    this._okToSend = this._okToSend.bind(this);
    this._includeAtLeastOneFormat = this._includeAtLeastOneFormat.bind(this);
    this._sendToIsValid = this._sendToIsValid.bind(this);
    this._fromIsValid = this._fromIsValid.bind(this);
    this._subjectIsValid = this._subjectIsValid.bind(this);
  }

  // on initial mount
  // set state to match if gmail is selected
  componentWillMount(){
    this.setState({
      from: this.props.config.gmail.username,
      replyTo: this.props.config.gmail.username
    });

    //if there are no initial selections, select the first of each
    if(this._getOutputForType('html').length > 0 && this.state.htmlSelection === ''){
      this.setState({htmlSelection: this._getOutputForType('html')[0].name});
    }
    if(this._getOutputForType('markdown').length > 0 && this.state.textSelection === ''){
      this.setState({textSelection: this._getOutputForType('markdown')[0].name});
    }

  }

  _sendEmail(){

    this.setState({ sending: true });
    const htmlContent = inlineCSS(this._getContentForName(this.state.htmlSelection));

    send(
      this.props.config,
      (this.state.useGmail? 'gmail':'smtp'),
      this.state.sendTo,
      this.state.subject,
      this.state.html? htmlContent:'',
      this.state.text? this._getContentForName(this.state.textSelection):'',
      this.state.from,
      this.state.replyTo,
      (error)=>{
        // todo: component *might* be unmounted before this happens: is there a nice what to avoid the logged error?
        this.setState({ sending: false });
        setTimeout(()=>{
          if(error){
            alert('Error sending email:', error);
          } else {
            alert('Email successfully sent.');
          }

        }, 10);
      }
    );

  }

  _sendToIsValid(){
    return this.state.sendTo != '';
  }

  _fromIsValid(){
    return this.state.useGmail || this.state.from != '';
  }

  _subjectIsValid(){
    return this.state.subject != '';
  }

  _gmailOK(){
    return  this.props.config.gmail.username !== '' &&
            this.props.config.gmail.appPassword !== '' &&
            this._sendToIsValid() &&
            this._subjectIsValid();
  }

  _smtpOK(){
    return  this.props.config.host !== '' &&
            this._sendToIsValid() &&
            this._subjectIsValid() &&
            this._fromIsValid();
  }

  _includeAtLeastOneFormat(){
    return this.state.html || this.state.text;
  }

  _okToSend(){
    return  ((this.state.useGmail && this._gmailOK()) ||
            (this.state.useSmtp && this._smtpOK())) &&
            this._includeAtLeastOneFormat();
  }

  _getContentForName(name){
    return this.props.outputs.find((output)=>{
      return output.name === name;
    }).output;
  }

  _getOutputForType(type){
    return this.props.outputs.filter((output)=>{ return output.type === type; });
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
              <button disabled={this.state.sending || !this._okToSend()} className='btn btn-info pull-right' style={{marginRight: 10}} onClick={this._sendEmail}>
                {this.state.sending?<span className='pull-right sendingProgess'><i className="fa fa-spinner fa-spin fa-fw"></i> Sending</span>:'Send'}
              </button>

              <div className='clearfix'></div>
            </div>
            <div className='panel-body'>
              <div style={style}>

                <div className='form-group row'>
                  <label className='col-sm-2 control-label'>Account:</label>
                  <div className='col-sm-5'>
                      <label className="checkbox-inline">
                        <input  type="radio"
                                label="GMAIL"
                                checked={this.state.useGmail}
                                onClick={ ()=> {
                                  this.setState({ useGmail: true, useSmtp: false });
                                } }
                                />
                        {' '} GMAIL
                      </label>
                      <label className="checkbox-inline">
                        <input  type="radio"
                                label="SMTP"
                                checked={this.state.useSmtp}
                                onClick={ ()=> {
                                  this.setState({ useSmtp: true, useGmail: false });
                                } }
                                />
                         {' '} SMTP
                      </label>
                  </div>
                  <div className='col-sm-5 helptext'>
                    <p>Use Gmail or SMTP to send.</p>
                  </div>
                </div>
                <hr/>

                <EmailEntryItem label='Send To'
                                value={this.state.sendTo}
                                description='Address to send to.'
                                onChange={(newValue)=>{ this.setState({ sendTo: newValue }); }}
                                valid={this._sendToIsValid}
                                />
                              <EmailEntryItem valid={this._fromIsValid} label='From' value={this.state.useGmail?this.props.config.gmail.username:this.state.from} description='From' onChange={(newValue)=>{ this.setState({ from: newValue }); }} disabled={this.state.useGmail}/>
                <EmailEntryItem label='Reply To' value={this.state.useGmail?this.props.config.gmail.username:this.state.replyTo} description='Reply To.' disabled={this.state.useGmail} onChange={(newValue)=>{ this.setState({ replyTo: newValue }); }} />
                <EmailEntryItem valid={this._subjectIsValid} label='Subject' value={this.state.subject} description='Subject.' onChange={(newValue)=>{ this.setState({ subject: newValue }); }} />

                <hr />

                <EmailFormatSelector  htmlFormats={this.props.outputs.filter((output)=>{ return output.type === 'html'; }).map((output)=>{return output.name;})}
                                      textFormats={this.props.outputs.filter((output)=>{ return output.type === 'markdown'; }).map((output)=>{return output.name;})}
                                      htmlEnabled={this.state.html}
                                      textEnabled={this.state.text}
                                      htmlSelection={this.state.htmlSelection}
                                      textSelection={this.state.textSelection}
                                      setHTML={(enabled, name)=>{
                                        this.setState({ html: enabled, htmlSelection: (typeof name === undefined ? '': name) });
                                      }}
                                      setTEXT={(enabled, name)=>{
                                        this.setState({ text: enabled, textSelection: (typeof name === undefined ? '': name) });
                                      }}
                                      valid={this._includeAtLeastOneFormat}
                                      />

              </div>

        </div>
      </div>
    </div>

    );
  }
}

SendEmail.propTypes = {
  config: React.PropTypes.object,
  outputs: React.PropTypes.array,
  height: React.PropTypes.number
};


module.exports = SendEmail;
