(function(){

  var React = require('react');

  var HCCompiler = require('./HCCompiler.js')

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
      var contentType = nextProps.type;

      var content = {};

      var contentData = HCCompiler.parseYAML(nextProps.content);
      if (contentData.error){
          var e = contentData.error;
          var message = '"'+e.message+'" Line:'+e.parsedLine+' "'+e.snippet+'"';
          this.props.returnError('yaml', message);
          return;
      } else {
        content = contentData.data;
        this.props.returnError('yaml', '');
      }

      var result = HCCompiler.compile(content, template);
      if (result.error){
        var e = result.error;
        var message = e.message;
        this.props.returnError(contentType, message);
        return;
      } else {
        this.setState({ output: result.output});
        this.props.returnError(contentType, '');
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
