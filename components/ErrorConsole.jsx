(function(){
  var React = require('react');

  var ErrorConsole = React.createClass({

    render: function(){

      var errorList = this.props.errors.map(function(error, index){
        return (
          <li key={index}>{error}</li>
        )
      })

      return (

        <div>
          <ol>
            {errorList}
          </ol>
        </div>

      )

    }

  });

  module.exports = ErrorConsole;

})();
