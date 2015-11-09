(function() {

  var React = require('react');
  var Input = require('react-bootstrap/lib/Input');

  var EmailAccountSelector = React.createClass({

    getInitialState: function() {
      return {
        gmail: true,
        smtp: false
      }
    },

    render: function() {

      return (
        <div className='form-inline'>
          <label className="checkbox-inline">
            <Input type="radio" label=" GMAIL" checked={this.state.gmail} onChange={this.toggleGMAIL}/>
          </label>
          <label className="checkbox-inline">
            <Input type="radio" label=" SMTP" checked={this.state.smtp} onChange={this.toggleSMTP}/>
          </label>
        </div>
      );

    },

    toggleGMAIL: function(){
      this.setState({ gmail: true, smtp: false});
      this.props.setAccount('gmail');
    },

    toggleSMTP: function(){
      this.setState({ gmail: false, smtp: true});
      this.props.setAccount('smtp');
    }

  });

  module.exports = EmailAccountSelector;

}())
