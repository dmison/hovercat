(function(){

  var React = require('react');
  var YAML = require('yamljs');

  var TextPreviewer = React.createClass({

    getInitialState: function(){
      return { output: ''};
    },

    componentWillReceiveProps: function(nextProps){

      var template = nextProps.template;
      var content = YAML.parse(nextProps.content);
      try {
        var builderText = Handlebars.compile(template);
        this.setState({output: builderText(content)});
      } catch(e){
        console.log(e); //this.receiveNewErrors(e.toString());
      }

    },

    render: function(){


      return (
        <code><pre>{this.state.output}</pre></code>
      )

    }

  });

  module.exports = TextPreviewer;

})();
