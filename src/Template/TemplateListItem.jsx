
const React = require('react');

const TemplateListItem = React.createClass({

  propTypes: function(){
    return {
      template: React.PropTypes.object,
      onDelete: React.PropTypes.func,
      onUpdate: React.PropTypes.func,
      newItem: React.PropTypes.bool,
      onDiscard: React.PropTypes.func
    };
  },

  getInitialState:function(){
    return {
      showEditor: false,
      newName: '',
      newType: 'html'
    };
  },

  componentWillMount: function() {
    this.setState({
      showEditor: this.props.newItem,
      newName: this.props.template.name,
      newType:this.props.template.type
    });
  },

  _cancelEdit: function(){
    this.setState({ newName: this.props.template.name, newType:this.props.template.type, showEditor: false });
    if(this.props.newItem){
      this.props.onDiscard();
    }
  },

  _saveChanges: function(){
    this.props.onUpdate(this.props.template.id, this.state.newName, this.state.newType);
    this.setState({ showEditor: false });
  },

  render: function(){

    if(this.state.showEditor){
      return (
        <tr>
          <td>
            <input  type='text'
                    autoFocus
                    value={this.state.newName}
                    onChange={ (event)=>{ this.setState({newName: event.target.value}); } }/>
          </td>
          <td>
            <select value={this.state.newType}
                    onChange={ (event)=>{ this.setState({newType: event.target.value}); } }>
              <option value="markdown">Markdown</option>
              <option value="html">HTML</option>
            </select>

          </td>
          <td>
            <button onClick={this._cancelEdit} className='btn btn-default'>Cancel</button>
            <button onClick={this._saveChanges} className='btn btn-default'>Save</button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>{this.props.template.name}</td>
          <td>{this.props.template.type}</td>
          <td>
            <button onClick={()=>{ this.setState({showEditor:true});} } className='btn btn-xs btn-info'><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</button>
            <button onClick={()=>{
              if (window.confirm('Are you sure you want to delete this template?')) {
                this.props.onDelete(this.props.template.id);
              }
            }} className='btn btn-xs btn-danger'><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete</button>
          </td>
      </tr>
      );

    }

  }

});

module.exports = TemplateListItem;
