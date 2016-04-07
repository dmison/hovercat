(function(){

  var React = require('react');

  var Previewer = React.createClass({

    getInitialState: function(){
      return {
        previewHeight: window.innerHeight/2
      };
    },

    handleResize: function(){
      this.setState({
        previewHeight: window.innerHeight/2
      });
      this.forceUpdate();
    },

    componentDidMount: function(){
      window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function(){
      window.removeEventListener('resize', this.handleReize);
    },

    render: function(){

      var style = { height: this.state.previewHeight, margin: 12 };

      if (this.props.type === 'markdown'){

        let frameContent = '<html><head><link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css"><link rel="stylesheet" href="vendor/bootstrap/css/bootstrap-theme.min.css"> <style>html { overflow-x: wrap; overflow-y: scroll; } </style></head><body><pre style="overflow: wrap; word-break: auto;"><code>'+this.props.content+'</code></pre></body></html>';
        return (
          <iframe style={style} className="previewer textpreview" scrolling="yes" srcDoc={frameContent}></iframe>
        );
      }

      if (this.props.type === 'html'){

        let frameContent = '<html><head><style>html { overflow-x: wrap; overflow-y: scroll; } </style></head><body><div>'+this.props.content+'</div></body></html>';

        return (
          <iframe style={style} className="previewer htmlpreview" scrolling="yes" srcDoc={frameContent}></iframe>
        );
      }

    }

  });

  module.exports = Previewer;

})();
