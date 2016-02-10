var React = require('react');

var BitlyViewListItem = React.createClass({

  _checked: function(){
    this.props.didSelect(this.props.url);
  },

  render: function(){
    return (
      <tr>
        <td><input type='checkbox' checked={this.props.selected} onChange={this._checked}/></td>
        <td>{this.props.url}</td>
        <td>{this.props.shortURL}</td>
      </tr>
    );
  }

});


module.exports = BitlyViewListItem;
