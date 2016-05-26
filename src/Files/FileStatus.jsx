const React = require('react');

const FileStatus = React.createClass({

  render: function(){

    const style = {
      paddingTop: 5,
      paddingBottom: 4,
      paddingLeft: 8,
      paddingRight: 8
    };

    let statusLabel = (<span></span>);

    if (!this.props.uistate.saved) {
      statusLabel = <span style={style} className='label label-warning'><i className='fa fa-circle-o'></i> Unsaved changes</span>;
    }
    if(this.props.uistate.saving) {
      statusLabel = <span style={style} className='label label-default'><i className='fa fa-circle-o-notch fa-spin '></i> Saving...</span>;
    }

    return statusLabel;
  },

  propTypes: function(){
    return {
      uistate: React.PropTypes.object
    };
  }


});



module.exports = FileStatus;
