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
        editorWrapEnabled: true,
        defaultSender: '',
        gmailUsername: '',
        gmailAppPassword: '',
        smtpHost: '',
        smtpPort: 25,
        smtpTlsRejectUnauthorized: false,

        editorWrapEnabledDirty: false,
        defaultSenderDirty: false,
        gmailUsernameDirty: false,
        gmailAppPasswordDirty: false,
        smtpHostDirty: false,
        smtpPortDirty: false,
        smtpTlsRejectUnauthorizedDirty: false,

        OrigEditorWrapEnabled: '',
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
        editorWrapEnabled: this.props.config.editor.wrapEnabled,
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
      if (!this.state.editorWrapEnabledDirty) {
        this.setState({
          editorWrapEnabled: newProps.config.editor.wrapEnabled,
          OrigEditorWrapEnabled:  newProps.config.editor.wrapEnabled
        });
      }

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
                  <h3 className='panel-title'>Editor Configuration</h3>
                </div>

                <div className='panel-body'>
                  <ConfigEntryField
                    type='boolean'
                    label='Word wrap'
                    configValue={this.state.editorWrapEnabled}
                    description='Enable word wrap in editors.'
                    onChange={this.setEditorWrapEnabled} />

                </div>
              </div>

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
      var saved = this.state.saveStatus === 'unsaved' ? false : true;
      var closeButtonText = saved ? 'Close' : 'Close without saving';

      return (
        <Modal.Footer>
          <div className='row'>
            <div className='col-sm-2'>
              <Button className='pull-left' disabled={saved} onClick={this.discardChanges}>Discard Changes</Button>
            </div>
            <div className='col-sm-4'>
              <ConfigSaveStatus className='pull-right' status={this.state.saveStatus} />
            </div>
            <div className='col-sm-3'>
              <Button className='pull-right' disabled={saved} onClick={this.doSave}>Save changes</Button>
            </div>
            <div className='col-sm-3'>
              <Button onClick={this.doClose} className='pull-right' >{closeButtonText}</Button>
            </div>
          </div>
        </Modal.Footer>
      );
    },

    doSave: function(){
      this.saveConfigChanges();
    },

    discardChanges: function(){
      this.setState({
        editorWrapEnabled: this.state.OrigEditorWrapEnabled,
        defaultSender: this.state.origDefaultSender,
        gmailUsername: this.state.origGmailUsername,
        gmailAppPassword: this.state.origGmailAppPassword,
        smtpHost: this.state.origSmtpHost,
        smtpPort: this.state.origSmtpPort,
        smtpTlsRejectUnauthorized: this.state.origSmtpTlsRejectUnauthorized,
        defaultSenderDirty: false,
        gmailUsernameDirty: false,
        gmailAppPasswordDirty: false,
        smtpHostDirty: false,
        smtpPortDirty: false,
        smtpTlsRejectUnauthorizedDirty: false,
        OrigDefaultSender: this.state.origOrigDefaultSender,
        OrigGmailUsername: this.state.origOrigGmailUsername,
        OrigGmailAppPassword: this.state.origOrigGmailAppPassword,
        OrigSmtpHost: this.state.origOrigSmtpHost,
        OrigSmtpPort: this.state.origOrigSmtpPort,
        OrigSmtpTlsRejectUnauthorized: this.state.origOrigSmtpTlsRejectUnauthorized,
        saveStatus: ''
      });

    },

    doClose: function(){
      this.discardChanges();
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

    setEditorWrapEnabled: function(editorWrapEnabled){
      this.setState( { editorWrapEnabled: editorWrapEnabled});
      if(editorWrapEnabled !== this.state.OrigEditorWrapEnabled){
        this.setState( { editorWrapEnabledDirty: true, saveStatus: 'unsaved'});
      } else {
        this.setState( {editorWrapEnabledDirty: false, saveStatus: ''} );
      }
    },

    saveConfigChanges: function(){
      var newConfig = {
        editor: {
          wrapEnabled: this.state.editorWrapEnabled
        },
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
        editorWrapEnabledDirty: false,
        defaultSenderDirty: false,
        gmailUsernameDirty: false,
        gmailAppPasswordDirty: false,
        smtpHostDirty: false,
        smtpPortDirty: false,
        smtpTlsRejectUnauthorizedDirty: false,
        origDefaultSender: this.state.defaultSender,
        origGmailUsername: this.state.gmailUsername,
        origGmailAppPassword: this.state.gmailAppPassword,
        origSmtpHost: this.state.smtpHost,
        origSmtpPort: this.state.smtpPort,
        origSmtpTlsRejectUnauthorized: this.state.smtpTlsRejectUnauthorized,
        saveStatus: ''
      });

    }

  });

  module.exports = ConfigModal;

}());
