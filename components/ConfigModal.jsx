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
        smtpTlsRejectUnauthorized: this.props.config.email.smtp.tls.rejectUnauthorized
      });
    },

    componentWillReceiveProps: function(newProps) {
      // update state IF the individual item is not marked as dirty
      if (!this.state.defaultSenderDirty) {
        this.setState( { defaultSender: newProps.config.email.defaultSender } );
      }
      if (!this.state.gmailUsernameDirty) {
        this.setState( { gmailUsername: newProps.config.email.gmail.username } );
      }
      if (!this.state.gmailAppPasswordDirty) {
        this.setState( { gmailAppPassword: newProps.config.email.gmail.appPassword } );
      }
      if (!this.state.smtpHostDirty) {
        this.setState( { smtpHost: newProps.config.email.smtp.host } );
      }
      if (!this.state.smtpPortDirty) {
        this.setState( { smtpPort: newProps.config.email.smtp.port } );
      }
      if (!this.state.smtpTlsRejectUnauthorizedDirty) {
        this.setState( { smtpTlsRejectUnauthorized: newProps.config.email.smtp.tls.rejectUnauthorized } );
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
                    description='defaultSender'
                    onChange={this.setDefaultSender} />

                  <hr/>

                  <ConfigEntryField
                    type='text'
                    label='Gmail Username'
                    configValue={this.state.gmailUsername}
                    description='gmailUsername'
                    onChange={this.setGmailUsername} />

                  <ConfigEntryField
                    type='text'
                    label='Gmail App Password'
                    configValue={this.state.gmailAppPassword}
                    description='gmailAppPassword'
                    onChange={this.setGmailAppPassword} />

                  <hr/>

                  <ConfigEntryField
                    type='text'
                    label='SMTP Host'
                    configValue={this.state.smtpHost}
                    description='SMTP Host'
                    onChange={this.setSmtpHost} />

                  <ConfigEntryField
                    type='text'
                    label='SMTP Port'
                    configValue={this.state.smtpPort}
                    description='SMTP Port'
                    onChange={this.setSmtpPort} />

                  <ConfigEntryField
                    type='boolean'
                    label='SMTP TLS RejectUnauthorized'
                    configValue={this.state.smtpTlsRejectUnauthorized}
                    description='SMTP TLS RejectUnauthorized'
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
            <div className='col-md-8'>
              <Button className='pull-right' onClick={this.doSave}>Save</Button>
              <Button onclick={this.doClose} className='pull-left' >Close</Button>

            </div>
            <div className='col-md-4'>
              {this.state.saveStatus}
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
      this.setState( { defaultSender: defaultSender, defaultSenderDirty: true, saveStatus: 'unsaved' } );
    },
    setGmailUsername: function(gmailUsername){
      this.setState( { gmailUsername: gmailUsername, gmailUsernameDirty: true, saveStatus: 'unsaved' } );
    },
    setGmailAppPassword: function(gmailAppPassword){
      this.setState( { gmailAppPassword: gmailAppPassword, gmailAppPasswordDirty: true, saveStatus: 'unsaved' } );
    },
    setSmtpHost: function(smtpHost){
      this.setState( { smtpHost: smtpHost, smtpHostDirty: true, saveStatus: 'unsaved' } );
    },
    setSmtpPort: function(smtpPort){
      this.setState( { smtpPort: smtpPort, smtpPortDirty: true, saveStatus: 'unsaved' } );
    },
    setSmtpTlsRejectUnauthorized: function(smtpTlsRejectUnauthorized){
      this.setState( { smtpTlsRejectUnauthorized: smtpTlsRejectUnauthorized, smtpTlsRejectUnauthorizedDirty: true, saved: 'unsaved' } );
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
