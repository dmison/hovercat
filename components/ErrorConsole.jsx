(function(){
  var React = require('react');

  var ErrorConsole = React.createClass({

    render: function(){
      var yamlDiv = (this.props.yaml === '') ? '' : <div>YAML: {this.props.yaml}</div>
      var textDiv = (this.props.text === '') ? '' : <div>TEXT: {this.props.text}</div>
      var htmlDiv = (this.props.html === '') ? '' : <div>HTML: {this.props.html}</div>

      return (

        <div>
          {{yamlDiv}}
          {{textDiv}}
          {{htmlDiv}}
        </div>

      )

    }

  });

  module.exports = ErrorConsole;

})();
