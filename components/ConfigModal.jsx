// config: {
//   email: {
//     defaultSender: '',
//     gmail: {
//       username: '',
//       appPassword: ''
//     },
//     smtp: {
//       host: '',
//       port: 25,
//       tls: {
//         rejectUnauthorized: false
//       }
//     }
//   }
// },
(function() {
  var React = require('react');
  var Modal = require('react-bootstrap/lib/Modal');
  var Button = require('react-bootstrap/lib/Button');

  var ConfigEntryField = require('./ConfigEntryField.jsx');
  var ConfigSaveStatus = require('./ConfigSaveStatus.jsx');

  var ConfigModal = React.createClass({
    getInitialState: function() {
      return {
        defaultSender: '',
        gmailUsername: '',
        gmailAppPassword: '',
        smtpHost: '',
        smtpPort: 25,
        smtpTlsRejectUnauthorized: false,

        defaultSenderDirty: false,
        gmailUsernameDirty: false,
        gmailAppPasswordDirty: false,
        smtpHostDirty: false,
        smtpPortDirty: false,
        smtpTlsRejectUnauthorizedDirty: false,

        OrigDefaultSender: '',
        OrigGmailUsername: '',
        OrigGmailAppPassword: '',
        OrigSmtpHost: '',
        OrigSmtpPort: 25,
        OrigSmtpTlsRejectUnauthorized: false,

        saveStatus: ''
      };
    },

    componentDidMount: function(){
      this.setState({
        defaultSender: this.props.config.email.defaultSender,
        gmailUsername: this.props.config.email.gmail.username,
        gmailAppPassword: this.props.config.email.gmail.appPassword,
        smtpHost: this.props.config.email.smtp.host,
        smtpPort: this.props.config.email.smtp.port,
        smtpTlsRejectUnauthorized: this.props.config.email.smtp.tls.rejectUnauthorized,
        origDefaultSender: this.props.config.email.defaultSender,
        origGmailUsername: this.props.config.email.gmail.username,
        origGmailAppPassword: this.props.config.email.gmail.appPassword,
        origSmtpHost: this.props.config.email.smtp.host,
        origSmtpPort: this.props.config.email.smtp.port,
        origSmtpTlsRejectUnauthorized: this.props.config.email.smtp.tls.rejectUnauthorized
      });
    },

    componentWillReceiveProps: function(newProps) {
      // update state IF the individual item is not marked as dirty
      if (!this.state.defaultSenderDirty) {
        this.setState({
          defaultSender: newProps.config.email.defaultSender,
          origDefaultSender:  newProps.config.email.defaultSender
        });
      }
      if (!this.state.gmailUsernameDirty) {
        this.setState({
          gmailUsername: newProps.config.email.gmail.username,
          origGmailUsername: newProps.config.email.gmail.username
        });
      }
      if (!this.state.gmailAppPasswordDirty) {
        this.setState({
          gmailAppPassword: newProps.config.email.gmail.appPassword,
          origGmailAppPassword: newProps.config.email.gmail.appPassword
        });
      }
      if (!this.state.smtpHostDirty) {
        this.setState({
          smtpHost: newProps.config.email.smtp.host,
          origSmtpHost: newProps.config.email.smtp.host
        });
      }
      if (!this.state.smtpPortDirty) {
        this.setState({
          smtpPort: newProps.config.email.smtp.port,
          origSmtpPort: newProps.config.email.smtp.port
        });
      }
      if (!this.state.smtpTlsRejectUnauthorizedDirty) {
        this.setState({
          smtpTlsRejectUnauthorized: newProps.config.email.smtp.tls.rejectUnauthorized,
          origSmtpTlsRejectUnauthorized:  newProps.config.email.smtp.tls.rejectUnauthorized
        });
      }

    },

    render: function() {
      var footer = this.getFooter();
      return (
        <Modal bsSize='large' dialogClassName='custom-modal' show={this.props.show} onHide={this.props.onHide}>

          <Modal.Header>
            <Modal.Title id='contained-modal-title-lg'>Configuration</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <form className='form-horizontal'>

              <div className='panel panel-default'>
                <div className='panel-heading'>
                  <h3 className='panel-title'>Email Configuration</h3>
                </div>

                <div className='panel-body'>

                  <ConfigEntryField
                    type='text'
                    label='Default sender'
                    configValue={this.state.defaultSender}
                    description='Default From: address'
                    onChange={this.setDefaultSender} />

                  <hr/>
                  <h4>GMail</h4>
                  <ConfigEntryField
                    type='text'
                    label='Username'
                    configValue={this.state.gmailUsername}
                    description='Gmail Username'
                    onChange={this.setGmailUsername} />

                  <ConfigEntryField
                    type='text'
                    label='App Password'
                    configValue={this.state.gmailAppPassword}
                    description='GMail App Password'
                    onChange={this.setGmailAppPassword} />

                  <hr/>
                  <h4>SMTP</h4>
                  <ConfigEntryField
                    type='text'
                    label='Host'
                    configValue={this.state.smtpHost}
                    description='SMTP Hostname'
                    onChange={this.setSmtpHost} />

                  <ConfigEntryField
                    type='text'
                    label='Port'
                    configValue={this.state.smtpPort}
                    description='SMTP Port'
                    onChange={this.setSmtpPort} />

                  <ConfigEntryField
                    type='boolean'
                    label='Reject Unauthorized'
                    configValue={this.state.smtpTlsRejectUnauthorized}
                    description='Require valid SSL certificate from server.'
                    onChange={this.setSmtpTlsRejectUnauthorized} />


                </div>
              </div>
            </form>

          </Modal.Body>

          {footer}

        </Modal>
      );
    },

    getFooter: function(){
      return (
        <Modal.Footer>
          <div className='row'>
            <div className='col-md-3'>
              <Button className='pull-right' onClick={this.doSave}>Save</Button>
            </div>
            <div className='col-md-6'>
                <ConfigSaveStatus status={this.state.saveStatus} />
            </div>
            <div className='col-md-3'>
              <Button onclick={this.doClose} className='pull-left' >Close</Button>
            </div>
          </div>
        </Modal.Footer>
      );
    },

    doSave: function(){
      this.saveConfigChanges();
    },

    // doReset: function(){
    //
    // },

    doClose: function(){
      this.props.onHide();
    },

    setDefaultSender: function(defaultSender){
      this.setState( { defaultSender: defaultSender } );
      if(defaultSender !== this.state.origDefaultSender){
        this.setState( {defaultSenderDirty: true, saveStatus: 'unsaved' } );
      } else {
        this.setState( {defaultSenderDirty: false, saveStatus: '' } );
      }
    },

    setGmailUsername: function(gmailUsername){
      this.setState( { gmailUsername: gmailUsername } );
      if(gmailUsername !== this.state.origGmailUsername){
        this.setState( {gmailUsernameDirty: true, saveStatus: 'unsaved' } );
      } else {
        this.setState( {gmailUsernameDirty: false, saveStatus: '' } );
      }
    },

    setGmailAppPassword: function(gmailAppPassword){
      this.setState( { gmailAppPassword: gmailAppPassword } );
      if(gmailAppPassword !== this.state.origGmailAppPassword){
        this.setState( {gmailAppPasswordDirty: true, saveStatus: 'unsaved' } );
      } else {
        this.setState( {gmailAppPasswordDirty: false, saveStatus: '' } );
      }
    },

    setSmtpHost: function(smtpHost){
      this.setState( { smtpHost: smtpHost } );
      if(smtpHost !== this.state.origSmtpHost){
        this.setState( {smtpHostDirty: true, saveStatus: 'unsaved' } );
      } else {
        this.setState( {smtpHostDirty: false, saveStatus: '' } );
      }
    },

    setSmtpPort: function(smtpPort){
      this.setState( { smtpPort: smtpPort } );
      if(smtpPort !== this.state.origSmtpPort){
        this.setState( {smtpPortDirty: true, saveStatus: 'unsaved' } );
      } else {
        this.setState( {smtpPortDirty: false, saveStatus: '' } );
      }
    },

    setSmtpTlsRejectUnauthorized: function(smtpTlsRejectUnauthorized){
      this.setState( { smtpTlsRejectUnauthorized: smtpTlsRejectUnauthorized } );
      if(smtpTlsRejectUnauthorized !== this.state.origSmtpTlsRejectUnauthorized){
        this.setState( {smtpTlsRejectUnauthorizedDirty: true, saveStatus: 'unsaved' } );
      } else {
        this.setState( {smtpTlsRejectUnauthorizedDirty: false, saveStatus: '' } );
      }
    },



    saveConfigChanges: function(){
      var newConfig = {
        email: {
          defaultSender: this.state.defaultSender,
          gmail: {
            username: this.state.gmailUsername,
            appPassword: this.state.gmailAppPassword
          },
          smtp: {
            host: this.state.smtpHost,
            port: this.state.smtpPort,
            tls: {
              rejectUnauthorized: this.state.smtpTlsRejectUnauthorized
            }
          }
        }
      };


      this.props.save(newConfig);

      this.setState({
        defaultSenderDirty: false,
        gmailUsernameDirty: false,
        gmailAppPasswordDirty: false,
        smtpHostDirty: false,
        smtpPortDirty: false,
        smtpTlsRejectUnauthorizedDirty: false
      });

      this.setState( { saveStatus: '' } );

    }


    // checkIncludeHTML: function(event) {
    //   var checked = !this.state.includeHTML;
    //   this.setState({includeHTML: checked});
    //   if (!checked) {
    //     this.setState({includeTEXT: true});
    //   }
    // }

  });

  module.exports = ConfigModal;

}());
