const React = require('react');

const ErrorConsole = (props) => {

  const errors = props.errors.map((error, index)=>{
    return (
      <div key={index}>
        <span className='label label-danger'>{error.type}</span>
        <span className='label label-default'>{error.template}</span>
        <span>{error.message}</span>
      </div>
    );
  });

  return (
    <div className='error-console'>
      {errors}
    </div>
  );

};

ErrorConsole.propTypes = {
  errors: React.PropTypes.array
};

module.exports = ErrorConsole;
