var React = require('react');

var BitlyViewListItem = React.createClass({

  _checked: function(event){
    if(event.target.checked){
      this.props.didSelect(this.props.url);
    } else {
      this.props.didUnSelect(this.props.url);
    }
  },

  render: function(){
    var warning = this.props.invalid? <i className="fa fa-exclamation-triangle"> </i>: '';
    var rowClassName = this.props.invalid? 'row-warning': '';
    return (
      <tr className={rowClassName}>
        <td><input type='checkbox' checked={this.props.selected} onChange={this._checked}/></td>
        <td>{warning}{this.props.url}</td>
        <td>{this.props.shortURL}</td>
      </tr>
    );
  }

});


module.exports = BitlyViewListItem;
