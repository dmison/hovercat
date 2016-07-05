const React = require('react');
const MainMenuContainer = require('./MainMenu/MainMenuContainer.js');

const App = React.createClass({

  propTypes: function(){
    return {
      children: React.PropTypes.node
    };
  },

  render: function(){
    return (
      <div>
        <MainMenuContainer location={this.props.location.pathname}/>
        {this.props.children}
      </div>
    );

  }

});

module.exports = App;
