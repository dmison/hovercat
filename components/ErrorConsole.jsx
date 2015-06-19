(function(){
  var React = require('react');

  var ErrorConsole = React.createClass({

    render: function(){
      var yamlDiv = (this.props.yaml === '') ? '' : <div><span className='label label-danger'>YAML</span> {this.props.yaml}</div>
    var textDiv = (this.props.text === '') ? '' : <div><span className='label label-danger'>TEXT</span> {this.props.text}</div>
  var htmlDiv = (this.props.html === '') ? '' : <div><span className='label label-danger'>HTML</span> {this.props.html}</div>

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
