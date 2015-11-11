(function() {
  var React = require('react');
  var Modal = require('react-bootstrap/lib/Modal');
  var Button = require('react-bootstrap/lib/Button');
  var Input = require('react-bootstrap/lib/Input');
  var EmailAccountSelector = require('./EmailAccountSelector.jsx');
  var HCEmailSender = require('./HCEmailSender.js');
  var SendStatus = require('./SendStatus.jsx');

  var EmailModal = React.createClass({

    getInitialState: function() {
      return {
        receipients: '',
        sender: '',
        subject: '',
        includeHTML: true,
        includeTEXT: true,
        accountToUse: 'gmail',
        sendStatus: {
          status: '', //none, sending, failed, success
          message: ''
        },
        receipientsIsValid: false,
        senderIsValid: false,
        subjectIsValid: false
      }
    },

    componentWillReceiveProps: function(newProps){
      if (this.state.sender === ''){
        this.setState({ sender: newProps.config.email.defaultSender });
      }

      this.validate();
    },

    componentDidMount: function(){
      this.validate();
    },

    render: function() {

      return (
        <Modal dialogClassName='custom-modal' show={this.props.show} onHide={this.props.onHide}>

          <Modal.Header>
            <Modal.Title id='contained-modal-title-lg'>Send Email</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <div className='row'>
              <div className='col-md-3'>
                <label className='pull-right'>Account:</label>
              </div>
              <div className='col-md-7'>
                <EmailAccountSelector accounts={this.props.config.email} selected={this.state.accountToUse} setAccount={this.setAccount}/>
              </div>
            </div>


            <div className='row'>
              <div className='col-md-3'>
                <label className='pull-right'>To:</label>
              </div>
              <div className='col-md-7'>
                <Input value={this.state.receipients} type='text' onChange={this.setReceipients} bsStyle={this.state.receipientsIsValid? '':'error'} hasFeedback/>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-3'>
                <label className='pull-right'>From:</label>
              </div>
              <div className='col-md-7'>
                <Input value={this.state.sender} type='text' onChange={this.setSender}/>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-3'>
                <label className='pull-right'>Subject:</label>
              </div>
              <div className='col-md-7'>
                <Input value={this.state.subject} type='text' onChange={this.setSubject}/>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-3'>
                <label className='pull-right'>Include Formats:</label>
              </div>
              <div className='col-md-7'>
                <Input type='checkbox' label='HTML' checked={this.state.includeHTML} />
                <Input type='checkbox' label='Text' checked={this.state.includeTEXT} />
              </div>
            </div>


          </Modal.Body>

          <Modal.Footer>
            <div className='row'>
              <div className='col-md-2'>
                <Button disabled={this.state.sendDisabled} className='pull-left' onClick={this.sendEmail}>Send</Button>
              </div>
              <div className='col-md-8'>
                <SendStatus status={this.state.sendStatus} />
              </div>
              <div className='col-md-2'>
                <Button className='pull-right' onClick={this.props.onHide}>Close</Button>
              </div>
            </div>
          </Modal.Footer>

        </Modal>
      );
    },

    validate: function(){
      this.setState( {
        receipientsIsValid: this.state.receipients !== '',
        senderIsValid: this.state.sender !== '',
        subjectIsValid: this.state.subject !== ''
      });


      // this.setState( { includeHTMLIsValid: this.state.includeHTML === '')
      // this.setState( { includeTEXTIsValid: this.state.includeTEXT === '')
    },

    setSubject: function(event){
      var subject = event.target.value;
      this.setState({
        subject: subject,
        subjectIsValid: subject !== ''
      });
    },

    setSender: function(event){
      var sender = event.target.value;
      this.setState({ sender: sender});
    },

    setReceipients: function(event){
      var receipients = event.target.value;
      this.setState({
        receipientsIsValid: receipients !== '',
        receipients: receipients
      });
    },

    setAccount: function(account) {
      this.setState({accountToUse: account});
    },

    sendEmail: function() {
      //validate fields
      // receipients, sender, subject
      // at least one of text or html

      this.setState({
        sendStatus: {
          status:'sending',
          message:''
        },
        sendDisabled: true
      });

      HCEmailSender.sendEmail(
        this.props.config,
        this.state.accountToUse,
        this.state.receipients,
        this.state.subject,
        this.props.htmlOutput,
        this.props.textOutput,
        this.state.sender,
        function(error){
          if(error){
            this.setState({
              sendStatus: {
                status:'failed',
                message:''+error
              }
            });
          }
          else {
            this.setState({
              sendStatus: {
                status:'success',
                message:''
              }
            });
          }

          this.setState({
            sendDisabled: false
          });

        }.bind(this)
      );
    }

  });

  module.exports = EmailModal;

}())
