const React = require('react');
const TemplateDetailsForm = require('./TemplateDetailsForm.jsx');

const AddTemplate = React.createClass({

  propTypes: function(){
    return {
      onAdd: React.propTypes.func
    };
  },

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
          <TemplateDetailsForm  name={this.state.newName} type={this.state.newType}
                                onNameChange={(name)=>{ this.setState({newName: name});}}
                                onTypeChange={(type)=>{ this.setState({newType: type});}} />
          <button onClick={ ()=>{ this.setState({ newName: '', newType:'html', showAddTemplate: false }); } }
                  className='btn btn-default'>Cancel</button>
          <button onClick={()=>{ this.props.onAdd(this.state.newName, this.state.newType); this.setState({ showAddTemplate: false , newName: '', newType:'html' });}}
                  className='btn btn-default'>Save</button>
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


module.exports = AddTemplate;
