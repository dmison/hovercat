const React = require('react');

const FileStatus = React.createClass({

  render: function(){

    let statusLabel = (<span></span>);
    let statusIcon = (<span></span>);

    if (this.props.uistate.saved) {
      statusLabel = '';
      statusIcon = <i className='fa fa-circle fa-fw'></i>;
    } else {
      statusLabel = <span className='label label-warning pull-right'>Unsaved changes</span>;
      statusIcon = <i className='fa fa-circle-o fa-fw'></i>;

    }
    if(this.props.uistate.saving) {
      statusLabel = <span className='label label-default pull-right'>Saving...</span>;
      statusIcon = <i className='fa fa-circle-o-notch fa-spin fa-fw'></i>;
    }

    const style = {
      paddingLeft: 15,
      paddingRight: 15
    };

    const filename = this.props.uistate.filename === ''? 'untitled':this.props.uistate.filename;

    return (
      <div style={style}>
        {statusIcon}
        <span>{filename}</span>
        {statusLabel}
      </div>
    );
  },

  propTypes: function(){
    return {
      uistate: React.PropTypes.object
    };
  }


});



module.exports = FileStatus;
