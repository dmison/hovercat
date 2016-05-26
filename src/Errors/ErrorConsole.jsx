const React = require('react');
const FileStatusContainer = require('../Files/FileStatusContainer.js');

const ErrorConsole = React.createClass({

  propTypes: function() {
    return {
      errors: React.PropTypes.array,
      setConsoleHeight: React.PropTypes.func
    };
  },

  componentDidUpdate: function(){
    this.props.setConsoleHeight(this.refs.errorConsole.offsetHeight);
  },

  render: function(){

    const errors = this.props.errors.map((error, index)=>{
      return (
        <div key={index} className='error-list'>
          <span className='label label-danger'>{error.template === ''? 'YAML':error.template}</span>
          <span> {error.message}</span>
        </div>
      );
    });
    const noErrors = <div className='label label-info'>No Errors</div>;
    return (
      <div className='error-console' ref='errorConsole'>
        <div className='error-block'>
          {errors.length === 0 ? noErrors : errors}
        </div>
        <div className='status-block'>
          <FileStatusContainer />
        </div>
      </div>
    );
  }


});


module.exports = ErrorConsole;
