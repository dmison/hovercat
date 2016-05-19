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
        <MainMenuContainer />
        {this.props.children}
      </div>
    );

  }

});

module.exports = App;
