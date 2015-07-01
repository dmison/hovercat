(function(){

  var React = require('react');

  var Previewer = React.createClass({
    
    render: function(){
      if (this.props.type === 'text'){
        return (
          <div>
            <pre><code>{this.props.content}</code></pre>
          </div>
        )
      }
      if (this.props.type === 'html'){
        return (
          <iframe scrolling="yes" srcDoc={this.props.content}></iframe>
        )
      }

    }

  });

  module.exports = Previewer;

})();
