(function(){

  var React = require('react');
  var YAML = require('yamljs');

  var Previewer = React.createClass({

    getInitialState: function(){
      return {
        output: ''
      };
    },

    shouldComponentUpdate: function(nextProps, nextState){

      return !((nextProps.template === this.props.template) &&
      (nextProps.content === this.props.content));

    },

    componentWillReceiveProps: function(nextProps){

      if(
        (nextProps.template === this.props.template) &&
        (nextProps.content === this.props.content)
      ){
        return;
      }


      var template = nextProps.template;

      var content = {};

      try {
        content = YAML.parse(nextProps.content);
        this.props.returnError('yaml', '');

      } catch (e) {
        console.log(e);
        var message = '"'+e.message+'" Line:'+e.parsedLine+' "'+e.snippet+'"';
        this.props.returnError('yaml', message);
        return;
      }

      if (nextProps.type === 'text'){
        try {
          var builder = Handlebars.compile(template);
          this.setState({output: builder(content)});
          this.props.returnError('text', '');

        } catch(e){
          this.props.returnError('text', e.message);
          return;
        }
      }

      if(nextProps.type === 'html'){
        try {
          var builder = Handlebars.compile(template);
          this.setState({output: builder(content)});
          this.props.returnError('html', '');

        } catch(e){
          this.props.returnError('html', e.message);
          return;
        }
      }


    },

    render: function(){
      if (this.props.type === 'text'){
        return (
          <div>
            <pre><code>{this.state.output}</code></pre>
          </div>
        )
      }
      if (this.props.type === 'html'){
        return (
          <iframe scrolling="yes" srcDoc={this.state.output}></iframe>
        )
      }

    }

  });

  module.exports = Previewer;

})();
