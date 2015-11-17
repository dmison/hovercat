(function(){
  var React = require('react');

  var SendStatus = React.createClass({

    getStatusDiv: function(){
      var statusDiv;
      var status = this.props.status.status;
      var message = this.props.status.message;

      var style = {
        marginTop: 3,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 5,
        paddingBottom: 1
      }

      switch (status) {
        case 'success':
          statusDiv = <div style={style} className='pull-right alert alert-success'>Sent successfully</div>;
          break;
        case 'sending':
          statusDiv = <div style={style} className='pull-right alert alert-info'><i className='fa fa-circle-o-notch fa-spin'></i> Sending ...</div>;
          break;
        case 'failed':
          statusDiv = <div style={style} className='pull-right alert alert-danger'>Failed: {message}</div>;
          break;
        default:
          statusDiv = <div></div>;
      }

      return statusDiv;

    },

    render: function(){
      var statusDiv = this.getStatusDiv();

      return (
        <div className='center-block'>{statusDiv}</div>
      )
    }

  });

  module.exports = SendStatus;

}())
