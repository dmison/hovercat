const React = require('react');

const AddTemplate = React.createClass({

  getInitialState:function(){
    return {
      showAddTemplate: false,
      newName: '',
      newType: 'html'
    };
  },

  render: function(){
    if(this.state.showAddTemplate){
      return (
        <div>
          <input type='text' value={this.state.newName} onChange={(event)=>{this.setState({newName: event.target.value});}} />
          <select value={this.state.newType} onChange={(event)=>{this.setState({newType: event.target.value});}}>
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
          </select>
          <button onClick={()=>{this.setState({ showAddTemplate: false });}} className='btn btn-default'>Cancel</button>
          <button onClick={()=>{this.props.onAdd(this.state.newName, this.state.newType); this.setState({ showAddTemplate: false , newName: '', newType:'html' });}} className='btn btn-default'>Save</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={()=>{this.setState({ showAddTemplate: true });}} className='btn btn-default'>Add New Template</button>
        </div>
      );
    }
  }

});



// (props) => {
//
//   return (
//     <div>
//         { props.show?
//           <button onClick={props.onHide} className='btn btn-default'>Done</button> :
//           <button onClick={props.onShow} className='btn btn-default'>Add</button> }
//       </div>
//   );
// };

module.exports = AddTemplate;
